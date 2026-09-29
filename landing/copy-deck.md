# Copy deck — landing Odhacz Auto (mobile first) · v3 po audycie zewnętrznym A (2026-09-29)

Zasady: jedna akcja = KUP. Każde zdanie przechodzi test „co konkretnie z tego mam?”. Bez przekreślonych cen, bez liczników, bez zmyślonych opinii (nie mamy jeszcze klientów — nie udajemy). Język persony: „wtopa”, „bezwypadkowy”, „szpachla”, „zimny silnik”. Ton: krótko, na „Ty”, suchy humor.

Co zmieniło się w v3 (źródło: `experiments/audyt/wynik-A-2026-09-29.md`, decyzja: `DECISIONS.md` 2026-09-29): przewaga to **prowadzenie przy aucie + dowody przypięte do problemu + jawne dealbreakery + raport i argumenty**, nie „interaktywna checklista, 160 punktów”. „160” schodzi niżej jako dowód kompletności. **Nigdzie nie piszemy „o co zbić cenę”** (nie podajemy kwot) — zawsze „lista problemów i argumentów do negocjacji”. Kotwica: „39 zł raz, używasz przy każdym aucie” zamiast paliwa. Nowe sekcje: „Tak wygląda raport”, „Dlaczego nie darmowa checklista?”, „Skąd to wiemy”.

Placeholdery: `[[SPRZEDAWCA_NAZWA]]` itd. jak w `legal/01-teksty.md`. Nowe, ukryte do czasu wypełnienia: `[[MECHANIK]]`, `[[BETA_AUT]]`, `[[BETA_POPRAWKI]]` (sekcja 11).

Kolejność sekcji: hero → problem → rezultat → jak działa → co dostajesz → dla kogo → demo → **tak wygląda raport** → **dlaczego nie darmowa checklista** → obiekcje → **skąd to wiemy** → FAQ → cena → CTA końcowe → stopka. Nawigacja desktop: Jak działa · Demo · Raport · FAQ · 39 zł.

---

## 0. Pasek nad hero
USUNIĘTY (od v2). Istnieje darmowe interaktywne narzędzie do sprawdzenia ogłoszenia — „pierwsza w Polsce” byłoby nieprawdą.

## 1. HERO
- Overline: **Odhacz Auto** · prowadzenie przy aucie, dowody, raport
- H1: **Obejrzyj używane auto jak fachowiec. Wyjdź z listą uwag do negocjacji.**
- Lead: Otwierasz link w telefonie przy aucie. Prowadzimy Cię krok po kroku: tapiesz OK / Uwaga / Problem, wpisujesz pomiar lakieru, robisz zdjęcie problemu. Na końcu masz decyzję, raport z oględzin i listę problemów i argumentów, z którymi wejdziesz do negocjacji. To strona, nie plik i nie apka. Nie musisz być mechanikiem.
- CTA główne: **Kupuję za 39 zł** (przycisk `data-buy="main"`, `data-testid="cta-main"`)
- CTA drugie (link): Zobacz, jak działa ↓ (kotwica do demo)
- Kotwica pod CTA: **39 zł raz.** Używasz przy każdym aucie, które pojedziesz obejrzeć. *(linia o paliwie usunięta)*
- Linia zaufania: Dostęp od razu po płatności · BLIK, karta, Przelewy24 · Gwarancja spokojnej głowy: 14 dni
- Wizual: makieta telefonu — etap „Nadwozie i lakier”, 3 rzędy z odpowiedziami OK / Uwaga / Problem; przy rzędzie „Problem” dowody przypięte do punktu: chipy „zdjęcie · 640 µm · „prawy tył, pod listwą””; dolny pasek „Czerwone flagi: 3 · Dealbreaker: 0”. Obok mały Hacz z latarką.

## 2. PROBLEM — „Znasz to?”
Nagłówek: **Przy sprzedawcy pamiętasz połowę. Reszta wychodzi po tygodniu.**
Trzy krótkie karty:
1. Masz w notatkach 10 rzeczy z YouTube. Przy aucie pamiętasz cztery, a sprzedawca mówi bez przerwy.
2. „Bezwypadkowy” w ogłoszeniu, a drzwi mają inny odcień. Dealbreaker czy argument do negocjacji? Nie wiesz.
3. Auto stoi 120 km od domu. Masz jedną szansę i 40 minut.
Liczba (z przypisem): **65%** — tyle z ok. 80 tys. aut, które rocznie trafiają do skupu AAA AUTO, technicy odrzucają z powodu wad technicznych lub prawnych.¹
¹ Źródło: rp.pl / Polskie Radio 24, dane AAA AUTO za 2025 (dotyczą aut zgłaszanych do skupu tej sieci, nie całego rynku).

