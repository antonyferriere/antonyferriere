import { readFile, writeFile } from 'node:fs/promises';
import { profile } from '../src/data/profile.mjs';
import { escapeHtml } from '../src/components/html.mjs';
import { renderNavigation } from '../src/components/navigation.mjs';
import { renderHero } from '../src/sections/hero.mjs';
import { renderValue } from '../src/sections/value.mjs';
import { renderAchievements } from '../src/sections/achievements.mjs';
import { renderExpertise } from '../src/sections/expertise.mjs';
import { renderCareer } from '../src/sections/career.mjs';
import { renderMethod } from '../src/sections/method.mjs';
import { renderAbout } from '../src/sections/about.mjs';
import { renderContact } from '../src/sections/contact.mjs';

const themeInit = await readFile(new URL('../src/behaviors/theme-init.js', import.meta.url), 'utf8');
const head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <script>${themeInit}</script>
  <title>Antony Ferrière — Chef de projet IT senior · Côte d’Azur</title>
  <meta name="description" content="Chef de projet IT senior, Product Owner et profil hybride tech, produit et métier. Plus de 20 ans pour concevoir et piloter des solutions utiles. Nice, Sophia Antipolis, Côte d’Azur.">
  <meta name="theme-color" content="#f3f0e8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="canonical" href="${profile.canonical}">
  <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/src/styles/tokens.css"><link rel="stylesheet" href="/src/styles/base.css"><link rel="stylesheet" href="/src/styles/navigation.css"><link rel="stylesheet" href="/src/styles/hero.css"><link rel="stylesheet" href="/src/styles/sections.css">`;

await writeFile(new URL('../index.html', import.meta.url), `<!doctype html><html lang="fr"><head>${head}</head><body>${renderNavigation()}<main id="contenu" tabindex="-1">${renderHero()}${renderValue()}${renderAchievements()}${renderExpertise()}${renderCareer()}${renderMethod()}${renderAbout()}${renderContact()}</main><script type="module" src="/src/main.js"></script></body></html>`);
console.log(`Page HTML générée : ${escapeHtml(profile.name)}`);
