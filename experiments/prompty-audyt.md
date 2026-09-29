# Prompty do niezależnych audytów (do wklejenia w zewnętrznym agencie / do przekazania człowiekowi)

Oba prompty zakładają, że agent dostaje pliki z repo (gałąź `claude/amazing-edison-dxulwx`). Lista plików jest w każdym prompcie.

---

## PROMPT A — audyt zakresu, konkurencji i ceny (bez merytoryki motoryzacyjnej)

```
ROLA
Jesteś niezależnym audytorem produktów cyfrowych i pricingu na rynku polskim (B2C, produkty ≤ 100 zł sprzedawane z reklam Meta). Nie jesteś naszym fanem. Twoim zadaniem jest znaleźć, gdzie ten produkt i jego cena się nie bronią, i udowodnić to danymi. Nie oceniasz poprawności motoryzacyjnej treści (robi to inny audyt) — oceniasz ZAKRES, KONKURENCJĘ, OFERTĘ i CENĘ.

KONTEKST
Produkt: „Odhacz Auto” — interaktywna checklista oględzin używanego auta na telefon (strona www po zakupie, bez instalacji). 7 etapów, 160 punktów (co sprawdzić / jak / dlaczego), odpowiedzi OK / Uwaga / Problem / Pomiń, pola na pomiary lakieru (µm), zdjęcia i notatki przy punktach, licznik czerwonych flag i dealbreakerów, skrypt rozmowy telefonicznej ze sprzedawcą, podsumowanie z decyzją (kup / negocjuj / mechanik / odpuść) i automatyczna „lista uwag do negocjacji” (kopiuj / PDF), kilka aut naraz, dostęp 24 miesiące. Cena 39 zł jednorazowo. Dodatek w koszyku „Po zakupie” (umowa, PCC-3, rejestracja, OC, pierwszy serwis, terminy do kalendarza) 19 zł. Marka nowa i anonimowa (postać AI „Hacz” jako przewodnik, firma w stopce). Sprzedaż z Meta Ads, budżet testu 300 zł. Klient docelowy: osoba 24–42 lata kupująca auto używane z ogłoszenia (Otomoto/OLX) za 20–40 tys. zł od osoby prywatnej, nie mechanik, ogląda auto sam lub ze znajomym, moment zakupu: wieczór przed oględzinami.

PLIKI, KTÓRE DOSTAJESZ (przeczytaj wszystkie, zanim zaczniesz)
- product/oferta.md — oferta, transformacja, cena, upsell, gwarancja
- persona/persona.md — persona i jej słowa
- landing/copy-deck.md — pełny tekst strony sprzedażowej (v2)
- product/content/auto.md — spis treści produktu (tylko do oceny ZAKRESU: co jest, czego nie ma; nie oceniaj poprawności technicznej)
- product/content/po-zakupie.md — zakres dodatku
- research/dir-D-checklisty.md i research/10-wybor-produktu.md — nasz research konkurencji (możesz go podważać)
- experiments/devils-advocate-01.md — poprzednia krytyka (nie powtarzaj jej; sprawdź, czy została zaadresowana, i szukaj tego, czego tam nie ma)
- ads/01-angles-i-copy.md — reklamy

ZADANIA
1. ZAKRES PRODUKTU. Porównaj to, co produkt obiecuje (oferta, landing), z tym, co faktycznie zawiera (spis treści). Wypisz: (a) obietnice bez pokrycia, (b) elementy, których klient za 39 zł oczekuje, a ich nie ma, (c) elementy zbędne, które dodają tarcia lub czasu, (d) czy 160 punktów i ~60 minut przy aucie to dla tej persony zaleta czy przeszkoda — uzasadnij.
2. KONKURENCJA — PEŁNA MAPA (Polska, stan na dziś). Znajdź i sprawdź u źródła WSZYSTKIE realne alternatywy klienta: darmowe checklisty PDF (m.in. Automarket, AutoBezWtopy, AutoKarma, Autobaza), płatne checklisty (m.in. jaksprawdzacauta.pl ~19,90 zł, 134 punkty), darmowe narzędzia interaktywne (m.in. kupbezwtopy.pl), raporty AI/VIN (m.in. Autolert, carVertical, autoDNA, historiapojazdu.gov.pl), aplikacje w Google Play / App Store, usługi mobilnych mechaników i inspekcji (m.in. Autotesto 449–749 zł, Otomoto sprawdzenie), stacje diagnostyczne, kanały YouTube/TikTok z poradnikami. Dla każdej: URL, cena, co dokładnie daje, czego nie daje, jak jest promowana (sprawdź Bibliotekę reklam Meta: facebook.com/ads/library, kraj PL). Zbuduj macierz „funkcja × alternatywa” (min. 15 funkcji: prowadzenie krok po kroku przy aucie, pomiar lakieru element po elemencie, zdjęcia przy punktach, licznik dealbreakerów, lista do negocjacji, skrypt rozmowy, kilka aut, offline, cena, wymagana instalacja itd.). Wskaż, co jest naszą realną przewagą, a co tylko tak nazwaliśmy.
3. CZY KTOŚ TO KUPI ZA 39 ZŁ — UZASADNIENIE CENOWE. (a) Zbierz dowody skłonności do płacenia w tej sytuacji: ceny i popularność płatnych checklist, raportów VIN, usług; komentarze i wątki, gdzie ludzie mówią, ile są gotowi zapłacić za pewność przy zakupie auta; ceny analogicznych narzędzi jednorazowych w PL (kalkulatory, checklisty, mini-aplikacje). (b) Oceń kotwice: „39 zł to mniej niż paliwo na dojazd”, „PDF 19,90 zł”, „mechanik 449–749 zł”, „raport VIN ~90 zł” — które działają na tę personę, które nie. (c) Policz ekonomię: przy CPC 0,8–2,5 zł na Meta w PL i konwersji 0,5 / 1 / 2 / 3% — jaki CPA i czy 39 zł (marża ~30 zł po prowizjach) w ogóle może się spiąć; jaki wpływ ma dodatek 19 zł na średnią wartość koszyka. (d) Zarekomenduj cenę produktu i dodatku z uzasadnieniem (może być 39 zł, może być inna) oraz JEDEN test cenowy, który ma sens przy 300 zł budżetu. (e) Oceń gwarancję zwrotu 14 dni: ryzyko nadużyć vs wzrost konwersji, na przykładach z rynku.
4. OFERTA I ZAUFANIE. Czy landing w 5 sekund mówi, co klient dostaje? Które zdania są niejasne lub brzmią jak każdy inny produkt? Czy „postać AI” pomaga, czy szkodzi zaufaniu (poszukaj przykładów marek B2C w PL, które używają maskotki/AI-persony i sprzedają)? Czego brakuje, żeby nieznana marka dostała 39 zł od osoby, która za 3 dni wyda 30 tys. zł?
5. TO, CZEGO NIE ZAUWAŻYLIŚMY. Wszystko, co uznasz za istotne, a nie mieści się w punktach 1–4 (sezonowość, kanały inne niż Meta, partnerstwa, ryzyka reakcji konkurencji, segmenty, których nie widzimy).

ZASADY
- Każda liczba, cena i cytat ma URL, pod którym to widziałeś. Odróżniaj „widziałem” od „wnioskuję”. Jeśli nie znajdziesz danych, napisz „brak danych” — to lepsze niż zmyślenie.
- Bądź konkretny i bezlitosny, ale uczciwy: jeśli coś jest dobre, napisz to jednym zdaniem i idź dalej.
- Nie oceniaj poprawności technicznej treści motoryzacyjnej.

FORMAT ODPOWIEDZI (po polsku)
1. Werdykt w 5 zdaniach: czy zakres, cena i oferta bronią się dla tej persony — tak / nie / warunkowo, z głównym powodem.
2. Tabela: 10 najważniejszych ustaleń (ustalenie · dowód z URL · waga 1–5 · co zmienić w ≤ 1 dzień).
3. Macierz konkurencji (funkcja × alternatywa).
4. Uzasadnienie cenowe z wyliczeniami i rekomendacją ceny + jednego testu.
5. Lista zdań na landingu do zmiany z propozycją brzmienia.
6. Czego nie udało się sprawdzić i dlaczego.
```

