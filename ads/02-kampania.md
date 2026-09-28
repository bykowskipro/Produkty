# Kampania Meta — plan testu (300 PLN)

## Cel testu
Czy ktoś kupi Odhacz Auto z zimnego ruchu. Nie: perfekcyjny ROAS.

## Struktura
- **Kampania:** `P1-odhacz-auto-sales-v1` · cel Sprzedaż · optymalizacja Purchase (Pixel + CAPI) · budżet kampanii (Advantage+) **45 zł/dzień** · limit wydatków kampanii **300 zł** · dodatkowo limit wydatków konta 300 zł (bezpiecznik).
- **Zestaw reklam:** `PL-broad-22-50` · Polska · 22–50 lat · wszystkie płcie · umiejscowienia Advantage+ · targetowanie szerokie (Advantage+ audience) z sugestią zainteresowań: samochody używane, Otomoto, OLX, motoryzacja. Jeden zestaw. Bez lookalike (nie ma danych).
- **Reklamy (6–7):** wg `01-angles-i-copy.md`: A problem-static, B bledy-carousel, C prostota-static, D lista-static, E 65-static, F story-motion (+ story-video, jeśli właściciel dostarczy rolkę).
- Format statyków: 1:1 + 4:5 (Meta dobierze), story 9:16.

## Dlaczego tak
- Jeden zestaw + wiele kreacji = algorytm sam wybiera zwycięzcę; przy 300 zł nie ma budżetu na 3 zestawy.
- Purchase od pierwszego dnia: to jedyne zdarzenie, które odpowiada na pytanie testu. Akceptujemy status „ograniczona nauka”.
- Awaryjnie (dzień 3, jeśli 0 zakupów i < 5 checkout_start): zmiana optymalizacji na InitiateCheckout w NOWEJ kampanii (nie edycja — reset nauki i czysty pomiar).

## Harmonogram
- D-3…D-1: strona live, test zakupowy, Pixel/CAPI zweryfikowane (Test Events), 5 seed postów, weryfikacja domeny.
- D0: start kampanii rano (7:00–9:00), wszystkie reklamy jednocześnie.
- D1–D6: codziennie o stałej porze: odczyt Ads Managera + `/admin`, wpis spendu do `/admin`, decyzje wg warunków niżej.
- D6/D7: koniec budżetu → raport w `EXPERIMENTS.md`.

## Warunki decyzyjne (nie mechaniczne — diagnoza etapu)
| Sygnał | Próg | Działanie |
|---|---|---|
| Kreacja słaba | ≥ 1500 wyświetleń i CTR (link) < 0,7% | wyłącz kreację (zostaw ≥ 3) |
| Landing nie konwertuje | ≥ 100 wejść i `checkout_start/page_view` < 2% | zmień hero/ofertę (jedna zmiana), nie reklamy |
| Checkout gubi | ≥ 10 `checkout_start` i 0 zakupów | sprawdź płatności (BLIK/P24), tekst zgody, cenę; test zakupu na żywo |
| Twardy stop | 300 zł wydane **lub** 200 zł bez zakupu przy ≥ 150 kliknięciach | stop, raport, decyzja o iteracji |
| Sygnał „warto” | ≥ 3 zakupy z 300 zł (CPA ≤ 100 zł) lub CR landing ≥ 2% | druga tura budżetu na zwycięskie kreacje |
| Silny sygnał | ≥ 6 zakupów (CPA ≤ 50 zł) | skalowanie +20%/dzień, nowe kreacje wokół zwycięskiego angle |

## Pomiar (źródła prawdy)
1. `/admin`: unikalni odwiedzający, cta_click, checkout_start, purchase, upsell_purchase, przychód, wg `utm_content`.
2. Ads Manager: wydatki, wyświetlenia, CTR, CPC, LPV. Wpisujemy dzienny spend do `/admin` → CPA/ROAS.
3. Rozbieżność Purchase (Meta vs my) jest oczekiwana (zgody na cookies); decyzje na podstawie `/admin`.

## Przed startem (final QA)
URL z UTM działa · checkout testowy (karta 4242, BLIK test) · Purchase w Test Events (Pixel + CAPI, 1 zdarzenie po deduplikacji) · e-mail dostępowy dochodzi (SPF/DKIM) · kreacje bez błędów językowych · landing mobile 390×844 · beneficjent/płatnik (DSA) uzupełnione · limit wydatków konta ustawiony · strona FB kompletna (avatar, okładka, 5 postów).

## Checkpoint 4 (do zatwierdzenia przez właściciela przed wydaniem 1 zł)
PRODUCT: Odhacz Auto (39 zł) + upsell Po zakupie (19 zł)
PRICE: 39 / 19 zł
TARGET: PL, 22–50, broad + motoryzacja
CAMPAIGN: 1 kampania Sprzedaż, 1 zestaw, 6–7 reklam
TEST BUDGET: 45 zł/dzień
MAXIMUM SPEND: 300 zł (limit kampanii + limit konta)
→ oczekiwana odpowiedź: START albo STOP/ZMIEŃ.
