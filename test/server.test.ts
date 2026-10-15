import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';
import app from '../src/index';

type Mode = 'legacy' | 'auto';

const textOf = (result: { content?: unknown }) => {
  const [block] = result.content as { type: string; text: string }[];
  return block.text;
};

// Every request goes through the real Hono app, in-process: same route, same
// host validation and same handler as in production, without opening a port.
// Workers fills the Host header from the URL; Node's Request does not.
const toRequest = (url: string | URL, init?: RequestInit) => {
  const request = new Request(url, init);
  request.headers.set('host', new URL(request.url).host);
  return request;
};

describe.each<Mode>(['legacy', 'auto'])('MCP server (%s negotiation)', (mode) => {
  let client: Client;

  beforeEach(async () => {
    const transport = new StreamableHTTPClientTransport(new URL('http://localhost/mcp'), {
      fetch: async (url, init) => app.fetch(toRequest(url, init)),
    });
    client = new Client({ name: 'test', version: '1.0.0' }, { versionNegotiation: { mode } });
    await client.connect(transport);
  });

  afterEach(async () => {
    await client.close();
  });

  it('lists the tools as read-only', async () => {
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(['get_profile', 'get_project', 'search_projects']);
    for (const tool of tools) expect(tool.annotations?.readOnlyHint).toBe(true);
  });

  it('get_profile returns the profile with contact details', async () => {
    const result = await client.callTool({ name: 'get_profile', arguments: {} });
    expect(result.isError).toBeFalsy();
    expect(JSON.parse(textOf(result))).toEqual(profile);
  });

  it('search_projects answers "which projects used TypeScript?"', async () => {
    const result = await client.callTool({ name: 'search_projects', arguments: { topic: 'typescript' } });
    const slugs = JSON.parse(textOf(result)).map((p: { slug: string }) => p.slug);
    expect(slugs).toContain('menon');
  });

  it('search_projects matches AI skills partially and case-insensitively', async () => {
    const result = await client.callTool({ name: 'search_projects', arguments: { topic: 'Agent' } });
    expect(JSON.parse(textOf(result))[0].slug).toBe('menon');
  });

  it('search_projects returns summaries without highlights', async () => {
    const result = await client.callTool({ name: 'search_projects', arguments: {} });
    const summaries = JSON.parse(textOf(result));
    expect(summaries).toHaveLength(projects.length);
    expect(summaries[0]).not.toHaveProperty('highlights');
  });

  it('search_projects lists known topics when nothing matches', async () => {
    const result = await client.callTool({ name: 'search_projects', arguments: { topic: 'cobol' } });
    expect(result.isError).toBeFalsy();
    expect(textOf(result)).toContain('No project matches "cobol"');
    expect(textOf(result)).toContain('TypeScript');
  });

  it('get_project returns the full project', async () => {
    const result = await client.callTool({ name: 'get_project', arguments: { slug: 'menon' } });
    expect(JSON.parse(textOf(result))).toEqual(projects.find((p) => p.slug === 'menon'));
  });

  it('get_project names the valid slugs on an unknown slug', async () => {
    const result = await client.callTool({ name: 'get_project', arguments: { slug: 'nope' } });
    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain('Valid slugs: menon');
  });

  it('get_project rejects a missing slug before the handler runs', async () => {
    const result = await client.callTool({ name: 'get_project', arguments: {} });
    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain('Input validation error');
  });

  it('evaluate_fit embeds the job description, profile and projects', async () => {
    const { messages } = await client.getPrompt({
      name: 'evaluate_fit',
      arguments: { job_description: 'Senior AI Engineer, agents' },
    });
    const text = (messages[0].content as { text: string }).text;
    expect(text).toContain('Senior AI Engineer, agents');
    expect(text).toContain(profile.contact.email);
    expect(text).toContain('"slug": "menon"');
  });

  it('evaluate_fit rejects a missing job description with a protocol error', async () => {
    await expect(client.getPrompt({ name: 'evaluate_fit', arguments: {} })).rejects.toMatchObject({
      code: -32602,
    });
  });
});

describe('HTTP endpoint', () => {
  it('rejects requests for an unknown host', async () => {
    const response = await app.fetch(
      toRequest('http://evil.example/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
      }),
    );
    expect(response.status).toBe(403);
  });
});
