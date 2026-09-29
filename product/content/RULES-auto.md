# Odhacz Auto — reguły automatycznej oceny (treść 1.3, silnik 1.3.0)

Źródło prawdy: `platform/public/assets/checklist/engine.js`, obiekt `AUTO_RULES`. Ten plik jest opisem dla audytu i dla redakcji treści — progi są **widełkami orientacyjnymi**, nie normami; każdą ocenę użytkownik widzi razem z liczbami, z których wynika, i może ją zmienić u źródła (poprawiając wpisaną wartość).

Jak to działa: punkt „czysto automatyczny” nie ma przycisków OK/Uwaga/Problem — użytkownik wpisuje wartość, system ustawia stan (ok / uwaga / problem) i pokazuje zdanie „Ocena: …”. Zostaje tylko przycisk pominięcia z opisem powodu („Nie mam miernika”, „Nie odczytam”). Punkt „mieszany” ma przyciski z odpowiedziami i regułę: reguła podpowiada (albo wymusza „problem”, gdy dane się kłócą), tap użytkownika nadpisuje; odpowiedź systemu znika, gdy znika jej podstawa (np. skasowano wpisaną liczbę).

| # | Reguła (`id`) | Punkt | Co wpisuje użytkownik | Z czym porównuje | Progi i stan |
|---|---|---|---|---|---|
| 1 | `vin_present` (mieszany) | p1s1i2 VIN od sprzedawcy | — (VIN z karty „Dane z ogłoszenia” lub z rozmowy) | 17 znaków w danych auta | jest 17 znaków → **ok**; brak → bez stanu, podpowiedź, skąd go wziąć; „Odmówił podania” to ręczny **problem** (dealbreaker) |
| 2 | `km_per_year` (auto) | p1s1i6 Przebieg kontra wiek | — (przebieg i rocznik z danych z ogłoszenia) | wiek = bieżący rok (z miesiącem) − rocznik − 0,5, min. 0,5 roku | < 7 000 km/rok → **uwaga** („bardzo mało, sprawdź zużycie i odczyty”); > 25 000 → **uwaga** („dużo: flota, taxi, przedstawiciel”); inaczej **ok**; rocznik < 1950 lub > rok bieżący + 1 → bez stanu („sprawdź rocznik”) |
| 3 | `price_vs_market` (mieszany) | p1s1i4 Cena kontra podobne | typowa cena podobnych ogłoszeń [zł] | cena z ogłoszenia | cena ≤ 75% typowej → **uwaga** (mocniejsza treść); ≤ 88% → **uwaga**; ≥ 115% → **ok** z uwagą „argument w negocjacji”; inaczej **ok** |
| 4 | `odo_registry` (mieszany) | p1s2i2 Historia pojazdu: odczyty rosną? | ostatni odczyt licznika z badania [km] | przebieg z ogłoszenia | ogłoszenie + 500 km < odczyt z rejestru → **problem wymuszony** (dealbreaker: „ogłoszenie podaje mniej niż rejestr”); inaczej tylko podpowiedź, stan z przycisków „Rosną / Jest spadek” |
| 5 | `odo_dashboard` (auto) | p4s1i1 Licznik przy aucie | przebieg na liczniku [km] | odczyt z rejestru (reguła 4) i przebieg z ogłoszenia | licznik < odczyt z rejestru → **problem** (dealbreaker); licznik + 300 < ogłoszenie → **problem**; licznik > ogłoszenie + 3 000 → **uwaga**; brak obu punktów odniesienia → **uwaga** („niezweryfikowany”); inaczej **ok** |
| 6 | `vin_doc` (auto) | p2s1i2 VIN z dowodu (pole E) | VIN z dowodu (17 znaków) | VIN od sprzedawcy | ≠ 17 znaków → bez stanu; zgodny → **ok**; różny → **problem**; brak VIN-u od sprzedawcy → **ok** („zapisany”) i ten VIN staje się VIN-em auta w raporcie |
| 7 | `inspection_valid` (auto) | p2s1i5 Badanie techniczne | termin następnego badania (data z pieczątki) | dzisiejsza data | po terminie → **problem**; ≤ 60 dni do końca → **uwaga**; inaczej **ok** |
| 8 | `oc_valid` (auto) | p2s4i4 Polisa OC | OC ważne do (data) | dzisiejsza data | po terminie → **problem**; ≤ 14 dni → **uwaga**; inaczej **ok** |
| 9 | `prod_year` (auto) | p2s1i6 Rok produkcji z dowodu | rok produkcji z dowodu | rocznik z ogłoszenia | rok z dowodu < rocznik z ogłoszenia → **problem** („rocznik zawyżony o N lat”); równy lub nowszy → **ok**; brak rocznika z ogłoszenia → **ok** z podpowiedzią |
| 10 | `keys` (mieszany) | p2s4i6 Kluczyki | liczba kluczyków | — | ≥ 2 → **ok**; 1 → **uwaga**; 0 → **problem**; przycisk „Któryś nie działa” = ręczny **problem** |
| 11 | `dot_year` (auto) | p3s6i1 DOT najstarszej opony | rok produkcji najstarszej opony | rok bieżący | wiek ≥ 10 lat → **problem**; ≥ 6 lat → **uwaga**; inaczej **ok**; rok < 1990 lub z przyszłości → bez stanu („sprawdź rok”) |
| 12 | `tread_mm` (auto) | p3s6i2 Głębokość bieżnika | najmniejsza głębokość [mm] | — | < 1,6 mm → **problem** (prawne minimum); < 3 mm → **uwaga**; 3–4 mm → **ok** z uwagą o zimowych (< 4 mm do wymiany); ≥ 4 → **ok** |
| 13–24 | `paint_panel` (auto, 12 punktów) | p3s2i1–p3s2i12 dach, maska, błotniki, drzwi, ćwiartki, klapa, słupki/progi | grubość lakieru [µm], najwyższy odczyt z 3–5 punktów | baza = dach; bez dachu mediana, gdy są ≥ 3 odczyty; bez bazy → bez stanu („zmierz dach”) | dach → **ok** („baza”); odczyt > 2,4× bazy → **problem** („szpachla lub naprawa”); > 1,4× bazy → **uwaga** („element lakierowany”); inaczej **ok** |

