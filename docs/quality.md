# Vérifications de la première version

Contrôles effectués le 22 septembre 2026. Ce document décrit les vérifications réellement menées ; il ne constitue pas une certification d’accessibilité ou une mesure de trafic en production.

## Construction et code

- Build Vite réussi, sans avertissement de compilation.
- 8 tests `node:test` réussis : contraste des deux palettes et six scénarios de gestion de thème.
- Contrôle du HTML livré : identifiants uniques, un `h1`, ancres résolues, fichiers présents, images avec texte alternatif et dimensions, manifest et données `Person` valides.
- Initialisation du thème vérifiée avant les feuilles de style ; le test échoue également si le script attendu est absent.
- Aucun framework ni dépendance JavaScript livrée au navigateur. Code séparé en données, sections, styles et comportements ; styles regroupés en fichiers de moins de 300 lignes.
- Aucun secret, document de travail privé, fichier temporaire de contrôle ou `node_modules` dans le dépôt.

## Thèmes

Le Hero Jardin augmenté et le Hero Lumen vivant ont été examinés avant la construction des autres sections. Les deux partagent la composition mais possèdent des paysages, palettes et éclairages distincts.

Dans Chrome : changement depuis la navigation, mise à jour du nom accessible, rendu de chaque univers et restauration après rechargement. Le changement dans un autre onglet a également été observé.

Les tests automatisés couvrent le choix système initial clair/sombre, son évolution avant choix manuel, la priorité du choix enregistré, une nouvelle session, le stockage absent ou invalide, le changement entre onglets, la branche View Transition, le repli sans cette API et le mode réduction des animations. Ces scénarios utilisent un environnement navigateur simulé ; ils ne remplacent pas des essais sur chaque moteur réel.

## Accessibilité

- Axe-core 4.13 exécuté sur les deux thèmes avec les règles WCAG 2 A, AA et 2.1 AA : **0 violation détectée, 25 règles réussies par thème** lors du contrôle complet.
- Les éléments masqués par les apparitions ont été révélés pour l’audit. Les détails fermés restent des accordéons natifs.
- Les contrastes des zones sur image sont signalés comme indéterminables par l’outil ; ils ont été revus visuellement. Les ratios des paires de tokens texte/surface sont calculés dans les tests et dépassent 4,5:1.
- Navigation au clavier, lien d’évitement, focus, ouverture/fermeture du menu avec Échap et retour du focus au bouton contrôlés.
- Liens externes signalant le nouvel onglet ; adresse email et téléphone disponibles comme liens ; accordéons utilisables sans survol.
- Le lien d’évitement reste entièrement hors écran avant focus, y compris lorsque le texte est agrandi.

Un audit humain avec lecteurs d’écran NVDA et VoiceOver, ainsi que des essais Safari et Firefox sur appareils réels, restent à réaliser avant une déclaration formelle de conformité.

## Responsive

Contrôle des mises en page à 320, 390, 768, 1024, 1280 et 1600 pixels dans un cadre navigateur de largeur réglable. Vérification du Hero, de la navigation, des réalisations, de la chronologie et du contact.

Le texte a aussi été agrandi à 200 % à une largeur de 320 pixels. Les corrections portent sur les grilles, les boutons, les liens de contact, le lien d’évitement et le passage du menu sur une colonne. Cette vérification emploie un agrandissement de la taille racine ; elle ne simule pas tous les comportements de zoom ou réglages typographiques d’un système mobile.

## Performance

Mesures du build, hors éventuelles transformations de l’hébergeur :

| Ressource | Poids |
| --- | ---: |
| JavaScript | 1 902 octets gzip |
| CSS | environ 6,3 ko gzip |
| HTML | environ 8,5 ko gzip |
| Polices locales, total | 73 092 octets |
| Paysage Jardin, desktop / mobile | 97 774 / 29 924 octets |
| Paysage Lumen, desktop / mobile | 48 556 / 14 138 octets |
| Portrait, grand / petit | 100 838 / 31 528 octets |
| CV PDF, téléchargé à la demande | 219 970 octets |

Un seul paysage est chargé selon le thème et la largeur. Le portrait utilise `loading="lazy"`, des dimensions fixes et `srcset`. Animations en CSS, fondus et transformations ; aucun WebGL, aucune vidéo et aucun service distant nécessaire à l’affichage.

