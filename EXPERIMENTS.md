# EXPERIMENTS.md

Każdy eksperyment: HIPOTEZA · ZMIANA · METRYKA · WYNIK · DECYZJA. Szczegóły i surowe dane w `experiments/`.

## EXP-001 · Odhacz Auto — pierwszy test popytu (Meta, 300 PLN)
- **HIPOTEZA:** Osoby kupujące używane auto z ogłoszenia zapłacą 39 zł za interaktywną checklistę oględzin na telefon, jeśli reklama trafi w moment „jadę oglądać auto”, a landing pokaże narzędzie (demo), a nie „kolejny PDF”.
- **ZMIANA:** nowy produkt (Odhacz Auto) + upsell (Po zakupie, 19 zł) + landing + 1 kampania Sprzedaż (1 zestaw, 6–7 kreacji, 45 zł/dzień, limit 300 zł).
- **METRYKA (drabinka, bo 300 zł nie rozstrzyga o zakupach):** CTR (link) per kreacja → `cta_click/page_view` → `demo_start/page_view`, `demo_done/demo_start` → `checkout_start/page_view` → zakupy (bonus), udział upsellu, przychód.
- **PROGI:** kontynuuj, gdy CTR ≥ 1%, cta_click ≥ 10%, demo_start ≥ 30% (done ≥ 40%), checkout_start ≥ 4% przy ≥ 120 wejściach; zakupy 0–2 = brak informacji, ≥ 3 = bonus; twardy stop 300 zł; wcześniejszy stop: 150 zł i CTR < 0,6% na wszystkich kreacjach.
- **PRE-TEST (0 zł):** 10 beta-użytkowników z prawdziwym autem; < 3 z 10 dochodzi do „Jazdy próbnej” = poprawiamy produkt zamiast palić budżet.
- **WYNIK:** (po zakończeniu)
- **DECYZJA:** (po zakończeniu)
- Status: przygotowanie (produkt, landing, kreacje w produkcji; czeka na Checkpoint 3 i 4).

## Kolejka eksperymentów (jeśli EXP-001 nie da sygnału albo da mocny sygnał)
- EXP-002 (iteracja): zmiana JEDNEJ zmiennej wg diagnozy lejka (kreacja / hero / cena 29 zł / optymalizacja InitiateCheckout).
- EXP-003 (produkt 2 na tej samej platformie): „Odhacz Mieszkanie” — odbiór mieszkania od dewelopera (sezon X–XII; ryzyko klasyfikatora housing; 50/70 w rubryce).
- EXP-004 (produkt 3): „Lokalny biznes z AI” (58/70, wymaga dopomiaru popytu).
- EXP-005 (kandydat, sugestia właściciela 2026-09-28): **edukacja B2C „z datą”** (egzamin praktyczny na prawo jazdy, matura/E8, uprawnienia zawodowe, rozmowa kwalifikacyjna) w modelu **treść AI + weryfikacja przez podpisanego specjalistę na udział w przychodzie**. Model naprawia zaufanie (nie polityki Meta). Do zbadania tą samą rubryką co D1; liczby popytu jeszcze niesprawdzone.
- EXP-006 (kandydat, pomysł właściciela 2026-09-29): **zestaw fizyczny do oględzin** (rękawiczki, ręcznik papierowy/biała chusteczka, magnes, czytnik OBD2 Bluetooth, tani grubościomierz Fe) wysyłkowo przez Allegro, z Odhacz Auto „gratis” w pudełku. Za: produkt fizyczny buduje zaufanie do nieznanej marki lepiej niż landing, podnosi wartość koszyka (orientacyjnie 150–250 zł zamiast 39 zł), Allegro daje ruch bez Meta. Przeciw (do sprawdzenia liczbami, zanim kupimy choć jedną sztukę): marża po prowizji Allegro, wysyłce i zwrotach na tanich miernikach i czytnikach z importu może być bliska zeru; magazyn i wysyłka to praca właściciela (sprzeczne z założeniem „minimalny udział”) — realne tylko z fulfillmentem/dropshippingiem; „aplikacja gratis” obniża kotwicę 39 zł dla wersji cyfrowej; rękojmia za sprzęt fizyczny (2 lata) to nowy koszt. Test za 0 zł przed jakimkolwiek zakupem towaru: link „Chcę zestaw z miernikiem” na stronie sukcesu i w mailu po zakupie + pytanie w ankiecie beta; próg zainteresowania ≥ 15% kupujących → dopiero wtedy wycena 3 dostawców i test 20 sztuk.
