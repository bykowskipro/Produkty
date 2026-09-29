#!/usr/bin/env python3
"""Regenerate product/content/auto.md as a readable mirror of auto.json.
Usage: python3 ops/gen-content-md.py product/content/auto.json product/content/auto.md
Reproduces the legacy layout exactly; additionally renders new fields
(quick, panel, extended seller_call_script) when present."""
import json, sys

SEV = {'yellow': 'ŻÓŁTA', 'red': 'CZERWONA', 'info': 'INFO'}


def gen(d):
    L = []
    m = d['meta']
    L.append(f"# {m['title']} — pełna treść produktu (mirror auto.json v{m['version']})")
    L.append("")
    L.append(f"> {m['disclaimer']}")
    L.append("")
    L.append(f"Szacowany czas łącznie: {m['est_minutes_total']} min. Stany odpowiedzi: {', '.join(d['answer_states'])}.")
    L.append("")
    qs = d['quick_start']
    L.append(f"## {qs['title']}")
    L.append("")
    for i, s in enumerate(qs['steps'], 1):
        L.append(f"{i}. {s}")
    L.append("")

    ik = d.get('intake')
    if ik:
        L.append(f"## {ik['title']} (krok 1 kreatora)")
        L.append("")
        L.append(ik['intro'])
        L.append("")
        for f in ik['fields']:
            extra = f" [{f['unit']}]" if f.get('unit') else ''
            L.append(f"- **{f['label']}**{extra} — typ: {f['type']}" + (" · można zaznaczyć odmowę" if f.get('refusable') else ''))
            L.append(f"  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „{f['ask']}”")
        L.append("")
        L.append("Z danych wyliczane automatycznie: kilometry na rok (przebieg ÷ wiek), pierwsza rejestracja vs rok produkcji, cena vs podobne ogłoszenia (po wpisaniu ceny rynkowej), a jutro: licznik vs ogłoszenie vs Historia pojazdu.")
        L.append("")

    # --- index of quick-filter items (only when the field exists)
    quick = [(p, it) for p in d['phases'] for s in p['sections'] for it in s['items'] if it.get('quick')]
    if quick:
        n_db = sum(1 for _, it in quick if it['dealbreaker'])
        L.append("## Szybki filtr (10 minut)")
        L.append("")
        L.append(f"Najpierw odsiej, potem sprawdzaj. {len(quick)} punktów z polem `quick: true`: "
                 f"{n_db} dealbreakerów i {len(quick) - n_db} szybkie testy bez narzędzi (każdy do ok. minuty). "
                 "Kolejność jak w etapach; punkty z etapu 1 robisz przed wyjazdem, resztę w pierwszych 10 minutach przy aucie. "
                 "W treści punktów oznaczone inline jako `[szybki filtr]`.")
        L.append("")
        for i, (p, it) in enumerate(quick, 1):
            where = " — przed wyjazdem" if p['id'] == 'p1' else ""
            db = " _[ODPUŚĆ]_" if it['dealbreaker'] else ""
            L.append(f"{i}. `{it['id']}` {it['text']}{db}{where}")
        L.append("")

    for p in d['phases']:
        L.append(f"## {p['order']}. {p['title']} ({p['est_minutes']} min)")
        L.append("")
        L.append(f"*{p['subtitle']}*  ")
        L.append(f"**Kiedy:** {p['when']}")
        L.append("")
        L.append(p['intro'])
        L.append("")
        for s in p['sections']:
            L.append(f"### {s['title']}")
            L.append("")
            for it in s['items']:
                L.append(f"#### `{it['id']}` {it['text']}  ")
                lab = SEV[it['severity']]
                if it['dealbreaker']:
                    lab += " · ODPUŚĆ"
                if it['photo']:
                    lab += " · zdjęcie"
                line = f"_[{lab}]_"
                if it.get('quick'):
                    line += " [szybki filtr]"
                if it.get('panel'):
                    line += f" [panel: {it['panel']}]"
                L.append(line)
                L.append("")
                L.append(f"- **Jak:** {it['how']}")
                L.append(f"- **Dlaczego:** {it['why']}")
                if it.get('input'):
                    inp = it['input']
                    unit = f" [{inp['unit']}]" if inp.get('unit') else ''
                    L.append(f"- **Pole ({inp['type']}):** {inp['label']}{unit} — {inp.get('hint', '')}")
                c = it.get('ctrl')
                if c:
                    if c['type'] == 'auto':
                        L.append(f"- **Odpowiedź:** ocenia system (reguła `{c['auto']}`)" + (f"; przycisk pominięcia: „{c['skip']}”" if c.get('skip') else ''))
                    else:
                        opts = ' / '.join(f"„{o['label']}” → {o['state']}" for o in c['options'])
                        tail = ''
                        if c.get('auto'):
                            tail += f"; dodatkowo reguła `{c['auto']}`"
                        if c.get('skip') is False:
                            tail += '; bez „Pomiń”'
                        elif c.get('skip'):
                            tail += f"; pominięcie: „{c['skip']}”"
                        L.append(f"- **Odpowiedzi:** {opts}{tail}")
                L.append(f"- **Na listę uwag:** „{it['flag_label']}”")
                L.append(f"- Tagi: {', '.join(it['tags'])}")
                L.append("")

    s = d['seller_call_script']
    extended = 'message_templates' in s
    if not extended:
        L.append("## Skrypt rozmowy telefonicznej ze sprzedawcą")
        L.append("")
        L.append(s['intro'])
        L.append("")
        for i, q in enumerate(s['questions'], 1):
            L.append(f"{i}. **{q['q']}**  ")
            L.append(f"   Na co uważać: {q['watch_for']}")
        L.append("")
    else:
        L.append("## Scenariusz rozmowy ze sprzedawcą (pełny)")
        L.append("")
        L.append(s['intro'])
        L.append("")
        L.append("### Zanim zadzwonisz")
        L.append("")
        for b in s['before']:
            L.append(f"- {b}")
        L.append("")
        if s.get('opening'):
            L.append("### Otwarcie — zdania do wyboru")
            L.append("")
            for o in s['opening']:
                L.append(f"- {o}")
            L.append("")
        for t in s.get('seller_types', []):
            L.append(f"### {s.get('seller_type_prompt', 'Do kogo dzwonisz?')} → {t['label']}")
            L.append("")
            if t.get('hint'):
                L.append(t['hint'])
                L.append("")
            for o in t.get('opening', []):
                L.append(f"- Otwarcie: „{o}”")
            ch = t.get('check')
            if ch:
                L.append(f"- **{ch['title']}** — {ch.get('intro', '')}")
                for q in ch['questions']:
                    L.append(f"  - {q['q']} — {q['watch_for']}" + (f" (odpowiedzi: „{q['a_private']}” / „{q['a_dealer']}”)" if q.get('a_private') else ''))
                L.append(f"  - Werdykt: {ch.get('verdict', '')}")
            for q in t.get('extra_questions', []):
                L.append(f"- Pytanie do firmy: {q['q']} — {q['watch_for']}")
            L.append("")
        if s.get('unknown_type_note'):
            L.append(s['unknown_type_note'])
            L.append("")
        L.append(f"### {len(s['questions'])} pytań")
        L.append("")
        for i, q in enumerate(s['questions'], 1):
            L.append(f"{i}. **{q['q']}**  ")
            L.append(f"   Na co uważać: {q['watch_for']}  ")
            L.append(f"   Gdy kręci: {q['if_dodges']}  ")
            if q.get('ctrl'):
                L.append("   Odpowiedzi: " + ' / '.join(f"„{o['label']}” → {o['state']}" for o in q['ctrl']['options']))
        L.append("")
        if s.get('agreements'):
            L.append("### Ustalenia przed rozłączeniem")
            L.append("")
            L.append(s.get('agreements_intro', ''))
            L.append("")
            for aid in s['agreements']:
                it = next((x for p in d['phases'] for sec in p['sections'] for x in sec['items'] if x['id'] == aid), None)
                if it:
                    L.append(f"- `{aid}` {it['text']}" + (f" — powiedz: „{it['say']}”" if it.get('say') else ''))
            L.append("")
        L.append("### Zamknięcie rozmowy")
        L.append("")
        for c in s['closing']:
            L.append(f"- {c}")
        L.append("")
        L.append("### Szablony wiadomości (do skopiowania)")
        L.append("")
        for t in s['message_templates']:
            L.append(f"#### {t['title']}")
            L.append("")
            for ln in t['text'].split("\n"):
                L.append(f"> {ln}" if ln else ">")
            L.append("")
        L.append("### Gdy nie chcesz dzwonić")
        L.append("")
        L.append(s['no_call_note'])
        L.append("")

    r = d['summary_rules']
    L.append("## Reguły podsumowania")
    L.append("")
    for title, key in [("Odpuść bez dyskusji, gdy", "walk_away_if"), ("Jedź do mechanika/SKP, gdy", "get_mechanic_if"),
                       ("Negocjuj, gdy", "negotiate_if"), ("Gotowe zdania (bez kwot)", "negotiation_phrases"),
                       ("Zasady bezpiecznej transakcji", "safe_deal_rules")]:
        L.append(f"### {title}")
        L.append("")
        for x in r[key]:
            L.append(f"- {x}")
        L.append("")
    L.append("## Słowniczek")
    L.append("")
    for g in d['glossary']:
        L.append(f"- **{g['term']}** — {g['def']}")
    L.append("")
    L.append("## Źródła")
    L.append("")
    for x in d['sources']:
        L.append(f"- {x['claim']} — {x['url']}")
    L.append("")
    L.append("## Do weryfikacji przed publikacją")
    L.append("")
    for f in d['facts_to_verify']:
        L.append(f"- {f}")
    return "\n".join(L) + "\n"


if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    d = json.load(open(src, encoding='utf-8'))
    open(dst, 'w', encoding='utf-8').write(gen(d))