Les budgets bloquants sont de 10 ko gzip de JavaScript et 15 ko gzip de CSS. **Aucun score Lighthouse ni Core Web Vitals de terrain n’est revendiqué.** LCP, INP et CLS sont à mesurer sur la version publique, avec son hébergeur, son cache, des appareils réels et suffisamment de trafic ; les mesures d’un serveur de développement ne représenteraient pas ce contexte.

## Éditorial, SEO et Git

- CV et vraie photographie fournis intégrés ; chiffres limités au périmètre documenté.
- Titre, description, Open Graph, favicon, manifest, sitemap, robots et `Person` présents.
- Canonique de destination : `https://antony.ferrie.re/`.
- Développement et historique fonctionnel sur `dev`. `main` et `preprod` conservent l’initialisation du dépôt jusqu’à promotion explicite.
- Aperçu privé séparé : aucun remplacement du domaine de production ni changement DNS.

## Maintenance des dépendances — 23 septembre 2026

Vite est passé de 7.3.1 à 7.3.6 et sa dépendance esbuild est verrouillée en 0.28.2, pour corriger les alertes remontées par `npm audit`. Aucun changement de version majeure ni surcharge de dépendance n’a été nécessaire.

Après une réinstallation avec `npm ci --audit` : **0 vulnérabilité connue détectée**, build réussi, 8 tests réussis et contrôle du livrable réussi. Ce résultat décrit l’état de la base d’avis de sécurité à cette date, pas une garantie permanente d’absence de vulnérabilités. Les vérifications ont été exécutées sous Linux ; les correctifs Windows proviennent des versions publiées par les mainteneurs.

## Évolution Lumen — 23 septembre 2026

Les commits utilisateur `aeaecd5` et `33466db` ont été intégrés avant cette évolution. La palette sombre utilise désormais `#000D23` pour le fond, `#88E3B8` pour la couleur primaire et `#62D2DC` pour l’accent cyan. Surfaces, bordures, reflets, contact, favicon et couleur du navigateur sont harmonisés. Le bloc de tokens Jardin et ses médias sont inchangés par rapport à cette base.

Avant livraison, les commits utilisateur jusqu’à `f1cb4bc` ont également été intégrés : entrée « Valeur ajoutée » dans le menu et workflows de déploiement des branches `preprod` et `main`. Le build, les 8 tests et le contrôle du livrable ont été relancés sur cette base. La navigation a été revue dans Chrome à 1024, 1280 et 1363 px, sans débordement horizontal ; l’aperçu joint inclut cette nouvelle entrée.

Trois paysages ont été générés séparément à partir de la référence fournie : desktop, tablette portrait et mobile. Six exports WebP, sans agrandissement artificiel, permettent de choisir la composition et la définition en CSS. Détails et prompts : [assets Lumen](lumen-assets.md). Les deux anciens fichiers Lumen ont été retirés. Aucun JavaScript ni plugin supplémentaire n’est nécessaire à la sélection responsive.

Vérifications effectuées sur cette évolution :

- Build et contrôle des ancres, médias, métadonnées et budgets réussis ; les 8 tests existants passent.
- Chrome : rendu desktop, tablette et mobile, changement de thème, couleur de fond, couleur du navigateur et favicon correspondant au thème actif.
- Cadres de test de 320, 390, 768, 1024, 1280 et 1600 px ; leur largeur utile est réduite par la barre de défilement du navigateur de contrôle. Aucun débordement horizontal détecté. À 320 px, contrôle supplémentaire avec texte à 200 %.
- Sélection des trois compositions observée dans les styles calculés et les ressources chargées ; le premier chargement mobile ne demande que le WebP mobile léger. Les exports de densité supérieure sont présents et référencés, sans simulation d’un téléphone physique.
- Axe-core : 0 violation détectée en Lumen (24 règles réussies à la largeur tablette) et en Jardin (25 règles réussies à la largeur desktop). Les contrastes sur image restent des vérifications visuelles, pas une certification automatique. La ligne de texte mobile a été raccourcie pour éviter la zone claire du reflet.
- Aucune erreur ni aucun avertissement provenant du site dans les messages consultés pendant le contrôle final ; les messages de l’extension de l’environnement de contrôle sont exclus.

Poids du build mis à jour : **JavaScript 1 932 octets gzip**, **CSS 6 452 octets gzip**, HTML environ 8,4 ko gzip. Le paysage chargé pèse de **65 614 à 170 490 octets** selon le format et la densité. Le score Lighthouse et les Core Web Vitals de terrain n’ont pas été mesurés dans cette itération.
