// Generuje SVG marki Odhacz (wordmark, sygnet, cztery pozy Hacza) z jednej geometrii.
// Użycie: node brand/assets/gen-svg.mjs  (nadpisuje SVG tutaj i w platform/public/assets/brand/)
import { writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.dirname(fileURLToPath(import.meta.url));            // brand/assets
const PUB = path.resolve(SRC, '../../platform/public/assets/brand'); // kopia dla aplikacji i landingu
const C = { ink: '#0B0F19', paper: '#FFFFFF', lime: '#C6F135', violet: '#6D28D9' };
const f = n => String(Math.round(n * 100) / 100);

// ---------------------------------------------------------------- O + check
// Base geometry (wordmark units): O centre-line radius 41.5, stroke 20, check stroke 15.
const O = { r: 41.5, w: 20, cw: 15, pts: [[-15, 1], [-4, 12], [16, -10]] };
function oMark(cx, cy, s, ring, check) {
  const p = O.pts.map(([x, y]) => `${f(cx + x * s)},${f(cy + y * s)}`);
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(O.r * s)}" fill="none" stroke="${ring}" stroke-width="${f(O.w * s)}"/>` +
    `<polyline points="${p.join(' ')}" fill="none" stroke="${check}" stroke-width="${f(O.cw * s)}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// ---------------------------------------------------------------- Wordmark
function wordmark(letter, check) {
  const W = 20, yAsc = 12, yX = 42, yB = 96, cyB = 69, rB = 28.5;
  const st = `fill="none" stroke="${letter}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"`;
  const parts = [];
  // O (cap) with check
  parts.push(oMark(53.5, 56, 1, letter, check));
  // d
  parts.push(`<circle cx="157" cy="${cyB}" r="${rB}" ${st}/><path d="M185.5 ${yAsc}V${yB}" ${st}/>`);
  // h
  parts.push(`<path d="M225 ${yAsc}V${yB}M225 ${cyB}A25.5 ${rB} 0 0 1 276 ${cyB}V${yB}" ${st}/>`);
  // a (single-storey, geometric)
  parts.push(`<circle cx="339.5" cy="${cyB}" r="${rB}" ${st}/><path d="M368 ${yX}V${yB}" ${st}/>`);
  // c
  const cc = 431.5, a = 50 * Math.PI / 180, tx = f(cc + rB * Math.cos(a)), ty1 = f(cyB - rB * Math.sin(a)), ty2 = f(cyB + rB * Math.sin(a));
  parts.push(`<path d="M${tx} ${ty1}A${rB} ${rB} 0 1 0 ${tx} ${ty2}" ${st}/>`);
  // z
  parts.push(`<path d="M482 ${yX}H528L482 ${yB}H528" ${st}/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 110" width="540" height="110" role="img" aria-label="Odhacz">\n` +
    `  <title>Odhacz</title>\n  <!-- Wordmark drawn as geometry (no font dependency). Letters: ${letter}, check: ${check}. -->\n` +
    parts.map(p => '  ' + p).join('\n') + '\n</svg>\n';
}

// ---------------------------------------------------------------- Sygnet
function sygnet(ring, check, bg) {
  const s = 25 / O.r; // ring centre-line radius 25 in a 64 box -> outer radius 31
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Odhacz">\n` +
    `  <title>Odhacz — sygnet</title>\n` + (bg ? `  <rect width="64" height="64" rx="14" fill="${bg}"/>\n` : '') +
    '  ' + oMark(32, 32, s, ring, check) + '\n</svg>\n';
}