## 3. REZULTAT — „Wychodzisz z decyzją i raportem, nie z wrażeniem.”
Cztery karty (mobile: pionowo; od 720 px: 2×2) — cztery realne przewagi:
- **Prowadzimy Cię przy aucie, w czasie rzeczywistym.** Nie czytasz listy w domu i nie próbujesz jej zapamiętać. Stoisz przy aucie, telefon mówi, co teraz sprawdzić i jak — w kolejności, która ma sens: dokumenty przed lakierem, zimny silnik przed jazdą.
- **Każdy problem ma dowód.** Status + pomiar + zdjęcie + notatka przypięte do jednego punktu. Nie „coś było z lakierem”, tylko: klapa 210 µm przy 110 na dachu, zdjęcie, Twoja notatka. Tego sprzedawca nie zagada.
- **Dealbreakery są jawne. Najpierw odsiewasz, potem sprawdzasz.** Szybki filtr na 10 minut: dokumenty, VIN, zimny start, dealbreakery. Auto, które odpada, odpada zanim poświęcisz mu godzinę. To, które zostaje, dostaje pełne oględziny.
- **Wychodzisz z raportem. Kilka aut porównasz obok siebie.** Raport z oględzin: decyzja, mapa lakieru, lista problemów i argumentów do negocjacji. Zapisujesz PDF, wysyłasz sobie, pokazujesz sprzedawcy. Trzy auta w tygodniu? Na koniec widzisz je obok siebie.

## 4. JAK DZIAŁA — 3 kroki
1. **Kupujesz, dostajesz link.** Otwierasz na telefonie. Bez aplikacji, bez logowania.
2. **Przy aucie tapiesz.** Najpierw Szybki filtr (10 minut), potem pełne oględziny: OK / Uwaga / Problem / Pomiń. Wpisujesz pomiary (np. lakier w µm), robisz zdjęcia, dopisujesz notatki.
3. **Na końcu dostajesz raport.** Decyzja: kup / negocjuj / zawołaj mechanika / odpuść — z uzasadnieniem — oraz lista problemów i argumentów, z którymi wejdziesz do negocjacji.

## 5. CO DOKŁADNIE DOSTAJESZ — 7 etapów
Nagłówek: **7 etapów. Prowadzimy Cię od ogłoszenia do negocjacji.**
Zdanie pod nagłówkiem (dowód kompletności): W sumie 160 punktów — każdy z instrukcją, jak to sprawdzić bez bycia mechanikiem.
| Etap | Czas | Co w środku |
|---|---|---|
| Zanim pojedziesz | 15 min | czerwone flagi w ogłoszeniu, VIN i historia, skrypt rozmowy telefonicznej ze sprzedawcą, co zabrać |
| Dokumenty i tożsamość | 5 min | dowód rejestracyjny, zgodność VIN w 3 miejscach, czy sprzedający jest właścicielem, serwis, import |
| Nadwozie i lakier | 15 min | pomiar lakieru element po elemencie (mapa lakieru), spasowanie, śruby, szyby, rdza, opony |
| Wnętrze i elektryka | 10 min | kontrolki przy zapłonie, wilgoć, przebieg vs zużycie, klimatyzacja, airbag |
| Pod maską — tylko na zimnym | 10 min | wycieki, olej, płyn, paski, zimny start, kolor dymu |
| Jazda próbna | 15 min | skrzynia, sprzęgło, hamulce, zawieszenie, hałasy, kierownica |
| Podsumowanie i negocjacja | 5 min | decyzja, raport z oględzin, lista problemów i argumentów, scenariusz rozmowy, zasady bezpiecznej transakcji |
Pod tabelą — „Poza tym” (lista, nie pigułki):
- **Szybki filtr 10 minut:** dokumenty, VIN, zimny start, dealbreakery — zanim poświęcisz godzinę
- **Mapa lakieru:** 12 elementów auta z Twoimi odczytami
- **Porównanie kilku aut** obok siebie (Auto 1, Auto 2…)
- **Scenariusz rozmowy ze sprzedawcą** — z gotowymi zdaniami i wiadomością, jeśli nie lubisz dzwonić
- zdjęcia i notatki przy punktach · raport wyślesz sobie jednym tapnięciem (PDF albo tekst) · odpowiedzi i notatki synchronizują się po linku z maila · zdjęcia zostają na telefonie, na którym je zrobiłeś · dostęp 24 miesiące

