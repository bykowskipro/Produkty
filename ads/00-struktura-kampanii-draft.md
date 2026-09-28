# Szkic struktury pierwszej kampanii (do dopracowania po wyborze produktu i benchmarkach)

Cel testu: **czy ktoś chce to kupić**, nie perfekcyjny ROAS.
Budżet: 300 PLN łącznie, twardy limit (ustawiony jako limit wydatków konta + limit kampanii).

## Struktura (maksymalnie prosta)
- 1 kampania · cel **Sprzedaż** (konwersja Purchase, Pixel + CAPI) · budżet na poziomie kampanii (Advantage+ campaign budget)
- 1 zestaw reklam · Polska · 25–55 (do korekty pod personę) · targetowanie szerokie lub 1 blok zainteresowań · umiejscowienia automatyczne (Advantage+)
- 4–6 reklam = różne **ANGLE**, nie różne obrazki tego samego nagłówka
- Format: 2× static 1:1/4:5, 1× carousel, 1× story/reels 9:16 (motion jeśli tanio)
- Dzienny budżet: 40–50 zł → 6–7 dni testu (uczenie algorytmu wymaga czasu; 300 zł nie wystarczy na wyjście z fazy uczenia, akceptujemy to).

Dlaczego nie "ruch" ani "aktywność": tańsze kliki, ale gorsza jakość; przy 49 zł liczy się sygnał zakupowy, nie kliknięcia.
Alternatywa awaryjna, jeśli Pixel nie zbierze zakupów po 3 dniach: przełączyć optymalizację na InitiateCheckout (zbiera się szybciej), nie na kliknięcia.

## Warunki stopu (draft — do uszczegółowienia)
- Kreacja: po ≥ 1500 wyświetleń CTR (link) < 0,7% → wyłącz, zostaw najlepsze 2–3.
- Landing: po ≥ 100 wejściach `checkout_start/page_view` < 2% → zmień hero/ofertę, nie reklamy.
- Checkout: po ≥ 10 `checkout_start` zero zakupów → sprawdź checkout/zaufanie/cenę.
- Twardy stop: 300 PLN wydane **lub** 200 PLN bez żadnego zakupu przy ≥ 150 kliknięciach = hipoteza odrzucona w tej formie.
- Sukces minimalny: ≥ 3 zakupy z 300 PLN (CPA ≤ 100 PLN) = sygnał do iteracji i drugiej tury budżetu.

## Konwencje nazw
- Kampania: `P1-<produkt>-sales-v1`
- Ad set: `PL-broad-25-55` / `PL-int-<zainteresowanie>`
- Reklama: `<angle>-<format>-v1` np. `problem-static-v1`, `speed-carousel-v1`
