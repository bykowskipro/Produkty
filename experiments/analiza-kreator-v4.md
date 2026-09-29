# Analiza własna po drugim teście właściciela — kroki 4–5 kreatora i etapy 2–7 (2026-09-29)

Właściciel doszedł do kroku 3 i zgłosił pięć problemów (dane z ogłoszenia, VIN przed rozmową, progi w teście na handlarza, odmowa jazdy próbnej, schematyczne przyciski). Poniżej to, co znalazłem dalej, stosując te same kryteria: **użytkownik wpisuje stan, system wie, czy to jest w porządku; przyciski brzmią jak odpowiedź na to pytanie; nic nie odsyła do miejsca, w którym danych nie ma.**

## Co było nie tak dalej (i co z tym zrobiłem)

### Krok 4 „Co zabrać”
- Problem: „Nie mam grubościomierza” dawało się zaznaczyć tylko jako Uwaga/Problem, więc brak narzędzia liczył się jak wada auta i lądował w raporcie jako argument do negocjacji („Czy cena uwzględnia: grubościomierz?”). Absurd.
- Zmiana: odpowiedzi „Mam / Nie mam”, gdzie „Nie mam” = pominięte (nie liczy się do flag). Punkt o pieniądzach przepisany zgodnie z uwagą właściciela: gotowość do zakupu od ręki (limity przelewu/BLIK, wzór umowy), bez pliku gotówki.
- Zostawione świadomie: pięć osobnych punktów zamiast jednej listy kontrolnej — bo każdy ma inną instrukcję (np. 60 s obsługi miernika), a liczba 160 punktów jest obiecana na landingu.

### Krok 5 „Plan B”
- Problem: dwa punkty czysto informacyjne z przyciskami OK/Uwaga/Problem — nie było wiadomo, co „Problem” miałby znaczyć.
- Zmiana: „Mam namiar / umówione” albo „Jeszcze nie” (uwaga = przypomnienie w raporcie, nie wada auta).

### Etap 2 „Dokumenty i tożsamość”
- „Pole E: VIN z dowodu spisz” — kazało spisać, ale nie było gdzie. Teraz jest pole na VIN z dowodu, a system porównuje je z VIN-em od sprzedawcy (z ogłoszenia/rozmowy); różnica = problem. Jeśli VIN-u wcześniej nie było, ten z dowodu staje się VIN-em auta w raporcie.
- „Badanie techniczne: ważne?” i „Polisa OC: do kiedy” — użytkownik miał sam ocenić datę. Teraz wpisuje datę, system mówi: ważne / kończy się / nieważne.
- „Rok produkcji vs ogłoszenie” — teraz wpisujesz rok z dowodu, system porównuje z rocznikiem z ogłoszenia (zawyżony rocznik = problem).
- „Kluczyki” — liczba + ocena systemu (2 = komplet, 1 = uwaga), przycisk „któryś nie działa” nadpisuje.
- Dealbreakery dokumentowe mają dwie odpowiedzi („Oryginał w ręku” / „Tylko zdjęcie, ksero”), VIN w trzech miejscach: „Zgadza się znak w znak / Nie znalazłem / Różni się lub ślady ingerencji”.

### Etap 3 „Nadwozie i lakier”
- 12 elementów lakieru: po wpisaniu µm użytkownik musiał jeszcze tapnąć OK/Uwaga/Problem, mimo że mapa lakieru już wiedziała, jak jest. Teraz ocenę robi system względem dachu (1,4× = uwaga, 2,4× = problem), bez dachu prosi o zmierzenie dachu. Przycisk „Nie mam miernika” zamiast „Pomiń”.
- DOT i bieżnik: wpisujesz rok / mm, system ocenia (10 lat i 1,6 mm to progi twarde, 6 lat i 3 mm — ostrzegawcze).
- Rdza, wycieki, szczeliny: trzy stopnie opisane po ludzku („Czysto, twarde / Naloty, pęcherze / Miękkie, dziury, łaty”).

