// Mobile QA screenshots of any URL at the widths we care about.
// Usage: node shots.mjs <url> <outDir> [--widths 360,375,390,412,430] [--full]
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const [,, url, outDir = 'shots', ...rest] = process.argv;
if (!url) { console.error('Usage: node shots.mjs <url> <outDir> [--widths 360,375,390,412,430] [--full]'); process.exit(1); }
const widths = (rest.includes('--widths') ? rest[rest.indexOf('--widths') + 1] : '360,375,390,412,430').split(',').map(Number);
const full = rest.includes('--full');
await mkdir(outDir, { recursive: true });
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath });
try {
  for (const w of widths) {
    const h = w === 390 ? 844 : Math.round(w * 2.16);
    const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const out = path.join(outDir, `${w}x${h}${full ? '-full' : ''}.png`);
    await page.screenshot({ path: out, fullPage: full });
    console.log(`${out}  horizontal-overflow=${overflow}px${overflow > 0 ? '  <-- FIX' : ''}`);
    await context.close();
  }
} finally { await browser.close(); }
