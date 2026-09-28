# Kierunek B — „Sen / energia / biohacking dla zwykłych ludzi" (Polska)

Data: 2026-09-28. Autor: subagent researchu. Format docelowy: płatne, interaktywne narzędzie mobile-web (checklisty, kalkulatory, timery, postęp), marka anonimowa + AI-awatar, cena ≤ 49 PLN, budżet testu 300 PLN.

## 0. Metodologia i ograniczenia (czytaj najpierw)

- **Bezpośrednie pobieranie stron (WebFetch/curl) było zablokowane przez proxy dla KAŻDEJ testowanej domeny** (ok. 50 domen: suggestqueries.google.com, reddit.com, youtube.com, facebook.com/Ad Library, allegro.pl, etsy.com, play.google.com, undra.pl, kafeteria.pl, wizaz.pl, netkobiety.pl, legimi.pl, ebookpoint.pl, pl.wikipedia.org i inne). Google autocomplete, Google Trends, Reddit JSON, YouTube — **brak dostępu**.
- Jedynym działającym kanałem było wyszukiwanie (WebSearch), a jego limit sesyjny wyczerpał się po ok. 45 zapytaniach tego agenta (limit współdzielony z innymi agentami).
- **Konsekwencja:** wszystkie liczby, ceny i cytaty poniżej pochodzą ze *snippetów wyników wyszukiwania* (tytuły stron, fragmenty), nie z pełnych stron. Każda dana ma URL. Gdzie snippet nie dawał liczby — piszę **„brak danych"**. Ceny oznaczone „(wg snippetu)" trzeba zweryfikować przed użyciem w ofercie.
- Cytaty „verbatim" to w większości **tytuły wątków forum / pytań do lekarzy sformułowane przez użytkowników** (ich własne słowa) oraz fragmenty raportów widoczne w snippetach. Treści postów nie udało się pobrać — nie wymyślam ich.
- Liczba wyświetleń YouTube, wielkości grup FB, wolumeny wyszukiwań: **brak danych** (kanały zablokowane). Zaznaczam to w każdej sekcji.

---

## 1. Podsumowanie (werdykt)

1. Problem jest realny i masowy: wg raportu UCE Research/ePsycholodzy.pl „Sen Polaków. Straty dla gospodarki. Edycja 2025" **41,4% Polaków jest niezadowolonych z jakości swojego snu**, a najczęstszy powód to „długo nie może zasnąć (np. ma gonitwę myśli)" — 42,9% niezadowolonych (https://ceo.com.pl/rosnie-liczba-polakow-majacych-trudnosci-ze-snem-raport-sen-polakow-2025 ; https://nowymarketing.pl/polacy-niedosypiaja-a-gospodarka-traci-na-tym-miliardy-zlotych-badania-uce-research-sklaniaja-do-refleksji-w-swiatowym-dniu-snu/).
2. Płatne produkty o śnie w PL istnieją, ale są prawie wyłącznie **firmowane twarzą eksperta** (dietetyczka/„trenerka snu" Daria Łukowska, dietetyk Michał Undra, lekarki-autorki podręcznika CBT-I, zespół mgr/dr w „Szkole Optymalizacji Snu") i w formacie **książka/ebook/kurs audio 20–99 zł** lub **aplikacja z subskrypcją 17 zł/mies. (Goodsleeper)**. Nie znalazłem ani jednego udokumentowanego sukcesu **anonimowej** marki sprzedającej info-produkt o śnie w PL — to jest główne ryzyko kierunku.
3. Luka formatu: nie znalazłem w PL płatnego, interaktywnego, telefonowego „protokołu" (checklista + dziennik + timer + postęp) bez instalacji aplikacji i bez subskrypcji. Darmowe są tylko proste kalkulatory faz snu (≥7 serwisów) i PDF-y do druku.
4. **Najsilniejsze 3 koncepty:** (C2) **„Chronotyp → Twój plan dnia"** — quiz + spersonalizowana oś dnia (kiedy światło, kawa, trening, posiłki, wyciszenie, sen) z przypomnieniami, 29–39 zł — najbardziej „reklamowalny" bez twarzy i bez języka medycznego; (C1) **„Reset snu w 14 dni"** — dzienny 5-minutowy protokół higieny snu + dziennik snu z automatyczną efektywnością + tryb nocny „obudziłem się o 3", 39–49 zł — najsilniejszy ból, ale najwyższe ryzyko polityk Meta; (C3) **„Audyt energii 7 dni"** — 3 check-iny dziennie + wykrywacz wzorców, 39 zł — dobry ból, ale wchodzi w rejon diagnostyki medycznej.
5. Suma punktów wg rubryki: **C2 = 56, C1 = 51, C3 = 45** (z 70). Rekomendacja: **jeden produkt „Chronotyp + Reset snu"**: darmowy quiz chronotypu jako hak reklamowy (neutralny język, zbiera e-mail), płatny plan dnia + 14-dniowy protokół snu jako produkt 39–49 zł; „timing suplementów" i „protokół poranka" jako moduły bonusowe, nie osobne produkty.
6. Sub-nisze do odrzucenia jako produkt główny: IF-timer (rynek nasycony darmowymi aplikacjami: Kolo, Unimeal, i inne), timing suplementów (SEO nasycone darmowymi odpowiedziami z ≥9 artykułów „kiedy brać magnez", plus zaostrzone od 2026 r. prawo reklamy suplementów), praca zmianowa i jet lag (brak dowodów płatnego popytu; brak danych).
7. Największe ryzyko: **Meta**. Od stycznia 2025 r. domeny/piksele sklasyfikowane jako „health & wellness" mogą mieć zablokowane zdarzenia Purchase/AddToCart, a polityka „personal attributes" karze copy typu „Budzisz się o 3 w nocy?" (wg źródeł z 2026 r. wykrywanie objęło także sugerowane objawy). Przy 300 PLN i nowym koncie to może oznaczać brak sygnału zakupowego.
8. Werdykt: **kierunek warunkowo TAK**, wyłącznie w wariancie „narzędzie/plan dnia" (nie „leczenie bezsenności"), z neutralnym copy, quizem jako wejściem i jawnym odesłaniem do lekarza przy objawach przewlekłych. Jeśli inny kierunek ma porównywalny ból bez etykiety „zdrowie", ma on przewagę reklamową nad tym.

---

## 2. Dowody popytu

### 2.1 Statystyki populacyjne (Polska)

| Dana | Wartość | Źródło (snippet) |
|---|---|---|
| Niezadowoleni z jakości snu, 2025 | 41,4% Polaków | https://ceo.com.pl/rosnie-liczba-polakow-majacych-trudnosci-ze-snem-raport-sen-polakow-2025 |
| Niezadowoleni z jakości snu, 2024 | 41% | https://nowymarketing.pl/polacy-niedosypiaja-a-gospodarka-traci-na-tym-miliardy-zlotych-badania-uce-research-sklaniaja-do-refleksji-w-swiatowym-dniu-snu/ |
| Główny powód: „długo nie może zasnąć (np. ma gonitwę myśli, rozmyśla o różnych sytuacjach)" | 42,9% niezadowolonych | jw. (UCE Research / ePsycholodzy.pl) |
| „Problemy finansowe" jako przyczyna złego snu | 39,4% niezadowolonych | jw. |
| Koszt dla gospodarki | „blisko 9 mld zł rocznie", +ok. 1 mld r/r | https://i.pl/problemy-ze-snem-powoduja-straty-w-gospodarce-to-prawie-9-miliardow-zlotych/ar/c1p2-27510861 |
| CBOS 1992: problemy ze snem | 24% (dla kontrastu) | cytowane w snippecie wyników (medexpress.pl / wartowiedziec.pl) — nie zweryfikowano źródła pierwotnego: https://www.medexpress.pl/pacjent/polowa-polakow-ma-problemy-ze-snem-jest-gorzej-niz-w-czasie-pandemii/ |

Interpretacja: ~40% dorosłych to potencjalnie kilkanaście milionów osób; najczęstszy ból to **zasypianie i „gonitwa myśli"**, nie apnoe czy choroby — czyli dokładnie obszar higieny snu/nawyków, gdzie nie trzeba lekarza.

### 2.2 Google autocomplete
**Brak danych** — endpoint suggestqueries.google.com zablokowany (curl i WebFetch: 403). Alternatywy (DuckDuckGo ac, Bing osjson, Google Trends) również zablokowane.

Zastępczy proxy popytu — **nasycenie SEO** (liczba serwisów piszących pod dokładnie tę frazę; wydawcy piszą tylko pod frazy z wolumenem):

| Fraza użytkownika | Serwisy z artykułem pod tę frazę (widoczne w wynikach) |
|---|---|
| „budzę się o 3 w nocy i nie mogę zasnąć" | wellbestudio.pl, poradnikzdrowie.pl (2 artykuły), zdrowie.interia.pl, komfortsnu.pl, fdm.pl, readytoglo.pl, pepsieliot.com, plantpur.pl, i-apteka.pl, rmf.fm, konsultacjepsychiatryczne.pl („Poradnik 2026"), doz.pl — ≥13 |
| „kiedy brać magnez – rano czy wieczorem" | weron.pl, fizjoterapeuty.pl, drmax.pl, farmapol.pl, lek24.pl, thisisbio.pl, auracare.pl, auraherbals.pl, twojcel.to — ≥9 |
| „kiedy brać witaminę D3 – rano czy wieczorem" | poradnikzdrowie.pl, zdrowie.interia.pl, oleofarm24.pl, nutrivital.pl, juvit.pl, stylebylena.pl, auraherbals.pl, stronazdrowia.pl, mito-med.pl — ≥9 |
| „ciągłe zmęczenie, brak energii – jakie badania" | dimedic.eu, diag.pl, medistore.com.pl, premium-medical.pl, cmr-ostroleka.pl, homelab24.pl, zdrowiepro.com, wrzuc.info — ≥8 (uwaga: SERP zdominowany przez laboratoria sprzedające pakiety badań) |
| „chronotyp: delfin/niedźwiedź/lew/wilk" | hellozdrowie.pl, zdrowie.interia.pl, dziendobry.tvn.pl, meubles.com.pl, bezsennosc-wroclaw.pl (SenMedica), lo1.gizycko.edu.pl + darmowy test PDF melatonina.pl — ≥7 |
| „kalkulator snu" | kalkulatorsnuonline.pl, omnicalculator.com/pl, plantpur.pl, kalkulatory.biohac.pl, medme.pl, sleepchangers.com/pl, wylecz.to — ≥7 darmowych narzędzi |
| „praca zmianowa / nocna zmiana – jak spać" | pytania.abczdrowie.pl, poradnikzdrowie.pl, senamina.pl, sleepinghouse.pl, dlaspania.pl, gowork.pl, sennamaterace.pl, mywspieramy.org — ≥8 (głównie sklepy z materacami i portale pracy) |

