// Render every HTML template in <templatesDir> to PNG at the sizes declared in
// <meta name="sizes" content="1080x1080,1080x1350,1080x1920"> (default 1080x1080).
// Usage: node render.mjs templates out [--only name] [--scale 1]
import { chromium } from 'playwright';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const [,, templatesDir = 'templates', outDir = 'out', ...rest] = process.argv;
const only = rest.includes('--only') ? rest[rest.indexOf('--only') + 1] : null;
const scale = rest.includes('--scale') ? Number(rest[rest.indexOf('--scale') + 1]) : 1;

const files = (await readdir(templatesDir)).filter(f => f.endsWith('.html') && (!only || f.includes(only)));
if (!files.length) { console.error('No templates found in', templatesDir); process.exit(1); }
await mkdir(outDir, { recursive: true });

// Prefer a preinstalled Chromium when the npm package's pinned build is absent.
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath });
try {
  for (const file of files) {
    const html = await readFile(path.join(templatesDir, file), 'utf8');
    const m = html.match(/<meta\s+name="sizes"\s+content="([^"]+)"/i);
    const sizes = (m ? m[1] : '1080x1080').split(',').map(s => s.trim()).filter(Boolean);
    const base = file.replace(/\.html$/, '');
    for (const size of sizes) {
      const [w, h] = size.split('x').map(Number);
      const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
      const page = await context.newPage();
      await page.goto('file://' + path.resolve(templatesDir, file) + `?w=${w}&h=${h}`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts ? document.fonts.ready : null);
      await page.waitForTimeout(150);
      const out = path.join(outDir, `${base}.${w}x${h}.png`);
      await page.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
      console.log('rendered', out);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