---

## PROMPT B — audyt merytoryczny treści (mechanik / rzeczoznawca)

```
ROLA
Jesteś doświadczonym diagnostą samochodowym i rzeczoznawcą (20+ lat, setki oględzin aut używanych przed zakupem, praktyka w Polsce) i jednocześnie surowym redaktorem tekstów dla laików. Sprawdzasz treść płatnego narzędzia „Odhacz Auto” (interaktywna checklista oględzin używanego auta na telefon, 160 punktów w 7 etapach) oraz dodatku „Po zakupie” (umowa, PCC-3, rejestracja, OC, pierwszy serwis). Odbiorca treści: osoba, która nie jest mechanikiem, ogląda auto z ogłoszenia sama, ma telefon z latarką i ewentualnie tani grubościomierz lakieru. Treść ma być poprawna, bezpieczna, kompletna w rozsądnym zakresie i zrozumiała. Treść napisała AI — zakładaj, że błędy są, i ich szukaj.

PLIKI, KTÓRE DOSTAJESZ
- product/content/auto.md — pełna treść produktu (czytelna wersja; identyczna z auto.json, którego używa aplikacja)
- product/content/SOURCES-auto.md — źródła i lista 16 faktów oznaczonych „do weryfikacji”
- product/content/po-zakupie.md — treść dodatku
- product/content/SOURCES-po-zakupie.md — źródła i fakty do weryfikacji dla dodatku
Każdy punkt ma id (np. p3s2i4), tekst, „jak sprawdzić”, „dlaczego”, poziom (red / yellow / info), ewentualnie „dealbreaker”, pole liczbowe z podpowiedzią widełek i etykietę, która trafia do listy uwag klienta.

ZADANIA
1. WERYFIKACJA PUNKT PO PUNKCIE (wszystkie 160 + dodatek). Dla każdego punktu z problemem podaj: id · co jest źle (błąd merytoryczny / instrukcja niewykonalna dla laika / niebezpieczna / niejasna / zły poziom red-yellow-info / zła etykieta do listy uwag) · poprawne brzmienie · źródło (norma, przepis, dokumentacja producenta, uznana praktyka) · pewność (wysoka / średnia / niska). Punkty bez zastrzeżeń pomiń.
2. PROGI I LICZBY. Sprawdź wszystkie wartości: grubość lakieru (fabryczne widełki na stali i aluminium, kiedy „malowane”, kiedy „szpachla”, różnice między markami, zderzaki plastikowe), bieżnik opon (minimum prawne i praktyczne), DOT i wiek opon, odczyty OBD, temperatury, czasy, odległości, liczby kluczyków, wartości z Historii pojazdu. Jeśli widełki są zbyt wąskie lub zbyt szerokie — podaj lepsze i uzasadnij.
3. DEALBREAKERY. Lista 14 punktów oznaczonych jako „koniec oglądania” (VIN, dokumenty, przebieg, airbag, spawy, odmowy sprzedawcy itd.). Które są za ostre (klient odpuści dobre auto), których brakuje (klient kupi wrak)? Zaproponuj ostateczną listę.
4. LUKI. Czego brakuje, a doświadczony diagnosta zawsze sprawdza? Rozważ m.in.: DPF/EGR i objawy, rozrząd (pasek vs łańcuch) i jego dokumentacja, dwumasowe koło zamachowe, skrzynie automatyczne różnych typów (klasyczny automat, DSG/dwusprzęgłowa, CVT), turbo, instalacja LPG (dokumenty, homologacja, przegląd), hybrydy i elektryki (bateria, stan SOH, ładowarka, dokumentacja), systemy ADAS i kalibracja po wymianie szyby, auta po zalaniu, auta po wystrzale poduszek (ślady), aluminiowe elementy nadwozia, VIN w różnych lokalizacjach zależnie od producenta, auta z importu (USA, Szwajcaria, UK — kierownica), badanie techniczne i adnotacje, ślady użytkowania jako taksówka/flota. Dla każdej luki: czy to punkt na 160-punktową listę dla laika, czy wykracza poza zakres (i wtedy jak o tym uczciwie powiedzieć klientowi).
5. BEZPIECZEŃSTWO I ODPOWIEDZIALNOŚĆ. Czy jakaś instrukcja może narazić klienta (jazda próbna, sprawdzanie pod autem, gorące elementy, praca przy silniku, kontakt z płynami)? Czy jakieś zdanie przekracza granicę między „edukacją” a „orzekaniem o stanie auta”? Czy podsumowanie („kup / negocjuj / mechanik / odpuść”) jest sformułowane bezpiecznie?
6. DODATEK „PO ZAKUPIE” — FAKTY PRAWNE I URZĘDOWE (Polska, stan na dziś): PCC-3 (2%, 14 dni, próg 1000 zł, kiedy nie dotyczy), rejestracja (30 dni, kary, dokumenty, opłaty, zachowanie tablic, e-usługi), OC (przejście polisy, zgłoszenie zbycia, rekalkulacja, kary UFG), badanie techniczne (opłaty), rękojmia przy zakupie od osoby prywatnej vs od przedsiębiorcy, klauzule we wzorze umowy (czy któraś jest szkodliwa dla kupującego lub nieważna). Potwierdź lub popraw każdy z faktów oznaczonych „do weryfikacji” w SOURCES-po-zakupie.md, z linkiem do przepisu lub strony gov.pl.
7. JĘZYK. Wskaż punkty, których laik nie zrozumie lub wykona źle (żargon bez wyjaśnienia, niejednoznaczne „sprawdź”, brak informacji, jak wygląda „źle”). Zaproponuj brzmienie.

ZASADY
- Nie zmyślaj norm ani przepisów. Jeśli czegoś nie jesteś pewien, napisz to wprost i podaj, jak to sprawdzić.
- Odróżniaj „błąd” (trzeba poprawić przed sprzedażą) od „można lepiej” (po starcie).
- Nie oceniaj ceny, marketingu ani konkurencji — tylko treść.

FORMAT ODPOWIEDZI (po polsku)
1. Werdykt: czy treść nadaje się do sprzedaży po poprawkach — TAK / NIE, w 3 zdaniach, z najgroźniejszym błędem na pierwszym miejscu.
2. MUST-FIX przed startem: maks. 15 pozycji (id · błąd · poprawka · źródło).
3. Pełna tabela pozostałych uwag (id · typ · uwaga · poprawka · pewność).
4. Ostateczna lista dealbreakerów.
5. Luki do dodania (z propozycją brzmienia punktu w formacie: tekst / jak sprawdzić / dlaczego / poziom).
6. Weryfikacja 16 + 10 faktów „do weryfikacji” (fakt · potwierdzony / poprawiony · źródło).
7. Jeśli jesteś człowiekiem-mechanikiem i zgadzasz się na podpis „treść sprawdził: [imię, miasto]” — napisz to na końcu.
```
