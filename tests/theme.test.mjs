import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const initSource = await readFile(
  new URL("../src/behaviors/theme-init.js", import.meta.url),
  "utf8",
);
const behaviorSource = await readFile(
  new URL("../src/behaviors/theme.js", import.meta.url),
  "utf8",
);

function environment({
  dark = false,
  saved = null,
  blocked = false,
  reduced = false,
  transitions = false,
} = {}) {
  const values = new Map(saved ? [["antony-theme", saved]] : []);
  const events = {};
  const root = {
    dataset: {},
    animate: () => ({ finished: Promise.resolve() }),
  };
  const button = {
    hidden: true,
    label: {},
    querySelector() {
      return this.label;
    },
    setAttribute(name, value) {
      this[name] = value;
    },
    addEventListener(name, fn) {
      events[name] = fn;
    },
    getBoundingClientRect() {
      return { x: 100, y: 20, width: 160, height: 48 };
    },
  };
  const system = {
    matches: dark,
    addEventListener(name, fn) {
      events.system = fn;
    },
  };
  let transitionCount = 0;
  const document = {
    documentElement: root,
    querySelector: (selector) =>
      selector === "#theme-switch" ? button : { content: "" },
    startViewTransition: transitions
      ? (fn) => {
          transitionCount++;
          fn();
          return { ready: Promise.resolve(), finished: Promise.resolve() };
        }
      : undefined,
  };
  const localStorage = {
    getItem(key) {
      if (blocked) throw new Error("Storage blocked");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (blocked) throw new Error("Storage blocked");
      values.set(key, value);
    },
  };
  const context = {
    document,
    localStorage,
    matchMedia: (query) =>
      query.includes("reduced") ? { matches: reduced } : system,
    window: {
      addEventListener(name, fn) {
        events[name] = fn;
      },
    },
    innerWidth: 1280,
    innerHeight: 800,
  };
  runInNewContext(initSource, context);
  const initialTheme = root.dataset.theme;
  runInNewContext(
    behaviorSource.replace("export function", "function") + "\ninitTheme();",
    context,
  );
  return {
    root,
    events,
    values,
    system,
    button,
    initialTheme,
    transitions: () => transitionCount,
  };
}

test("first visit follows the system without writing a preference", () => {
  for (const dark of [false, true]) {
    const app = environment({ dark });
    assert.equal(app.initialTheme, dark ? "lumen" : "garden");
    assert.equal(app.values.size, 0);
    app.system.matches = !dark;
    app.events.system();
    assert.equal(app.root.dataset.theme, dark ? "garden" : "lumen");
  }
});
test("saved manual choice wins before rendering and across new sessions", async () => {
  const app = environment({ saved: "lumen" });
  assert.equal(app.initialTheme, "lumen");
  await app.events.click();
  assert.equal(app.values.get("antony-theme"), "garden");
  app.system.matches = true;
  app.events.system();
  assert.equal(app.root.dataset.theme, "garden");
  assert.equal(
    environment({ dark: true, saved: app.values.get("antony-theme") })
      .initialTheme,
    "garden",
  );
});
test("invalid or inaccessible storage does not break theme controls", async () => {
  for (const options of [
    { saved: "unknown", dark: true },
    { blocked: true, dark: true },
  ]) {
    const app = environment(options);
    assert.equal(app.initialTheme, "lumen");
    await app.events.click();
    assert.equal(app.root.dataset.theme, "garden");
    assert.equal(app.button.hidden, false);
    assert.match(app.button["aria-label"], /Passer à Lumen vivant/);
  }
});
test("reduced motion skips View Transitions; unsupported browsers switch directly", async () => {
  for (const options of [
    { reduced: true, transitions: true },
    { transitions: false },
  ]) {
    const app = environment(options);
    await app.events.click();
    assert.equal(app.root.dataset.theme, "lumen");
    assert.equal(app.transitions(), 0);
  }
});
test("supported browsers use one View Transition and finish in the selected theme", async () => {
  const app = environment({ transitions: true });
  await app.events.click();
  assert.equal(app.transitions(), 1);
  assert.equal(app.root.dataset.theme, "lumen");
});
test("choice changes in another tab update the accessible control", () => {
  const app = environment();
  app.events.storage({ key: "antony-theme", newValue: "lumen" });
  assert.equal(app.root.dataset.theme, "lumen");
  assert.match(app.button["aria-label"], /Lumen vivant actif/);
  app.events.storage({ key: "antony-theme", newValue: null });
  assert.equal(app.root.dataset.theme, "garden");
});