## 6. DLA KOGO / NIE DLA KOGO
**Dla Ciebie, jeśli:** kupujesz auto z ogłoszenia (10–60 tys. zł), nie jesteś mechanikiem, chcesz obejrzeć sam albo wiedzieć, kiedy wołać fachowca.
**Nie dla Ciebie, jeśli:** jesteś mechanikiem, kupujesz w salonie z gwarancją, albo szukasz wyceny napraw — nie wyceniamy, pokazujemy fakty.

## 7. DEMO — „Sprawdź, jak to działa. Bez rejestracji.”
Podtytuł: Pięć punktów z etapu „Nadwozie i lakier”. Tapnij odpowiedzi — licznik i lista uwag budują się na żywo. Jak wygląda pełny wynik, zobaczysz zaraz niżej.
Interaktywny fragment (5 punktów: grubość lakieru maski z polem µm, spasowanie, szyby, śruby ze „zdjęciem”, rdza) z działającym licznikiem flag. Po zaznaczeniu uwagi/problemu pokazuje wygenerowane zdanie do negocjacji, np. „Lakier na masce 380 µm przy ~110 na reszcie — proszę o wyjaśnienie i korektę ceny.” Komunikat po odhaczeniu etapu: „…W pełnej wersji raport składa się sam ze wszystkich 7 etapów — zapisujesz PDF albo wysyłasz sobie jednym tapnięciem.” Zdarzenia: `demo_start`, `demo_done`. Pod demem CTA: **Odblokuj wszystkie 7 etapów — 39 zł**.

## 8. TAK WYGLĄDA RAPORT (nowa, statyczna makieta wyniku — nie demo)
Kicker: Przykładowy raport · H2: **Tak wygląda raport.** · Podtytuł: Jedno auto po pełnych oględzinach. Wszystko poniżej to przykład — ale dokładnie w tej formie dostajesz swój wynik.
Karta raportu (oznaczona plakietką „przykładowy raport”):
- Nagłówek: Raport z oględzin · **Auto 1 · Octavia 2016** · 160 punktów, 30 pominiętych (nie dotyczy tego auta) · 68 min przy aucie · 4 zdjęcia
- Liczniki: **OK 121 · Uwaga 7 · Problem 2 · Dealbreaker 0**
- Decyzja („Co z tym zrobić”): chip **Negocjuj** — „2 problemy i 7 uwag. Nic z tego nie przekreśla auta, ale każda pozycja to argument w rozmowie o cenie.” Dwa powody: (1) Bez dealbreakerów: VIN zgodny w 3 miejscach, zimny start czysty, kontrolka airbag zgasła po autoteście. (2) Pokaż sprzedawcy listę poniżej — punkt po punkcie, bez wyceniania napraw. *(spójne z logiką decyzji w aplikacji: 0 dealbreakerów, <3 problemy, brak czerwonych flag → „Negocjuj”)*
- Mapa lakieru (inline SVG, widok z góry, µm względem dachu): dach **110** = odniesienie; 12 elementów z odczytami: maska 115, błotniki przednie 112/118, drzwi przednie 108/114, drzwi tylne **lewe 380 (Problem, czerwone)** / prawe 121, błotniki tylne 119/116, klapa **210 (Uwaga, żółte)**, progi 122/119. Legenda: jak dach · grubiej: element malowany · dużo grubiej: pytaj o szpachlę.
- Lista problemów i argumentów do negocjacji (9 pozycji, 6 pokazanych), każda z dowodami (zdjęcie / pomiar / notatka):
  1. [Problem] Drzwi tylne lewe: 380 µm przy 110 na dachu — zdjęcie · 380 µm · „pod klamką falisty odcień”
  2. [Problem] Sprzęgło łapie wysoko, przy ruszaniu pod górę szarpie — „jazda próbna, 3 próby”
  3. [Uwaga] Klapa bagażnika: 210 µm przy 110 na dachu — zdjęcie · 210 µm
  4. [Uwaga] Opony przód: 2,5 mm, różne marki — zdjęcie · 2,5 mm
  5. [Uwaga] Wilgoć pod dywanikiem bagażnika — zdjęcie · „mokro przy kole zapasowym”
  6. [Uwaga] Brak wpisów serwisowych od 2022 — „sprzedawca: robił kolega”
  + 3 kolejne uwagi (klimatyzacja, wycieraczki, kontrolka ciśnienia w oponach) — w pełnym raporcie, pogrupowane etapami.