Jeden ze snippetów (artykuł fdm.pl lub interia.pl — nie udało się ustalić który) twierdzi, że „budzenie się o 3 w nocy – co oznacza?" jest jednym z najczęściej wyszukiwanych tematów; traktować jako sygnał, nie dowód.

### 2.3 Wątki użytkowników (fora, Q&A) — istnienie potwierdzone, treści niepobrane

- Kafeteria: „Jestem koszmarnie zmeczony a nie moge spac" — https://f.kafeteria.pl/temat/f1/jestem-koszmarnie-zmeczony-a-nie-moge-spac-p_5856384
- Kafeteria: „budzenie sie o 3 w nocy" — https://f.kafeteria.pl/temat-5883555-budzenie-sie-o-3-w-nocy/
- Kafeteria: „Znowu nie spałam całą noc.." — https://f.kafeteria.pl/temat-5434582-znowu-nie-spalam-cala-noc/
- Wizaz: „Jak radzić sobie z bezsennością, czemu nie mogę zasnąć? Wasze metody,rady.PILNE!" — https://wizaz.pl/forum/showthread.php?t=712491
- Wizaz: „Co robicie, gdy nie możecie spać?" — https://rozmowy.wizaz.pl/kobieta/forum-plotkowe/405499-co-robicie-gdy-nie-mo%C5%BCecie-spa%C4%87?t=628614
- Netkobiety: „Sposoby na bezsenność" (wątek ma ≥3 strony) — https://www.netkobiety.pl/viewtopic.php?id=829&p=3
- Forum Kobieta w mieście Kielce: „Ciągłe zmęczenie i brak energii co robić?" — https://kobietawmiesciekielce.pl/forum/threads/ciagle-zmeczenie-i-brak-energii-co-robic.123/
- abcZdrowie (pytanie do lekarza): „Dlaczego po nocnych zmianach nie mogę spać?" — https://pytania.abczdrowie.pl/pytania/dlaczego-po-nocnych-zmianach-nie-moge-spac
- Diag.pl (pytanie pacjenta, treść w slugu URL): „dopadło mnie ciągłe zmęczenie i senność, nie mam energii, jakie badania wykonać" — https://diag.pl/pacjent/qa/dopadlo-mnie-ciagle-zmeczenie-i-sennosc-nie-mam-energii-jakie-badania-wykonac/
- Wizaz (IF): „post przerywany - intermittent fasting" — https://rozmowy.wizaz.pl/zdrowie-i-medycyna/dietetyka/wsp%C3%B3lne-odchudzanie/648249-post-przerywany-intermittent-fasting
- Reddit r/Polska: **brak danych** (reddit.com zablokowany; operator site: nie zwrócił wyników).

### 2.4 YouTube PL
Istnieje liczna półka filmów „Jak zasnąć w 2 minuty (metoda wojskowa)" z lat 2018–2023 (np. https://www.youtube.com/watch?v=OOmkWUjDKLQ z 2018-12-21, https://www.youtube.com/watch?v=CleG6uJfasQ z 2023-07-23, https://www.youtube.com/watch?v=AjnTzPq-zoM z 2022-09-30, https://www.youtube.com/watch?v=U7pMllZYgtY z 2018-11-09, „Jak Szybciej Zasnąć i Spać Lepiej? 20 Naukowych Trików" https://www.youtube.com/watch?v=teIV08_0UV4). **Liczby wyświetleń: brak danych** (youtube.com zablokowany). Kanał „Forma na życie" (Daria Łukowska) i podcast „BIOHACKING i nie tylko" (Michał Undra, https://creators.spotify.com/pod/profile/micha-undra/) — liczby subskrypcji: brak danych. Q&A o kursie snu z kanałem Astrofaza: https://www.youtube.com/watch?v=UK_yU4sNGGk (współpraca Długowiecznych z dużym kanałem popularnonaukowym — sygnał, że temat „nosi" u szerokiej publiczności).

