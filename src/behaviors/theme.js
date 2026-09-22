const THEME_KEY = 'antony-theme';
const names = { garden: 'Jardin augmenté', lumen: 'Lumen vivant' };

export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector('#theme-switch');
  const system = matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let manual = false;
  let transitioning = false;
  try { manual = ['garden', 'lumen'].includes(localStorage.getItem(THEME_KEY)); } catch { /* Optional storage. */ }

  function apply(theme) {
    root.dataset.theme = theme;
    button.querySelector('[data-theme-name]').textContent = names[theme];
    const next = theme === 'garden' ? 'lumen' : 'garden';
    button.setAttribute('aria-label', `${names[theme]} actif. Passer à ${names[next]}`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'garden' ? '#f3f0e8' : '#081a36';
  }

  async function switchTheme() {
    if (transitioning) return;
    const theme = root.dataset.theme === 'garden' ? 'lumen' : 'garden';
    manual = true;
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* Keep the choice in memory. */ }
    if (reducedMotion.matches || !document.startViewTransition) { apply(theme); return; }

    const rect = button.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    transitioning = true;
    try {
      const transition = document.startViewTransition(() => apply(theme));
      await transition.ready;
      await root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 620, easing: 'cubic-bezier(.2,.7,.25,1)', pseudoElement: '::view-transition-new(root)' },
      ).finished;
      await transition.finished;
    } catch { apply(theme); } finally { transitioning = false; }
  }

  apply(root.dataset.theme);
  button.hidden = false;
  button.addEventListener('click', switchTheme);
  system.addEventListener('change', () => { if (!manual) apply(system.matches ? 'lumen' : 'garden'); });
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_KEY) return;
    manual = ['garden', 'lumen'].includes(event.newValue);
    apply(manual ? event.newValue : system.matches ? 'lumen' : 'garden');
  });
}
