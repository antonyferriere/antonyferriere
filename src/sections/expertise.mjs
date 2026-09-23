import { expertise, technologies, aiTools } from "../data/expertise.mjs";
import { escapeHtml as e } from "../components/html.mjs";

export function renderExpertise() {
  return /* HTML */ `<section
    class="section"
    id="expertise"
    aria-labelledby="expertise-title"
  >
    <div class="container">
      <header class="section-heading">
        <p class="eyebrow"><span>03</span> Expertise</p>
        <h2 id="expertise-title">Ce que je peux<br />prendre en charge</h2>
      </header>
      <div class="expertise-grid">
        ${expertise
          .map(
            (domain, index) =>
              `<article data-reveal><span class="column-index">0${index + 1} /</span><h3>${e(domain.title)}</h3><p>${e(domain.description)}</p><ul>${domain.items.map((item) => `<li>${e(item)}</li>`).join("")}</ul></article>`,
          )
          .join("")}
      </div>
      <div class="technical-culture">
        <div>
          <h3>Une culture technique<br />pour mieux décider</h3>
          <p>Comprendre les choix<br />En mesurer les conséquences</p>
        </div>
        <div>
          <p class="technical-label">Développement & outils</p>
          <ul class="technology-list">
            ${technologies.map((name) => `<li>${e(name)}</li>`).join("")}
          </ul>
          <p class="technical-label">IA générative</p>
          <ul class="technology-list">
            ${aiTools.map((name) => `<li>${e(name)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}
