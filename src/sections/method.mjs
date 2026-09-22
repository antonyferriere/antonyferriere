const steps = [
  ['Écouter', 'Les personnes, leurs usages, leur réalité.'],
  ['Clarifier', 'Le problème, les contraintes, l’objectif.'],
  ['Simplifier', 'Les parcours comme les solutions.'],
  ['Prioriser', 'La valeur, l’effort, les dépendances.'],
  ['Construire', 'Ensemble, par étapes concrètes.'],
  ['Mesurer', 'Ce qui fonctionne dans l’usage réel.'],
  ['Améliorer', 'Apprendre, ajuster, faire évoluer.'],
];
export function renderMethod() {
  return `<section class="section method-section" id="methode" aria-labelledby="method-title"><div class="container"><header class="section-heading"><p class="eyebrow"><span>05</span> Méthode</p><h2 id="method-title">Ma façon d’aborder<br>un projet.</h2><p class="section-intro">Avancer avec une direction claire, des étapes concrètes et la place nécessaire pour apprendre.</p></header><ol class="method-steps">${steps.map(([name, detail], i) => `<li data-reveal><span class="step-number">0${i + 1}</span><h3>${name}</h3><p>${detail}</p></li>`).join('')}</ol><div class="convictions"><article><p class="eyebrow">Simplicité</p><blockquote>« Une bonne solution ne devrait pas paraître plus compliquée que le problème qu’elle résout. »</blockquote></article><article><p class="eyebrow">Usage</p><blockquote>« Une fonctionnalité n’a de valeur que si elle est réellement adoptée. »</blockquote></article><article><p class="eyebrow">Collectif</p><blockquote>« La qualité naît du dialogue entre utilisateurs, métier et technique. »</blockquote></article></div></div></section>`;
}
