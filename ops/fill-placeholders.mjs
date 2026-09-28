// Replace [[PLACEHOLDER]] tokens in public-facing files with the owner's data.
// Usage: node ops/fill-placeholders.mjs ops/sprzedawca.json   (copy ops/sprzedawca.example.json first)
// Safe to re-run: only tokens are replaced; an empty value removes the token AND the line label if the whole line is just the token.
import { readFile, writeFile } from 'node:fs/promises';
import { globSync } from 'node:fs';

const [,, jsonPath] = process.argv;
if (!jsonPath) { console.error('Usage: node ops/fill-placeholders.mjs ops/sprzedawca.json'); process.exit(1); }
const data = JSON.parse(await readFile(jsonPath, 'utf8'));
const files = [
  ...globSync('platform/public/legal/*.html'),
  ...globSync('platform/emails/*'),
  'platform/public/index.html',
  'platform/public/sukces.html',
];
let total = 0;
for (const f of files) {
  let s;
  try { s = await readFile(f, 'utf8'); } catch { continue; }
  let n = 0;
  const out = s.replace(/\[\[([A-Z_]+)\]\]/g, (m, key) => {
    if (!(key in data)) return m;              // unknown token: leave for a later pass
    n++; return String(data[key]);
  });
  if (n) { await writeFile(f, out); total += n; console.log(`${f}: ${n} replaced`); }
}
const left = [];
for (const f of files) {
  try { const s = await readFile(f, 'utf8'); const m = s.match(/\[\[[A-Z_]+\]\]/g); if (m) left.push(`${f}: ${[...new Set(m)].join(' ')}`); } catch {}
}
console.log(`\nReplaced ${total} tokens.`);
console.log(left.length ? `Still missing:\n${left.join('\n')}` : 'No placeholders left.');
