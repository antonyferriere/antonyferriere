# Antony Ferrière

Site professionnel d’Antony Ferrière, chef de projet IT senior. Une page éditoriale qui relie la promesse, les preuves, les compétences et la personne, avec deux expressions d’une même identité : **Jardin augmenté** et **Lumen vivant**.

Le domaine de destination est `https://antony.ferrie.re/`. Cette première version dispose d’un aperçu privé séparé ; elle ne remplace pas automatiquement le site existant.

## Choix techniques

**HTML pré-rendu, CSS moderne et JavaScript natif.** Aucun framework ni dépendance exécutée dans le navigateur. Vite est l’unique dépendance de développement : serveur local, rechargement et optimisation des fichiers de production.

Le contenu est rendu lors du build par de petites fonctions JavaScript. Il arrive intégralement dans le HTML : lecture, ancres, liens de contact, CV et détails des réalisations fonctionnent sans JavaScript. Le JavaScript ajoute les thèmes, la navigation mobile et les apparitions progressives.

Pas de serveur applicatif, de base de données, de compte, de cookie ou de service tiers de suivi. Les deux polices sont hébergées localement. Aucun appel externe n’est nécessaire à l’affichage.

## Démarrer

Prérequis : **Node.js 22.12+ ou 24 LTS**, npm et Git.

```sh
git clone https://github.com/antonyferriere/antonyferriere.git
cd antonyferriere
git switch dev
npm ci
npm run dev
```

Le serveur de développement utilise le port `4173`. Ouvrir l’adresse indiquée dans le terminal. Les changements dans les données et les sections régénèrent automatiquement le HTML.

```sh
npm run build    # Génère dist/, prêt pour un hébergement statique
npm test         # Thèmes, persistance, repli et contrastes des tokens
npm run check    # Contrôle le build : structure, liens internes, médias, SEO, budgets
npm audit        # Vulnérabilités connues, dépendances de développement incluses
npm run preview  # Sert le build localement
```

Exécuter `build` avant `check`. `index.html` à la racine et `dist/` sont générés ; ils ne se modifient pas et ne se versionnent pas.

## Architecture

| Emplacement | Responsabilité |
| --- | --- |
| `src/data/` | Profil, coordonnées, réalisations, expertises et expériences |
| `src/sections/` | Huit sections du parcours de lecture ; textes éditoriaux courts |
| `src/components/` | Navigation, détail d’une réalisation, icônes, métadonnées et échappement HTML |
| `src/styles/tokens.css` | Fondations et variables sémantiques des deux thèmes |
| `src/styles/base.css` | Typographie, grille, liens, focus et styles communs |
| `src/styles/navigation.css` | Navigation, menu mobile et sélecteur de thème |
| `src/styles/hero.css` | Composition, paysage et lumière de l’accueil |
| `src/styles/value-expertise.css`, `achievements.css`, `career-method.css`, `about-contact.css` | Styles des sections et règles responsive, regroupés par rôle |
| `src/behaviors/` | Améliorations progressives : thème, navigation et révélations |
| `src/main.js` | Initialisation explicite des trois comportements |
| `public/` | Médias optimisés, CV PDF, polices, favicon, manifest, robots et sitemap |
| `scripts/render.mjs` | Assemblage du document HTML au build |
| `scripts/check.mjs` | Vérifications du résultat livré et budgets de poids |
| `tests/` | Tests natifs `node:test`, sans outil supplémentaire |
| `docs/` | Provenance des contenus et compte rendu de validation |

Chaque section retourne du HTML. Les données variables passent par `escapeHtml` ; les données structurées échappent également les caractères `<`. Les composants n’importent pas de framework et les comportements ne pilotent pas le rendu du contenu.

## Les deux thèmes

| Identifiant | Univers | Expression |
| --- | --- | --- |
| `garden` | Jardin augmenté | Ivoire, forêt, eau claire, reliefs et lumière diffuse |
| `lumen` | Lumen vivant | Bleu profond, mer nocturne, reflets et lumière localisée |

Les composants partagent structure, typographie et mise en page. Les couleurs, les surfaces, les ombres et les paysages proviennent des tokens sémantiques. Le bleu des liens du thème clair est plus sombre que l’accent décoratif pour conserver un contraste suffisant.

### Fonctionnement du ThemeSwitcher

1. Un script très court, placé avant les feuilles de style, lit `localStorage['antony-theme']`.
2. Si la valeur est `garden` ou `lumen`, ce choix est appliqué avant le premier rendu. Sinon, le site suit `prefers-color-scheme`.
3. Le système reste suivi tant qu’aucun choix manuel n’est effectué.
4. Le bouton visible dans la navigation alterne les deux univers et mémorise le choix. Son nom accessible indique le thème actif et l’action suivante.
5. Les onglets se synchronisent grâce à l’événement `storage`. Si le stockage est indisponible, le bouton reste fonctionnel pour la visite.

