# Kierunek C — Finanse osobiste: edukacja + narzędzia (+AI), Polska

Data: 2026-09-28. Autor: subagent researchu (kierunek C). Plik wejściowy: `00-brief.md`, `_SCORING.md`.

## 0. Metoda i ograniczenia (czytać najpierw)

- Środowisko blokowało **cały ruch wychodzący poza WebSearch**: Google Autocomplete (`suggestqueries.google.com`), Reddit (old/www), YouTube, Facebook Ad Library, Allegro, Etsy, KNF, ISAP, blogi twórców (marciniwuc.com, jakoszczedzacpieniadze.pl, inwestomat.eu, fincrafters.pl), a także proxy-readery (r.jina.ai, web.archive.org) — wszystkie zwróciły `EGRESS_BLOCKED` / `CONNECT 403`. Dodatkowo limit WebSearch sesji (200/200) wyczerpał się przed ostatnim zapytaniem.
- W efekcie **dowody pochodzą wyłącznie z wyników wyszukiwania** (tytuły stron i wpisów + fragmenty podsumowań). Nie odwiedziłem żadnej strony bezpośrednio.
- Legenda wiarygodności przy każdym dowodzie:
  - **[T]** = tytuł strony/wpisu widoczny w wynikach (verbatim, czasem urwany „…”),
  - **[S]** = liczba/fakt widoczny we fragmencie wyników (parafraza; przypisanie do konkretnej strony w zestawie może być niepewne — zaznaczam),
  - **[ND]** = brak danych (nie udało się pozyskać dowodu).
- Konsekwencja: cytaty VoC to głównie **tytuły wpisów** (te są verbatim). Treści komentarzy nie widziałem. Autocomplete i wyświetlenia YouTube = **brak danych**.
- Liczba wywołań narzędzi: ok. 65.

---

## 1. Podsumowanie (werdykt)

1. Rynek „finanse osobiste PL” jest realny i płacący, ale **płaci twarzom**: Szafrański (>100 000 egz. „Finansowego ninja”, kurs budżetowy 197 zł), Iwuć (>130 000 egz. „Finansowej Fortecy”, kurs hipoteczny „85 000 zł w trzy dni”), Samołyk — wszystko oparte na wieloletnim zaufaniu do osoby.
2. Nie znalazłem **ani jednego dowodu**, że anonimowa marka sprzedaje w PL *edukację* finansową za 29–49 zł w zauważalnej skali; anonimowo sprzedają się natomiast **narzędzia** (EasyBudget sp. z o.o. 15–25 zł/mies., Martia, Kontomierz) i **mikro-PDF-y** (planer 3,49 zł na Allegro; notes-planer z „49 osób kupiło w 30 dni”).
3. Wniosek strategiczny: w tym kierunku produkt musi być **narzędziem („appka w linku”), nie „nauką od eksperta”**, a marka ma wyglądać jak software, nie jak guru.
4. Trzy najmocniejsze koncepty (rubryka 1–14): **(A) „Ogarnij finanse z ChatGPT” — metoda + prompty + mobilny kreator promptów: 56 pkt**, **(B) „Finanse we dwoje” — karty do rozmowy o pieniądzach + kalkulator wspólnego budżetu: 55 pkt**, **(C) „Budżet domowy w 15 minut” — planer kopertowy na telefonie bez Excela: 54 pkt**. Różnice 1–2 pkt to szum; rekomenduję **hybrydę: rdzeń = C (udowodniony ból i płatność), wyróżnik = moduł A (spójny z AI-awatarem), upsell = B**.
5. Ścieżka **IKE/IKZE/ETF (39 pkt)** i **długi/poduszka (44 pkt)** odpadają w tym eksperymencie: pierwsza przez darmową, silną konkurencję (Iwuć ma darmowy kalkulator IKE/IKZE, rankingi są wszędzie), granicę doradztwa inwestycyjnego i nowe zasady Meta; druga przez ubogą, trudną reklamowo personę.
6. **Największe ryzyko całego kierunku: Meta.** Od sierpnia/września 2026 Meta wprowadza w Polsce obowiązkową weryfikację (KYC) „100% reklamodawców usług finansowych” (imagazine.pl, rp.pl, about.fb.com), a w wynikach wyszukiwania CPC dla „finanse” podawane jest jako 5–15 zł — przy 300 zł to **20–60 kliknięć, nie 150–300** z briefu. Kreacje muszą więc być „produktywność/aplikacja/związek”, nie „finanse/inwestowanie”.
7. Prawnie edukacja i kalkulatory są bezpieczne, o ile narzędzie **nie generuje rekomendacji konkretnych instrumentów na podstawie danych użytkownika** (art. 76 ustawy o obrocie; stanowisko UKNF 2020 o doradztwie i o robo-doradztwie).
8. Sezonowość działa na korzyść testu Q4: „93 dni do końca roku” (Iwuć), wrześniowy nabór „Witaj szkoło!” (Szafrański), grudniowy limit IKZE — ale szczyt to styczeń.
9. Werdykt: **kierunek C — warunkowe TAK** wyłącznie dla wariantu „narzędzie budżetowe + AI (+ pary)”, z kreacją unikającą słownictwa „finanse/inwestycje” w reklamie; **NIE** dla wariantów inwestycyjnych i dłużniczych.
10. Najsłabszy punkt rekomendacji: popyt na wariant „z ChatGPT” jest udokumentowany tylko medialnie (artykuły), nie zakupowo — to hipoteza do testu, nie pewnik.

---

## 2. Dowody popytu

### 2.1 Google Autocomplete — **[ND]**
Endpoint `suggestqueries.google.com` zablokowany na poziomie proxy (25 prób, `CONNECT 403`). Brak danych.

### 2.2 Wątki społecznościowe (Wykop) — tytuły verbatim [T]