- Przyciski (statyczne, narysowane): **Zapisz PDF · Kopiuj · Udostępnij**
Podpis pod kartą: Każdy punkt to fakt, który sam sprawdziłeś na miejscu. Raport zapisujesz, wysyłasz sobie albo pokazujesz sprzedawcy.
Pasek porównania (przykład): „Porównanie: trzy auta z jednego tygodnia, obok siebie” — Auto 1 · Octavia 2016 → **Negocjuj** (Problem 2 · Uwaga 7 · Dealbreaker 0) · Auto 2 · Focus 2015 → **Odpuść** (Dealbreaker 1: przebieg niższy niż w Historii pojazdu) · Auto 3 · Astra 2017 → **Zawołaj mechanika** (Problem 3: wycieki, skrzynia, zawieszenie).

## 9. DLACZEGO NIE DARMOWA CHECKLISTA? (nowa)
Kicker: Uczciwie · H2: **Dlaczego nie darmowa checklista?** · Podtytuł: Bo darmowe są dobre — do pewnego momentu. Do sprawdzenia ogłoszenia i historii pojazdu wystarczą darmowe narzędzia (w etapie 1 sami Cię do nich odsyłamy). Różnica zaczyna się przy aucie i po oględzinach.
Tabela (bez nazw konkurentów; na mobile każdy wiersz = etykieta + 3 komórki z podpisem kolumny):
| Co dostajesz | Darmowa checklista PDF | Darmowa aplikacja | Odhacz Auto |
|---|---|---|---|
| Prowadzenie przy aucie krok po kroku | częściowo | ✓ | ✓ |
| Zdjęcie i pomiar przypięte do problemu | — | czasem | ✓ |
| Dealbreakery z wyjaśnieniem | — | — | ✓ |
| Lista argumentów do negocjacji | — | — | ✓ |
| Raport do zapisania i wysłania | — | ✓ | ✓ |
| Porównanie kilku aut | — | czasem | ✓ |
| Po polsku, z realiami CEPiK / PCC / OC | ✓ | — | ✓ |
| Bez instalacji i logowania | ✓ | — | ✓ |
Zdanie pod tabelą: **Darmowe listy są dobre do przeczytania w domu. Płacisz za godzinę prowadzenia za rękę przy aucie i za to, co z niej zostaje: raport.**

