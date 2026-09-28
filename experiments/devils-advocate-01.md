# Devil's Advocate #1 — dlaczego „Odhacz Auto” NIE sprzeda się z testu Meta za 300 zł

Data: 2026-09-28. Rola: adwokat diabła (subagent). Zakres: oferta, pozycjonowanie, cena, lejek, zaufanie, zgodność reklam, pomiar — nie design.

Przeczytane: `research/00-brief.md`, `research/10-wybor-produktu.md`, `research/dir-D-checklisty.md` (§3, 4, 6, 8), `persona/persona.md`, `product/oferta.md`, `landing/copy-deck.md`, `ads/01-angles-i-copy.md`, `ads/02-kampania.md`, `brand/brand.md`, `analytics/plan-pomiaru.md`, `legal/00-wymogi.md` (§3, 4, 9), `platform/README.md`; dodatkowo `DECISIONS.md`, `EXPERIMENTS.md`, `platform/config/products.json`, `platform/src/{stripe,config,access}.js`, `social/seed-posty.md`, `research/05-policy-legal-tools.md` §D. 15 zapytań WebSearch (tylko snippety — bezpośrednie pobieranie stron jest zablokowane, jak w całym researchu; każdą liczbę przed użyciem w copy potwierdzić u źródła).

Skala: **S** = dotkliwość 1–5 (5 = zabija test), **P** = prawdopodobieństwo 1–5, wynik = S×P. „Zabija test” znaczy jedno z dwojga: (a) nie będzie sprzedaży, (b) test nie odpowie na pytanie, nawet jeśli sprzedaż będzie.

---

## 1. Ranking ryzyk

| # | Ryzyko | S | P | S×P | Jednym zdaniem |
|---|---|---|---|---|---|
| 1 | Moment zakupu („jutro oglądam”) jest nieosiągalny szeroką reklamą, a poza momentem potrzeba jest słaba | 5 | 5 | 25 | W 48-godzinnym oknie przed oględzinami jest ~0,2% widowni; reszta kliknie z ciekawości i nie zapłaci za „polisę na kiedyś”. |
| 2 | Test jest tak skonstruowany, że nie da odpowiedzi (reguła „≥3 zakupy = warto”) | 5 | 5 | 25 | Przy 100–150 wejściach na LP produkt z normalnym CR 1–1,5% daje 0 zakupów w 22–37% przypadków, a „≥3” tylko w 8–34%. |
| 3 | Darmowy interaktywny konkurent już istnieje (kupbezwtopy.pl) — „pierwsza w Polsce” jest nieprawdą, a przewaga formatu znika | 4 | 5 | 20 | Darmowy kreator 6 kroków, offline, instalowalny, raport linkiem; obok Autolert 6,99 zł/raport. |
| 4 | Mechanika dostarczania: Purchase bez danych + Advantage+ ignorujący górny wiek + 6–7 kreacji na 300 zł + świeże konto | 4 | 5 | 20 | Algorytm nie ma z czego się uczyć; „50 lat” to sugestia, nie limit; przy 7 kreacjach żadna nie zbierze porównywalnej próby; nowe konto z celem Sprzedaż od dnia 0 to wzorzec blokady. |
| 5 | Zaufanie w klimacie scam-reklam 2026: nowy fanpage, „postać AI”, nieznana domena, płatnik = prywatne nazwisko, zero opinii | 4 | 4 | 16 | Polski użytkownik jest w 2026 r. trenowany przez media i rząd, żeby nie klikać w nieznane reklamy z awatarem. |
| 6 | Obietnice produktu bez pokrycia (offline, „dodaj do ekranu”, synchronizacja, zdjęcia, 24 miesiące) + treść bez recenzji fachowca | 4 | 4 | 16 | Platforma nie ma service workera ani manifestu; limit postępu 32 KB; Safari kasuje zdjęcia po 7 dniach; jedna publiczna wpadka w komentarzach pod reklamą = CR zero. |
| 7 | Wartość niejasna w 5 sekund: „interaktywna checklista”, H1 bez rezultatu, demo pokazuje najnudniejszy etap, „aplikacja” vs „nie aplikacja” | 3 | 4 | 12 | Klient nie wie, czy dostaje PDF, apkę czy stronę; demo „Zanim pojedziesz” to dokładnie to, co kupbezwtopy daje za darmo. |
| 8 | Copy reklam i claimów: „65% aut z ogłoszeń”, „aplikacja liczy”, „pierwsza w Polsce”, formy męskie | 3 | 3 | 9 | Odrzucenie pojedynczej kreacji jest mało prawdopodobne; utrata wiarygodności w komentarzach — prawdopodobna. |
| 9 | Tarcie w checkout: „tracę prawo do odstąpienia” tuż przed „Zapłać”, link na kod rabatowy, brak przypomnienia o gwarancji, BLIK niezweryfikowany na koncie właściciela | 3 | 3 | 9 | Przy 5–8 `checkout_start` w całym teście każde 10% strat to ~0,5 zakupu — połowa oczekiwanego wyniku. |
| 10 | Cena 39 zł i kotwica „mechanik 449–749 zł” | 2 | 3 | 6 | Cena nie zabije testu; kotwica do mechanika to inna kategoria i robi z 39 zł „zabawkę”. Prawdziwy konkurent cenowy to 0 zł i 6,99 zł. |

Poza dziesiątką: **termin/sezon** (S2×P2) — wrzesień–październik to szczyt zainteresowania, listopad zwalnia (271,1 tys. transakcji vs 289,6 tys. w X 2025), grudzień jest martwy; produkt jeszcze nie istnieje (`product/content` i `product/qa` puste, `/app/` to placeholder), więc poślizg startu na listopad–grudzień jest realny i sam z siebie obniży wynik.

---

## 2. Ryzyka po kolei: dlaczego, dowód, tania naprawa (≤ 1 dzień)

### R1. Moment zakupu jest nieosiągalny; poza momentem potrzeba jest słaba (S5 × P5)

**Dlaczego.** Cała oferta stoi na „jutro oglądasz auto” (persona, CTA końcowe, Angle F, quick start „dziś 3 minuty”). To jest prawdziwy moment — i właśnie dlatego szeroką reklamą za 300 zł nie da się w niego trafić.

