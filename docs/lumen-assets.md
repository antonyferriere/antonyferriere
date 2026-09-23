# Fonds Lumen vivant

Création du 23 septembre 2026 avec l’outil intégré de génération d’images. Référence artistique : capture « 1. Landing page - Lumen vivant(1).png » fournie par Antony. Les scènes sont des illustrations originales ; elles ne documentent pas un lieu réel.

La palette part du bleu profond `#000D23` et du vert `#88E3B8`. Les trois compositions préservent une zone calme derrière le texte et placent la lumière sur l’eau, les rochers et le reflet de lune.

## Fichiers livrés

| Usage | Export léger | Export détaillé |
| --- | --- | --- |
| Desktop et paysage | `lumen-vivant-desktop-1280.webp` — 1280 × 720, 92 542 octets | `lumen-vivant-desktop.webp` — 1672 × 941, 139 456 octets |
| Tablette en portrait | `lumen-vivant-tablet-768.webp` — 768 × 1024, 98 610 octets | `lumen-vivant-tablet.webp` — 1086 × 1448, 170 490 octets |
| Mobile | `lumen-vivant-mobile-480.webp` — 480 × 1012, 65 614 octets | `lumen-vivant-mobile.webp` — 864 × 1821, 164 848 octets |

Tous se trouvent dans `public/images/`. Les résolutions détaillées sont celles réellement produites par le générateur ; aucun agrandissement artificiel n’a été appliqué. Les exports légers sont redimensionnés proportionnellement et tous les exports sont encodés en WebP, qualité 78. Aucune dépendance de traitement d’image n’est ajoutée au projet.

## Sélection responsive

Les tokens `--hero-image`, `--hero-image-tablet` et `--hero-image-small` décrivent les sources. Jusqu’à 700 px, le hero utilise la composition mobile. De 701 à 1100 px en orientation portrait, il utilise la tablette. Les autres écrans utilisent le paysage. `image-set()` laisse le navigateur choisir le fichier selon la densité de pixels ; au-delà de 1280 px, le paysage détaillé est utilisé même à densité standard.

Le fond est décoratif et masqué aux lecteurs d’écran. Aucun JavaScript de sélection d’image n’est nécessaire. Les voiles sont définis dans les tokens et renforcent le contraste sans aplatir la zone lumineuse. Le thème Jardin conserve ses fichiers, couleurs et règles de cadrage.

## Prompts exacts

Le fichier de référence est fourni comme image d’inspiration, pas comme image à afficher sur le site. Chaque prompt correspond à un appel distinct au générateur intégré.

### desktop

```text
Use case: stylized-concept.
Asset type: one clean edge-to-edge photographic, art-directed nocturnal coastal background image. Render ONLY the environment, with no graphic design or interface.
Input image 1 role: reference ONLY for its background scene, crystalline illuminated seabed, calm Mediterranean bay, distant mountains, moon reflection and nighttime mood. Ignore and completely remove every element of lettering, UI, buttons, logos and graphic overlays from the reference. This is a new environmental composition in the same world.
Scene: a calm Mediterranean coastal bay at night, deep rich blue navy sky anchored in #000D23, one small natural full moon with a delicate silvery reflection on dark-blue water, a mountainous distant coastline curving around the bay on the right, tiny warm golden lights along that distant right-hand coast. The foreground sea becomes crystal clear with distinctly visible natural rocks beneath the surface and exquisite lively refracted aqua/mint caustics. The luminous color accent is fresh mint, approximately #88E3B8, blended naturally with cyan, aqua and deep blue. Let the water feel alive, jewel-like, optically clear and immersive, with photographic natural material detail, subtle ripples, depth, and restrained luminous magic.
Technological detail: very rare hair-thin cyan/mint light filaments and a few subtle light points following the submerged rocky seabed topology. These filaments appear to softly illuminate the water locally; they never form a large floating web or dominate the natural scene.
Lighting: rich navy shadows anchored in #000D23, living mint/aqua luminous refraction in the lower-right seabed, soft silver moon path. Maintain a beautiful clear blue night with depth and contrast, no cold gray veil or dull haze.
Constraints: exactly ONE image, no triptych, no collage, no contact sheet, no lettering of any kind, no typography, no words, no numbers, no logos, no watermark, no UI, no buttons, no frames, no borders, no people, no boats, no buildings in foreground. No giant moon, no extra moons, no planets or space scenery, no cyberpunk, no oversaturation, no hard split-water seam, no dense triangulated mesh or generic neural network. The transition from distant opaque water to transparent shallow foreground is optically continuous. Keep the requested copy-safe areas calm and dark without rendering any copy.
Dedicated DESKTOP composition: widescreen 16:9 landscape, highest practical source resolution, aim for 2560×1440. Compose as a true wide environmental image. The left 45% is quiet, calm and dark blue for later text; keep the top navigation zone quiet. Place the small full moon near x=75%, y=20%; keep its luminous halo modest. Horizon around y=40%. Keep coastal mountains, town lights and silver moon path primarily on the right. The brightest luminous crystalline rocks enter from the bottom-right and sweep toward bottom-center, with the seabed legible across the lower third. Keep the text-safe left half naturally dark but dimensional. No bright patches under left-side text.
```

### tablet

