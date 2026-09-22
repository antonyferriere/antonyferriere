// Runs in <head>, before any stylesheet. Only explicit choices are persisted.
(() => {
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("antony-theme");
  } catch {
    /* Storage may be blocked. */
  }
  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "lumen"
    : "garden";
  document.documentElement.dataset.theme = ["garden", "lumen"].includes(
    savedTheme,
  )
    ? savedTheme
    : systemTheme;
})();
