export function initSectionParallax() {
  const layers = [...document.querySelectorAll(".landscape-section")]
    .map((section) => ({
      section,
      landscape: section.querySelector(".section-landscape"),
    }))
    .filter(({ landscape }) => landscape);
  if (!layers.length) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;

  const update = () => {
    frame = 0;
    for (const { section, landscape } of layers) {
      const { top, height } = section.getBoundingClientRect();
      // Keep the exposed top edge above the viewport as the image drifts down.
      const distance = Math.min(Math.max(-top, 0), height);
      const offset = Math.min(distance * 0.12, 96);
      landscape.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
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
      for (const { landscape } of layers) {
        landscape.style.removeProperty("transform");
      }
    } else {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      schedule();
    }
  };

  reducedMotion.addEventListener("change", syncMotion);
  syncMotion();
}
