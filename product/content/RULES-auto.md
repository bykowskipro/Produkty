# Odhacz Auto — reguły automatycznej oceny (treść 1.4, silnik 1.4.0, po audycie B 29.09.2026)

Źródło prawdy: `platform/public/assets/checklist/engine.js`, obiekt `AUTO_RULES` i funkcja `paintData`. Ten plik jest opisem dla audytu i dla redakcji treści. Progi są **widełkami orientacyjnymi**, nie normami; każdą ocenę użytkownik widzi razem z liczbami, z których wynika, i może ją zmienić u źródła (poprawiając wpisaną wartość).

Zasada po audycie: **„ok” znaczy „brak niespójności w tym jednym teście”, nigdy „to jest dobre auto”**; zielony stan bez punktu odniesienia nie istnieje (wtedy „uwaga: niezweryfikowane” albo brak stanu). System opisuje różnice i niespójności, nie stawia diagnoz („niespójność odczytów”, nie „cofnięty licznik”; „element mógł być lakierowany”, nie „szpachla”).

Jak to działa: punkt „czysto automatyczny” nie ma przycisków OK/Uwaga/Problem — użytkownik wpisuje wartość, system ustawia stan (ok / uwaga / problem) i pokazuje zdanie „Ocena: …”. Zostaje tylko przycisk pominięcia z opisem powodu („Nie mam miernika”, „Nie odczytam”). Punkt „mieszany” ma przyciski z odpowiedziami i regułę: reguła podpowiada (albo wymusza „problem”, gdy dane się kłócą), tap użytkownika nadpisuje; odpowiedź systemu znika, gdy znika jej podstawa.

| # | Reguła (`id`) | Punkt | Co wpisuje użytkownik | Z czym porównuje | Progi i stan |
|---|---|---|---|---|---|
| 1 | `vin_present` (mieszany) | p1s1i2 VIN od sprzedawcy | — (numer z karty „Dane z ogłoszenia” lub z rozmowy) | ≥ 11 znaków (VIN ma 17; starsze auta krótszy numer nadwozia) | jest → **ok**; brak → bez stanu z podpowiedzią; przyciski: „Poda dopiero na miejscu” = **uwaga**, „Nie da sprawdzić nawet na miejscu” = **problem** (dealbreaker) |
| 2 | `km_per_year` (auto) | p1s1i6 Przebieg kontra wiek | — (przebieg i rocznik z danych z ogłoszenia) | wiek = bieżący rok (z miesiącem) − rocznik − 0,5, min. 0,5 roku | < 5 000 km/rok → **uwaga** („nietypowo mało — zweryfikuj”); > 35 000 → **uwaga** („intensywne użytkowanie”); inaczej **ok** z dopiskiem „to nie ocena stanu auta” |
| 3 | `price_vs_market` (mieszany) | p1s1i4 Cena kontra podobne | typowa cena podobnych ogłoszeń [zł] | cena z ogłoszenia | cena ≤ 70% typowej → **problem wymuszony** („tak tanio nie ma bez powodu; nie płać nic przed oględzinami i SKP”); ≤ 85% → **uwaga**; ≥ 112% → **ok** z uwagą „argument w negocjacji”; inaczej **ok** |
| 4 | `odo_registry` (mieszany) | p1s2i2 Historia pojazdu: odczyty spójne? | ostatni odczyt licznika z badania [km] | przebieg z ogłoszenia | ogłoszenie + 2 000 km < odczyt z rejestru → **problem wymuszony** („niespójność do wyjaśnienia”, dealbreaker); inaczej tylko podpowiedź; przyciski: „Rosną” ok, „Spadek, jest dokument wymiany drogomierza” uwaga, „Spadek bez wyjaśnienia” problem |
| 5 | `odo_dashboard` (auto) | p4s1i1 Licznik przy aucie | przebieg na liczniku [km] | odczyt z rejestru (reguła 4) i przebieg z ogłoszenia | licznik < odczyt z rejestru → **problem** (dealbreaker; „niespójność, której bez dokumentu wymiany nie da się wytłumaczyć”); licznik + 2 000 < ogłoszenie → **problem**; licznik > ogłoszenie + 5 000 → **uwaga** (neutralnie: „od publikacji sporo przejechało albo ogłoszenie stare”); brak obu punktów odniesienia → **uwaga** („niezweryfikowany”); inaczej **ok** („brak niespójności w tym teście”) |
| 6 | `vin_doc` (auto) | p2s1i2 VIN z dowodu (pole E) | numer z dowodu (11–17 znaków) | numer od sprzedawcy | < 11 znaków → bez stanu; zgodny → **ok** („dokument zgodny; właściwa weryfikacja to numer na aucie”); różny → **problem**; brak numeru od sprzedawcy → **ok** z jawnym „nie ma z czym porównać” i ten numer staje się numerem auta w raporcie |
| 7 | `inspection_valid` (auto) | p2s1i5 Badanie techniczne | termin następnego badania | dzisiejsza data | po terminie → **problem**; ≤ 30 dni → **uwaga**; 31–60 dni → **ok** z dopiskiem „zaraz po zakupie umów stację”; inaczej **ok** |
| 8 | `oc_valid` (auto) | p2s4i4 Polisa OC | OC ważne do | dzisiejsza data | po terminie → **problem** (nie jedź); ≤ 14 dni → **ok** z przypomnieniem (kończące się OC nie jest wadą auta); inaczej **ok** |
| 9 | `prod_year` (auto) | p2s1i6 Rok produkcji z dowodu | rok produkcji z dowodu | rocznik z ogłoszenia | rok z dowodu < rocznik z ogłoszenia → **problem** („rocznik zawyżony o N lat”); równy lub nowszy → **ok**; brak rocznika z ogłoszenia → **ok** z jawnym „brak porównania” |
| 10 | `keys` (mieszany) | p2s4i6 Kluczyki | liczba kluczyków | — | ≥ 2 → **ok**; 1 → **uwaga**; 0 → **problem**; przycisk „Któryś nie działa” = **uwaga** (koszt, nie dyskwalifikacja) |
| 11 | `dot_year` (auto) | p3s6i1 DOT najstarszej opony | rok produkcji najstarszej opony | rok bieżący | wiek ≥ 10 lat → **problem** („producenci zalecają wymianę — zalecenie, nie przepis”); ≥ 6 lat → **uwaga** („coroczna kontrola po 5 latach”); inaczej **ok** |
| 12 | `tread_mm` (auto) | p3s6i2 Głębokość bieżnika | najmniejsza głębokość [mm] | — | < 1,6 mm → **problem** (minimum prawne); < 3 mm → **uwaga**; 3–4 mm → **uwaga** („letnie w porządku, zimowe i całoroczne poniżej 4 mm tracą właściwości — sprawdź typ”); ≥ 4 → **ok** |
| 13–24 | `paint_panel` (auto, 12 punktów) | p3s2i1–p3s2i12 dach, maska, błotniki, drzwi, ćwiartki, klapa, słupki/progi | grubość lakieru [µm] — **typowy** odczyt z 3–5 punktów (odstający punkt do notatki) | baza = **mediana wszystkich zmierzonych elementów** (od 3 pomiarów); przy 1–2 pomiarach dach, jeśli zmierzony; bez bazy → bez stanu („zmierz co najmniej 3 elementy”) | odczyt > 3,0× bazy → **problem** („bardzo duża różnica: możliwa szpachla lub naprawa — pokaż fachowcowi”); > 1,6× → **uwaga** („wyraźnie grubszy niż reszta: element mógł być lakierowany”); inaczej **ok** („bez wyraźnej różnicy”) |

