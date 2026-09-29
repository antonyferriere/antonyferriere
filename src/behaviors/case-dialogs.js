export function initCaseDialogs() {
  const dialog = document.querySelector("#case-dialog");
  // Keep the native details available without JavaScript or dialog support.
  if (!dialog || typeof dialog.showModal !== "function") return;

  const root = document.documentElement;
  const title = dialog.querySelector("#case-dialog-title");
  const category = dialog.querySelector("[data-case-category]");
  const body = dialog.querySelector(".case-dialog-body");
  let opener;
  let startedOnBackdrop = false;

  document.querySelectorAll(".achievement-copy").forEach((card) => {
    const trigger = card.querySelector(".case-trigger");
    const details = card.querySelector(".case-details");
    if (!trigger || !details) return;

    trigger.addEventListener("click", () => {
      if (dialog.open) return;
      title.textContent = card.querySelector("h3").textContent;
      category.textContent = card.querySelector(".case-meta").textContent;
      body.replaceChildren(details.querySelector(".case-fields").cloneNode(true));
      opener = trigger;
      startedOnBackdrop = false;
      dialog.showModal();
      root.classList.add("case-dialog-open");
    });
    trigger.hidden = false;
    details.hidden = true;
  });

  dialog.querySelector(".case-dialog-close").addEventListener("click", () => {
    dialog.close();
  });

  function isBackdrop(event) {
    if (event.target !== dialog) return false;
    const { left, right, top, bottom } = dialog.getBoundingClientRect();
    return (
      event.clientX < left ||
      event.clientX > right ||
      event.clientY < top ||
      event.clientY > bottom
    );
  }

  // Both ends of the gesture must be outside, so selecting text never closes it.
  dialog.addEventListener("pointerdown", (event) => {
    startedOnBackdrop = event.button === 0 && isBackdrop(event);
  });
  dialog.addEventListener("pointercancel", () => {
    startedOnBackdrop = false;
  });
  dialog.addEventListener("click", (event) => {
    if (startedOnBackdrop && isBackdrop(event)) dialog.close();
    startedOnBackdrop = false;
  });

  // Escape, focus containment and the inert background are handled by <dialog>.
  dialog.addEventListener("close", () => {
    root.classList.remove("case-dialog-open");
    startedOnBackdrop = false;
    opener?.focus({ preventScroll: true });
  });
}