// ---------------------------------------------------------------- Hacz (mascot)
// All poses share viewBox 0 0 256 256, the same body and the same face anchor.
const OUT = 7; // outline thickness
function limb(shapes) {
  // Outlined union: ink layer first, then lime layer on top.
  const ink = shapes.map(s => s.type === 'c'
    ? `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r + OUT}" fill="${C.ink}"/>`
    : `<path d="${s.d}" fill="none" stroke="${C.ink}" stroke-width="${s.w + 2 * OUT}" stroke-linecap="round" stroke-linejoin="round"/>`);
  const lime = shapes.map(s => s.type === 'c'
    ? `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${C.lime}"/>`
    : `<path d="${s.d}" fill="none" stroke="${C.lime}" stroke-width="${s.w}" stroke-linecap="round" stroke-linejoin="round"/>`);
  return [...ink, ...lime].join('\n    ');
}
const BODY = [{ type: 'p', d: 'M56 140L104 188L196 70', w: 60 }];
const HEAD = { x: 196, y: 70 };
function sparkle(cx, cy, R = 11, r = 3.6) {
  const pts = [];
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? r : R; pts.push(`${f(cx + rr * Math.cos(a))},${f(cy + rr * Math.sin(a))}`); }
  return `<polygon points="${pts.join(' ')}" fill="${C.violet}"/>`;
}
const eyes = () => `<circle cx="${HEAD.x - 13}" cy="${HEAD.y - 3}" r="9.5" fill="${C.ink}"/><circle cx="${HEAD.x + 13}" cy="${HEAD.y - 3}" r="9.5" fill="${C.ink}"/>`;
const inkStroke = (d, w = 6.5) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const FACES = {
  smile: eyes() + inkStroke(`M${HEAD.x - 11} ${HEAD.y + 14}Q${HEAD.x} ${HEAD.y + 25} ${HEAD.x + 11} ${HEAD.y + 14}`),
  grin: eyes() + `<path d="M${HEAD.x - 13} ${HEAD.y + 12}Q${HEAD.x} ${HEAD.y + 34} ${HEAD.x + 13} ${HEAD.y + 12}Z" fill="${C.ink}"/>`,
  hmm: eyes() + inkStroke(`M${HEAD.x - 9} ${HEAD.y + 16}H${HEAD.x + 9}`) +
    inkStroke(`M${HEAD.x - 23} ${HEAD.y - 19}Q${HEAD.x - 13} ${HEAD.y - 22} ${HEAD.x - 4} ${HEAD.y - 19}`) +   // left brow (flat)
    inkStroke(`M${HEAD.x + 4} ${HEAD.y - 22}Q${HEAD.x + 13} ${HEAD.y - 30} ${HEAD.x + 22} ${HEAD.y - 22}`),   // right brow (raised)
};
function hacz({ name, face, behind = '', front = '', spark = sparkle(236, 36) }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-label="Hacz — asystent AI marki Odhacz">\n` +
    `  <title>Hacz — asystent AI marki Odhacz</title>\n  <!-- ${name}. Kolory: lime ${C.lime}, ink ${C.ink}, violet ${C.violet}. Nie przebarwiać. -->\n` +
    (behind ? `  <g id="behind">\n    ${behind}\n  </g>\n` : '') +
    `  <g id="body">\n    ${limb(BODY)}\n  </g>\n` +
    `  <g id="face">\n    ${face}\n  </g>\n` +
    (front ? `  <g id="front">\n    ${front}\n  </g>\n` : '') +
    (spark ? `  ${spark}\n` : '') + `</svg>\n`;
}
// thumbs up: arm from behind the body, fist, thumb, two finger creases
const ARM_THUMB = limb([
  { type: 'p', d: 'M150 160L204 166', w: 22 },
  { type: 'c', cx: 226, cy: 168, r: 19 },
  { type: 'p', d: 'M219 154L224 121', w: 15 },
]) + '\n    ' + inkStroke('M228 163Q235 161 242 165', 5) + inkStroke('M229 174Q236 172 242 176', 5);
// pointing: arm, fist, index finger up-right
const ARM_POINT = limb([
  { type: 'p', d: 'M150 160L200 164', w: 22 },
  { type: 'c', cx: 222, cy: 166, r: 18 },
  { type: 'p', d: 'M228 156L240 128', w: 14 },
]) + '\n    ' + inkStroke('M214 176Q222 181 230 175', 5);
// head torch: translucent beam behind, strap + lamp in front
const TORCH = `<path d="M161 48L89 45.5A72 72 0 0 1 97.4 14.2Z" fill="${C.lime}" fill-opacity="0.35"/>`;
const TORCH_FRONT = [
  `<path d="M173 43Q196 56 217 43" fill="none" stroke="${C.ink}" stroke-width="14" stroke-linecap="round"/>`,
  `<path d="M173 43Q196 56 217 43" fill="none" stroke="${C.violet}" stroke-width="7" stroke-linecap="round"/>`,
  `<g transform="rotate(-15 175 44)"><rect x="160" y="33" width="30" height="22" rx="7" fill="${C.ink}"/><rect x="165" y="37" width="21" height="14" rx="4" fill="${C.violet}"/><circle cx="161" cy="44" r="8" fill="${C.ink}"/><circle cx="161" cy="44" r="5.5" fill="${C.lime}"/></g>`,
].join('\n    ');

const files = {
  'wordmark.svg': wordmark(C.ink, C.violet),
  'wordmark-light.svg': wordmark(C.paper, C.lime),
  'sygnet.svg': sygnet(C.ink, C.violet, null),
  'sygnet-light.svg': sygnet(C.paper, C.lime, null),
  'hacz.svg': hacz({ name: 'Hacz — poza podstawowa', face: FACES.smile }),
  'hacz-latarka.svg': hacz({ name: 'Hacz z czołówką (Odhacz Auto)', face: FACES.smile, behind: TORCH, front: TORCH_FRONT }),
  'hacz-kciuk.svg': hacz({ name: 'Hacz — kciuk w górę / OK', face: FACES.grin, behind: ARM_THUMB }),
  'hacz-uwaga.svg': hacz({ name: 'Hacz — uwaga (uniesiona brew, wskazuje)', face: FACES.hmm, behind: ARM_POINT }),
};
await mkdir(SRC, { recursive: true }); await mkdir(PUB, { recursive: true });
for (const [name, svg] of Object.entries(files)) {
  await writeFile(path.join(SRC, name), svg);
  await copyFile(path.join(SRC, name), path.join(PUB, name));
}
console.log('wrote', Object.keys(files).join(', '));
