# Źródła i status weryfikacji — „Kupione — i co dalej” (po-zakupie.json v1.0; uzupełnienie dla 1.1 na końcu)

Data weryfikacji: 2026-09-28. Metoda: wyłącznie snippety wyszukiwarki (bezpośrednie pobieranie stron zablokowane przez proxy). Priorytet: gov.pl / podatki.gov.pl / ufg.pl / uokik.gov.pl / Dziennik Ustaw; źródła branżowe (rankomat, mubi, prawo.pl, otomoto) jako potwierdzenie drugie. Wszystko, czego nie dało się potwierdzić w źródle pierwotnym, jest w treści oznaczone literalnie `[do weryfikacji]`.

## Tabela terminów — pewność

| Termin | Wartość | Kto | Podstawa | Źródło pierwotne | Pewność |
|---|---|---|---|---|---|
| PCC-3 (deklaracja + zapłata 2%) | 14 dni od umowy | kupujący | ustawa o PCC art. 10 ust. 1 | gov.pl „Zapłać podatek od czynności cywilnoprawnych” | wysoka |
| Zwolnienie PCC | wartość rynkowa ≤ 1 000 zł | — | ustawa o PCC art. 9 pkt 6 | money.pl / rankomat (2026) — brak snippetu z podatki.gov.pl | wysoka (przepis stabilny) |
| Brak PCC przy fakturze VAT / VAT-marża | — | — | ustawa o PCC art. 2 pkt 4 | prawo.pl | wysoka |
| Rejestracja pojazdu | 30 dni od nabycia | kupujący | Prawo o ruchu drogowym art. 73aa | gov.pl „Zarejestruj pojazd” | wysoka |
| Kara za brak rejestracji | 500 zł; 1 000 zł po 180 dniach | kupujący | PoRD art. 140mb | samorzad.gov.pl (powiat bielski) | wysoka |
| Zawiadomienie o zbyciu | 30 dni | sprzedający | PoRD art. 78 ust. 2 pkt 1; kara 250 zł | samorzad.gov.pl (powiat gorlicki), gov.pl | wysoka |
| Zgłoszenie sprzedaży do ubezpieczyciela | 14 dni | sprzedający | ustawa o ubezp. obowiązkowych art. 32 ust. 1 | rankomat (cytuje art.) — brak snippetu z isap | wysoka |
| Koniec przejętego OC | data z polisy; brak automatycznego wznowienia | kupujący | art. 31 ust. 1 (art. 28 nie stosuje się) | rankomat, LINK4, ctu.pl | wysoka |
| Kary UFG 2026 (osobowe) | 1 920 / 4 810 / 9 610 zł | kupujący | 20/50/100% z 2× min. wynagrodzenia (4 806 zł) | ufg.pl Page259 | wysoka (do 31.12.2026) |
| Badanie techniczne — opłata | 149 zł (osobowy) od 19.09.2025 | kupujący | rozporządzenie, Dz.U. 2025 poz. 1223 | gov.pl/infrastruktura + Dz.U. | wysoka |
| Badanie po terminie — podwójna opłata | NIE obowiązuje (projekt) | — | — | otomoto news, gazetaprawna | średnia → `[do weryfikacji]` |
| Odpowiedź na reklamację (konsument) | 14 dni; milczenie = uznanie | przedsiębiorca | ustawa o prawach konsumenta art. 7a | uokik.gov.pl (stanowisko), lex | wysoka |
| Odpowiedzialność przedsiębiorcy | 2 lata + domniemanie 2 lata | — | u.p.k. art. 43c | prawakonsumenta.uokik.gov.pl, lexlege | wysoka |
| Rękojmia (osoba prywatna) | 2 lata od wydania; roszczenia 1 rok od stwierdzenia | — | KC art. 568 § 1–3 | lexlege (tekst aktualny) | wysoka |
| Wyłączenie rękojmi | dopuszczalne; bezskuteczne przy podstępie | — | KC art. 558 § 1–2 | infor.pl, otomoto | wysoka |

## Opłaty rejestracyjne — rozbieżności między źródłami
- 160 zł z nowymi tablicami = 54 (dowód rej.) + 80 (tablice) + 13,50 (pozwolenie czasowe) + 12,50 (znaki legalizacyjne) — spójne w rankomat, mubi, cuk, tuz.
- Zachowanie tablic: 66,50 zł (bez pozwolenia czasowego) lub 80 zł (z nim) — rankomat/compensa; snippet gov.pl „Zarejestruj pojazd” podał „85 zł + 13,50 zł” (prawdopodobnie nieaktualny fragment sprzed 4.09.2022). W treści: zakres + `[do weryfikacji]`.
- Od 10.06.2026: oświadczenie o stanie tablic zamiast ich przynoszenia; bez ponownej legalizacji (forsal, bezprawnik, auto-swiat, lowiczanin) — brak snippetu z gov.pl, ale 5 zgodnych źródeł prasowych z datą.

