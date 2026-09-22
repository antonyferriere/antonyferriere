// Content is text by default. Markup belongs in section templates.
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

export function icon(name, className = '') {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    down: '<path d="M12 4v15m-6-6 6 6 6-6"/>',
    diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
}

export function sectionTitle(number, label, title, description = '') {
  return `<header class="section-heading"><p class="eyebrow"><span>${number}</span> ${label}</p><h2>${title}</h2>${description ? `<p class="section-intro">${description}</p>` : ''}</header>`;
}
