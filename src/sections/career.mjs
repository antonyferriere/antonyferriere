import { career } from "../data/career.mjs";
import { escapeHtml as e } from "../components/html.mjs";

function careerItem(item) {
  return /* HTML */ `<li
    class="career-item ${item.featured ? "career-featured" : ""}"
    data-reveal
  >
    <div class="career-date">
      <time datetime="${item.year}">${item.year}</time
      ><span>${e(item.end)}</span>
    </div>
    <div class="career-story">
      <p class="career-verb">${e(item.verb)}</p>
      <h3>${e(item.role)}</h3>
      <p class="career-company">${e(item.company)}</p>
      <p class="career-description">${e(item.text)}</p>
    </div>
  </li>`;
}

export function renderCareer() {
  return /* HTML */ `<section
    class="section career-section"
    id="parcours"
    aria-labelledby="career-title"
  >
    <div class="container career-layout">
      <header class="section-heading career-heading">
        <p class="eyebrow"><span>04</span> Parcours</p>
        <h2 id="career-title">
          Du code à la<br />vision globale<br />du produit
        </h2>
        <p class="section-intro">
          Chaque étape a ajouté une perspective. Ensemble, elles m’aident à voir
          un projet dans sa globalité.
        </p>
        <p class="career-note">
          Une progression chez Key4events<span
            >Développeur senior<br />↓ Chef de projet IT<br />↓ Responsable
            innovation logicielle</span
          >
        </p>
      </header>
      <ol class="career-timeline">
        ${career.map(careerItem).join("")}
      </ol>
    </div>
  </section>`;
}
