import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const source = (await readFile(new URL('../src/behaviors/section-parallax.js', import.meta.url), 'utf8')).replace('export ', '');

function setup(reduced = false) {
  const listeners = new Map();
  const frames = new Map();
  let nextFrame = 0;
  let onMotion;
  const motion = { matches: reduced, addEventListener(_, fn) { onMotion = fn; } };
  const sections = [0, 1000].map(top => {
    const style = { removeProperty(key) { delete this[key]; } };
    return { top, style, querySelector: () => ({ style }), getBoundingClientRect() { return { top: this.top, height: 1000 }; } };
  });
  runInNewContext(source + '\ninitSectionParallax();', {
    document: { querySelectorAll: () => sections },
    matchMedia: () => motion,
    window: {
      addEventListener: (event, callback) => listeners.set(event, callback),
      removeEventListener: event => listeners.delete(event),
    },
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  return { sections, listeners, frames,
    flush() { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); },
    setReduced(value) { motion.matches = value; onMotion(); },
  };
}

test('each landscape uses its own section position, with bounded drift and one shared frame', () => {
  const env = setup();
  env.flush();
  env.sections[0].top = -1500;
  env.sections[1].top = -200;
  env.listeners.get('scroll')();
  env.listeners.get('scroll')();
  assert.equal(env.frames.size, 1);
  env.flush();
  assert.equal(env.sections[0].style.transform, 'translate3d(0, 96px, 0)');
  assert.equal(env.sections[1].style.transform, 'translate3d(0, 24px, 0)');
  env.sections[1].top = 100;
  env.listeners.get('resize')();
  env.flush();
  assert.equal(env.sections[1].style.transform, 'translate3d(0, 0px, 0)');
});

test('reduced motion cancels pending movement for every section and can resume', () => {
  const env = setup();
  env.sections.forEach(section => { section.top = -400; });
  env.flush();
  env.listeners.get('scroll')();
  env.setReduced(true);
  assert.equal(env.frames.size, 0);
  assert.equal(env.listeners.size, 0);
  env.sections.forEach(section => assert.equal(section.style.transform, undefined));
  env.setReduced(false);
  env.flush();
  env.sections.forEach(section => assert.equal(section.style.transform, 'translate3d(0, 48px, 0)'));
  const initiallyReduced = setup(true);
  assert.equal(initiallyReduced.frames.size, 0);
  assert.equal(initiallyReduced.listeners.size, 0);
});
