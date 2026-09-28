# Źródła i status weryfikacji — „Kupione — i co dalej” (po-zakupie.json v1.0)

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

## Pełna lista URL (claim → url) znajduje się w `po-zakupie.json` → `sources` (39 pozycji) i w `po-zakupie.md`.

## Czego NIE weryfikowano w tej sesji (wiedza ogólna, oznaczone w facts_to_verify)
- opłata skarbowa 17 zł za pełnomocnictwo i zwolnienie dla rodziny; ważność pozwolenia czasowego 30 dni;
- numery artykułów KK 306a / 286 oraz KC 823 (skutek potwierdzony prasowo, numer z wiedzy ogólnej);
- dostępność pełnej rejestracji w mObywatel (gov.pl mówi o projekcie z 1.07.2025; jedno słabe źródło twierdzi, że działa od IX 2025).

## Zasady użycia w copy/reklamie
- Kwoty kar (UFG, rejestracja) można cytować z podaniem roku 2026 i źródła; nie obiecywać skuteczności roszczeń.
- Wszędzie „informacja, nie porada” — disclaimer jest w `meta.disclaimer`, nie powtarzać go w każdym punkcie.
