export function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const landscape = hero?.querySelector(".hero-landscape");
  if (!landscape) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;

  const update = () => {
    frame = 0;
    const { top, height } = hero.getBoundingClientRect();
    // Keep the exposed top edge above the viewport as the image drifts down.
    const distance = Math.min(Math.max(-top, 0), height);
    const offset = Math.min(distance * 0.12, 96);
    landscape.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const syncMotion = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (reducedMotion.matches) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      landscape.style.removeProperty("transform");
    } else {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      schedule();
    }
  };

  reducedMotion.addEventListener("change", syncMotion);
  syncMotion();
}