## Pomijanie punktów, które nie dotyczą tego auta (pola „Paliwo / napęd” i „Skrzynia biegów”)
- Skrzynia manualna → punkty automatu (p6s3i1–i3) system oznacza jako pominięte; automatyczna → punkty sprzęgła i dwumasy (p6s2i1–i3).
- Paliwo inne niż LPG → punkt o instalacji LPG (p2s4i8) pominięty; napęd inny niż hybryda / plug-in / elektryk → punkt o baterii wysokiego napięcia (p4s6i3) pominięty.
- Pominięcie systemowe znika, gdy użytkownik zmieni dane; tap użytkownika zawsze wygrywa.

## Wyliczenia poza punktami (karta „Dane z ogłoszenia”)
- **Kilometry na rok** — jak reguła 2.
- **Pierwsza rejestracja kontra rocznik** — data pierwszej rejestracji wcześniejsza niż rok produkcji → czerwona informacja; 2 lata i więcej po roku produkcji → żółta informacja („auto długo stało albo rocznik naciągany, zapytaj”); inaczej zielona.
- **Brakujące dane** — pola oznaczone „nie ma” stają się gotowymi zdaniami na początku kroku „Rozmowa”; niepodanie VIN-u przed spotkaniem = **uwaga** (sprawdzisz na miejscu, przed zapłatą), nie dealbreaker.

## Co audytor powinien nadal oceniać
1. Czy progi są rozsądne dla laika i dla polskiego rynku (zwłaszcza 1,6× / 3,0× mediany przy lakierze; 2 000 km i 5 000 km przy liczniku; 30 dni przy badaniu; 5 000 / 35 000 km na rok; 70% / 85% przy cenie).
2. Czy któraś reguła daje fałszywe poczucie bezpieczeństwa (zielone tam, gdzie powinno być „nie wiem”).
3. Czy któraś reguła daje fałszywy alarm, który zniechęci do dobrego auta.
4. Czy zdania „Ocena: …” opisują różnice, a nie stawiają diagnoz ponad to, co wynika z liczb.
