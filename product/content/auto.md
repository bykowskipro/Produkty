# Oględziny używanego auta — pełna treść produktu (mirror auto.json v1.4)

> Narzędzie ma charakter edukacyjny i porządkuje oględziny — nie zastępuje sprawdzenia przez mechanika lub rzeczoznawcę i nie ocenia konkretnego egzemplarza. Decyzja o zakupie i jej skutki należą do Ciebie.

Szacowany czas łącznie: 75 min. Stany odpowiedzi: ok, uwaga, problem, pomin.

## Zacznij tu (3 minuty)

1. Wieczór przed: wpisz dane z ogłoszenia (cena, rocznik, przebieg, VIN, nr rejestracyjny, data pierwszej rejestracji). Czego nie ma — zaznacz „nie ma”, dostaniesz gotowe zdania na rozmowę. Trzy dane odblokowują bezpłatny raport na historiapojazdu.gov.pl.
2. Zadzwoń (nie pisz): najpierw zdobądź brakujące dane, potem 12 pytań ze scenariusza, na końcu ustal zimny silnik, dokumenty na stole, zasady jazdy próbnej (prowadzisz choć część trasy, a jeśli sprzedawca woli prowadzić — umawiasz SKP) i zgodę na mechanika/SKP.
3. Spakuj: telefon z latarką + powerbank, grubościomierz (jeśli masz — instrukcja 60 s w kroku „Co zabrać”), ręcznik papierowy, białą chusteczkę, rękawiczki, opcjonalnie czytnik OBD2. Podnieś limity przelewu/BLIK zamiast wozić gotówkę.
4. Na miejscu zaczynasz od dokumentów i VIN. Jeśli tu coś się nie zgadza, kończysz po 5 minutach i oszczędzasz godzinę. Nie wchodź pod auto i nie dotykaj gorących elementów — wszystko, co poniżej progu, zobaczy podnośnik na SKP.
5. Potem nadwozie (dach to wzorzec dla miernika, dalej zgodnie z ruchem wskazówek zegara), wnętrze i test kontrolek na samym zapłonie — silnik wciąż zimny.
6. Dopiero teraz zimny start: stoisz przy masce i przy wydechu, nie w środku. Następnie 20–30 minut jazdy po różnych drogach — Ty prowadzisz, radio wyłączone.
7. Na końcu aplikacja układa Twoją listę uwag: sprawdź, czy nie ma punktu „odpuść”, zdecyduj o mechaniku i negocjuj faktami z listy — bez wycen z internetu.

## Dane z ogłoszenia (krok 1 kreatora)

Wpisz to, co jest w ogłoszeniu. Czego nie ma — zostaw puste i tapnij „nie ma”. Nic nie przepada: te braki dostaniesz jako gotowe zdania w kroku „Rozmowa”, a ja je potem porównam z dokumentami i licznikiem. Paliwo i skrzynia sterują listą: punkty, które nie dotyczą tego auta, oznaczę jako pominięte.

- **Marka i model** — typ: text
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Potwierdzę tylko: to [marka model], rocznik [rok]?”
- **Cena** [zł] — typ: number
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Jaka jest cena i czy jest do rozmowy po oględzinach?”
- **Rocznik (rok produkcji)** [rok] — typ: number
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Który to rok produkcji — produkcji, nie pierwszej rejestracji?”
- **Przebieg** [km] — typ: number
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Jaki jest dokładny przebieg na dziś — co pokaże licznik, kiedy przyjadę?”
- **Paliwo / napęd** — typ: choice
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Jakie paliwo — benzyna, diesel, LPG, hybryda czy elektryk?”
- **Skrzynia biegów** — typ: choice
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Skrzynia manualna czy automatyczna? Jeśli automat — jaki (klasyczny, dwusprzęgłowy DSG, bezstopniowy CVT)?”
- **VIN / numer nadwozia** — typ: vin · można zaznaczyć odmowę
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Poproszę o numer VIN — wystarczy sam numer, żebym przed przyjazdem sprawdził Historię pojazdu.”
- **Nr rejestracyjny** — typ: text · można zaznaczyć odmowę
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Jaki jest numer rejestracyjny? Razem z datą pierwszej rejestracji odblokowuje bezpłatny raport na historiapojazdu.gov.pl.”
- **Data pierwszej rejestracji** — typ: date · można zaznaczyć odmowę
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Jaka jest data pierwszej rejestracji — pole B w dowodzie rejestracyjnym?”
- **Zdjęcie licznika w ogłoszeniu** — typ: yesno · można zaznaczyć odmowę
  - Gdy brak w ogłoszeniu, w rozmowie powiedz: „Prześle mi Pan/Pani zdjęcie licznika z aktualnym przebiegiem? Wystarczy zwykłe zdjęcie telefonem.”

Z danych wyliczane automatycznie: kilometry na rok (przebieg ÷ wiek), pierwsza rejestracja vs rok produkcji, cena vs podobne ogłoszenia (po wpisaniu ceny rynkowej), a jutro: licznik vs ogłoszenie vs Historia pojazdu.

## Szybki filtr (10 minut)

Najpierw odsiej, potem sprawdzaj. 19 punktów z polem `quick: true`: 12 dealbreakerów i 7 szybkie testy bez narzędzi (każdy do ok. minuty). Kolejność jak w etapach; punkty z etapu 1 robisz przed wyjazdem, resztę w pierwszych 10 minutach przy aucie. W treści punktów oznaczone inline jako `[szybki filtr]`.

1. `p1s1i2` VIN od sprzedawcy: z ogłoszenia, SMS-em albo ze zdjęcia dowodu _[ODPUŚĆ]_ — przed wyjazdem
2. `p1s2i2` Historia pojazdu: odczyty licznika z badań — spójne? _[ODPUŚĆ]_ — przed wyjazdem
3. `p1s4i1` Silnik ma być zimny — powiedz to wprost — przed wyjazdem
4. `p1s4i3` Jazda próbna: ustal, kto prowadzi i na jakich zasadach — przed wyjazdem
5. `p2s1i1` Oryginał dowodu rejestracyjnego w ręku (nie zdjęcie, nie ksero) _[ODPUŚĆ]_
6. `p2s2i1` VIN na podszybiu (przez przednią szybę) = pole E _[ODPUŚĆ]_
7. `p2s2i2` Tabliczka znamionowa (słupek/drzwi kierowcy lub komora silnika) = pole E _[ODPUŚĆ]_
8. `p2s2i3` VIN wybity w nadwoziu (podłoga pod fotelem / gródź / bagażnik) _[ODPUŚĆ]_
9. `p2s3i1` Dowód osobisty sprzedawcy = nazwisko w dowodzie rejestracyjnym _[ODPUŚĆ]_
10. `p2s3i2` Sprzedaje ktoś inny niż właściciel: pisemne pełnomocnictwo _[ODPUŚĆ]_
11. `p3s3i1` Różnice odcienia lakieru — z 3–4 m i pod kątem
12. `p3s7i4` Ślady spawania, pofalowane podłużnice, łaty — konstrukcja (z góry i od boku, bez wchodzenia pod auto) _[ODPUŚĆ]_
13. `p4s1i1` Licznik: wpisz przebieg — porównam z ogłoszeniem i Historią pojazdu _[ODPUŚĆ]_
14. `p4s2i2` Pod dywanikami: wilgoć, muł, linia wodna, rdza na szynach foteli i śrubach _[ODPUŚĆ]_
15. `p4s3i1` Zapłon bez odpalania: autotest kontrolek — czy alarmowe się pokazały i zgasły
16. `p4s3i2` Kontrolka AIRBAG: MUSI się zapalić i zgasnąć _[ODPUŚĆ]_
17. `p5s1i1` Czy silnik naprawdę jest zimny: wskaźnik temperatury, wentylator, odczyt OBD
18. `p5s1i5` Korek wlewu oleju od spodu: majonez/emulsja lub gruby nagar
19. `p5s2i3` Dym z wydechu przy starcie i przy przegazowaniu — jaki kolor?

## 1. Zanim pojedziesz (15 min)

*Dane z ogłoszenia, historia po VIN, rozmowa ze sprzedawcą zdanie po zdaniu, ustalenia, co zabrać*  
**Kiedy:** Wieczór przed oględzinami, w domu

Połowę wtop da się wykluczyć, zanim w ogóle wsiądziesz do auta. Wpisujesz dane z ogłoszenia, sprawdzasz historię w rejestrach, dzwonisz do sprzedawcy z gotowym scenariuszem i ustalasz warunki spotkania. Wszystko, co tu zapiszesz, jutro porównam z dokumentami i licznikiem.

### Ogłoszenie

#### `p1s1i1` Zdjęcia: auto mokre, o zmroku, w garażu, tylko z jednej strony  
_[ŻÓŁTA]_

- **Jak:** Mokry lakier i słabe światło ukrywają rysy, wgniecenia i różnice odcienia. Jeśli brakuje ujęcia jednej strony albo jednego rogu, to właśnie ta strona jest ciekawa — poproś SMS-em o brakujące zdjęcia.
- **Dlaczego:** Sprzedawca wybiera zdjęcia; to, czego nie pokazał, mówi więcej niż to, co pokazał.
- **Odpowiedzi:** „Dobre, całe auto” → ok / „Brakuje ujęć (strona, róg)” → uwaga / „Mokre / ciemne / garaż” → uwaga
- **Na listę uwag:** „Ogłoszenie: zdjęcia utrudniające ocenę lakieru (mokre/ciemne/jedna strona)”
- Tagi: ogloszenie, lakier

#### `p1s1i2` VIN od sprzedawcy: z ogłoszenia, SMS-em albo ze zdjęcia dowodu  
_[CZERWONA · ODPUŚĆ]_ [szybki filtr]

- **Jak:** VIN (albo numer nadwozia w starszych autach) wpisujesz w „Danych z ogłoszenia” wyżej — ten punkt odhacza się sam, gdy tam jest. Nie ma go w ogłoszeniu? Zaznacz „nie ma” i poproś w rozmowie: wystarczy sam numer, bez zdjęcia dowodu. Część sprzedawców nie chce podawać VIN-u przed spotkaniem — to niewygoda (nie sprawdzisz historii przed wyjazdem), nie wada auta. Granica jest inna: jeśli VIN nie da się sprawdzić nawet na miejscu, przed umową i zapłatą — nie kupujesz.
- **Dlaczego:** VIN otwiera bezpłatną Historię pojazdu: odczyty licznika z badań, właścicieli, status, kradzież. Bez sprawdzenia numeru kupujesz w ciemno.
- **Odpowiedzi:** „Mam VIN” → ok / „Poda dopiero na miejscu” → uwaga / „Nie da sprawdzić nawet na miejscu” → problem; dodatkowo reguła `vin_present`; bez „Pomiń”
- **Na listę uwag:** „Sprzedawca uniemożliwia sprawdzenie VIN przed zakupem”
- Tagi: ogloszenie, vin

#### `p1s1i3` Opis to same zapewnienia: „bezwypadkowy”, „garażowany”, „ASO”  
_[INFO]_

- **Jak:** Szukaj w opisie konkretów: kiedy wymieniony rozrząd, jakie faktury, ilu właścicieli, które elementy lakierowane. Opis złożony z przymiotników bez faktów oznacza, że musisz zadać więcej pytań przez telefon.
- **Dlaczego:** Dokumenty zwiększają możliwość weryfikacji, ale też mogą być niepełne; słowa w ogłoszeniu nie da się zweryfikować w ogóle.
- **Odpowiedzi:** „Są konkrety (daty, faktury, co robione)” → ok / „Same zapewnienia i przymiotniki” → uwaga
- **Na listę uwag:** „Opis pełen zapewnień bez konkretów (bezwypadkowy/garażowany bez dowodów)”
- Tagi: ogloszenie

#### `p1s1i4` Cena kontra podobne ogłoszenia  
_[ŻÓŁTA]_

- **Jak:** Otwórz 5–10 ogłoszeń tego samego rocznika, silnika i zbliżonego przebiegu i wpisz typową cenę — resztę policzę. Wyraźnie tańsze auto ma powód: szkoda, import po szkodzie, zastaw, pilna gotówka albo faktyczna okazja. Twoje zadanie na jutro: znaleźć ten powód.
- **Dlaczego:** Okazje istnieją, ale częściej niska cena to cena za problem, którego jeszcze nie widzisz.
- **Pole (number):** Typowa cena podobnych ogłoszeń [zł] — Środek widełek z 5–10 podobnych ofert. Porównam z ceną z ogłoszenia (wyżej).
- **Odpowiedzi:** „Cena w rynku” → ok / „Wyraźnie taniej niż podobne” → uwaga; dodatkowo reguła `price_vs_market`
- **Na listę uwag:** „Cena wyraźnie poniżej rynku — powód nieustalony”
- Tagi: ogloszenie, cena

#### `p1s1i5` „Sprzedaję w imieniu znajomego” / handlarz udający prywatnego  
_[ŻÓŁTA]_

- **Jak:** Zadzwoń i powiedz „dzwonię w sprawie auta” — „którego?” to sygnał (ktoś może sprzedawać kilka rodzinnych aut, ale najczęściej to handel). Wpisz numer telefonu w wyszukiwarkę ogłoszeń: kilka aut pod jednym numerem mówi wszystko. Handlarz to nie zbrodnia, ale „prywatny” w ogłoszeniu i firma (lub obca osoba) na umowie to inna sytuacja prawna: komis jako pośrednik podsuwa umowę z nieznanym Ci właścicielem i w ten sposób unika odpowiedzialności przedsiębiorcy za wady.
- **Dlaczego:** Kto ukrywa, kim jest, ukryje też, co wie o aucie.
- **Odpowiedzi:** „Właściciel sprzedaje sam” → ok / „„Dla znajomego / rodziny”” → uwaga / „Kilka aut pod tym numerem” → uwaga
- **Na listę uwag:** „Sprzedający ukrywa, że jest handlarzem („w imieniu znajomego”)”
- Tagi: ogloszenie, sprzedawca

#### `p1s1i6` Przebieg kontra wiek auta — liczę za Ciebie  
_[INFO]_

- **Jak:** Z przebiegu i rocznika z „Danych z ogłoszenia” wyliczam kilometry na rok. Bardzo mało kilometrów rocznie przy aucie, które na zdjęciach ma wytartą kierownicę i fotel, to sygnał do sprawdzenia licznika; bardzo dużo — pytanie o flotę, taxi albo przedstawiciela handlowego. Ten sam przebieg jutro porównam z licznikiem i z Historią pojazdu.
- **Dlaczego:** Cofnięty licznik wychodzi na jaw dopiero, gdy zestawisz kilka źródeł — zacznij od ogłoszenia.
- **Odpowiedź:** ocenia system (reguła `km_per_year`); przycisk pominięcia: „Nie mam danych”
- **Na listę uwag:** „Przebieg z ogłoszenia budzi wątpliwości względem wieku i zużycia auta”
- Tagi: ogloszenie, przebieg

#### `p1s1i7` Zdjęcia aktualne? Pora roku, tablice, otoczenie  
_[INFO]_

- **Jak:** Śnieg na zdjęciach w lipcu oznacza, że zdjęcia są stare — auto stoi od miesięcy albo ogłoszenie jest „przeklejone” z poprzedniej sprzedaży; ustal, kiedy zrobiono zdjęcia. Zasłonięte tablice to norma, ale poproś o numer rejestracyjny — bez niego nie odpalisz Historii pojazdu.
- **Dlaczego:** Auto, które długo stoi lub krąży między sprzedawcami, zwykle ma powód.
- **Odpowiedzi:** „Aktualne” → ok / „Stare / inna pora roku / „przeklejone”” → uwaga
- **Na listę uwag:** „Ogłoszenie ze starymi lub „przeklejonymi” zdjęciami”
- Tagi: ogloszenie

### Historia pojazdu (bezpłatnie i płatnie)

#### `p1s2i1` Raport z historiapojazdu.gov.pl: pobrany i zapisany  
_[CZERWONA]_

- **Jak:** Kliknij przycisk wyżej, wpisz trzy dane (VIN, numer rejestracyjny, data pierwszej rejestracji — są w „Danych z ogłoszenia”) i zapisz raport jako PDF. Nie masz kompletu danych? Zdobądź je w rozmowie (krok 3) i wróć tu — to 5 minut, a kolejne punkty tego kroku bez raportu nie mają sensu.
- **Dlaczego:** To bezpłatne źródło danych z ewidencji pojazdów (CEPiK): odczyty licznika, właściciele, status, OC, badania. Wydruk ma charakter informacyjny, nie jest dokumentem urzędowym — ale do decyzji wystarczy.
- **Odpowiedzi:** „Mam raport (PDF)” → ok / „Brak danych do sprawdzenia” → uwaga; pominięcie: „Auto niezarejestrowane w PL”
- **Na listę uwag:** „Brak raportu z Historii pojazdu przed oględzinami”
- Tagi: vin, historia

#### `p1s2i2` Historia pojazdu: odczyty licznika z badań — spójne?  
_[CZERWONA · ODPUŚĆ]_ [szybki filtr]

- **Jak:** W raporcie zobaczysz stany licznika spisane przy badaniach technicznych (zbierane od 2014 r.) i z kontroli drogowych (od 2020 r.). Ułóż je chronologicznie: każdy kolejny powinien być większy. Spadek albo „skok w dół” (np. 190 tys. → 130 tys.) to niespójność: najczęściej ingerencja w drogomierz, czasem udokumentowana wymiana drogomierza (w ewidencji jest data i powód wymiany, odczyt po wymianie) albo błąd wpisu. Nie kupuj bez wyjaśnienia i dokumentu. Zapisz ostatni odczyt — jutro porównasz z licznikiem.
- **Dlaczego:** Ingerencja w drogomierz to przestępstwo (art. 306a kk). Sama rozbieżność jeszcze nim nie jest — ale bez dokumentu wymiany traktuj ją jak wadę, której nie da się „zbić z ceny”.
- **Pole (number):** Ostatni odczyt licznika w Historii pojazdu [km] — Najnowszy stan z raportu gov.pl. Porównam go z przebiegiem z ogłoszenia, a jutro — z licznikiem.
- **Odpowiedzi:** „Rosną z badania na badanie” → ok / „Spadek, ale jest dokument wymiany drogomierza” → uwaga / „Spadek / skok w dół bez wyjaśnienia” → problem; dodatkowo reguła `odo_registry`; pominięcie: „Brak odczytów”
- **Na listę uwag:** „Odczyty licznika w Historii pojazdu niespójne (spadek bez udokumentowanej wymiany drogomierza)”
- Tagi: historia, przebieg, licznik

#### `p1s2i3` Historia pojazdu: właściciele, status, kradzież, OC, badanie  
_[ŻÓŁTA]_

- **Jak:** Sprawdź: liczbę właścicieli i czy to osoby prywatne czy firmy (porównaj z tym, co mówi sprzedawca), status „zarejestrowany”, brak wpisu o kradzieży, ważne OC i ważne badanie techniczne, ciągłość badań (kilkuletnia przerwa = auto stało, było w naprawie lub nie przeszło badania — zapytaj), ewentualną informację o szkodzie istotnej. Zapisz raport jako PDF. Znaczenie: wpis o kradzieży = koniec; zatrzymany dowód = do wyjaśnienia przed spotkaniem; brak ważnego OC lub badania = auto nie powinno wyjechać na jazdę próbną.
- **Dlaczego:** Rozbieżność między raportem a opowieścią sprzedawcy to najtańszy test jego wiarygodności.
- **Odpowiedzi:** „Zgadza się z tym, co mówi sprzedawca” → ok / „Rozbieżności / przerwa w badaniach” → uwaga / „Kradzież, zatrzymany dowód, brak OC lub badania” → problem
- **Na listę uwag:** „Historia pojazdu niezgodna z opowieścią sprzedawcy (właściciele/badania/OC/szkoda)”
- Tagi: historia

#### `p1s2i4` Auto sprowadzone? Data pierwszej rejestracji w PL vs rocznik  
_[INFO]_

- **Jak:** Jeśli kilkunastoletnie auto zostało zarejestrowane w Polsce niedawno, to import. Historia pojazdu pokazuje przede wszystkim okres w Polsce; część danych z zagranicznych rejestrów bywa dostępna (zależy od kraju). Przebiegi i szkody sprzed sprowadzenia poznasz zwykle tylko z płatnego raportu lub z zagranicznych dokumentów. Zapytaj o dokumenty z kraju pochodzenia.
- **Dlaczego:** Import sam w sobie nie jest wadą, ale luka w historii to miejsce, w którym najczęściej znika prawdziwy przebieg.
- **Odpowiedzi:** „Krajowe” → ok / „Import, są dokumenty” → ok / „Import bez historii sprzed PL” → uwaga
- **Na listę uwag:** „Import: brak udokumentowanej historii sprzed rejestracji w Polsce”
- Tagi: historia, import

#### `p1s2i5` Płatny raport VIN — kiedy ma sens  
_[INFO]_

- **Jak:** Bezpłatny raport nie pokaże szkód zagranicznych, zdjęć z aukcji ani przebiegów z serwisów. Płatny raport (kilka firm, porównywalny zakres) warto kupić, gdy auto jest importowane, ma mało papierów albo jest drogie jak na Twój budżet. Czytaj: zdjęcia uszkodzeń, przebiegi z datami, wpisy „szkoda całkowita”, kraj pochodzenia, liczbę ogłoszeń sprzedaży.
- **Dlaczego:** Raport nie zastąpi oględzin, ale potrafi zaoszczędzić Ci całą wycieczkę.
- **Odpowiedzi:** „Kupiłem: czysto” → ok / „Kupiłem: szkody / niezgodne przebiegi” → problem; pominięcie: „Nie kupuję”
- **Na listę uwag:** „Płatny raport VIN: szkody lub niezgodne przebiegi”
- Tagi: historia, vin

#### `p1s2i6` Zastaw / leasing / przewłaszczenie — wyklucz przed przelewem  
_[CZERWONA]_

- **Jak:** W dowodzie rejestracyjnym szukaj adnotacji „ZASTAW” i sprawdź pole właściciela (C.2): bank lub firma leasingowa jako właściciel oznacza, że sprzedawca potrzebuje dokumentu wykupu lub zgody. Rejestr Zastawów Skarbowych sprawdzisz online na podatki.gov.pl; zastaw rejestrowy — poproś sprzedawcę o aktualne zaświadczenie z sądowego rejestru zastawów (wniosek DW-2) albo złóż je sam. Uwaga: zwykły kredyt gotówkowy sprzedawcy nie obciąża auta — problemem jest zastaw rejestrowy, przewłaszczenie na zabezpieczenie i leasing.
- **Dlaczego:** Auto obciążone zastawem może zostać zabrane nowemu właścicielowi, choć zapłacił co do grosza.
- **Odpowiedzi:** „Wykluczone (dowód + rejestry)” → ok / „Jeszcze nie sprawdziłem” → uwaga / „Zastaw / leasing / przewłaszczenie bez dokumentów zwolnienia” → problem
- **Na listę uwag:** „Nie wykluczono zastawu, leasingu ani przewłaszczenia na aucie”
- Tagi: historia, dokumenty, zastaw

### Telefon do sprzedawcy

#### `p1s3i1` Zadzwoń (nie pisz) i przejdź skrypt pytań  
_[INFO]_

- **Jak:** Przez telefon słychać wahanie i zmyślanie na bieżąco. Scenariusz masz w tym kroku: najpierw dane, których brakło w ogłoszeniu, potem 12 pytań z podpowiedzią, na co uważać, na końcu ustalenia. Ten punkt odhacza się sam, gdy odpowiesz na wszystkie pytania.
- **Dlaczego:** Sprzedawca, który dziś powie „nic nie lakierowane”, jutro będzie musiał wytłumaczyć 400 µm na drzwiach.
- **Odpowiedzi:** „Rozmowa odbyta” → ok; pominięcie: „Tylko pisałem”
- **Na listę uwag:** „Odpowiedzi z rozmowy telefonicznej nie zgadzają się ze stanem na miejscu”
- Tagi: telefon, sprzedawca

#### `p1s3i2` Ogólniki, zmiana tematu, presja czasu  
_[ŻÓŁTA]_

- **Jak:** „Wszystko ok”, „przyjedź, zobaczysz”, „jest dużo chętnych, dziś decyzja” — to techniki nacisku, nie informacje. Zapisz je jako uwagę. Kupujesz auto, nie ostatni bilet na koncert.
- **Dlaczego:** Pośpiech to narzędzie sprzedawcy; Twoim narzędziem jest czas.
- **Odpowiedzi:** „Konkretnie, spokojnie” → ok / „Ogólniki („wszystko ok”)” → uwaga / „Presja („dziś decyzja, dużo chętnych”)” → uwaga
- **Na listę uwag:** „Sprzedawca unika konkretów lub wywiera presję czasu”
- Tagi: telefon, sprzedawca

#### `p1s3i3` Zapytaj wprost: które elementy były lakierowane i dlaczego?  
_[INFO]_

- **Jak:** Uczciwy sprzedawca poda konkret („zderzak po parkingowym”, „maska po kamieniach”). Odpowiedź „nic, bezwypadkowy” przy kilkuletnim aucie zapamiętaj dosłownie — jutro sprawdzisz ją grubościomierzem i wrócisz do niej przy negocjacji.
- **Dlaczego:** Nie chodzi o to, czy coś było lakierowane, tylko czy sprzedawca mówi prawdę.
- **Odpowiedzi:** „Podał konkrety i powód” → ok / „„Nic nie lakierowane” — zapisane, sprawdzisz miernikiem” → ok / „Unika odpowiedzi” → uwaga
- **Na listę uwag:** „Deklaracja „nic nie lakierowane” do konfrontacji z pomiarem lakieru”
- Tagi: telefon, lakier

### Ustalenia przed spotkaniem

#### `p1s4i1` Silnik ma być zimny — powiedz to wprost  
_[CZERWONA]_ [szybki filtr]

- **Jak:** „Proszę nie odpalać auta przed moim przyjazdem, chcę zobaczyć zimny start”. Ustal godzinę i przyjedź punktualnie. Wykręty („muszę podjechać po córkę”, „stoi w innym miejscu”) zapisz. Odmowa nie dowodzi wady, ale test zimnego startu przepada: przełóż spotkanie na rano albo jedź z założeniem, że rozruch i pierwsze sekundy pracy ocenisz tylko na ciepłym silniku.
- **Dlaczego:** Na ciepłym silniku znika połowa objawów: stuki, dym, nierówna praca, ciężki rozruch.
- **Odpowiedzi:** „Zgodził się” → ok / „Kręci („muszę podjechać…”)” → uwaga / „Odmówił — zimnego startu nie będzie” → uwaga
- **Na listę uwag:** „Zimny start nieweryfikowalny — sprzedawca nie zgodził się na zimny silnik”
- Tagi: ustalenia, silnik

#### `p1s4i2` Dokumenty na stole: wymień listę przez telefon  
_[ŻÓŁTA]_

- **Jak:** Dowód rejestracyjny, dokument tożsamości właściciela, polisa OC, książka serwisowa i faktury, wszystkie kluczyki; poprzednia umowa lub faktura zakupu wtedy, gdy sprzedający nie widnieje jeszcze w dowodzie jako właściciel. Jeśli słyszysz „dowód jest u żony”, „książkę zgubiłem, ale w serwisie wiedzą” — przełóż spotkanie do czasu skompletowania.
- **Dlaczego:** Bez dokumentów nie ma czego oglądać; kompletuje się je przed sprzedażą, nie po wpłacie zaliczki.
- **Odpowiedzi:** „Będzie komplet” → ok / „Czegoś zabraknie („u żony”)” → uwaga / „Nie ma dowodu rejestracyjnego — przełóż spotkanie” → uwaga
- **Na listę uwag:** „Sprzedawca nie zapewnił kompletu dokumentów na spotkanie”
- Tagi: ustalenia, dokumenty