| Podnisza | Tytuł wpisu/znaleziska (verbatim, urwane „…” jak w wynikach) | URL |
|---|---|---|
| Budżet | „Prowadzicie sobie budżet domowy co do złotówki każdą transakcję gotówk…” (@Croudflup) | https://wykop.pl/wpis/42645007/prowadzicie-sobie-budzet-domowy-co-do-zlotowki-kaz |
| Budżet | „Budżet domowy - rozpoczynamy jego prowadzenie” | https://wykop.pl/link/4825629/budzet-domowy-rozpoczynamy-jego-prowadzenie |
| Budżet | „Budżet domowy. Po co zapisywać wydatki? \| Jak oszczędzać pieniądze?” | https://wykop.pl/link/1875202/budzet-domowy-po-co-zapisywac-wydatki-jak-oszczedzac-pieniadze/ |
| Budżet | „Budżet domowy krok po kroku. Część 1 – Wprowadzenie.” | https://wykop.pl/link/2909967/budzet-domowy-krok-po-kroku-czesc-1-wprowadzenie |
| Budżet | „Przepis na dobry budżet domowy” | https://wykop.pl/link/4673701/przepis-na-dobry-budzet-domowy |
| Budżet | tag #budzetdomowy (aktywny tag z wieloma stronami wpisów) | https://wykop.pl/tag/budzetdomowy |
| Poduszka | „Ile kasy (wypłat) to dobra poduszka finansowa? Jak to policzyć? #inwes…” (@depcioo) | https://wykop.pl/wpis/57964419/ile-kasy-wyplat-to-dobra-poduszka-finansowa-jak-to |
| Poduszka | „Poduszka finansowa - gdzie ją trzymać? Moje jedyne doświadczenie z …” (@BoskiMateusz) | https://wykop.pl/wpis/55424131/poduszka-finansowa-gdzie-ja-trzymac-moje-jedyne-do |
| Poduszka | „Mirki, moja poduszka finansowa to lekko ponad 3 pensje netto. W dobie …” (@nielubiekalafiora) | https://wykop.pl/wpis/63186119/mirki-moja-poduszka-finansowa-to-lekko-ponad-3-pen |
| Poduszka | „Jak myślicie, jak wielka powinna być poduszka finansowa na "czarną god…” (@Rajker) | https://wykop.pl/wpis/8244096/jak-myslicie-jak-wielka-powinna-byc-poduszka-finan |
| Poduszka | „Z ciekawości, jak duża wg Was powinna być poduszka finansowa? Wiadomo,…” | https://wykop.pl/wpis/68815831/z-ciekawosci-jak-duza-wg-was-powinna-byc-poduszka- |
| Poduszka | „W co polecacie obecnie włożyć 10k poduszki finansowej by straciła na w…” (@Salvaro) | https://wykop.pl/wpis/66523547/w-co-polecacie-obecnie-wlozyc-10k-poduszki-finanso |
| Poduszka | „jaka w tych czasach jest twoim zdaniem rozsadna poduszka finansowa, za…” (@katopa) | https://wykop.pl/wpis/79736803/jaka-w-tych-czasach-jest-twoim-zdaniem-rozsadna-po |
| Poduszka (media) | „Polacy budują poduszki finansowe. Wystarczy 1000 zł, by czuli się zabezpieczeni” | https://wykop.pl/link/6342459/polacy-buduja-poduszki-finansowe-wystarczy-1000-zl-by-czuli-sie-zabezpieczeni |
| Długi | „Pomóż mi wyjść z długów” | https://wykop.pl/link/7772549/pomoz-mi-wyjsc-z-dlugow |
| Długi | „#chwilowki #finanse Jak wyjść z długów? Nie mam ich wiele, około 2500…” (@g1venchy) | https://wykop.pl/wpis/51090121/chwilowki-finanse-jak-wyjsc-z-dlugow-nie-mam-ich-w |
| Długi | „W---------e się kiedyś w chwilówki? Jak najlepiej wyjść z tego, poleca…” (@RiverStar; wulgaryzm ocenzurowany w wyniku) | https://wykop.pl/wpis/79276163/wjebaliscie-sie-kiedys-w-chwilowki-jak-najlepiej-w |
| Długi/kredyt | „Mircy, co byście zrobili na moim miejscu? Mam… kredyt” | https://www.wykop.pl/wpis/66977003/mircy-co-byscie-zrobili-na-moim-miejscu-mam-kredyt/ |
| IKE/IKZE | „Jaki etf całorynkowy akumulujący wybrać na ike/ikze, czyli hajs tylko …” (@interpenetrate) | https://wykop.pl/wpis/64619057/jaki-etf-calorynkowy-akumulujacy-wybrac-na-ike-ikz |
| IKE/IKZE | „W ramach IKE/IKZE chciałbym zainwestować w jakiegoś ETFa sp500/all-wor…” (@bombardiro-crocodillo) | https://wykop.pl/wpis/84715457/w-ramach-ike-ikze-chcialbym-zainwestowac-w-jakiego |
| IKE/IKZE | „Mirki, tak się zastanawiam jaki sens jest wybierać polecany przez wiel…” (@broker) | https://wykop.pl/wpis/74450341/mirki-tak-sie-zastanawiam-jaki-sens-jest-wybierac- |
| IKE/IKZE | tagi #ike, #etfy | https://wykop.pl/tag/ike , https://wykop.pl/tag/etfy |

Fragmenty [S] z podsumowań wyników (parafraza): w wątku o długach z sierpnia 2025 autor opisuje ok. 27 000 zł długu po utracie pracy i toksycznym związku; w innym wątku ktoś **poleca „kurs Szafrańskiego”** jako sposób wyjścia z długów (URL-e jak wyżej: link/7772549, wpis/51090121). To ostatnie jest istotne: nawet w kryzysie zaufanie kieruje się do nazwiska.

### 2.3 Reddit (r/Polska) — **[ND]**
Zablokowany fetch (old/www) oraz brak indeksowanych wyników dla fraz „nie umiem oszczędzać”, „od czego zacząć inwestować”, „budżet domowy … polecacie” z ograniczeniem `site:reddit.com` (operator był ignorowany przez wyszukiwarkę). Brak danych.