## Pełna lista URL (claim → url) znajduje się w `po-zakupie.json` → `sources` (43 pozycji po audycie B) i w `po-zakupie.md`.

## Czego NIE weryfikowano w tej sesji (wiedza ogólna, oznaczone w facts_to_verify)
- opłata skarbowa 17 zł za pełnomocnictwo i zwolnienie dla rodziny; ważność pozwolenia czasowego 30 dni;
- numery artykułów KK 306a / 286 oraz KC 823 (skutek potwierdzony prasowo, numer z wiedzy ogólnej);
- dostępność pełnej rejestracji w mObywatel (gov.pl mówi o projekcie z 1.07.2025; jedno słabe źródło twierdzi, że działa od IX 2025).

## Zasady użycia w copy/reklamie
- Kwoty kar (UFG, rejestracja) można cytować z podaniem roku 2026 i źródła; nie obiecywać skuteczności roszczeń.
- Wszędzie „informacja, nie porada” — disclaimer jest w `meta.disclaimer`, nie powtarzać go w każdym punkcie.

## Po audycie B (dodatek 1.1, 2026-09-29)

Fakty potwierdzone i otwarte: tabela w `experiments/audyt/wynik-B-2026-09-29.md` (sekcja 7). Aktualna lista „do weryfikacji” z `po-zakupie.json` → `facts_to_verify`:
- Opłata za rejestrację przy zachowaniu tablic po 10.06.2026: źródła podają 66,50 zł lub 80 zł (zależnie od pozwolenia czasowego i znaków legalizacyjnych) — potwierdzić w konkretnym urzędzie; tablice indywidualne 1 000 zł.
- Dostępność pełnej rejestracji pojazdu online w aplikacji mObywatel (bez wizyty) — projekt przyjęty przez rząd 1.07.2025; sprawdzić, czy i w których urzędach usługa działa we wrześniu 2026.
- Podwójna opłata za badanie techniczne po terminie (>30 dni) — według źródeł z 2025/2026 jeszcze nie obowiązuje; potwierdzić status ustawy przed publikacją.
- Dolna granica grzywny karno-skarbowej za brak PCC-3 (ok. 480 zł = 1/10 minimalnego wynagrodzenia 4 806 zł w 2026) — wyliczenie prasowe; zasada z KKS.
- Kary UFG 2026 (1 920 / 4 810 / 9 610 zł) — z ufg.pl na wrzesień 2026; zmienią się 1.01.2027 wraz z minimalnym wynagrodzeniem.
- Opłata skarbowa za pełnomocnictwo 17 zł i zwolnienie dla najbliższej rodziny — wiedza ogólna, nie weryfikowana w tej sesji.
- Ważność pozwolenia czasowego (30 dni) — wiedza ogólna, nie weryfikowana w tej sesji.
- Kodeks karny art. 306a (licznik) i art. 286 (oszustwo) — numery artykułów z wiedzy ogólnej, nie weryfikowane w tej sesji.
- Kodeks cywilny art. 823 (wygaśnięcie AC przy zbyciu) — z wiedzy ogólnej; źródło prasowe potwierdza skutek, nie numer artykułu.
- [potwierdzone w audycie B 29.09.2026] 149 zł badanie osobówki i 245 zł z LPG (149 + 96); kary 500 / 1 000 / 250 zł; UFG 2026: 1 920 / 4 810 / 9 610 zł; podwójna opłata za badanie po terminie — nadal projekt. [poprawione] podstawa PCC = wartość rynkowa (nie cena z umowy); adres nie jest w dowodzie osobistym; Rzecznik Finansowy nie jest instytucją od wad auta; infolinia konsumencka 801 440 220 / 222 66 76 76; pełna rejestracja online dopiero od 2027 r. (18.01.2027 — do potwierdzenia); AC może przejść na nabywcę za zgodą ubezpieczyciela (KC art. 823) — nie pisać „nigdy”. [nowe] UFG 2027: płaca minimalna 4 950 zł → orientacyjnie 1 980 / 4 950 / 9 900 zł (do potwierdzenia na ufg.pl w styczniu 2027).

Zmiany treści 1.1: adres sprzedającego z oświadczenia (u1s1i1), PCC od wartości rynkowej (u1s3i1, klauzula I), e-rejestracja jako „sprawdź w swoim urzędzie” (u1s5i5, u2s2i5), AC „zwykle nie przechodzi” (u2s3i5), klauzule umowy A/B/C/D, terminy z dniem startu i regułą dni kalendarzowych (`deadlines_note`).
