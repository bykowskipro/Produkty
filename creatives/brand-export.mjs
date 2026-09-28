// Render the brand raster assets (brand-templates/) through render.mjs and copy them
// to platform/public/assets/brand/ under their final names.
// Usage: cd creatives && node brand-export.mjs
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, 'out', 'brand');
const dest = path.resolve(here, '..', 'platform', 'public', 'assets', 'brand');
const MAP = {
  'avatar.1024x1024.png': 'avatar-1024.png',
  'icon.192x192.png': 'icon-192.png',
  'icon.512x512.png': 'icon-512.png',
  'favicon.32x32.png': 'favicon-32.png',
  'og.1200x630.png': 'og-1200x630.png',
  'cover-fb.820x312.png': 'cover-fb-820x312.png',
  'cover-fb.1640x624.png': 'cover-fb-1640x624.png',
};
const r = spawnSync(process.execPath, ['render.mjs', 'brand-templates', outDir], { cwd: here, stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
await mkdir(dest, { recursive: true });
for (const [from, to] of Object.entries(MAP)) {
  await copyFile(path.join(outDir, from), path.join(dest, to));
  console.log('copied', path.join(dest, to));
}