#### `p1s4i3` Jazda próbna: ustal, kto prowadzi i na jakich zasadach  
_[CZERWONA]_ [szybki filtr]

- **Jak:** W Polsce mniej więcej co piąty sprzedający nie zgadza się na jazdę próbną, a wielu chce prowadzić sam — zwykle ze strachu o stłuczkę: szkody innych pokrywa OC auta, ale koszt uszkodzenia samego testowanego auta bez AC może spaść na kierującego (zależnie od okoliczności i winy). Nie pytaj „czy mogę się przejechać” — zaproponuj zasady: pokażesz prawo jazdy, jedziecie razem, trasa 20–30 minut ustalona z góry, sprzedawca może przejechać pierwszy odcinek. Jeśli chce prowadzić całość — przyjmij to, ale umów sprawdzenie na SKP lub u mechanika: z fotela pasażera ocenisz hałasy, dym i pracę skrzyni, nie ocenisz sprzęgła ani luzu na kierownicy. Brak jakiejkolwiek jazdy (np. auto bez tablic) i brak zgody na niezależne sprawdzenie = kupujesz auto niesprawdzone w ruchu; dla większości kupujących to koniec.
- **Dlaczego:** Skrzyni, zawieszenia i hamulców nie ocenisz na parkingu, a z fotela pasażera nie poczujesz sprzęgła ani luzu na kierownicy.
- **Odpowiedzi:** „Ja prowadzę (choć część trasy)” → ok / „Prowadzi sprzedawca, zgoda na SKP / mechanika” → ok / „Żadnej jazdy, ale zgoda na SKP” → uwaga / „Żadnej jazdy i żadnego sprawdzenia” → problem
- **Na listę uwag:** „Auto niesprawdzone w ruchu: brak jazdy próbnej i brak niezależnego sprawdzenia”
- Tagi: ustalenia, jazda

#### `p1s4i4` Miejsce i pora: dzień, sucho, płasko, da się obejść auto dookoła  
_[INFO]_

- **Jak:** Oglądaj za dnia, w miejscu, gdzie kucniesz przy progu, otworzysz wszystkie drzwi i obejdziesz auto dookoła. Nie w deszczu, nie o zmroku, nie w ciasnym garażu, nie „pod marketem, bo tak mi po drodze”. Weź kogoś ze sobą: druga para oczu i bezpieczeństwo, gdy w grę wchodzą pieniądze.
- **Dlaczego:** W złych warunkach przegapisz to, co widać gołym okiem w słońcu.
- **Odpowiedzi:** „Dzień, sucho, jest miejsce” → ok / „Zmrok / deszcz / ciasno” → uwaga
- **Na listę uwag:** „Oględziny w złych warunkach (deszcz/zmrok/ciasno) — ocena niepełna”
- Tagi: ustalenia

#### `p1s4i5` Zapowiedz: „jeśli się spodoba, jedziemy na SKP/do mechanika”  
_[ŻÓŁTA]_

- **Jak:** Powiedz to dziś: „Sprawdzenie za moje pieniądze, potrwa godzinę — ok?”. Sprzedawca bez tajemnic się zgadza. Wykręty („nie mam czasu”, „już było sprawdzane”, „to obraźliwe”) potraktuj jak odpowiedź.
- **Dlaczego:** Auto, którego nie wolno pokazać mechanikowi, ma powód, żeby go nie pokazywać.
- **Odpowiedzi:** „Zgodził się” → ok / „Wykręty („nie mam czasu”)” → uwaga / „Odmówił” → problem
- **Na listę uwag:** „Sprzedawca niechętny sprawdzeniu przez mechanika lub na SKP”
- Tagi: ustalenia, mechanik

### Co zabrać

#### `p1s5i1` Telefon z latarką, naładowany + powerbank  
_[INFO]_

- **Jak:** Latarka: podwozie, nadkola, komora silnika, pod dywanikami. Aparat: dokumenty, VIN, każda usterka. Ta aplikacja: odhaczasz i robisz zdjęcia w trakcie. Zabierz powerbank — latarka i zdjęcia zjadają baterię szybciej, niż myślisz.
- **Dlaczego:** Bez światła nie zobaczysz świeżej konserwacji podwozia ani wycieków pod silnikiem.
- **Odpowiedzi:** „Mam” → ok / „Nie biorę” → pomin; bez „Pomiń”
- **Na listę uwag:** „Brak światła/aparatu — część oględzin (podwozie, komora) pominięta”
- Tagi: ekwipunek

#### `p1s5i2` Grubościomierz lakieru — obsługa w 60 sekund  
_[INFO]_

- **Jak:** Skalibruj wg instrukcji (na dołączonej płytce/folii). Przykładaj sondę prostopadle i pewnie, 3–5 punktów na element (środek, rogi, przy krawędziach), notuj najwyższy odczyt. Tani miernik mierzy tylko stal (Fe): na aluminium pokaże błąd lub zero, na plastikowych zderzakach nie zmierzysz nic. Bez miernika: porównuj odcień pod kątem, strukturę „skórki pomarańczy”, szukaj pyłu lakierniczego na uszczelkach i śladów klucza na śrubach.
- **Dlaczego:** Grubościomierz to jedyne narzędzie, które w 10 minut obala „bezwypadkowy”.
- **Odpowiedzi:** „Mam, skalibrowany” → ok / „Nie mam — oceniam wzrokiem” → pomin; bez „Pomiń”
- **Na listę uwag:** „Brak pomiaru grubości lakieru — ocena powłoki tylko wzrokowa”
- Tagi: ekwipunek, lakier

#### `p1s5i3` Rękawiczki, ręcznik papierowy, biała chusteczka, magnes  
_[INFO]_

- **Jak:** Ręcznik papierowy: bagnet oleju, korek wlewu, wycieki. Biała chusteczka: przetrzyj wnętrze końcówki wydechu na zimnym, wyłączonym silniku. Rękawiczki, bo dotkniesz podwozia i komory silnika. Magnes owinięty w miękką szmatkę to tylko orientacyjny test na grubą szpachlę (nie działa na aluminium i plastiku, może porysować lakier) — lepszy jest tani miernik.
- **Dlaczego:** Za kilka złotych masz testy, których większość kupujących nie robi.
- **Odpowiedzi:** „Mam” → ok / „Nie biorę” → pomin; bez „Pomiń”
- **Na listę uwag:** „Brak podstawowych akcesoriów — część testów pominięta”
- Tagi: ekwipunek

#### `p1s5i4` Czytnik OBD2 z aplikacją w telefonie (opcjonalnie)  
_[INFO]_

- **Jak:** Tani czytnik Bluetooth + darmowa aplikacja odczyta błędy, ale najważniejsze są „monitory gotowości” (readiness): jeśli większość ma status „niegotowy/not ready”, ktoś niedawno kasował błędy — np. tuż przed Twoim przyjazdem. Sprawdź też, czy aplikacja pokazuje przebieg zapisany w sterowniku. Bez czytnika: obserwuj kontrolki (faza „Wnętrze”) i pytaj o ostatnią wizytę w serwisie.
- **Dlaczego:** „Brak błędów” nic nie znaczy, jeśli błędy skasowano 20 km temu.
- **Odpowiedzi:** „Mam czytnik” → ok / „Nie mam” → pomin; bez „Pomiń”
- **Na listę uwag:** „Brak diagnostyki OBD2 — pamięć błędów niesprawdzona”
- Tagi: ekwipunek, obd

#### `p1s5i5` Pieniądze: bądź gotowy kupić od ręki — bez pliku gotówki w kieszeni  
_[INFO]_

- **Jak:** Okazje się zdarzają i warto móc domknąć zakup tego samego dnia. Zamiast pliku gotówki: podnieś wcześniej limity przelewu natychmiastowego i BLIK w aplikacji banku, miej wzór umowy (wersja z zaliczką i finalna) i sprawdź, gdzie w okolicy jest oddział banku lub bankomat. Jeśli sprzedawca chce gotówkę: wypłata razem w banku przy podpisaniu. Pełna gotówka przy sobie na pierwszych oględzinach to ryzyko (kradzież, presja „skoro ma Pan przy sobie…”) — a do kupna od ręki nie jest potrzebna.
- **Dlaczego:** Gotowość do zakupu daje Ci przewagę w negocjacji; torba gotówki daje ją komuś innemu.
- **Odpowiedzi:** „Limity i wzór umowy gotowe” → ok / „Jeszcze nie” → uwaga
- **Na listę uwag:** „Forma płatności i umowa nieprzygotowane przed spotkaniem”
- Tagi: ekwipunek, transakcja

### Plan B: mechanik lub stacja diagnostyczna

#### `p1s6i1` Stacja kontroli pojazdów (SKP) — co da, czego nie da  
_[INFO]_

- **Jak:** Diagnosta sprawdzi hamulce na rolkach, zawieszenie, luzy, światła i podwozie na podnośniku — szybko i tanio. Zapytaj wcześniej, czy stacja robi oględziny przedzakupowe i czy mierzy lakier (nie każda). Nie oceni jednak silnika ani skrzyni „na przyszłość” i nie zajrzy w historię. Umów się i powiedz, że to sprawdzenie przed zakupem, nie badanie okresowe.
- **Dlaczego:** Godzina na SKP wyłapuje to, czego nie zobaczysz bez podnośnika.
- **Odpowiedzi:** „Mam namiar / umówione” → ok / „Jeszcze nie” → uwaga
- **Na listę uwag:** „Auto nie było sprawdzone na SKP/u mechanika przed decyzją”
- Tagi: planb, mechanik

#### `p1s6i2` Mechanik — kiedy obowiązkowo, nie opcjonalnie  
_[INFO]_

- **Jak:** Gdy auto jest drogie jak na Twój budżet, ma silnik lub skrzynię, których nie znasz, jest importowane bez historii, albo w etapach „Pod maską” i „Jazda próbna” pojawi się choć jeden problem (nie chodzi o liczbę odhaczonych uwag, tylko o ich wagę). Najlepiej mechanik, u którego potem będziesz serwisować — ma interes, żeby nie kupić Ci problemu. Gdy auto jest daleko: mobilny rzeczoznawca.
- **Dlaczego:** Koszt sprawdzenia jest stały; koszt pominięcia — nie.
- **Odpowiedzi:** „Mam mechanika lub rzeczoznawcę” → ok / „Nie mam” → uwaga
- **Na listę uwag:** „Zalecane sprawdzenie u mechanika nie zostało wykonane”
- Tagi: planb, mechanik

## 2. Dokumenty i tożsamość (5 min)

*Dowód rejestracyjny, VIN w 3 miejscach, kto naprawdę sprzedaje, papiery historii*  
**Kiedy:** Pierwsze 5 minut na miejscu — zanim otworzysz maskę

Zaczynasz od papierów, nie od lakieru. Jeśli tu coś się nie zgadza, reszta oględzin nie ma sensu — i oszczędzasz godzinę. Weź dokumenty do ręki, rób zdjęcia (adresy możesz pominąć) i porównuj z tym, co zapisałeś wczoraj.

### Dowód rejestracyjny

#### `p2s1i1` Oryginał dowodu rejestracyjnego w ręku (nie zdjęcie, nie ksero)  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Weź dokument do ręki. Sprawdź, czy nie jest zniszczony lub „poprawiany”. Pamiętaj: zatrzymanie dowodu odbywa się dziś elektronicznie, więc kartka może być u sprzedawcy, a dokument i tak zatrzymany — dlatego wczoraj sprawdzałeś status w Historii pojazdu. Bez oryginału nie podpisujesz dziś niczego — możesz wrócić, gdy będzie.
- **Dlaczego:** Dowód rejestracyjny nie jest tytułem własności (tym są umowy i faktury), ale bez niego nie zarejestrujesz auta, a jego brak na spotkaniu to najczęściej bałagan albo kłopot, o którym nikt nie wspomniał.
- **Odpowiedzi:** „Oryginał w ręku” → ok / „Tylko zdjęcie / ksero / „w urzędzie” — dziś nie podpisuj” → uwaga / „Dowód zatrzymany / auto wyrejestrowane” → problem; bez „Pomiń”
- **Na listę uwag:** „Dowód rejestracyjny zatrzymany lub auto wyrejestrowane”
- Tagi: dokumenty

#### `p2s1i2` Pole E: przepisz VIN z dowodu — porównam go z tym od sprzedawcy  
_[INFO · zdjęcie]_

- **Jak:** Zrób zdjęcie strony z polem E i przepisz 17 znaków. Porównam je z VIN-em, który dostałeś przed spotkaniem; ten sam ciąg za chwilę sprawdzisz w trzech miejscach na aucie (następna sekcja). Porównuj znak po znaku, nie „na oko” — podmieniona jedna cyfra to typowa metoda.
- **Dlaczego:** VIN to tożsamość auta; wszystko inne (kolor, tablice, opowieści) można zmienić.
- **Pole (vin):** VIN z dowodu rejestracyjnego (pole E) — 17 znaków, bez liter I, O, Q.
- **Odpowiedź:** ocenia system (reguła `vin_doc`); przycisk pominięcia: „Nie odczytam”
- **Na listę uwag:** „VIN z dowodu rejestracyjnego niespisany/nieporównany”
- Tagi: dokumenty, vin

#### `p2s1i3` Właściciel (C.2) i posiadacz (C.1): czy to osoba przed Tobą?  
_[CZERWONA · zdjęcie]_

- **Jak:** Przeczytaj nazwisko właściciela. Jeśli w polu właściciela figuruje bank lub firma leasingowa, sprzedawca jest tylko użytkownikiem — do sprzedaży potrzebuje dokumentu wykupu albo zgody właściciela. Jeśli nazwisko inne niż sprzedawcy — przechodzisz do sekcji „Kto sprzedaje”.
- **Dlaczego:** Kupno od osoby, która nie jest właścicielem, to najprostsza droga do utraty auta i pieniędzy.
- **Odpowiedzi:** „Ta sama osoba” → ok / „Inna osoba (→ „Kto sprzedaje”)” → uwaga / „Bank / leasing / firma w polu C.2” → problem
- **Na listę uwag:** „Właściciel w dowodzie rejestracyjnym inny niż sprzedający (bank/leasing/obca osoba)”
- Tagi: dokumenty, wlasciciel

#### `p2s1i4` Adnotacje urzędowe: ZASTAW, współwłaściciel, GAZ, HAK, L, TAXI  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Znajdź rubrykę „Adnotacje urzędowe”. „ZASTAW” — nie kupujesz bez zaświadczenia wierzyciela o wykreśleniu. Współwłaściciel — musi podpisać umowę (lub dać pełnomocnictwo); sama współwłasność jest normalna. „L” lub „TAXI” — auto z nauki jazdy lub taksówka, czyli bardzo intensywnie eksploatowane. Instalacja gazowa bez wpisu „GAZ” — status do wyjaśnienia: do badania technicznego i rejestracji wpis jest potrzebny.
- **Dlaczego:** Adnotacje to jedyne miejsce, gdzie urząd mówi Ci o obciążeniach i przeszłości auta.
- **Odpowiedzi:** „Brak adnotacji” → ok / „Współwłaściciel — podpisze lub jest pełnomocnictwo” → ok / „GAZ / HAK / L / TAXI” → uwaga / „ZASTAW lub współwłaściciel bez zgody” → problem
- **Na listę uwag:** „Adnotacja w dowodzie wymaga wyjaśnienia (ZASTAW / współwłaściciel bez zgody / L / TAXI / GAZ)”
- Tagi: dokumenty, zastaw

#### `p2s1i5` Badanie techniczne: ważne? Kiedy zrobione?  
_[ŻÓŁTA]_

- **Jak:** Sprawdź ostatnią pieczątkę diagnosty (lub zaświadczenie, jeśli w dowodzie zabrakło miejsca) i datę następnego badania; porównaj z Historią pojazdu. Auto bez ważnego badania nie powinno wyjeżdżać na jazdę próbną. Badanie zrobione tydzień przed sprzedażą to nie gwarancja jakości — diagnosta sprawdza minimum dopuszczające do ruchu.
- **Dlaczego:** Brak badania to koszt i ryzyko od pierwszego dnia — i sygnał, że auto mogło stać albo nie przeszło.
- **Pole (date):** Termin następnego badania (z pieczątki) — Data z ostatniej pieczątki diagnosty albo z zaświadczenia. Ocenię: ważne, kończy się, nieważne.
- **Odpowiedź:** ocenia system (reguła `inspection_valid`); przycisk pominięcia: „Brak wpisu / nie odczytam”
- **Na listę uwag:** „Brak ważnego badania technicznego lub długa przerwa w badaniach”
- Tagi: dokumenty, badanie

#### `p2s1i6` Rok produkcji i data pierwszej rejestracji vs ogłoszenie  
_[ŻÓŁTA]_

- **Jak:** Porównaj rok produkcji z dowodu z rocznikiem w ogłoszeniu i z datą pierwszej rejestracji. „Rocznik 2016” wyprodukowany w 2014 i zarejestrowany po raz pierwszy za granicą to inne auto niż obiecywane.
- **Dlaczego:** Rok produkcji wpływa na cenę i na to, jaka wersja/silnik naprawdę stoi przed Tobą.
- **Pole (number):** Rok produkcji z dowodu [rok] — Porównam z rocznikiem z ogłoszenia.
- **Odpowiedź:** ocenia system (reguła `prod_year`); przycisk pominięcia: „Brak w dowodzie”
- **Na listę uwag:** „Rok produkcji/pierwsza rejestracja niezgodne z ogłoszeniem”
- Tagi: dokumenty

### VIN na aucie — 3 miejsca

#### `p2s2i1` VIN na podszybiu (przez przednią szybę) = pole E  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Stań po stronie kierowcy i przeczytaj tabliczkę widoczną u dołu szyby — o ile ten model ją ma (nie każdy). Porównaj z dowodem znak po znaku. Zrób zdjęcie. Świeże ślady kleju, inna czcionka niż fabryczna — pytasz i notujesz.
- **Dlaczego:** To najłatwiejsza do sprawdzenia kopia VIN — tam, gdzie fabrycznie jest.
- **Odpowiedzi:** „Zgadza się znak w znak” → ok / „Nie znalazłem / nieczytelny” → uwaga / „Różni się lub ślady ingerencji” → problem; pominięcie: „Ten model nie ma VIN pod szybą”
- **Na listę uwag:** „VIN na podszybiu nieczytelny/niezgodny z dowodem rejestracyjnym”
- Tagi: vin

#### `p2s2i2` Tabliczka znamionowa (słupek/drzwi kierowcy lub komora silnika) = pole E  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Znajdź metalową tabliczkę lub naklejkę z VIN, masami i często kodem lakieru. Sprawdź: oryginalne nity/naklejka bez pęcherzy, brak śladów odklejania, lakier wokół bez różnicy odcienia. Porównaj VIN znak po znaku i sfotografuj.
- **Dlaczego:** Tabliczka przeklejona lub „przenitowana” bez dokumentu to klasyczny ślad auta składanego z dwóch lub kradzionego; tabliczka zastępcza po legalnej naprawie ma dokument — poproś o niego.
- **Odpowiedzi:** „Zgadza się znak w znak” → ok / „Nie znalazłem / nieczytelna” → uwaga / „Tabliczka zastępcza, jest dokument naprawy” → uwaga / „Różni się lub ślady ingerencji” → problem
- **Na listę uwag:** „Tabliczka znamionowa uszkodzona, przeklejana lub VIN niezgodny”
- Tagi: vin

#### `p2s2i3` VIN wybity w nadwoziu (podłoga pod fotelem / gródź / bagażnik)  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Zapytaj sprzedawcę albo sprawdź w instrukcji obsługi, u ASO lub na stacji diagnostycznej, gdzie w tym modelu jest numer wybity w blasze (często pod dywanikiem przy fotelu pasażera, na grodzi w komorze silnika lub w podłodze bagażnika). Poświeć latarką: znaki równe, blacha wokół gładka, bez szlifowania, spawania, świeżej farby ani „łaty”. Sfotografuj.
- **Dlaczego:** Numer w blasze jest najtrudniejszy do podrobienia — dlatego przy nim najczęściej widać ślady przeróbek.
- **Odpowiedzi:** „Zgadza się znak w znak” → ok / „Nie znalazłem / nieczytelny” → uwaga / „Różni się lub ślady ingerencji” → problem
- **Na listę uwag:** „VIN w nadwoziu nieczytelny, przebijany lub z śladami ingerencji”
- Tagi: vin

#### `p2s2i4` Naklejki fabryczne z VIN/kodem na elementach — wszystkie są?  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Wielu producentów nakleja etykiety z VIN lub kodem części na drzwiach, klapie, masce. Otwórz każde drzwi i klapę: jeśli na jednym elemencie brakuje etykiety, którą mają pozostałe, ten element był prawdopodobnie wymieniany. Zapamiętaj go — zmierzysz lakier w następnej fazie.
- **Dlaczego:** Wymieniony element to nie tragedia; ukrywany wymieniony element — tak.
- **Odpowiedzi:** „Wszystkie są” → ok / „Brakuje na jednym elemencie” → uwaga / „Brakuje na kilku” → uwaga; pominięcie: „Ten model ich nie ma / nie wiem”
- **Na listę uwag:** „Brak fabrycznej etykiety na jednym z elementów (możliwa wymiana)”
- Tagi: vin, nadwozie

### Kto sprzedaje

#### `p2s3i1` Dowód osobisty sprzedawcy = nazwisko w dowodzie rejestracyjnym  
_[CZERWONA · ODPUŚĆ]_ [szybki filtr]

- **Jak:** Poproś o dokument tożsamości (dowód, mDowód w mObywatel, paszport) i porównaj nazwisko z dowodem rejestracyjnym i z umową. Spisz dane do umowy z dokumentu, nie z dyktanda. Inna osoba niż w dowodzie rejestracyjnym może sprzedawać legalnie — z pełnomocnictwem albo z łańcuchem umów (kupiła auto i nie zdążyła przerejestrować); bez tego nie podpisujesz.
- **Dlaczego:** Umowa z osobą, której tożsamości nie potwierdziłeś, to papier bez wartości.
- **Odpowiedzi:** „Zgadza się” → ok / „Inna osoba — jest pełnomocnictwo lub umowa nabycia” → uwaga / „Nie pokazał dokumentu / nie wykazał prawa do sprzedaży” → problem
- **Na listę uwag:** „Sprzedający nie potwierdził tożsamości lub nie wykazał prawa do sprzedaży”
- Tagi: wlasciciel

#### `p2s3i2` Sprzedaje ktoś inny niż właściciel: pisemne pełnomocnictwo  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** „Sprzedaję za brata/kolegę” wymaga pełnomocnictwa na piśmie: dane właściciela (zgodne z dowodem rejestracyjnym) i pełnomocnika, dane auta (VIN, nr rej.), zakres (sprzedaż), podpis właściciela. Zadzwoń do właściciela przy sprzedawcy. Bez tego — nie kupujesz, choćby cena była świetna.
- **Dlaczego:** Bez pełnomocnictwa właściciel może zażądać zwrotu auta, a Ty zostaniesz z roszczeniem do „kolegi”.
- **Odpowiedzi:** „Sprzedaje sam właściciel” → ok / „Jest pisemne pełnomocnictwo” → ok / „Brak pełnomocnictwa” → problem; bez „Pomiń”
- **Na listę uwag:** „Sprzedaje osoba trzecia bez pisemnego pełnomocnictwa właściciela”
- Tagi: wlasciciel

#### `p2s3i3` Współwłaściciel: obecny, podpisze lub dał pełnomocnictwo  
_[CZERWONA]_

- **Jak:** Jeśli w dowodzie lub adnotacjach jest współwłaściciel (często rodzic, małżonek, bank), umowę muszą podpisać wszyscy właściciele albo jeden z pełnomocnictwem pozostałych. Ustal to teraz, nie przy podpisywaniu.
- **Dlaczego:** Podpis jednego z dwóch właścicieli nie przenosi na Ciebie całego auta.
- **Odpowiedzi:** „Brak współwłaściciela” → ok / „Obecny lub pełnomocnictwo” → ok / „Nieobecny, bez pełnomocnictwa” → problem
- **Na listę uwag:** „Współwłaściciel nieobecny i bez pełnomocnictwa”
- Tagi: wlasciciel

#### `p2s3i4` Test mObywatel: „pokaż to auto w Moich pojazdach”  
_[ŻÓŁTA]_

- **Jak:** Poproś sprzedawcę, żeby w swojej aplikacji mObywatel otworzył „Moje pojazdy” — widać tam pojazdy, których jest właścicielem lub współwłaścicielem, z VIN, terminem badania i OC. Auto na liście = mocne potwierdzenie własności. Aplikacja nie jest obowiązkowa, więc jej brak niczego nie przesądza. Ale „mam aplikację, tylko tego auta tam nie ma” oznacza, że w ewidencji właścicielem jest ktoś inny — wróć do dokumentów.
- **Dlaczego:** Trzydzieści sekund, których żaden „sprzedający w imieniu kuzyna” nie przejdzie.
- **Odpowiedzi:** „Pokazał — auto jest na liście” → ok / „Ma aplikację, auta na liście nie ma” → uwaga; pominięcie: „Nie używa aplikacji”
- **Na listę uwag:** „Sprzedawca ma mObywatel, ale auta nie ma w „Moich pojazdach” mimo deklarowanej własności”
- Tagi: wlasciciel, mobywatel

#### `p2s3i5` Sprzedaje firma/komis: faktura, dane firmy, umowa komisu  
_[ŻÓŁTA]_

- **Jak:** Sprawdź NIP w CEIDG/KRS (z telefonu), poproś o wzór faktury (VAT lub VAT-marża) i o umowę komisu, jeśli auto należy do osoby prywatnej, a sprzedaje komis. Kupując od firmy jako konsument masz rękojmię, której nie da się wyłączyć — to ma znaczenie dla negocjacji i po zakupie.
- **Dlaczego:** Firma na papierze i „prywatny” w rozmowie to dwa różne zestawy praw — sprawdź, który dostajesz.
- **Odpowiedzi:** „Faktura + dane firmy” → ok / „Umowa komisu na poprzedniego właściciela” → uwaga / „Nie wiadomo, kto sprzedaje” → problem; pominięcie: „Osoba prywatna”
- **Na listę uwag:** „Komis/firma: brak faktury, umowy komisu lub weryfikowalnych danych firmy”
- Tagi: wlasciciel, komis

### Papiery historii

#### `p2s4i1` Poprzednia umowa lub faktura zakupu przez obecnego sprzedawcę  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Poproś o dokument, na podstawie którego sprzedawca sam kupił auto. Sprawdź datę (kupione kilka tygodni temu = flipper/handlarz „na słupa”) i od kogo (firma? zagranica?). Brak dokumentu przy krótkim okresie posiadania = duża uwaga.
- **Dlaczego:** Data poprzedniego zakupu mówi, czy sprzedawca w ogóle zna to auto.
- **Odpowiedzi:** „Jest” → ok / „Nie ma” → uwaga
- **Na listę uwag:** „Sprzedawca posiada auto krótko / brak dokumentu jego zakupu”
- Tagi: dokumenty, historia

