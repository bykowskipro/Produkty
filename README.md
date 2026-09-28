# Produkty — system: POMYSŁ → RESEARCH → PRODUKT → SKLEP → ADS → DANE → DECYZJA

Eksperyment: prosty produkt cyfrowy (interaktywne narzędzie na telefon), szybka sprzedaż przez Meta Ads, pomiar, iteracja.
Infrastruktura jest wielokrotnego użytku: kolejny produkt = nowa treść w `product/` i `platform/public/app/`, reszta zostaje.

## Struktura
| Katalog | Co tu jest |
|---|---|
| `research/` | brief, rubryka oceny, raporty researchu (kierunki A–D, polityki/prawo/narzędzia), wybór produktu |
| `persona/` | persona problemowa, głos klienta, JTBD, transformacja |
| `product/` | specyfikacja produktu głównego i upsellu, treść źródłowa |
| `brand/` | nazwa, domeny, kolory, fonty, wordmark, awatar |
| `landing/` | copy deck i notatki UX (sam landing żyje w `platform/public/index.html`) |
| `platform/` | serwer sprzedażowy: Stripe Checkout, webhook, dostawa (linki dostępu), e-mail, Meta CAPI, eventy lejka, `/admin` |
| `analytics/` | plan pomiaru, definicje eventów, jak czytać dashboard |
| `legal/` | wymogi prawne, regulamin, polityka prywatności, zgody |
| `social/` | bio, avatar, seed content, instrukcja założenia kont |
| `creatives/` | szablony kreacji (HTML) + renderer do PNG |
| `ads/` | angle'e, copy reklam, struktura kampanii, stop conditions |
| `experiments/` | logi eksperymentów (szczegóły); skrót w `EXPERIMENTS.md` |
| `ops/` | wdrożenie na VPS (Docker + Caddy), checklisty startowe |

## Pliki decyzyjne
- `DECISIONS.md` — co wybraliśmy, dlaczego, co odrzuciliśmy.
- `EXPERIMENTS.md` — HIPOTEZA · ZMIANA · METRYKA · WYNIK · DECYZJA.

## Checkpointy właściciela
1. Ankieta startowa (zrobione, `research/00-brief.md`).
2. Wybór produktu A/B — tylko jeśli remis.
3. Rzeczy wymagające konta właściciela: domena/DNS, deploy na VPS, klucze Stripe + webhook, e-mail (Resend), Meta (Business Manager, Pixel, CAPI), konta FB/IG.
4. Zgoda na start kampanii + limit wydatków (300 PLN).
