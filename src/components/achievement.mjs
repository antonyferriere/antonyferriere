import { escapeHtml as e, icon } from "./html.mjs";

export function renderAchievement(item, featured = false) {
  const fields = [
    ["Contexte", item.context],
    ["Problème", item.problem],
    ["Mon rôle", item.role],
    ["Approche", item.approach],
    ["Résultat & portée", item.result],
  ];
  return /* HTML */ `<article
    class="achievement ${featured ? "achievement-featured" : ""}"
    data-reveal
  >
    ${featured
      ? '<div class="achievement-numbers"><p class="eyebrow">Un écosystème métier à forts volumes</p><p class="large-number">150 000<span>contacts dans le CRM</span></p><div class="secondary-number"><strong>&gt; 6 M€</strong><p>de chiffre d’affaires annuel<br>supporté par les parcours</p></div></div>'
      : ""}
    <div class="achievement-copy">
      <p class="case-meta"><span>${item.number}</span>${e(item.category)}</p>
      <h3>${e(item.title)}</h3>
      <p class="case-description">${e(item.description)}</p>
      <ul class="tags">
        ${item.tags.map((tag) => `<li>${e(tag)}</li>`).join("")}
      </ul>
      <details class="case-details">
        <summary>
          Explorer ce cas<span class="sr-only"> : ${e(item.title)}</span>${icon(
            "plus",
          )}<span class="details-close">Réduire</span>
        </summary>
        <dl>
          ${fields
            .map(
              ([label, value]) =>
                `<div><dt>${label}</dt><dd>${e(value)}</dd></div>`,
            )
            .join("")}
        </dl>
      </details>
    </div>
  </article>`;
}