### 2.4 YouTube — wyświetlenia **[ND]**; tytuły i skala kanałów [T]/[S]
- Kanał „Pankracy” — „ponad 70 tysięcy subskrybentów” [S] (https://www.youtube.com/@mr_pankracy ; wzmianka w https://www.sp-7.pl/edukacja-finansowa-najlepsze-kanaly-an-yt/ lub https://financer.pl/finanse-osobiste/najlepsze-podcasty-finansowe/ — przypisanie niepewne).
- Marcin Iwuć — „wśród debiutantów w TOP 30 najpopularniejszych kanałów YouTube w rankingu 2025” [S] (https://widoczni.com/blog/ranking-najpopularniejszych-youtuberow/).
- Tytuły (język rynku) [T]: „Nie zaczynaj ogarniać finansów, zanim nie poznasz tych 6 pułapek” (https://www.youtube.com/watch?v=KnySDZI79W8), „7 kroków, które musisz zrobić w finansach w 2026 r.” (https://www.youtube.com/watch?v=--KDJVBOQLA), „W co inwestować 100 zł miesięcznie? Konkrety.” (https://youtube.com/watch?v=DjxNbPFPjOk), „93 dni do końca roku – wykorzystaj TEN plan dla Twoich finansów” (https://www.youtube.com/watch?v=9aVV9UM1pus), „IKE/IKZE w XTB w 30 minut i zakup pierwszego ETF-a – ZOBACZ, jak to zrobić” (https://www.youtube.com/watch?v=9UqVl9tq0Dw).
- „Prosta Ekonomia” — kanał bez twarzy (animacje 5–20 min, grupa z Trójmiasta) [S] (https://www.youtube.com/@ProstaEkonomia ; https://steemit.com/polish/@koltci/youtube-polecane-kanaly-prosta-ekonomia). Płatnego produktu nie znalazłem [ND].

### 2.5 Twarde liczby rynku (płacenie za finanse osobiste)
| Fakt | Wartość | Źródło |
|---|---|---|
| „Finansowy ninja” (Szafrański) | „100.000 egz. #FinNinja i 8,5 mln zł przychodu!” [T]; „1,4 mln zł ze sprzedaży książki” (2017) [T]; pierwszy nakład 10 000 [S] | https://jakoszczedzacpieniadze.pl/100000-egzemplarzy-finansowy-ninja-self-publishing ; https://spidersweb.pl/2017/06/finansowy-ninja-wyniki.html |
| Blog JOP | „200–250 tys. osób miesięcznie, ponad 2 mln wizyt rocznie” [S] | https://jakoszczedzacpieniadze.pl/premiera-kursu-budzet-domowy-w-tydzien |
| Kurs „Budżet domowy w tydzień” | 197 zł brutto; 6 lekcji wideo + szablony Excel/PDF; „ponad 500 kopii”, średnia ocena 9,55/10 [S] | https://budzetdomowywtydzien.pl/ ; https://jakoszczedzacpieniadze.pl/budzet-domowy-w-tydzien-2 |
| „Finansowa Forteca” (Iwuć) | 800 stron; ~122–135 zł; „ponad 130 000 egz.” [S]; „ponad 170 000 osób buduje swoją Finansową Fortecę” [S] | https://www.ceneo.pl/97735123 ; https://fincrafters.pl/ ; https://finansowaforteca.pl/ |
| Kurs „Kredyt hipoteczny krok po kroku” (Iwuć) | „85 000 zł w trzy dni. Pierwsze wyniki sprzedaży kursu - case study” [T]; wzmianka o cenie 169 zł [S, źródło niepewne]; program partnerski 30% [T] | https://marciniwuc.com/kredyt-hipoteczny-krok-po-kroku-case-study/ ; https://x.com/marcin_iwuc/status/981254428471775233 |
| „Inwestowanie dla każdego” (Samołyk) | 470 stron; ~118–120 zł [S] | https://www.ceneo.pl/172378461 |
| Aplikacje płatne | EasyBudget 15 zł/mies. lub 120 zł/rok (Podstawowy), 25 zł/mies. lub 240 zł/rok (Premium), 14 dni trial [S] | https://www.easybudget.pl/ ; https://apps.apple.com/pl/app/easybudget-pl/id6774876792 |
| Planery anonimowe | PDF 3,49 zł [T]; notes-planer „49 osób kupiło w ciągu ostatnich 30 dni” [S] | https://allegro.pl/oferta/planer-finansowy-budzet-do-wydruku-pdf-kwiaty-8244282314 ; https://allegro.pl/oferta/planer-finansowy-budzet-oszczednosci-wydatki-notes-11841717218 |
| Badanie ETF/IKE | „Fundusze ETF szczególnie popularne na IKE i IKZE. Emerytura głównym celem inwestorów” [T] | https://strefainwestorow.pl/edukacja/badanie-etf-portfel-polskiego-inwestora |

### 2.6 Finanse par — statystyki [S]
W zestawie wyników (https://www.pap.pl/aktualnosci/pieniadze-polakow-w-zwiazkach-na-co-wydajemy-i-jak-dzielimy-sie-rachunkami ; https://www.ing.pl/wiem/bankowosc-codzienna/konto-wspolne-jak-dzielimy-sie-pieniedzmi-w-zwiazku ; https://www.raisin.com/pl-pl/poradnik-oszczedzania/finanse-w-zwiazku/ ; https://martia.ai/finanse-dla-par-wspolny-budzet) widoczne były liczby: 57% par ma wspólny budżet; 30% dzieli koszty wspólne, a osobiste płaci osobno; 23% dzieli po równo; 15% — więcej dokłada lepiej zarabiający; 23% konsumentów uważa finanse za źródło konfliktów w związku. Przypisanie liczb do konkretnej strony — niepewne.

### 2.7 „Finanse z ChatGPT” — pokrycie medialne [T], brak VoC [ND]
- „Budżet domowy z AI: Jak zautomatyzować kontrolę wydatków w 2026 roku” — https://mamopracuj.pl/budzet-domowy-z-ai-jak-zautomatyzowac-wydatki-w-2026-roku/
- „Zapytałem AI, jak oszczędzać przy zarobkach 5 tys. zł "na rękę". Jest w tym jeden haczyk” — https://natemat.pl/595427,ai-podal-mi-sposoby-na-oszczedzanie-chatgpt-pokazal-gotowy-plan-wydatkow
- „Jak używać AI do zarządzania finansami osobistymi. Automatyzacja krok po kroku” — https://girlsmoneyclub.pl/ai-i-automatyzacja-w-finansach-osobistych/
- „Jak Szybko i Skutecznie Zaplanować Budżet Domowy z Pomocą Sztucznej Inteligencji” — https://finansewpraktyce.pl/jak-szybko-i-skutecznie-zaplanowac-budzet-domowy-z-pomoca-sztucznej-inteligencji-chatgpt/
- „Narzędzia AI do Budżetu Domowego – Twój Nowy Osobisty Asystent Finansowy” — https://hackbook.pl/narzedzia-ai-do-budzetu-domowego-twoj-nowy-osobisty-asystent-finansowy/
- Darmowa biblioteka promptów finansowych — https://promptuj.pro/kategoria/finanse
- Przykładowy prompt widoczny w wynikach (verbatim): „W załączniku przesyłam zdjęcia moich paragonów. Wypisz z nich wszystkie wydatki i pogrupuj je w kategorie: Jedzenie, Chemia/Kosmetyki, Transport, Ubrania, Rozrywka.” (najpewniej mamopracuj.pl — przypisanie niepewne).
- Wątków „użyłem ChatGPT do budżetu” na Wykopie/Reddicie **nie znalazłem** [ND]. Płatnego polskiego produktu „prompty finansowe” **nie znalazłem** [ND] — to luka albo brak popytu.

---

## 3. Konkurencja

| Nazwa | URL | Cena | Format | Co zawiera | Słabości / uwagi |
|---|---|---|---|---|---|
| Michał Szafrański — kurs „Budżet domowy w tydzień” | https://budzetdomowywtydzien.pl/ | 197 zł brutto [S] | kurs wideo + Excel/PDF | 6 lekcji, szablony, ćwiczenia | desktop/Excel-centryczny; wysoka cena; sprzedaż w naborach (styczeń, czerwiec, wrzesień — tytuły: „Reaktywacja postanowień noworocznych…”, „Zaplanuj budżet domowy zanim pojedziesz na wakacje”, „Witaj szkoło! Kolejny nabór…”) |
| Michał Szafrański — „Finansowy ninja” | https://finansowyninja.pl/ | książka (cena nieustalona [ND]) | książka | podręcznik finansów | pozycja kultowa; nie-interaktywna |
| Marcin Iwuć — „Finansowa Forteca” | https://www.ceneo.pl/97735123 | ~122–135 zł [S] | książka 800 str. | strategia inwestycyjna | dla osób gotowych czytać 800 stron |
| Marcin Iwuć — FinCrafters: „Ogarnij finanse krok po kroku” (ścieżka #1), „Zacznij Skutecznie Inwestować” (ścieżka #2) | https://fincrafters.pl/ ; https://marciniwuc.com/startujemy-z-fincrafters-co-to-jest/ | **[ND]** (autor: „porównywalnie do sezonu kursu językowego, na pewno nie kilka tysięcy zł” [S]) | platforma + społeczność | metoda krok po kroku, wsparcie społeczności | cena i skala niejawne; bezpośredni konkurent koncepcji „ścieżka krok po kroku” |
| Marcin Iwuć — „IKE czy IKZE – co się bardziej opłaca? Kalkulator + kompletny przewodnik” | https://marciniwuc.com/ike-czy-ikze-co-sie-bardziej-oplaca-kalkulator-kompletny-przewodnik/ | 0 zł | artykuł + kalkulator | to dokładnie „nasz” koncept nr 2 — za darmo | zabija płatny kalkulator IKE/IKZE |
| Inwestomat (Samołyk) — „Ranking IKE i IKZE 2025” + książka | https://inwestomat.eu/ranking-ike-i-ikze-2025/ ; https://www.ceneo.pl/172378461 | 0 zł / ~118 zł | blog + książka | rankingi kont, edukacja ETF | kursu nie znalazłem [ND] |
| Girls Money Club (Dorota Sierakowska) — „Kurs Finansowy Start”, „Kurs Inwestowania od podstaw 2.0”, „Kurs Inwestowania w ETFy #2”, Premium | https://girlsmoneyclub.pl/kurs-finansowy-start/ ; https://premium.girlsmoneyclub.pl/ | **[ND]** | kursy + społeczność | od porządkowania finansów do pierwszej transakcji | marka osobowa + społeczność kobiet |
| Pankracy (YouTube) | https://www.youtube.com/@mr_pankracy | produkty [ND] | YouTube (>70 tys. subskrypcji [S]) | zarabianie, oszczędzanie, inwestowanie, produktywność | — |
| Udemy PL: „Finanse Osobiste: oszczędzaj, zarabiaj i inwestuj mądrze”, „FINANSE OSOBISTE krok po kroku od Zera do Milionera”, „Skuteczny budżet domowy”, „FINANSE od Podstaw w Praktyce…” | https://www.udemy.com/course/finanse-osobiste/ ; https://www.udemy.com/course/skuteczny-budzet-domowy/ | **[ND]** (ceny/liczby uczestników niewidoczne) | kursy wideo | — | quasi-anonimowi instruktorzy — jedyny ślad „bez twarzy” w edukacji, ale bez danych o sprzedaży |
| Zadbane finanse | https://zadbanefinanse.pl/ | 0 zł | e-learning instytucji finansowych [S] | budżet, cele SMART | darmowy konkurent edukacji podstawowej |
| Seduo „Finanse osobiste”, eduj.pl „Finanse Osobiste od A do Z”, EY Academy | https://www.seduo.pl/finanse-osobiste ; https://eduj.pl/produkt/finanse_osobiste_od_a_do_z | [ND] | kursy | — | — |
| EasyBudget (EasyBudget sp. z o.o.) | https://www.easybudget.pl/ | 15/25 zł mies.; 120/240 zł rok [S] | aplikacja (bank sync) | kategorie, cele, współdzielenie | subskrypcja; wymaga instalacji i logowania do banku — nasza przewaga: jednorazowo, bez banku |
| Martia (martia.pl / martia.ai) | https://martia.pl/aplikacja-do-budzetu-domowego-2026 ; https://martia.ai/finanse-dla-par-wspolny-budzet | 0 zł (waitlista) [S] | aplikacja AI (czat po polsku, Open Banking 2400+ banków) | „pytasz „ile wydaliśmy razem na jedzenie w marcu?” i dostajesz odpowiedź z prawdziwych transakcji” [S]; moduły: poduszka, pary, JDG | bezpośredni konkurent „AI + budżet + pary” — bez twarzy, firma; darmowy na start |
| Spendee / YNAB / Kontomierz / Wallet / 4grosze | https://www.bankier.pl/smart/jaka-jest-najlepsza-aplikacja-do-oszczedzania-pieniedzy-i-planowania-budzetu-domowego ; https://financer.pl/finanse-osobiste/aplikacja-do-budzetu-domowego/ | Spendee 13,99 zł/mies.; YNAB ~60 zł/mies.; Kontomierz: darmowy / premium „ok. 90 zł/rok (15 zł/mies.)” lub „24,99 zł/mies.” — **źródła rozbieżne** [S] | aplikacje | trackery, wspólne portfele | YNAB bez PL; reszta = subskrypcje |
| Kobieta i Pieniądze — „Finanse w związku [ebook + karty]” | https://kobietaipieniadze.pl/produkt/zwiazek-ebook/ | 49,00 zł (przekreślone 158,00 zł) [S]; „Karty do Rozmowy o Pieniądzach” „wartość 199 zł” [S] | ebook + karty | rozmowa o pieniądzach w parze | jedyny znaleziony płatny produkt „pary” — marka osobowa, głęboka przecena sugeruje słabą sprzedaż w cenie regularnej |
| Marita Woźny — „Jak rozmawiać o pieniądzach – psychoterapeuta prosto o komunikacji w związku” | https://lubimyczytac.pl/ksiazka/4980241/... | [ND] | ebook interaktywny z kartami pracy [S] | — | — |
| Planery PDF (anonimowe): Allegro, femmedigitalfiles.eu, coaching.riseupcompany.pl, ogarniamsie.pl, kobiecefinanse.pl | https://allegro.pl/oferta/planer-finansowy-budzet-do-wydruku-pdf-kwiaty-8244282314 ; https://femmedigitalfiles.eu/sklep-femme-digital-files/do-druku/planery-do-druku/planer-oszczedzania-do-druku/ ; https://coaching.riseupcompany.pl/planer-wydatkow-pdf-do-druku/ ; https://ogarniamsie.pl/produkt/planer-finansowy-do-druku-budzet-domowy-pdf/ | 3,49 zł; 19–49 zł (65 arkuszy); 14 zł (reg. 29 zł); [ND] | PDF do druku | karty budżetu, wyzwania 52 tyg., trackery | sufit cenowy dla „papieru”: 3–29 zł; to jest realny poziom cen, jaki płaci się anonimom |
| Ebooki na Gumroad (pseudonimowi twórcy): „Ebook: Inwestowanie od Zera”, „Inwestowanie od zera - darmowy ebook”, kacperinvests, tomashstorm | https://investorace3.gumroad.com/l/gqlkpr ; https://investorace3.gumroad.com/l/odsku ; https://kacperinvests.gumroad.com/l/hnkyjt ; https://tomashstorm.gumroad.com/l/xhngi | [ND] | ebook | inwestowanie dla początkujących | dowód, że anonimowi próbują; brak dowodu, że sprzedają |
| Etsy — „Arkusz kalkulacyjny do śledzenia spłaty długów: metody kuli śnieżnej i lawiny” | https://www.etsy.com/pl/listing/4481053909/ | [ND] | arkusz (do 8 zobowiązań) | plan spłaty | — |

---

## 4. Darmowe alternatywy — i dlaczego ktoś (nie) zapłaci

| Potrzeba | Darmowa alternatywa | URL |
|---|---|---|
| Budżet / kategorie | Bankowe PFM: mBank „menedżer finansów” (limity na kategorie + powiadomienia), ING „Finansometr”/„Moje wydatki”, PKO IKO „Asystent” [S] | https://www.mbank.pl/artykuly/budzet-domowy-aplikacja-bankowa/ ; https://spolecznosc.ing.pl/-/Blog/Aplikacje-do-zarz%C4%85dzania-domowym-bud%C5%BCetem/ba-p/206 ; https://bankomania.pkobp.pl/bankofinanse/planowanie-finansowe/programy-ulatwiajace-planowanie-domowego-budzetu/ |
| Arkusze budżetu | dziesiątki darmowych szablonów Excel/Google Sheets na 2026 | https://budzet-excel.pl/ ; https://www.easybudget.pl/budzet-domowy-excel ; https://pinkplanning.pl/szablon-budzetu-domowego/ ; https://winter-arc.pl/budzet-domowy-w-excelu/ ; https://chrzaszczfinanse.com/najprostszy-darmowy-szablon-budzetu-domowego/ ; https://sheetorial.com/pl/finanse-osobiste/szablony-budzetu/ |
| Planery do druku | Canva — darmowe szablony planera budżetowego | https://www.canva.com/pl_pl/planery/szablony/budzetowy/ |
| Aplikacje | Martia (0 zł), Kontomierz (free), EasyBudget trial 14 dni | j.w. |
| IKE/IKZE | kalkulator Iwucia; rankingi: Moneteo, Bankier, jakdorobic, inwestycyjnykompas, freenance, maklerskie.net, kontomaniak, Inwestomat | https://moneteo.com/rankingi/ike-ikze ; https://www.bankier.pl/smart/najlepsze-konta-ike-i-ikze-top-3-w-sierpniu-2026 ; https://freenance.io/rankingi/ranking-kont-ike-ikze-2026/ |
| Spłata długów | kalkulator kuli śnieżnej/lawiny (liczgrupa.pl: symulacja 2–5 długów), poradniki KRUK, Raisin, GMC, bezprawnik | https://liczgrupa.pl/blog/post/kula-sniezna-czy-lawina-splata-dlugow-majatek-netto ; https://pl.kruk.eu/klienci/poradnik/porady/splata-dlugow-metoda-kuli-snieznej |
| AI/prompty | promptuj.pro (kategoria finanse), artykuły z gotowymi promptami | https://promptuj.pro/kategoria/finanse |
| Edukacja | Zadbane finanse (e-learning), darmowy ebook Iwucia (Generali), YouTube (Iwuć, Pankracy, Prosta Ekonomia) | https://zadbanefinanse.pl/ ; https://generali-investments.pl/files/plik/5374/marcinIwucebookspokojneinwestowaniewoparciuocele.pdf |

**Dlaczego mimo to płacą (dowody):** za *prowadzenie za rękę* (Szafrański sprzedaje 197 zł kurs ludziom, którzy „mimo czytania bloga nie potrafią samodzielnie skonstruować budżetu” [S]); za *wygodę na telefonie* (EasyBudget: „Excel jest najczytelniejszy, ale dużo łatwiej notować wydatki z telefonu” — parafraza z Wykopu #budzetdomowy [S]); za *gotowość i estetykę* (planery 3–49 zł); za *rozmowę bez kłótni* (karty 49 zł).

**Dlaczego nie zapłacą anonimowi (dowody/przesłanki):** (1) w każdym wątku o długach/inwestowaniu pojawiają się nazwiska (Szafrański) i „polecany przez wielu” (tytuł @broker) — decyzja społeczna, nie produktowa; (2) darmowe substytuty są dosłownie na tej samej stronie wyników co nasza reklama; (3) bank już kategoryzuje wydatki za darmo; (4) sufit cenowy anonimowych PDF-ów to 3–29 zł, nie 49 zł.

---

## 5. Reklamy (Meta Ad Library / sieć)

- **Meta Ad Library: brak dostępu** (`www.facebook.com` zablokowany przez proxy).
- Ślady reklam/promocji w wynikach [T]: post FB Iwucia „Dołącz do kursu Zacznij Skutecznie Inwestować 👉 https://fincrafters.pl najlepsza cena t…” (https://www.facebook.com/finansebardzoosobiste/posts/...1319360690199995/); wideo „#wtorek 127: Startujemy z FinCrafters! Co to jest? Jak działa? I ile kosztuje?”; fanpage EasyBudget (https://www.facebook.com/easybudgetpl/); promocja na Pepper „Kurs Marcin Iwuć: Zacznij Inwestować! Darmowe Wyzwanie 15.09” (https://www.pepper.pl/promocje/kurs-marcin-iwuc-zacznij-skutecznie-inwestowac-darmowy-1113892) — mechanika lead-magnet → wyzwanie → kurs, z „najniższą ceną tylko do 29.09.2025” [S].
- **CPC** [S] — w podsumowaniu wyników (zestaw: https://verseo.pl/jakie-sa-koszty-reklamy-na-facebooku-budzet-na-meta-ads-od-jakiej-kwoty-warto-zaczac/ ; https://kcmobile.pl/baza-wiedzy/facebook-ads/cpm-cpc-ctr-metryki-facebook-ads-znaczenie/ ; https://artursmolicki.com/blog/stawki-cpc-w-polsce/ ; https://followdeer.pl/blog/optymalny-budzet-reklamowy-w-meta-ads/) pojawiły się widełki: „średni CPC w Polsce w 2026 to 0,50–3,50 zł”; „w konkurencyjnych branżach – takich jak finanse czy nieruchomości – koszt kliknięcia może przekraczać 5–8 zł”; „w bardziej konkurencyjnych branżach (np. edukacja, finanse) CPC może regularnie przekraczać 15 zł”. Przypisanie do konkretnej strony niepewne; to benchmarki agencyjne, nie dane z kampanii. **Arytmetyka dla 300 zł:** 0,5–3,5 zł → 86–600 kliknięć; 5–8 zł → 37–60; 15 zł → 20.
- **Polityka Meta (finanse) 2026** [S/T]: „Wniosek o miliardową karę i nagły zwrot. Meta zmienia zasady reklam w Polsce” (https://imagazine.pl/2026/08/29/meta-weryfikacja-reklam-finansowych-polska-dsa/): obowiązkowa procedura KYC dla „każdego podmiotu oferującego usługi finansowe i kierującego kampanie do odbiorców w Polsce”, „weryfikacji będzie podlegać 100% reklamodawców usług finansowych”; Polska „w pierwszej grupie państw”; cel globalny: 90% przychodów reklamowych od zweryfikowanych podmiotów do końca 2026 (70% w 2025). Potwierdzenia: https://www.rp.pl/media/art45067611-meta-mieknie-pod-naciskiem-polski-zuckerberg-wprowadza-zmiany-nad-wisla ; https://about.fb.com/news/2026/09/prostujemy-fakty-o-walce-z-oszukanczymi-reklamami-w-polsce/ ; https://www.bankier.pl/wiadomosc/Polska-zada-miliarda-zlotych-kary-dla-Mety-Gigant-natychmiast-reaguje-9188901.html. Polityka bazowa: https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/ ; https://www.facebook.com/business/help/438252513416690 ; poradnik agencyjny: https://reklama-saint.pl/reklama-uslug-finansowych-jak-nie-zlamac-zasad-w-meta-ads/ (w wynikach: w odwołaniu od blokady „dołącz dokumenty potwierdzające legalność usługi (np. wpis do KNF)” [S]).
- **Czy „kurs/planer budżetowy” podlega tej weryfikacji — [ND]**; wyniki nie rozstrzygają. Ryzyko praktyczne (moja ocena, nie dowód): nowe, anonimowe konto + słowa „inwestowanie/IKE/ETF/zysk” = wysokie prawdopodobieństwo odrzucenia/weryfikacji; „planer budżetu/aplikacja/rozmowa w związku” — niższe.

---

## 6. Voice of Customer

Uwaga: wszystkie cytaty poniżej to **tytuły wpisów/stron widoczne w wynikach** (verbatim, z urwaniami „…” jak w źródle). Treści komentarzy nie pozyskano.

**A. „Nie ogarniam budżetu / gdzie znikają pieniądze”**
1. „Prowadzicie sobie budżet domowy co do złotówki każdą transakcję gotówk…” — https://wykop.pl/wpis/42645007/prowadzicie-sobie-budzet-domowy-co-do-zlotowki-kaz
2. „Budżet domowy - rozpoczynamy jego prowadzenie” — https://wykop.pl/link/4825629/budzet-domowy-rozpoczynamy-jego-prowadzenie
3. „Budżet domowy. Po co zapisywać wydatki? | Jak oszczędzać pieniądze?” — https://wykop.pl/link/1875202/budzet-domowy-po-co-zapisywac-wydatki-jak-oszczedzac-pieniadze/
4. „Przepis na dobry budżet domowy” — https://wykop.pl/link/4673701/przepis-na-dobry-budzet-domowy
5. „Nie zaczynaj ogarniać finansów, zanim nie poznasz tych 6 pułapek” (tytuł wideo Iwucia — język, którym mówi rynek) — https://www.youtube.com/watch?v=KnySDZI79W8
6. „Zapytałem AI, jak oszczędzać przy zarobkach 5 tys. zł "na rękę". Jest w tym jeden haczyk” — https://natemat.pl/595427,ai-podal-mi-sposoby-na-oszczedzanie-chatgpt-pokazal-gotowy-plan-wydatkow

**B. „Ile poduszki i gdzie ją trzymać”**
7. „Ile kasy (wypłat) to dobra poduszka finansowa? Jak to policzyć?” — https://wykop.pl/wpis/57964419/ile-kasy-wyplat-to-dobra-poduszka-finansowa-jak-to
8. „Poduszka finansowa - gdzie ją trzymać? Moje jedyne doświadczenie z …” — https://wykop.pl/wpis/55424131/poduszka-finansowa-gdzie-ja-trzymac-moje-jedyne-do
9. „Mirki, moja poduszka finansowa to lekko ponad 3 pensje netto. W dobie …” — https://wykop.pl/wpis/63186119/mirki-moja-poduszka-finansowa-to-lekko-ponad-3-pen
10. „Jak myślicie, jak wielka powinna być poduszka finansowa na "czarną god…” — https://wykop.pl/wpis/8244096/jak-myslicie-jak-wielka-powinna-byc-poduszka-finan
11. „jaka w tych czasach jest twoim zdaniem rozsadna poduszka finansowa, za…” — https://wykop.pl/wpis/79736803/jaka-w-tych-czasach-jest-twoim-zdaniem-rozsadna-po
12. „W co polecacie obecnie włożyć 10k poduszki finansowej by straciła na w…” — https://wykop.pl/wpis/66523547/w-co-polecacie-obecnie-wlozyc-10k-poduszki-finanso
13. „Polacy budują poduszki finansowe. Wystarczy 1000 zł, by czuli się zabezpieczeni” — https://wykop.pl/link/6342459/polacy-buduja-poduszki-finansowe-wystarczy-1000-zl-by-czuli-sie-zabezpieczeni

**C. „Wpadłem w długi / chwilówki”**
14. „Pomóż mi wyjść z długów” — https://wykop.pl/link/7772549/pomoz-mi-wyjsc-z-dlugow
15. „#chwilowki #finanse Jak wyjść z długów? Nie mam ich wiele, około 2500…” — https://wykop.pl/wpis/51090121/chwilowki-finanse-jak-wyjsc-z-dlugow-nie-mam-ich-w
16. „W---------e się kiedyś w chwilówki? Jak najlepiej wyjść z tego, poleca…” — https://wykop.pl/wpis/79276163/wjebaliscie-sie-kiedys-w-chwilowki-jak-najlepiej-w
17. „Mircy, co byście zrobili na moim miejscu? Mam… kredyt” — https://www.wykop.pl/wpis/66977003/mircy-co-byscie-zrobili-na-moim-miejscu-mam-kredyt/

**D. „Który ETF / IKE czy IKZE — i komu wierzyć”**
18. „Jaki etf całorynkowy akumulujący wybrać na ike/ikze, czyli hajs tylko …” — https://wykop.pl/wpis/64619057/jaki-etf-calorynkowy-akumulujacy-wybrac-na-ike-ikz
19. „W ramach IKE/IKZE chciałbym zainwestować w jakiegoś ETFa sp500/all-wor…” — https://wykop.pl/wpis/84715457/w-ramach-ike-ikze-chcialbym-zainwestowac-w-jakiego
20. „Mirki, tak się zastanawiam jaki sens jest wybierać polecany przez wiel…” — https://wykop.pl/wpis/74450341/mirki-tak-sie-zastanawiam-jaki-sens-jest-wybierac-
21. „IKE/IKZE w XTB w 30 minut i zakup pierwszego ETF-a – ZOBACZ, jak to zrobić” — https://www.youtube.com/watch?v=9UqVl9tq0Dw
22. „W co inwestować 100 zł miesięcznie? Konkrety.” — https://youtube.com/watch?v=DjxNbPFPjOk

**E. Pary i pieniądze**
23. „Pieniądze Polaków w związkach. Na co wydajemy i jak dzielimy się rachunkami?” — https://www.pap.pl/aktualnosci/pieniadze-polakow-w-zwiazkach-na-co-wydajemy-i-jak-dzielimy-sie-rachunkami
24. „Finanse w związku [ebook + karty…” (post sprzedażowy) — https://www.facebook.com/kobietaipieniadze/photos/...1400613994761363/
25. „Finanse w związku: razem czy osobno?” — https://goldsaver.pl/blog/artykul/finanse-w-zwiazku/

**F. AI w finansach**
26. „Budżet domowy z AI: Jak zautomatyzować kontrolę wydatków w 2026 roku” — https://mamopracuj.pl/budzet-domowy-z-ai-jak-zautomatyzowac-wydatki-w-2026-roku/
27. Prompt (verbatim): „W załączniku przesyłam zdjęcia moich paragonów. Wypisz z nich wszystkie wydatki i pogrupuj je w kategorie: Jedzenie, Chemia/Kosmetyki, Transport, Ubrania, Rozrywka.” — źródło w zestawie wyników (najpewniej mamopracuj.pl)
28. Martia (obietnica produktu): „ile wydaliśmy razem na jedzenie w marcu?” — https://martia.pl/aplikacja-do-budzetu-domowego-2026

**Słowa, których używają ludzie:** „ogarnąć finanse”, „budżet domowy”, „co do złotówki”, „poduszka finansowa” (liczona w „pensjach netto”/„wypłatach”), „czarna godzina”, „hajs”, „chwilówki”, „wyjść z długów”, „krok po kroku”, „konkrety”, „polecany przez wielu”, „mirki/mircy” (Wykop), „na rękę”, „wkład własny”, „koperty”.

**Moment zakupu (dowody + hipotezy):**
- Dowody z kalendarza twórców [T]: styczeń („Reaktywacja postanowień noworocznych - Budżet domowy w tydzień” — https://jakoszczedzacpieniadze.pl/budzet-domowy-w-tydzien-3), czerwiec („Zaplanuj budżet domowy zanim pojedziesz na wakacje” — https://jakoszczedzacpieniadze.pl/budzet-domowy-w-tydzien-4), wrzesień („Witaj szkoło! Kolejny nabór do kursu…” — https://jakoszczedzacpieniadze.pl/budzet-domowy-w-tydzien-2), Q4 („93 dni do końca roku – wykorzystaj TEN plan…” — https://www.youtube.com/watch?v=9aVV9UM1pus), koniec roku dla IKZE (Wykop [S]: „jeśli masz IKE/IKZE i nie wypełniłeś limitu, możesz dopłacić do końca roku”).
- Google Trends [S, ogólnikowe]: „największy wzrost wyszukiwań na przełomie grudnia i stycznia, czyli w okresie postanowień noworocznych” (https://artursmolicki.com/blog/jak-wykorzystac-sezonowosc-w-kampanii-google-ads/ lub https://www.shopify.com/pl/blog/jak-wykorzystac-google-trends-do-rozpoczecia-i-prowadzenia-biznesu — przypisanie niepewne; brak danych dla konkretnej frazy).
- Hipotezy (bez dowodu): dzień po wypłacie; po „szoku” (utrata pracy, dług — wątek 27 000 zł); po kłótni o pieniądze / przed wspólnym mieszkaniem.

---

## 7. Persona problemowa (szkic) — dla hybrydy „Budżet w 15 minut + moduł AI”

- **Kim jest (hipoteza oparta na VoC, nie na badaniu):** 26–38 lat, etat lub B2B, mieszka w mieście, „zarabia przyzwoicie, ale pod koniec miesiąca nie wie, gdzie poszły pieniądze”. Ma konto w mBanku/ING/PKO, więc widział kategorie w apce banku — i nic z tym nie zrobił.
- **Co już próbował:** darmowy arkusz Excel (porzucony po 2 tygodniach), może trial appki z subskrypcją (nie chce kolejnych 15–25 zł/mies.), obejrzał 3 filmy Iwucia/Pankracego („wiem, że powinienem”).
- **Ból w jego słowach:** „nie umiem oszczędzać”, „chcę wreszcie ogarnąć finanse”, „ile powinienem mieć poduszki?”, „nie chcę logować banku do jakiejś apki”.
- **Bariery zakupu:** nieufność do nieznanej marki (finanse = scam-alert po aferze reklam na Meta 2026), „po co płacić, skoro Excel jest za darmo”, strach przed kolejną porzuconą metodą.
- **Czego chce naprawdę:** poczucia kontroli w jeden wieczór, bez laptopa; prostego planu na 30 dni; żeby „coś” pokazało mu, ile może odłożyć.
- **Trigger czasowy:** wypłata, poniedziałek, styczeń/wrzesień, „93 dni do końca roku”.
- **Telefon w ręku:** tak — wieczór na kanapie, kolejka w sklepie (koperty), po zakupach (wpis wydatku).

---

## 8. Ryzyka

| Ryzyko | Ocena | Dowód / komentarz |
|---|---|---|
| **Meta — weryfikacja reklamodawców finansowych w PL (2026)** | wysokie | KYC dla „100% reklamodawców usług finansowych” (https://imagazine.pl/2026/08/29/meta-weryfikacja-reklam-finansowych-polska-dsa/). Nie wiadomo, czy obejmie kursy/planery [ND]; nowe anonimowe konto z „inwestowaniem” w kreacji = duże ryzyko blokady. Mitigacja: kreacja „aplikacja/planer/związek”, zero słów „inwestycje/zysk/IKE”. |
| **Koszt dotarcia** | wysokie | Benchmarki CPC 5–15 zł dla „finanse” [S] → 20–60 kliknięć za 300 zł. Brief zakłada 150–300. Tylko kreacje poza „finansami” mają szansę na 0,5–3,5 zł. |
| **Zaufanie do anonimowej marki** | wysokie | Rynek kupuje nazwiska (Szafrański/Iwuć: setki tysięcy egz.); w wątkach polecają „kurs Szafrańskiego”; brak dowodu sprzedaży anonimowej *edukacji*. Mitigacja: sprzedawać *narzędzie* (jak EasyBudget/Martia), gwarancja zwrotu, „dane zostają w Twoim telefonie”. |
| **Prawne — doradztwo inwestycyjne** | średnie (niskie dla budżetu, wysokie dla IKE/ETF) | Art. 76 ust. 1 ustawy o obrocie instrumentami finansowymi (verbatim z wyniku): „Doradztwo inwestycyjne polega na przygotowywaniu, z inicjatywy firmy inwestycyjnej albo na wniosek klienta, oraz przekazywaniu klientowi, określonej w art. 9 rozporządzenia 2017/565, pisemnej, ustnej lub w innej formie, w szczególności elektronicznej, spełniającej wymóg trwałego nośnika, przygotowanej w oparciu o potrzeby i sytuację klienta rekomendacji, dotyczącej nabycia lub zbycia jednego instrumentu finansowego lub większej ich liczby, albo dokonania innej czynności wywołujące[…]” — https://przepisy.gofin.pl/przepisyno,1039,187166,0,0,20180201,3,0.html (także https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/obrot-instrumentami-finansowymi-17220859/art-76 ; https://arslege.pl/doradztwo-inwestycyjne/k384/a32940/). Kluczowe elementy: **rekomendacja + konkretny instrument + oparta na potrzebach i sytuacji klienta**. Stanowisko UKNF z 14.02.2020 (https://www.knf.gov.pl/knf/pl/komponenty/img/Stanowisko_UKNF_ws_doradztwa_inwestycyjnego.pdf) — wg omówień (https://krwlegal.pl/aktualnosci/uknf-publikuje-zaktualizowane-stanowisko-w-sprawie-swiadczenia-uslug-doradztwa-inwestycyjnego ; https://www.opinieprawne.com/kiedy-jest-swiadczona-usluga-doradztwa-inwestycyjnego/): o kwalifikacji decydują „okoliczności faktyczne i kontekst usługi”, istotą jest **osobisty charakter** i dobór instrumentów pod indywidualne potrzeby/sytuację. Osobne stanowisko UKNF o **robo-doradztwie** (2020; https://finregtech.pl/2020/05/10/jest-stanowisko-uknf-w-sprawie-robo-doradztwa-jest-dobrze/ ; https://bank.pl/nowe-stanowisko-knf-ws-robo-doradztwa/) — istotne: **interaktywne narzędzie, które na podstawie danych użytkownika wypluwa „kup ETF X u brokera Y”, może być robo-doradztwem**. Sankcja: art. 178 — działalność bez zezwolenia: grzywna do 5 000 000 zł (wg części źródeł także do 5 lat pozbawienia wolności) — https://standardyprawa.pl/akt/231/art/28224 ; https://www.adwokatdulniak.pl/przestepstwo-obrotu-instrumentami-finansowymi-bez-wymaganego-zezwolenia/. **Bezpieczna strefa:** edukacja ogólna, kalkulatory podatkowe/limitów, porównanie opłat (fakty), checklisty procesu — bez wskazywania instrumentów pod dane użytkownika. |
| **Disclaimery** | niskie | Twórcy PL używają formuły, że treści „nie stanowią rekomendacji inwestycyjnej w rozumieniu Rozporządzenia Ministra Finansów z dnia 19 października 2005 r.” (np. https://www.michalstopka.pl/zastrzezenie-prawne/ ; https://econopedia.pl/zastrzezenia-prawne/ ; https://blog.tomaszdunia.pl/skarbonka-tomka-portfel-inwestycyjny/). Uwaga: to rozporządzenie **utraciło moc 6 maja 2017** [S] (https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20052061715 ; https://www.infor.pl/akt-prawny/DZU.2005.206.0001715,...) — wiele disclaimerów jest przestarzałych; aktualną podstawę (przepisy unijne o rekomendacjach) potwierdzić z prawnikiem. Sam disclaimer nie chroni, jeśli narzędzie faktycznie personalizuje rekomendacje. |
| **Sezonowość** | średnie | Szczyt styczeń [S]; test w Q4 ma haczyki („93 dni…”, wrzesień „Witaj szkoło”), ale grudzień to walka o uwagę z e-commerce. |
| **Konkurencja darmowa** | wysokie | Banki, arkusze, Martia 0 zł, kalkulator IKE/IKZE Iwucia 0 zł, promptuj.pro 0 zł. |
| **Prywatność / ChatGPT** | średnie | Moduł AI zachęca do wklejania wyciągów do ChatGPT — konieczne instrukcje anonimizacji i ostrzeżenie; inaczej ryzyko reputacyjne. |
| **Aktualność treści** | średnie (IKE/IKZE), niskie (budżet) | Limity IKE/IKZE 2026 w źródłach **rozbieżne** („IKE 23 472 zł, IKZE 9 388,80 zł” vs „IKE ok. 26 000 zł, IKZE ok. 10 000 zł” [S]) — produkt inwestycyjny wymaga corocznej aktualizacji i weryfikacji. |
| **Cena 49 zł** | średnie | Sufit anonimowych PDF-ów to 3–29 zł; 49 zł wymaga „efektu aplikacji” (interakcja, zapis stanu, PDF). |

---

## 9. Ocena wg rubryki (1–5)

### 9.1 Pre-screening 6 podnisz (sumy, szczegóły dla top-3 niżej)
| Podnisza | Suma /70 | Główny powód |
|---|---|---|
| (3) „Ogarnij finanse z ChatGPT” — metoda + prompty + mobilny kreator | **56** | luka rynkowa, spójne z AI-awatarem, tanie w produkcji; ale popyt zakupowy nieudowodniony |
| (5) „Finanse we dwoje” — karty do rozmowy + kalkulator wspólnego budżetu | **55** | dobre targetowanie Meta (status związku), niskie ryzyko, słaba konkurencja; ale mało dowodów popytu |
| (1) „Budżet domowy w 15 minut” — planer kopertowy na telefonie | **54** | udowodniony ból i płatność (197 zł kurs, appki 15–25 zł/mies.); ale masa darmowych substytutów |
| (4) Poduszka + plan spłaty długów | 44 | silny ból, ale uboga persona, słaby upsell, ryzyko reklamowe |
| (6) Pierwsze mieszkanie / zdolność kredytowa checklist | nieoceniane (brak dowodów poza sukcesem Iwucia: „85 000 zł w trzy dni”) | kredyt = słownictwo finansowe w reklamie; zaufanie krytyczne |
| (2) IKE/IKZE/ETF krok po kroku | 39 | darmowy kalkulator Iwucia, rankingi, granica doradztwa, polityka Meta, „bez twarzy” najsłabsze |

### 9.2 Koncept A — „Ogarnij finanse z ChatGPT” (29–39 zł)
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 3 | Ból „nie ogarniam finansów” realny (VoC A), ale „z ChatGPT” to sposób, nie ból — nikt nie szuka „promptów finansowych” (brak VoC [ND]). |
| 2 | Wyjaśnialność | 4 | „Wklej wyciąg do ChatGPT i w 20 minut miej plan miesiąca — gotowe prompty i metoda krok po kroku.” |
| 3 | Dotarcie Meta | 4 | Targetowanie zainteresowaniami AI/produktywność; kreacja bez słowa „inwestycje” ma szansę na CPC 0,5–3,5 zł [S]. |
| 4 | Konkurencja | 4 | Tylko darmowe artykuły z 1–3 promptami (mamopracuj, GMC, promptuj.pro); płatnego produktu PL nie znalazłem. |
| 5 | Dowody popytu | 2 | Zainteresowanie medialne (5+ artykułów 2025–26), zero dowodów płacenia. |
| 6 | Szybkość produkcji | 5 | 1–3 dni: 12–15 promptów + kreator + instrukcja anonimizacji. |
| 7 | Bez eksperta | 4 | Właściciel zna AI; ryzyko: prompty są łatwo kopiowalne i banalne bez metody. |
| 8 | Wizual reklam | 4 | Screen „przed/po”: chaos wyciągu → tabela kategorii i plan. |
| 9 | Upsell | 4 | Paczki promptów: podatki JDG, negocjacja abonamentów, zakupy tygodniowe, planer 2027. |
| 10 | Marża ≤49 zł | 5 | Koszt krańcowy ~0; użytkownik płaci za swój ChatGPT. |
| 11 | Ryzyko prawne/reklamowe | 4 | Budżet ≠ instrument finansowy; ryzyko prywatności danych (trzeba uczyć anonimizacji). |
| 12 | Wejście w kilka dni | 4 | Brak certyfikatów; jedyny hamulec — nowe konto reklamowe. |
| 13 | Fit „telefon w ręku” | 4 | Kopiuj prompt → apka ChatGPT → wklej wynik do planera; naturalne, choć wklejanie CSV bywa desktopowe. |
| 14 | Bez twarzy | 5 | Marka „AI ogarnia finanse” jest bardziej wiarygodna bez guru niż z nim. |
| | **Suma** | **56** | |

### 9.3 Koncept B — „Finanse we dwoje” (29–39 zł)
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 3 | 23% wskazuje pieniądze jako źródło konfliktów [S], ale to ból utajony, rzadko aktywnie „wyszukiwany”. |
| 2 | Wyjaśnialność | 4 | „30 kart do rozmowy o pieniądzach bez kłótni + kalkulator, jak sprawiedliwie dzielić koszty.” |
| 3 | Dotarcie Meta | 4 | Status związku/zaręczyny/wspólne mieszkanie = precyzyjne targetowanie; kreacja emocjonalna, nie „finansowa”. |
| 4 | Konkurencja | 4 | Jeden płatny produkt (49 zł, przeceniony ze 158 zł), książki; Martia dopiero buduje moduł par. |
| 5 | Dowody popytu | 2 | Statystyki + jeden produkt; brak wątków VoC i danych sprzedażowych [ND]. |
| 6 | Szybkość produkcji | 4 | Karty + prosty kalkulator proporcjonalny + plan wspólnego budżetu: 2–3 dni. |
| 7 | Bez eksperta | 4 | Treść kart wymaga wyczucia (psychologia), ale nie certyfikatu. |
| 8 | Wizual reklam | 4 | Animacja kart na telefonie, scenka „on/ona”. |
| 9 | Upsell | 4 | Planer budżetu domowego, checklista „pierwsze wspólne mieszkanie”, planer ślubny. |
| 10 | Marża ≤49 zł | 4 | 29–39 zł jednorazowo; konkurent ustawił kotwicę 49 zł. |
| 11 | Ryzyko prawne/reklamowe | 5 | Zero instrumentów finansowych; reklama relacyjna, nie finansowa. |
| 12 | Wejście w kilka dni | 4 | — |
| 13 | Fit „telefon w ręku” | 5 | Kanapa, wieczór, jeden telefon między dwojgiem — idealny moment użycia. |
| 14 | Bez twarzy | 4 | Karty = narzędzie; nikt nie pyta, kto je napisał (kotwica: talie kart jako produkt). |
| | **Suma** | **55** | |

### 9.4 Koncept C — „Budżet domowy w 15 minut” (29–39 zł)
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 4 | Najwięcej wątków (Wykop #budzetdomowy), kurs za 197 zł istnieje właśnie dla tych, którym „nie wychodzi”. |
| 2 | Wyjaśnialność | 5 | „Ustaw budżet domowy na telefonie w 15 minut. Bez Excela, bez logowania do banku.” |
| 3 | Dotarcie Meta | 3 | Szeroka grupa, płytkie targetowanie; słowo „budżet” może wpaść pod filtr finansowy [ND]. |
| 4 | Konkurencja | 2 | Banki, arkusze, Canva, Martia 0 zł, EasyBudget trial — substytuty na wyciągnięcie ręki. |
| 5 | Dowody popytu | 4 | 197 zł kurs (>500 sprzedanych), aplikacje 15–25 zł/mies., planery (49 zakupów/30 dni). |
| 6 | Szybkość produkcji | 3 | Interaktywny planer z zapisem stanu i PDF: 3–5 dni. |
| 7 | Bez eksperta | 5 | Metoda kopertowa/50-30-20 jest domeną publiczną. |
| 8 | Wizual reklam | 4 | Nagranie ekranu: 6 pytań → gotowy plan → koperty. |
| 9 | Upsell | 4 | Moduł AI, „we dwoje”, poduszka + plan spłaty, planer roczny PDF. |
| 10 | Marża ≤49 zł | 4 | Jednorazowo 29–39 zł kontra subskrypcje — argument sprzedażowy. |
| 11 | Ryzyko prawne/reklamowe | 4 | Prawnie czysto; reklamowo — ryzyko klasyfikacji „finanse”. |
| 12 | Wejście w kilka dni | 3 | Produkt wymaga dopracowania UX, inaczej przegra z darmowym arkuszem. |
| 13 | Fit „telefon w ręku” | 5 | Wpisywanie wydatków i sprawdzanie kopert to czynności telefoniczne. |
| 14 | Bez twarzy | 4 | Narzędzie, nie nauczyciel; EasyBudget/Martia sprzedają bez twarzy. |
| | **Suma** | **54** | |

---

## 10. Produkt interaktywny (telefon) + upsell — rekomendacja: hybryda „C + moduł A”

**Nazwa robocza:** „Ogarnij Budżet w 15 minut” (marka: narzędzie, nie guru; AI-awatar jako „asystent”, nie „ekspert od finansów”).

**Co dostaje klient po zapłacie (link, mobile-first, bez instalacji):**
1. **Start (2 min):** 6 pytań — dochód netto, wydatki stałe, ile osób, cel (poduszka / wakacje / spłata), dzień wypłaty, styl (koperty vs 50/30/20).
2. **Plan miesiąca (5 min):** automatyczny podział na koperty (edytowalne suwaki), „ile możesz odłożyć” w czasie rzeczywistym, wykres 30 dni.
3. **Koperty w kieszeni (codziennie 20 s):** dodaj wydatek → koperta się kurczy; dane w `localStorage` (komunikat: „nic nie wysyłamy, bank nie jest potrzebny” — bezpośrednia odpowiedź na deficyt zaufania anonimowej marki).
4. **Poduszka (1 min):** kalkulator „ile pensji netto” (język z Wykopu) + plan dojścia.
5. **Moduł AI „Ogarnij z ChatGPT” (wyróżnik):** 12 promptów krok po kroku (kategoryzacja wyciągu CSV, „gdzie uciekają pieniądze”, plan cięć 10%, negocjacja abonamentów, tygodniowa lista zakupów), kreator promptu wypełniany danymi z planera + **instrukcja anonimizacji** (usuń numery kont, nazwiska).
6. **Eksport:** PDF planu + plik `.ics` z przypomnieniami (dzień wypłaty, przegląd tygodniowy) — darmowe, bez backendu.
7. **Gwarancja 14 dni** i FAQ „czym różni się od Excela/appki banku” (jednorazowa opłata, bez subskrypcji, bez logowania do banku, telefon).

**Cena:** 39 zł (test A/B 29 zł). Argument: mniej niż 3 miesiące EasyBudget (15 zł/mies.), 5× taniej niż kurs (197 zł).

**Upsell naturalny (kolejność):**
- **„Budżet we dwoje”** (29 zł): 30 kart do rozmowy + kalkulator proporcjonalnego podziału kosztów + wspólny plan — targetowany do kupujących w związku.
- **„Wyjdź z długów: plan spłaty”** (19 zł): kula śnieżna/lawina do 8 zobowiązań, harmonogram, checklisty (bez porad prawnych).
- **Pakiet „Ogarnij rok 2027”** (69 zł): wszystko + planer roczny PDF (sprzedaż grudzień–styczeń, szczyt sezonu).
- **Nie robić teraz:** „IKE/IKZE start” — dopiero po zbudowaniu listy mailowej i po ustaleniu, jak Meta traktuje kursy finansowe po weryfikacji 2026; jeśli kiedyś — wyłącznie edukacja/kalkulator podatkowy, bez wskazywania instrumentów pod dane użytkownika (art. 76; stanowisko UKNF o robo-doradztwie).

**Kreacje reklamowe (żeby nie wpaść w koszyk „finanse”):** język „aplikacja/planer/15 minut/telefon/we dwoje”, bez „inwestycje, zysk, IKE, ETF, kredyt”; wideo z ekranem narzędzia; hook Q4: „Zostało 93 dni do końca roku — ustaw budżet w 15 minut”.

**Kryteria sygnału z testu (300 zł):** ≥60 kliknięć przy CPC ≤5 zł, ≥3 zakupy (CR ≥5% na landingu) lub ≥20 zapisów na listę „Planer 2027” — poniżej tego kierunek C zamykamy.
