import { achievements } from '../data/achievements.mjs';
import { renderAchievement } from '../components/achievement.mjs';

export function renderAchievements() {
  return `<section class="section achievements-section" id="realisations" aria-labelledby="achievements-title"><div class="container">
    <header class="section-heading"><p class="eyebrow"><span>02</span> Réalisations</p><h2 id="achievements-title">Quelques problèmes que<br>j’ai contribué à résoudre.</h2><p class="section-intro">Des contextes différents. Un même fil conducteur : comprendre la complexité et la rendre utile.</p></header>
    ${renderAchievement(achievements[0], true)}<div class="achievement-grid">${achievements.slice(1).map((item) => renderAchievement(item)).join('')}</div>
  </div></section>`;
}