## 10. OBIEKCJE — „Zanim zapytasz”
- **„Są darmowe checklisty PDF.”** Są — i do sprawdzenia ogłoszenia i historii pojazdu wystarczą darmowe narzędzia (korzystaj). Różnica zaczyna się przy aucie: prowadzenie krok po kroku, dowód przypięty do każdego problemu, dealbreakery z wyjaśnieniem, a na końcu raport i lista argumentów. Punkt po punkcie masz to w tabeli wyżej *(link do #porownanie)*. Za 39 zł kupujesz godzinę prowadzenia za rękę, nie kartkę.
- **„Wolę zapłacić mechanikowi.”** My też — przy aucie, które przejdzie Szybki filtr i pierwsze etapy. Drabinka jest prosta: 0 zł ogłoszenie i CEPiK → 39 zł Odhacz przy aucie → ok. 90 zł raport historii VIN → 350–750 zł mechanik przy egzemplarzu, który chcesz kupić. Odhacz mówi Ci, kiedy wejść na kolejny szczebel — żebyś nie płacił 500 zł za auto, które odpada przy dokumentach.
- **„Nie mam grubościomierza.”** Każdy punkt ma wersję bez narzędzi. Grubościomierz kosztuje tyle co tankowanie i pokazujemy, jak go użyć w 60 sekund.
- **„Nie znam Was.”** Za Odhacz stoi [[SPRZEDAWCA_NAZWA]] z [[MIASTO]], NIP [[NIP]] — te same dane zobaczysz w Bibliotece reklam Meta, w stopce i w regulaminie. Płacisz przez Stripe (BLIK, karta, Przelewy24). Jeśli narzędzie Ci nie pomoże, w 14 dni oddajemy pieniądze — bez tłumaczenia. Hacz, nasz przewodnik, jest postacią AI: nie udaje mechanika i nie ocenia, czy auto jest bezpieczne. (Zasada: człowiek/firma zawsze przed maskotką.)

## 11. SKĄD TO WIEMY (nowa, przed FAQ)
Kicker: Zaufanie · H2: **Skąd to wiemy.** Cztery pozycje (dwie widoczne od razu, dwie ukryte w komentarzu HTML do czasu wypełnienia):
- **Źródła.** Przepisy i serwisy gov.pl (Historia pojazdu, mObywatel, UFG), publiczna praktyka diagnostów i rzeczoznawców, norma prawna dla przebiegu (odczyty licznika w rejestrze, art. 306a kk) i badań technicznych. Bez statystyk z powietrza i bez „sekretów mechaników”.
- **Metoda.** Każdy ze 160 punktów ma trzy części: co sprawdzić, jak to zrobić bez bycia mechanikiem, dlaczego to ważne. Zamiast wyroków — widełki (lakier porównujesz z dachem, nie z tabelką). Zero wycen napraw: to zależy od auta i warsztatu, nie od nas.
- **Weryfikacja** *(UKRYTA — włączyć po recenzji mechanika; instrukcja w komentarzu HTML)*: Treść sprawdził: [[MECHANIK]]. Uwagi z przeglądu naniesione przed startem sprzedaży; lista zmian jest w narzędziu, w sekcji „O treści”.
- **Testy** *(UKRYTA — włączyć po becie z prawdziwymi kupującymi; instrukcja w komentarzu HTML)*: Przed startem narzędzie przeszło oględziny z prawdziwymi kupującymi: [[BETA_AUT]] aut obejrzanych z telefonem w ręku, [[BETA_POPRAWKI]] poprawek w treści po ich uwagach.
Wyróżnione zdanie (ciemny pasek z Haczem „uwaga”): **Narzędzie nie widzi auta.** Wynik powstaje z tego, co sam sprawdzisz i wpiszesz.

## 12. FAQ
- **Czy to aplikacja do pobrania?** Nie. Otwierasz link w przeglądarce (iPhone, Android, komputer). Możesz dodać do ekranu głównego jak aplikację.
- **Czy działa bez zasięgu?** Potrzebuje internetu, ale wystarczy słaby zasięg — treść jest lekka. Otwórz link raz w domu, żeby mieć go pod ręką. Zdjęcia i notatki zostają w telefonie. *(Bez zmian do testu service workera na iPhonie i Androidzie — Checkpoint 3; potem wracamy do „działa też bez zasięgu po pierwszym otwarciu”.)*
- **Czy dostanę kwotę, o ile negocjować?** *(nowe)* Nie. Nie wyceniamy napraw — to zbyt zależy od auta i warsztatu. Dajemy fakty i argumenty; kwotę ustalasz Ty.
- **Czy porównam kilka aut?** *(nowe)* Tak. Każde auto ma osobną listę i raport, a w porównaniu widzisz je obok siebie: decyzja, liczba problemów i uwag, dealbreakery. Trzy auta w tygodniu — na koniec widzisz, które ma sens.
- **Ile aut mogę sprawdzić?** Ile chcesz. Każde auto ma osobną listę i osobny raport.
- **Jak długo mam dostęp?** 24 miesiące od zakupu, z aktualizacjami treści w tym czasie.
- **Czy dostanę fakturę?** Tak, na życzenie — odpisz na e-mail z zamówieniem.
- **Co z prawem do zwrotu?** Treść cyfrową dostarczamy od razu po płatności, więc ustawowe 14 dni na odstąpienie nie ma zastosowania (potwierdzasz to w checkout). Zamiast tego masz naszą gwarancję: 14 dni, zwrot bez tłumaczenia.
- **Czy to zastępuje mechanika?** Nie. To narzędzie edukacyjne: porządkuje oględziny i mówi, kiedy zawołać fachowca. Decyzja jest Twoja.
- **Co to jest „Po zakupie” za 19 zł?** Drugi krok: umowa kupna-sprzedaży z objaśnieniami, PCC-3, rejestracja, OC, pierwszy serwis, przypomnienia do kalendarza. Dodajesz w koszyku jednym kliknięciem.

## 13. CENA
Karta:
- **Odhacz Auto — 39 zł** · raz · dostęp od razu · kilka aut
- Punkty (najpierw rezultaty): ✓ raport z oględzin: decyzja + lista problemów i argumentów do negocjacji (PDF, kopiuj, wyślij) ✓ mapa lakieru: 12 elementów auta z Twoimi odczytami ✓ porównanie kilku aut obok siebie ✓ scenariusz rozmowy ze sprzedawcą — także jako wiadomość, jeśli nie dzwonisz ✓ dealbreakery z wyjaśnieniem i Szybki filtr 10 minut ✓ 7 etapów, 160 punktów z instrukcjami; zdjęcia i notatki przy punktach ✓ dostęp od razu po płatności, 24 miesiące ✓ gwarancja 14 dni
- Dopisek: W koszyku możesz dodać **„Po zakupie”** (umowa, PCC-3, rejestracja, OC, pierwsze 30 dni) za **19 zł**.
- Kotwice (drabinka, prawdziwe): sprawdzenie ogłoszenia i VIN w gov.pl: 0 zł → Odhacz przy aucie: 39 zł (kilka aut) → raport historii VIN: ok. 90 zł, gdy auto przeszło oględziny → mechanik/inspekcja: 350–750 zł, gdy chcesz kupić. Odhacz mówi Ci, kiedy wejść na kolejny szczebel. (PDF za 19 zł nie jest kotwicą.)
- CTA: **Kupuję za 39 zł**
- Micro-legal: Cena brutto. Dostęp dostajesz od razu, dlatego w checkout potwierdzasz rezygnację z ustawowego 14-dniowego odstąpienia — w zamian masz naszą 14-dniową gwarancję zwrotu. Regulamin · Polityka prywatności.

## 14. CTA końcowe
Nagłówek: **Szukasz auta? Kup raz.**
Tekst: Użyjesz przy każdym egzemplarzu, który pojedziesz obejrzeć. Start zajmuje 3 minuty. („Jutro oglądasz auto?” zostaje w reklamie story, gdzie moment ma sens.)
CTA: **Kupuję za 39 zł** · pod spodem: Gwarancja spokojnej głowy 14 dni.

## Sticky pasek mobile (po przewinięciu poza hero)
Lewa: „Odhacz Auto · 39 zł raz” · Prawa: przycisk **Kupuję**.

## Stopka
[[SPRZEDAWCA_NAZWA]] · [[SPRZEDAWCA_ADRES]] · NIP [[NIP]] · [[EMAIL_KONTAKT]]
Regulamin · Polityka prywatności · O marce i o Haczu · Ustawienia cookies
„Hacz to postać AI — wirtualny asystent marki, nie mechanik. Ilustracje zaprojektowane cyfrowo. Raport i porównanie aut na tej stronie to przykłady, nie wyniki prawdziwych oględzin.”
„Odhacz Auto to narzędzie edukacyjne i pomocnicze: nie zastępuje mechanika ani rzeczoznawcy, nie wycenia napraw i nie gwarantuje wykrycia każdej wady.”

## Meta / SEO
- Title: Odhacz Auto — sprawdź używane auto przy sprzedawcy krok po kroku (telefon, 39 zł)
- Head: `<meta name="facebook-domain-verification" content="[[META_DOMAIN_VERIFICATION]]">`
- Description (także OG/Twitter): Prowadzimy Cię przez oględziny używanego auta krok po kroku: pomiary, zdjęcia, dealbreakery, raport i lista argumentów do negocjacji. 39 zł raz, kilka aut.
- JSON-LD Product name: Odhacz Auto — prowadzenie przez oględziny używanego auta w telefonie
- OG image: /assets/brand/og-1200x630.png