Szacunek (założenia jawne, do podważenia): 3,35 mln transakcji/rok (Barometr AAA AUTO) × ~1,5 fizycznych oględzin na transakcję ≈ 5 mln oględzin/rok ≈ 14 tys. dziennie → w danej chwili ~28 tys. osób jest w oknie „48 h przed oględzinami”. Użytkowników Meta w PL w wieku 22–50 jest rzędu 12–14 mln → **~0,2% widowni jest w momencie**. 300 zł przy CPM 15–30 zł to 10–20 tys. wyświetleń → losowo 20–40 wyświetleń trafi w kogoś w momencie. Nawet jeśli Meta jest 10× lepsza od losu (sygnały z Otomoto/OLX), to ~300 wyświetleń i kilkanaście kliknięć „w momencie” na cały test. Kampania z Purchase bez historii nie ma czym tego poprawić (R4).

Co robi kupujący w momencie zamiast płacić 39 zł: otwiera YouTube (AUTODOC, Autotesto pokazują całą procedurę), pobiera darmowy PDF (Automarket, AutoKarma, AutoBezWtopy „na telefon”), przechodzi darmowy kreator kupbezwtopy.pl, bierze szwagra — a jeśli boi się naprawdę, płaci za coś, czego sam nie zrobi: raport VIN (carVertical 89,99 zł), Inspekcja techniczna Otomoto (raport 349 zł, pakiety 459–819 zł), mechanik mobilny (Autotesto 449–749 zł). Checklista za 39 zł wisi pośrodku: droższa od darmowych, bez danych ekskluzywnych jak VIN i bez odpowiedzialności jak mechanik. To obiekcja nr 3 z `dir-D` §4.3 („za te pieniądze kupię raport VIN”) — oferta odpowiada tylko na obiekcję nr 1 („są darmowe PDF-y”).

U pozostałych 99,8% odbiorców reklama sprzedaje polisę na przyszłość („kup dziś, użyjesz kiedyś”). Impuls za 39 zł „na kiedyś” w zimnym ruchu to CR poniżej 1%.

**Dowody.** Liczby rynku: `dir-D` §2.3. Ceny substytutów: carVertical 89,99 zł (promocje-oc.pl, mojpojazd.com), Otomoto Inspekcja 349 zł / 459–819 zł (autokult.pl, otomoto.pl/news), Autotesto 449–749 zł (autotesto.pl/cennik). Darmowe narzędzia: R3.

**Tania naprawa.**
- Przesunąć obietnicę z „jutro” na „całe szukanie auta”: „Kup raz, używaj przy każdym oglądanym aucie — Auto 1, Auto 2, Auto 3”. Okno zakupu rośnie z 48 h do ~40 dni (średni czas sprzedaży wg Barometru ≈ długość poszukiwań kupującego).
- Dać na LP drabinę decyzji zamiast konkurować z substytutami: „0 zł: ogłoszenie, VIN w gov.pl, telefon do sprzedawcy (u nas w demie, u innych też za darmo) → 39 zł: 60 minut przy aucie z listą do negocjacji → ~90 zł: raport historii VIN, gdy auto przeszło oględziny → 350–750 zł: mechanik/inspekcja, gdy chcesz kupić. Odhacz mówi, kiedy wejść na następny szczebel.”
- Jedna kreacja z szerszym oknem („Szukasz używanego auta w tym miesiącu?”) mierzona CTR-em obok „Jutro oglądasz auto?”.

### R2. Test jest tak zaprojektowany, że nie da odpowiedzi (S5 × P5)

**Dlaczego.** `02-kampania.md`: sygnał „warto” = ≥3 zakupy (CPA ≤100 zł) lub CR ≥2%; „twardy stop” = 200 zł bez zakupu przy ≥150 kliknięciach; „silny sygnał” = ≥6 zakupów → skalowanie +20%/dzień. Przy realistycznym wolumenie (300 zł → 100–200 kliknięć → 70–140 wyświetleń LP) to reguły losowe.

Rachunek (Poisson; zakupy z N wyświetleń LP przy prawdziwym CR):

| Prawdziwy CR | N=100: P(0 zakupów) | N=100: P(≥3) | N=150: P(0) | N=150: P(≥3) |
|---|---|---|---|---|
| 0,5% (słabo) | 61% | 1% | 47% | 4% |
| 1,0% (≈ mediana zimnego ruchu) | 37% | 8% | 22% | 19% |
| 1,5% | 22% | 19% | 11% | 34% |
| 2,0% (dobrze) | 14% | 32% | 5% | 58% |
| 3,0% (bardzo dobrze) | 5% | 58% | 1% | 83% |

Wnioski: (a) „0 zakupów” zdarza się w 22–37% przypadków przy produkcie, który konwertuje normalnie; (b) próg „≥3” przepuszcza dobry produkt (CR 2%) tylko w 32–58% przypadków; (c) 1 zakup jest zgodny zarówno z CR 0,5%, jak i 3%. Test w tej formie nie odróżnia „martwe” od „dobre” — a 0 zakupów zostanie odczytane jako „produkt nie działa”.

Ekonomia progów: marża na sztuce ≈ 30–33 zł (39 zł − VAT 23% − Stripe BLIK 1,6% + 1 zł, plus ~3 zł z upsellu przy 20% dobraniu; ~41 zł bez VAT). CPA 100 zł („warto”) = strata ~67 zł na sztuce; CPA 50 zł („silny sygnał → skaluj”) = strata ~17 zł na sztuce. Doc każe skalować stratę. Próg zwrotu 300 zł to ~9 zakupów (VAT-owiec) / ~7 (zwolniony).

Druga pułapka: Pixel tylko po zgodzie, baner z równorzędnym „Odrzucam wszystkie” (słusznie prawnie), CAPI też tylko za zgodą → Meta zobaczy może 40–60% zakupów. Ads Manager pokaże CPA ~2× gorsze niż `/admin`, a algorytm dostanie połowę i tak skąpego paliwa. Plan pomiaru to wie; tabela decyzyjna w kampanii tego nie powtarza.

Trzecia: w planie pomiaru nie ma zdarzeń demo. A demo to (obok CTR) jedyne miejsce, gdzie zdarzeń będzie dość, żeby coś policzyć: na 100 LP `demo_start`/`demo_done` da 20–50 zdarzeń; zakupów będzie 0–3.

Precyzja tego, co da się zmierzyć: CTR z 15 tys. wyświetleń: ±0,16 pkt proc. (95%) — dobra; per kreacja przy 7 kreacjach (~2 tys. wyświetleń każda): ±0,44 pkt proc. — kreacje 0,9% vs 1,3% są nieodróżnialne; przy 3 kreacjach ±0,28 — na granicy użyteczności. `cta_click/page_view` przy 100 LP i 15%: 15 zdarzeń, ±7 pkt proc. — zgrubne, ale użyteczne. `checkout_start`: 4–8 zdarzeń — anegdota.

