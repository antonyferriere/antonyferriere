export function initNavigation() {
  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".main-navigation");
  const toggle = document.querySelector(".menu-toggle");
  const progress = document.querySelector(".reading-progress");
  const desktop = matchMedia("(min-width: 1001px)");
  document.documentElement.classList.add("js-navigation");
  toggle.hidden = false;

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu",
    );
  }
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    setMenu(false);
    if (!desktop.matches && link.hash) {
      const target = document.querySelector(link.hash);
      target?.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  desktop.addEventListener("change", () => setMenu(false));

  let framePending = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("is-scrolled", scrollY > 32);
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    framePending = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!framePending) {
        requestAnimationFrame(updateScroll);
        framePending = true;
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  if (!("IntersectionObserver" in window)) return;
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-10% 0px -65% 0px" },
  );
  document
    .querySelectorAll("main > section[id]")
    .forEach((section) => observer.observe(section));
}