### Etap 4 „Wnętrze i elektryka”
- Licznik: to był najsłabszy punkt całego produktu — dealbreaker, w którym użytkownik wpisywał liczbę i sam miał ją porównać z dwoma innymi źródłami. Teraz system porównuje z ogłoszeniem i z ostatnim odczytem z Historii pojazdu: mniej niż w rejestrze = problem (koniec oględzin), mniej niż w ogłoszeniu = problem, dużo więcej = uwaga, brak punktu odniesienia = uwaga „niezweryfikowany” (nie zielony).
- Kontrolki: „Wszystkie zapalają się i gasną / Któraś się nie zapala / Któraś nie gaśnie” — bo to dwa różne objawy, oba złe.
- Zużycie wnętrza: „Pasuje do przebiegu / Wytarte jak na przebieg / Podejrzanie nowe” — obie skrajności są sygnałem.

### Etap 5 „Pod maską” i etap 6 „Jazda próbna”
- Odpowiedzi opisują objaw („Brak / Krótko przy starcie / Niebieski, biały, czarny” dla dymu; „Chwyta nisko, równo / Wysoko, drgania / Ślizga się” dla sprzęgła).
- Skrzynia: punkty manualne mają pominięcie „Automat”, automatyczne — „Manual”. Wcześniej trzeba było je „pomijać” bez wyjaśnienia, co psuło licznik postępu i wyglądało jak zaniedbanie.
- Jazda próbna: w etapie 6 zostaje punkt o zasadach odpowiedzialności, spójny z nową wersją ustaleń (kto prowadzi, kartka z zasadami, OC).

### Etap 7 „Podsumowanie i negocjacja”
- Punkty informacyjne („Negocjuj faktami”, „Jedna propozycja i cisza”) miały OK/Uwaga/Problem. Teraz „Stosuję” + pominięcie.
- „Zaliczka czy zadatek” — „Na piśmie z warunkami / Bez zaliczki / Ustnie, bez warunków”.
- Pytania w raporcie „Czy cena uwzględnia: …” generują się teraz tylko z etapów przy aucie; uwagi z etapu 1 i z rozmowy dostają „Wyjaśnij przed decyzją: …”.

## Czego nie zmieniłem i dlaczego
- **Progi liczbowe** (1,4× / 2,4× dachu, 7 000 i 25 000 km/rok, 60 dni do badania, 14 dni do końca OC, 6 i 10 lat DOT, 1,6 i 3 mm bieżnika, ±12% ceny) to widełki orientacyjne, nie normy. Są opisane w treści jako widełki. Audyt B (mechanik) powinien je potwierdzić albo poprawić — to najważniejsza rzecz do sprawdzenia przed startem.
- **Import**: nie wykrywam go automatycznie z daty pierwszej rejestracji, bo pole B w dowodzie to pierwsza rejestracja gdziekolwiek, nie w Polsce. Zostaje pytanie w rozmowie i punkt w kroku „Historia”.
- **Blokowanie „Dalej”** przy pustych danych: nie. Jest miękka podpowiedź. Ludzie oglądają auta bez ogłoszenia (z polecenia) i nie mogą utknąć w kroku 1.
- **Ocena „OK” bez punktu odniesienia**: nie. Licznik bez ogłoszenia i rejestru dostaje „uwaga: niezweryfikowany”. Zielone bez podstawy to fałszywe bezpieczeństwo.

## Ryzyka, które zostają
- Więcej tekstu na przyciskach = dłuższe karty. Na 390 px sprawdzone, ale przy bardzo długich etykietach układ przechodzi w listę pionową; przy 3 opcjach to 3 dodatkowe linie na punkt. Do obserwacji w becie: czy ludzie przewijają, czy klikają.
- Reguły automatyczne działają na danych, które użytkownik sam wpisał. Literówka w przebiegu z ogłoszenia (18 000 zamiast 180 000) da fałszywy alarm. Dlatego każda ocena pokazuje liczby, z których wynika, i da się ją poprawić u źródła.
- Nowe dane (cena, rocznik, przebieg, nr rej., data) są synchronizowane z serwerem w tym samym blobie co odpowiedzi (limit 32 KB na token) — przy 3 autach to wciąż kilkanaście KB, ale przy dłuższych notatkach payload jest przycinany (najpierw notatki, potem zdjęcia i tak nie są wysyłane).