#### `p2s4i2` Książka serwisowa i faktury: przebiegi rosną, dane pasują  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Kartkuj: daty i przebiegi muszą rosnąć i pasować do Historii pojazdu. Faktura powinna mieć numer rejestracyjny lub VIN — bez tego mogła dotyczyć innego auta. Książka „uzupełniona” jednym długopisem, jednym charakterem pisma, bez pieczątek = bajka napisana wczoraj. Sfotografuj ostatnie wpisy.
- **Dlaczego:** Serwis udokumentowany to jedyna historia auta, której nie da się cofnąć.
- **Odpowiedzi:** „Jest, przebiegi rosną” → ok / „Niekompletna / brak książki” → uwaga / „Wpisy z przebiegami, które maleją” → problem
- **Na listę uwag:** „Historia serwisowa niepełna, niespójna lub bez powiązania z tym autem”
- Tagi: dokumenty, serwis

#### `p2s4i3` Duże serwisy: rozrząd, sprzęgło, olej w skrzyni — faktura czy „na gębę”?  
_[ŻÓŁTA]_

- **Jak:** Zapytaj, kiedy i gdzie wymieniono rozrząd (jeśli pasek — ustal interwał producenta dla tego silnika; łańcuch nie ma stałego terminu, ale ma objawy), sprzęgło, olej w skrzyni automatycznej, płyn hamulcowy. Każda odpowiedź bez faktury to deklaracja, nie fakt — zapisz jako uwagę do negocjacji, bo ten koszt może być Twój. Napis markerem na osłonie to nie dokument.
- **Dlaczego:** „Rozrząd był robiony” bez papieru znaczy tyle, co „nie wiem”.
- **Odpowiedzi:** „Faktury” → ok / „„Robione”, bez papierów” → uwaga / „Nie robione / nie wie” → uwaga
- **Na listę uwag:** „Brak dowodu wymiany rozrządu/dużych serwisów — tylko deklaracja”
- Tagi: dokumenty, serwis

#### `p2s4i4` Polisa OC: ważna, na to auto; do kiedy  
_[ŻÓŁTA]_

- **Jak:** Poproś o polisę lub sprawdź na ufg.pl (po nr rej. lub VIN, bezpłatnie). OC przechodzi na Ciebie z autem — możesz je wypowiedzieć. Brak ważnego OC = jazda próbna na Twoje ryzyko i sygnał, że auto stało lub właściciel nie dba o formalności.
- **Dlaczego:** Bez OC każda stłuczka na jeździe próbnej to Twój problem finansowy.
- **Pole (date):** OC ważne do — Z polisy albo z ufg.pl. Ocenię: ważne, kończy się, nieważne.
- **Odpowiedź:** ocenia system (reguła `oc_valid`); przycisk pominięcia: „Nie sprawdziłem”
- **Na listę uwag:** „Brak ważnej polisy OC”
- Tagi: dokumenty, oc

#### `p2s4i5` Auto z importu: dokumenty z kraju pochodzenia  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Jeśli auto jest już zarejestrowane w Polsce, poproś o kopie zagranicznego dowodu rejestracyjnego, zagranicznych badań i serwisu — pokazują przebieg sprzed importu. Jeśli auto jest jeszcze „na obcych papierach”: musisz dostać oryginalne dokumenty rejestracyjne (np. obie części niemieckiego dowodu), umowę/fakturę na sprzedawcę i dokument potwierdzający akcyzę; do rejestracji potrzebne będzie polskie badanie techniczne. Tłumaczenie przysięgłe unijnego dowodu zwykle nie jest wymagane, ale urząd może go zażądać dla wpisów krajowych.
- **Dlaczego:** Brakujący papier z importu potrafi zablokować rejestrację na tygodnie — na Twój koszt.
- **Odpowiedzi:** „Są (brief, faktura, przegląd)” → ok / „Brak” → uwaga; pominięcie: „Auto krajowe”
- **Na listę uwag:** „Import: niekompletne dokumenty z kraju pochodzenia lub brak akcyzy”
- Tagi: dokumenty, import

#### `p2s4i6` Kluczyki: ile jest, wszystkie działają  
_[ŻÓŁTA]_

- **Jak:** Policz kluczyki i sprawdź każdy: zamek w drzwiach, pilot, rozruch (immobiliser). Wpisz liczbę. Jeden kluczyk przy aucie, które fabrycznie miało dwa, to koszt dorobienia i pytanie: gdzie jest drugi i kto go ma.
- **Dlaczego:** Drugi kluczyk to nie gadżet — to bezpieczeństwo i argument w negocjacji.
- **Pole (number):** Liczba kluczyków [szt.] — Fabrycznie zwykle 2 (czasem 2 + kluczyk serwisowy). Jeden = uwaga do negocjacji i pytanie o los drugiego.
- **Odpowiedzi:** „Wszystkie działają” → ok / „Któryś nie działa” → uwaga; dodatkowo reguła `keys`
- **Na listę uwag:** „Tylko jeden kluczyk lub kluczyk niesprawny”
- Tagi: dokumenty, kluczyki

#### `p2s4i7` Karta pojazdu i nalepka na szybie — nie wymagaj  
_[INFO]_

- **Jak:** Od 4 września 2022 r. karta pojazdu i nalepka kontrolna nie są wydawane; starsze auta mogą je mieć, nowsze rejestracje — nie. Brak karty nie jest wadą ani sygnałem oszustwa. Jeśli sprzedawca ma starą kartę pojazdu — zajrzyj: wpisani są poprzedni właściciele.
- **Dlaczego:** Nie daj się złapać na „kartę pojazdu” w starych poradnikach — jej brak nic nie znaczy.
- **Odpowiedzi:** „Jest” → ok / „Nie ma (norma)” → ok
- **Na listę uwag:** „(informacja) Karta pojazdu — brak nie jest wadą (nie jest wydawana od 2022)”
- Tagi: dokumenty, info

#### `p2s4i8` Instalacja LPG: wpis „GAZ” w dowodzie, dokumenty i termin badania zbiornika  
_[CZERWONA · zdjęcie]_

- **Jak:** Na zbiorniku (w bagażniku lub pod autem przy zbiorniku toroidalnym) jest tabliczka z datą produkcji: zbiornik LPG podlega badaniu dozoru technicznego (TDT) co 10 lat od tej daty. Poproś o dokument instalacji (wyciąg ze świadectwa homologacji od montażysty) i sprawdź adnotację „GAZ” w dowodzie rejestracyjnym. Poproś o uruchomienie na benzynie i przełączenie na gaz: przełączenie ma być płynne, bez szarpania i bez zapachu gazu w kabinie. Niczego nie reguluj sam.
- **Dlaczego:** Bez wpisu i dokumentów auto nie przejdzie badania technicznego; zbiornik po terminie to unieruchomione auto i wydatek rzędu setek złotych.
- **Odpowiedzi:** „Wpis, dokumenty i zbiornik w terminie” → ok / „Zbiornik traci ważność w ciągu roku” → uwaga / „Brak wpisu GAZ / dokumentów lub zbiornik po terminie” → problem; pominięcie: „Nie ma LPG”
- **Na listę uwag:** „LPG: brak wpisu GAZ / dokumentów instalacji lub zbiornik po terminie badania”
- Tagi: dokumenty, lpg

## 3. Nadwozie i lakier (15 min)

*Spasowanie, pomiar lakieru element po elemencie, szyby, lampy, rdza, opony, podwozie*  
**Kiedy:** Na sucho, za dnia, zanim ktokolwiek odpali silnik

Obejdź auto dwa razy: raz z daleka (3–4 m, patrz na odcienie i linie), raz z bliska (szczeliny, śruby, uszczelki, miernik). Zaczynasz od dachu jako wzorca, potem idziesz zgodnie z ruchem wskazówek zegara. Każdy element z podwyższonym odczytem to pytanie do sprzedawcy — nie od razu wyrok.

### Spasowanie i szczeliny

#### `p3s1i1` Szczeliny między elementami równe i symetryczne lewa/prawa  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Porównaj tę samą szczelinę po obu stronach auta: maska–błotnik, drzwi–błotnik, drzwi–drzwi, klapa–ćwiartka. Szczelina, która zwęża się lub rozszerza wzdłuż długości, albo wyraźnie różni się od lustrzanej po drugiej stronie, oznacza wymieniany lub prostowany element.
- **Dlaczego:** Fabryka ustawia elementy z powtarzalną dokładnością; blacharz — na oko.
- **Odpowiedzi:** „Równe i symetryczne” → ok / „Lekko nierówne” → uwaga / „Wyraźnie nierówne” → problem
- **Na listę uwag:** „Nierówne/niesymetryczne szczeliny nadwozia (możliwa naprawa blacharska)”
- Tagi: nadwozie, spasowanie

#### `p3s1i2` Maska i klapa bagażnika zamykają się lekko i równo  
_[ŻÓŁTA]_

- **Jak:** Zamknij maskę z niewielkiej wysokości, bez dociskania: ma trafić w zamek za pierwszym razem i leżeć równo z błotnikami. Klapa: nie powinna wymagać trzaskania. Sprawdź, czy zawiasy nie mają śladów regulacji (zdarty lakier przy śrubach).
- **Dlaczego:** Po uderzeniu w przód lub tył maskę i klapę „dopasowuje się” na nowo — i rzadko idealnie.
- **Odpowiedzi:** „Lekko i równo” → ok / „Trzeba docisnąć” → uwaga / „Krzywo / nie domyka” → problem
- **Na listę uwag:** „Maska/klapa źle spasowana lub regulowana”
- Tagi: nadwozie, spasowanie

#### `p3s1i3` Drzwi: otwierają się bez opadania, zamykają bez trzaskania  
_[ŻÓŁTA]_

- **Jak:** Otwórz każde drzwi do końca i lekko unieś za krawędź: luz w zawiasach to zużycie lub duży przebieg. Zamknij bez rozmachu — mają zatrzasnąć się jednym dźwiękiem. Sprawdź gumy uszczelek: pomarszczone lub pomalowane to ślad lakierowania.
- **Dlaczego:** Drzwi opadające przy „małym przebiegu” to sprzeczność, którą warto zauważyć.
- **Odpowiedzi:** „Bez opadania, cicho” → ok / „Lekki luz” → uwaga / „Opadają / trzaskają” → problem
- **Na listę uwag:** „Drzwi opadają w zawiasach lub zamykają się z oporem”
- Tagi: nadwozie, spasowanie

#### `p3s1i4` Zderzaki i lampy: klipsy, luzy, dopasowanie do błotników  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Naciśnij rogi zderzaków: nie powinny „chodzić”. Sprawdź linię zderzak–błotnik i zderzak–reflektor: równa szczelina po obu stronach. Nowe, błyszczące klipsy i śruby przy starym plastiku = zderzak był zdejmowany (naprawa albo lakierowanie).
- **Dlaczego:** Zderzak zdejmuje się z jednego powodu: coś pod nim albo na nim naprawiano.
- **Odpowiedzi:** „Spasowane” → ok / „Drobne luzy” → uwaga / „Odstają, inne klipsy” → problem
- **Na listę uwag:** „Zderzak luźny/źle spasowany lub ze śladami demontażu”
- Tagi: nadwozie, spasowanie

### Pomiar lakieru — element po elemencie

