export function initReveals() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('[data-reveal]');
  const show = (element) => {
    element.classList.replace('reveal-ready', 'reveal-visible');
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) show(entry.target); });
  }, { threshold: 0.06 });
  elements.forEach((element) => {
    // Do not hide first-screen content or content a visitor is already reading.
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('reveal-ready');
    observer.observe(element);
    element.addEventListener('focusin', () => show(element));
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) elements.forEach(show);
  });
}
