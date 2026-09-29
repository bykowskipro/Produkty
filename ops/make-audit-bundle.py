#!/usr/bin/env python3
"""Builds experiments/audyt/odhacz-auto-tresc-do-audytu.md — the single attachment for audit prompt B.
Five parts: (0) RULES-auto.md, (1) auto.md, (2) SOURCES-auto.md, (3) po-zakupie.md, (4) SOURCES-po-zakupie.md.
Regenerate the .md mirrors first: python3 ops/gen-content-md.py product/content/auto.json product/content/auto.md (and po-zakupie).
Usage: python3 ops/make-audit-bundle.py [out.md]"""
import datetime, json, subprocess, sys

ROOT = __file__.rsplit('/ops/', 1)[0]
out = sys.argv[1] if len(sys.argv) > 1 else ROOT + '/experiments/audyt/odhacz-auto-tresc-do-audytu.md'
auto = json.load(open(ROOT + '/product/content/auto.json', encoding='utf-8'))
pz = json.load(open(ROOT + '/product/content/po-zakupie.json', encoding='utf-8'))
items = [it for p in auto['phases'] for s in p['sections'] for it in s['items']]
pz_items = [it for p in pz['phases'] for s in p['sections'] for it in s['items']]
n_db = sum(1 for it in items if it.get('dealbreaker'))
n_quick = sum(1 for it in items if it.get('quick'))
n_rules = len({it['ctrl']['auto'] for it in items if it.get('ctrl') and it['ctrl'].get('auto')})
n_paint = sum(1 for it in items if it.get('ctrl') and it['ctrl'].get('auto') == 'paint_panel')
n_fields = len(auto['intake']['fields'])
n_q = len(auto['seller_call_script']['questions'])
try:
    branch = subprocess.check_output(['git', '-C', ROOT, 'rev-parse', '--abbrev-ref', 'HEAD'], text=True).strip()
except Exception:
    branch = '?'
today = datetime.date.today().isoformat()
head = f"""# Odhacz Auto + „Po zakupie” — treść do audytu merytorycznego (załącznik do promptu B)

Wygenerowano {today} z gałęzi {branch} (`ops/make-audit-bundle.py`). Treść główna w wersji {auto['meta']['version']}, dodatek w wersji {pz['meta']['version']}. Pięć części w jednym pliku: (0) reguły automatycznej oceny z progami ({n_rules - 1 + n_paint} reguł: {n_rules - 1} różnych + {n_paint} punktów lakieru na jednej regule), (1) treść główna — {len(auto['phases'])} etapów, {len(items)} punktów ({n_db} dealbreakerów, {n_quick} w szybkim filtrze), karta „Dane z ogłoszenia” ({n_fields} pól), scenariusz rozmowy ({n_q} pytań), reguły podsumowania, (2) źródła i fakty do weryfikacji produktu głównego, (3) dodatek „Po zakupie” — {len(pz['phases'])} etapy, {len(pz_items)} punktów, wzór umowy, terminy, (4) źródła dodatku.

Jak czytać punkt: `id` (np. p3s2i4), tekst, poziom (ŻÓŁTA / CZERWONA / INFO, ODPUŚĆ = dealbreaker), „Jak” (instrukcja dla laika), „Dlaczego”, opcjonalne pole do wpisania wartości, **„Odpowiedzi:”** — przyciski, które widzi użytkownik, ze stanem, na jaki mapują (ok / uwaga / problem / pomin), albo „ocenia system (reguła …)” — wtedy progi są w części 0. Punkty z `na_if` (paliwo, skrzynia) system pomija sam, gdy nie dotyczą auta. „Na listę uwag” to etykieta, która trafia do raportu i listy do negocjacji.

Stan: treść po audycie B z {today} (dwa niezależne modele) i po poprawkach opisanych w `experiments/audyt/wynik-B-2026-09-29.md`. Ten załącznik służy do audytu kontrolnego i do podpisu człowieka z uprawnieniami (diagnosta — części 0–2, prawnik — części 3–4).

---

"""
parts = [
    ('CZĘŚĆ 0 — REGUŁY AUTOMATYCZNEJ OCENY (RULES-auto.md)', 'product/content/RULES-auto.md'),
    ('CZĘŚĆ 1 — TREŚĆ GŁÓWNA: Oględziny używanego auta (auto.md)', 'product/content/auto.md'),
    ('CZĘŚĆ 2 — ŹRÓDŁA I FAKTY DO WERYFIKACJI (SOURCES-auto.md)', 'product/content/SOURCES-auto.md'),
    ('CZĘŚĆ 3 — DODATEK „Po zakupie” (po-zakupie.md)', 'product/content/po-zakupie.md'),
    ('CZĘŚĆ 4 — ŹRÓDŁA DODATKU (SOURCES-po-zakupie.md)', 'product/content/SOURCES-po-zakupie.md'),
]
body = [head]
for title, path in parts:
    body.append(f"\n# {title}\n\n")
    body.append(open(ROOT + '/' + path, encoding='utf-8').read().rstrip() + "\n\n---\n")
open(out, 'w', encoding='utf-8').write(''.join(body))
print('bundle written:', out, '·', sum(len(b) for b in body), 'chars ·', f'{len(items)} items, {n_db} dealbreakers, {n_fields} intake fields')