**Dowody.** `research/05-policy-legal-tools.md` §D2 — autorzy sami piszą: „przy 1–6 zakupach nie odróżnimy CR 1% od 3%” i zalecają optymalizację pod LPV/InitiateCheckout; mimo to reguły w `02-kampania.md` są oparte na zakupach. Benchmarki zimnego ruchu: mediana click-to-purchase ~1,2%, e-commerce cold prospecting 1–2% (topgrowthmarketing.com, adamigo.ai, kelpi.ai). 50 zdarzeń/tydzień do wyjścia z fazy uczenia (stackmatix.com, tryvizup.com).

**Tania naprawa.**
- Przepisać reguły decyzyjne na metryki z wystarczającą liczbą zdarzeń: **kontynuuj** = CTR ≥1% **i** `cta_click/page_view` ≥10% **i** `checkout_start/page_view` ≥4% przy ≥120 LP; **zmień landing** = CTR OK, ale `cta_click` <6%; **zmień ofertę/cenę/zgodę** = `checkout_start` ≥8 i 0 zakupów; **zakupy raportować, nie decydować nimi** (0–2 = brak informacji; ≥3 = bonus).
- Dodać zdarzenia: `demo_start`, `demo_flag` (pierwszy „Problem”), `demo_done`, `scroll_price`, `faq_open` — kilkanaście linii JS przez `track()`.
- „Silny sygnał → skalowanie +20%/dzień” zamienić na „→ druga tura 300 zł na 1 kreację; skalowanie dopiero przy CPA ≤35 zł na ≥10 zakupach”.
- W tabeli decyzyjnej jedno zdanie: „Ads Manager niedoszacowuje zakupów o odsetek odmów zgody; decyzje wyłącznie z `/admin` + spend”.

### R3. Darmowy interaktywny konkurent istnieje; „pierwsza w Polsce” jest fałszywe (S4 × P5)

**Dlaczego.** Wybór D1 nad PDF-ami opierał się na tezie „darmowe są tylko PDF-y; interaktywne narzędzie to luka” (`10-wybor-produktu.md`, `dir-D` §8.6). Nie jest.

**Dowód.** **kupbezwtopy.pl** — „sprawdź używane auto za darmo, zanim pojedziesz je oglądać”: kreator 6 kroków od ogłoszenia do negocjacji („najtańsze filtry najpierw, oględziny na końcu”), wykres trendu przebiegu z historiapojazdu.gov.pl (flaguje cofnięcia, luki w latach), interpreter kodów OBD, macierz historii serwisowej per marka, raport do druku lub udostępnienia krótkim linkiem; bez konta i e-maila, dane w przeglądarce, **działa offline w telefonie przy aucie, można zainstalować jak aplikację** (snippet strony głównej; wątek na Wykopie „Zrobiłem darmowe narzędzie do sprawdzania używanych aut, odsiewa wraki”). To nasza lista USP niemal jeden do jednego — interaktywne, telefon, offline, bez instalacji, artefakt na wyjściu — za 0 zł. Obok: **Autolert.pl** (agent AI analizujący ogłoszenie ze zdjęciami: 1. raport gratis, kolejne 6,99 zł, 10 za 49,90 zł, P24, bez instalacji), Autobaza (checklista oględzin + wideo), AutoBezWtopy (PDF z polami „na telefon”), ai-carassistant.pl, autoradar.

**Skutki.** (1) Pasek „Nowość: pierwsza w Polsce interaktywna checklista oględzin auta na telefon — bez instalacji” to twierdzenie o pierwszeństwie bez pokrycia — reklama wprowadzająca w błąd (art. 5 u.p.n.p.r., art. 16 u.z.n.k.). UOKiK się tym nie zajmie przy naszej skali, ale wystarczy jeden komentarz pod reklamą „kupbezwtopy robi to za darmo” i CR spada do zera u wszystkich, którzy go zobaczą. (2) Demo na LP pokazuje „Zanim pojedziesz” — dokładnie ten etap, który kupbezwtopy robi za darmo i głębiej (dane z gov.pl, OBD). (3) Różnicowanie musi przejść z „formatu” na „przy aucie”: pomiar lakieru element po elemencie, zimny start, kontrolki, jazda próbna, licznik dealbreakerów, gotowe zdania do negocjacji, kilka aut naraz. Tego w snippetach kupbezwtopy nie ma (skupia się na filtrach przed wizytą i sam pisze, że nie zastępuje fizycznych oględzin) — to jedyna szczelina.

**Tania naprawa.**
- Usunąć „pierwsza w Polsce” dziś — kontrprzykład jest, nie trzeba na niego czekać.
- Przepisać USP na LP i w reklamach na „na miejscu” (§3). Wprost: „Sprawdzenie ogłoszenia zrobisz za darmo (u nas w demie i gdzie indziej). Płacisz za 60 minut przy aucie.”
- Zamienić demo na fragment „Nadwozie i lakier” (5 punktów z polem µm, przyciskiem zdjęcia, licznikiem flag) + 1 wygenerowane zdanie do negocjacji. „Zanim pojedziesz” oddać w całości za darmo jako osobną podstronę bez bramki — i tak jest darmowe u konkurencji, a nam daje `demo_done` do pomiaru.
- Ktoś musi przejść kupbezwtopy.pl i Autolert w całości (godzina) i spisać, czego nie mają. Bez tego różnicowanie jest zgadywane.

### R4. Mechanika dostarczania: Purchase bez danych, Advantage+ bez górnej granicy wieku, 6–7 kreacji, świeże konto (S4 × P5)

