import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const source = await readFile(
  new URL("../src/behaviors/case-dialogs.js", import.meta.url),
  "utf8",
);

// Exercise the controller lifecycle; native dialog focus trapping is browser-owned.
function environment({ supported = true } = {}) {
  function element(children = {}) {
    const listeners = {};
    return {
      hidden: false,
      querySelector: (selector) => children[selector],
      addEventListener: (name, fn) => { listeners[name] = fn; },
      emit(name, event = {}) { listeners[name]?.({ target: this, button: 0, ...event }); },
      focus() { this.focused = true; },
    };
  }
  const title = {}, category = {}, body = {
    replaceChildren(content) { this.content = content; },
  };
  const closeButton = element();
  const dialog = Object.assign(element({
    "#case-dialog-title": title,
    "[data-case-category]": category,
    ".case-dialog-body": body,
    ".case-dialog-close": closeButton,
  }), {
    open: false,
    showModal: supported ? function () { this.open = true; } : undefined,
    close() { this.open = false; this.emit("close"); },
    getBoundingClientRect: () => ({ left: 100, right: 500, top: 100, bottom: 500 }),
  });
  const cases = ["Métier", "IA"].map((name) => {
    const trigger = Object.assign(element(), { hidden: true });
    const fields = { cloneNode: () => ({ text: `Détail ${name}` }) };
    const details = element({ ".case-fields": fields });
    const card = element({
      ".case-trigger": trigger, ".case-details": details,
      h3: { textContent: name }, ".case-meta": { textContent: `Catégorie ${name}` },
    });
    return { card, trigger, details, fields };
  });
  const classes = new Set();
  const document = {
    documentElement: { classList: { add: (c) => classes.add(c), remove: (c) => classes.delete(c) } },
    querySelector: (selector) => selector === "#case-dialog" ? dialog : null,
    querySelectorAll: (selector) => selector === ".achievement-copy" ? cases.map((c) => c.card) : [],
  };
  runInNewContext(source.replace("export function", "function") + "\ninitCaseDialogs();", { document });
  return { cases, dialog, closeButton, title, category, body, classes };
}

test("unsupported dialogs keep the inline details available", () => {
  const app = environment({ supported: false });
  for (const item of app.cases) {
    assert.equal(item.trigger.hidden, true);
    assert.equal(item.details.hidden, false);
  }
});

test("each trigger opens its own case and replaces the previous content", () => {
  const app = environment();
  for (const [index, name] of ["Métier", "IA"].entries()) {
    const item = app.cases[index];
    assert.equal(item.trigger.hidden, false);
    assert.equal(item.details.hidden, true);
    item.trigger.emit("click");
    assert.equal(app.dialog.open, true);
    assert.equal(app.title.textContent, name);
    assert.equal(app.category.textContent, `Catégorie ${name}`);
    assert.equal(app.body.content.text, `Détail ${name}`);
    assert.notEqual(app.body.content, item.fields);
    assert.equal(app.classes.has("case-dialog-open"), true);
    app.closeButton.emit("click");
    assert.equal(app.dialog.open, false);
    assert.equal(app.classes.size, 0);
    assert.equal(item.trigger.focused, true);
  }
});

test("a native close event restores scrolling and the correct opener", () => {
  const app = environment();
  app.cases[1].trigger.emit("click");
  app.dialog.close();
  assert.equal(app.classes.size, 0);
  assert.equal(app.cases[1].trigger.focused, true);
  assert.notEqual(app.cases[0].trigger.focused, true);
});

test("only a complete click on the backdrop dismisses the dialog", () => {
  const app = environment();
  const inside = { clientX: 200, clientY: 200 };
  const outside = { clientX: 50, clientY: 50 };
  app.cases[0].trigger.emit("click");
  for (const [start, end] of [
    [inside, inside], // Padding inside the dialog.
    [inside, outside], // Selection dragged out of the dialog.
    [outside, inside],
    [{ ...inside, target: app.body }, { ...inside, target: app.body }],
  ]) {
    app.dialog.emit("pointerdown", start);
    app.dialog.emit("click", end);
    assert.equal(app.dialog.open, true);
  }
  app.dialog.emit("pointerdown", outside);
  app.dialog.emit("click", outside);
  assert.equal(app.dialog.open, false);
});

test("a cancelled gesture cannot dismiss the dialog", () => {
  const app = environment();
  const outside = { clientX: 50, clientY: 50 };
  app.cases[0].trigger.emit("click");
  app.dialog.emit("pointerdown", outside);
  app.dialog.emit("pointercancel");
  app.dialog.emit("click", outside);
  assert.equal(app.dialog.open, true);
});
