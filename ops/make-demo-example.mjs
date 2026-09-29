#!/usr/bin/env node
/**
 * Builds the „przykładowe auto” seed for the preview bundle: a fully answered Skoda Octavia 2016 whose report shows
 * „Negocjuj” (2 problemy, 7 uwag, 0 dealbreakerów) – the same story as the landing's „Tak wygląda raport”.
 * Usage: node ops/make-demo-example.mjs product/content/auto.json <out.js>
 * The output script runs before engine.js in the demo and, when the page is opened with ?example=1, adds the car
 * `example` to localStorage (existing cars are kept) and opens its report. Rule-driven items are re-evaluated by the
 * engine on load, so only their inputs matter here.
 */
import fs from 'node:fs';

const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('usage: make-demo-example.mjs <auto.json> <out.js>'); process.exit(1); }
const d = JSON.parse(fs.readFileSync(src, 'utf8'));
const items = []; d.phases.forEach((p) => p.sections.forEach((s) => s.items.forEach((it) => items.push(it))));
const VIN = 'TMBJG7NE5G0123456';
const now = new Date().toISOString();

// Overrides: id → { v (option id) | state, input, note }. Everything else gets its first „ok” option (or a skip where the story needs one).
const O = {
  p1s1i1: { v: 'good' }, p1s1i2: { v: 'have' }, p1s1i3: { v: 'good', note: 'W opisie: rozrząd 2023, opony 2024, „garażowany”.' }, p1s1i4: { v: 'good', input: 34500 },
  p1s1i5: { v: 'good' }, p1s1i7: { v: 'good' },
  p1s2i1: { v: 'have' }, p1s2i2: { v: 'up', input: 176800, note: 'Badania: 2022 – 141 210, 2023 – 158 900, 2024 – 167 400, 2026-04 – 176 800.' }, p1s2i3: { v: 'good' }, p1s2i4: { v: 'pl' }, p1s2i5: { state: 'pomin' }, p1s2i6: { v: 'good' },
  p1s3i1: { v: 'done' }, p1s3i2: { v: 'good' }, p1s3i3: { v: 'good', note: '„Tylny zderzak po parkingowym w 2022, lakierowany u znajomego”.' },
  p1s4i1: { v: 'good' }, p1s4i2: { v: 'good' }, p1s4i3: { v: 'good' }, p1s4i4: { v: 'good' }, p1s4i5: { v: 'good' },
  p1s5i1: { v: 'have' }, p1s5i2: { v: 'have' }, p1s5i3: { v: 'have' }, p1s5i4: { v: 'have' }, p1s5i5: { v: 'good' },
  p1s6i1: { v: 'good' }, p1s6i2: { v: 'good' },
  p2s1i1: { v: 'good' }, p2s1i2: { input: VIN }, p2s1i3: { v: 'good' }, p2s1i4: { v: 'good' }, p2s1i5: { input: '2027-03-15' }, p2s1i6: { input: 2016 },
  p2s2i1: { v: 'good' }, p2s2i2: { v: 'good' }, p2s2i3: { v: 'good' }, p2s2i4: { v: 'good' },
  p2s3i1: { v: 'good' }, p2s3i2: { v: 'owner' }, p2s3i3: { v: 'none' }, p2s3i4: { v: 'good' }, p2s3i5: { state: 'pomin' },
  p2s4i1: { v: 'good' }, p2s4i2: { v: 'mid', note: 'Ostatni wpis 2022. Sprzedawca: „potem robił kolega”.' }, p2s4i3: { v: 'good', note: 'Rozrząd 2023 – faktura na 1 850 zł.' }, p2s4i4: { input: '2026-12-31' }, p2s4i5: { state: 'pomin' },
  p2s4i6: { input: 1, auto: true, note: 'Drugi „został u poprzedniego właściciela”.' }, p2s4i7: { v: 'none' },
  p3s1i1: { v: 'good' }, p3s1i2: { v: 'good' }, p3s1i3: { v: 'good' }, p3s1i4: { v: 'good' },
  p3s2i1: { input: 110 }, p3s2i2: { input: 118 }, p3s2i3: { input: 112 }, p3s2i4: { input: 120 }, p3s2i5: { input: 380, note: 'Prawy dolny róg drzwi, pod listwą – 380 µm; reszta drzwi 130–150.' }, p3s2i6: { input: 116 },
  p3s2i7: { input: 210 }, p3s2i8: { input: 125 }, p3s2i9: { input: 122 }, p3s2i10: { input: 118 }, p3s2i11: { input: 115 }, p3s2i12: { input: 130 }, p3s2i13: { v: 'good' },
  p3s3i1: { v: 'good' }, p3s3i2: { v: 'good' }, p3s3i3: { v: 'good' }, p3s3i4: { v: 'good' },
  p3s4i1: { v: 'good' }, p3s4i2: { v: 'good' }, p3s4i3: { v: 'good' }, p3s4i4: { v: 'good' },
  p3s5i1: { v: 'good' }, p3s5i2: { v: 'good' }, p3s5i3: { v: 'good' }, p3s5i4: { v: 'good' },
  p3s6i1: { input: 2022 }, p3s6i2: { input: 2.5, note: 'Przód 2,5 mm, tył 5 mm.' }, p3s6i3: { v: 'good' }, p3s6i4: { v: 'mid', note: 'Przód: Continental + Nexen.' }, p3s6i5: { v: 'good' },
  p3s7i1: { v: 'good' }, p3s7i2: { v: 'good' }, p3s7i3: { v: 'good' }, p3s7i4: { v: 'good' },
  p4s1i1: { input: 180450 }, p4s1i2: { v: 'good' }, p4s1i3: { v: 'good' }, p4s1i4: { v: 'good' }, p4s1i5: { v: 'good' },
  p4s2i1: { v: 'good' }, p4s2i2: { v: 'good' }, p4s2i3: { v: 'mid', note: 'Mokro przy kole zapasowym, uszczelka klapy do sprawdzenia.' }, p4s2i4: { v: 'good' },
  p4s3i1: { v: 'ok' }, p4s3i2: { v: 'ok' }, p4s3i3: { v: 'good' },
  p4s4i1: { v: 'good' }, p4s4i2: { v: 'bad', note: 'Sprężarka się załącza, nawiew letni po 5 minutach.' }, p4s4i3: { v: 'good' }, p4s4i4: { v: 'good' }, p4s4i5: { v: 'good' }, p4s4i6: { v: 'good' },
  p4s5i1: { v: 'good' }, p4s5i2: { v: 'ok' }, p4s5i3: { v: 'good' },
  p4s6i1: { v: 'good' }, p4s6i2: { v: 'good' },
  p5s1i1: { v: 'good' }, p5s1i2: { v: 'good' }, p5s1i3: { v: 'good' }, p5s1i4: { v: 'good' }, p5s1i5: { v: 'good' }, p5s1i6: { v: 'good' }, p5s1i7: { v: 'good' }, p5s1i8: { v: 'good' }, p5s1i9: { v: 'good' }, p5s1i10: { v: 'good' },
  p5s2i1: { v: 'good' }, p5s2i2: { v: 'good' }, p5s2i3: { v: 'good' }, p5s2i4: { v: 'good' }, p5s2i5: { v: 'good' }, p5s2i6: { v: 'good' }, p5s2i7: { v: 'good' },
  p6s1i1: { v: 'good' }, p6s1i2: { v: 'good' },
  p6s2i1: { v: 'good' }, p6s2i2: { v: 'good' }, p6s2i3: { v: 'good' },
  p6s3i1: { state: 'pomin' }, p6s3i2: { state: 'pomin' }, p6s3i3: { state: 'pomin' },
  p6s4i1: { v: 'good' }, p6s4i2: { v: 'good' }, p6s5i1: { v: 'good' }, p6s5i2: { v: 'good' }, p6s5i3: { v: 'good' },
  p6s6i1: { v: 'good' }, p6s6i2: { v: 'good' }, p6s6i3: { v: 'good' }, p6s6i4: { v: 'good' }, p6s7i1: { v: 'good' }, p6s7i2: { v: 'good' }, p6s8i1: { v: 'good' }, p6s8i2: { v: 'good' },
  p7s1i1: { v: 'done' }, p7s1i2: { v: 'good' }, p7s1i3: { v: 'na' }, p7s2i1: { v: 'done' }, p7s2i2: { v: 'done' }, p7s2i3: { v: 'done' },
  p7s3i1: { v: 'none' }, p7s3i2: { v: 'good' }, p7s3i3: { v: 'good' }, p7s3i4: { v: 'good' }, p7s4i1: { v: 'done' },
};