### 2.5 Trend kulturowy: „sleepmaxxing"
Polskie media masowo opisały trend z TikToka (vogue.pl, hellozdrowie.pl, eska.pl, trojmiasto.pl, papilot.pl, obcas.pl, vva.pl, newslubuski.pl — np. https://www.vogue.pl/a/czym-jest-sleepmaxxing-trend-z-tiktoka-obiecuje-sen-doskonaly). Wg snippetów trend „ma zwolenników zwłaszcza w grupie osób z pokolenia Z", a eksperci ostrzegają, że „pogoń za perfekcyjnym snem może paradoksalnie prowadzić do bezsenności". Dla nas: młodsza grupa już „optymalizuje sen" jako hobby → grunt pod produkt-gadżet/protokół; jednocześnie ryzyko wizerunkowe „szkodliwych trików" (unikać: zaklejanie ust, ekstremy).

### 2.6 Grupy Facebook
- „Problemy ze snem - forum" — https://www.facebook.com/groups/1443090539664326/ — **liczba członków: brak danych**.
- Fanpage „Bracia Rodzeń" (treści o poście przerywanym/keto): **826 003 obserwujących** (wg snippetu wyników; https://www.facebook.com/BraciaRodzen/) — pokazuje skalę zainteresowania IF w PL, ale też, że temat ma już „twarze".
- Posty sprzedażowe w grupach lokalnych używające dokładnie naszych haków: „Ciągłe zmęczenie, problemy ze snem i napięcie w ciele?" (https://www.facebook.com/groups/1394942120814611/posts/3840209832954482/), „🌿Odczuwasz zmęczenie, brak energii, problemy ze snem albo ..." (https://www.facebook.com/groups/317884796275676/posts/2081948139869324/), „Jeśli żyjesz w ciągłym stresie, masz problemy ze snem ..." (https://www.facebook.com/groups/ogoszeniaowiecimbrzeszcze/posts/2762749537444854/). Wniosek: te frazy są już eksploatowane przez sprzedawców (prawdopodobnie suplementy/MLM) → odbiorca ma wyrobioną odporność na „masz problemy ze snem? mam rozwiązanie".

---

## 3. Konkurencja (produkty płatne w PL)

| Nazwa | URL | Cena (wg snippetu) | Format | Co zawiera | Twarz/ekspert | Słabości / opinie |
|---|---|---|---|---|---|---|
| „Jak spać, żeby się wyspać?" — Daria Łukowska (Znak, 2022) | https://www.legimi.pl/ebook-jak-spac-zeby-sie-wyspac-daria-lukowska,b1469727.html ; https://www.taniaksiazka.pl/jak-spac-zeby-sie-wyspac-daria-lukowska-p-1691959.html | ebook 44,99 zł (promo 36,89), papier 49,99 zł (promo 34,99), Allegro 28,75 zł | książka 256 str. | metody, analiza jakości snu, nawyki | TAK — dietetyczka (UM Poznań), fizjoterapeutka (AWF), „trenerka snu", YouTube „Forma na życie" | statyczna, brak narzędzi; cena książki ustawia kotwicę ~35–45 zł |
| „Szkoła Optymalizacji Snu" (Długowieczni) — kurs audio / kurs online | https://sklep.dlugowieczni.pl/szkola-optymalizacji-snu-kurs-audio-21a9a4d5-d652-400b-8968-47db701cd6a4 ; https://sklep.dlugowieczni.pl/szkola-optymalizacji-snu | audio 99,00 zł; wersja online: brak danych; subskrypcja platformy 6 tyg. 89 zł / rok 559 zł | kurs audio / wideo | moduły o śnie (szczegóły: brak danych) | TAK — mgr Daria Łukowska, dr Maciej Duczyński (fizjoterapeuta), mgr Kinga Rajchel (psycholog) | pasywny odbiór; brak interaktywności; opinie: brak danych |
| Kurs „Biohacking" — Michał Undra | https://undra.pl/bio/ ; https://undra.pl/courses/biohacking/ | 897 zł (snippet: „najniższa cena z 30 dni 1497 zł" — do weryfikacji) | kurs online, dostęp 12 mies. | sen, stres, odżywianie, aktywność, suplementacja, neuroprotekcja; dla osób z „zmęczeniem, niskim poziomem energii, problemami ze snem" | TAK — dietetyk, „pierwszy propagator biohackingu w PL" | premium/segment 20× drożej niż nasz; nie konkuruje cenowo, ale zabiera „poważnych" klientów |
| „Pokonaj bezsenność w 6 krokach z terapią poznawczo-behawioralną" — Walacik-Ufnal, Fornal-Pawłowska | https://allegro.pl/produkt/pokonaj-bezsennosc-w-6-krokach-... ; http://www.medycynasnu.pl/aktualnosci/pokaz/59.html | 49,00 zł | książka-poradnik | samodzielny program CBT-I | TAK — lekarki/psycholożki ośrodka medycyny snu | książka; wymaga dyscypliny; dla osób z bezsennością kliniczną |
| „Sen, który działa. Szybsze zasypianie i mniej pobudek w 21 dni" (Wyd. Marek Derewiecki) | https://derewiecki.pl/sen-ktory-dziala-szybsze-zasypianie/ ; https://www.ibuk.pl/ | ebook 20,79 zł (reg. 33,00 zł) | ebook, 21-dniowy program, 15–20 min/dzień, PDF „Dziennik snu" | stabilizacja rytmu, praca z myślami, reakcja na wybudzenia, zapobieganie nawrotom (oparte na CBT-I) | mało znany autor (snippet wspomina „Konrad Radowski" — niepewne) | **najbliższy nam produkt „bez twarzy"**; statyczny PDF; sprzedaż: brak danych |
| „Sztuka spania i wstawania" — Mateusz Karbowski | https://ebookpoint.pl/ksiazki/sztuka-spania-i-wstawania-mateusz-karbowski,e_017x.htm | ebook PDF 24,97 zł; audiobook 22,97 zł | ebook/audiobook | proste porady, „spać mniej, mieć więcej energii" | autor-praktyk, nie lekarz | opinia ze snippetu: „część z nich nie jest zbyt odkrywcza" |
| „Hello Sleep" — Jade Wu (Filia, 2023) | (wyniki Goodreads/księgarnie) | brak danych | książka 464 str. | CBT-I popularnonaukowo | TAK — psycholożka (USA) | długa; nie narzędzie |
| Goodsleeper — polska aplikacja CBT-I (wyrób medyczny) | https://goodsleeper.pl/cennik/ ; https://goodsleeper.pl/skutecznosc-aplikacji-goodsleeperpl/ ; https://play.google.com/store/apps/details?id=com.goodsleeper.cbt&hl=pl&gl=PL | 17 zł/mies. | aplikacja, 6-tygodniowy program, dziennik snu, „Mapa Bezsenności" | cyfrowe sesje CBT-I | TAK — instytucjonalna (poradnia zaburzeń snu, badanie skuteczności: zasypianie 42,1→22,3 min, przebudzenia 46→20 min, AIS 12,3→5,2) | opinie w Google Play mieszane — część użytkowników: informacje „były im już wcześniej znane"; wymaga instalacji i subskrypcji |
| Nightly (DreamJay, PL startup) | https://www.wirtualnemedia.pl/polski-startup-nightly-startuje-w-usa-z-aplikacja-wspomagajaca-sen-... ; https://innpoland.pl/137455,... | 4,99 USD/mies., 35,99 USD/rok, 14 dni trial | aplikacja (EN) | monitoring snu czujnikami telefonu, redukcja koszmarów, budzik w lekkiej fazie | startup z finansowaniem 2,3 mln USD | po angielsku; celuje w rynek medyczny USA |
| „Poranne Nawyki" (Od Kelnera Do Milionera) | https://porannenawyki.pl/ ; https://odkelneradomilionera.pl/porannenawyki/ | 37 zł | lekcje + PDF + MP3 + arkusze śledzenia, wyzwania 7 i 14 dni, gwarancja 14 dni | rytuały poranne | mikro-marka osobista (nie ekspert medyczny) | dowód, że „wyzwanie 7/14 dni za 37 zł" to działający format w PL; brak interaktywności |
| „Fenomen poranka" — ebook (Galaktyka) | https://www.galaktyka.com.pl/ebooki/fenomen-poranka-jak-zmienic-swoje-zycie-ebook | brak danych | ebook (tłumaczenie) | rytuały poranne | autor zagraniczny | klasyka, nie narzędzie |
| „Potęga KIEDY" — Michael Breus (Znak) | https://lubimyczytac.pl/ksiazka/4183604/potega-kiedy-zyj-w-zgodzie-ze-swoim-naturalnym-rytmem ; https://www.ceneo.pl/49610444 | brak danych (książka 448 str.) | książka | 4 chronotypy + plan dnia | TAK — psycholog kliniczny (USA) | opinie „mieszane"; 448 stron = przeciwieństwo naszego formatu; jedyny płatny produkt „chronotyp" znaleziony w PL |
| „Post przerywany – poradnik na start" (enjoyment.pl) | https://enjoyment.pl/ZestaweBookAudiobookPostPrzerywanyPoradnikNaStart.html | zestaw ebook+audiobook 89,99 zł; sam ebook: brak danych | ebook PDF / audiobook | poradnik IF | brak danych | rynek IF ma dziesiątki ebooków (Janecka na ebookpoint, Fung, Klasen, Strefa Przemian „pierwszy polski e-book o IF") |
| Aplikacje IF: Kolo, Unimeal (moduł „Przerywany Post" 12/12…23/1) | https://play.google.com/store/apps/details?id=kolo.intermittent.fasting.tracker ; https://support.unimeal.com/hc/pl/articles/10198074562834-Post-przerywany | freemium | aplikacje | timer, plany okien | bez twarzy | nasz „IF timer" nie ma przewagi nad darmowymi |
| Etsy: „Dziennik snu Planer śledzenia snu Wkładka PDF do druku" (MyPrintableLifeCo) i in. | https://www.etsy.com/pl/listing/1042083851/sleep-journal-tracker-planner-printable ; https://www.etsy.com/pl/listing/965952133/minimalist-printable-sleep-log-tracker | brak danych | PDF do druku | tabelki dziennika snu | bez twarzy | istnieją, ale to papier, nie telefon; sprzedaż: brak danych |

**Czego NIE znalazłem** (i to jest luka): płatnego polskiego narzędzia web (bez instalacji) łączącego quiz chronotypu z planem dnia i checklistą snu; płatnego „protokołu 14 dni" jako interaktywnej strony; płatnego produktu dla pracy zmianowej; płatnego produktu „timing suplementów".

---

## 4. Darmowe alternatywy i czy ktoś mimo to zapłaci

| Darmowa alternatywa | Co daje | Dlaczego mimo to zapłaci (albo nie) |
|---|---|---|
| Kalkulatory faz snu (≥7 serwisów: https://kalkulatorsnuonline.pl/, https://www.omnicalculator.com/pl/zdrowie/kalkulator-snu, https://plantpur.pl/pl/kalkulator-snu, https://kalkulatory.biohac.pl/kalkulator-snu, https://www.medme.pl/kalkulatory/sen, https://sleepchangers.com/pl/kalkulator-snu/, https://wylecz.to/kalkulatory/kalkulator-snu) | jedna liczba: o której się położyć | Nie zapłaci za sam kalkulator. Zapłaci za **ciągłość** (14 dni, postęp, przypomnienia) i personalizację — czego kalkulatory nie mają. |
| Darmowy test chronotypu PDF (https://melatonina.pl/assets/files/test_na_chronotyp.pdf) + artykuły z opisem 4 typów | etykieta „jesteś wilkiem" | Etykieta jest darmowa wszędzie; **plan dnia z etykiety** (godzinowa oś + przypomnienia) — nie. To musi być rdzeń wartości. |
| ≥13 artykułów „budzę się o 3" i ≥9 „kiedy brać magnez" | wiedza ogólna | Wiedza jest darmowa; ludzie płacą za **wykonanie** („co robię dziś wieczorem o 21:40"). Ryzyko: użytkownik uzna, że „to już wiedziałem" — dokładnie ten zarzut pada w recenzjach Goodsleepera (Google Play, wg snippetu). |
| YouTube „metoda wojskowa 2 minuty", „20 naukowych trików" | jednorazowe triki | Ktoś, kto obejrzał 5 takich filmów i nadal nie śpi, jest gotów zapłacić za strukturę — ale też jest sceptyczny. |
| Goodsleeper 17 zł/mies. (nie darmowy, ale tani) i CBT-i Coach (darmowa, EN, https://play.google.com/store/apps/details/CBT_i_Coach?id=gov.va.mobilehealth.ncptsd.cbti) | prawdziwa terapia cyfrowa | Osoba z bezsennością kliniczną powinna iść tam — i my powinniśmy ją tam **odsyłać**; nasz klient to „źle śpię, ale nie jestem chory". |
| Darmowe aplikacje IF (Kolo, Fastic itp.) | timer okna | **Nie zapłaci** — dlatego IF-timer odpada jako produkt główny. |
| Scribd „Dziennik snu graficzny" (https://www.scribd.com/document/758965212/1-Dziennik-snu-graficzny) | PDF do druku | Papier vs. telefon — nasza przewaga formatu, jeśli dziennik liczy wskaźniki sam. |

Wniosek: przewaga musi być w **wykonaniu i personalizacji na telefonie**, nie w wiedzy. Każde zdanie w produkcie, które da się znaleźć w darmowym artykule, obniża postrzeganą wartość.

---

## 5. Reklamy (Ad Library / sieć)

- **Meta Ad Library: brak dostępu** (facebook.com zablokowany przez proxy).
- Pośrednie ślady: (a) posty sprzedażowe w grupach FB używające haków „ciągłe zmęczenie, problemy ze snem" (URL-e w 2.6) — wygląda na suplementy/MLM; (b) na Allegro frazy „sen/bezsenność" są zdominowane przez suplementy: „MÓJ SEN - TABLETKI NA BEZSENNOŚĆ DOBRY SEN" (https://allegro.pl/oferta/moj-sen-tabletki-na-bezsennosc-dobry-sen-9640412383), listingi „tabletki na sen", „dobry sen tabletki" (https://allegro.pl/listing?string=tabletki+na+sen) — reklamodawcy suplementów mają duże budżety na tych samych słowach; (c) polskie kampanie produktowe dużych marek (Samsung „Sleep Well": https://www.samsung.com/pl/campaign/samsung-sleep-well//zaburzenia-snu) — temat jest używany przez big-brandy do sprzedaży zegarków.
- Płatne kampanie polskich info-produktów o śnie: **brak danych**.

---

## 6. Voice of Customer

Uwaga: poniżej wyłącznie sformułowania widoczne w wynikach wyszukiwania (tytuły wątków/pytań napisane przez użytkowników, tytuły artykułów pisane „głosem czytelnika", fragmenty raportu). Treści postów nie pobrano.

### 6.1 Zasypianie / gonitwa myśli
1. „Jak radzić sobie z bezsennością, czemu nie mogę zasnąć? Wasze metody,rady.PILNE!" — użytkowniczka Wizaz — https://wizaz.pl/forum/showthread.php?t=712491
2. „Co robicie, gdy nie możecie spać?" — Wizaz — https://rozmowy.wizaz.pl/kobieta/forum-plotkowe/405499-co-robicie-gdy-nie-mo%C5%BCecie-spa%C4%87?t=628614
3. „Sposoby na bezsenność" — Netkobiety (≥3 strony) — https://www.netkobiety.pl/viewtopic.php?id=829&p=3
4. „Znowu nie spałam całą noc.." — Kafeteria — https://f.kafeteria.pl/temat-5434582-znowu-nie-spalam-cala-noc/
5. Raport UCE Research (fragment ze snippetu): „Najwięcej niezadowolonych osób po prostu długo nie może zasnąć (np. ma gonitwę myśli, rozmyśla o różnych sytuacjach) – 42,9%" — https://nowymarketing.pl/polacy-niedosypiaja-a-gospodarka-traci-na-tym-miliardy-zlotych-badania-uce-research-sklaniaja-do-refleksji-w-swiatowym-dniu-snu/

### 6.2 Budzenie się o 3
6. „budzenie sie o 3 w nocy" — Kafeteria — https://f.kafeteria.pl/temat-5883555-budzenie-sie-o-3-w-nocy/
7. „Budzę się o 3 w nocy i nie mogę zasnąć. Co robić?" — tytuł artykułu (głos czytelnika) — https://wellbestudio.pl/zdrowie/budze-sie-o-3-w-nocy-i-nie-moge-zasnac-dlaczego-wlasnie-wtedy-i-co-robic/
8. „Dlaczego budzę się między 2 a 4 w nocy i nie mogę zasnąć?" — https://readytoglo.pl/dlaczego-budze-sie-miedzy-2-a-4-w-nocy-i-nie-moge-zasnac/
9. „Co oznacza, że prawie każdej nocy budzę się między 3 a 5 nad ranem" — https://www.pepsieliot.com/co-oznacza-ze-prawie-kazdej-nocy-budze-sie-miedzy-3-a-5-nad-ranem/
10. „Budzisz się o 3 w nocy z kołataniem serca? Lekarze wskazują przyczynę" (slug URL) — https://www.poradnikzdrowie.pl/psychologia/zdrowie-psychiczne/budzisz-sie-o-3-w-nocy-z-kolataniem-serca-lekarze-wskazuja-przyczyne-aa-xTWL-ZS3S-qGJj.html
11. „Notorycznie budzisz się nad ranem i nie możesz zasnąć?" — RMF FM — https://www.rmf.fm/styl-zycia/zdrowie/news,74624,notorycznie-budzisz-sie-nad-ranem-i-nie-mozesz-zasnac-naukowcy-znaja-powod.html
   (Parafraza ze snippetu, NIE cytat: jeden z artykułów opisuje „Annę, 37-letnią menedżerkę z Wrocławia", która „od miesięcy budziła się o 3:00 prawie każdej nocy", a myśli nie pozwalały jej zasnąć — typowy portret persony.)

### 6.3 Ciągłe zmęczenie / brak energii
12. „Jestem koszmarnie zmeczony a nie moge spac" — Kafeteria — https://f.kafeteria.pl/temat/f1/jestem-koszmarnie-zmeczony-a-nie-moge-spac-p_5856384
13. „Ciągłe zmęczenie i brak energii co robić?" — forum Kobieta w mieście Kielce — https://kobietawmiesciekielce.pl/forum/threads/ciagle-zmeczenie-i-brak-energii-co-robic.123/
14. „dopadło mnie ciągłe zmęczenie i senność, nie mam energii, jakie badania wykonać" — pytanie pacjenta (slug) — https://diag.pl/pacjent/qa/dopadlo-mnie-ciagle-zmeczenie-i-sennosc-nie-mam-energii-jakie-badania-wykonac/
15. „Dlaczego ciągle jestem zmęczony? Gdy sen nie wystarcza, a badania są w normie" — tytuł artykułu — https://zdrowiepro.com/dlaczego-ciagle-jestem-zmeczony-gdy-sen-nie-wystarcza-a-badania-sa-w-normie-psychologiczne-zrodla-przewleklego-zmeczenia/
16. Hak sprzedawców w grupach FB: „Ciągłe zmęczenie, problemy ze snem i napięcie w ciele?" — https://www.facebook.com/groups/1394942120814611/posts/3840209832954482/ ; „🌿Odczuwasz zmęczenie, brak energii, problemy ze snem albo ..." — https://www.facebook.com/groups/317884796275676/posts/2081948139869324/

### 6.4 Praca zmianowa
17. „Dlaczego po nocnych zmianach nie mogę spać?" — pytanie użytkownika do lekarza — https://pytania.abczdrowie.pl/pytania/dlaczego-po-nocnych-zmianach-nie-moge-spac

### 6.5 Timing suplementów (pytania do lekarzy — pokazują realny kształt problemu: interakcje, nie „rano czy wieczorem")
18. „Dzień dobry, czy magnez można przyjmować jednocześnie z tabletkami z cynkiem?" — https://www.znanylekarz.pl/pytania-odpowiedzi/dzien-dobry-czy-magnez-mozna-przyjmowac-jednoczesnie-z-tabletkami-z-cynkiem
19. „Czy przy nerwicy Lękowej średnich zaburzeń mogę przyjmować o 9:00 rano magnez Magneforte który zawie[…]" — https://www.znanylekarz.pl/pytania-odpowiedzi/czy-przy-nerwicy-lekowej-srednich-zaburzen-moge-przyjmowac-o-9-00-rano-magnez-magneforte-ktory-zawie-2
20. „Dzień dobry, czy mogę brać lamotryginę 50mg z suplementami diety np. cytrynian wapnia, magnezu, chro[…]" — https://www.znanylekarz.pl/pytania-odpowiedzi/dzien-dobry-czy-moge-brac-lamotrygine-50mg-z-suplementami-diety-np-cytrynian-wapnia-magnezu-chro
21. „Jaka forma magnezu nie powoduje biegunki?" — https://pytania.abczdrowie.pl/pytania/jaka-forma-magnezu-nie-powoduje-biegunki
22. „Czy można łączyć lub brać magnez z antydepresantami?" — https://pytania.abczdrowie.pl/pytania/czy-mozna-laczyc-lub-brac-magnez-i-antydepresantami
23. „W jaki sposób rozplanować jednoczesne przyjmowanie leków Dexilant 30mg i Hemofer Prolongatum?" — https://pytania.abczdrowie.pl/pytania/w-jaki-sposob-rozplanowac-jednoczesne-przyjmowanie-lekow-dexilant-30mg-i-hemofer-prolongatum
24. „Tabletki antykoncepcyjne a magnez i witamina B6" — https://pytania.abczdrowie.pl/pytania/tabletki-antykoncepcyjne-a-magnez-i-witamina-b6

### 6.6 IF
25. „post przerywany - intermittent fasting" (wątek „wspólne odchudzanie") — https://rozmowy.wizaz.pl/zdrowie-i-medycyna/dietetyka/wsp%C3%B3lne-odchudzanie/648249-post-przerywany-intermittent-fasting

### 6.7 Słowa, których ludzie używają
- Ból: „nie mogę zasnąć", „budzę się o 3 (w nocy)", „gonitwa myśli", „koszmarnie zmęczony", „ciągłe zmęczenie i brak energii", „znowu nie spałam całą noc", „po nocnych zmianach nie mogę spać".
- Intencja: „co robić", „wasze metody, rady", „sposoby na", „jakie badania wykonać", „PILNE".
- Suplementy: „kiedy brać", „rano czy wieczorem", „czy można łączyć", „jednoczesne przyjmowanie", „jaka forma".
- Czego NIE mówią: „higiena snu", „protokół", „biohacking", „chronotyp" (to język twórców, nie klientów — do użycia w produkcie, nie w reklamie).

### 6.8 Moment zakupu (hipotezy oparte na powyższym)
- 23:30–1:00 z telefonem w łóżku po nieudanym zasypianiu; 3:00–4:30 po wybudzeniu (czyta „budzę się o 3" w Google) — **naturalny moment dla produktu mobile-web** (kryterium 13).
- „Znowu nie spałam całą noc" — poranek po złej nocy, impuls „muszę coś z tym zrobić".
- Po odebraniu badań „w normie" (SERP zmęczenia jest pełen laboratoriów) — rozczarowanie brakiem diagnozy → szuka „planu".
- Sezonowo (hipoteza, brak danych z Trends): zmiana czasu (koniec października), styczeń (postanowienia), okres jesienno-zimowy.

---

## 7. Persona problemowa (szkic) — dla konceptu „Chronotyp + Reset snu"

- **Kto:** 28–45 lat, pracuje umysłowo lub w usługach, mieszka w mieście; częściej kobieta (fora Wizaz/Netkobiety/Kafeteria są kobiece), ale ból jest uniwersalny.
- **Objaw główny:** „długo nie mogę zasnąć, gonitwa myśli" (42,9% niezadowolonych wg UCE) i/lub „budzę się o 3 i już nie zasnę".
- **Co już zrobiła:** melatonina/magnez z apteki, 3–5 filmów „jak zasnąć w 2 minuty", przeczytała 2–3 artykuły „budzę się o 3", może kalkulator snu; nie chce iść do psychiatry („to nie choroba"), nie chce książki na 256–448 stron.
- **Frustracja:** „wszystko to już wiem, ale nie robię" → potrzebuje **struktury i wykonania**, nie wiedzy.
- **Kotwice cenowe w głowie:** książka 25–45 zł, aplikacja 17 zł/mies., kurs 99 zł. 39–49 zł za „plan + 14 dni" jest w środku.
- **Obiekcje:** „skąd mam wiedzieć, że to działa, skoro nie ma lekarza?", „to pewnie znowu te same porady", „nie chcę kolejnej subskrypcji".
- **Co ją przekona:** podgląd narzędzia przed zakupem, jednorazowa płatność, gwarancja zwrotu (Poranne Nawyki używa 14-dniowej), jawne źródła (zasady CBT-I/higieny snu z publicznych wytycznych), jasne „kiedy iść do lekarza".
- **Kanał:** Instagram/Facebook wieczorem; reklama-quiz („Który z 4 typów rytmu dobowego masz?") zamiast reklamy-objawu.

---

## 8. Ryzyka

### 8.1 Prawne (porada medyczna?)
- Bezsenność przewlekła to jednostka chorobowa; CBT-I to terapia. Nasz produkt musi być „edukacją i planem nawyków", nie „terapią" ani „leczeniem". Konieczne: bramka „jeśli problemy trwają >3 miesiące / >3 noce w tygodniu, skonsultuj lekarza" (taki próg podaje m.in. https://konsultacjepsychiatryczne.pl/bezsennosc-i-wybudzanie-o-3-4-nad-ranem-...-poradnik-2026/ i https://readytoglo.pl/...), brak obietnic („pozbędziesz się bezsenności").
- **Suplementy:** od stycznia 2026 r. w PL obowiązują zaostrzone zasady reklamy suplementów — wg snippetów m.in. „całkowity i bezwzględny zakaz wykorzystywania wizerunku osób wykonujących zawody medyczne lub sugerujących takie profesje", zakaz sugerowania działania leczniczego, kary i publiczne ostrzeżenia GIS (https://www.gazetaprawna.pl/biznes/zdrowie/artykuly/11240197,nowe-prawo-uderza-w-suplementy.html ; https://foodfakty.pl/chaos-wokol-reklamy-suplementow-diety-... ; https://politykazdrowotna.com/artykul/nowe-przepisy-o-suplementach-n2280766). UOKiK w 2025 r. ukarał influencerów (Rabczewska, Chajzer, Rozenek-Majdan) za oznaczanie reklam suplementów (https://biotechnologia.pl/farmacja/reklama-suplementow-diety-przez-influencerow-...,23941). Wnioski: (1) moduł „timing suplementów" — tylko generycznie (składnik, nie marka), bez claimów zdrowotnych poza dozwolonymi; (2) **AI-awatar nie może wyglądać jak lekarz** (żadnego białego fartucha, stetoskopu, „dr" w nazwie) — inaczej wchodzimy w zakaz „sugerowania profesji medycznej".
- Pytania VoC o suplementy dotyczą interakcji z lekami (lamotrygina, antydepresanty, Dexilant, antykoncepcja) — **tego produkt nie może dotykać** w ogóle; zostaje „magnez wieczorem, D3 z tłuszczem rano, kofeina do godziny X" — czyli to, co i tak jest w 9 darmowych artykułach.

### 8.2 Polityki reklamowe Meta (skrót; osobny agent robi głębiej)
- **Ograniczenia „health & wellness" (od stycznia 2025):** źródła danych (piksel/CAPI) sklasyfikowane przez Metę jako zdrowotne/wellness nie mogą przesyłać zdarzeń dolnego lejka — „Purchase", „AddToCart" (a przy pełnej restrykcji żadnych danych); optymalizacja spada do „Landing Page Views"/„Engagement" (https://www.customerlabs.com/blog/meta-data-sharing-restrictions-what-it-means-for-health-brands/ ; https://www.polaranalytics.com/post/2025-metas-tracking-restrictions-for-health-wellness-are-here----heres-how-to-fix-it ; https://stape.io/news/meta-data-sharing-restrictions-healthcare ; https://www.triplewhale.com/blog/meta-health-and-wellness-brands ; https://aixel.io/blog/meta-health-wellness-ad-restrictions-2026 ; https://community.shopify.com/t/meta-pixel-restriction-on-health-and-wellness-category/394715). Dla testu za 300 PLN: prawdopodobnie **nie zoptymalizujemy pod zakup** i nie zobaczymy zakupów w Ads Managerze — trzeba liczyć konwersje po stronie Stripe/landingu.
- **Personal attributes:** zakaz sugerowania, że znamy cechy/stan zdrowia odbiorcy (https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/). Wg źródeł branżowych z 2026 r. aktualizacja z marca 2026 rozszerzyła wykrywanie na **sugerowane objawy w 2. osobie** — przykład podany dosłownie w źródle: „Tired of waking up at 3am?" — z wyższym odsetkiem odrzuceń w wertykałach sen/zdrowie psychiczne (https://www.auditsocials.com/blog/meta-ad-misleading-claims-personal-attributes-prohibited-content-policy-2026 ; https://www.zappush.com/blog/meta-personal-attributes-policy-health-wellness-ads ; https://www.stackmatix.com/blog/meta-ads-personal-attributes-policy ; https://www.webfactoryltd.com/meta-ads-health-and-wellness-advertising-restrictions-...). Zalecane copy: „Poznaj plan dnia dopasowany do rytmu dobowego" zamiast „Budzisz się o 3?". To **zabija najsilniejszy hak VoC w reklamie** — zostaje mu miejsce na landingu.
- Nowe konto reklamowe + wertykał zdrowotny + „AI-awatar" = podwyższone ryzyko odrzuceń i wolniejszego uczenia.

### 8.3 Zaufanie do anonimowej marki
- Wszystkie znalezione płatne produkty o śnie w PL są firmowane ekspertem (tabela w sekcji 3). Jedyne „bez twarzy": ebook „Sen, który działa" (mało znany autor; sprzedaż: brak danych), printable na Etsy, darmowe kalkulatory. **Brak dowodu, że anonimowa marka sprzedaje info-produkt o śnie w PL.**
- Pozytywne analogie: quizy/kalkulatory/aplikacje (Kolo, Fastic, kalkulatorsnuonline.pl) działają bez twarzy — bo są **narzędziami**. Stąd rekomendacja pozycjonowania: „narzędzie/plan", nie „poradnik eksperta".
- Mitigacje: podgląd działającego narzędzia przed zakupem; jednorazowa płatność; gwarancja zwrotu; lista źródeł (publiczne wytyczne, np. materiały Narodowej Fundacji Snu https://www.nfs.org.pl/ , CBT-I opisane przez https://cbt.pl/baza-wiedzy/wyzwania-transdiagnostyczne/terapia-poznawczo-behawioralna-bezsennosci-cbti/); uczciwe liczniki użycia; brak fałszywych opinii.

### 8.4 Sezonowość
- **Brak danych** (Trends zablokowany). Hipotezy: szczyt zainteresowania snem — jesień/zima i zmiana czasu; IF — styczeń; jet lag — lato. Test we wrześniu/październiku wypada raczej w dobrym oknie.

### 8.5 Konkurencja
- Cenowo: książki 20–50 zł i Goodsleeper 17 zł/mies. ograniczają nas do ≤49 zł (co i tak jest limitem). Uwagowo: suplementy „na sen" i big-brandy (Samsung Sleep Well) licytują te same słowa. Treściowo: 13+ darmowych artykułów na każdy nasz hak → produkt musi być „wykonaniem", nie „wiedzą".
- Ryzyko „to już wiedziałem" (recenzje Goodsleepera) dotyczy nas jeszcze bardziej, bo nie mamy autorytetu, który to „już wiedziałem" łagodzi.

---

## 9. Ocena wg rubryki (1–5, wyżej = lepiej)

### C1 — „Reset snu w 14 dni" (checklista dzienna + dziennik snu + tryb nocny „obudziłem się o 3")

| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 5 | 41,4% niezadowolonych ze snu, 42,9% z nich „długo nie może zasnąć" (UCE 2025). |
| 2 | Wyjaśnienie w 1 zdaniu | 4 | „14 dni, 5 minut wieczorem: zasypiaj szybciej i przestań budzić się w nocy" — jasne, ale obietnica ociera się o claim. |
| 3 | Dotarcie przez Meta | 3 | Szerokie zainteresowania OK, ale copy objawowe zabronione, a zdarzenie Purchase może być zablokowane. |
| 4 | Konkurencja | 3 | Książki 20–50 zł i Goodsleeper 17 zł/mies.; brak interaktywnego web-protokołu, ale dużo darmowej treści. |
| 5 | Dowody popytu | 4 | Płatne ebooki/kursy 20,79–99 zł, aplikacje, dziesiątki wątków i artykułów; brak danych o wolumenach. |
| 6 | Szybkość produkcji | 3 | 14 dni treści + checklista + dziennik z metrykami + tryb nocny = 3–5 dni. |
| 7 | Dobry produkt bez eksperta | 3 | Zasady higieny snu/CBT-I są publiczne, ale przypadki kliniczne wymagają bramek „idź do lekarza". |
| 8 | Wizualność reklam | 4 | Zegar 3:00, ekran nocny, wykres postępu, checklista — łatwo pokazać. |
| 9 | Upsell | 4 | Chronotyp/plan dnia, moduł energii, PDF, przypomnienia. |
| 10 | Marża / cena ≤49 | 5 | Produkt cyfrowy, zero kosztu krańcowego. |
| 11 | Ryzyko reklamowe/prawne | 2 | Health & wellness + personal attributes + bezsenność = jednostka chorobowa. |
| 12 | Wejście w kilka dni | 3 | Nowe konto Meta w wertykale zdrowotnym — odrzucenia i wolne uczenie prawdopodobne. |
| 13 | Format „telefon w ręku" | 5 | Telefon w łóżku o 23:30 i o 3:10 to dosłownie moment użycia. |
| 14 | Bez twarzy eksperta | 3 | Framing „narzędzie" pomaga, ale wszystkie płatne produkty o śnie w PL mają eksperta; brak dowodu anonimowego sukcesu. |
| | **Suma** | **51 / 70** | |

### C2 — „Chronotyp → Twój plan dnia" (quiz + spersonalizowana oś dnia: światło, kawa, trening, posiłki, wyciszenie, sen; przypomnienia/kalendarz)

| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 3 | Ciekawość + zmęczenie pośrednio; słabszy ból niż „nie śpię". |
| 2 | Wyjaśnienie w 1 zdaniu | 4 | „Zrób test i dostań swój plan dnia: kiedy kawa, światło, trening, sen." |
| 3 | Dotarcie przez Meta | 4 | Reklama-quiz nie wymaga języka objawów; lifestyle targeting; niższe ryzyko odrzuceń. |
| 4 | Konkurencja | 4 | Darmowe testy/artykuły i 448-stronicowa książka Breusa — brak płatnego interaktywnego produktu w PL. |
| 5 | Dowody popytu | 3 | ≥7 artykułów + darmowy PDF + książka o „mieszanych" opiniach; brak dowodu płatnego popytu na chronotyp. |
| 6 | Szybkość produkcji | 4 | Quiz + generator harmonogramu = 2–3 dni. |
| 7 | Dobry produkt bez eksperta | 4 | Modele (Breus/MEQ) publiczne, niska szkodliwość; personalizacja regułowa. |
| 8 | Wizualność reklam | 5 | Archetypy zwierząt, oś dnia, „Twój dzień o 7:10 / 14:30 / 22:40" — bardzo wizualne. |
| 9 | Upsell | 4 | Reset snu, moduł energii, eksport do kalendarza, wersja dla pary/zmianowa. |
| 10 | Marża / cena ≤49 | 5 | Cyfrowy; 29–39 zł jako impuls. |
| 11 | Ryzyko reklamowe/prawne | 3 | Wciąż „wellness", ale copy neutralne; ryzyko rośnie, jeśli dodamy suplementy. |
| 12 | Wejście w kilka dni | 4 | Mniej odrzuceń niż C1; quiz zbiera e-maile (MailerLite) od 1. dnia. |
| 13 | Format „telefon w ręku" | 5 | Plan dnia z przypomnieniami żyje w telefonie. |
| 14 | Bez twarzy eksperta | 4 | Quizy/archetypy sprzedają się jako marki, nie osoby (analogia: darmowe kalkulatory, aplikacje). |
| | **Suma** | **56 / 70** | |

### C3 — „Audyt energii 7 dni" (3 check-iny dziennie + tagi sen/kofeina/posiłki/ruch/ekran + wykrywacz wzorców + protokół)

| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 4 | Wiele wątków „ciągłe zmęczenie, brak energii", ale użytkownik najpierw szuka badań. |
| 2 | Wyjaśnienie w 1 zdaniu | 3 | „Znajdź w 7 dni, co kradnie ci energię" — OK, ale rozmyte. |
| 3 | Dotarcie przez Meta | 3 | Copy objawowe („ciągle zmęczony?") = personal attributes; trzeba iść okrężnie. |
| 4 | Konkurencja | 3 | SERP zdominowany przez laboratoria (pakiety badań), na górze kurs Undry 897 zł; środek pusty. |
| 5 | Dowody popytu | 3 | Popyt na „jakie badania" duży; na tani protokół — brak dowodu. |
| 6 | Szybkość produkcji | 3 | Check-iny + prosta analityka wzorców + 7 protokołów = 3–4 dni. |
| 7 | Dobry produkt bez eksperta | 2 | Zmęczenie ma przyczyny medyczne (anemia, tarczyca); bez eksperta łatwo o błąd zaniechania. |
| 8 | Wizualność reklam | 3 | Krzywa energii dnia — przyzwoita, ale mniej chwytliwa. |
| 9 | Upsell | 4 | Reset snu, chronotyp, timing kofeiny/suplementów. |
| 10 | Marża / cena ≤49 | 5 | Cyfrowy. |
| 11 | Ryzyko reklamowe/prawne | 2 | Objaw = potencjalnie stan zdrowia; „zmęczenie" jako hasło jest już wypalone przez MLM. |
| 12 | Wejście w kilka dni | 3 | Jak C1. |
| 13 | Format „telefon w ręku" | 4 | Check-iny 3×/dzień w telefonie — naturalne, ale wymaga dyscypliny. |
| 14 | Bez twarzy eksperta | 3 | „Audyt" brzmi narzędziowo, ale temat medyczny obniża zaufanie do anonima. |
| | **Suma** | **45 / 70** | |

Odrzucone jako produkt główny (bez pełnej tabeli): (4) protokół poranka — istnieje „Poranne Nawyki" 37 zł i masa darmowych treści, mała różnica; (5) timing suplementów — 9+ darmowych artykułów, prawo 2026, realne pytania dotyczą interakcji z lekami; (6) praca zmianowa/jet lag — brak dowodów płatnego popytu (brak danych), trudne targetowanie; (7) IF timer — darmowe aplikacje (Kolo, Unimeal i in.), 826 tys. obserwujących „Bracia Rodzeń" pokazuje, że temat ma już swoje twarze.

---

## 10. Pomysł na produkt interaktywny (telefon) + upsell

### Produkt główny: „Twój rytm" — test chronotypu + plan dnia + 14-dniowy reset snu (39–49 zł, jednorazowo)

Lejek:
1. **Reklama-quiz (neutralna):** „Lew, niedźwiedź, wilk czy delfin? 2-minutowy test rytmu dobowego + darmowy szkic planu dnia." Zero objawów w copy (polityka personal attributes).
2. **Darmowy quiz (mobile-web, 8–10 pytań)** → wynik + 3 pierwsze pozycje planu dnia za darmo (np. okno na kawę, godzina „ekran off", docelowa godzina snu) + e-mail (MailerLite) na pełny plan.
3. **Płatny odblok (Stripe, 39–49 zł):**
   - **Oś dnia spersonalizowana** z godzinami: światło dzienne rano, okno na kofeinę (z odliczaniem „ostatnia kawa za 40 min"), okno na trening, ostatni posiłek, start wyciszenia, godzina do łóżka, godzina pobudki; eksport .ics do kalendarza (przypomnienia bez aplikacji).
   - **Reset snu 14 dni:** codzienna checklista 5 pozycji (stała pora wstawania, światło, kofeina, ekran, „zasada 20 minut"), 1 mikro-lekcja dziennie (≤90 s czytania), pasek postępu; treść oparta na publicznych zasadach higieny snu/CBT-I, z jawnymi źródłami.
   - **Dziennik snu 30 s/dzień** (o której do łóżka, ile zasypiałem, ile razy się budziłem, pobudka) → automatyczna **efektywność snu** i wykres 14-dniowy (to, czego papierowe PDF-y i kalkulatory nie liczą).
   - **Tryb nocny „obudziłem się"**: ciemny ekran bez zegara, timer oddechowy, przypomnienie zasady 20 minut, jedna linijka co zrobić — używany dokładnie w momencie bólu.
   - **Bramka bezpieczeństwa**: ekran „kiedy to nie jest dla ciebie" (objawy >3 mies., chrapanie z bezdechami, obniżony nastrój → lekarz/poradnia snu; link do darmowych zasobów).
   - Kalkulatory bonusowe: godzina snu wg cykli, „kofeina w organizmie" (prosty półokres), okno światła w zależności od miesiąca.
4. **Po 14 dniach:** raport PDF z wykresem + „co dalej".

Dlaczego to pasuje do briefu: mobile-web, bez instalacji, interaktywne (quiz, timery, checklisty, wykres), impulsowa cena, awatar prowadzi jako „przewodnik", nie „lekarz"; wartość jest w wykonaniu i personalizacji, nie w wiedzy.

### Naturalny upsell (po zakupie / po 14 dniach, 19–29 zł każdy lub pakiet)
- **„Energia w dzień"** — 7-dniowy audyt energii (3 check-iny/dzień) z krzywą energii nałożoną na plan dnia z chronotypu (C3 jako moduł, nie produkt).
- **„Wersja dla pracy zmianowej"** — generator planu dla rotacji zmian (światło/okulary/sen kotwiczący) — nisza bez konkurencji, ale sprzedawana tylko istniejącym klientom (bez reklamy).
- **„Timing codziennych nawyków"** — generyczny planer pór (kofeina, magnez wieczorem, D3 z posiłkiem, kreatyna „kiedykolwiek, byle codziennie") — wyłącznie składniki, bez marek, bez interakcji z lekami, z disclaimerem; opcjonalny, najbardziej ryzykowny prawnie.
- **Pakiet PDF „do druku"** dla osób, które wolą papier (Etsy pokazuje, że taki segment istnieje).

### Metryki testu (300 PLN)
- Ponieważ Purchase może nie wrócić do Mety: mierzyć po stronie strony (ukończenia quizu, kliknięcia „odblokuj", płatności Stripe) i porównać z LPV z Ads Managera.
- Sygnał „warto": CTR reklamy-quizu, % ukończeń quizu, % odbloków płatnych. Progi ustala osobny agent; tu tylko uwaga, że przy ~150–300 kliknięciach 1–3 zakupy to szum, a 0 zakupów przy wysokim ukończeniu quizu = problem oferty/zaufania, nie popytu.

---

## Aneks: lista źródeł (wszystkie widziane jako wyniki wyszukiwania, nie pobrane w całości)

Statystyki: ceo.com.pl (Sen Polaków 2025), nowymarketing.pl (UCE 2024), i.pl (9 mld zł), medexpress.pl, well.pl, wartowiedziec.pl, zdrowie.dziennik.pl, tcz.pl.
Konkurencja: legimi.pl, taniaksiazka.pl, allegro.pl (Łukowska), sklep.dlugowieczni.pl (Szkoła Optymalizacji Snu, subskrypcje), undra.pl (kurs Biohacking), medycynasnu.pl + allegro.pl (Pokonaj bezsenność w 6 krokach), derewiecki.pl + ibuk.pl (Sen, który działa), ebookpoint.pl/pzwl.pl (Karbowski), goodsleeper.pl (cennik, skuteczność), play.google.com (goodsleeper, Kolo), wirtualnemedia.pl/innpoland.pl/mamstartup.pl (Nightly), porannenawyki.pl, galaktyka.com.pl, lubimyczytac.pl/ceneo.pl (Breus), enjoyment.pl, strefaprzemian.pl, ebookpoint.pl (Janecka), support.unimeal.com, etsy.com/pl (dzienniki snu).
Darmowe: kalkulatorsnuonline.pl, omnicalculator.com/pl, plantpur.pl, kalkulatory.biohac.pl, medme.pl, sleepchangers.com, wylecz.to, melatonina.pl (test chronotypu PDF), scribd.com (dziennik snu), CBT-i Coach (Google Play).
VoC: f.kafeteria.pl (3 wątki), wizaz.pl / rozmowy.wizaz.pl (3 wątki), netkobiety.pl, kobietawmiesciekielce.pl, pytania.abczdrowie.pl (6 pytań), znanylekarz.pl (3 pytania), diag.pl, zdrowiepro.com, facebook.com/groups (3 posty sprzedażowe, 1 grupa).
Trend: vogue.pl, hellozdrowie.pl, eska.pl, trojmiasto.pl, papilot.pl, obcas.pl, vva.pl, newslubuski.pl (sleepmaxxing).
Meta: customerlabs.com (2), polaranalytics.com, stape.io, triplewhale.com, digitalposition.com, oursprivacy.com, aixel.io, dailyintelservice.com, community.shopify.com, transparency.meta.com (2), auditsocials.com (2), zappush.com, stackmatix.com, leadsync.me, webfactoryltd.com, adsuploader.com.
Prawo PL (suplementy): gazetaprawna.pl, foodfakty.pl, politykazdrowotna.com (2), przemyslfarmaceutyczny.pl, biotechnologia.pl, medkurier.pl, biznes.newseria.pl, prawniczka.ai.
