import { achievements } from "../data/achievements.mjs";
import { renderAchievement } from "../components/achievement.mjs";
import { icon } from "../components/html.mjs";

export function renderAchievements() {
  return /* HTML */ `<section
    class="section achievements-section landscape-section"
    id="realisations"
    aria-labelledby="achievements-title"
  >
    <div class="section-landscape" aria-hidden="true"></div>
    <div class="container">
      <header class="section-heading">
        <p class="eyebrow">Réalisations</p>
        <h2 id="achievements-title">
          Quelques problèmes que<br />j’ai contribué à résoudre
        </h2>
        <p class="section-intro">
          Des contextes différents. Un même fil conducteur : comprendre la
          complexité et la rendre utile.
        </p>
      </header>
      ${renderAchievement(achievements[0], true)}
      <div class="achievement-grid">
        ${achievements
          .slice(1)
          .map((item) => renderAchievement(item))
          .join("")}
      </div>
      <dialog class="card case-dialog" id="case-dialog" aria-labelledby="case-dialog-title">
        <header class="case-dialog-header">
          <div>
            <p class="case-meta" data-case-category></p>
            <h2 id="case-dialog-title"></h2>
          </div>
          <button
            class="case-dialog-close"
            type="button"
            aria-label="Fermer ce cas"
            autofocus
          >${icon("close")}</button>
        </header>
        <div class="case-dialog-body"></div>
      </dialog>
    </div>
  </section>`;
}