Sur les navigateurs compatibles, la View Transition API révèle le nouveau thème par une onde circulaire de **620 ms** depuis le sélecteur. Sans cette API, ou avec `prefers-reduced-motion: reduce`, le changement est immédiat. Il n’y a pas de rechargement de page.

Pour retrouver le suivi du système pendant un test, effacer la clé `antony-theme` dans les outils de développement du navigateur, puis recharger. Cette opération n’est pas nécessaire à l’utilisation courante.

## Modifier les contenus

- **Coordonnées, CV, liens et intitulé principal** : `src/data/profile.mjs`.
- **Cas de réalisation** : `src/data/achievements.mjs`. Garder contexte, problème, rôle, approche et résultat ; distinguer périmètre traité et impact mesuré.
- **Parcours** : `src/data/career.mjs`, dans l’ordre chronologique.
- **Compétences** : `src/data/expertise.mjs`.
- **Accroche, méthode et présentation personnelle** : la section correspondante dans `src/sections/`.
- **Photographie et CV** : remplacer les fichiers dans `public/`, puis vérifier les chemins, dimensions, `srcset` et textes alternatifs.

La photographie est celle fournie par Antony ; elle n’a pas été générée. Les deux paysages sont des illustrations d’ambiance générées pour ce site, sans représenter un lieu personnel documenté. Les images WebP disposent de versions mobiles. Le CV est le PDF fourni, sans réécriture.

Ne pas ajouter de chiffre d’impact, de référence client ou d’expérience sans source. Les documents privés du bilan de carrière ne sont pas intégrés au dépôt. Voir [la provenance éditoriale](docs/content-sources.md).

## Accessibilité et performance

HTML français et sémantique, un seul `h1`, ordre logique des titres, lien d’évitement, focus visible, navigation au clavier, menu refermable avec Échap et accordéons natifs `<details>`.

Les apparitions utilisent `IntersectionObserver` ; les contenus restent visibles si cette API ou JavaScript est indisponible. Un élément contenant le focus devient visible immédiatement. La réduction des animations couvre aussi le scroll et le changement de thème.

Les tests de contraste portent sur les tokens textuels des deux univers. Les tests automatisés ne constituent pas une certification WCAG : les fonds illustrés, les lecteurs d’écran et les navigateurs nécessitent aussi des contrôles humains. Voir [les vérifications et leurs limites](docs/quality.md).

Budgets bloquants du build : **JavaScript < 10 ko gzip**, **CSS < 15 ko gzip**. Le portrait est différé, les dimensions sont réservées et les polices utilisent `font-display: swap`. Aucune vidéo, aucun WebGL ni bibliothèque d’animation.

## SEO

Titre, description, URL canonique, Open Graph, carte de partage, données structurées `Person`, favicon, manifest, sitemap et robots sont fournis. Les métadonnées sont centralisées dans `src/components/metadata.mjs`.

Avant un changement de domaine, actualiser `profile.canonical`, `public/sitemap.xml` et `public/robots.txt`. Les URL actuelles ciblent le futur site `antony.ferrie.re`, pas l’aperçu privé.

## Git et livraison

| Branche | Rôle |
| --- | --- |
| `dev` | Développement et itérations |
| `preprod` | Validation avant production |
| `main` | Production stable |

Tout le développement initial se trouve sur `dev`, par commits fonctionnels. Les branches `main` et `preprod` conservent l’initialisation du dépôt. La promotion se fait par demandes de fusion **`dev` → `preprod` → `main`**, après vérification du build et de l’interface. Ne pas développer directement sur `main`.

`node_modules`, `dist`, les pages de contrôle temporaires, les journaux et les fichiers `.env` sont ignorés. Aucun secret n’est requis par le site. Le fichier `.openai/hosting.json` contient uniquement l’identifiant du site d’aperçu et le répertoire statique, pas de jeton.

### Hébergement

Déployer le contenu de `dist/` sur un hébergement statique HTTPS. Aucun processus Node n’est nécessaire en production. Le fichier `public/_headers` propose des en-têtes pour les hébergeurs qui comprennent ce format ; sur les autres, les configurer dans le serveur ou la plateforme.

L’aperçu privé Sites est associé à `.openai/hosting.json`. Sa publication est distincte du dépôt GitHub et de la mise en production sur `antony.ferrie.re`. Il ne faut pas modifier le DNS ou remplacer l’ancien site avant la validation de la version de production.

## Polices et médias

Inter et Manrope sont distribuées sous SIL Open Font License, jointe dans `public/fonts/`. Le portrait, le CV et les contenus professionnels appartiennent à Antony Ferrière. Leur présence dans ce dépôt ne constitue pas une autorisation générale de réutilisation.
