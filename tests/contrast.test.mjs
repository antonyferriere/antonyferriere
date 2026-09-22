import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const css = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
function luminance(hex) {
  const rgb = hex.match(/[\da-f]{2}/gi).slice(0, 3).map((x) => parseInt(x, 16) / 255).map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((a, b) => b - a); return (values[0] + .05) / (values[1] + .05); }
for (const theme of ['garden', 'lumen']) {
  const block = css.split(`[data-theme='${theme}'] {`)[1].split('}')[0];
  const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]+);/gi)].map((m) => [m[1], m[2]]));
  test(`${theme}: semantic text tokens meet AA contrast on their surfaces`, () => {
    for (const surface of ['color-background', 'color-background-alt', 'color-surface']) {
      for (const text of ['color-text', 'color-text-muted', 'color-primary', 'color-link']) {
        const ratio = contrast(tokens[text], tokens[surface]);
        assert.ok(ratio >= 4.5, `${text} / ${surface}: ${ratio.toFixed(2)}:1`);
      }
    }
    assert.ok(contrast(tokens['color-on-primary'], tokens['color-primary']) >= 4.5);
    for (const text of ['color-contact-text', 'color-contact-muted']) assert.ok(contrast(tokens[text], tokens['color-contact']) >= 4.5);
  });
}