## Wyliczenia poza punktami (karta „Dane z ogłoszenia”)
- **Kilometry na rok** — jak reguła 2, pokazane skrótowo pod kartą.
- **Pierwsza rejestracja kontra rocznik** — data pierwszej rejestracji wcześniejsza niż rok produkcji → czerwona informacja („coś się nie zgadza”); 2 lata i więcej po roku produkcji → żółta informacja („auto długo stało albo rocznik naciągany, zapytaj”); inaczej zielona.
- **Brakujące dane** — pola oznaczone „nie ma” (VIN, nr rejestracyjny, data pierwszej rejestracji, zdjęcie licznika, także cena/rocznik/przebieg) stają się gotowymi zdaniami na początku kroku „Rozmowa”; odmowa podania VIN ustawia p1s1i2 na **problem** (dealbreaker).

## Co audytor powinien ocenić
1. Czy progi są rozsądne dla laika i dla polskiego rynku (zwłaszcza: 1,4× / 2,4× dachu przy lakierze; 300 km i 3 000 km tolerancji przy liczniku; 60 dni przy badaniu; 7 000 / 25 000 km na rok).
2. Czy któraś reguła daje **fałszywe poczucie bezpieczeństwa** (zielone tam, gdzie powinno być „nie wiem”).
3. Czy któraś reguła daje **fałszywy alarm**, który zniechęci do dobrego auta (np. niski przebieg roczny u starszego właściciela).
4. Czy zdania „Ocena: …” są zrozumiałe i nie orzekają o stanie auta ponad to, co wynika z liczb.
