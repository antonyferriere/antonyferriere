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

  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = [...document.querySelectorAll("main > section[id]")];
  let currentSectionId = null;
  let framePending = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("is-scrolled", scrollY > 32);
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;

    // Use the anchor landing line, not the order of intersection events:
    // two adjacent sections can be visible while scrolling in either direction.
    const activationLine = Math.max(
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0,
      header.getBoundingClientRect().bottom,
    ) + 1; // Allow for fractional pixels when the browser positions an anchor.
    let sectionId = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top > activationLine) break;
      sectionId = section.id;
    }
    // The last section may be too short to reach the landing line.
    if (max > 0 && scrollY >= max - 1) sectionId = sections.at(-1)?.id ?? null;
    if (sectionId !== currentSectionId) {
      for (const link of links) {
        if (link.hash === `#${sectionId}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
      currentSectionId = sectionId;
    }
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
}