**Dlaczego.**
- Optymalizacja pod Purchase potrzebuje ~50 zdarzeń/tydzień na zestaw, żeby wyjść z fazy uczenia (branżowa formuła: budżet dzienny = CPA × 50 / 7; przy CPA 40 zł to ~290 zł/dzień — mamy 45). Kampania będzie w „ograniczonej nauce” od pierwszej do ostatniej złotówki i w praktyce dostarczy do najtańszych klikaczy z globalnych modeli, nie do „ludzi, którzy jutro oglądają auto”. Zespół to wie (`05-policy` §D2) i w `02-kampania.md` świadomie wybrał Purchase — obrona do przyjęcia (świeży piksel z Purchase i tak celuje w „ludzi, którzy kupują po kliknięciu”), ale trzeba nazwać konsekwencję: 300 zł to za mało na jakąkolwiek naukę, więc reklama może dać wyłącznie CTR i jakość ruchu na LP.
- Zestaw `PL-broad-22-50` z Advantage+ audience: **górna granica wieku jest sugestią**. Twardo działają tylko: lokalizacja, języki, minimalny wiek (18–25), wykluczenia, kategoria specjalna. Meta pokaże reklamy 55+, bo klikają taniej i chętniej — to ruch, który nie kupuje narzędzia na telefon za 39 zł (Jon Loomer, „A Guide to Meta Ads Targeting in 2026”; lineardesign.com). Zainteresowania „Otomoto/OLX/motoryzacja” też są tylko sugestią.
- 6–7 kreacji w jednym zestawie z budżetem kampanii: Meta w 1–2 dni skoncentruje wydatek na kreacji z najlepszym wczesnym CTR (najpewniej strasząca „65%”), 4–5 kreacji dostanie po 500–1 500 wyświetleń → hipotezy H1–H3 są nietestowalne (precyzja: R2). Próg „≥1 500 wyświetleń i CTR <0,7% → wyłącz” nie zadziała, bo większość kreacji tam nie dojdzie.
- Nowe konto, nowa strona, nowa domena, cel Sprzedaż od dnia 0 i nagłe 45 zł/dzień to wzorzec, który w 2026 r. częściej niż kiedykolwiek kończy się automatyczną blokadą lub przeglądem (kcmobile.pl 2026: „systemy automatyczne blokują częściej niż kiedykolwiek”, przyczyny m.in. „nagły wzrost wydatków na nowym koncie”, „niezweryfikowana tożsamość”). Meta w PL od IX 2026 zaostrza weryfikację reklamodawców (na razie finanse; cel globalny: 90% przychodu od zweryfikowanych do końca 2026). `legal/00-wymogi.md` §9 sam zaleca „2–3 dni kampanii ruchu przed konwersjami” — plan kampanii to pominął.

**Tania naprawa.**
- Wyłączyć Advantage+ audience i ustawić twardo 24–50, PL, zainteresowania motoryzacyjne — albo zostawić świadomie i w raporcie końcowym obowiązkowo rozbić wyniki po wieku.
- 3 kreacje zamiast 7: A (moment), D (rezultat), F (rolka 9:16, najlepiej nagranie ekranu prawdziwego narzędzia). B/C/E na drugą turę. Po 3 dniach wyłączyć najsłabszą.
- Rozgrzewka konta: weryfikacja firmy w Business Managerze, 2FA, metoda płatności podpięta ≥3 dni przed startem, domena zweryfikowana, 2 dni × 10 zł kampanii „Ruch” na post nr 2 lub 3 (20 zł z 300) — piksel dostaje pierwsze PageView, konto historię, my wczesny CTR.

### R5. Zaufanie w klimacie scam-reklam 2026 (S4 × P4)

**Dlaczego.** We wrześniu 2026 polski rząd żądał od KE 250 mln euro kary dla Mety za oszukańcze reklamy; media od miesięcy uczą: „nieznana marka + awatar AI + nagła oferta = scam”. Nasz zestaw: fanpage z 5–6 postami i zerem obserwujących, maskotka AI, na LP w bloku „Nie znam Was” zdanie „Hacz jest postacią AI” (prawnie właściwe, ale w tym miejscu brzmi jak ostrzeżenie), domena z zeszłego tygodnia, w Bibliotece reklam płatnik = prywatne nazwisko (JDG albo działalność nierejestrowana), zero opinii (słusznie nie zmyślamy — ale zero to zero). Stripe Checkout na checkout.stripe.com i BLIK trochę ratują, ale ludzie decydują o zaufaniu przed kliknięciem „Kupuję”, nie w checkout. Brief traktuje anonimowość jako feature; `legal/00-wymogi.md` §1 już stwierdził, że „pełna anonimowość marki nie jest możliwa” — copy tego nie odzwierciedla.

**Dowody.** pl.euronews.com (2.09.2026), rp.pl (weryfikacja reklamodawców w PL), kcmobile.pl (blokady 2026).

**Tania naprawa.**
- W bloku „Nie znam Was” najpierw człowiek/firma, potem AI (brzmienie w §3). Informacja o AI zostaje też w stopce i na „O marce” — AI Act art. 50 nadal spełniony.
- 30-sekundowe nagranie ekranu prawdziwego narzędzia (nie makieta) w hero i jako kreacja F — najtańszy dowód, że produkt istnieje.
- 5–10 prawdziwych beta-użytkowników przed startem → 3–5 prawdziwych opinii z imieniem, za zgodą (zakaz dotyczy zmyślonych, art. 7 pkt 24–25 u.p.n.p.r.). Jeśli nikt nie chce użyć tego przy aucie za darmo — to jest wynik testu za 0 zł.
- Odpowiadać w komentarzach pod reklamą w ciągu godzin przez 6 dni — w PL komentarze są częścią landingu; ukrywać trolli, odpowiadać na merytoryczne.

### R6. Obietnice produktu bez pokrycia + treść bez recenzji fachowca (S4 × P4)

**Dlaczego.** To uderza w zwroty i pocztę pantoflową — ale komentarze pod reklamą są publiczne w trakcie testu, więc uderza też w CR.

