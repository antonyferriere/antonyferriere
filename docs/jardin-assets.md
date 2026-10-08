# Fonds Jardin méditerranéen

Mise à jour du 8 octobre 2026. Le desktop reprend l’image choisie par Antony (`1000133153.png`). Les compositions portrait ont été adaptées avec l’outil intégré de génération d’images, à partir de cette même référence.

## Exports

Tous les fichiers sont dans `public/images/`, en WebP avec canal alpha conservé. Aucun agrandissement artificiel. Qualité 84 pour les sources détaillées et 82 pour les exports légers.

| Usage | Léger | Détaillé |
| --- | --- | --- |
| Desktop / paysage | `jardin-mediterraneen-desktop-1280.webp` — 1280 × 720 | `jardin-mediterraneen-desktop.webp` — 1672 × 941 |
| Tablette portrait | `jardin-mediterraneen-tablet-768.webp` — 768 × 1024 | `jardin-mediterraneen-tablet.webp` — 1086 × 1448 |
| Mobile | `jardin-mediterraneen-mobile-480.webp` — 480 × 1013 | `jardin-mediterraneen-mobile.webp` — 863 × 1822 |

## Intégration

Même sélection que Lumen : mobile jusqu’à 700 px, tablette portrait de 701 à 1100 px, desktop ailleurs. `image-set()` sélectionne la densité ; au-delà de 1280 px, le desktop détaillé est utilisé. Les voiles ivoire assurent la transition vers `#f3f0e8` et soutiennent la lisibilité. La parallaxe et les préférences de mouvement sont conservées.

Les anciens fichiers `jardin-augmente*.webp` restent disponibles pour leurs autres usages. Les assets et tokens Lumen ne sont pas modifiés.

## Validation

13 tests existants réussis ; build Vite et contrôle des ressources réussis. Les six WebP sont décodables et possèdent un canal alpha non opaque. Pas de validation visuelle dans un navigateur lors de cette session.

## Prompts des compositions portrait

### Tablette

```text
Use case: stylized-concept. Create a single TABLET PORTRAIT 3:4 background asset based faithfully on the provided approved Mediterranean augmented garden hero. Recompose the same scene for portrait, not a collage: stone walking path entering lower right winding toward turquoise sea bay, olive tree framing upper right, lavender and grasses, warm natural sun, sparse hair-thin cyan network with tiny luminous nodes in lower right vegetation. Preserve photographic style, colors and atmosphere. Left 40% is calm and progressively genuinely alpha transparent for later dark text on ivory #f3f0e8; bottom edge smoothly fades to real transparency. No black or white solid backdrop, no text, no interface. The path and sea must be legible on right half. One image only, portrait 3:4. This is a project asset; return saved output file path.
```

### Mobile

```text
Use case: stylized-concept. Single MOBILE PORTRAIT 9:19 website hero background asset, faithfully adapting the provided approved Mediterranean augmented garden. Same stone path winding from lower right toward turquoise sea bay, lavender, grasses, olive tree framing right, warm sunlight, sparse fine cyan network and tiny nodes following lower-right plants. Recompose for narrow tall smartphone, with quiet sky upper half and scenery in lower half, sea around 55% height, path legible in lower third. Keep upper-left and center-left calm, progressively fade left edge to true alpha transparency for dark text over ivory #f3f0e8. Bottom smoothly fades to true transparency. Preserve photographic materials and original warm colors; no new objects, no text, no UI, no collage, no solid black background. One very tall 9:19 portrait only. This is a project asset; return saved output file path.
```

