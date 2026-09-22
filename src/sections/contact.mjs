import { profile } from "../data/profile.mjs";
import { icon } from "../components/html.mjs";

export function renderContact() {
  return /* HTML */ `<section
    class="section contact-section"
    id="contact"
    aria-labelledby="contact-title"
  >
    <div class="container">
      <p class="eyebrow"><span>07</span> La suite commence par un échange</p>
      <div class="contact-layout">
        <div>
          <h2 id="contact-title">Un projet à<br />faire avancer ?</h2>
          <a class="contact-cta" href="mailto:${profile.email}"
            ><span>Échangeons</span> ${icon("diagonal")}</a
          >
        </div>
        <div class="contact-copy">
          <p>
            Je recherche aujourd’hui un environnement dans lequel je peux mettre
            à profit mon expérience du pilotage IT, ma culture technique et ma
            sensibilité produit pour construire des solutions numériques
            réellement utiles.
          </p>
          <p class="contact-roles">
            Chef de projet IT senior · Product Owner<br />Responsable applicatif
          </p>
          <p>${profile.location}<br /><span>Nice · Sophia Antipolis</span></p>
        </div>
      </div>
      <div class="contact-links">
        <a href="mailto:${profile.email}"
          >${profile.email} ${icon("diagonal")}</a
        ><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"
          >LinkedIn <span class="sr-only">(nouvel onglet)</span>${icon(
            "diagonal",
          )}</a
        ><a href="${profile.cv}" download>CV PDF ${icon("download")}</a
        ><a class="phone-link" href="tel:${profile.phone}"
          >${profile.phoneLabel}</a
        >
      </div>
    </div>
  </section>`;
}

export function renderFooter() {
  return /* HTML */ `<footer class="footer container">
    <p>© ${new Date().getFullYear()} Antony Ferrière</p>
    <p>Analyser. Concevoir. Concrétiser.</p>
    <a href="#accueil">Retour en haut ${icon("diagonal")}</a>
  </footer>`;
}
