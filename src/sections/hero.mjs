import { profile } from "../data/profile.mjs";
import { icon, escapeHtml } from "../components/html.mjs";

export function renderHero() {
  return /* HTML */ `<section
    class="hero"
    id="accueil"
    aria-labelledby="hero-title"
  >
    <div class="hero-landscape" aria-hidden="true"></div>
    <div class="hero-light" aria-hidden="true"></div>
    <div class="hero-content container">
      <div class="hero-copy">
        <p class="eyebrow hero-role">${escapeHtml(profile.role)}</p>
        <h1 id="hero-title">Antony<br /><span>Ferrière.</span></h1>
        <p class="hero-disciplines">
          Tech <span>·</span> Produit <span>·</span> Métier
        </p>
        <p class="hero-promise">
          Je transforme des besoins complexes en solutions numériques
          <strong>utiles, utilisables et réellement utilisées.</strong>
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="#approche"
            >Découvrir mon approche ${icon("down")}</a
          ><a class="text-link cv-link" href="${profile.cv}" download
            >Télécharger mon CV ${icon("download")}</a
          >
        </div>
      </div>
      <div
        class="hero-process"
        role="group"
        aria-label="Analyser, concevoir, concrétiser"
      >
        <p><span>01</span> Analyser</p>
        <p><span>02</span> Concevoir</p>
        <p><span>03</span> Concrétiser</p>
      </div>
      <div class="hero-foot">
        <ul class="hero-proof">
          <li><strong>20+</strong><span>ans dans le numérique</span></li>
          <li>Pilotage de bout en bout</li>
          <li>UX / Produit</li>
          <li>Innovation &amp; IA</li>
        </ul>
        <a class="scroll-link" href="#approche" aria-label="Découvrir la suite"
          >${icon("down")}</a
        >
      </div>
    </div>
  </section>`;
}
