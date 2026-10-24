# Ask William, le serveur MCP de mon portfolio

Un serveur [MCP](https://modelcontextprotocol.io) en lecture seule : ajoutez une URL dans Claude et posez vos questions sur mon parcours.

> Endpoint : `https://mcp.william-fort.fr`

**Essayer** : Claude → Paramètres → Connecteurs → Ajouter un connecteur personnalisé, puis demander « Quels projets ont utilisé TypeScript en production ? ».

## Capacités

| Nom | Type | Rôle |
| --- | --- | --- |
| `get_profile` | outil | Qui je suis, ce que je cherche, mes contacts |
| `search_projects` | outil | Projets en résumé, filtrables par techno ou compétence |
| `get_project` | outil | Détail d'un projet |
| `evaluate_fit` | prompt | Compare une fiche de poste à mon profil |

## Décisions

| Choix | Pourquoi | Écarté |
| --- | --- | --- |
| SDK MCP v2, sans framework | Apprendre le protocole, pas le masquer | Ancien `@modelcontextprotocol/sdk` |
| Streamable HTTP | Une URL suffit, rien à installer | stdio |
| Vercel | Le sous-domaine se branche par un CNAME chez GoDaddy | Cloudflare Workers, qui imposait de migrer les DNS |
| Sans état | Lecture seule, rien à garder entre deux appels | Sessions avec un stockage partagé entre instances |
| 3 outils précis | Une intention par outil, plus facile à choisir pour le modèle | Un seul `ask_portfolio` |
| Filtre `topic` | Les questions portent sur une techno ou une compétence | Recherche plein texte ou vectorielle |
| `evaluate_fit` en prompt | Le raisonnement revient au modèle du visiteur, pas au serveur | Outil qui calcule un score |
| Pas de ressource | C'est le modèle qui décide quoi consulter | Profil exposé en ressource |
| JSON dans un bloc texte | Lu par tous les clients | `structuredContent` |
| Erreurs avec les valeurs valides | Le modèle se corrige seul | Erreur générique |
| Descriptions EN, données FR | Sélection d'outil plus fiable en anglais, une seule source de données | Données traduites |
| Toutes origines + CORS | Données publiques, les clients navigateur doivent pouvoir appeler | Liste d'origines autorisées |
| Données validées par Zod | Une erreur casse la CI, pas la prod | Types TypeScript seuls |
| Tests via le vrai protocole | Teste la sérialisation et la négociation | Appeler les handlers directement |

## En local

```sh
pnpm install
pnpm dev     # http://localhost:8787
pnpm test
```
