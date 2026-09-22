import { navigation, profile } from '../data/profile.mjs';
import { icon } from './html.mjs';

export function renderNavigation() {
  return `<a class="skip-link" href="#contenu">Aller au contenu</a>
  <header class="site-header" id="site-header">
    <div class="navigation container">
      <a class="brand" href="#accueil" aria-label="Antony Ferrière, accueil"><span class="monogram" aria-hidden="true">af<span>.</span></span><span class="brand-name">Antony Ferrière</span></a>
      <nav class="main-navigation" id="main-navigation" aria-label="Navigation principale">
        ${navigation.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
        <a class="navigation-cv" href="${profile.cv}" download>CV ${icon('download')}</a>
        <a class="navigation-contact" href="#contact">Contact ${icon('diagonal')}</a>
      </nav>
      <button class="theme-switch" id="theme-switch" type="button" aria-label="Changer d’univers visuel" aria-describedby="theme-hint" hidden>
        <span class="theme-orb" aria-hidden="true"></span>
        <span class="theme-label"><span data-theme-name>Jardin augmenté</span><span class="theme-action">Changer d’univers</span></span>
      </button>
      <span id="theme-hint" class="sr-only">Alterner entre Jardin augmenté, thème clair, et Lumen vivant, thème sombre.</span>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Ouvrir le menu" hidden>${icon('menu')}</button>
    </div>
    <div class="reading-progress" aria-hidden="true"></div>
  </header>`;
}