#### `p3s2i1` Dach — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: roof]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach; wpisz typowy odczyt. Dach zwykle jest najrzadziej naprawiany, ale bywa aluminiowy, szklany (panorama) albo oklejony folią — dlatego bazą dla oceny jest mediana wszystkich zmierzonych elementów (od trzech pomiarów), a nie sam dach. Zmierz co najmniej dach, maskę i dwa elementy boczne. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Liczby z miernika nic nie znaczą bez porównania z resztą tego samego auta — dlatego mierzysz kilka elementów, nie jeden.
- **Pole (number):** Grubość lakieru: dach [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: dach — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i2` Maska — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: hood]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Zmierz też przy przedniej krawędzi (odpryski od kamieni bywają zaprawiane). Jeśli miernik pokazuje błąd lub zero — maska może być aluminiowa; wtedy oceniaj wzrokowo. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Lakierowana maska bywa niewinna (kamienie), ale często idzie w parze z naprawą przodu.
- **Pole (number):** Grubość lakieru: maska [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: maska — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i3` Błotnik przedni lewy — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: fl_fender]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Zmierz górę przy masce, bok przy drzwiach i dół przy progu. Zajrzyj na śruby mocujące błotnik pod maską: ślady klucza = błotnik był zdejmowany. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Błotnik przedni to najczęściej wymieniany element po stłuczce — łatwo go podmienić, trudniej dopasować.
- **Pole (number):** Grubość lakieru: błotnik przedni lewy [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: błotnik przedni lewy — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i4` Drzwi przednie lewe — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: fl_door]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Zmierz środek, przy klamce, przy dolnej krawędzi i w okolicy słupka. Sprawdź krawędź dolną od wewnątrz: tam widać granicę lakierowania. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Wysoki odczyt na drzwiach kierowcy przy „bezwypadkowym” to najczęstsza konfrontacja z opowieścią sprzedawcy.
- **Pole (number):** Grubość lakieru: drzwi przednie lewe [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: drzwi przednie lewe — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i5` Drzwi tylne lewe — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: rl_door]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Środek, dół, okolice klamki i tylnej krawędzi (styk z ćwiartką). Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Uszkodzenia boku rzadko kończą się na jednym elemencie — porównaj z sąsiednimi.
- **Pole (number):** Grubość lakieru: drzwi tylne lewe [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: drzwi tylne lewe — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i6` Ćwiartka tylna lewa (błotnik tylny) — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: rl_quarter]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Zmierz nad kołem, przy lampie i przy klapie. Ćwiartka jest zespawana z nadwoziem — jej naprawa to prawdziwa blacharka, nie wymiana na śruby. Zajrzyj do nadkola i pod uszczelkę bagażnika: świeży lakier, ślady szlifowania. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Szpachla na ćwiartce zwykle oznacza poważniejszą naprawę tyłu, nie parkingową rysę.
- **Pole (number):** Grubość lakieru: ćwiartka tylna lewa (błotnik tylny) [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: ćwiartka tylna lewa — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i7` Klapa bagażnika — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: trunk]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Środek, okolice emblematu, dolna krawędź. Jeśli odczyt błędny/zerowy — klapa może być aluminiowa lub plastikowa; wtedy sprawdź od wewnątrz ślady uszczelniacza i lakieru. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Lakierowana klapa + nowa lampa + inny odczyt na ćwiartce = uderzenie w tył.
- **Pole (number):** Grubość lakieru: klapa bagażnika [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: klapa bagażnika — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i8` Ćwiartka tylna prawa (błotnik tylny) — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: rr_quarter]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Nad kołem, przy lampie, przy klapie; zajrzyj do nadkola i pod uszczelkę bagażnika. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Prawa strona częściej „spotyka” słupki i krawężniki — nie pomijaj jej.
- **Pole (number):** Grubość lakieru: ćwiartka tylna prawa (błotnik tylny) [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: ćwiartka tylna prawa — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i9` Drzwi tylne prawe — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: rr_door]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Środek, dół, klamka, tylna krawędź. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Dwa sąsiednie elementy z podwyższonym odczytem to już naprawa boku, nie przypadek.
- **Pole (number):** Grubość lakieru: drzwi tylne prawe [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: drzwi tylne prawe — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i10` Drzwi przednie prawe — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: fr_door]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Środek, klamka, dolna krawędź, okolica słupka. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Element po elemencie budujesz mapę auta — luki w niej wypełni sprzedawca.
- **Pole (number):** Grubość lakieru: drzwi przednie prawe [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: drzwi przednie prawe — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i11` Błotnik przedni prawy — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: fr_fender]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Góra przy masce, bok przy drzwiach, dół przy progu; śruby pod maską. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Wymieniony błotnik przedni prawy bywa jedynym śladem po naprawionym przodzie.
- **Pole (number):** Grubość lakieru: błotnik przedni prawy [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: błotnik przedni prawy — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i12` Słupki i progi (punkty kontrolne) — 3–5 punktów, wpisz typowy odczyt  
_[ŻÓŁTA]_ [panel: sills]

- **Jak:** Przyłóż sondę prostopadle: środek, dwa rogi, przy krawędziach. Zmierz słupek A i B po obu stronach (przy otwartych drzwiach) oraz progi w 2–3 punktach. To elementy konstrukcyjne: podwyższony odczyt tutaj waży więcej niż na drzwiach. Zanotuj najwyższy wynik i porównaj z dachem. Bez miernika: patrz pod kątem pod światło i szukaj różnicy odcienia, „skórki pomarańczy”, pyłu na uszczelkach.
- **Dlaczego:** Naprawa słupka lub progu oznacza, że auto dostało mocno — to nie kategoria „rysa parkingowa”.
- **Pole (number):** Grubość lakieru: słupki i progi (punkty kontrolne) [µm] — Wpisz typowy odczyt z 3–5 punktów (środek i rogi); pojedynczy odstający punkt zapisz w notatce. Wartości fabryczne różnią się między markami i materiałami — liczy się różnica względem reszty tego auta. Tani miernik Fe mierzy tylko stal: na aluminium pokaże błąd lub zero (to nie „gruba warstwa”), plastikowych zderzaków nie zmierzy.
- **Odpowiedź:** ocenia system (reguła `paint_panel`); przycisk pominięcia: „Nie mam miernika”
- **Na listę uwag:** „Lakier: słupki/progi — odczyt podwyższony względem reszty auta (możliwa naprawa)”
- Tagi: lakier, pomiar

#### `p3s2i13` Zderzaki (plastik) — miernik nie działa, oceń wzrokiem  
_[INFO · zdjęcie]_

- **Jak:** Magnetyczny/indukcyjny grubościomierz nie zmierzy plastiku. Patrz pod kątem: różnica odcienia względem błotników, pęknięcia zaprawione od środka (zajrzyj od dołu i przez wloty), lakier na chropowatym czarnym plastiku dolnej części, nowe klipsy. Poproś o wyjaśnienie każdego lakierowanego zderzaka: „parkingowy” czy „całościowa naprawa przodu”?
- **Dlaczego:** Zderzak lakieruje się często niewinnie — ale to on przyjmuje pierwsze uderzenie, więc za nim szukaj dalej.
- **Odpowiedzi:** „Odcień zgodny” → ok / „Lekko inny” → uwaga / „Wyraźnie inny / świeży lakier” → uwaga
- **Na listę uwag:** „Zderzak lakierowany/naprawiany — przyczyna do wyjaśnienia”
- Tagi: lakier, zderzak

### Odcienie, overspray, śruby

#### `p3s3i1` Różnice odcienia lakieru — z 3–4 m i pod kątem  
_[ŻÓŁTA · zdjęcie]_ [szybki filtr]

- **Jak:** Odejdź na kilka metrów i patrz wzdłuż boku auta pod ostrym kątem, najlepiej pod słońce lub jasne niebo. Potem z bliska, pod kątem 45°: element lakierowany ma zwykle inny połysk, inną głębię metalika, czasem „cieniowanie” (rozmyta granica koloru na sąsiednim elemencie).
- **Dlaczego:** Lakiernia odtwarza kolor z kodu, ale nie odtworzy dokładnie fabrycznego wypalania i starzenia.
- **Odpowiedzi:** „Jednolity” → ok / „Jeden element inny” → uwaga / „Kilka elementów w innym odcieniu” → uwaga
- **Na listę uwag:** „Widoczna różnica odcienia/połysku między elementami”
- Tagi: lakier

#### `p3s3i2` Struktura lakieru: „skórka pomarańczy”, zacieki, wtrącenia  
_[ŻÓŁTA]_

- **Jak:** Porównuj strukturę lakieru między elementami pod światło: fabryczna „skórka pomarańczy” bywa normalna, ale element wyraźnie gładszy lub wyraźnie bardziej pofalowany niż sąsiednie, zacieki i wtrącenia pod lakierem to ślady lakierowania poza fabryką.
- **Dlaczego:** Struktura lakieru mówi prawdę nawet wtedy, gdy kolor dobrano idealnie.
- **Odpowiedzi:** „Fabryczna” → ok / „Skórka / zacieki / wtrącenia” → uwaga
- **Na listę uwag:** „Nierówna struktura lakieru (element lakierowany w warsztacie)”
- Tagi: lakier

#### `p3s3i3` Overspray: pył lakierniczy na gumach, plastikach, w nadkolach  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Przejedź paznokciem po uszczelkach szyb, gumach drzwi, czarnych plastikach listew i słupków, gumach w nadkolach, końcówce wydechu, śrubach. Szorstki nalot w kolorze auta, lakier na krawędzi uszczelki lub linia po taśmie maskującej = element lakierowany.
- **Dlaczego:** Lakiernik zakleja to, co pamięta; reszta zostaje z dowodem.
- **Odpowiedzi:** „Brak” → ok / „Jest (gdzie? — notatka)” → uwaga
- **Na listę uwag:** „Ślady pyłu lakierniczego/taśmy maskującej (element lakierowany)”
- Tagi: lakier, overspray

#### `p3s3i4` Śruby maski, błotników, drzwi, zawiasów — ślady klucza  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Otwórz maskę i drzwi. Fabryczne śruby mają nienaruszony lakier na łbach i wokół nich. Zdarty lakier na łbie, błyszczący metal, inny rodzaj śruby, przesunięty ślad podkładki obok obecnego położenia — element był odkręcany lub regulowany.
- **Dlaczego:** Śruby nie kłamią: fabryka dokręca je raz.
- **Odpowiedzi:** „Fabryczne” → ok / „Ślady klucza” → uwaga
- **Na listę uwag:** „Śruby elementów nadwozia ze śladami odkręcania”
- Tagi: nadwozie, sruby

### Szyby i reflektory

#### `p3s4i1` Oznaczenia na szybach: ten sam producent i rok na wszystkich  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Na każdej szybie jest oznaczenie producenta i kod roku. Fabryka może używać kilku dostawców, więc liczy się logika: rok na szybie nie późniejszy niż produkcja auta. Jedna szyba nowsza = wymieniona (poproś o powód i, przy autach z kamerą asystentów, o dokument kalibracji); kilka nowszych z tej samej strony = naprawa po zdarzeniu.
- **Dlaczego:** Wymieniona szyba to najtrwalszy ślad zdarzenia, którego nie ma w żadnym raporcie.
- **Odpowiedzi:** „Oznaczenia logiczne (rok nie późniejszy niż auto)” → ok / „Jedna szyba wymieniona” → uwaga / „Kilka wymienionych” → uwaga
- **Na listę uwag:** „Jedna lub więcej szyb z innym producentem/rokiem niż reszta (wymiana)”
- Tagi: szyby

#### `p3s4i2` Przednia szyba: odpryski, pęknięcia, piaskowanie w polu wycieraczek  
_[ŻÓŁTA]_

- **Jak:** Obejrzyj szybę z zewnątrz i od środka pod światło. Odprysk w polu widzenia kierowcy to koszt wymiany (i potencjalny problem na badaniu technicznym). Matowa, „piaskowana” powierzchnia w polu wycieraczek świadczy o dużym przebiegu po trasach.
- **Dlaczego:** Piaskowanie szyby nie cofa się razem z licznikiem.
- **Odpowiedzi:** „Czysta” → ok / „Odpryski / piaskowanie poza polem widzenia” → uwaga / „Pęknięcie lub odprysk w polu widzenia kierowcy” → problem
- **Na listę uwag:** „Uszkodzona lub zmatowiała przednia szyba”
- Tagi: szyby

#### `p3s4i3` Reflektory: para tego samego producenta, jednakowo zestarzona  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Porównaj oba przednie reflektory: logo producenta na kloszu, odcień plastiku (żółknięcie), oznaczenia homologacji, drobne rysy. Jeden nowy i przejrzysty obok jednego zmatowiałego = uderzenie z tej strony. Sprawdź mocowania: uszka klejone, opaski, brak śrub, lampa siedząca krzywo względem maski.
- **Dlaczego:** Reflektory rzadko psują się pojedynczo — najczęściej „psuje” je zderzenie.
- **Odpowiedzi:** „Para zgodna” → ok / „Jeden nowszy / inny” → uwaga
- **Na listę uwag:** „Reflektory różne (jeden wymieniony) lub z naprawianymi mocowaniami”
- Tagi: lampy

#### `p3s4i4` Zaparowanie lamp, wilgoć w kloszach, pęknięcia tylnych lamp  
_[ŻÓŁTA]_

- **Jak:** Zajrzyj do wnętrza kloszy: krople, zacieki, ślady po wodzie na dole odbłyśnika. Tylne lampy: pęknięcia, silikon na krawędziach, wilgoć. Włącz światła (poproś sprzedawcę) — mętny klosz obniża skuteczność.
- **Dlaczego:** Zaparowana lampa to nieszczelność po uszkodzeniu albo po nieudanej naprawie.
- **Odpowiedzi:** „Suche, całe” → ok / „Zaparowane / pęknięte” → uwaga
- **Na listę uwag:** „Zaparowane/nieszczelne lampy”
- Tagi: lampy

### Rdza

#### `p3s5i1` Progi: obejrzyj z latarką od spodu krawędzi, przesuń dłonią — bez naciskania na siłę  
_[CZERWONA · zdjęcie]_

- **Jak:** Kucnij przy każdym progu. Poświeć latarką na spód i krawędź od strony podwozia, delikatnie przesuń dłonią w rękawiczce (bez naciskania — nie chodzi o wgniatanie blachy). Pęcherze pod lakierem, łuszczenie, świeży czarny spray tylko na progach, plastikowe nakładki zaklejone tak, że nie da się zajrzeć pod spód — to rdza w toku lub ukrywana. Ocenę wytrzymałości zostaw podnośnikowi na SKP.
- **Dlaczego:** Próg to element nośny: zgniły próg to koszt i problem na badaniu technicznym, a nie kosmetyka.
- **Odpowiedzi:** „Czysto, bez pęcherzy” → ok / „Naloty, pęcherze” → uwaga / „Łuszczenie / dziury / łaty / świeży spray” → problem
- **Na listę uwag:** „Skorodowane progi lub ślady maskowania korozji progów”
- Tagi: rdza, progi

#### `p3s5i2` Nadkola i krawędzie błotników od spodu  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Poświeć w każde nadkole: krawędź błotnika od wewnątrz, łączenie z progiem, mocowania plastikowych osłon. Pęcherze na krawędziach nadkoli, rdzawe zacieki spod listew i nakładek, świeża konserwacja wybiórczo w jednym miejscu.
- **Dlaczego:** Rdza zaczyna się od krawędzi i od środka — z zewnątrz widać ją ostatnią.
- **Odpowiedzi:** „Czyste” → ok / „Naloty” → uwaga / „Przerdzewiałe” → problem
- **Na listę uwag:** „Korozja krawędzi nadkoli/błotników”
- Tagi: rdza

#### `p3s5i3` Krawędzie drzwi, klapy, maski i ramka szyby pod uszczelkami  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Otwórz drzwi i odchyl uszczelki: dolne krawędzie drzwi i klapy (otwory odpływowe), krawędź maski, ramka przedniej szyby pod gumą (korozja po niefachowej wymianie szyby), okolica anteny i relingów.
- **Dlaczego:** To miejsca, gdzie woda stoi latami — i gdzie sprzedawca sprząta najrzadziej.
- **Odpowiedzi:** „Czyste” → ok / „Naloty” → uwaga / „Pęcherze / dziury” → problem
- **Na listę uwag:** „Korozja krawędzi elementów lub pod uszczelkami”
- Tagi: rdza

#### `p3s5i4` Podłoga, podłużnice, mocowania zawieszenia — z latarką od boku, bez wchodzenia pod auto  
_[CZERWONA · zdjęcie]_

- **Jak:** Nie wchodź i nie wsuwaj głowy ani tułowia pod auto stojące na kołach, lewarku czy przypadkowych podporach. Kucnij przy progu i poświeć latarką w głąb: podłoga pod fotelami, podłużnice, mocowania wahaczy i sprężyn; wnękę koła zapasowego obejrzyj od góry z bagażnika. Łuszcząca się blacha, brązowe „łzy”, dziury pod dywanikiem, świeża farba tylko na fragmencie. Całe podwozie obejrzysz dopiero na podnośniku (SKP) — to część Planu B.
- **Dlaczego:** Skorodowana podłoga lub podłużnica to auto, które może nie przejść badania — i którego nie da się tanio uratować.
- **Odpowiedzi:** „Czysto, bez pęcherzy” → ok / „Naloty, pęcherze” → uwaga / „Łuszczenie / dziury / łaty” → problem
- **Na listę uwag:** „Korozja elementów nośnych (podłoga/podłużnice/mocowania)”
- Tagi: rdza, konstrukcja

### Opony i felgi

#### `p3s6i1` DOT na każdej oponie: rok produkcji, najstarszą wpisz  
_[ŻÓŁTA]_

- **Jak:** Na boku opony znajdź „DOT” i ostatnie 4 cyfry: dwie pierwsze to tydzień, dwie ostatnie rok (np. 2319 = 23. tydzień 2019). Sprawdź wszystkie cztery i koło zapasowe. Wpisz rok najstarszej. Producenci opon zalecają coroczną kontrolę po 5 latach i wymianę po 10 — to zalecenie, nie przepis.
- **Dlaczego:** Wiek opony widać dopiero na boku — bieżnik potrafi wyglądać dobrze na oponie twardej jak plastik.
- **Pole (number):** Rok produkcji najstarszej opony (DOT) [rok] — Wpisz np. 2017. Powyżej ok. 6 lat oglądaj pęknięcia boków; powyżej ok. 10 lat — wymiana niezależnie od bieżnika (zalecenie producentów, nie przepis).
- **Odpowiedź:** ocenia system (reguła `dot_year`); przycisk pominięcia: „Nie odczytam”
- **Na listę uwag:** „Opony stare (wg DOT) — do wymiany niezależnie od bieżnika”
- Tagi: opony

#### `p3s6i2` Głębokość bieżnika: najpłytsze miejsce, najgorsza opona  
_[ŻÓŁTA]_

- **Jak:** Użyj miarki lub monety; szukaj wskaźników TWI w rowkach (gumowe mostki — bieżnik zrównany z nimi to koniec). Mierz przy obu krawędziach i w środku każdej opony; wpisz najmniejszą wartość. Minimum prawne to 1,6 mm, ale bezpieczne jest wyraźnie więcej (ogólnie zaleca się wymianę letnich ok. 3 mm, zimowych ok. 4 mm).
- **Dlaczego:** Cztery opony do wymiany to konkretny, policzalny argument w negocjacji.
- **Pole (number):** Najmniejsza głębokość bieżnika [mm] — Prawne minimum 1,6 mm. Poniżej ok. 3 mm (lato) / 4 mm (zima) planuj wymianę. Nowa opona osobowa ma zwykle ok. 7–9 mm.
- **Odpowiedź:** ocenia system (reguła `tread_mm`); przycisk pominięcia: „Nie zmierzę”
- **Na listę uwag:** „Bieżnik bliski minimum — opony do wymiany”
- Tagi: opony

#### `p3s6i3` Zużycie równomierne? Krawędzie, „piła”, łysiny  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Przejedź dłonią po bieżniku (uważaj na druty). Zjedzona jedna krawędź = zła geometria lub zużyte elementy zawieszenia; „piłokształtne” klocki bieżnika i falowanie = zużyte amortyzatory; łysina w jednym miejscu = blokada koła lub niewyważenie.
- **Dlaczego:** Opony to zapis tego, jak auto jeździło przez ostatnie tysiące kilometrów.
- **Odpowiedzi:** „Równe” → ok / „Krawędzie / „piła”” → uwaga / „Łysiny” → problem
- **Na listę uwag:** „Nierównomierne zużycie opon (geometria/zawieszenie)”
- Tagi: opony, zawieszenie

#### `p3s6i4` Pary: na jednej osi ten sam model i rozmiar  
_[ŻÓŁTA]_

- **Jak:** Na jednej osi opony mają być tego samego rozmiaru i tej samej konstrukcji oraz rzeźby bieżnika — tego wymagają przepisy o warunkach technicznych i tego sprawdza diagnosta. Przód i tył mogą się różnić (w części aut różnią się fabrycznie). Różne modele na osi to zwykle oszczędność „na jedną oponę” po przebiciu — pytanie, na czym jeszcze oszczędzano.
- **Dlaczego:** Kto oszczędzał na oponach, oszczędzał też na oleju.
- **Odpowiedzi:** „Te same na osi” → ok / „Różne modele na osi, ta sama rzeźba” → uwaga / „Różne rozmiary lub różna rzeźba bieżnika na jednej osi” → problem
- **Na listę uwag:** „Różne opony na jednej osi / mieszanka czterech modeli”
- Tagi: opony

#### `p3s6i5` Felgi: pęknięcia, spawy, krawężnikowe obicia, bicie  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Obejrzyj każdą felgę: pęknięcia przy szprychach i na rancie, ślady spawania, głębokie obicia krawężnikowe, wgniecenia rantu od wewnątrz (poświeć latarką). Bicia koła wzrokiem nie ocenisz — wyjdzie na jeździe (wibracje kierownicy) albo na wyważarce.
- **Dlaczego:** Felga przyjmuje uderzenie pierwsza; drugie w kolejce jest zawieszenie.
- **Odpowiedzi:** „Całe” → ok / „Obicia” → uwaga / „Pęknięcia / spawy” → problem
- **Na listę uwag:** „Felgi uszkodzone/naprawiane”
- Tagi: felgi

### Podwozie i wydech

#### `p3s7i1` Podwozie latarką: świeża konserwacja pokrywająca wszystko  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Poświeć wzdłuż całego podwozia. Cienka, stara, matowa warstwa to normalna konserwacja. Gruba, świeża, błyszcząca czerń nałożona na wszystko — także na wydech, przewody, śruby, elementy gumowe — to najczęściej maskowanie rdzy lub napraw tuż przed sprzedażą. Zdrap paznokciem w niewidocznym miejscu: pod świeżą warstwą nie może być luźnej rdzy.
- **Dlaczego:** Konserwację robi się dla auta na lata, nie dla kupującego na jutro.
- **Odpowiedzi:** „Naturalne” → ok / „Świeżo pokryte wszystko” → uwaga
- **Na listę uwag:** „Świeża konserwacja podwozia nałożona „na wszystko” (możliwe maskowanie)”
- Tagi: podwozie

#### `p3s7i2` Wycieki: pod autem, na misce, skrzyni, amortyzatorach, osłonach  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Zajrzyj na miejsce, gdzie auto stało (plamy, świeże ślady posypanego piasku). Latarką: miska olejowa, łączenie silnika ze skrzynią, przeguby (rozerwane osłony = tłuszcz na feldze od wewnątrz), amortyzatory (mokre, tłuste to koniec), plastikowe osłony pod silnikiem (brakujące, nowe klipsy, pęknięte po uderzeniu od dołu).
- **Dlaczego:** Wyciek to nie „lekko poci się” — to część, która czeka na Twój portfel.
- **Odpowiedzi:** „Sucho” → ok / „Pocenie” → uwaga / „Kapie / mokro” → problem
- **Na listę uwag:** „Wycieki płynów pod autem / mokre elementy podwozia”
- Tagi: podwozie, wycieki

#### `p3s7i3` Tłumik i układ wydechowy: rdza przelotowa, dziury, prowizorki  
_[ŻÓŁTA]_

- **Jak:** Poświeć na tłumiki i rury: głęboka, płatkowa rdza, dziury, sadza przy łączeniach (nieszczelność), druty, opaski, „bandaże”, świeżo spawane łaty. Puknij w tłumik dłonią w rękawiczce: grzechot w środku to rozpadające się wnętrze.
- **Dlaczego:** Wydech gnije od środka — na zewnątrz widać go w ostatniej fazie.
- **Odpowiedzi:** „Cały” → ok / „Rdza powierzchniowa” → uwaga / „Dziury / prowizorki” → problem
- **Na listę uwag:** „Układ wydechowy skorodowany/nieszczelny/naprawiany prowizorycznie”
- Tagi: podwozie, wydech

#### `p3s7i4` Ślady spawania, pofalowane podłużnice, łaty — konstrukcja (z góry i od boku, bez wchodzenia pod auto)  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Bez wchodzenia pod auto. Z góry, w komorze silnika: podłużnice (belki biegnące od pasa przedniego w głąb), kielichy amortyzatorów, pas przedni i śruby błotników. Z tyłu: podłoga bagażnika i wnęka koła zapasowego po podniesieniu wykładziny. Od boku, z latarką w nadkolach: początek podłużnic i progi. Szukasz nieregularnych szwów spawalniczych innych niż fabryczne punktowe zgrzewy, pofalowanej lub „pomarszczonej” blachy, wstawianych łat, uszczelniacza nałożonego pędzlem. Całe podwozie zobaczy podnośnik na SKP.
- **Dlaczego:** Prawidłowa naprawa konstrukcji istnieje, ale laik nie odróżni jej od byle jakiej. Dla Ciebie to auto do oceny przez blacharza lub rzeczoznawcę, nie do negocjacji ceny.
- **Odpowiedzi:** „Brak śladów” → ok / „Niepewne (zrób zdjęcie, pokaż fachowcowi)” → uwaga / „Spawy / fałdy / łaty” → problem
- **Na listę uwag:** „Ślady spawania/prostowania elementów konstrukcyjnych (auto po ciężkim wypadku)”
- Tagi: podwozie, konstrukcja

## 4. Wnętrze i elektryka (10 min)

*Przebieg kontra zużycie, wilgoć i zalanie, test kontrolek, elektryka, pasy i poduszki, bagażnik, OBD2*  
**Kiedy:** Po nadwoziu, wciąż przed odpaleniem silnika (test kontrolek robisz na samym zapłonie)

Wnętrze zdradza prawdziwy przebieg lepiej niż licznik i pokazuje, czy auto nie było zalane. Test kontrolek robisz przy samym zapłonie, bez odpalania — silnik ma zostać zimny na następną fazę. Klikaj wszystko: każdy przycisk, każde okno, każdy pas.

### Przebieg kontra zużycie

#### `p4s1i1` Licznik: wpisz przebieg — porównam z ogłoszeniem i Historią pojazdu  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Włącz zapłon i przepisz przebieg co do kilometra. Porównam z ostatnim odczytem z badania w Historii pojazdu i z ogłoszeniem. Licznik niższy niż wcześniejszy urzędowy odczyt to niespójność, której bez dokumentu wymiany drogomierza nie da się wytłumaczyć — kończysz oględziny. Różnica kilkuset kilometrów wobec ogłoszenia jest normalna; tysięcy — wymaga wyjaśnienia.
- **Dlaczego:** To najprostszy w Polsce test na cofnięty licznik i większość kupujących go nie robi.
- **Pole (number):** Przebieg na liczniku [km] — Przepisz co do kilometra. Porównam z przebiegiem z ogłoszenia i z ostatnim odczytem z Historii pojazdu. Zdjęcie licznika zostaw sobie jako dowód na dzień umowy.
- **Odpowiedź:** ocenia system (reguła `odo_dashboard`); przycisk pominięcia: „Nie odczytam”
- **Na listę uwag:** „Przebieg na liczniku niższy niż w Historii pojazdu / niespójny z ogłoszeniem”
- Tagi: przebieg, licznik

#### `p4s1i2` Kierownica: przetarcia i błyszcząca skóra vs deklarowany przebieg  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Kierownica przy kilkudziesięciu tysiącach km ma być matowa i równa; wytarty, błyszczący wieniec przy „80 tys.” to sprzeczność. Ale nowa kierownica lub tapicerka przy dużym przebiegu to też sygnał — ktoś odświeżał auto przed sprzedażą. Zużycie porównuj z całą resztą wnętrza; sam w sobie nie jest dowodem.
- **Dlaczego:** Kierownicy nie da się cofnąć śrubokrętem — dlatego się ją wymienia.
- **Odpowiedzi:** „Nie widzę sprzeczności z przebiegiem” → ok / „Wytarte jak na przebieg” → uwaga / „Podejrzanie nowe / wymienione” → uwaga
- **Na listę uwag:** „Zużycie kierownicy niezgodne z deklarowanym przebiegiem (lub kierownica wymieniona)”
- Tagi: przebieg, zuzycie

#### `p4s1i3` Gałka/dźwignia biegów, przyciski, przełączniki: wytarte napisy  
_[ŻÓŁTA]_

- **Jak:** Sprawdź gałkę biegów (wytarty wzór, błyszcząca), przełącznik kierunkowskazów, przyciski szyb i klimatyzacji (starte symbole, prześwitujące podświetlenie), klamki wewnętrzne. Zestaw z kierownicą i pedałami — te elementy zużywają się razem.
- **Dlaczego:** Jeden wytarty element to przypadek; wszystkie razem to przebieg.
- **Odpowiedzi:** „Nie widzę sprzeczności z przebiegiem” → ok / „Wytarte jak na przebieg” → uwaga / „Podejrzanie nowe / wymienione” → uwaga
- **Na listę uwag:** „Zużycie przełączników i gałki niezgodne z przebiegiem”
- Tagi: przebieg, zuzycie

#### `p4s1i4` Pedały: nakładki starte do metalu albo podejrzanie nowe  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Poświeć na gumowe nakładki pedałów: starte, wyślizgane, z widocznym metalem — duży przebieg. Nowe nakładki na aucie z wytartą kierownicą = ktoś „odmładzał” wnętrze przed sprzedażą. Sprawdź też podłogę pod pedałami: przetarta wykładzina, wgnieciony dywanik.
- **Dlaczego:** Nakładki pedałów kosztują grosze — dlatego to pierwsza rzecz, którą wymienia się przed kręceniem licznika.
- **Odpowiedzi:** „Nie widzę sprzeczności z przebiegiem” → ok / „Wytarte jak na przebieg” → uwaga / „Podejrzanie nowe / wymienione” → uwaga
- **Na listę uwag:** „Pedały zużyte niezgodnie z przebiegiem lub świeżo wymienione nakładki”
- Tagi: przebieg, zuzycie

#### `p4s1i5` Fotel kierowcy: boczek, gąbka, prowadnice — porównaj z pasażera  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Usiądź, poruszaj się na boki: fotel nie powinien „pływać” na prowadnicach. Obejrzyj lewy boczek siedziska (przetarcia od wsiadania), zapadnięcie gąbki, pęknięcia skóry/tapicerki, wytarty tunel przy dźwigni. Fotel pasażera jest punktem odniesienia — powinien być wyraźnie mniej zużyty.
- **Dlaczego:** Kierowca siada na tym fotelu tyle razy, ile razy odpala auto — nie da się tego ukryć.
- **Odpowiedzi:** „Nie widzę sprzeczności z przebiegiem” → ok / „Wytarte jak na przebieg” → uwaga / „Podejrzanie nowe / wymienione” → uwaga
- **Na listę uwag:** „Zużycie fotela kierowcy niezgodne z przebiegiem”
- Tagi: przebieg, zuzycie

### Wilgoć, zalanie, zapach

#### `p4s2i1` Zapach po otwarciu drzwi: stęchlizna, pleśń albo agresywne maskowanie  
_[ŻÓŁTA]_

- **Jak:** Wsiądź do zamkniętego wcześniej auta i wciągnij powietrze zanim wywietrzeje. Stęchlizna/piwnica = wilgoć, nieszczelności lub zalanie. Bardzo mocny odświeżacz, zapach „nowego auta” z butelki albo ozonowania to często próba przykrycia tego pierwszego (albo dymu papierosowego).
- **Dlaczego:** Nos wykrywa wilgoć wcześniej niż oczy — a sprzedawca o tym wie.
- **Odpowiedzi:** „Neutralny” → ok / „Stęchlizna / pleśń” → uwaga / „Agresywne maskowanie” → uwaga
- **Na listę uwag:** „Zapach wilgoci/stęchlizny lub intensywne maskowanie zapachem”
- Tagi: wilgoc, zapach

#### `p4s2i2` Pod dywanikami: wilgoć, muł, linia wodna, rdza na szynach foteli i śrubach  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Wyjmij dywaniki (te wyjmowane), wciśnij palcem wykładzinę w rogach i pod pedałami: ma być sucha. Wsuń dłoń pod wykładzinę przy progu tak głęboko, jak wejdzie bez szarpania i podważania plastików — nie demontuj niczego. Szukasz zestawu śladów, nie jednego: piasek lub muł w zakamarkach, linia wodna na wykładzinie, osady na wiązkach, rdza na szynach foteli i śrubach mocujących pasy i fotele, zapach stęchlizny. Pojedyncza wilgoć to zwykle przeciek (uszczelka, kratka odpływu) — zapisz jako uwagę.
- **Dlaczego:** Zalane auto to elektronika, która zacznie umierać po kolei — i korozja od środka.
- **Odpowiedzi:** „Sucho, czysto” → ok / „Wilgoć w jednym miejscu (przeciek)” → uwaga / „Muł, linia wodna, rdza na szynach — kilka śladów naraz” → problem
- **Na listę uwag:** „Zestaw śladów zalania: muł/linia wodna pod wykładziną, rdza na szynach i śrubach”
- Tagi: wilgoc, zalanie

#### `p4s2i3` Bagażnik: wnęka koła zapasowego, podłoga, ślady napraw tyłu  
_[CZERWONA · zdjęcie]_

- **Jak:** Wyjmij podłogę bagażnika i koło zapasowe. Szukaj: wody, rdzy, mułu, zapachu, uszkodzonej blachy wnęki (pofalowana, „pomarszczona” = uderzenie w tył), świeżego uszczelniacza nałożonego pędzlem zamiast fabrycznego równego szwu, lakieru innego niż reszta, brakujących fabrycznych naklejek.
- **Dlaczego:** Wnęka koła zapasowego to miejsce, którego nikt nie sprząta i którego blacharz nie odtworzy idealnie.
- **Odpowiedzi:** „Fabrycznie, sucho” → ok / „Wilgoć” → uwaga / „Ślady napraw / pofalowana blacha” → problem
- **Na listę uwag:** „Bagażnik: woda/rdza we wnęce lub ślady naprawy podłogi po uderzeniu w tył”
- Tagi: wilgoc, bagaznik, nadwozie

#### `p4s2i4` Zacieki na podsufitce, wilgoć w schowkach, zaparowane szyby od środka  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Obejrzyj podsufitkę przy słupkach, wokół szyberdachu i lampek: żółte zacieki, odklejanie. Otwórz schowki, zajrzyj pod deskę od strony pasażera (latarką). Zaparowane od środka szyby przy suchej pogodzie to wilgoć w kabinie.
- **Dlaczego:** Nieszczelność potrafi być tania w naprawie, ale jej skutki w elektronice — nie.
- **Odpowiedzi:** „Czysto” → ok / „Zacieki / para od środka” → uwaga
- **Na listę uwag:** „Ślady przecieków (podsufitka, szyberdach, uszczelki) lub wilgoć w kabinie”
- Tagi: wilgoc

### Test kontrolek — na samym zapłonie

#### `p4s3i1` Zapłon bez odpalania: autotest kontrolek — czy alarmowe się pokazały i zgasły  
_[CZERWONA · zdjęcie]_ [szybki filtr]

- **Jak:** Przekręć kluczyk do pozycji zapłonu (lub wciśnij start bez sprzęgła/hamulca). Kontrolki zapalają się na chwilę (autotest) i większość gaśnie po kilku sekundach. Układ różni się między modelami — nie każde auto zapala wszystkie ikony naraz. Liczy się, czy pokazały się i zgasły alarmowe: silnik (check engine), ABS, ESP, airbag/SRS, akumulator, ciśnienie oleju. Zrób zdjęcie deski w momencie, gdy świecą. Brak którejś z tych sześciu = ktoś mógł wyjąć żarówkę lub zamaskować błąd; kontrolka gasnąca dokładnie w tej samej chwili co inna — zapisz.
- **Dlaczego:** Kontrolka, której nie ma, to błąd, którego sprzedawca nie chce Ci pokazać.
- **Odpowiedzi:** „Alarmowe zapaliły się i zgasły” → ok / „Nie wiem, które powinny” → uwaga / „Któraś z alarmowych nie zapala się” → problem
- **Na listę uwag:** „Nie wszystkie kontrolki alarmowe pokazują się w autoteście (możliwe zamaskowanie błędu)”
- Tagi: kontrolki, elektryka

#### `p4s3i2` Kontrolka AIRBAG: MUSI się zapalić i zgasnąć  
_[CZERWONA · ODPUŚĆ · zdjęcie]_ [szybki filtr]

- **Jak:** Szukaj żółtej/czerwonej ikony poduszki (lub napisu AIRBAG/SRS) w autoteście. Prawidłowo: świeci kilka sekund i gaśnie. Nie zapala się wcale albo świeci stale = nieprawidłowy autotest: możliwa wyjęta żarówka, „oszukany” sterownik po wystrzale poduszek albo błąd systemu — przed zakupem diagnostyka SRS komputerem, nie „na oko”. Gaśnięcie dokładnie w tej samej chwili co inna kontrolka bywa śladem mostka na innej diodzie — też do diagnostyki.
- **Dlaczego:** Auto bez działających poduszek wygląda jak auto z poduszkami — do pierwszego wypadku.
- **Odpowiedzi:** „Zapala się i gaśnie” → ok / „Gaśnie dokładnie razem z inną kontrolką (podejrzenie mostka)” → uwaga / „Nie zapala się” → problem / „Świeci stale” → problem
- **Na listę uwag:** „Kontrolka airbag: nieprawidłowy autotest (nie zapala się / świeci stale)”
- Tagi: kontrolki, airbag, bezpieczenstwo

#### `p4s3i3` Po odpaleniu: żadna alarmowa nie świeci (silnik, ABS, ESP, akumulator, olej, airbag)  
_[CZERWONA · zdjęcie]_

- **Jak:** Ten punkt odhaczasz dopiero po zimnym starcie w następnej fazie — zostaw go na później. Zwykłe kontrolki statusu (światła, pasy, hamulec postojowy, tryb jazdy) mogą świecić. Żółta ostrzegawcza (check engine, ESP, DPF, ciśnienie w oponach) = zapisany błąd do wyjaśnienia; czerwona (olej, akumulator, hamulce, temperatura, airbag) = nie jedź na jazdę próbną, dopóki nie wiesz dlaczego. „To tylko czujnik” bez dowodu (faktura, odczyt) to deklaracja, nie diagnoza.
- **Dlaczego:** Świecąca kontrolka to jedyny moment, w którym auto samo mówi Ci, co mu jest.
- **Odpowiedzi:** „Nic poza statusem (światła, pasy, ręczny)” → ok / „Świeci żółta ostrzegawcza” → uwaga / „Świeci czerwona lub check engine” → problem
- **Na listę uwag:** „Kontrolka świeci po uruchomieniu silnika (błąd niezdiagnozowany)”
- Tagi: kontrolki, elektryka

### Elektryka i wyposażenie

#### `p4s4i1` Szyby, lusterka, centralny zamek — wszystko, do końca, z każdego miejsca  
_[ŻÓŁTA]_

- **Jak:** Opuść i podnieś każdą szybę z przycisku kierowcy i z jej własnego; słuchaj zgrzytów, patrz na zacinanie. Lusterka: regulacja, składanie, podgrzewanie (dotknij po minucie). Zamek: zamknij i otwórz pilotem oraz kluczem, sprawdź każde drzwi i klapę osobno.
- **Dlaczego:** Drobiazgi elektryczne kosztują niewiele każdy z osobna — ale lista rośnie szybko i to Twój argument.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne szyby/lusterka/zamek centralny”
- Tagi: elektryka

#### `p4s4i2` Klimatyzacja: chłodzi w 1–2 minuty, sprężarka się załącza  
_[ŻÓŁTA]_

- **Jak:** Ten test dokończysz po odpaleniu: włącz A/C na maks. chłodzenie, po 1–2 minutach z nawiewu ma iść wyraźnie zimne powietrze. Kliknięcie sprężarki i zmiana obrotów przy włączeniu to cecha starszych układów — w nowszych (sprężarki o zmiennej wydajności, elektryczne w hybrydach) możesz ich nie usłyszeć; oceniaj to, czy chłodzi. Powiew ciepły lub „trochę chłodniejszy” = układ nieszczelny lub sprężarka do naprawy — to usterka, nie cecha. Zapach z nawiewu (stęchły) = parownik.
- **Dlaczego:** „Wystarczy nabić” to najczęstsze kłamstwo o klimatyzacji — gaz ucieka, bo coś jest nieszczelne.
- **Odpowiedzi:** „Chłodzi wyraźnie” → ok / „Chłodzi słabo” → problem / „Nie chłodzi” → problem
- **Na listę uwag:** „Klimatyzacja nie chłodzi lub sprężarka się nie załącza”
- Tagi: elektryka, klimatyzacja

#### `p4s4i3` Dmuchawa, kierunki nawiewu, ogrzewanie szyb i foteli  
_[ŻÓŁTA]_

- **Jak:** Przełącz dmuchawę przez wszystkie biegi (piski, brak jednego biegu), zmień kierunek nawiewu (szyba/twarz/nogi — klapki mają przełączać), włącz ogrzewanie tylnej i przedniej szyby (obserwuj kontrolki, po chwili dotknij szyby), podgrzewanie foteli.
- **Dlaczego:** Niesprawna dmuchawa czy klapki to demontaż połowy deski — kosztowny w robociźnie.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne elementy nawiewu/ogrzewania”
- Tagi: elektryka

#### `p4s4i4` Światła i wycieraczki — poproś sprzedawcę o pomoc  
_[ŻÓŁTA]_

- **Jak:** Sprzedawca włącza, Ty obchodzisz auto: pozycyjne, mijania, drogowe, przeciwmgielne przód/tył, kierunkowskazy i awaryjne, światła stop (wszystkie, z trzecim), cofania, tablicy. Potem wycieraczki na każdym biegu i spryskiwacze przód/tył (pióra bez smużenia, ramiona bez luzu).
- **Dlaczego:** Brak jednej żarówki to drobiazg; wilgotna lampa i gnijąca wtyczka za nią — już nie.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne oświetlenie lub wycieraczki/spryskiwacze”
- Tagi: elektryka, swiatla

#### `p4s4i5` Radio, ekran, kamera, czujniki parkowania, USB/Bluetooth  
_[INFO]_

- **Jak:** Włącz system multimedialny: ekran bez martwych pól, dźwięk ze wszystkich głośników (balans/fader), kamera cofania (ostrość, brak pasów), czujniki parkowania (zbliż dłoń do każdego), sparuj telefon, sprawdź gniazda USB/12 V. Komunikaty błędów na ekranie sfotografuj.
- **Dlaczego:** Elektronika komfortu jest droga w naprawie i często pierwsza pada po zalaniu.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne multimedia/kamera/czujniki”
- Tagi: elektryka

#### `p4s4i6` Deska rozdzielcza: spasowanie, ślady demontażu, pokrywa poduszki pasażera  
_[CZERWONA · zdjęcie]_

- **Jak:** Przejedź palcem po łączeniach deski i konsoli: nierówne szczeliny, poluzowane panele, rysy od podważania przy krawędziach, śruby ze śladami. Pokrywa poduszki pasażera i okolice słupków (kurtyny): inny odcień, inna faktura, nierówna szczelina, luźna podsufitka przy słupkach = poduszki wystrzeliły i ktoś je „zamknął”.
- **Dlaczego:** Wystrzeloną poduszkę można wyciąć i zakleić — kontrolka też się „naprawi”. Zostaje spasowanie.
- **Odpowiedzi:** „Fabryczna” → ok / „Ślady demontażu” → uwaga / „Pokrywa poduszki inna / krzywa” → problem
- **Na listę uwag:** „Ślady demontażu deski/pokryw poduszek (możliwa wymiana po wypadku)”
- Tagi: airbag, bezpieczenstwo, nadwozie

### Pasy, poduszki, fotele

#### `p4s5i1` Pasy: wysuń każdy do końca, sprawdź taśmę, zwijanie i blokadę  
_[CZERWONA · zdjęcie]_

- **Jak:** Wyciągnij pas do samego końca: taśma bez przetarć, nadpaleń, postrzępionych brzegów, plam; etykieta z datą produkcji zbliżoną do roku auta (jeden pas z inną datą = wymieniony). Puść — ma się zwinąć sam, równo. Szarpnij mocno — ma zablokować. Pas, który nie zwija się lub jest „sztywny” po napięciu, mógł zadziałać w wypadku (napinacz).
- **Dlaczego:** Pas z wystrzelonym napinaczem wygląda normalnie i nie zadziała, gdy będzie potrzebny.
- **Odpowiedzi:** „Wszystkie w porządku” → ok / „Wolno się zwijają” → uwaga / „Przetarte / nie blokują / przycięte” → problem
- **Na listę uwag:** „Pas bezpieczeństwa uszkodzony, wymieniony lub bez blokady/zwijania”
- Tagi: bezpieczenstwo, pasy

#### `p4s5i2` Poduszka w kierownicy: spasowanie, faktura, rysy wokół emblematu  
_[CZERWONA · zdjęcie]_

- **Jak:** Obejrzyj z bliska moduł poduszki w kierownicy: równa szczelina dookoła, ta sama faktura i odcień co wieniec, brak rys od podważania, emblemat prosto. Inne wykończenie, „obce” logo, luźny moduł — poduszka była wymieniana (po wypadku) albo zastąpiona atrapą.
- **Dlaczego:** Atrapa poduszki w kierownicy to najgroźniejsza oszczędność na rynku wtórnym.
- **Odpowiedzi:** „Fabryczna” → ok / „Nie umiem ocenić” → uwaga / „Rysy / inna faktura / luźny moduł — diagnostyka SRS” → problem
- **Na listę uwag:** „Moduł poduszki kierowcy ze śladami wymiany/demontażu”
- Tagi: airbag, bezpieczenstwo

#### `p4s5i3` Fotele i kanapa: regulacje, blokady, podgrzewanie, ISOFIX  
_[INFO]_

- **Jak:** Przesuń każdy fotel we wszystkich kierunkach (elektryczne — każdy silnik), sprawdź blokadę oparcia, podgrzewanie, składanie tylnej kanapy (blokady wracają?), zaczepy ISOFIX (są i nie są powyginane), zagłówki.
- **Dlaczego:** Zablokowany fotel czy niesprawny silnik regulacji to niewygoda, którą zapłacisz przy każdej jeździe.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne regulacje foteli/kanapy”
- Tagi: wnetrze

### Bagażnik i OBD2

#### `p4s6i1` Koło zapasowe lub zestaw naprawczy, podnośnik, klucz, śruba zabezpieczająca  
_[ŻÓŁTA]_

- **Jak:** Sprawdź, czy jest koło zapasowe/dojazdowe (ciśnienie? DOT?) albo zestaw naprawczy (data ważności uszczelniacza), podnośnik, klucz do kół i — jeśli felgi mają śruby zabezpieczające — adapter do nich. Brak adaptera oznacza, że kół nie zdejmiesz nigdzie poza specjalistycznym warsztatem.
- **Dlaczego:** Pierwsza guma bez klucza do śrub zabezpieczających to lekcja, której lepiej nie brać.
- **Odpowiedzi:** „Komplet” → ok / „Brakuje czegoś” → uwaga
- **Na listę uwag:** „Brak koła zapasowego/zestawu, podnośnika lub adaptera do śrub zabezpieczających”
- Tagi: bagaznik, wyposazenie

#### `p4s6i2` OBD2 (opcjonalnie): błędy, monitory gotowości, przebieg w sterownikach  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Podłącz czytnik pod deską (zwykle nad pedałami), włącz zapłon, uruchom aplikację. Odczytaj błędy zapisane i oczekujące („pending”). Zajrzyj w „monitory gotowości/readiness”: większość „niegotowa/not ready” oznacza, że niedawno kasowano błędy — albo odłączano akumulator, albo auto nie przejechało pełnego cyklu; zapytaj o powód. Odczyt przebiegu ze sterownika zależy od modelu i aplikacji — jeśli jest, porównaj z licznikiem.
- **Dlaczego:** Kasowanie błędów przed oględzinami to standardowy zabieg — monitory gotowości go zdradzają.
- **Odpowiedzi:** „Czysto, monitory gotowe” → ok / „Monitory niegotowe / błędy oczekujące — zapytaj o powód” → uwaga / „Zapisane błędy” → problem; pominięcie: „Nie mam czytnika”
- **Na listę uwag:** „OBD2: zapisane błędy lub ślady kasowania błędów tuż przed oględzinami”
- Tagi: obd, elektryka

#### `p4s6i3` Hybryda / elektryk: bateria wysokiego napięcia — raport stanu (SOH), komunikaty, ładowanie  
_[CZERWONA · zdjęcie]_

- **Jak:** Poproś o raport stanu baterii (SOH) z serwisu lub aplikacji diagnostycznej i o historię serwisową układu wysokiego napięcia. Na zapłonie sprawdź, czy nie ma komunikatów o układzie hybrydowym / wysokiego napięcia. W elektryku i hybrydzie plug-in podłącz auto do ładowarki choćby na 5 minut: ładowanie ma ruszyć bez błędów. Obudowę baterii pod podłogą oceni tylko podnośnik — to zadanie dla serwisu, nie dla Ciebie. Nie dotykaj pomarańczowych przewodów.
- **Dlaczego:** Bateria to najdroższa część takiego auta, a wzrokiem nie ocenisz jej stanu — bez raportu kupujesz w ciemno.
- **Odpowiedzi:** „Raport SOH i brak komunikatów” → ok / „Brak raportu, bez komunikatów” → uwaga / „Komunikat układu HV / błąd ładowania / uszkodzona obudowa” → problem; pominięcie: „Nie dotyczy (spalinowe)”
- **Na listę uwag:** „Hybryda/EV: brak raportu stanu baterii lub błąd układu wysokiego napięcia”
- Tagi: naped, bateria

## 5. Pod maską — tylko na zimnym (10 min)

*Test zimnego silnika, płyny, wycieki, ślady napraw przodu, zimny start, dym, praca na jałowym*  
**Kiedy:** Silnik nieodpalany od kilku godzin; najpierw oglądasz na wyłączonym, dopiero potem prosisz o odpalenie

Zimny silnik nie umie kłamać: ciężki rozruch, stuki, dym i nierówna praca znikają po kilku minutach grzania. Dlatego najpierw wszystko oglądasz na wyłączonym silniku, a odpalasz na końcu tej fazy — stojąc przy masce, nie w środku.

### Na wyłączonym, zimnym silniku

#### `p5s1i1` Czy silnik naprawdę jest zimny: wskaźnik temperatury, wentylator, odczyt OBD  
_[ŻÓŁTA]_ [szybki filtr]

- **Jak:** Nie dotykaj elementów silnika, żeby to sprawdzić — nie musisz. Zanim ktokolwiek odpali: po włączeniu zapłonu wskaźnik temperatury ma być na samym dole, wentylator chłodnicy nie pracuje, nie słychać „tykania” stygnącego metalu; jeśli masz czytnik OBD, odczytaj temperaturę płynu — ma być zbliżona do temperatury otoczenia. Ciepły silnik mimo umowy nie dowodzi wady, ale odbiera Ci test zimnego startu: zapisz to i albo umów się jeszcze raz na rano, albo pamiętaj, że rozruch oceniasz na ciepłym.
- **Dlaczego:** Na ciepłym silniku znika połowa objawów: stuki, dym, nierówna praca, ciężki rozruch — ocena jest wtedy niepełna.
- **Odpowiedzi:** „Zimny” → ok / „Ciepły — test zimnego startu utracony” → uwaga
- **Na listę uwag:** „Silnik rozgrzany przed oględzinami — zimny start niesprawdzony”
- Tagi: silnik, zimny

#### `p5s1i2` Świeżo umyty silnik — podejrzane, nie „zadbane”  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Kilkuletni silnik ma równą warstwę kurzu. Komora lśniąca, mokra w zakamarkach, z zaciekami środka do plastików, bez pyłu na wiązkach — myta tuż przed sprzedażą. Powód zwykle jeden: wycieki, których nie masz zobaczyć. W takim aucie wycieków szukaj po jeździe próbnej (na ciepłym pojawiają się szybciej).
- **Dlaczego:** Kurz jest Twoim sprzymierzeńcem — na nim widać każdy świeży wyciek.
- **Odpowiedzi:** „Naturalnie zakurzony” → ok / „Świeżo umyty” → uwaga
- **Na listę uwag:** „Komora silnika świeżo umyta (ukrywanie wycieków)”
- Tagi: silnik, wycieki

#### `p5s1i3` Wycieki: pokrywa zaworów, uszczelki, turbo, styk silnika ze skrzynią  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Poświeć latarką na: łączenie pokrywy zaworów z głowicą, okolice filtra oleju, miskę od góry i od dołu, przewody turbo i intercoolera (tłuste wnętrze przewodów), styk silnika ze skrzynią (od dołu), chłodnicę i przewody (białe/zielone/rdzawe zacieki), pompę wspomagania. Mokre, tłuste, z przyklejonym kurzem — to wyciek, nie „pocenie”.
- **Dlaczego:** Każdy wyciek ma cenę naprawy — a najtańsze z nich sprzedawca „nie zauważył”.
- **Odpowiedzi:** „Sucho” → ok / „Pocenie” → uwaga / „Wyraźne wycieki” → problem
- **Na listę uwag:** „Wycieki oleju/płynów w komorze silnika”
- Tagi: silnik, wycieki

#### `p5s1i4` Olej: bagnet — poziom, kolor, konsystencja, drobinki  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Wyjmij bagnet, wytrzyj ręcznikiem papierowym, włóż, wyjmij: poziom między min a max (bardzo niski = auto bierze olej lub zaniedbanie; nad max = dolewany „na oko” lub paliwo w oleju). Kolor sam w sobie niewiele mówi (w dieslu olej ciemnieje od razu). Rozetrzyj kroplę na białym papierze i powąchaj: metaliczne drobinki, piana, mleczny kolor, wyraźny zapach paliwa — poważny sygnał.
- **Dlaczego:** Olej to krwiobieg silnika — jego stan mówi, jak auto było traktowane przez ostatnie tysiące kilometrów.
- **Odpowiedzi:** „Poziom w normie, bez zanieczyszczeń” → ok / „Poziom niski lub nad max” → uwaga / „Drobinki / piana / mleczny / zapach paliwa” → problem
- **Na listę uwag:** „Olej: zły poziom lub zanieczyszczenia (drobinki, piana, emulsja, paliwo)”
- Tagi: silnik, olej

#### `p5s1i5` Korek wlewu oleju od spodu: majonez/emulsja lub gruby nagar  
_[CZERWONA · zdjęcie]_ [szybki filtr]

- **Jak:** Odkręć korek wlewu oleju (tylko na zimnym silniku), obejrzyj spód i szyjkę latarką. Kremowy nalot („majonez”) to woda w oleju: przy samych krótkich trasach zimą bywa niewinną kondensacją; poważnie, gdy jest gęsty i idzie w parze z ubytkiem płynu chłodniczego, przegrzewaniem albo olejem w zbiorniczku płynu. Gruby czarny szlam i nagar w szyjce = wymiany oleju robione rzadko. Czysty metal z cienkim filmem oleju = w porządku.
- **Dlaczego:** Emulsja pod korkiem to jeden z niewielu objawów uszczelki pod głowicą widocznych bez narzędzi.
- **Odpowiedzi:** „Czysty” → ok / „Lekki nalot / kropelki (krótkie trasy)” → uwaga / „Gęsty majonez + ubytek płynu lub olej w zbiorniczku” → problem
- **Na listę uwag:** „Emulsja pod korkiem wlewu oleju lub gruby nagar (zaniedbanie/uszczelka pod głowicą)”
- Tagi: silnik, olej

#### `p5s1i6` Płyn chłodniczy: poziom, kolor, oleista warstwa, osad  
_[CZERWONA · zdjęcie]_

- **Jak:** NIGDY nie odkręcaj korka zbiorniczka ani chłodnicy na ciepłym lub gorącym silniku — układ jest pod ciśnieniem, grozi poparzeniem wrzątkiem. Oceniaj przez ścianki zbiorniczka wyrównawczego: poziom między min a max, płyn klarowny w jednym kolorze (różowy/niebieski/zielony/żółty — zależy od producenta). Rdzawy, brązowy, mętny = zaniedbany układ. Tłusta tęczowa warstwa na powierzchni, piana albo mazista brązowa breja = olej w płynie (uszczelka pod głowicą, chłodnica oleju).
- **Dlaczego:** Olej w chłodnicy to remont, a nie „dolewka”.
- **Odpowiedzi:** „Klarowny, poziom między min a max” → ok / „Niski / mętny / rdzawy” → uwaga / „Olej, piana lub mazista breja” → problem
- **Na listę uwag:** „Płyn chłodniczy zanieczyszczony olejem lub mocno zaniedbany”
- Tagi: silnik, chlodzenie

#### `p5s1i7` Paski osprzętu i rolki: pęknięcia, strzępienie, ślady poślizgu  
_[ŻÓŁTA]_

- **Jak:** Poświeć na pasek wieloklinowy: poprzeczne pęknięcia, wystrzępione brzegi, błyszcząca „wyślizgana” powierzchnia, czarny pył na obudowach obok. Poruszaj rolką napinacza, jeśli jest dostępna (luz, hałas). Pasek rozrządu jest pod osłoną — jego stanu nie ocenisz; tu liczy się faktura z wymiany, o którą pytałeś w dokumentach.
- **Dlaczego:** Zerwany pasek osprzętu unieruchamia auto; zerwany rozrząd często kończy silnik.
- **Odpowiedzi:** „W porządku” → ok / „Spękane / strzępią się” → uwaga
- **Na listę uwag:** „Pasek osprzętu zużyty / brak potwierdzenia wymiany rozrządu”
- Tagi: silnik, paski

#### `p5s1i8` Akumulator: data, klemy, mocowanie, obudowa  
_[ŻÓŁTA]_

- **Jak:** Znajdź naklejkę z datą produkcji lub montażu (często na obudowie albo na naklejce serwisowej). Klemy bez białego/niebieskiego nalotu, dokręcone; akumulator przykręcony (nie luźny), obudowa bez wybrzuszeń i zacieków. Bardzo nowy akumulator w aucie „z małym przebiegiem” bywa znakiem, że auto długo stało lub ma problem z ładowaniem/prądem upływu.
- **Dlaczego:** Akumulator to koszt, który albo zapłacił sprzedawca, albo zapłacisz Ty w pierwszą mroźną noc.
- **Odpowiedzi:** „W porządku” → ok / „Stary / skorodowane klemy” → uwaga
- **Na listę uwag:** „Akumulator stary, skorodowane klemy lub ślady problemów z ładowaniem”
- Tagi: silnik, akumulator, elektryka

#### `p5s1i9` Ślady napraw przodu: kielichy, pas przedni, podłużnice, śruby  
_[CZERWONA · zdjęcie]_

- **Jak:** Z góry, w komorze silnika: kielichy amortyzatorów (równe, bez fałd i spawów), pas przedni i belka pod chłodnicą (proste, fabryczne zgrzewy), śruby błotników, maski i zderzaka. Ślady klucza na śrubach to ślad demontażu — ustal powód (naprawa po kolizji, ale też zwykły serwis, np. wymiana chłodnicy). Świeży lakier, inny odcień podkładu, uszczelniacz nałożony pędzlem — to już naprawa blacharska.
- **Dlaczego:** Naprawiony przód nie musi dyskwalifikować, ale „bezwypadkowy” z prostowanymi kielichami — tak.
- **Odpowiedzi:** „Fabrycznie” → ok / „Niepewne (zrób zdjęcie)” → uwaga / „Ślady napraw / ruszane śruby” → problem
- **Na listę uwag:** „Ślady naprawy przodu (kielichy/pas przedni/podłużnice)”
- Tagi: nadwozie, konstrukcja, wypadek

#### `p5s1i10` Płyn hamulcowy, przewody, wiązki: kolor, spękania, taśma izolacyjna  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Płyn hamulcowy: poziom między min a max; kolor to tylko obserwacja (bardzo ciemny = stary), stan naprawdę ocenia się przyrządem mierzącym zawartość wody — zapytaj o datę wymiany (zalecana co 2 lata). Przewody gumowe: spękania, pęcznienie. Wiązki elektryczne: taśma izolacyjna zamiast fabrycznych złączy, prowizorki.
- **Dlaczego:** Prowizorki w komorze to zapowiedź błędów elektrycznych, których nikt nie umie znaleźć.
- **Odpowiedzi:** „W porządku” → ok / „Stary płyn / spękane / taśma” → uwaga
- **Na listę uwag:** „Zaniedbane płyny/przewody lub prowizoryczne naprawy instalacji”
- Tagi: silnik, hamulce, elektryka

### Zimny start i praca na jałowym

#### `p5s2i1` Rozruch: odpala od razu, bez długiego kręcenia i kilku prób  
_[CZERWONA]_

- **Jak:** Poproś sprzedawcę o odpalenie, Ty stój z boku przy otwartej masce (albo z tyłu przy wydechu — patrz następny punkt), nie nad silnikiem. Silnik ma zaskoczyć w sekundę–dwie, bez kilku prób i bez zgrzytu rozrusznika. Ciężki zimny rozruch to zwykle początek droższej historii (wtryski, świece żarowe, kompresja, akumulator).
- **Dlaczego:** Zimny rozruch to jedyny test, którego nie da się powtórzyć po rozgrzaniu — dlatego tak o niego walczyłeś.
- **Odpowiedzi:** „Od razu” → ok / „Dłuższe kręcenie” → uwaga / „Kilka prób / zgrzyt rozrusznika” → problem
- **Na listę uwag:** „Ciężki zimny rozruch (długie kręcenie, kilka prób, przygazowywanie)”
- Tagi: silnik, start

#### `p5s2i2` Pierwsze 10 sekund: stuki, klekot, terkot, pisk paska  
_[CZERWONA]_

- **Jak:** Słuchaj z zewnątrz: metaliczny stukot lub klekot łańcucha/rolek w pierwszych sekundach, terkot popychaczy, który nie znika po pół minuty, głośny pisk paska, wycie z okolic pompy. Krótkie „szuranie” przy starcie, które natychmiast znika, bywa normalne; dźwięki, które trwają — nie.
- **Dlaczego:** Dźwięki zimnego startu to najtańsza diagnostyka silnika na świecie — pod warunkiem, że ktoś stoi przy masce.
- **Odpowiedzi:** „Cicho, równo” → ok / „Krótki stuk / pisk” → uwaga / „Stuki / klekot trwają” → problem
- **Na listę uwag:** „Niepokojące dźwięki przy zimnym starcie (stuki/klekot/terkot)”
- Tagi: silnik, start

#### `p5s2i3` Dym z wydechu przy starcie i przy przegazowaniu — jaki kolor?  
_[CZERWONA · zdjęcie]_ [szybki filtr]

- **Jak:** Stań z tyłu, z boku, przy starcie; potem poproś o 2–3 krótkie przegazowania — nie wdychaj spalin. Przezroczysta para na zimno, znikająca po chwili — normalna. Niebieskawy, ostro pachnący = spalanie oleju (turbo, uszczelniacze zaworów, pierścienie). Biały gęsty, słodkawy, nieznikający po rozgrzaniu = płyn chłodniczy w cylindrach. Czarny: w dieslu przy przegazowaniu — wtryski, dolot, filtr cząstek; w benzyniaku — zbyt bogata mieszanka (układ paliwowy). Nagraj krótki film.
- **Dlaczego:** Kolor dymu to język, w którym silnik mówi o swoich najdroższych częściach.
- **Odpowiedzi:** „Brak / chwilowa para na zimno” → ok / „Czarny przy przegazowaniu (diesel)” → uwaga / „Niebieski, biały gęsty lub czarny stały po rozgrzaniu” → problem
- **Na listę uwag:** „Dym z wydechu (niebieski/biały/czarny) przy starcie lub przegazowaniu”
- Tagi: silnik, dym

#### `p5s2i4` Bieg jałowy po 1–2 minutach: obroty stabilne, bez falowania i drgań  
_[ŻÓŁTA]_

- **Jak:** Zajrzyj na obrotomierz: wskazówka stoi w miejscu (lekko podwyższone obroty na zimnym to norma, potem opadają). Falowanie, przygasanie, wibracje przenoszące się na kierownicę i fotel, „potrząsanie” silnika na postoju (patrz na silnik przy otwartej masce — poduszki silnika).
- **Dlaczego:** Nierówna praca to wtryski, zapłon, dolot lub poduszki — żadne z nich nie jest tanie w zgadywaniu.
- **Odpowiedzi:** „Stabilny” → ok / „Faluje / drga” → uwaga
- **Na listę uwag:** „Nierówna praca na biegu jałowym / wibracje”
- Tagi: silnik

#### `p5s2i5` Zapachy: spalenizna, słodki glikol, paliwo, palony olej  
_[ŻÓŁTA]_

- **Jak:** Po minucie pracy przejdź wokół auta i zajrzyj pod maskę: słodki zapach = płyn chłodniczy wycieka na gorące części; zapach paliwa = nieszczelność (niebezpieczne); palony olej = wyciek na kolektor; spalona izolacja = elektryka.
- **Dlaczego:** Zapach wycieku dociera do Ciebie wcześniej niż jego plama.
- **Odpowiedzi:** „Brak” → ok / „Spalenizna / glikol / paliwo / olej” → uwaga
- **Na listę uwag:** „Wyraźny zapach paliwa/płynu chłodniczego/palonego oleju”
- Tagi: silnik, wycieki

#### `p5s2i6` Chłodzenie na postoju: temperatura rośnie stopniowo, brak bulgotania  
_[CZERWONA]_

- **Jak:** Nie dotykaj korka ani przewodów. Po kilku minutach pracy wskaźnik temperatury ma rosnąć stopniowo, wentylator włącza się dopiero po rozgrzaniu, w zbiorniczku nie ma bulgotania ani pęcherzy (patrz przez ścianki). Szybki wzrost temperatury, wentylator od razu na najwyższych obrotach, bulgotanie w zbiorniczku — problem układu chłodzenia lub uszczelki pod głowicą.
- **Dlaczego:** Bulgotanie w zbiorniczku to gazy spalinowe w układzie chłodzenia — czyli uszczelka pod głowicą.
- **Odpowiedzi:** „W normie” → ok / „Szybko rośnie / bulgocze” → problem
- **Na listę uwag:** „Objawy problemów z chłodzeniem (bulgotanie, przegrzewanie, wypychanie płynu)”
- Tagi: silnik, chlodzenie

#### `p5s2i7` Końcówka wydechu przed odpaleniem: osad w rurze (w dieslu z filtrem cząstek ma być czysto)  
_[ŻÓŁTA · zdjęcie]_

- **Jak:** Rób to TYLKO przed uruchomieniem, na zimnym silniku — nigdy przy pracującym ani gorącym wydechu. Przetrzyj wnętrze końcówki białą chusteczką. Benzyna: sucha, lekko szara — w porządku; czarna sucha sadza — bogata mieszanka; mokra, tłusta czerń — spalanie oleju. Diesel z filtrem cząstek (praktycznie każdy od ok. 2010 r.): rura ma być czysta lub tylko szara — gęsta czarna sadza oznacza filtr wycięty albo uszkodzony (auto bez filtra nie przejdzie badania, a odtworzenie kosztuje tysiące).
- **Dlaczego:** To, co zostaje w rurze, to to, czego silnik nie powinien wypuszczać — a w dieslu to najprostszy test, czy filtr cząstek w ogóle tam jest.
- **Odpowiedzi:** „Sucha, szara / czysta” → ok / „Czarna sucha sadza (benzyna)” → uwaga / „Mokra, tłusta — lub gruba sadza w dieslu z filtrem” → problem
- **Na listę uwag:** „Osad w końcówce wydechu: tłusty/oleisty lub gruba sadza w dieslu z filtrem cząstek”
- Tagi: silnik, dym

## 6. Jazda próbna (15 min)

*Zasady, sprzęgło i skrzynia, hamulce, zawieszenie, kierownica, hałasy, systemy, kontrola po jeździe*  
**Kiedy:** Po zimnym starcie; Ty za kierownicą, minimum 20–30 minut, różne drogi

Skrzyni, hamulców i zawieszenia nie sprawdzisz na parkingu. Radio wyłączone, na początku uchylone okno (słuchasz auta), potem zamknięte (słuchasz szumów). Nie rozmawiaj ze sprzedawcą w trakcie — to jego moment, żeby Cię zagadać. Każdy dźwięk, który usłyszysz raz, spróbuj wywołać drugi raz.

### Zasady bezpieczeństwa

#### `p6s1i1` Ty prowadzisz (jeśli się da); OC ważne; trasa 20–30 min: miasto, nierówna droga, szybsza trasa, parking  
_[ŻÓŁTA]_

- **Jak:** Weź prawo jazdy. Upewnij się (Historia pojazdu / ufg.pl), że auto ma ważne OC i badanie: szkody innych pokryje polisa auta, ale koszt uszkodzenia testowanego auta bez AC może obciążyć kierującego, zależnie od okoliczności i winy — jedź spokojnie. Powiedz sprzedawcy wprost: „Jadę spokojnie, mocniej hamuję tylko w bezpiecznym miejscu — uprzedzę”. Trasa: kawałek miasta z ruszaniem i zatrzymywaniem, nierówny odcinek (zawieszenie), szybsza droga (hałasy, stabilność), parking na pełny skręt. Dokumenty i pieniądze miej przy sobie, nie w aucie sprzedawcy.
- **Dlaczego:** Jasne zasady przed ruszeniem oszczędzają Ci kłótni po ewentualnej stłuczce, a pełna trasa pozwala usłyszeć to, czego nie słychać na parkingu.
- **Odpowiedzi:** „Ja prowadzę, OC ważne, pełna trasa” → ok / „Prowadzi sprzedawca / trasa skrócona” → uwaga / „Brak ważnego OC lub badania — nie jedź” → problem
- **Na listę uwag:** „Jazda próbna bez ważnego OC/badania albo bez pełnej trasy”
- Tagi: jazda, bezpieczenstwo

### Skrzynia manualna

#### `p6s2i1` Sprzęgło: załącza płynnie, nie ślizga się, nie szarpie  
_[CZERWONA]_

- **Jak:** Rusz kilka razy: płynnie, bez szarpania i drgań; punkt załączenia bywa różny w różnych autach, więc sam w sobie nie przesądza. Test ślizgania: na pustej prostej, przy ok. 50 km/h na 4. biegu wciśnij gaz do oporu — jeśli obroty rosną, a auto nie przyspiesza proporcjonalnie, sprzęgło się ślizga. Drgania i szarpanie przy ruszaniu = tarcza lub koło dwumasowe. Pedał bardzo ciężki, zapadający się lub „strzelający” — układ do naprawy.
- **Dlaczego:** Sprzęgło z dwumasą to jedna z droższych pozycji w aucie z manualem — i jedna z najczęściej „już prawie” zużytych przy sprzedaży.
- **Odpowiedzi:** „Płynnie, nie ślizga się” → ok / „Drgania / bardzo wysoko / ciężki pedał” → uwaga / „Ślizga się (obroty rosną, auto nie przyspiesza)” → problem; pominięcie: „Automat”
- **Na listę uwag:** „Sprzęgło ślizga się / drgania przy ruszaniu / nietypowa praca pedału”
- Tagi: skrzynia, sprzeglo

#### `p6s2i2` Biegi: bez zgrzytów, redukcje bez chrupania, wsteczny bez walki  
_[ŻÓŁTA]_

- **Jak:** Przełączaj wszystkie biegi w górę i w dół, w tym redukcje 4→3 i 3→2 przy prędkości (synchronizatory). Wsteczny ma wejść bez zgrzytu (po chwili na wciśniętym sprzęgle). Na odpuszczeniu gazu dźwignia nie może „wyskakiwać” z biegu; nie powinno być luzu i grzechotu dźwigni.
- **Dlaczego:** Zgrzyt przy redukcji to synchronizator — naprawa oznacza rozbieranie skrzyni.
- **Odpowiedzi:** „Wchodzą gładko” → ok / „Opór / chrupnięcie” → uwaga / „Zgrzyty / wypada” → problem; pominięcie: „Automat”
- **Na listę uwag:** „Zgrzyty/opory przy zmianie biegów lub bieg wyskakuje”
- Tagi: skrzynia

#### `p6s2i3` Koło dwumasowe: grzechot na jałowym, drgania przy niskich obrotach  
_[ŻÓŁTA]_

- **Jak:** Na postoju, na luzie, wciśnij i puść sprzęgło: metaliczny grzechot, który pojawia się i znika ze sprzęgłem, to typowy objaw dwumasy. W jeździe: wibracje przy ok. 1000–1500 obr./min pod obciążeniem, stuk/„klang” przy gaszeniu silnika. Dwumasowe koło występuje w większości manualnych diesli i w części automatów — jeśli nie wiesz, czy to auto je ma, zapytaj.
- **Dlaczego:** Dwumasa nie psuje się nagle — daje znać dokładnie takimi dźwiękami.
- **Odpowiedzi:** „Cicho” → ok / „Grzechot na jałowym / drgania” → uwaga; pominięcie: „Nie dotyczy / nie wiem”
- **Na listę uwag:** „Objawy zużycia koła dwumasowego”
- Tagi: skrzynia, sprzeglo

### Skrzynia automatyczna

#### `p6s3i1` Zmiany biegów płynne na zimnym i ciepłym; D↔R bez stuku i zwłoki  
_[CZERWONA]_

- **Jak:** Najpierw ustal typ automatu, bo „normalne” zachowanie jest inne: klasyczny (hydrokinetyczny) pełza miękko i zmienia biegi płynnie; dwusprzęgłowy (DSG, DCT, PDK) zmienia błyskawicznie, ale przy pełzaniu w korku lekko wibruje — to cecha; bezstopniowy (CVT, e-CVT w hybrydach) nie ma biegów: przy przyspieszaniu trzyma równe, wysokie obroty — to nie usterka. Na postoju przełącz P→R→N→D z nogą na hamulcu: bieg ma się załączyć w ok. sekundę, bez szarpnięcia i stuku. W jeździe: bez szarpania, bez „zawieszania” na wysokich obrotach; redukcje bez uderzeń. Powtórz po rozgrzaniu.
- **Dlaczego:** Szarpiący automat to naprawa skrzyni, nie „adaptacja” — a to jedna z najdroższych pozycji w aucie.
- **Odpowiedzi:** „Płynnie (jak na swój typ)” → ok / „Zwłoka / szarpnięcie” → uwaga / „Stuki D↔R / szarpie / ślizga” → problem; pominięcie: „Manual / nie dotyczy”
- **Na listę uwag:** „Automat szarpie, zwleka z załączeniem biegu lub stuka przy D/R”
- Tagi: skrzynia, automat

#### `p6s3i2` Kickdown, tryb manualny, brak ślizgania  
_[CZERWONA]_

- **Jak:** Na pustej drodze wciśnij gaz do oporu: skrzynia ma zredukować od razu i przyspieszyć bez „wiszenia”. Sprawdź tryb manualny/łopatki, jeśli są (CVT może ich nie mieć — to nie wada). Ślizganie: obroty skaczą w górę, a auto nie przyspiesza proporcjonalnie — to poważny sygnał, koszt naprawy skrzyni liczy się w tysiącach. Zapach spalenizny po tym teście — również.
- **Dlaczego:** Ślizgająca się skrzynia automatyczna to koniec jej życia, nie usterka.
- **Odpowiedzi:** „Działa” → ok / „Ociąga się” → uwaga / „Ślizga się (obroty rosną, prędkość nie) / nie reaguje” → problem; pominięcie: „Manual / skrzynia bez tej funkcji”
- **Na listę uwag:** „Skrzynia automatyczna ślizga się lub nie reaguje na kickdown”
- Tagi: skrzynia, automat

#### `p6s3i3` Olej w automacie: kiedy wymieniany, jaki stan  
_[ŻÓŁTA]_

- **Jak:** Zapytaj o wymianę oleju w skrzyni z fakturą (przy dokumentach). Jeśli skrzynia ma bagnet — po rozgrzaniu sprawdź kolor i zapach: ciemnobrązowy, spalony zapach = zaniedbanie. „Olej na cały okres eksploatacji” w ustach sprzedawcy to hasło marketingowe, nie plan serwisowy.
- **Dlaczego:** Automat serwisowany żyje długo; nieserwisowany — do pierwszego ślizgania.
- **Odpowiedzi:** „Wymieniany, faktura” → ok / „„Bezobsługowy” / nie wie” → uwaga; pominięcie: „Manual / nie dotyczy”
- **Na listę uwag:** „Brak dowodu serwisu skrzyni automatycznej / olej spalony”
- Tagi: skrzynia, automat, serwis

### Silnik pod obciążeniem

#### `p6s4i1` Przyspieszenie: płynne, bez szarpania, dziur i „trybu awaryjnego”  
_[CZERWONA]_

- **Jak:** Przyspiesz zdecydowanie kilka razy (w tym z niskich obrotów na wyższym biegu). Szukaj: szarpania, „dziur” w mocy, nagłej utraty mocy (tryb awaryjny — kontrolka), nagłego głośnego wycia lub świstu przy przyspieszaniu (turbo — nie rozstrzygaj sam, zapisz), dymu w lusterku przy mocnym przyspieszeniu. W dieslu z filtrem cząstek: pytaj, jak auto jeździło — same krótkie trasy to problem, którego nie zobaczysz w 20 minut.
- **Dlaczego:** Na obciążeniu wychodzą wtryski, turbo, przepływomierz i skrzynia — wszystko, co drogie.
- **Odpowiedzi:** „Płynne” → ok / „Lekkie szarpanie / dziura” → uwaga / „Tryb awaryjny / szarpie” → problem
- **Na listę uwag:** „Silnik szarpie, traci moc lub dymi pod obciążeniem”
- Tagi: silnik, jazda

#### `p6s4i2` Kontrolki i temperatura w trakcie jazdy  
_[CZERWONA · zdjęcie]_

- **Jak:** W trakcie jazdy żadna kontrolka nie powinna się zapalić, a temperatura ma zostać w normalnym zakresie: w wielu autach wskazówka jest „buforowana” i stoi w miejscu, w innych lekko pływa — liczy się brak alarmu i brak wyraźnego przekroczenia zwykłego zakresu. Kontrolka w jeździe = zapisany błąd; zatrzymaj się bezpiecznie i zapisz, która.
- **Dlaczego:** Kontrolka, która mignęła raz, wróci — po zakupie.
- **Odpowiedzi:** „Nic, temperatura w normie” → ok / „Temperatura wyraźnie wyżej niż zwykle / pływa” → uwaga / „Zapaliła się kontrolka” → problem
- **Na listę uwag:** „Kontrolka zapala się w trakcie jazdy lub temperatura niestabilna”
- Tagi: silnik, kontrolki, jazda

### Hamulce

#### `p6s5i1` Mocniejsze hamowanie w bezpiecznym miejscu: prosto, pedał twardy, nie zapada się  
_[CZERWONA]_

- **Jak:** W bezpiecznym, pustym i legalnym miejscu (uprzedź sprzedawcę) zahamuj zdecydowanie z ok. 40–50 km/h — kontrolowanie, bez prowokowania manewru awaryjnego: auto ma zostać w torze (bez ściągania), pedał ma być twardy i nie zapadać się do podłogi; jeśli włączy się ABS, poczujesz pulsowanie w pedale — to normalne. Zrób to dwa razy. Po teście odczekaj kilka minut, zanim zaciągniesz hamulec postojowy — tarcze są gorące.
- **Dlaczego:** Hamulce testujesz Ty na parkingu albo los na skrzyżowaniu.
- **Odpowiedzi:** „Prosto, pedał twardy” → ok / „Lekko ściąga / wibracje” → uwaga / „Ściąga / pedał zapada się / kontrolka ABS” → problem
- **Na listę uwag:** „Auto ściąga przy hamowaniu / pedał zapada się / kontrolka ABS”
- Tagi: hamulce, bezpieczenstwo

#### `p6s5i2` Wibracje, piski, zgrzyty, „gąbczasty” pedał  
_[ŻÓŁTA]_

- **Jak:** Wibracje w kierownicy lub pedale przy hamowaniu (zwykle tarcze), piski i zgrzyty (klocki, tarcze), pedał miękki — zapada się bardziej niż byś oczekiwał albo zmienia punkt oporu między naciśnięciami (powietrze lub nieszczelność w układzie). Zapisz, przy jakiej prędkości.
- **Dlaczego:** Tarcze i klocki to konkretna pozycja do negocjacji — a gąbczasty pedał to zakaz dalszej jazdy.
- **Odpowiedzi:** „Brak” → ok / „Wibracje / piski” → uwaga / „Zgrzyty / gąbczasty pedał” → problem
- **Na listę uwag:** „Wibracje/piski/zgrzyty przy hamowaniu lub miękki pedał”
- Tagi: hamulce

#### `p6s5i3` Hamulec postojowy trzyma na wzniesieniu  
_[ŻÓŁTA]_

- **Jak:** Rób ten test po ostudzeniu hamulców (kilka minut po mocnym hamowaniu). Zatrzymaj się na pochyłości, zaciągnij (lub włącz elektryczny) i puść hamulec nożny: auto ma stać. Elektryczny: załącza i zwalnia bez komunikatów, słychać równą pracę silniczków po obu stronach; funkcja Auto Hold to nie to samo. Ręczny: nie „do sufitu”.
- **Dlaczego:** Niedziałający ręczny to najczęściej zapieczone linki lub zaciski — i pewne zastrzeżenie na badaniu technicznym.
- **Odpowiedzi:** „Trzyma” → ok / „Trzyma słabo” → uwaga / „Nie trzyma” → problem
- **Na listę uwag:** „Hamulec postojowy nie trzyma lub działa nierówno”
- Tagi: hamulce

### Zawieszenie i układ kierowniczy

#### `p6s6i1` Stuki na nierównościach: gdzie, kiedy, jaki dźwięk  
_[ŻÓŁTA]_

- **Jak:** Na dziurawym odcinku jedź wolno z uchylonym oknem. Głośny „klekot” przy małych nierównościach = łączniki stabilizatora lub tuleje; głuche, ciężkie stuki = amortyzatory, wahacze, poduszki; stuk przy hamowaniu na nierówności = luzy w wahaczach; stuk przy skręcie + nierówność = kolumna/łożysko amortyzatora. Zapamiętaj: przód czy tył, lewa czy prawa.
- **Dlaczego:** Konkretny opis stuku („lewy przód na małych dziurach”) to gotowa pozycja na listę dla mechanika i do negocjacji.
- **Odpowiedzi:** „Cicho” → ok / „Pojedyncze stuki” → uwaga / „Głośne / ciągłe” → problem
- **Na listę uwag:** „Stuki w zawieszeniu na nierównościach”
- Tagi: zawieszenie

#### `p6s6i2` Kierownica: luz, powrót po skręcie, auto jedzie prosto, kierownica prosto  
_[CZERWONA]_

- **Jak:** Na wprost, na płaskiej, pustej drodze na moment rozluźnij chwyt: auto ma trzymać kierunek. Kierownica w jeździe na wprost ma być prosto (krzywa = geometria lub prostowane po wypadku). Po skręcie kierownica ma sama wracać. Na postoju lekko kręć w lewo–prawo: koła reagują od razu, bez „martwego” luzu.
- **Dlaczego:** Auto, które ściąga lub ma krzywą kierownicę, mogło mieć „tylko geometrię” — albo uderzenie w koło.
- **Odpowiedzi:** „Prosto, bez luzu” → ok / „Lekki luz / ściąga” → uwaga / „Duży luz / krzywo” → problem
- **Na listę uwag:** „Auto ściąga na bok / luz na kierownicy / kierownica krzywo na wprost”
- Tagi: kierownica, zawieszenie

#### `p6s6i3` Skręt maksymalny na parkingu w obie strony, wolno  
_[CZERWONA]_

- **Jak:** Skręć kierownicę do oporu w lewo i jedź powoli po kółku, potem w prawo — krótko; nie trzymaj kierownicy długo na skrajnym położeniu (obciąża wspomaganie). Rytmiczne klikanie/stukanie z okolic koła = przegub napędowy (zewnętrzny) — sprawdź od razu osłony przegubów (tłuszcz na feldze od wewnątrz). Wycie/jęk przy skręcie na postoju = wspomaganie.
- **Dlaczego:** Stukający przegub to naprawa, ale rozerwana osłona ignorowana miesiącami to znak, jak auto było serwisowane.
- **Odpowiedzi:** „Cicho” → ok / „Lekkie stuki / piski” → uwaga / „Stuki / szarpanie” → problem
- **Na listę uwag:** „Stuki przegubów przy pełnym skręcie / hałas wspomagania”
- Tagi: zawieszenie, naped

#### `p6s6i4` Bujanie, „pływanie”, ściąganie pod hamowaniem  
_[ŻÓŁTA]_

- **Jak:** Po przejechaniu progu zwalniającego auto ma się ustabilizować po jednym ruchu, nie bujać dalej (amortyzatory). Na szybszej drodze nie powinno „pływać” ani wymagać ciągłych korekt. Przy hamowaniu z prędkości — brak ściągania w bok.
- **Dlaczego:** Zużyte amortyzatory wydłużają drogę hamowania — to nie komfort, to bezpieczeństwo.
- **Odpowiedzi:** „Stabilnie” → ok / „Buja / pływa” → uwaga / „Ściąga pod hamowaniem” → problem
- **Na listę uwag:** „Zużyte amortyzatory (bujanie, pływanie) lub niestabilność”
- Tagi: zawieszenie

### Hałasy zależne od prędkości i systemy

#### `p6s7i1` Buczenie/szum rosnący z prędkością — łożysko czy opony?  
_[ŻÓŁTA]_

- **Jak:** Na szybszej drodze, przy zamkniętych oknach, wyłącz radio. Hałas, który rośnie z prędkością i zmienia się przy lekkim skręcie (odciążasz koło: w lewo głośniej = prawa strona i odwrotnie), to najczęściej łożysko koła — ale może to być też opona, przekładnia lub wał; zapisz objaw, nie diagnozę. Hałas rosnący z obrotami silnika (nie z prędkością) = osprzęt, wydech. Szum jednostajny „zależny od nawierzchni” — zwykle opony.
- **Dlaczego:** Łożysko koła da się zlokalizować w minutę — i wpisać na listę uwag jako konkret.
- **Odpowiedzi:** „Brak” → ok / „Szum zależny od nawierzchni (opony)” → ok / „Buczenie rośnie z prędkością” → uwaga
- **Na listę uwag:** „Hałas rosnący z prędkością (łożysko koła, opona lub napęd — do sprawdzenia)”
- Tagi: zawieszenie, halas

#### `p6s7i2` Systemy: tempomat, asystenty, start-stop, 4×4, nagrzewnica po rozgrzaniu  
_[INFO]_

- **Jak:** Włącz tempomat (utrzymuje prędkość), asystenta pasa/martwego pola (reaguje, bez komunikatów o błędzie), start-stop (gasi i odpala), napęd 4×4 lub tryby jazdy, jeśli są. Po rozgrzaniu przełącz nawiew na ciepło: nagrzewnica ma grzać wyraźnie, a klimatyzacja po powrocie na zimno — chłodzić.
- **Dlaczego:** Niedziałający system to koszt; komunikat o błędzie asystenta to często ślad naprawy przodu lub wymiany szyby — patrz następny punkt.
- **Odpowiedzi:** „Wszystko działa” → ok / „Coś nie działa” → uwaga
- **Na listę uwag:** „Niesprawne systemy wspomagające / nagrzewnica lub klimatyzacja”
- Tagi: elektryka, systemy

#### `p6s7i3` Asystenty (ADAS): wymieniana szyba lub naprawa przodu = pytanie o kalibrację kamery i radaru  
_[ŻÓŁTA]_

- **Jak:** Zapytaj, czy wymieniano przednią szybę albo naprawiano przód (zderzak, grill, lampy). Jeśli tak — poproś o dokument kalibracji kamery/radaru po naprawie (robi to serwis, jest protokół). Brak komunikatu na desce nie potwierdza prawidłowej kalibracji. Na jeździe: asystent pasa i aktywny tempomat działają bez komunikatów o błędzie i nie reagują „po swojemu”.
- **Dlaczego:** Źle skalibrowana kamera lub radar działają, ale niedokładnie — a naprawa przodu, o której nikt nie wspomniał, to też informacja o historii auta.
- **Odpowiedzi:** „Brak wymian / jest dokument kalibracji” → ok / „Wymiana lub naprawa bez dokumentu kalibracji” → uwaga / „Aktywny błąd asystenta” → problem; pominięcie: „Auto bez asystentów”
- **Na listę uwag:** „ADAS: wymiana szyby lub naprawa przodu bez dokumentu kalibracji”
- Tagi: jazda, adas

### Po jeździe

#### `p6s8i1` Po 5 minutach postoju: wycieki pod autem, komora silnika, płyny  
_[CZERWONA · zdjęcie]_

- **Jak:** Zaparkuj na czystym, suchym miejscu i po kilku minutach zajrzyj pod auto (latarką) oraz pod maskę: świeże krople, mokre plamy na osłonach, zapach glikolu/oleju na gorącym silniku. Poziom w zbiorniczku płynu chłodniczego ma być w normie (nie odkręcaj korka na gorącym!), bez bulgotania i wypchniętego płynu.
- **Dlaczego:** Ciepły silnik pod ciśnieniem pokazuje wycieki, których na zimnym nie było.
- **Odpowiedzi:** „Sucho” → ok / „Pocenie” → uwaga / „Kapie / mokro” → problem
- **Na listę uwag:** „Wycieki lub objawy przegrzewania po jeździe próbnej”
- Tagi: silnik, wycieki, jazda

#### `p6s8i2` Dym i zapach na ciepłym, gorące koło, ponowny rozruch  
_[ŻÓŁTA]_

- **Jak:** Poproś o 2–3 przegazowania na ciepłym silniku i patrz na wydech z boku (niebieski dym na ciepłym = spalanie oleju). Nie dotykaj tarcz ani zacisków. Zbliż dłoń na kilka centymetrów do każdej felgi po kolei: jedno koło wyraźnie gorętsze od pozostałych i zapach spalenizny = zapieczony zacisk. Zgaś silnik, odczekaj minutę, odpal ponownie: ma zaskoczyć od razu, obroty jałowe stabilne.
- **Dlaczego:** Problem z rozruchem na ciepłym to inna usterka niż na zimnym — sprawdzasz obie.
- **Odpowiedzi:** „Nic” → ok / „Zapach / gorące koło” → uwaga / „Dym / trudny rozruch” → problem
- **Na listę uwag:** „Dym na ciepłym / przegrzane koło / problem z ponownym rozruchem”
- Tagi: silnik, hamulce, jazda

## 7. Podsumowanie i negocjacja (5 min)

*Lista uwag, pytania kontrolne, argumenty bez kwot, bezpieczna transakcja, kiedy odpuścić*  
**Kiedy:** Po jeździe próbnej, zanim padnie pierwsze słowo o cenie

Aplikacja zebrała Twoje uwagi w jedną listę. Teraz: policz czerwone, sprawdź, czy nie ma punktu „odpuść”, zdecyduj, czy potrzebny jest mechanik, i dopiero wtedy rozmawiaj o cenie — faktami z listy, nie emocjami. Na końcu: umowa, data i płatność tak, żeby nikt nie miał pola do kombinowania.

### Zanim powiesz cokolwiek o cenie

#### `p7s1i1` Przejrzyj listę uwag: ile czerwonych, czy jest punkt „odpuść”  
_[INFO]_

- **Jak:** Otwórz podsumowanie. Jeśli jest choć jeden punkt z kategorii „odpuść bez dyskusji” (VIN, właściciel, licznik, airbag, konstrukcja, zastaw) — nie negocjujesz, dziękujesz i wychodzisz; żadna cena tego nie naprawia. Jeśli nie ma — policz czerwone i żółte w fazach „Pod maską” i „Jazda próbna”.
- **Dlaczego:** Decyzję podejmujesz na chłodno z listą w ręku, nie na gorąco przy sprzedawcy.
- **Odpowiedzi:** „Przejrzane” → ok; pominięcie: „Pomiń”
- **Na listę uwag:** „Lista uwag nieprzejrzana przed rozmową o cenie”
- Tagi: podsumowanie

#### `p7s1i2` Pytania kontrolne: skonfrontuj odpowiedzi z telefonu z tym, co widziałeś  
_[ŻÓŁTA]_

- **Jak:** Wróć do notatek z rozmowy: przebieg, co lakierowane, od kiedy ma auto, szkody, serwis. Zestaw z tym, co zobaczyłeś i zmierzyłeś. Drobne rozbieżności zdarzają się każdemu; istotna rozbieżność (np. „nic nie lakierowane” przy dwóch elementach po naprawie) obniża wiarygodność wszystkiego, czego nie mogłeś sprawdzić.
- **Dlaczego:** Nie chodzi o przyłapanie — chodzi o to, czy możesz wierzyć w resztę tego, czego nie da się sprawdzić.
- **Odpowiedzi:** „Zgadza się” → ok / „Drobne rozbieżności” → uwaga / „Istotna rozbieżność między deklaracją a stanem” → problem
- **Na listę uwag:** „Sprzedawca zaprzecza faktom z oględzin lub zmienia wersję”
- Tagi: podsumowanie, sprzedawca

#### `p7s1i3` Mechanik/SKP przed pieniędzmi — jeśli warunki spełnione  
_[INFO]_

- **Jak:** Jedź na sprawdzenie, gdy: w „Pod maską” lub „Jeździe próbnej” pojawił się choć jeden problem, cokolwiek czerwonego poza dealbreakerami, auto jest drogie jak na Twój budżet, ma napęd, którego nie znasz (automat, hybryda, LPG), albo jest importowane bez historii. Płacisz Ty, decydujesz Ty. Jeśli sprzedawca stawia warunek „najpierw zaliczka, potem mechanik” — to on decyduje, nie Ty.
- **Dlaczego:** Godzina u mechanika kosztuje zawsze tyle samo; błąd przy zakupie — nie.
- **Odpowiedzi:** „Byliśmy na SKP / u mechanika” → ok / „Pomijam mimo zalecenia” → uwaga; pominięcie: „Nie było wskazań”
- **Na listę uwag:** „Zalecane sprawdzenie u mechanika/SKP pominięte”
- Tagi: podsumowanie, mechanik

### Argumenty i zasady negocjacji

#### `p7s2i1` Zasady negocjacji: fakty z listy, jedna uzasadniona propozycja, gotowość do odejścia  
_[INFO]_

- **Jak:** Negocjujesz faktami z raportu, nie opinią o aucie: „opony z 2019, brak faktury za rozrząd, klimatyzacja nie chłodzi” zamiast „auto jest zmęczone”. Składasz jedną propozycję z uzasadnieniem i milkniesz — kto pierwszy się odezwie, ten przegrywa. Twoim najsilniejszym argumentem jest gotowość do odejścia: ustal wcześniej cenę, powyżej której wychodzisz, i trzymaj się jej. Zamiast obniżki możesz negocjować rzeczy: komplet opon, świeże badanie techniczne przed odbiorem, serwis olejowy — wpisane do umowy.
- **Dlaczego:** Sprzedawca ma jedno auto, Ty masz kilka ogłoszeń — kto o tym pamięta, ten negocjuje spokojnie.
- **Odpowiedzi:** „Stosuję” → ok; pominięcie: „Pomiń”
- **Na listę uwag:** „Negocjacja bez listy faktów lub bez ustalonej ceny wyjścia”
- Tagi: negocjacja

### Bezpieczna transakcja

#### `p7s3i1` Zaliczka czy zadatek — tylko na piśmie, z warunkami  
_[ŻÓŁTA]_

- **Jak:** Jeśli rezerwujesz auto: pokwitowanie lub umowa przedwstępna z danymi stron, VIN i nr rej., kwotą, terminem finalizacji i warunkami zwrotu. Wiedz, co podpisujesz: zaliczka jest zwrotna; zadatek działa wg art. 394 Kodeksu cywilnego — jeśli to Ty bez uzasadnienia nie wykonasz umowy, sprzedawca może go zatrzymać, a jeśli on — możesz żądać podwójnej kwoty (chyba że umówiliście się inaczej lub umowę rozwiązano za zgodą obu stron). Nie wpłacaj nic „na konto kolegi” ani bez dokumentu.
- **Dlaczego:** Ustne „oddam, jak się rozmyślisz” nie ma żadnej wartości następnego dnia.
- **Odpowiedzi:** „Na piśmie, z warunkami” → ok / „Bez zaliczki” → ok / „Ustnie / bez warunków” → uwaga
- **Na listę uwag:** „Zaliczka/zadatek bez pisemnego potwierdzenia i warunków”
- Tagi: transakcja, umowa

#### `p7s3i2` Umowa: pełne dane, VIN, przebieg, wady wypisane, wszyscy właściciele  
_[CZERWONA · zdjęcie]_

- **Jak:** Dane stron przepisz z dokumentów tożsamości; VIN (lub numer nadwozia) i nr rej. z dowodu rejestracyjnego; stan drogomierza z licznika w dniu sprzedaży (zrób zdjęcie); cena słownie; data i godzina; oświadczenia sprzedawcy: że jest właścicielem lub jest uprawniony do sprzedaży, auto jest wolne od zastawu, leasingu, przewłaszczenia i praw osób trzecich, oraz LISTA znanych wad — konkretnie, punkt po punkcie. Liczba kluczyków i wydanych dokumentów. Dwa egzemplarze, podpisy wszystkich współwłaścicieli. Uwaga na sam zapis „kupujący zna stan techniczny i nie wnosi zastrzeżeń” bez listy wad: sprzedający nie odpowiada za wady, o których wiedziałeś, więc ogólnik ułatwia mu obronę; rękojmię między osobami prywatnymi reguluje osobna klauzula (wzór w dodatku „Po zakupie”).
- **Dlaczego:** Umowa to jedyny dokument, który zostaje, gdy sprzedawca przestanie odbierać telefon.
- **Odpowiedzi:** „Komplet danych, wady wpisane” → ok / „Czegoś brakuje” → uwaga / „Bez VIN / przebiegu / właścicieli” → problem
- **Na listę uwag:** „Umowa niekompletna lub z zapisem wyłączającym rękojmię bez listy wad”
- Tagi: transakcja, umowa

#### `p7s3i3` „Na wczoraj” — nie antydatuj umowy  
_[CZERWONA]_

- **Jak:** Sprzedawca prosi o wpisanie wcześniejszej daty (żeby uniknąć zgłoszenia zbycia, mandatów, kary za brak rejestracji lub OC)? Odmów. Data w umowie to data faktycznej sprzedaży: od niej liczysz 14 dni na PCC-3 (podatek płaci kupujący) i 30 dni na rejestrację. Fałszywa data sprowadza na Ciebie cudze mandaty, szkody i problemy podatkowe za okres między datami — i jest dowodem, który obraca się przeciwko Tobie w każdym sporze.
- **Dlaczego:** Kto prosi o fałszywą datę, prosi Cię o wzięcie na siebie jego problemów.
- **Odpowiedzi:** „Data prawdziwa” → ok / „Sprzedawca chce antydatować” → problem
- **Na listę uwag:** „Sprzedawca proponuje antydatowanie umowy („na wczoraj”)”
- Tagi: transakcja, umowa

#### `p7s3i4` Płatność i wydanie: wszystko w jednym momencie, z potwierdzeniem  
_[CZERWONA]_

- **Jak:** Przelew natychmiastowy lub BLIK z tytułem „zakup pojazdu [VIN]” po podpisaniu umowy i przy aucie; gotówkę wypłacaj razem w banku i licz przy sprzedawcy. Nigdy nie płać przed odbiorem. Jednocześnie odbierasz: auto, wszystkie kluczyki, dowód rejestracyjny, polisę OC, podpisaną umowę (Twój egzemplarz), książkę serwisową, faktury, ewentualne dokumenty z importu.
- **Dlaczego:** Pieniądze przekazane przed odbiorem dokumentów to pożyczka bez umowy.
- **Odpowiedzi:** „W jednym momencie, z potwierdzeniem” → ok / „Pieniądze przed dokumentami” → problem
- **Na listę uwag:** „Płatność bez jednoczesnego wydania auta, kluczyków i dokumentów”
- Tagi: transakcja, platnosc

### Kiedy odpuścić bez dyskusji

#### `p7s4i1` Odchodzisz, gdy pojawi się choć jedno z tego  
_[INFO]_

- **Jak:** VIN lub numer nadwozia niezgodny z dokumentami albo ze śladami ingerencji; sprzedawca nie wykazał prawa do sprzedaży (nie właściciel, bez pełnomocnictwa lub umów); auto figuruje jako kradzione albo ma zastaw/leasing/przewłaszczenie bez dokumentów zwolnienia; dowód zatrzymany lub auto wyrejestrowane; licznik niższy niż w Historii pojazdu bez udokumentowanej wymiany drogomierza; nieprawidłowy autotest kontrolki airbag; ślady spawania lub prostowania konstrukcji; zestaw śladów zalania; brak jakiejkolwiek jazdy próbnej i brak zgody na niezależne sprawdzenie; prośba o antydatowanie umowy połączona z presją „dziś albo nigdy”. Żadna z tych rzeczy nie jest tematem do negocjacji ceny.
- **Dlaczego:** Najlepsza negocjacja przy takim aucie to ta, której nie zaczynasz.
- **Odpowiedzi:** „Przeczytane” → ok; pominięcie: „Pomiń”
- **Na listę uwag:** „Zignorowano sygnał „odpuść bez dyskusji””
- Tagi: podsumowanie, dealbreaker

## Scenariusz rozmowy ze sprzedawcą (pełny)

Ta rozmowa ma dwa cele: odsiać auto, do którego nie warto jechać, i ustalić warunki oględzin — zimny silnik, dokumenty na stole, jazda próbna, godzina. Dzwoń, nie pisz: przez telefon słychać wahanie, a każdą odpowiedź zapisz, bo jutro zderzysz ją z dokumentami, miernikiem i licznikiem.

### Zanim zadzwonisz

- Ogłoszenie otwarte przed sobą i „Dane z ogłoszenia” wpisane (krok 1) — każdą odpowiedź porównujesz z tym, co sprzedawca sam napisał.
- Kalendarz: 2–3 terminy, w które możesz przyjechać rano lub przed południem (za dnia, na zimny silnik).
- Czas: 8–12 minut, ciche miejsce, ta aplikacja otwarta na tym kroku — odpowiedzi zaznaczasz w trakcie, nie po.
- Zapisuj dosłownie cztery rzeczy: przebieg, co było lakierowane, od kiedy ma auto, powód sprzedaży. Jutro te cztery zdania zderzysz z faktami.

### Do kogo dzwonisz? → Osoba prywatna

Właściciel z ogłoszenia. Najpierw upewnij się, że to nie handlarz.

- Otwarcie: „Dzień dobry, dzwonię w sprawie [marka model] z ogłoszenia za [cena]. Jest aktualne? Mam kilka pytań, żeby nie jechać na darmo — zajmie to kilka minut, może być?”
- **Sygnały, że to może być handel** — Handlarz udający osobę prywatną to najczęstsza ściema w ogłoszeniach. Trzy pytania — zaznacz, jak brzmi odpowiedź. To sygnały, nie wyrok:
  - Od kiedy ma Pan/Pani to auto? — Rok, dwa i dłużej = osoba prywatna. Kilka tygodni albo „dwa–trzy miesiące” = najpewniej handel (kupił, żeby sprzedać). „Nie pamiętam” też liczy się jako handel. (odpowiedzi: „Rok i dłużej” / „Tygodnie / miesiące / nie pamięta”)
  - Auto jest zarejestrowane na Pana/Panią? Kto jest w dowodzie? — Właściciel z dowodu = prywatny. „Sprzedaję dla brata / znajomego / szwagra” bez słowa o pełnomocnictwie = handlarz albo podstawiona osoba. (odpowiedzi: „Na niego / na nią” / „„Dla znajomego / rodziny””)
  - Gdzie mogę obejrzeć auto — pod domem czy na placu? — Pod domem, na osiedlowym parkingu = prywatny. Plac, komis, hala z kilkoma autami, „pod marketem, bo tam mam auta” = firma, choćby w ogłoszeniu było „prywatnie”. (odpowiedzi: „Pod domem” / „Plac / komis / „pod marketem””)
  - Werdykt: Dwie z trzech odpowiedzi wskazują na handel? Ustal, kto będzie stroną umowy — osoba czy firma (NIP, faktura VAT / VAT marża czy umowa z „poprzednim właścicielem”) — przełącz na „Handlarz / komis” i pytaj dalej jak firmę. Nie kończ rozmowy — po prostu wiesz, z kim mówisz.

### Do kogo dzwonisz? → Handlarz / komis

Firma, plac, „auto z importu”. Rozmawiasz o dokumentach i odpowiedzialności, nie o sentymencie.

- Otwarcie: „Dzień dobry, dzwonię w sprawie [marka model] z ogłoszenia. Zanim przyjadę, chcę ustalić kilka rzeczy o pochodzeniu auta i dokumentach — kto sprzedaje: firma na fakturę czy osoba prywatna na umowę?”
- Pytanie do firmy: Sprzedaż na fakturę VAT, VAT marża czy umowę kupna-sprzedaży? Kto będzie stroną umowy? — „Umowa z poprzednim właścicielem” = komis unika odpowiedzialności; wtedy formalnie kupujesz od nieznanej osoby.
- Pytanie do firmy: Skąd jest to auto: import własny, skup od klienta, aukcja? Są dokumenty z zagranicy i historia serwisowa? — „Z Niemiec od dziadka” bez papierów; brak dokumentów sprzed rejestracji w PL.
- Pytanie do firmy: Jaką odpowiedzialność bierze firma za wady po zakupie? Rękojmia, gwarancja pisemna, czy nic? — „Auto używane, jak widać” — zapisz dosłownie. Odpowiedź mówi, jak skończy się każdy spór.

Nie wiesz? Wybierz „Osoba prywatna” — pierwsze trzy pytania i tak sprawdzą, czy po drugiej stronie nie ma handlarza.

### 12 pytań

1. **Czy jest Pan/Pani właścicielem wpisanym w dowodzie rejestracyjnym? Czy jest współwłaściciel? Może mi Pan/Pani wysłać zdjęcie dowodu (VIN, nr rejestracyjny, data pierwszej rejestracji)?**  
   Na co uważać: „Sprzedaję dla brata/znajomego” bez słowa o pełnomocnictwie; „firma, ale sprzedaję prywatnie”. Niechęć do podania VIN-u przed spotkaniem to częsta ostrożność — sprawdzisz na miejscu; odmowa jakiejkolwiek weryfikacji przed zapłatą to koniec.  
   Gdy kręci: „Rozumiem, to zapytam wprost: czyje nazwisko jest w dowodzie rejestracyjnym i czy ta osoba będzie przy podpisaniu umowy?” Jeśli i teraz nie pada nazwisko — nie jedziesz.  
   Odpowiedzi: „Właściciel, poda VIN” → ok / „Właściciel, VIN dopiero na miejscu” → uwaga / „Ktoś inny bez pełnomocnictwa / nie chce mówić” → problem
2. **Od kiedy ma Pan/Pani to auto i od kogo je Pan/Pani kupił(a)? Jest umowa lub faktura z tamtego zakupu?**  
   Na co uważać: Kilka tygodni lub miesięcy posiadania to sygnał handlu albo pytanie „dlaczego tak szybko sprzedaje?” — nie dowód; „z Niemiec od znajomego” bez dokumentów; brak poprzedniej umowy.  
   Gdy kręci: „Rozumiem, to zapytam wprost: w którym roku kupił(a) Pan/Pani to auto i czy pokaże mi Pan/Pani tamtą umowę na miejscu?” Brak roku albo „umowa gdzieś jest” znaczy, że sprzedawca zna to auto krócej, niż mówi — traktuj je jak auto z handlu i pytaj dalej o papiery.  
   Odpowiedzi: „Rok i dłużej, jest umowa” → ok / „Kilka miesięcy” → uwaga / „Tygodnie / „nie pamiętam” — zapytaj, dlaczego tak szybko” → uwaga
3. **Jaki jest dokładny przebieg na dziś i czym jest udokumentowany (książka, faktury, badania)?**  
   Na co uważać: Przebieg inny niż w ogłoszeniu o tysiące km, „książka się zgubiła”, brak faktur z przebiegami. Różnica kilkuset kilometrów od publikacji ogłoszenia jest naturalna.  
   Gdy kręci: „Rozumiem, to zapytam wprost: jaką dokładnie liczbę pokaże licznik, kiedy przyjadę?” Jeśli zamiast liczby pada „koło” albo „mniej więcej”, zapisz to dosłownie — jutro pierwsze, co robisz, to licznik kontra Historia pojazdu.  
   Odpowiedzi: „Dokładny + dokumenty” → ok / „Dokładny, bez dokumentów / „koło…”” → uwaga / „Wyraźnie inny niż w ogłoszeniu (tysiące km)” → problem
4. **Które elementy były lakierowane lub wymieniane i z jakiego powodu?**  
   Na co uważać: „Nic, bezwypadkowy” przy kilkuletnim aucie — zapisz dosłownie, porównasz z miernikiem; „tylko zderzak” bez powodu; irytacja przy pytaniu.  
   Gdy kręci: „Rozumiem, to zapytam wprost: czy jest choć jeden element, który był lakierowany albo wymieniany — choćby zderzak?” „Nic, na sto procent” przy kilkuletnim aucie zapisz dosłownie; jutro odpowie miernik, a Ty dowiesz się, ile są warte pozostałe zapewnienia.  
   Odpowiedzi: „Podał konkret i powód” → ok / „„Nic, bezwypadkowy” — zapisz, sprawdzisz miernikiem” → ok / „Irytacja / kręci” → uwaga
5. **Czy auto miało jakąkolwiek szkodę — także parkingową, likwidowaną z OC lub AC, w Polsce albo za granicą?**  
   Na co uważać: Rozróżnianie „wypadek” od „stłuczka”; „to nie była szkoda, tylko otarcie”; brak jasnego „nie”.  
   Gdy kręci: „Rozumiem, to zapytam wprost: czy była jakakolwiek szkoda zgłaszana do ubezpieczyciela — z Pana/Pani OC, z cudzego OC albo z AC?” Jeśli zamiast „nie” słyszysz wykład, co jest szkodą, a co „tylko otarciem”, przyjmij, że szkoda była, i jutro szukaj jej miernikiem.  
   Odpowiedzi: „Jasne „nie” albo opisał szkodę” → ok / „„To nie szkoda, tylko otarcie” — zapisz opis” → uwaga / „Nie chce mówić” → problem
6. **Czy auto jest sprowadzone? Kiedy zarejestrowano je w Polsce i jakie są dokumenty z zagranicy?**  
   Na co uważać: „Krajowe” przy dacie pierwszej rejestracji w Polsce sprzed kilku lat dla starszego auta; brak zagranicznych papierów; „tłumaczenie gdzieś jest”.  
   Gdy kręci: „Rozumiem, to zapytam wprost: w którym roku auto zostało po raz pierwszy zarejestrowane w Polsce i z jakiego kraju przyjechało?” Jeśli sprzedawca nie zna tej daty ani kraju, historia sprzed importu jest dla Ciebie pusta — to auto oglądasz tylko z płatnym raportem VIN i z planem na mechanika.  
   Odpowiedzi: „Krajowe / import z papierami” → ok / „Import, papiery „gdzieś są”” → uwaga / „Nie zna daty ani kraju” → uwaga
7. **Kiedy był ostatni serwis olejowy, wymiana rozrządu, sprzęgła lub oleju w automacie — i czy są na to faktury?**  
   Na co uważać: „Niedawno”, „w zeszłym roku u znajomego”; wszystko „robione”, nic udokumentowane.  
   Gdy kręci: „Rozumiem, to zapytam wprost: na co z tego ma Pan/Pani fakturę albo wpis w książce, a co było robione bez papieru?” Co nie ma dokumentu, traktuj jako niezrobione — i od razu wpisz na listę do rozmowy o cenie.  
   Odpowiedzi: „Faktury na rozrząd / olej” → ok / „„Robione”, bez papierów” → uwaga / „Nie wie / nic nie robione” → uwaga
8. **Czy jakaś kontrolka świeci lub świeciła w ostatnich miesiącach? Były kasowane błędy?**  
   Na co uważać: „Tylko czujnik”; „mechanik skasował i jest ok” bez naprawy i dokumentu; pytanie zwrotne „a czemu Pan pyta?”. Skasowanie po udokumentowanej naprawie to co innego niż skasowanie „żeby nie świeciło”.  
   Gdy kręci: „Rozumiem, to zapytam wprost: czy w ostatnim roku ktoś podłączał komputer do auta i kasował błędy — i po co?” Odpowiedź pytaniem („a czemu Pan pyta?”) to też odpowiedź: jutro sprawdzasz wszystkie kontrolki na zapłonie, a jeśli masz czytnik — monitory gotowości OBD2.  
   Odpowiedzi: „Nic nie świeciło” → ok / „Kasowane po naprawie — jest dokument” → uwaga / „Kasowane bez naprawy / świeci teraz / unika” → problem
9. **Czy auto ma ważne badanie techniczne i OC? Czy jest wolne od zastawu, leasingu i przewłaszczenia?**  
   Na co uważać: „Badanie zrobię przed sprzedażą”; „leasing spłacony, tylko jeszcze nie przepisany”; „OC się skończyło, bo stało”. Zwykły kredyt gotówkowy sprzedawcy nie obciąża auta — obciąża je zastaw rejestrowy, przewłaszczenie i leasing.  
   Gdy kręci: „Rozumiem, to zapytam wprost: do kiedy jest ważne badanie techniczne i czy w dowodzie rejestracyjnym jest jakakolwiek adnotacja albo współwłaściciel?” Jeśli sprzedawca musi „sprawdzić” daty we własnym aucie albo kluczy przy słowie „zastaw”, nie umawiaj się, dopóki nie przyśle zdjęcia dowodu.  
   Odpowiedzi: „Wszystko ważne, bez obciążeń” → ok / „Musi „sprawdzić”” → uwaga / „Brak badania lub OC / leasing / zastaw / przewłaszczenie” → problem
10. **Ile jest kluczyków i czy wszystkie działają (pilot, rozruch)?**  
   Na co uważać: Jeden kluczyk, „drugi został u poprzedniego właściciela”; pilot „tylko bateria”.  
   Gdy kręci: „Rozumiem, to zapytam wprost: ile kluczyków dostanę do ręki przy umowie — jeden czy dwa?” Jeden kluczyk to nie powód, żeby nie jechać, ale „drugi się znajdzie” zapisz jako „jeden” i wróć do tego przy cenie.  
   Odpowiedzi: „Dwa, działają” → ok / „Jeden” → uwaga / „„Drugi się znajdzie”” → uwaga
11. **Czy mogę przyjechać na zimny silnik (proszę nie odpalać przed moim przyjazdem), sam poprowadzić na jeździe próbnej i podjechać na SKP lub do mechanika?**  
   Na co uważać: Wykręty przy SKP lub mechaniku („nie mam czasu”, „już było sprawdzane”) ważą najwięcej — to jedyne niezależne sprawdzenie, jakie masz. „Jazda tylko ze mną za kierownicą” jest częsta i sama w sobie nie przekreśla auta — zaproponuj zasady i choć część trasy za Twoją kierownicą. Odmowa zimnego silnika odbiera Ci jeden test, nie całe auto.  
   Gdy kręci: „Rozumiem, to zapytam wprost: czy auto będzie stało nieodpalane od rana, czy mogę poprowadzić choć część trasy i czy możemy podjechać na stację diagnostyczną — tak czy nie na każde z trzech?” „Nie” na stację diagnostyczną i mechanika kończy rozmowę. „Nie” na jakąkolwiek jazdę z Tobą za kierownicą oznacza auto niesprawdzone w ruchu — jedziesz tylko z planem na podnośnik i z taką ceną.  
   Odpowiedzi: „Tak na wszystkie trzy” → ok / „Warunek przy jednym (np. jazda ze mną) / zimny silnik nie” → uwaga / „„Nie” na sprawdzenie u mechanika / na SKP” → problem
12. **Dlaczego sprzedaje Pan/Pani to auto i czy cena jest do rozmowy po oględzinach?**  
   Na co uważać: Powód niespójny z resztą („kupiłem 2 miesiące temu, ale zmieniam na większe”). „Cena ostateczna” to informacja o sprzedawcy, nie o aucie; presja „dziś decyzja” to technika sprzedaży — zapisz i nie daj się jej poganiać.  
   Gdy kręci: „Rozumiem, to zapytam wprost: jeśli po oględzinach pokażę konkretne uwagi, czy cena jest do rozmowy?” „Cena ostateczna, dużo chętnych, decyzja dziś” to presja, nie informacja — jeśli mimo to jedziesz, jedź z założeniem, że możesz wrócić bez auta.  
   Odpowiedzi: „Spójny powód, cena do rozmowy” → ok / „Powód niespójny” → uwaga / „Presja czasu („dużo chętnych, dziś decyzja”)” → uwaga

### Ustalenia przed rozłączeniem

Zanim się rozłączysz, ustal warunki spotkania. Zaznacz, co sprzedawca potwierdził:

- `p1s4i1` Silnik ma być zimny — powiedz to wprost — powiedz: „Przyjadę na zimny silnik — proszę go nie odpalać przed moim przyjazdem, nawet „żeby się nagrzał”.”
- `p1s4i2` Dokumenty na stole: wymień listę przez telefon — powiedz: „Proszę przygotować dowód rejestracyjny, umowę lub fakturę zakupu, książkę serwisową i faktury — chcę je zobaczyć na miejscu.”
- `p1s4i3` Jazda próbna: ustal, kto prowadzi i na jakich zasadach — powiedz: „Chciał(a)bym poprowadzić choć część trasy, 20–30 minut — pokażę prawo jazdy, jedziemy razem. Jeśli woli Pan/Pani prowadzić, w porządku, ale wtedy umówmy sprawdzenie na stacji diagnostycznej.”
- `p1s4i4` Miejsce i pora: dzień, sucho, płasko, da się obejść auto dookoła — powiedz: „Umówmy się za dnia, w miejscu, gdzie da się obejść auto dookoła i otworzyć wszystkie drzwi.”
- `p1s4i5` Zapowiedz: „jeśli się spodoba, jedziemy na SKP/do mechanika” — powiedz: „Jeśli auto mi się spodoba, pojedziemy razem na stację diagnostyczną albo do mechanika — na mój koszt.”

### Zamknięcie rozmowy

- Podsumuję, żebyśmy się dobrze rozumieli: przyjeżdżam [dzień] o [godzina], auto stoi nieodpalane od rana, na stole dowód rejestracyjny, dokument tożsamości, książka serwisowa i faktury, wszystkie kluczyki; jazdę próbną robimy razem, 20–30 minut, ja prowadzę choć część trasy. Zgadza się?
- Dziękuję, wyślę SMS-a z potwierdzeniem godziny. Gdyby coś się zmieniło, proszę dać znać wcześniej — jadę [X] km specjalnie do Pana/Pani.
- Gdy odpowiedzi dyskwalifikują: „Dziękuję za rozmowę i za szczerość. Na tym etapie to nie jest auto dla mnie — powodzenia ze sprzedażą.” Bez tłumaczenia się i bez wykładu, co jest nie tak.

### Szablony wiadomości (do skopiowania)

#### Pierwsza wiadomość (OLX/Otomoto)

> Dzień dobry, interesuje mnie [auto] z Pana/Pani ogłoszenia. Zanim umówię się na oględziny, poproszę o kilka rzeczy:
> – numer VIN (wystarczy sam numer — potrzebuję go do bezpłatnej Historii pojazdu),
> – aktualny przebieg i zdjęcie licznika,
> – informację, które elementy były lakierowane lub wymieniane i dlaczego,
> – jakie są faktury z serwisu (olej, rozrząd, sprzęgło/skrzynia).
> Czy auto będzie dostępne [dzień] przed południem? Chciał(a)bym zobaczyć je na zimnym silniku i przejechać się 20–30 minut. Z góry dziękuję i pozdrawiam, [imię]

#### Gdy sprzedawca nie podaje VIN

> Rozumiem, że nie chce Pan/Pani wysyłać zdjęcia dowodu. Wystarczą mi trzy dane: VIN, numer rejestracyjny i data pierwszej rejestracji — potrzebuję ich wyłącznie do bezpłatnego raportu na historiapojazdu.gov.pl (badania techniczne, odczyty licznika, status). VIN widać też przez przednią szybę na podszybiu, wystarczy zdjęcie tej tabliczki. Bez tych danych nie mogę umówić się na oględziny — nie mam jak sprawdzić auta przed dojazdem [X] km. Dziękuję z góry, [imię]

#### Potwierdzenie przed przyjazdem

> Dzień dobry, potwierdzam: [dzień] o [godzina], [adres]. Proszę nie odpalać auta przed moim przyjazdem — chcę zobaczyć zimny start. Poproszę o przygotowanie: dowodu rejestracyjnego, dowodu osobistego właściciela, poprzedniej umowy zakupu, książki serwisowej i faktur, wszystkich kluczyków oraz dokumentów z importu, jeśli auto było sprowadzone. Planuję jazdę próbną 20–30 minut razem z Panem/Panią, chciał(a)bym poprowadzić choć część trasy, a jeśli auto mi się spodoba — krótkie sprawdzenie na stacji diagnostycznej lub u mechanika w okolicy, za moje pieniądze. Gdyby coś się zmieniło, proszę o wiadomość wcześniej. Do zobaczenia, [imię]

#### Po oględzinach — oferta z listą uwag

> Dzień dobry, dziękuję za dzisiejsze oględziny [auto]. Auto mi się podoba, ale mam spisane rzeczy, które po zakupie biorę na siebie:
> [WKLEJ LISTĘ UWAG Z RAPORTU]
> Dlatego proponuję [KWOTA] zł, odbiór [dzień]: płatność przy podpisaniu umowy, komplet kluczyków i dokumentów w tym samym momencie. Jeśli obniżka nie wchodzi w grę, mogę rozważyć cenę bliższą Pana/Pani oczekiwaniom przy [np. komplecie opon / świeżym badaniu technicznym] przed odbiorem, wpisanym do umowy. Proszę o odpowiedź do [dzień, godzina]. Pozdrawiam, [imię]

### Gdy nie chcesz dzwonić

Nie lubisz dzwonić? Wiadomość daje mniej sygnałów niż telefon (nie słychać wahania ani zmyślania na bieżąco), ale jest lepsza niż nic — zadaj pisemnie koniecznie pytania 1, 3, 4, 5 i 11 (właściciel i VIN, dokładny przebieg, co lakierowane, szkody, zimny silnik i jazda próbna) i zachowaj odpowiedzi jako zrzut ekranu: jutro to Twój punkt odniesienia.

## Reguły podsumowania

### Odpuść bez dyskusji, gdy

- VIN (lub numer nadwozia) w dowodzie rejestracyjnym różni się od numeru na aucie — albo którykolwiek nosi ślady szlifowania, przebijania, przeklejania bez dokumentu
- Sprzedający nie wykazał prawa do sprzedaży: nie jest właścicielem z dowodu i nie ma pisemnego pełnomocnictwa ani umów nabycia; brak podpisu współwłaściciela
- Auto figuruje jako kradzione albo ma zastaw, leasing lub przewłaszczenie bez dokumentów zwolnienia; dowód rejestracyjny zatrzymany lub auto wyrejestrowane
- Przebieg na liczniku niższy niż ostatni odczyt w Historii pojazdu albo odczyty w rejestrze maleją — bez udokumentowanej wymiany drogomierza
- Kontrolka airbag nie zapala się przy zapłonie albo świeci stale (nieprawidłowy autotest), a sprzedający nie chce tego wyjaśnić diagnostyką przed zakupem
- Ślady spawania lub prostowania podłużnic, słupków, kielichów amortyzatorów, podłogi — bez zgody na ocenę przez blacharza lub rzeczoznawcę
- Zestaw śladów zalania: muł i linia wodna pod wykładziną, rdza na szynach foteli i śrubach, stęchlizna
- Poważna usterka hamulców lub układu kierowniczego, przegrzewanie, alarm ciśnienia oleju albo duży wyciek ujawnione na jeździe
- Brak jakiejkolwiek jazdy próbnej i brak zgody na sprawdzenie na SKP lub u mechanika — auto niesprawdzone w ruchu
- Sprzedawca żąda antydatowania umowy, zaliczki przed pokazaniem auta i dokumentów albo pieniędzy przed przekazaniem dokumentów

### Jedź do mechanika/SKP, gdy

- Choć jeden problem w etapach „Pod maską” i „Jazda próbna” (nie chodzi o liczbę uwag, tylko o ich wagę) — zwłaszcza dym, emulsja pod korkiem, wycieki, praca skrzyni, ściąganie przy hamowaniu
- Jakikolwiek punkt czerwony poza listą „odpuść”
- Ślady naprawy przodu lub tyłu (kielichy, pas przedni, wnęka koła zapasowego) przy deklaracji „bezwypadkowy”
- Auto z importu bez historii sprzed rejestracji w Polsce
- Napęd, którego nie znasz: automat (zwłaszcza dwusprzęgłowy lub bezstopniowy), hybryda lub elektryk bez raportu baterii, LPG bez dokumentów
- Cena to znacząca część Twojego budżetu albo nie znasz tej konstrukcji silnika/skrzyni
- Nie miałeś grubościomierza, a auto ma różnice odcieni lub nierówne szczeliny

### Negocjuj, gdy

- Elementy z podwyższonym odczytem lakieru wyjaśnione jako drobna naprawa (nie konstrukcja) — auto po naprawie, nie „bezwypadkowe” z ogłoszenia
- Opony stare wg DOT lub bieżnik bliski minimum — komplet do wymiany; różne opony na osi
- Brak faktury za rozrząd, sprzęgło, olej w automacie lub inny duży serwis przy przebiegu, który go wymaga
- Jeden kluczyk, brak koła zapasowego/zestawu, brak adaptera do śrub zabezpieczających
- Klimatyzacja nie chłodzi, drobne usterki elektryki, zaparowane lub zmatowiałe lampy, odprysk szyby
- Zlokalizowane stuki zawieszenia, buczenie łożyska, wibracje przy hamowaniu, zużyte klocki/tarcze
- Wycieki „pocące się”, stary akumulator, zaniedbane płyny, wydech do wymiany
- Badanie techniczne kończy się za mniej niż 2 miesiące albo ostatnie było zrobione tuż przed sprzedażą

### Gotowe zdania (bez kwot)

- Auto mi się podoba, ale lista rzeczy do zrobienia od razu jest konkretna: opony z [rok], brak drugiego kluczyka, klimatyzacja nie chłodzi. Biorę to na siebie, więc cena musi to uwzględnić.
- Dach ma [X] µm, drzwi i błotnik po prawej wyraźnie więcej — coś tam było. Nie mówię, że to dyskwalifikuje, ale kupuję auto po naprawie, nie „bezwypadkowe” z ogłoszenia.
- Rozrząd bez faktury traktuję jako niewymieniony — to pierwsza rzecz, którą będę musiał zrobić po zakupie.
- Mogę podjąć decyzję dziś, ale po sprawdzeniu u mechanika za moje pieniądze. Jeśli potwierdzi, że wszystko gra, wracamy do Pana ceny.
- Proponuję [kwota], bo na liście mam: [trzy najmocniejsze punkty]. Jeśli to nie wchodzi w grę, rozumiem — mam jeszcze dwa auta do obejrzenia.
- Zamiast obniżki: nowe opony i świeże badanie techniczne przed odbiorem, wpisane do umowy — wtedy jestem w stanie zaakceptować cenę bliżej Pana oczekiwań.
- Nie negocjuję na podstawie wycen z internetu — mówię o rzeczach, które oboje widzieliśmy przed chwilą.

### Zasady bezpiecznej transakcji

- Zaliczka lub zadatek tylko na piśmie: dane stron, VIN, kwota, termin finalizacji, warunki zwrotu. Zaliczka jest zwrotna, zadatek przepada, gdy Ty się wycofasz — wiedz, co podpisujesz.
- Umowa: dane stron z dokumentów tożsamości, VIN i nr rej. z dowodu, przebieg w dniu sprzedaży (zdjęcie licznika), cena, data i godzina, oświadczenie o własności i braku obciążeń, lista znanych wad, liczba kluczyków i wydanych dokumentów, podpisy wszystkich właścicieli, dwa egzemplarze.
- Nie podpisuj „kupujący zna stan techniczny i nie wnosi zastrzeżeń” bez wypisanych wad — między osobami prywatnymi to w praktyce wyłączenie rękojmi (nie chroni sprzedawcy przy podstępnym zatajeniu wady, ale to Ty będziesz to udowadniać).
- Nigdy „na wczoraj”: data umowy = data faktycznej sprzedaży. Od niej liczysz 14 dni na PCC-3 (podatek płaci kupujący przy zakupie od osoby prywatnej) i 30 dni na złożenie wniosku o rejestrację (kara pieniężna za spóźnienie).
- Płatność po podpisaniu umowy, przy aucie, jednocześnie z wydaniem: auta, wszystkich kluczyków, dowodu rejestracyjnego, OC, książki serwisowej, faktur i dokumentów z importu. Przelew z tytułem zawierającym VIN albo gotówka liczona przy sprzedawcy (najlepiej wypłacona razem w banku).
- Żadnych przelewów „na konto kolegi/żony”, żadnych „opłat rezerwacyjnych” bez dokumentu, żadnych płatności przed oględzinami.
- Po zakupie: PCC-3 w 14 dni, wniosek o rejestrację w 30 dni, powiadom ubezpieczyciela o nabyciu auta i zdecyduj, czy zostajesz przy przejętym OC, czy je wypowiadasz.

## Słowniczek

- **Wtopa** — Zakup auta, którego ukryte wady wychodzą po transakcji — najczęściej cofnięty licznik, naprawiona konstrukcja po wypadku, zastaw lub silnik/skrzynia do remontu.
- **Bezwypadkowy** — Słowo z ogłoszenia, nie kategoria prawna. W praktyce znaczy tyle, ile potwierdzą miernik lakieru, szczeliny, szyby i śruby. Auto po lakierowaniu zderzaka może być „bezwypadkowe”; auto z prostowanymi kielichami — nie.
- **Cofnięty licznik** — Zaniżony stan drogomierza. Wykrywasz go porównaniem: ogłoszenie ↔ odczyty z badań technicznych w Historii pojazdu ↔ licznik ↔ zużycie wnętrza. Zmiana wskazania drogomierza to przestępstwo (art. 306a kk).
- **Szpachla** — Masa wyrównująca nakładana pod lakier przy naprawie blacharskiej. Grubościomierz pokazuje na niej odczyty znacznie wyższe niż fabryczne; magnes słabo się trzyma.
- **Na zimnym** — Silnik nieodpalany od kilku godzin (w temperaturze otoczenia). Tylko wtedy słychać stuki, widać dym i ciężki rozruch, które znikają po rozgrzaniu.
- **Grubościomierz lakieru** — Miernik grubości powłoki w mikrometrach (µm). Tanie modele mierzą tylko stal (Fe); wersje Fe/NFe także aluminium. Plastików (zderzaki) nie zmierzy żaden zwykły miernik.
- **µm (mikrometr)** — Tysięczna część milimetra. Fabryczny lakier na stali to zwykle rząd 80–180 µm; wyraźnie wyższe wartości na pojedynczym elemencie oznaczają ponowne lakierowanie lub szpachlę.
- **Overspray** — Pył lakierniczy, który osiadł na uszczelkach, plastikach, śrubach lub w nadkolach podczas lakierowania w warsztacie — ślad naprawy, który przetrwa mycie.
- **VIN** — 17-znakowy numer identyfikacyjny pojazdu. Musi być identyczny w dowodzie rejestracyjnym (pole E), na podszybiu, na tabliczce znamionowej i wybity w nadwoziu.
- **Tabliczka znamionowa** — Metalowa tabliczka lub naklejka producenta (słupek drzwi, komora silnika) z VIN, masami i często kodem lakieru. Ślady przeklejania lub nowe nity to sygnał alarmowy.
- **Historia pojazdu (historiapojazdu.gov.pl)** — Bezpłatny raport rządowy z Centralnej Ewidencji Pojazdów: dane techniczne, właściciele, badania techniczne z odczytami licznika, OC, status rejestracji, kradzież. Potrzebujesz nr rej., VIN i daty pierwszej rejestracji.
- **CEP / CEPiK** — Centralna Ewidencja Pojazdów (i Kierowców) — urzędowa baza, z której korzysta Historia pojazdu, policja i stacje diagnostyczne.
- **DOT** — Oznaczenie na boku opony; ostatnie 4 cyfry to tydzień i rok produkcji (np. 2319 = 23. tydzień 2019 r.).
- **TWI** — Wskaźnik zużycia bieżnika — gumowe mostki w rowkach opony. Bieżnik zrównany z nimi oznacza minimum prawne (1,6 mm).
- **Dwumas (koło dwumasowe)** — Element między silnikiem a sprzęgłem tłumiący drgania. Zużyty grzechocze na jałowym przy wciskaniu sprzęgła i wibruje przy niskich obrotach.
- **Kielich amortyzatora** — Wzmocnione miejsce mocowania kolumny amortyzatora w nadwoziu (widoczne pod maską). Fale, szpachla lub świeży lakier na kielichu to ślad naprawy po poważnym uderzeniu.
- **Podłużnica** — Belka nośna biegnąca od zderzaka w głąb nadwozia. Spawana lub prostowana podłużnica = auto po ciężkim wypadku.
- **Emulsja / „majonez”** — Kremowy, jasnobrązowy osad pod korkiem wlewu oleju — woda zmieszana z olejem. Bywa efektem krótkich tras, ale często sygnalizuje uszczelkę pod głowicą.
- **Monitory gotowości (readiness)** — Statusy testów wewnętrznych sterownika silnika odczytywane przez OBD2. Po skasowaniu błędów są „niegotowe” — jeśli większość taka jest, ktoś niedawno kasował pamięć.
- **Rękojmia** — Odpowiedzialność sprzedawcy za wady. Między osobami prywatnymi można ją umownie wyłączyć (art. 558 kc), ale wyłączenie nie działa, gdy sprzedawca wadę podstępnie zataił. Przy zakupie od firmy jako konsument rękojmi nie da się wyłączyć.
- **Zadatek vs zaliczka** — Zaliczka jest zwrotna. Zadatek przepada, gdy wycofa się wpłacający, a należy się w podwójnej wysokości, gdy wycofa się druga strona (art. 394 kc).
- **PCC-3** — Deklaracja podatku od czynności cywilnoprawnych. Przy zakupie auta od osoby prywatnej kupujący składa ją i płaci podatek w 14 dni od umowy.
- **Adnotacje urzędowe** — Rubryka w dowodzie rejestracyjnym z wpisami typu ZASTAW, współwłaściciel, GAZ, HAK, L (nauka jazdy), TAXI, VAT.
- **SKP** — Stacja Kontroli Pojazdów — wykonuje badania techniczne; można tam za opłatą sprawdzić auto przed zakupem (hamulce, zawieszenie, luzy, światła).
- **Szkoda istotna** — Wpis w ewidencji pojazdów dokonywany po szkodzie zgłoszonej ubezpieczycielowi/UFG, po której pojazd wymagał dodatkowego badania technicznego. Brak wpisu nie oznacza braku szkód.
- **mObywatel / Moje pojazdy (mPojazd)** — Rządowa aplikacja; zakładka „Moje pojazdy” pokazuje pojazdy, których użytkownik jest właścicielem lub współwłaścicielem, z VIN, terminem badania i OC — szybki test własności.

## Źródła

- Historia pojazdu (gov.pl): dane techniczne, właściciele, badania techniczne (od 2010) z odczytami licznika (od 2014), OC, status, kradzież — https://www.gov.pl/web/gov/sprawdz-historie-pojazdu
- Historia pojazdu — zakres danych (omówienie) — https://gethelp.pl/blog/poradnik-klienta/jak-sprawdzic-historie-pojazdu/
- Historia pojazdu wymaga nr rejestracyjnego, VIN i daty pierwszej rejestracji — https://www.uniqa.pl/porady-komunikacja/historia-pojazdu-bezplatnie/
- Projekt rozszerzenia danych w Historii pojazdu i „Mój pojazd” (drogomierz, kontrole) — https://sprm.org.pl/aktualnosci/rynek-motoryzacyjny/beda-nowe-informacje-w-moj-pojazd-i-historiapojazdu-gov-pl-ministerstwo-cyfryzacji-uszczelnia-rynek-aut/
- Policja i inne służby spisują stan licznika przy kontroli drogowej od 1.01.2020 (do CEP) — https://jaworzno.policja.gov.pl/k11/informacje/wiadomosci/354861,Policjanci-obowiazkowo-spisuja-stan-licznika-pojazdu-podczas-kontroli.html
- Cofanie licznika — art. 306a kk, od 25.05.2019, kara 3 mies.–5 lat — https://www.infor.pl/prawo/prawo-karne/przestepstwa/2836093,Kary-za-cofanie-licznika-w-samochodzie-od-2019-r.html
- Karta pojazdu i nalepka kontrolna niewydawane od 4.09.2022 — https://www.gov.pl/web/infrastruktura/od-4-wrzesnia-2022-r-nie-beda-juz-wydawane-karty-pojazdu-i-nalepki-kontrolne
- Fabryczna grubość lakieru ok. 80–180 µm; ponad ~300 µm sugeruje szpachlę (widełki różnią się między źródłami) — https://www.autobaza.pl/page/news/grubosc-lakieru-samochodowego-warstwy-wartosci-i-pomiar/
- Grubość lakieru: fabryka 90–170, podwójne malowanie 170–350, szpachla >350 µm (jedna z konwencji) — https://jurex.auto.pl/jak-sprawdzic-grubosc-lakieru/
- Średnia grubość lakieru aut po 2016 r. ok. 110–125 µm — https://dbamoauto.pl/blog/poradnik/fabryczna-grubosc-lakieru-ile-wynosi-i-jak-ja-sprawdzic
- Mierniki Fe / NFe / FN; plastik tylko metodą ultradźwiękową — https://pl.wikipedia.org/wiki/Miernik_grubo%C5%9Bci_lakieru
- Minimalny bieżnik 1,6 mm — § 11 ust. 7 pkt 4 rozporządzenia o warunkach technicznych (t.j. Dz.U. 2024 poz. 502) — https://www.oponeo.pl/artykul/minimalna-glebokosc-bieznika-opony
- Zalecenia wymiany: lato ok. 3 mm, zima ok. 4 mm (zalecenie, nie przepis) — https://rankomat.pl/samochod/minimalna-glebokosc-bieznika-opony
- Na jednej osi opony o tej samej rzeźbie bieżnika (rozporządzenie); różne = problem na badaniu — https://www.oponeo.pl/artykul/laczenie-roznych-opon
- Opony na jednej osi — stanowisko PZPO — https://pzpo.org.pl/bieznik-w-oponach-na-tej-samej-osi-musi-byc-taki-sam-takze-jego-glebokosc/
- DOT: ostatnie 4 cyfry = tydzień i rok produkcji — https://www.oponeo.pl/artykul/data-i-miejsce-produkcji-opony
- Kontrolka airbag powinna zapalić się po włączeniu zapłonu i zgasnąć; brak zapalenia = usterka/ingerencja — https://www.gezet.pl/blog/post/kontrolka-poduszki-powietrznej-772
- Kontrolka airbag — przyczyny świecenia i braku autotestu — https://autoekspert.pl/co-oznacza-kontrolka-airbag-przyczyny-rozwiazania-grafika/
- Lokalizacje VIN: podszybie, tabliczka znamionowa (słupek/komora), wybicie w podłodze/grodzi, pole E dowodu — https://rankomat.pl/samochod/gdzie-znajde-numer-vin-samochodu
- Lokalizacje VIN (uzupełnienie) — https://intercars.pl/blog/poradnik-kierowcy/numer-vin-w-samochodzie-co-oznacza-i-gdzie-go-znalezc/
- mObywatel „Moje pojazdy”: dane z dowodu rejestracyjnego, OC, VIN, termin badania — https://info.mobywatel.gov.pl/dokumenty/moje-pojazdy
- mObywatel 2.0 — Moje pojazdy (gov.pl) — https://www.gov.pl/web/cyfryzacja-badania-i-projektowanie-mobywatel20/moje-pojazdy
- Zastaw: Rejestr Zastawów Skarbowych online (podatki.gov.pl) po VIN; rejestr zastawów sądowych — wniosek DW-2 lub zaświadczenie od sprzedawcy — https://www.otomoto.pl/news/zastaw-rejestrowy-lepiej-sprawdz-zanim-kupisz-auto
- Zastaw na samochodzie — jak sprawdzić przed zakupem — https://nieoznakowany.pl/blog/zastaw-na-samochodzie-jak-sprawdzic-przed-zakupem/
- Adnotacje urzędowe w dowodzie: współwłaściciel, ZASTAW, GAZ, HAK, TAXI, L, VAT — https://samorzad.gov.pl/web/powiat-jasielski/dokonanie-lub-wykreslenie-adnotacji-w-dowodzie-rejestracyjnym-wspolwlasciciela-zastawu-rejestrowego-gaz-hak-taxi-nauka-jazdy-eurovat-pit-cit-bus-100kmh
- Pola dowodu rejestracyjnego: C.1 posiadacz, C.2 właściciel, E VIN — https://motoryzacja.interia.pl/porady/news-oznaczenia-w-dowodzie-rejestracyjnym-co-nam-mowia-i-jak-je-c,nId,7822917
- Badania techniczne: pierwsze przed upływem 3 lat, kolejne po 2, potem co roku; pieczątka lub zaświadczenie przy braku miejsca — https://www.oponeo.pl/artykul/badanie-techniczne-pojazdu
- Pieczątka diagnosty w dowodzie / zaświadczenie (FAQ SKP) — https://przeglady.poznan.pl/czesto-zadawane-pytania/
- Jazda próbna: szkody osób trzecich z OC pojazdu; szkoda w testowanym aucie bez AC — właściciel może żądać zapłaty od kierującego — https://rankomat.pl/samochod/jazda-probna-przed-zakupem-uzywanego-samochodu
- Jazda próbna — kto odpowiada za szkodę (omówienie) — https://eagent.pl/blog/jazda-probna-przed-zakupem-uzywanego-samochodu-kto-odpowiada-za-szkode
- Sprawdzenie OC w bazie UFG po nr rej./VIN, bezpłatnie, bez konta — https://mubi.pl/poradniki/jak-sprawdzic-czy-samochod-jest-ubezpieczony/
- PCC-3: 14 dni od zawarcia umowy, obowiązek kupującego — https://podatki-arch.mf.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-kupna-samochodu/
- Kary od 1.01.2024: 500 zł za brak wniosku o rejestrację w 30 dni (1000 zł po 180 dniach); 250 zł za brak zgłoszenia zbycia — https://samorzad.gov.pl/web/powiat-bielski/kary-pieniezne-za-nieterminowa-rejestracje-i-zawiadomienie-o-zbyciu-pojazdu
- Tłumaczenie unijnego dowodu rejestracyjnego niewymagane w zakresie kodów zharmonizowanych; urząd może żądać tłumaczenia wpisów krajowych — https://samorzad.gov.pl/web/powiat-jasielski/rejestracja-pojazdu-sprowadzonego-z-zagranicy
- Dokumenty do rejestracji auta z UE (powroty.gov.pl) — https://powroty.gov.pl/niezbedne-dokumenty-9532/
- Oznaczenia szyb: cyfra = rok, kropki = miesiąc (przed cyfrą I–VI, po cyfrze VII–XII) — https://www.toyota.pl/porady/oznaczenia-na-szybach-samochodowych
- Oznaczenia szyb — jak czytać (uzupełnienie) — https://www.link4.pl/blog/oznaczenia-szyb-samochodowych-jak-je-czytac
- OBD2: monitory gotowości resetują się po skasowaniu błędów; „not ready” = niedawne kasowanie — https://skanyx.com/pl/topics/obd2-diagnostics
- OBD-II readiness monitors — wyjaśnienie — https://autodtcs.com/obd2-readiness-monitors-explained/
- Rękojmia między osobami prywatnymi: wyłączenie (art. 558 kc) bezskuteczne przy podstępnym zatajeniu wady — https://www.otomoto.pl/news/umowa-kupna-sprzedazy-samochodu-z-wylaczeniem-rekojmi
- Kiedy można wyłączyć rękojmię przy sprzedaży auta (kancelaria) — https://jjradcowieprawni.pl/kiedy-mozna-wylaczyc-rekojmie-przy-sprzedazy-auta/
- „Szkoda istotna” w ewidencji pojazdów — co oznacza — https://www.auto-swiat.pl/porady/prawo/drobna-stluczka-a-auto-w-papierach-wyglada-jak-wrak-co-znaczy-szkoda-istotna-w/02mz512
- Rynek wtórny: ponad 3,3 mln transakcji w 2025 r. (Barometr AAA AUTO) — użyte w zdaniu „ponad trzy miliony rocznie” — https://autoexpert.pl/artykuly/ponad-3-3-mln-uzywanych-aut-sprzedanych-w-polsce-w-2025
- Ok. 18% (mniej więcej co piąty) sprzedających używane auta kategorycznie nie zgadza się na jazdę próbną; częsty powód to obawa o szkodę, nie ukrywanie wad (dane Motoraportera cytowane przez Motofakty i MotoFocus). — https://motofakty.pl/co-piaty-sprzedajacy-samochod-uzywany-nie-zgadza-sie-na-jazde-probna/ar/c4-16228577
- Szkody w cudzych pojazdach podczas jazdy próbnej pokrywa OC testowanego auta; za uszkodzenie samego testowanego auta bez AC może odpowiadać kierujący — stąd opór sprzedawców i sens spisania zasad. — https://rankomat.pl/samochod/jazda-probna-przed-zakupem-uzywanego-samochodu
- W komisach auta z importu często nie mają tablic/dokumentów dopuszczających do ruchu — jazda próbna po drodze publicznej bywa niemożliwa; zostaje podnośnik/SKP. — https://info-car.pl/infocar/artykuly/bez-jazdy-probnej-w-komisie.html
- Michelin: po 5 latach coroczna kontrola opon przez specjalistę, po 10 latach od daty produkcji wymiana — zalecenie producenta, nie przepis. — https://www.michelin.pl/auto/porady/wszystko-o-oponach/jak-dlugo-mozna-uzywac-opon
- Historia pojazdu (gov.pl): raport ma charakter informacyjny i nie jest dokumentem urzędowym; usługa może zawierać także część danych z zagranicznych rejestrów. — https://historiapojazdu.gov.pl/
- Ewidencja pojazdów (CEP) gromadzi odczyty drogomierza z badań technicznych, kontroli drogowych oraz dane o wymianie drogomierza (data, przyczyna, odczyt po wymianie). — https://www.gov.pl/web/gov/sprawdz-historie-pojazdu
- Zbiorniki LPG w pojazdach podlegają badaniom dozoru technicznego (TDT) — okresowo, co 10 lat od daty produkcji zbiornika. — https://www.tdt.gov.pl/

## Do weryfikacji przed publikacją

- [do weryfikacji] Czy raport Historia pojazdu (gov.pl) w 2026 r. wyświetla informację o „szkodzie istotnej” i o zatrzymanym dowodzie rejestracyjnym. W treści (P1, P2) napisano ostrożnie („ewentualną informację o szkodzie istotnej”, „status w Historii pojazdu”) — potwierdzić na przykładowym raporcie i ewentualnie usunąć.
- [do weryfikacji] Czy rozszerzenie danych w Historii pojazdu (projekt rozporządzenia MC z 2025: wymiana drogomierza, odczyty przy kontrolach) zostało wdrożone — jeśli tak, dopisać do P1 („odczyty z kontroli drogowych” już są w treści na podstawie przepisów z 2020 r.).
- [do weryfikacji] Opis pól dowodu rejestracyjnego: w treści „właściciel (C.2) i posiadacz (C.1)” za źródłem prasowym — sprawdzić w aktualnym wzorze dowodu (rozporządzenie o rejestracji pojazdów), czy C.1.1 to nazwisko posiadacza i C.2.1 właściciela.
- [do weryfikacji] Czy diagnosta nadal stawia pieczątkę w dowodzie po zmianach z 2022 r. (źródła: tak, albo zaświadczenie, gdy brak miejsca) — potwierdzić stan na 2026; w P2 sformułowano „pieczątkę lub zaświadczenie”.
- [do weryfikacji] Rejestr zastawów sądowych: czy nadal wyłącznie wniosek DW-2 (papierowo/portal), czy istnieje publiczna wyszukiwarka online — w P1 napisano „wnioskiem DW-2 w sądzie albo zaświadczenie od sprzedawcy”.
- [do weryfikacji] Widełki lakieru 80–180 / 180–300 / >300 µm — źródła podają różne progi (170/350/500); zostawiono jako „orientacyjnie, porównuj z dachem”. Sprawdzić, czy hint nie brzmi jak norma.
- [do weryfikacji] „Ok. 10 lat” jako granica wieku opon — zalecenie producentów, nie przepis; w treści opisane jako zalecenie. Potwierdzić sformułowanie.
- [do weryfikacji] Odpowiedzialność kupującego za uszkodzenie auta podczas jazdy próbnej bez AC — źródła to blogi ubezpieczycieli; napisano „może odpowiadać kierujący”. Prawnik: potwierdzić lub złagodzić.
- [do weryfikacji] mObywatel „Moje pojazdy” — czy pokazuje także pojazdy współwłasne (w P2 założono, że tak).
- [do weryfikacji] Tłumaczenie unijnego dowodu rejestracyjnego przy rejestracji — potwierdzić aktualny przepis wykonawczy (2026); w P2 napisano „zwykle nie jest wymagane, urząd może zażądać dla wpisów krajowych”.
- [do weryfikacji] Kary: 500 zł (brak wniosku o rejestrację po 30 dniach), 1000 zł po 180 dniach, 250 zł za brak zgłoszenia zbycia — stan 2024/2025; potwierdzić na 2026. W treści bez kwot („kara pieniężna za spóźnienie”) — celowo.
- [do weryfikacji] Antydatowanie umowy nazwano w P7 „poświadczeniem nieprawdy” — prawnik powinien potwierdzić kwalifikację (dokument prywatny, art. 270/271 kk lub inne) albo zamienić na „fałszowanie daty w dokumencie”.
- [do weryfikacji] Zadatek: „należy się w podwójnej wysokości, gdy wycofa się druga strona” (art. 394 kc) — sprawdzić brzmienie w glosariuszu i P7.
- [do weryfikacji] PCC-3: 14 dni, podatek 2% od wartości rynkowej, zwolnienie do 1000 zł — w treści bez stawki; potwierdzić brak zmian w 2026.
- [do weryfikacji] „Auto bez ważnego badania nie powinno wyjeżdżać na jazdę próbną” — sformułowanie ostrożne; sprawdzić, czy nie zaostrzyć („nie może poruszać się po drodze publicznej”).
- [do weryfikacji] Import: „dokument potwierdzający akcyzę” wymagany przy rejestracji auta osobowego z UE — potwierdzić aktualne wymogi i nazwę dokumentu.
- [potwierdzone w audycie B 2026-09-29] odczyty z kontroli drogowych i wymiana drogomierza w CEP; C.1 posiadacz / C.2 właściciel; kary 500/1 000/250 zł; PCC-3 2%/14 dni/1 000 zł (podstawa: wartość rynkowa); 10 lat opon = zalecenie producenta. [poprawione] Historia pojazdu zawiera także część danych zagranicznych; raport nie jest dokumentem urzędowym; antydatowanie umowy nie jest automatycznie „poświadczeniem nieprawdy” z art. 271 kk; publiczna wyszukiwarka sądowych zastawów po VIN nie istnieje (zaświadczenie z sądu, DW-2). [nadal do sprawdzenia] czy raport Historii pojazdu pokazuje wprost „zatrzymany dowód rejestracyjny” — sprawdzić na kilku realnych raportach przed startem.
