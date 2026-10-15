# Serveur MCP du portfolio - cap du projet

## Pourquoi ce projet

Deux objectifs, dans cet ordre :

1. Apprendre MCP au niveau du protocole, en le construisant à la main plutôt qu'en passant par un framework qui le masque.
2. Avoir une preuve concrète à montrer à des recruteurs AI engineer : un serveur en production, testé, que n'importe qui peut brancher dans son assistant en collant une URL.

Si un choix sert le second objectif au détriment du premier, le premier gagne.

## Pour qui

Un recruteur ou un client qui ajoute le serveur dans Claude (ou un autre client MCP) et pose des questions en langage naturel sur mon parcours. Il ne lira jamais le code. Un recruteur technique, lui, lira le dépôt.

## Ce que le visiteur doit pouvoir faire

- Comprendre en une question qui je suis et ce que je cherche.
- Trouver les projets qui correspondent à une technologie ou à un type de problème.
- Obtenir le détail d'un projet avec des résultats concrets.
- Vérifier si mon profil correspond à une fiche de poste précise.
- Me contacter.

Le découpage en outils, ressources et prompts reste à concevoir à partir de ces besoins.

## Décisions déjà prises

- TypeScript strict.
- SDK officiel MCP en v2 (`@modelcontextprotocol/server`), pas l'ancien `@modelcontextprotocol/sdk`.
- Hono, déployé sur Cloudflare Workers.
- Transport Streamable HTTP.
- Endpoint sur un sous-domaine dédié, la page de présentation reste sur le portfolio.

## Contraintes non négociables

- Lecture seule : le serveur ne modifie et n'envoie rien.
- Aucun appel à un modèle de langage côté serveur.
- Aucune donnée qui ne soit pas déjà publique sur le portfolio.
- Une seule source de vérité pour les données.
- Le code, les commentaires, le README et les commits ne mentionnent aucun outil d'assistance.

## Ce que je dois savoir expliquer à la fin

- La différence entre outil, ressource et prompt, et pourquoi j'ai mis chaque chose dans l'une ou l'autre.
- Ce qui se passe entre le moment où l'assistant décide d'appeler un outil et le moment où il reçoit la réponse.
- Pourquoi j'ai choisi un mode avec ou sans état.
- Comment le modèle choisit un outil, et en quoi la rédaction des descriptions change ce choix.
- Comment une erreur doit être renvoyée pour que l'assistant puisse se corriger seul.

Si je ne peux pas expliquer un de ces points sans regarder le code, le projet n'est pas fini.

## Questions à trancher en cours de route

- Combien d'outils ? Peu d'outils larges ou beaucoup d'outils précis, et qu'est-ce que ça change pour le modèle ?
- Faut-il un outil de recherche libre, ou des filtres suffisent-ils ?
- Quel format de réponse : texte, JSON, contenu structuré ? Qu'est-ce que l'assistant exploite le mieux ?
- Les données en français, en anglais, ou les deux ?
- Comment valider les données pour qu'une erreur bloque le déploiement plutôt qu'une réponse en production ?
- Comment tester le serveur de bout en bout sans dépendre d'un vrai client ?
- Que faut-il mesurer en production pour savoir si le serveur est utile ?

Chaque décision prise est notée dans le README avec sa raison et l'alternative écartée.

## Hors périmètre

- Authentification.
- Interface graphique, la page vitrine existe déjà.
- Toute fonctionnalité d'écriture (prise de rendez-vous, formulaire de contact).

Ces sujets pourront faire l'objet d'une deuxième version, une fois la première en ligne.

## Critères de réussite

- Le serveur s'ajoute dans Claude avec une seule URL et répond juste à « Quels projets ont utilisé TypeScript en production ? ».
- Chaque capacité exposée est couverte par un test qui passe par le vrai protocole.
- Le déploiement part automatiquement quand les tests passent sur la branche principale.
- Un endpoint public protégé contre les abus.
- Un README qu'un recruteur technique lit en trois minutes et qui montre les choix, pas seulement l'installation.

## Jalons

1. Un serveur local avec une seule capacité, testé avec le MCP Inspector.
2. Toutes les capacités conçues, données validées, tests en place.
3. Déployé, branché dans Claude, testé avec de vraies questions de recruteur.
4. README rédigé, page /mcp du portfolio mise en ligne.
5. Après un mois en production : relecture des logs et ajustement des descriptions.