Stan na dziś (platforma):
- „Działa offline po pierwszym otwarciu” (LP §5, FAQ, Angle C) — w `platform/public` i `platform/src` nie ma service workera ani manifestu (grep: 0 trafień). Ochrona `/app/` ciasteczkiem/tokenem komplikuje precache. Persona stoi 120 km od domu, często bez LTE — to jedyny moment, w którym offline musi działać.
- „Możesz dodać do ekranu głównego jak aplikację” — bez manifestu to zakładka Safari z paskiem adresu; a na iPhonie web app z ekranu głównego ma **osobny magazyn danych** niż Safari → postęp i zdjęcia „znikają” przy przejściu.
- FAQ: „Zdjęcia i notatki też zostają w telefonie” vs §5: „synchronizacja między telefonem a komputerem” — sprzeczne. Technicznie synchronizuje się JSON ≤32 KB per token (`src/access.js`, `MAX_PROGRESS_BYTES`), zdjęcia nie. 3 auta × 150 punktów × (stan + pomiar + notatka) przekroczy 32 KB → serwer odpowie 413 i synchronizacja po cichu przestanie działać.
- Zdjęcia w pamięci przeglądarki na iPhonie: Safari (ITP, od iOS 13.4) kasuje **cały** magazyn skryptowy witryny — localStorage, IndexedDB, rejestracje SW — po 7 dniach używania Safari bez interakcji z tą witryną; wyjątek: web app z ekranu głównego (webkit.org via itnews.com.au, localForage #943). Klient robi zdjęcia w sobotę, wraca do negocjacji za 10 dni — zdjęć nie ma. Przy „dostępie 24 miesiące” to gwarantowane reklamacje.
- „24 miesiące dostępu z aktualizacjami” = świadczenie ciągłe (art. 43k UPK: zgodność przez cały okres). Jeśli test nie wyjdzie i VPS zgaśnie po kwartale, każdy klient ma roszczenie.
- Treść (130–160 punktów z instrukcjami) powstaje teraz, bez mechanika; seed-post nr 4 sam ma dopisek „wartości do potwierdzenia”. Jeden diagnosta w komentarzu („kto wam pisał, że fabryczny lakier to 150 µm?”) — i strasząca liczba „65%” obraca się przeciw nam.

**Tania naprawa.**
- Do czasu wdrożenia i przetestowania SW w trybie samolotowym na iPhonie i Androidzie: usunąć „offline” z LP i z Angle C.
- Ujednolicić obietnicę: „Odpowiedzi i notatki synchronizują się po linku z maila; zdjęcia zostają tylko na telefonie, na którym je zrobiłeś.” Dodać „Wyślij sobie podsumowanie” (tekst/PDF na e-mail) — zabezpiecza też obietnicę 24 miesięcy (klient ma kopię).
- Limit postępu 32 KB → 128 KB (jedna stała) + komunikat w UI przy 413 zamiast cichej porażki.
- Recenzja 150 punktów przez jednego mechanika/diagnostę (znajomy, forum, OLX Usługi) — 2–3 godziny jego czasu. Bez tego nie startować.
- Rozważyć „12 miesięcy + eksport” zamiast 24 — mniejsze zobowiązanie, ta sama wartość (auto kupuje się raz).

### R7. Wartość niejasna w 5 sekund (S3 × P4)

**Dlaczego.** H1 „Oglądasz używane auto? Odhacz je punkt po punkcie.” mówi, co masz robić, nie co dostajesz. „Interaktywna checklista” to nasz żargon: 30-latek kupujący Octavię za 28 tys. zł rozumie „lista rzeczy do sprawdzenia”, nie wie, co znaczy „interaktywna” (PDF z polami? apka?). Angle C dwa razy nazywa produkt „aplikacją”, a FAQ mówi „to nie aplikacja” — klient po kliknięciu szuka „Pobierz”. „Licznik czerwonych flag” i „dealbreaker” to język zespołu, nie persony (persona mówi „wtopa”, „szpachla”, „cofnięty licznik”). Hero pokazuje makietę „Nadwozie i lakier”, a demo niżej to „Zanim pojedziesz” — ludzie chcą dotknąć tego, co zobaczyli. Strona ma 11 sekcji + tabelę + FAQ; przy 39 zł decyzja zapada w hero i w demie. Demo „bez rejestracji” to dobra decyzja — ale demo pokazuje najsłabszy argument.

**Tania naprawa.** Nowy H1 z rezultatem i lead w języku czynności (§3); demo = etap z hero; słowo „aplikacja” tylko w zwrocie „bez aplikacji”; „dealbreaker” z tłumaczeniem w nawiasie („= odchodzisz”); w hero jedno zdanie: „To strona, nie plik i nie apka — otwierasz link przy aucie.”

### R8. Copy reklam i claimów (S3 × P3)

Co w dostarczonym copy realnie grozi odrzuceniem lub problemem:
- **Angle E, nagłówek** „65% aut z ogłoszeń nie przechodzi kontroli*” — źródło mówi o autach **przywożonych do skupu AAA AUTO** (~80 tys./rok), nie o „autach z ogłoszeń”; tytuł PR24 ma znak zapytania („65% aut używanych z ogłoszeń z ukrytą wadą?”), my go zdejmujemy; `10-wybor-produktu.md` sam każe pisać „wg AAA AUTO”, nie „65% aut w Polsce”. Nagłówek łamie własną zasadę. Ryzyko odrzucenia przez Meta (misleading claims) — małe; ryzyko wiarygodności w komentarzach — duże. Na LP §2 „nie nadaje się do bezpiecznego zakupu” to też nadinterpretacja (źródło: „wady techniczne lub prawne”, „nie nadają się do odsprzedaży”).
- **Angle C** „aplikacja liczy” ×2 → niezgodność reklamy z LP („to nie aplikacja”) i z FAQ. Meta raczej tego nie wyłapie; klient tak.
- **Pasek „pierwsza w Polsce”** — R3.
- **Angle A** „Przy sprzedawcy pamiętasz cztery.” i **Angle C** „Nie musisz wiedzieć, jak działa silnik” — zdania o odbiorcy, ale nie o cesze chronionej (polityka personal attributes: zdrowie, wiek, sytuacja finansowa, orientacja, rasa, karalność itd.). Ryzyko odrzucenia niskie; koszt zmiany zerowy — zmienić.
- Porównanie z mechanikiem 449–749 zł — dozwolone (bez nazw firm). „Nie kup wtopy” w reklamach nie występuje (tylko w JTBD) — i niech tak zostanie w nagłówkach: strach + slang działa w PL, ale „wtopa” + „65%” w nagłówku buduje wizerunek clickbaitowy, który w 2026 r. kojarzy się ze scamem. W treści — OK.
- **Angle D** „który sam sprawdziłeś” — forma męska przy targetowaniu „wszystkie płcie”.
- Ryzyko systemowe (świeże konto) — R4.

**Tania naprawa.** Podmiany w §3 + rozgrzewka konta.

### R9. Tarcie w checkout (S3 × P3)

**Dlaczego.** Jeden krok w Stripe to słuszna decyzja (DECISIONS), ale domyślny tekst zgody (`src/config.js`, `DEFAULT_TERMS_TEXT`) kończy się zdaniem „…przyjmuję do wiadomości, że w związku z tym **tracę prawo do odstąpienia od umowy w terminie 14 dni** (art. 38 pkt 13…)” — to ostatnia rzecz, jaką klient czyta przed „Zapłać”, a jedyny argument zaufania (gwarancja 14 dni) w checkout nie występuje (`CHECKOUT_SUBMIT_TEXT` pusty w `.env`; w `.env.example` tylko „Dostęp natychmiast po płatności.”). `allow_promotion_codes: true` w `stripe.js` pokazuje link „Dodaj kod promocyjny” → klasyczny wyciek: klient idzie szukać kodu i nie wraca. Order bump `optional_items` z nazwą „Odhacz Auto: Po zakupie — umowa, PCC-3, rejestracja, OC, pierwsze 30 dni” jest długi, ale OK. BLIK: Stripe obsługuje (1,6% + 1 zł), ale wymaga włączenia w Dashboardzie i **konta Stripe zarejestrowanego w Polsce** — konto właściciela trzeba sprawdzić (legal §1: na jaki podmiot?). Jeśli LP obiecuje „BLIK, karta, Przelewy24”, a w checkout BLIK-a nie ma — klient wychodzi.

**Tania naprawa.** `allow_promotion_codes: false`; `CHECKOUT_SUBMIT_TEXT` = „Dostęp wyślemy od razu na e-mail. Masz 14 dni gwarancji zwrotu.”; zgoda po ludzku z zachowaniem wymaganych elementów (§3); test zakupu za 2 zł na żywo przez BLIK z prawdziwego telefonu przed startem (nie tylko karta 4242).

### R10. Cena i kotwica (S2 × P3)

**Dlaczego to nie zabije testu.** 39 vs 29 zł zmienia CR może o 20–40% — przy 0–3 zakupach to szum; zmiana ceny to zmienna na EXP-002, nie na EXP-001. **Dlaczego mimo to boli.** Kotwica „mechanik 449–749 zł” stawia produkt w kategorii, w której nie gra (mechanik ma podnośnik i bierze odpowiedzialność), a przez kontrast robi z 39 zł „zabawkę” („skoro 15× taniej, to 15× gorsze”). Realny konkurent cenowy to 0 zł (PDF-y, kupbezwtopy) i 6,99 zł (Autolert). W tym otoczeniu 39 zł broni się tylko wtedy, gdy LP sprzedaje 60 minut przy aucie i listę do negocjacji, nie „checklistę”. Najlepsza kotwica już jest w `oferta.md` i nie ma jej w hero: „mniej niż paliwo na dojazd do jednego auta, które odpada po 5 minutach”.

**Tania naprawa.** Zostawić 39 zł; w karcie ceny drabina „0 zł → 39 zł → ~90 zł → 350–750 zł” z rolą każdego szczebla; kotwica paliwowa do hero.

---

## 3. Zdania do zmiany i brzmienie zamienne

### Copy deck (`landing/copy-deck.md`)

| Gdzie | Jest | Proponuję |
|---|---|---|
| §0 pasek | „Nowość: pierwsza w Polsce interaktywna checklista oględzin auta na telefon — bez instalacji.” | Usunąć (kupbezwtopy.pl: interaktywne, offline, instalowalne, darmowe). Ewentualnie: „Narzędzie na 60 minut przy aucie: tapiesz, liczy, pisze listę do negocjacji.” |
| §1 H1 | „Oglądasz używane auto? Odhacz je punkt po punkcie.” | „Obejrzyj używane auto jak fachowiec. Wyjdź z listą uwag do negocjacji.” |
| §1 lead | „Interaktywna checklista na telefon: 7 etapów, około 150 punktów, licznik czerwonych flag i gotowa lista uwag do negocjacji. Bez instalacji. Bez bycia mechanikiem.” | „Otwierasz link w telefonie przy aucie. Przy każdym z ok. 150 punktów tapiesz OK / Uwaga / Problem, wpisujesz pomiar lakieru, robisz zdjęcie. Na końcu masz decyzję i listę, o co zbić cenę. To strona, nie plik i nie apka. Nie musisz być mechanikiem.” |
| §1 linia zaufania | „Dostęp od razu po płatności · BLIK, karta, Przelewy24 · Gwarancja spokojnej głowy: 14 dni” | Zostaje — ale „BLIK” tylko po potwierdzeniu, że konto Stripe właściciela go wyświetla. |
| §2 liczba | „65% — tyle z ok. 80 tys. aut badanych rocznie przez techników sieci AAA AUTO nie nadaje się do bezpiecznego zakupu.” | „65% — tyle z ok. 80 tys. aut, które rocznie trafiają do skupu AAA AUTO, technicy odrzucają z powodu wad technicznych lub prawnych.¹” |
| §4 krok 1 | „Możesz dodać do ekranu głównego.” | Usunąć do czasu manifestu + testu na iPhonie; potem: „Dodaj do ekranu głównego — wtedy zdjęcia i postęp zostają nawet po tygodniach.” |
| §5 „Poza tym” | „działa offline po pierwszym otwarciu · dostęp 24 miesiące · synchronizacja między telefonem a komputerem” | „odpowiedzi i notatki synchronizują się po linku z maila · zdjęcia zostają na telefonie, na którym je zrobiłeś · podsumowanie wyślesz sobie jednym tapnięciem · dostęp [12/24] miesiące” (offline — dopiero po wdrożeniu i teście SW) |
| §7 demo | fragment „Zanim pojedziesz” (6 punktów) | fragment „Nadwozie i lakier” (5 punktów: pole µm, spasowanie, szyby, przycisk zdjęcia, licznik flag) + 1 wygenerowane zdanie do negocjacji. „Zanim pojedziesz” w całości za darmo jako osobna podstrona (mierzymy `demo_done`). |
| §8 „Są darmowe checklisty PDF.” | „Są, i są OK do wydruku. PDF nie policzy flag, nie zrobi zdjęć…” | „Są — i darmowe narzędzia do sprawdzenia ogłoszenia też (korzystaj). Płacisz za to, czego one nie robią: 60 minut przy aucie — pomiar lakieru element po elemencie, zimny start, kontrolki, jazda próbna — z licznikiem dealbreakerów (= odchodzisz) i listą uwag do pokazania sprzedawcy. Za 39 zł kupujesz godzinę prowadzenia za rękę, nie kartkę.” |
| §8 „Nie znam Was.” | „Odhacz to nowa marka. Hacz jest postacią AI, a za sklepem stoi [[SPRZEDAWCA_NAZWA]] (dane w stopce). Dlatego: demo wyżej, płatność przez Stripe i gwarancja spokojnej głowy — 14 dni na zwrot, bez tłumaczenia się.” | „Za Odhacz stoi [[IMIĘ NAZWISKO / FIRMA]] z [[MIASTO]], NIP [[NIP]] — te same dane zobaczysz w Bibliotece reklam Meta, w stopce i w regulaminie. Płacisz przez Stripe (BLIK, karta, Przelewy24). Jeśli narzędzie Ci nie pomoże, w 14 dni oddajemy pieniądze — bez tłumaczenia. Hacz, nasz przewodnik, jest postacią AI: nie udaje mechanika i nie ocenia, czy auto jest bezpieczne.” |
| §9 FAQ „Czy działa bez zasięgu?” | „Po pierwszym otwarciu treść zapisuje się w telefonie. Zdjęcia i notatki też zostają w telefonie.” | Do czasu SW: „Potrzebuje internetu — wystarczy słaby zasięg, treść jest lekka. Otwórz link raz w domu, żeby mieć go pod ręką.” Po SW: zostawić + zdanie o zdjęciach jak w §5. |
| §9 FAQ „Jak długo mam dostęp?” | „24 miesiące od zakupu, z aktualizacjami treści w tym czasie.” | Albo zostaje (właściciel świadomie bierze 24-miesięczne zobowiązanie), albo: „12 miesięcy od zakupu; podsumowanie każdego auta możesz wysłać sobie na e-mail i zachować na zawsze.” |
| §10 kotwice | „statyczna checklista PDF ok. 20 zł · stacja diagnostyczna 80–200 zł · mechanik mobilny 449–749 zł” | „sprawdzenie ogłoszenia i VIN w gov.pl: 0 zł → Odhacz przy aucie: 39 zł (kilka aut) → raport historii VIN: ok. 90 zł, gdy auto przeszło oględziny → mechanik/inspekcja: 350–750 zł, gdy chcesz kupić. Odhacz mówi Ci, kiedy wejść na kolejny szczebel.” + w hero: „39 zł to mniej niż paliwo na dojazd do jednego auta, które odpada po 5 minutach.” |
| §10 micro-legal | „…w checkout potwierdzasz, że chcesz dostęp od razu i wiesz, że tracisz ustawowe prawo odstąpienia.” | „Dostęp dostajesz od razu, dlatego w checkout potwierdzasz rezygnację z ustawowego 14-dniowego odstąpienia — w zamian masz naszą 14-dniową gwarancję zwrotu.” (treść prawna ta sama, kolejność inna) |
| §11 CTA końcowe | „Jutro oglądasz auto? Dziś zajmie Ci to 3 minuty.” | „Szukasz auta? Kup raz — użyjesz przy każdym egzemplarzu, który pojedziesz obejrzeć. Start zajmuje 3 minuty.” („Jutro oglądasz auto?” zostaje w reklamie F, gdzie moment ma sens) |
| Meta title | „Odhacz Auto — interaktywna checklista oględzin używanego auta na telefon” | „Odhacz Auto — sprawdź używane auto przy sprzedawcy krok po kroku (telefon, 39 zł)” |

### Checkout (platforma)

| Gdzie | Jest | Proponuję |
|---|---|---|
| `src/config.js` `DEFAULT_TERMS_TEXT` | „Akceptuję regulamin i politykę prywatności. Wyrażam zgodę na natychmiastowe dostarczenie treści cyfrowych po opłaceniu zamówienia i przyjmuję do wiadomości, że w związku z tym tracę prawo do odstąpienia od umowy w terminie 14 dni (art. 38 pkt 13 ustawy o prawach konsumenta).” | „Akceptuję [regulamin] i [politykę prywatności]. Żądam dostępu od razu po zapłacie i wiem, że przez to nie przysługuje mi ustawowe 14-dniowe odstąpienie od umowy (art. 38 ust. 1 pkt 13 UPK). Niezależnie od tego mam 14-dniową gwarancję zwrotu Odhacz.” (elementy „wyraźna zgoda/żądanie” + „przyjęcie do wiadomości” zachowane; potwierdzić z etapem prawnym) |
| `.env` `CHECKOUT_SUBMIT_TEXT` | pusty | „Dostęp wyślemy od razu na e-mail. 14 dni gwarancji zwrotu.” |
| `src/stripe.js` `allow_promotion_codes` | `true` | `false` na czas testu |

### Reklamy (`ads/01-angles-i-copy.md`)

| Gdzie | Jest | Proponuję |
|---|---|---|
| Angle A | „Przy sprzedawcy pamiętasz cztery.” | „Przy aucie, kiedy sprzedawca mówi bez przerwy, z listy zostają cztery.” |
| Angle C tekst | „…aplikacja liczy czerwone flagi i pisze listę uwag do negocjacji.” | „…telefon liczy czerwone flagi i pisze listę uwag do negocjacji. Strona w przeglądarce, bez instalacji.” |
| Angle C nagłówek | „Oględziny auta: tapiesz, aplikacja liczy” | „Oględziny auta: Ty tapiesz, telefon liczy” |
| Angle C opis | „39 zł · działa offline · kilka aut naraz” | „39 zł · bez instalacji · kilka aut naraz” |
| Angle D | „Każdy punkt to fakt, który sam sprawdziłeś” | „Każdy punkt to fakt sprawdzony na miejscu” |
| Angle E nagłówek | „65% aut z ogłoszeń nie przechodzi kontroli*” | „Technicy AAA AUTO odrzucają 65% badanych aut*” albo „2 na 3 auta w skupie AAA AUTO odpadają*” |
| Angle E tekst | „…nie nadaje się do bezpiecznego zakupu.” | „…zostaje odrzuconych z powodu wad technicznych lub prawnych.” |
| Wszystkie | — | dopisać w tekście głównym „14 dni gwarancji zwrotu.” — najtańszy dowód zaufania, jaki mamy |
| Tura 1 | 7 kreacji | 3: `problem-static-v1`, `lista-static-v1`, `story-motion-v1` (lub `story-video-v1`, jeśli rolka to nagranie ekranu prawdziwego narzędzia) |

### Kampania (`ads/02-kampania.md`)

- „Advantage+ audience … 22–50” → wyłączyć Advantage+ audience, ustawić twardo 24–50 (albo zostawić i w raporcie rozbić po wieku).
- „Reklamy (6–7)” → 3.
- „Sygnał warto: ≥3 zakupy (CPA ≤100 zł) lub CR landing ≥2%” → „Kontynuuj: CTR ≥1% i `cta_click/page_view` ≥10% i `checkout_start/page_view` ≥4% przy ≥120 LP. Zakupy: 0–2 = brak informacji; ≥3 = bonus.”
- „Silny sygnał: ≥6 zakupów (CPA ≤50 zł) → skalowanie +20%/dzień” → „→ druga tura 300 zł na 1 kreację; skalowanie dopiero przy CPA ≤35 zł na ≥10 zakupach.”
- Harmonogram: D-5…D-3 rozgrzewka konta (20 zł ruchu na post nr 2/3), D-2 dziesięciu beta-użytkowników, D-1 test BLIK na żywo z telefonu, recenzja treści przez mechanika przed D-2.

---

## 4. Co testowałbym NAJPIERW za te 300 zł (jako właściciel)

1. **Za 0 zł, zanim wydam złotówkę: czy ktokolwiek użyje tego przy prawdziwym aucie.** 10 kodów dostępu dla osób, które w tym tygodniu jadą oglądać auto (Wykop, forum-mechanika, grupy FB „kupię/sprzedam auto”, znajomi). W `/admin` patrzę na `app_open`, `quick_start_done`, ukończone etapy; po fakcie 5 pytań („co byś zapłacił?”, „czego brakowało?”, „użyłeś zdjęć?”, „pokazałeś listę sprzedawcy?”). Jeśli mniej niż 3 z 10 dojdą do „Jazdy próbnej” — nie palę 300 zł na reklamę, bo problem jest w produkcie, nie w ruchu. Bonus: 3–5 prawdziwych opinii na LP.
2. **150 zł / 3 dni: który hak łapie uwagę.** 3 kreacje — A „moment”, D „rezultat”, wariant szerszy „Szukasz używanego auta w tym miesiącu?” — jeden zestaw 24–50 + motoryzacja. Metryka: CTR (link) i `cta_click/page_view` per `utm_content` — jedyne, co przy tym budżecie ma moc statystyczną. Wyłączam 2 słabsze.
3. **150 zł / 3 dni: czy landing „trzyma”.** Zwycięska kreacja, LP po poprawkach z §3, zdarzenia demo włączone. Kryteria: `demo_start` ≥30% LP, `demo_done` ≥40% startów, `cta_click` ≥10%, `checkout_start` ≥4%. Zakupy zapisuję jako anegdotę. Jeżeli `checkout_start` ≥8 i 0 zakupów → dopiero wtedy ruszam cenę/zgodę (EXP-002), nie wcześniej.

---

## 5. Werdykt

**Nie uruchamiać w obecnej formie. Uruchomić po poprawkach z §3 i z regułami decyzyjnymi z R2.** Jak jest, najbardziej prawdopodobny wynik to 0–2 zakupy z ruchu w większości spoza momentu (w tym 55+), z kreacją „65%” zjadającą budżet, z komentarzem „kupbezwtopy robi to za darmo” pod reklamą i z ryzykiem przeglądu świeżego konta w dniu 1 — a potem wniosek „produkt nie działa”, którego dane nie uzasadniają, bo ten test nie potrafi odróżnić CR 0,5% od 2%. Produkt sam w sobie nie jest zły: moment jest prawdziwy, kotwica paliwowa dobra, demo bez bramki i gwarancja to właściwe dźwignie, a „przy aucie: pomiary, dealbreakery, lista do negocjacji” to szczelina, której darmowe narzędzia nie zamykają. Ale 300 zł kupi wyłącznie odpowiedź na pytanie „czy hak i landing trzymają zimną uwagę” — więc tak trzeba ten test zdefiniować, zabrać z copy trzy niepokryte obietnice („pierwsza w Polsce”, „offline”, „dodaj do ekranu”), postawić człowieka przed maskotką, dać treść do przeczytania jednemu mechanikowi i najpierw oddać narzędzie za darmo 10 prawdziwym osobom. Jeśli tych 10 osób nie da się znaleźć albo nie użyją narzędzia przy aucie — to jest wynik eksperymentu, za 0 zł.

---

### Źródła użyte w tym dokumencie (snippety wyszukiwarki; potwierdzić u źródła przed cytowaniem w copy)
- kupbezwtopy.pl (strona główna); wykop.pl/link/7994405 („Zrobiłem darmowe narzędzie do sprawdzania używanych aut…”)
- autolert.pl (1. raport gratis, 6,99 zł/raport, 10 za 49,90 zł)
- shop.jaksprawdzacauta.pl/produkt/checklista/ (134 punkty, 19,90 zł); autobezwtopy.pl (PDF „na telefon”, Acrobat); autobaza.pl (checklista + wideo)
- carVertical 89,99 zł: promocje-oc.pl, mojpojazd.com; Otomoto Inspekcja 349 zł / 459–819 zł: autokult.pl, otomoto.pl/news, media.otomoto.pl; Autotesto 449–749 zł: autotesto.pl/cennik
- AAA AUTO 65% (skup, ~80 tys./rok): polskieradio24.pl/artykul/3649423; trojmiasto.pl; zycieczestochowy.pl
- Meta — faza uczenia 50 zdarzeń/tydzień, formuła CPA×50/7: stackmatix.com, tryvizup.com, get-ryze.ai; Advantage+ audience — max wieku to sugestia: jonloomer.com („A Guide to Meta Ads Targeting in 2026”, „Should You Restrict Ad Targeting By Age?”), lineardesign.com
- Benchmarki zimnego ruchu (mediana click-to-purchase ~1,2%, cold 1–2%): topgrowthmarketing.com, adamigo.ai, kelpi.ai; oraz `research/05-policy-legal-tools.md` §D
- Blokady nowych kont i weryfikacja reklamodawców w PL 2026: kcmobile.pl (blokady 2026), pl.euronews.com (2.09.2026), rp.pl, strefabiznesu.pl
- Stripe BLIK/P24 (1,6% + 1 zł; włączenie w Dashboardzie; konto PL): seomantyczny.pl, jflowlabs.pl, wise.com/pl/blog/stripe-polska
- Safari ITP — 7-dniowy limit magazynu skryptowego, wyjątek dla web app z ekranu głównego: itnews.com.au, github.com/localForage/localForage/issues/943, lapcatsoftware.com
- Sezonowość: autoexpert.pl (X 2025: 289,6 tys.), moto.rp.pl („Rynek używanych aut zaczyna zwalniać”, XI 2025: 271,1 tys.), auto-swiat.pl
- Nieuczciwe praktyki rynkowe / reklama wprowadzająca w błąd: uokik.gov.pl (przewodnik), archiwum.uokik.gov.pl