const a = {};
const missing = [];
items.forEach((it) => {
  const o = O[it.id]; const ctrl = it.ctrl || {}; const opts = ctrl.options || [];
  let tup;
  if (o && o.state === 'pomin') tup = ['pomin'];
  else if (ctrl.type === 'auto' || (o && o.auto)) tup = [null, o && o.input != null ? o.input : null, o && o.note ? o.note : null, 'a']; // the rule answers on load
  else {
    let opt = null;
    if (o && o.v) opt = opts.find((x) => x.v === o.v);
    if (!opt) { opt = opts.find((x) => x.state === 'ok') || opts[0]; if (o && o.v) missing.push(it.id + ':' + o.v); }
    tup = [opt.state, it.input ? (o && o.input != null ? o.input : null) : opt.v, o && o.note ? o.note : null]; // a tapped option: no 'a' marker, the rule only escalates
  }
  while (tup.length && (tup[tup.length - 1] == null || tup[tup.length - 1] === '')) tup.pop();
  a[it.id] = tup;
});
// call script: all fine except Q7 (serwis bez faktur)
(d.seller_call_script.questions || []).forEach((q, i) => {
  const id = 'call:q' + (i + 1); const opts = (q.ctrl && q.ctrl.options) || [];
  let opt = opts.find((x) => x.state === 'ok'); let note = null;
  if (i === 3) note = '„Tylko tylny zderzak, parkingowe w 2022”.';
  if (i === 6) { opt = opts.find((x) => x.v === 'nodocs') || opts[1]; note = '„Olej co roku u kolegi, faktura tylko za rozrząd”.'; }
  if (i === 1) note = 'Od 2023 r., kupione od pierwszego właściciela (jest umowa).';
  a[id] = note ? [opt.state, opt.v, note] : [opt.state, opt.v];
});
if (missing.length) { console.error('unknown option ids:', missing.join(', ')); process.exit(1); }

