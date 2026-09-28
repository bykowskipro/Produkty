# Kreacje — Odhacz Auto (Meta ads + seed posty)

Szablony HTML w `templates/` renderowane do PNG w `out/` (Playwright/Chromium). Każdy szablon jest samowystarczalny (CSS inline), deklaruje swoje rozmiary w `<meta name="sizes">` i adaptuje układ media query po wysokości viewportu (`min-height: 1300px` = 4:5, `1080x1920` = story). Copy zgodne z `ads/01-angles-i-copy.md` **v2** (po adwokacie diabła) i `social/seed-posty.md`.

W tym katalogu są też pliki innego agenta: `brand-templates/` + `brand-export.mjs` (avatar, ikony, OG, cover FB) — patrz `brand/assets/README.md`.

## Render

```bash
cd creatives
npm install            # raz (Playwright); Chromium bierze z /opt/pw-browsers lub CHROMIUM_PATH
node render.mjs templates out                 # wszystko (19 szablonów → 23 PNG)
node render.mjs templates out --only problem  # jeden szablon (substring nazwy)
node render.mjs templates out --scale 2       # 2× (2160 px) do retiny / druku
```

Wynik: `out/<szablon>.<szer>x<wys>.png`. Katalog `out/` jest w `.gitignore` — PNG generujemy, nie wersjonujemy.

## Czcionki i assety marki

- **Czcionki**: Space Grotesk (nagłówki) i Inter (tekst) są dołączone lokalnie w `fonts/` (woff2, subsety latin + latin-ext, licencja OFL) i ładowane przez `@font-face` w każdym szablonie — render nie potrzebuje sieci. Fallback systemowy: Liberation Sans / Arial. (Test: w sandboxie Google Fonts nie ładują się w Chromium — błąd certyfikatu proxy — stąd kopie lokalne.)
- **Wordmark i maskotka**: `../../platform/public/assets/brand/{wordmark-light.svg, hacz.svg, hacz-latarka.svg, hacz-kciuk.svg}` (ścieżki względne od `templates/`). Jeśli plik nie istnieje, `onerror` przełącza na fallback: tekstowy wordmark z sygnetem SVG / uproszczony Hacz narysowany inline. Sprawdzone: przy istniejących plikach ładują się oryginały.

## Lista kreacji → nazwy reklam (utm_content = ad.name z `ads/01-angles-i-copy.md`)

| Szablon | Ad name (utm_content) | Tura | Rozmiary | Co pokazuje |
|---|---|---|---|---|
| `problem-static.html` | `problem-static-v1` | 1 | 1080×1080, 1080×1350 | Angle A: „Jedziesz oglądać używane auto?”, sub „W notatkach masz 10 rzeczy. Przy aucie z listy zostają cztery.”, makieta telefonu (3 stany OK/Uwaga/Problem + pasek „Czerwone flagi: 3 · Dealbreaker: 0”), pill „Checklista na telefon · 39 zł” |
| `lista-static.html` | `lista-static-v1` | 1 | 1080×1080, 1080×1350 | Angle D: ekran „Lista uwag do negocjacji” (7 uwag, 2 poważne), chip „Negocjuj”, „Negocjuj listą, nie wrażeniem.” |
| `story-motion.html` | `story-motion-v1` | 1 | 1080×1920 | Angle F: klatka statyczna „Jutro oglądasz auto?” / „Weź to w telefonie.” / telefon / cechy / CTA; tekst w strefie 250–1670 px (animacja poza zakresem) |
| `bledy-carousel-01…08.html` | `bledy-carousel-v1` | 2 | 8 × 1080×1080 | Angle B: karta 1 hook „5 rzeczy, które ludzie pomijają…”, karty 2–8 = etapy 1–7 (tytuł, minuty, 3 punkty, pasek „Etap N/7”), karta 8 = etap 7 + CTA „39 zł · dostęp od razu” + Hacz |
| `prostota-static.html` | `prostota-static-v1` | 2 | 1080×1080, 1080×1350 | Angle C: „Ty tapiesz. Telefon liczy.”, 4 przyciski OK/Uwaga/Problem/Pomiń z palcem, licznik flag, „39 zł · bez instalacji · kilka aut naraz” |
| `65-static.html` | `65-static-v1` | 2 | 1080×1080, 1080×1350 | Angle E: wielkie „65%” + „aut trafiających do skupu AAA AUTO technicy odrzucają z powodu wad technicznych lub prawnych*” + przypis źródłowy (24–26 px) + „Odhacz Auto · 39 zł vs mechanik mobilny 449–749 zł” |
| `post-01-hacz.html` … `post-06-premiera.html` | posty organiczne (bez utm_content; link w bio z `utm_source=ig|fb&utm_medium=social`) | — | 6 × 1080×1350 | Seed posty 1–6 wg `social/seed-posty.md` (post 4: schemat auta z 12 polami pomiaru; post 5: 5 czerwonych dealbreakerów) |

Tura 1 (300 zł) = tylko A, D, F (wg `ads/01-angles-i-copy.md` v2); B, C, E czekają na turę 2. `story-video-v1` (rolka od właściciela) nie ma szablonu — to wideo.

## Zgodność (skrót z `legal/00-wymogi.md` §9)

- **65%** występuje tylko z gwiazdką i atrybucją na grafice: „*dane AAA AUTO 2025, auta zgłaszane do skupu sieci; źródło: rp.pl / Polskie Radio 24” (przypis ≥ 22 px; na 4:5 26 px). Sformułowanie = v2 („technicy odrzucają z powodu wad technicznych lub prawnych”), nie „nie nadaje się do zakupu”. W tekście reklamy zawsze „wg AAA AUTO”.
- **Brak cech odbiorcy**: nagłówki pytają o sytuację/czynność („Jedziesz oglądać…?”, „Jutro oglądasz auto?”, „Sprzedawca przyjechał ciepłym autem?”), nie o osobę; sub Angle A mówi o liście („z listy zostają cztery”), nie o pamięci odbiorcy. Brak „przed/po”, „sekretów”, gwarancji wyniku, nazw marek aut.
- **Hacz** = postać AI: na każdym poście z jego głosem stopka „Hacz — asystent AI marki Odhacz, nie mechanik.”; przy ilustracji dodatkowo „Ilustracja zaprojektowana cyfrowo.” Maskotka stylizowana, bez atrybutów zawodu regulowanego.
- **Tekst na grafice**: nagłówki ≥ 72 px, tekst ≥ 28 px (elementy UI w makiecie ≥ 22 px), marginesy ~6 %; wizual (telefon/karta/schemat) dominuje nad tekstem.

## Do sprawdzenia przez człowieka przed publikacją

- Post 4 (grubościomierz): wartości µm na schemacie są **przykładowe** — potwierdzić zakresy z `research/SOURCES-auto.md` (jak w notatce w `seed-posty.md`).
- Przykładowe dane w makietach (pomiary, uwagi na liście) są fikcyjne i ilustracyjne — nie sugerują konkretnego auta ani marki.
- Karuzela: podpisy kart (nagłówek „Etap N/7: …”) i link do LP ustawić w Ads Managerze per karta.
- Angle A tekst główny v2 kończy się „14 dni gwarancji zwrotu” — na grafice nie ma tej linii (świadomie: mniej tekstu); jeśli ma być, dopisać w `problem-static.html` pod pillem.
