import { readFile, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';

const html = await readFile('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one h1');
assert.ok(html.includes('lang="fr"'), 'French document language');
assert.ok(html.indexOf("localStorage.getItem('antony-theme')") < html.indexOf('rel="stylesheet"'), 'Theme must be resolved before CSS');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor: ${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)) await access(join('dist', match[1]));
for (const match of html.matchAll(/<img\b[^>]*>/g)) {
  assert.ok(/\balt="[^"]*"/.test(match[0]), 'Missing image alt');
  assert.ok(/\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]), 'Reserve image dimensions');
}
const person = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(person['@type'], 'Person');
assert.equal(person.name, 'Antony Ferrière');
for (const icon of JSON.parse(await readFile('dist/site.webmanifest', 'utf8')).icons) await access(join('dist', icon.src));
let jsBytes = 0;
let cssBytes = 0;
for (const name of await readdir('dist/assets')) {
  const bytes = await readFile(join('dist/assets', name));
  if (name.endsWith('.js')) jsBytes += gzipSync(bytes).length;
  if (name.endsWith('.css')) {
    cssBytes += gzipSync(bytes).length;
    for (const match of bytes.toString().matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)) await access(join('dist', match[1]));
  }
}
assert.ok(jsBytes < 10_000, `JavaScript gzip budget exceeded: ${jsBytes}`);
assert.ok(cssBytes < 15_000, `CSS gzip budget exceeded: ${cssBytes}`);
console.log(`Structure, anchors, assets, metadata: OK. Gzip: JS ${jsBytes} B · CSS ${cssBytes} B.`);