const car = {
  name: 'Przykład: Octavia 2016',
  created: now, u: now,
  vin: VIN, st: 'private', cd: 1, qf: 1,
  q: { c0: 'p', c1: 'p', c2: 'p' },
  d: { price: 32900, year: 2016, odo_ad: 180000, reg: 'XX 00000', first_reg: '2016-05-12', odo_photo: 'yes', miss: {}, got: {}, ref: {} },
  a: a,
};
const js = `/* Demo only: „Przykładowe auto” – a fully answered Octavia 2016. Opened with app.html?example=1 it adds the car to this device's data (your own cars stay) and shows its report. Generated by ops/make-demo-example.mjs. */
(function () {
  if (!/[?&]example=1/.test(location.search)) return;
  var KEY = 'odhacz:auto:v1';
  var car = ${JSON.stringify(car)};
  var st = null;
  try { st = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { st = null; }
  if (!st || st.v !== 1 || typeof st.cars !== 'object') st = { v: 1, t: null, active: null, cars: {}, ui: {} };
  st.ui = st.ui || {}; st.ui.onb = 1; st.ui.a2hs = 1;
  st.cars.example = car; st.active = 'example'; st.t = new Date().toISOString();
  try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* private mode */ }
  if (!location.hash || location.hash === '#/' || location.hash === '#/start') location.hash = '#/raport/example';
})();
`;
fs.writeFileSync(out, js);
const n = Object.keys(a).length;
console.log('example car written:', out, '· answers:', n, '· bytes:', js.length);