```text
Use case: stylized-concept.
Asset type: one clean edge-to-edge photographic, art-directed nocturnal coastal background image. Render ONLY the environment, with no graphic design or interface.
Input image 1 role: reference ONLY for its background scene, crystalline illuminated seabed, calm Mediterranean bay, distant mountains, moon reflection and nighttime mood. Ignore and completely remove every element of lettering, UI, buttons, logos and graphic overlays from the reference. This is a new environmental composition in the same world.
Scene: a calm Mediterranean coastal bay at night, deep rich blue navy sky anchored in #000D23, one small natural full moon with a delicate silvery reflection on dark-blue water, a mountainous distant coastline curving around the bay on the right, tiny warm golden lights along that distant right-hand coast. The foreground sea becomes crystal clear with distinctly visible natural rocks beneath the surface and exquisite lively refracted aqua/mint caustics. The luminous color accent is fresh mint, approximately #88E3B8, blended naturally with cyan, aqua and deep blue. Let the water feel alive, jewel-like, optically clear and immersive, with photographic natural material detail, subtle ripples, depth, and restrained luminous magic.
Technological detail: very rare hair-thin cyan/mint light filaments and a few subtle light points following the submerged rocky seabed topology. These filaments appear to softly illuminate the water locally; they never form a large floating web or dominate the natural scene.
Lighting: rich navy shadows anchored in #000D23, living mint/aqua luminous refraction in the lower-right seabed, soft silver moon path. Maintain a beautiful clear blue night with depth and contrast, no cold gray veil or dull haze.
Constraints: exactly ONE image, no triptych, no collage, no contact sheet, no lettering of any kind, no typography, no words, no numbers, no logos, no watermark, no UI, no buttons, no frames, no borders, no people, no boats, no buildings in foreground. No giant moon, no extra moons, no planets or space scenery, no cyberpunk, no oversaturation, no hard split-water seam, no dense triangulated mesh or generic neural network. The transition from distant opaque water to transparent shallow foreground is optically continuous. Keep the requested copy-safe areas calm and dark without rendering any copy.
Dedicated TABLET composition: portrait 3:4 aspect ratio, highest practical source resolution, aim for 1536×2048. Recompose this same world for a tall image rather than cropping a landscape. Small natural moon upper-right near x=78%, y=18%; horizon around y=37%. Leave the left half and center-left calm, dark, low-detail blue for later text; upper edge quiet for navigation. Let the moon reflection remain on the right. The distant bay and coast sit on the right and the beautiful transparent luminous seabed occupies the bottom third, with the most vivid mint caustics and distinct rocks on the bottom-right, extending gently toward bottom-center. Maintain enough scene detail to feel immersive without putting bright features under the central-left copy-safe space.
```

### mobile

```text
Use case: stylized-concept.
Asset type: one clean edge-to-edge photographic, art-directed nocturnal coastal background image. Render ONLY the environment, with no graphic design or interface.
Input image 1 role: reference ONLY for its background scene, crystalline illuminated seabed, calm Mediterranean bay, distant mountains, moon reflection and nighttime mood. Ignore and completely remove every element of lettering, UI, buttons, logos and graphic overlays from the reference. This is a new environmental composition in the same world.
Scene: a calm Mediterranean coastal bay at night, deep rich blue navy sky anchored in #000D23, one small natural full moon with a delicate silvery reflection on dark-blue water, a mountainous distant coastline curving around the bay on the right, tiny warm golden lights along that distant right-hand coast. The foreground sea becomes crystal clear with distinctly visible natural rocks beneath the surface and exquisite lively refracted aqua/mint caustics. The luminous color accent is fresh mint, approximately #88E3B8, blended naturally with cyan, aqua and deep blue. Let the water feel alive, jewel-like, optically clear and immersive, with photographic natural material detail, subtle ripples, depth, and restrained luminous magic.
Technological detail: very rare hair-thin cyan/mint light filaments and a few subtle light points following the submerged rocky seabed topology. These filaments appear to softly illuminate the water locally; they never form a large floating web or dominate the natural scene.
Lighting: rich navy shadows anchored in #000D23, living mint/aqua luminous refraction in the lower-right seabed, soft silver moon path. Maintain a beautiful clear blue night with depth and contrast, no cold gray veil or dull haze.
Constraints: exactly ONE image, no triptych, no collage, no contact sheet, no lettering of any kind, no typography, no words, no numbers, no logos, no watermark, no UI, no buttons, no frames, no borders, no people, no boats, no buildings in foreground. No giant moon, no extra moons, no planets or space scenery, no cyberpunk, no oversaturation, no hard split-water seam, no dense triangulated mesh or generic neural network. The transition from distant opaque water to transparent shallow foreground is optically continuous. Keep the requested copy-safe areas calm and dark without rendering any copy.
Dedicated SMARTPHONE composition: very tall portrait approximately 9:19 aspect ratio, highest practical source resolution, aim for 1080×2280. Recompose this same world specifically for a narrow tall screen rather than crop a landscape. Reserve the upper half and left-center as quiet dark blue for a title and navigation to be overlaid later. Small natural full moon upper-right near x=85%, y=15%; keep the halo compact. Horizon around y=37%. Moon reflection remains well to the right; distant mountains and tiny warm bay lights hug the right side. The lower 35% has crystal-clear luminous water and richly legible natural rocks, fresh mint caustics and rare delicate technological filaments conforming to the seabed. Keep the lower scene vivid enough to read after a web interface overlay, while avoiding bright patches behind the left-center copy area. Full uninterrupted edge-to-edge scene.
```
