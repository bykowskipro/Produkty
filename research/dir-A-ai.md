# Kierunek A — „AI dla nietechnicznych ludzi" (Polska)
**Raport researchu rynkowego · 2026-09-28 · subagent A**

> **Ograniczenia metodyczne (czytać najpierw).** W tej sesji proxy sieciowe blokowało: Google Autocomplete (`suggestqueries.google.com` → 403), Reddit (old/www), YouTube, Facebook (w tym Meta Ad Library) oraz **praktycznie wszystkie domeny .pl i większość zagranicznych przy próbie pobrania strony** (strefakursow.pl, nextskill.pl, udemy.com, helion.pl, eur-lex.europa.eu, gumroad.com, substack.com, parp.gov.pl, zpe.gov.pl, orange.pl, microsoft.com, gemius.com i ~30 innych — wszystkie `EGRESS_BLOCKED`). **Żadna strona nie została pobrana w całości.** Działało wyłącznie wyszukiwanie (snippety/podsumowania wyników), a wspólny limit wyszukiwań sesji (200) wyczerpał się przed ostatnią serią zapytań.
>
> Konsekwencje: (1) każda liczba/cena/cytat poniżej pochodzi ze **snippetu wyników wyszukiwania** i jest oznaczona **[S]**; (2) tam, gdzie snippet nie pozwalał jednoznacznie przypisać zdania do jednego URL, podaję klaster URL-i i oznaczam **[S?]**; (3) autocomplete, liczby wątków na Reddicie, wyświetlenia YouTube, wielkości grup FB i Ad Library = **brak danych**. To nie jest „brak popytu" — to brak dostępu. Zalecam powtórzenie tych czterech pomiarów z maszyny bez blokad (lista zapytań w §2.0).

---

## 1. Podsumowanie (werdykt)

1. Popyt na „AI dla nietechnicznych" w Polsce jest realny i już **skomercjalizowany**: kursy 119–199 zł, pakiety promptów 29–79 zł, szkolenia B2B 690–15 900 zł, a państwo/korporacje rozdają darmowe odpowiedniki (Lekcja:AI dla 11 tys. nauczycieli, Google/SGH ~15 tys. absolwentów, Santander 8 h za darmo) — to jednocześnie dowód popytu i główny problem konkurencyjny.
2. Najsilniejsze dowody bólu i płacenia ma podnisza **nauczyciele (dokumentacja IPET/WOPFU/oceny opisowe + materiały lekcyjne)**: co najmniej 8 płatnych produktów, 2 SaaS-y do IPET, lejki webinarowe znanych twarzy — ale to też najbardziej zatłoczona i „twarzowa" nisza, z sezonowością i ryzykiem RODO (dane uczniów).
3. Najlepiej do **twardych ograniczeń projektu** (telefon, marka bez twarzy, ≤49 zł, impuls, 300 zł na Meta) pasuje koncept **„Lokalny biznes: posty, oferty i odpowiedzi klientom z AI"** — dowody popytu są tu cieńsze (kilka produktów, brak danych o sprzedaży), ale użytkownik faktycznie pracuje z telefonu, płaci kartą firmową i nie potrzebuje autorytetu eksperta.
4. Koncept **„AI w biurze: maile, Excel, notatki"** ma największą populację i najłatwiejszą produkcję, ale najsłabszy, rozmyty ból i najgęstszą darmową konkurencję; kąt „AI Act art. 4" jest B2B, miękki prawnie i (wg jednego źródła [S?]) mógł zostać dodatkowo złagodzony w 2026 — nie budować na nim obietnic.
5. Seniorzy 50+/60+ mają ból („boję się, nie ogarniam") i tanie dotarcie na FB, ale **zero znalezionych dowodów, że płacą online** (płacą UTW 200 zł offline lub dostają za darmo z OPS); anonimowa marka to dla nich wada, nie zaleta.
6. Szukający pracy: silny, konkretny ból („CV pachną plastikiem"), ale cena zakotwiczona przez MakeCV (od 19 zł) i ryzyko klasyfikacji reklam jako „Employment" na Meta.
7. **Top-3 (suma rubryki 1–14):** C „Lokalny biznes z AI" **58/70**, A „Nauczycielski Pomocnik AI" **52/70**, B „AI w biurze bez wstydu" **52/70** (D seniorzy 50, E CV 51).
8. **Werdykt:** kierunek A nadaje się do testu za 300 zł **tylko w wąskim wariancie „narzędziowym"** (generator + trening na telefonie), nigdy jako „kurs o AI". Rekomendacja: testować **C**, z **A** jako wariantem B (ten sam silnik, inna biblioteka promptów i inny landing), pod warunkiem że nazwa produktu nie zawiera „ChatGPT/GPT" i że reklama nie obiecuje zgodności z prawem ani wyników.
9. Największe ryzyko całego kierunku: **darmowa, instytucjonalna konkurencja + zmęczenie „AI-slopem"** (rekruterzy i nauczyciele już rozpoznają generyczne wyniki) — produkt copy-paste bez personalizacji rozwiąże zły problem.
10. Największa luka w danych: brak autocomplete/Reddit/YouTube/Ad Library — przed wydaniem złotówki na reklamę trzeba to uzupełnić (30 min pracy z nieblokowanej sieci).

---

## 2. Dowody popytu

### 2.0 Co należy dopomiar (zablokowane w tej sesji)
- Autocomplete `hl=pl&gl=pl` dla seedów: „chatgpt dla", „chatgpt jak", „ai dla", „kurs ai", „kurs chatgpt", „chatgpt dla nauczycieli", „chatgpt dla seniorów", „chatgpt excel", „chatgpt cv", „chatgpt post na facebooka", „chatgpt oferta", „chatgpt ipet", „chatgpt ocena opisowa", „gotowe prompty", „ai nie ogarniam".
- Reddit r/Polska: „chatgpt praca", „chatgpt nauczyciel", „chatgpt cv", „chatgpt rodzice".
- YouTube PL: wyświetlenia „ChatGPT dla początkujących po polsku", „ChatGPT dla nauczycieli", „AI dla seniorów".
- Meta Ad Library PL: „kurs chatgpt", „prompty", „AI dla nauczycieli", „AI dla firm".

### 2.1 Skala rynku (kontekst)
| Sygnał | Wartość | Źródło |
|---|---|---|
| Adopcja generatywnej AI w PL (15–64 l.) | **31% w I kw. 2026** vs 28,5% w II poł. 2025 (Microsoft AI Economy Institute) [S] | https://news.microsoft.com/source/emea/2026/05/juz-co-trzeci-polak-korzysta-z-generatywnej-ai-nowy-etap-dojrzalosci-rynku-wedlug-raportu-global-ai-diffusion/?lang=pl ; https://www.computerworld.pl/article/100050572/juz-co-trzeci-polak-korzysta-z-generatywnej-ai.html |
| Krytyka tej liczby (co „używa" znaczy) | tytuł: „31% Polaków używa AI. Tylko że to nie znaczy tego, co Microsoft chce żebyś pomyślał" [S] | https://www.komputerwfirmie.org/31-polakow-uzywa-ai-tylko-ze-to-nie-znaczy-tego-co-microsoft-chce-zebys-pomyslal/ |
| Raport Human+AI Institute & CampusAI 2026 | PL na 1. miejscu z 4 rynków (USA, UK, Hiszpania): 63% aktywnych użytkowników; ChatGPT używa 39% [S] | https://blog.osoz.pl/raport-polska-liderem-adaptacji-generatywnej-ai |
| Dzieci | tytuł raportu: „Co trzecie dziecko korzysta z ChatGPT" (2026) [S] | https://rynekinformacji.pl/raport-internet-dzieci-2026/ |
| Zaufanie do AI | 41% Polaków deklaruje zaufanie do AI vs 46% globalnie (KPMG) [S] | https://kpmg.com/pl/pl/wiedza/technologia/sztuczna-inteligencja-w-polsce.html |
| Lęk (starsze badanie, data nieustalona) | „68% Polaków obawia się, że ChatGPT zabierze im pracę; tylko 11% wypróbowało" [S?] | klaster: https://focusonbusiness.eu/pl/wiadomosci/senior-pod-opieka-sztucznej-inteligencji/29024 ; https://mobiletrends.pl/czy-ai-moze-zaopiekowac-sie-osobami-starszymi-senior-pod-opieka-sztucznej-inteligencji/ |
| Allegro, kategoria Książki, fraza „chatgpt" | **1 271 ofert** po polsku [S] | https://allegro.pl/kategoria/ksiazki-7?string=chatgpt |
| Grupa FB „ChatGPT Polska - PROMPTY, PORADY, TRIKI, ..." | istnieje; liczba członków: **brak danych** | https://www.facebook.com/groups/6214467021932639/ |

Wniosek krytyczny: ~1/3 populacji „coś używa", ale 2/3 nie — rynek „nietechnicznych" jest duży; jednak liczby adopcji rosną szybko, więc produkt „od zera" starzeje się w miesiącach, nie latach.

### 2.2 Sygnały per podnisza

| Podnisza | Sygnały popytu (z URL) | Ocena siły |
|---|---|---|
| (1) Biuro | Legalne/organizacyjne spory o ChatGPT w pracy: „Pierwsze firmy w Polsce zakażą pracownikom używać ChatGPT" https://www.parkiet.com/firmy/art38363131-pierwsze-firmy-w-polsce-zakaza-pracownikom-uzywac-chatgpt ; „Użycie AI w pracy może grozić dyscyplinarką, ale rzadko" https://www.rp.pl/praca-emerytury-i-renty/art45097071-odpowiedzialnosc-pracownika-za-uzycie-ai-pomimo-zakazu ; „ChatGPT w biurze? Jak legalnie używać AI w pracy" https://www.praca.pl/poradniki/rynek-pracy/chatgpt-w-biurze-jak-legalnie-uzywac-ai-w-pracy_pr-8759.html ; „AI Act w firmie od 2 sierpnia 2026 r. Jak legalnie korzystać z ChatGPT…" https://www.kancelariaepoque.pl/post/ai-act-w-firmie-od-2-sierpnia-2026-r-jak-legalnie-korzysta%C4%87-z-chatgpt-i-innych-narz%C4%99dzi-ai . Gęsta oferta B2B (Comarch, Sii, NT Group, ADN, HumanSkills, Cognity — §3). Pakiet promptów „do maili, ofert, postów i codziennych spraw" za 79 zł https://chatgpt40.pl/ | Średnia: dużo podaży, ból rozmyty |
| (2) Nauczyciele | Państwowy program Lekcja:AI (11 tys. nauczycieli, §2.3); ≥8 płatnych kursów/webinarów (§3); 2 SaaS-y do IPET/WOPFU: „IPET i WOPFU w 10 minut" https://ipetonline.pl/ , https://ipetgenerator.pl/ ; darmowe lejki webinarowe z datami 29.09.2026 i 12.10.2026 (§5); artykuły-poradniki: https://aktywnynauczyciel.pl/chatgpt-dla-nauczycieli-prompty , https://magisterna5.pl/jak-korzystac-z-chatgpt-w-pracy-nauczyciela/ , https://www.instytut-educare.pl/chat-gpt-pomoc-dla-wychowawcy/ ; media: „ChatGPT jak diabeł. Uczniów już skusił, teraz idzie po nauczycieli" https://spidersweb.pl/2025/11/openai-chatgpt-dla-nauczycieli.html | **Najsilniejsza** (płatne produkty + instytucje + narzędzia) |
| (3) 45+/50+/60+ | Oferty offline: UTW Erga Omnes Poznań — 4 spotkania × 90 min, **200 zł** [S] https://centrumis.pl/kurs-sztucznej-inteligencji-od-podstaw-dla-osob-60/ ; bezpłatny kurs 55+ OPS Wola (4 spotkania 9:00–12:30) [S] https://ops-wola.waw.pl/wp-content/uploads/2026/04/Sztuczna-inteligencja.pdf ; Multicentrum Piaseczno 60+ https://piaseczno.eu/kurs-komputerowy-dla-osob-60-sztuczna-inteligencja/ ; UTW AWF „Sztuczna inteligencja krok po kroku" (05.2026) https://utwawf.pl/2026/05/05/sztuczna-inteligencja-dla-seniorow/ ; BUR PARP „AI bez tajemnic - praktyczny kurs dla Seniorów" https://uslugirozwojowe.parp.gov.pl/wyszukiwarka/uslugi/podglad?id=3364741 ; treści: „Jak zacząć korzystać ze sztucznej inteligencji po 60-tce?" (31.08.2026) https://glosseniora.pl/2026/08/31/jak-zaczac-korzystac-ze-sztucznej-inteligencji-po-60-tce/ , „Czym jest czat GPT?" https://tojasenior.pl/czym-jest-czat-gpt/ ; inicjatywa OpenAI dla seniorów https://promptowy.com/openai-ai-dla-seniorow-codzienne-zastosowania/ | Średnia: ból jest, **płatny online = brak danych** |
| (4) Rodzice | „AI EDU – Kurs sztucznej inteligencji dla rodziców" (wirtualny korepetytor) https://ai-edu.pro/ ; „Akademia AI rodzica" (warsztaty, Olsztyn) https://www.efektywna-nauka.pl/akademia-ai-rodzica/ ; materiały OpenAI dla nastolatków i rodziców https://openai.com/index/ai-literacy-resources-for-teens-and-parents/ ; debata „prace domowe": https://edun.pl/aktualnosci/chatgpt-ai-pisze-wypracowania-i-prace-domowe/ , https://epedagogika.pl/top-tematy/sztuczna-inteligencja-odrabia-prace-domowe-za-uczniow-jak-na-chat-gpt-powinien-reagowac-nauczyciel-6661.html | Słaba–średnia: 2 produkty, ceny brak danych |
| (5) Mikrofirmy / usługi lokalne | Ebook „Nowoczesny Salon z ChatGPT – Jak Zdobywać Więcej Klientów…" (J. Woźniak) https://www.empik.com/nowoczesny-salon-z-chatgpt-jak-zdobywac-wiecej-klientow-z-pomoca-sztucznej-inteligencji-praktyczn-wozniak-jacek,p1673643299,ebooki-i-mp3-p ; „PostyDlaSalonu.pl — Gotowe posty dla Twojego salonu" (AI, 12 postów w 4 kategoriach, darmowe) [S] https://postydlasalonu.pl/ ; prompt „Gotowe posty Facebook" https://prompti.pl/prompty-sklep/gotowe-posty-facebook-chatgpt/ ; „20 promptów dla sklepu internetowego" https://wenet.pl/blog/chat-gpt-20-promptow-dla-sklepu-internetowego/ ; kursy: BUZZcenter 199 zł https://buzzcenter.pl/chatgpt-w-twojej-firmie/ , MakeAI dla małych firm https://www.makeai.pl/dla-malych-firm , CampusAI LP mikroprzedsiębiorca https://lp.campusai.pl/ ; Google/SGH: cel „10 000 firm" https://gazeta.sgh.waw.pl/wspolpraca-z-otoczeniem/startuje-program-umiejetnosci-jutra-ai-google-i-sgh-wyszkola-10-000-firm-z | Średnia: produkty istnieją, **wolumen sprzedaży brak danych** |
| (6) Szukający pracy | Narzędzie „MakeCV — CV, list, symulator rozmowy… jednorazowa płatność od 19,00 zł, bez subskrypcji" [S] https://makecv.pl/ ; poradniki z promptami: https://coachingirekrutacja.pl/jak-napisac-cv-z-pomoca-chatgpt-by-nie-zostalo-odrzucone-przez-rekrutera-gotowe-prompty/ , https://generujcv.com/blog/prompt-chatgpt-do-cv , https://www.livecareer.pl/cv/chatgpt-vs-kreator-cv , https://interviewme.pl/blog/cv-ai , https://mamopracuj.pl/jak-wykorzystac-ai-przy-szukaniu-pracy-w-2026-roku/ , https://blog.europa.jobs/pl/art-cv-z-pomoca-ai-chatgpt-jak-napisac-skuteczne-cv-krok-po-kroku-najczestsze-bledy/ | Średnia–silna ból; cena zakotwiczona nisko |
| (7) Inne | Studenci: ebook Helion „ChatGPT i AI dla Studentów…" (E. Rozum) https://helion.pl/ksiazki/chatgpt-i-ai-dla-studentow-poradnik-jak-sztuczna-inteligencja-moze-ci-pomoc-w-nauce-i-pisaniu-prac-emil-rozum,s_01tw.htm ; HR/rekruterzy: https://www.ifirma.pl/blog/marketing/ai-w-biznesie/prompty-do-chatgpt-dla-hr-i-rekrutacji/ , https://digitalx.pl/prompty-ai-dla-hr-i-rekrutacji/ ; instytucje kultury (EPALE) https://epale.ec.europa.eu/pl/content/szkolenie-jak-wykorzystac-sztuczna-inteligencje-i-chatgpt-w-instytucjach-kultury . Urzędnicy, księgowe, pielęgniarki: **brak danych** (nie znaleziono produktów ani wątków w dostępnych wynikach) | Słaba/brak |

### 2.3 Programy rządowe / NGO / korporacyjne (darmowa konkurencja i zarazem walidacja)
| Program | Fakty [S] | URL |
|---|---|---|
| **Lekcja:AI** (Fundacja Orange + partnerzy, środki UE; na zpe.gov.pl) | „obejmie 11 000 nauczycieli", 3 poziomy, głównie online; „ponad 2 000 osób już uczestniczy"; horyzont: „do czerwca 2027" (zpe/fundacja) vs „przez wrzesień 2027" (biuro prasowe) — rozbieżność źródeł | https://zpe.gov.pl/lekcja-ai ; https://fundacja.orange.pl/aktualnosci/artykul/bezplatne-szkolenia-o-ai-dla-nauczycieli-zapisz-sie ; https://biuroprasowe.orange.pl/informacje-prasowe/bezplatne-szkolenia-o-ai-dla-11-tysiecy-nauczycieli-ruszyly-zapisy/ ; https://lekcjaai.pl/ |
| **Umiejętności Jutra: AI** (Google + SGH) | I edycja zakończona 04.2025: „prawie 15 000 uczestników"; 25+ h wideo i webinarów; certyfikat Google+SGH; voucher Gemini Pro na 3 mies. (~300 zł); edycje 2.0 (nabór 07.2025) i 3.0 | https://blog.google/intl/pl-pl/nowosci-firmie/programy-inicjatywy/rusza-druga-edycja-programu-umiejetnosci-jutra-ai-ponownie-przeszkolimy-polskie-msp-ze-sztucznej-inteligencji/ ; https://rsvp.withgoogle.com/events/umiejetnoscijutra ; https://pg.edu.pl/biuro-karier/2025-07/ruszyl-nabor-do-programu-umiejetnosci-jutra-ai-20-bezplatnego-kursu-google-z-zakresu-sztucznej-inteligencji ; https://aioai.pl/umiejetnosci-jutra-3-0-google-zapisy-szkolenia-ai/ ; opinia uczestnika: https://strivelab.pl/blog/umiejetnosci-jutra-ai-google-opinia-uczestnika-czy-warto/ |
| **Santander Open Academy — „Podstawy ChatGPT"** | bezpłatny, 8 godzin dydaktycznych | https://app.santanderopenacademy.com/pl/course/chatgpt ; https://www.santanderconsumer.pl/blog/bank-mozliwosci/podstawy-chatgpt-bezplatny-kurs-online-ktory-moze-zmienic-twoja-codziennosc |
| **ChatGPT for Teachers (OpenAI)** | artykuł Spider's Web 11.2025 (szczegóły dostępności w PL: brak danych) | https://spidersweb.pl/2025/11/openai-chatgpt-dla-nauczycieli.html |
| **IBE — materiał o ChatGPT dla nauczycieli** | darmowy materiał instytucji państwowej | https://ibe.edu.pl/index.php/pl/aktualnosci/1987-chat-gpt-material-dla-nauczycieli |
| **Latarnicy Polski Cyfrowej / szkolenia 60+ (PCPR, gminy)** | bezpłatne szkolenia cyfrowe seniorów (AI jako moduł) | https://pcpr.powiat-lubin.pl/2026/07/bezplatne-szkolenie-dla-seniorow-60/ ; https://pultusk.news/aktualnosci/bezplatne-szkolenie-cyfrowe-dla-seniorow-60/ |
| **BUR PARP** (dofinansowane) | „Kurs - Chat GPT i AI w praktyce"; „AI bez tajemnic… dla Seniorów"; ceny: brak danych | https://uslugirozwojowe.parp.gov.pl/wyszukiwarka/uslugi/podglad?id=3536823 ; https://uslugirozwojowe.parp.gov.pl/wyszukiwarka/uslugi/podglad?id=3364741 |
| **ORE „AI dla nauczycieli"** | nie znaleziono strony programu w dostępnych wynikach — **brak danych** (znaleziono Lekcja:AI na zpe.gov.pl jako państwowy odpowiednik) | — |

---

## 3. Konkurencja (produkty płatne)

Wszystkie ceny [S] = ze snippetów; „b.d." = brak danych w snippetach; strony nie były pobrane.

| Nazwa | URL | Cena | Format | Co zawiera | Słabości / uwagi |
|---|---|---|---|---|---|
| Kurs ChatGPT dla początkujących (strefakursow.pl) | https://strefakursow.pl/kursy/rozwoj_osobisty/kurs_chatgpt_dla_poczatkujacych.html | **149 zł** | wideo, 28 wykładów, poziom podstawowy | podstawy ChatGPT | ocena 4.9/5 wg snippetu; desktopowe wideo, nie interaktywne |
| ChatGPT dla początkujących (Nextskill) | https://nextskill.pl/kursy/kurs-chatgpt-dla-poczatkujacych | **119 zł** (promo) | wideo + certyfikat | „od zera… niezależnie od wieku"; bonus: darmowy ebook z promptami | marka-platforma (bez twarzy w snippecie) — dowód, że format „brand" działa w sprzedaży |
| Chat GPT od zera: kompletny kurs dla początkujących (Udemy PL) | https://www.udemy.com/course/chat-gpt-od-zera-kompletny-kurs-dla-poczatkujacych/ | b.d. | wideo | b.d. | Udemy = cena promocyjna zwykle 40–80 zł; presja cenowa |
| ChatGPT - od Zera do GPT Mastera (eduj.pl) | https://eduj.pl/produkt/chatgpt_od_zera_do_gpt_mastera | b.d. | online | b.d. | nazwa narusza wytyczne OpenAI dot. „GPT" (§8) |
| ChatGPT w praktyce — 50 gotowych promptów (chatgpt40.pl) | https://chatgpt40.pl/ | **79 zł** | PDF 55 stron | „50 gotowych promptów po polsku do maili, ofert, postów i codziennych spraw"; 14-dniowa gwarancja | statyczny PDF; anonimowa marka (kto stoi za nią: b.d.) |
| Gotowe Prompty (gotoweprompty.pl) | https://gotoweprompty.pl/ | **49 zł** / 29 zł dla zalogowanych | ebooki/pakiety | 30 promptów (ChatGPT/Claude/Gemini); 100 promptów graficznych | model cenowy 29–49 zł = **bezpośredni benchmark dla nas** |
| PROmptBOX (promptydochatgpt.pl) | https://promptydochatgpt.pl/ | b.d. | pakiety | „50 gotowych, edytowalnych scenariuszy" pod zawód | domena nie rozwiązywała się (EAI_AGAIN) — możliwe, że projekt martwy |
| Prompty AI po polsku — 33 szablony (SmartNetStudio) | https://smartnetstudio.pl/prompty-ai.html | b.d. | szablony | 33 szablony | — |
| Prompti.pl (marketplace) | https://prompti.pl/ | b.d. | marketplace | „150+ promptów", m.in. „Gotowe posty Facebook" | marketplace = brak kuracji dla początkującego |
| Skuteczne PROmptowanie + Generator Promptów (BUZZcenter) | https://buzzcenter.pl/chatgpt-w-twojej-firmie/ | **199 zł** brutto (cena premierowa) | kurs + generator | dla MŚP | ciekawe: **generator = element interaktywny**, ale za 4× naszą cenę |
| MakeAI — kurs dla małych firm | https://www.makeai.pl/dla-malych-firm | b.d. | kurs no-code (Make + ChatGPT) | 10 szablonów automatyzacji (FAQ, posty) | wymaga Make = za techniczne dla naszej persony |
| CampusAI — LP Mikroprzedsiębiorca | https://lp.campusai.pl/ | b.d. (subskrypcja) | platforma, „AI Gym" | dostęp do ChatGPT/MultiBota/DALL-E | duży gracz, VC; nie konkuruje o 49 zł |
| Szkoła AI | https://aiexpert-academy.pl/blog/najlepsze-kursy-ai-polska-2026.html (ranking) | **997 zł** | online | praktyczne narzędzia AI | segment premium |
| Materiały dydaktyczne z AI (VITA) | https://vita.edu.pl/courses/materialy-dydaktyczne-ai | b.d. | kurs online | karty pracy, prezentacje, quizy, scenariusze (ChatGPT + Canva) | — |
| Cyfrowy warsztat nauczyciela (EduAkcja) | https://www.edu-akcja.pl/sztuczna-inteligencja/ | b.d. | szkolenia online | instrukcje, zadania testowe, scenariusze | — |
| Kurs AI dla nauczycieli (kurswychowawcy.com) | https://www.kurswychowawcy.com/kurs-ai-dla-nauczycieli/ | b.d. | kurs | „od pomysłu przez materiały do quizów i scenariusza", testy + klucze, zadania odporne na AI | — |
| ChatGPT dla nauczycieli ONLINE (EduLabor) | https://www.edulabor.pl/produkt/chatgpt-dla-nauczycieli/ | b.d. | szkolenie online | prompty, scenariusze, materiały | — |
| AI Sztuczna inteligencja w edukacji (IODN) | https://iodn.pl/produkt/ai-sztuczna-inteligencja-w-edukacji/ | b.d. | szkolenie | b.d. | — |
| WOPFU i IPET z chat GPT (AI Progres) | https://kursy.aiprogres.net/next/public/catalog/product/dokumenty-1 | b.d. | szkolenie | dokumentacja z ChatGPT | **dokładnie nasz ból (dokumentacja)** |
| Webinar 03: AI pomaga, nauczyciel decyduje — IPET, WOPFU i opinia do PPP (EduZabawy) | https://eduzabawy.com/webinary/webinar-03-dokumentacja-ipet-wopfu-i-opinia-do-ppp | b.d. | webinar | dokumentacja z AI | hasło „AI pomaga, nauczyciel decyduje" = dobre pozycjonowanie |
| IPETonline.pl | https://ipetonline.pl/ | b.d. | SaaS | „IPET i WOPFU w 10 minut" | SaaS-konkurent dla konceptu A; „10 minut" już zajęte jako claim |
| IPET generator | https://ipetgenerator.pl/ | b.d. | generator | IPET/WOPFU z orzeczenia | j.w. |
| Ebook „ChatGPT i AI dla nauczycieli" (Emil Rozum, Helion) | https://helion.pl/ksiazki/chatgpt-i-ai-dla-nauczycieli-sztuczna-inteligencja-w-edukacji-emil-rozum,s_01wb.htm | b.d. | ebook | b.d. | autor bez twarzy; seria oznaczona jako „stworzona z pomocą AI" (§8, §14) |
| Ebook „Jak korzystać z ChatGPT: Kompletny przewodnik krok po kroku" (P. Gmerek, Helion) | https://helion.pl/ksiazki/jak-korzystac-z-chatgpt-kompletny-przewodnik-krok-po-kroku-przemyslaw-gmerek,s_0256.htm | b.d. | ebook | b.d. | — |
| „Komunikacja z AI. Dla początkujących" (K. Majzel-Pośpiech) | https://ebookpoint.pl/ksiazki/komunikacja-z-ai-dla-poczatkujacych-katarzyna-majzel-pospiech,komzai.htm | b.d. | książka/ebook | rozdział o promptach | — |
| „Nowoczesny Salon z ChatGPT" (J. Woźniak, Empik) | https://www.empik.com/nowoczesny-salon-z-chatgpt-jak-zdobywac-wiecej-klientow-z-pomoca-sztucznej-inteligencji-praktyczn-wozniak-jacek,p1673643299,ebooki-i-mp3-p | b.d. | ebook PDF | prompty, strategie dla fryzjerów/beauty | **dowód niszy „lokalny biznes"**, ale PDF |
| MakeCV | https://makecv.pl/ | **od 19 zł** jednorazowo | web-app | CV, list, symulator rozmowy, darmowa ocena CV | **kotwica cenowa** dla podniszy (6) |
| AI EDU — kurs dla rodziców | https://ai-edu.pro/ | b.d. | kurs | „wirtualny korepetytor" | — |
| Technologie jutra dla każdego: Gen AI od podstaw (ALK) | https://www.kozminski.edu.pl/pl/oferta-edukacyjna/kursy-i-szkolenia/technologie-jutra-dla-kazdego-gen-ai-od-podstaw | b.d. | 100% online (e-learning) | ChatGPT, Gemini, Copilot | marka uczelni = zaufanie bez twarzy |
| B2B biuro: Comarch / Sii / NT Group / ADN / HumanSkills / Cognity / j-systems / Expose | https://www.comarch.pl/szkolenia/ai/ai-w-codziennej-pracy/ai-i-copilot-w-codziennej-pracy/ ; https://www.ntg.pl/szkolenia-ai/ ; https://www.adnakademia.pl/szkolenia/szkolenie-onlineai-w-pracy-biurowej/ ; https://www.humanskills.pl/szkolenia_otwarte/ai-w-pracy-biurowej/ ; https://www.cognity.pl/szkolenia-sztuczna-inteligencja | b.d. (segment setki–tysiące zł/os.) | warsztaty, certyfikaty; ADN: 6 mies. dostępu do platformy | maile, raporty, prezentacje, Copilot | nie konkurują o B2C 49 zł; **potwierdzają listę zadań** (maile, raporty, prezentacje) |
| Szkolenia „AI Act / AI literacy": AY Prime | https://ayprime.pl/ai_act/ | **690 zł netto/os.** | 4 h online, 7 tematów, certyfikat | zgodność z art. 4 | segment compliance |
| dr Malinowski — AI literacy zgodne z AI Act | https://www.drmalinowski.edu.pl/pages/8392-szkolenie-ai-literacy-zgodne-z-ai-act | **9 900 zł netto** (6 h, do 20 os.) / 15 900 zł (12 h) | stacjonarne/online | — | — |
| dokodu.it — AI Act i RODO | https://dokodu.it/szkolenia/ai-act-rodo-compliance | **od 7 999 zł netto** (do 12 os.) | warsztat | praktyk AI + radczyni prawna | — |
| Doradcy365 — e-szkolenie „AI Literacy" | https://doradcy365.pl/produkt/e-szkolenie-ai-literacy/ | b.d.; certyfikaty do 20 os., kolejne 15 zł netto/os. | e-learning | — | **model „pakiet dla zespołu + certyfikat imienny"** — do skopiowania jako upsell |
| Berlitz — AI Literacy & Compliance | https://www.berlitz.com/pl-pl/dla-firm/szkolenie-eu-ai-act | b.d. | platforma | — | — |

**Kto sprzedaje edukację AI w PL (mapa twarz vs marka):**
- **Twarze:** Klaudia Rogalska (Akademia nauczyciela online) https://klaudiarogalska.pl/webinary/ ; Anna Popławska (edunation) https://webinar.edunation.com.pl/ ; Beata Zalewa (zalnet) https://zalnet.pl/darmowy-webinar-ai/ ; Beata Zarach (UTW AWF); Jacek Woźniak (ebook salon); Przemysław Gmerek, Katarzyna Majzel-Pośpiech (Helion); Artur Jabłoński (blog) https://arturjablonski.com/blog/personalizacja-chatgpt-sprawdzone-sposoby/ .
- **Marki/instytucje bez twarzy w ofercie:** strefakursow, Nextskill, eduj.pl, ADN, Comarch, Sii, NT Group, Cognity, ALK, Santander, Google/SGH, CampusAI, MakeAI, BUZZcenter, MakeCV, IPETonline, IPET generator, PostyDlaSalonu, prompt-sklepy (chatgpt40.pl, gotoweprompty.pl, prompti.pl, worldofprompts.pl https://worldofprompts.pl/ , prompty.pl https://prompty.pl/ , promptgenerator.pl https://promptgenerator.pl/blog/chatgpt-prompts/ ), portale-content (promptowy.com, aioai.pl, aiprzewodnik.pl, edukier.pl https://edukier.pl/chatgpt/ ).
- **Pseudonim wprost:** „Emil Rozum" (Helion) — kilka tytułów w różnych niszach (nauczyciele, studenci, Python, prepping), oznaczonych jako publikacje „stworzone z pomocą AI" [S] https://helion.pl/autorzy/emil-rozum ; https://virtualo.pl/autor/emil-rozum-a147319/ ; https://lubimyczytac.pl/autor/260905/emil-rozum . Czy się sprzedaje: **brak danych** (oceny/recenzje niepobrane).
- Wniosek: w segmencie **narzędzi i pakietów** (prompty, generatory, SaaS) sprzedaż bez twarzy jest normą; w segmencie **kursów dla nauczycieli** dominują twarze i instytucje. Skuteczność (przychody) anonimowych sklepów z promptami: **brak danych** — nie ma dowodu, że zarabiają, jest tylko dowód, że istnieją.

---

## 4. Darmowe alternatywy — i dlaczego ktoś mimo to zapłaci (albo nie)

| Darmowa alternatywa | URL | Czy zabija nasz produkt? |
|---|---|---|
| Santander „Podstawy ChatGPT" (8 h) | https://app.santanderopenacademy.com/pl/course/chatgpt | Zabija „kurs o ChatGPT". Nie zabija narzędzia „zrób konkretną rzecz w 60 s". |
| Google/SGH Umiejętności Jutra: AI (25+ h, certyfikat, voucher Gemini) | https://rsvp.withgoogle.com/events/umiejetnoscijutra | Zabija każdy generyczny kurs dla MŚP. Jest długi (5 tygodni) — nasza przewaga: 10 minut. |
| Lekcja:AI (11 tys. nauczycieli) | https://zpe.gov.pl/lekcja-ai | Zabija „kurs AI dla nauczycieli". Nie daje gotowej biblioteki promptów pod IPET/ocenę opisową na telefonie (założenie — program niepobrany). |
| nauka-online.pl — 25 filmów bez rejestracji | https://nauka-online.pl/576-darmowy-kurs-chatgpt-dla-poczatkujacych.html | j.w. — kurs. |
| „ChatGPT dla nauczyciela - 50 promptów, które oszczędzają czas" | https://aktywnynauczyciel.pl/chatgpt-dla-nauczycieli-prompty | Bezpośrednio konkuruje z „biblioteką promptów". Lista na blogu ≠ narzędzie z polami do wypełnienia. |
| „Narzędzia AI dla nauczyciela: 12 aplikacji i gotowe prompty po polsku" | https://promptowy.com/narzedzia-ai-dla-nauczyciela/ | j.w. |
| Darmowe prompty (krupinskiai.pl, seogroup 138 komend, widoczni 90 przykładów) | https://krupinskiai.pl/prompty/ ; https://www.seogroup.pl/najlepsze-prompty-chatgpt/ ; https://widoczni.com/en/blog/how-to-write-effective-chatgpt-prompts/ | Zalew darmowych list = nasz produkt nie może być „listą". |
| PostyDlaSalonu.pl (12 postów za darmo) | https://postydlasalonu.pl/ | Dokładnie nisza C — darmowy lead magnet konkurenta; trzeba dać więcej niż 12 postów: odpowiedzi klientom, oferty, opinie. |
| Darmowe webinary nauczycielskie (Rogalska, edunation, eTwinning, aktywnynauczyciel) | https://webinar.klaudiarogalska.pl/ ; https://webinar.edunation.com.pl/ ; https://etwinning.pl/aktualnosci/webinarium-sztuczna-inteligencja-w-szkole-chatboty | To lejki do płatnych produktów — dowód, że nauczyciele kupują po darmowym wejściu. |
| MakeCV darmowa ocena CV | https://makecv.pl/ | Dla (6): darmowe wejście + 19 zł = nasz sufit cenowy. |
| ChatGPT/Gemini same w sobie (darmowe plany) | https://promptowy.com/chatgpt-przewodnik/ | Największy „konkurent": użytkownik może po prostu spytać ChatGPT „napisz mi post". Przewaga produktu musi być w **strukturze zadania i gotowych polach**, nie w wiedzy. |

**Dlaczego ktoś zapłaci 29–49 zł mimo darmowych opcji (hipotezy oparte na powyższym):**
1. **Czas, nie wiedza.** Darmowe = 8–25 godzin kursu; płatne narzędzie = „wynik w 60 sekund na telefonie". Snippety sprzedawców już tak mówią („w 10 minut" — IPETonline; „w minutach" — ebook salonowy).
2. **Kuracja i konkret.** 138 promptów na blogu paraliżuje; 12 zadań „dla fryzjerki" nie.
3. **Wstyd i prywatność.** Nauczyciel/pracownik nie chce iść na szkolenie „dla nieogarniętych"; kupuje anonimowo za 39 zł.
4. **Gwarancja i 14 dni** (chatgpt40.pl stosuje) obniża próg.

**Dlaczego NIE zapłaci:**
1. Bo już „ChatGPT mi wystarczy" — tytuł tekstu: „Dlaczego `ChatGPT mi wystarczy` to utracone możliwości" https://praktyczneai.substack.com/p/dlaczego-chatgpt-mi-wystarczy-to (treść niepobrana).
2. Bo pracodawca/szkoła daje szkolenie (Lekcja:AI, Comarch, ADN).
3. Bo boi się oszustwa: anonimowa strona + Stripe + „AI" = profil scamu w oczach 60+.
4. Bo wyniki „pachną plastikiem" (cytaty §6) — jeśli produkt nie uczy personalizacji, użytkownik po tygodniu wraca do darmowego czatu.

---

## 5. Reklamy

- **Meta Ad Library:** `www.facebook.com` zablokowany przez proxy → **brak dostępu**. Nie widziałem żadnej reklamy.
- **Pośrednie ślady płatnej akwizycji (lejki webinarowe — typowo zasilane reklamami Meta):**
  - „10 pomysłów na karty pracy z AI, bezpłatny webinar" — „Bezpłatny webinar na żywo, 12 października 2026, godz. 20:00" [S] https://webinar.klaudiarogalska.pl/
  - edunation: „Zapisz się bezpłatnie na webinar edunation z Anną Popławską: 10 aktywności konwersacyjnych, gotowe prompty do ChatGPT i karty pracy. 29.09.2026, godz. 21:00, spotkanie online." [S] https://webinar.edunation.com.pl/
  - Aktywny Nauczyciel (wideo na FB): „Darmowe webinary dla nauczycieli. Zapisz się" [S] https://www.facebook.com/aktywnynauczyciel/videos/darmowe-webinary-dla-nauczycieli-zapisz-si%C4%99-httpsaktywnynauczycielpldarmowe-webi/1308774923700798/
  - zalnet.pl „Darmowy webinar AI - od Machine Learning do ChatGPT" (17.08.2026) [S] https://zalnet.pl/darmowy-webinar-ai/
- **Wzorce ofert widoczne w snippetach:** cena promocyjna (Nextskill 119 zł), gwarancja 14 dni (chatgpt40.pl), rabat „dla zalogowanych" 41% (gotoweprompty.pl), certyfikat (Nextskill, AY Prime), bonus-ebook z promptami (Nextskill).
- **Wniosek:** w niszy nauczycielskiej funkcjonuje klasyczny lejek „darmowy webinar wieczorem (20:00–21:00) → płatny produkt", prowadzony przez **osoby z imieniem i nazwiskiem**. Brak dowodów (w tej sesji) na reklamy anonimowych sklepów z promptami. Kto, ile i jak długo reklamuje: **brak danych** — do sprawdzenia w Ad Library.

---

## 6. Voice of Customer

Legenda typów: **[U]** wypowiedź użytkownika/forum, **[E]** ekspert/rekruter/nauczyciel cytowany w artykule, **[M]** tytuł/nagłówek medialny (verbatim), **[SP]** język sprzedawcy (verbatim copy). Wszystkie cytaty pochodzą ze snippetów wyszukiwarki [S]; przy [S?] przypisanie do konkretnego URL w klastrze jest niepewne.

### 6.1 „Wszyscy piszą tak samo" — lęk przed generycznością (szukający pracy, ale dotyczy każdej podniszy)
1. [E][S?] „Doświadczony rekruter widzi takie CV na kilometr. Są poprawne gramatycznie, ładnie sformatowane, ale są martwe i pachną plastikiem. Brakuje w nich człowieka." — klaster: https://czat.ai/blog/chatgpt-cv-pisanie ; https://www.rozwojkariery.pl/post/jak-napisac-cv-z-ai
2. [E][S?] „Rekruterzy zaczynają łapać się za głowę, bo wszystkie CV zaczynają brzmieć identycznie." — klaster j.w. + https://grupaprogres.pl/jak-pisac-cv-z-ai-zeby-zostac-zauwazonym-przez-rekrutera/
3. [E][S?] „Problem w tym, że przy standardowych promptach wszyscy dostają podobne odpowiedzi." — klaster j.w.
4. [E][S?] „Rekruter przez cały dzień czyta CV zaczynające się od podobnych fraz." — klaster j.w.
5. [E][S?] „Coraz więcej rekruterów jest w stanie odróżnić dokument napisany przez AI od tego stworzonego samodzielnie. Wynika to z pewnych charakterystycznych cech, takich jak powtarzalność fraz, zbyt formalny język oraz brak niuansów osobowościowych." — klaster: https://interviewme.pl/blog/cv-ai ; https://www.livecareer.pl/cv/chatgpt-vs-kreator-cv
6. [E][S?] „CV napisane przez ChatGPT może być perfekcyjne pod względem formy, ale pozbawione ducha – tego czegoś, co sprawia, że rekruter zapamięta twoją aplikację." — klaster j.w.
7. [E][S?] „Coraz więcej kandydatów wpada na ten sam pomysł, a rekruterzy to dostrzegają, zamiast przyspieszyć sobie proces rekrutacji, możesz odpaść w przedbiegach." — klaster j.w.

→ Słowa-klucze: *pachnie plastikiem, martwe, identyczne, brakuje człowieka, odpaść w przedbiegach*. Implikacja produktowa: sprzedawać **„AI, po którym nie widać AI"**, nie „gotowe prompty".

### 6.2 Nauczyciele — czas, dokumentacja i „żeby nikt nie poznał"
8. [SP] „Dziesięć kart pracy powstaje na żywo, w ChatGPT, Gemini, Claude i Canvie. Wizualne, drukowalne, takie, po których nikt nie pozna, że pomagała Ci sztuczna inteligencja." — https://webinar.klaudiarogalska.pl/
9. [SP] „10 aktywności konwersacyjnych, gotowe prompty do ChatGPT i karty pracy." — https://webinar.edunation.com.pl/
10. [SP] „ChatGPT dla nauczyciela - 50 promptów, które oszczędzają czas" (tytuł) — https://aktywnynauczyciel.pl/chatgpt-dla-nauczycieli-prompty
11. [SP] „IPET i WOPFU w 10 minut" (tytuł SaaS) — https://ipetonline.pl/
12. [SP] „Webinar 03: AI pomaga, nauczyciel decyduje — IPET, WOPFU i opinia do PPP" (tytuł) — https://eduzabawy.com/webinary/webinar-03-dokumentacja-ipet-wopfu-i-opinia-do-ppp
13. [SP] „Przykładowa ocena opisowa klasa 3 – gotowe przykłady i zwroty 2026 [Nauczyciele kopiują te sformułowania]" (tytuł) — https://smart-sens.org/2026/05/08/przykladowa-ocena-opisowa-klasa-3-gotowe-przyklady-i-zwroty-2026-nauczyciele-kopiuja-te-sformulowania/
14. [M] „Jak ChatGPT zmienił szkołę i dlaczego nauczyciele wciąż się tego boją?" — https://technostrefa.com/chatgpt-polska-szkola-nauczyciele/
15. [M] „ChatGPT jak diabeł. Uczniów już skusił, teraz idzie po nauczycieli" — https://spidersweb.pl/2025/11/openai-chatgpt-dla-nauczycieli.html
16. [M] „ChatGPT odrabia lekcje za uczniów, pisze magisterki, zwodzi nauczycieli. Sztuczna inteligencja wykończy szkołę?" — https://www.polityka.pl/tygodnikpolityka/spoleczenstwo/2201332,1,chatgpt-odrabia-lekcje-pisze-magisterki-zwodzi-nauczycieli-wykonczy-szkole.read
17. [S?] liczby ze snippetów (parafraza, nie cytat): „nauczyciele używający AI co najmniej raz w tygodniu szacują oszczędność ok. sześciu godzin tygodniowo" (prawdopodobnie badanie amerykańskie cytowane w PL) — https://steamabc.edu.pl/jak-chatgpt-i-inne-narzedzia-ai-zmieniaja-zawod-nauczyciela/ ; „przygotowanie jednego IPET zajmuje średnio 2–3 godziny" — klaster https://ipetonline.pl/ ; https://edumaster.pl/wiedza/jak-poprawnie-napisac-wopfu-praktyczny-przewodnik-dla-nauczyciela

→ Słowa-klucze: *oszczędzają czas, w 10 minut, gotowe, drukowalne, nikt nie pozna, AI pomaga – nauczyciel decyduje, kopiują te sformułowania*. Moment zakupu (hipoteza z dat lejków): **wieczór 20:00–21:00 w dni robocze**; szczyty: koniec września (IPET/WOPFU), styczeń i czerwiec (oceny opisowe, sprawozdania).

### 6.3 Biuro — zakazy, wstyd, „czy mi wolno"
18. [M] „Pierwsze firmy w Polsce zakażą pracownikom używać ChatGPT" — https://www.parkiet.com/firmy/art38363131-pierwsze-firmy-w-polsce-zakaza-pracownikom-uzywac-chatgpt
19. [M] „Czy można zwolnić pracownika za korzystanie z ChatGPT bez zgody firmy?" — https://www.infor.pl/prawo/praca/7612153,chatgpt-w-pracy-moze-kosztowac-etat-prawnicy-wskazuja-granice.html
20. [M] „Użycie AI w pracy może grozić dyscyplinarką, ale rzadko" — https://www.rp.pl/praca-emerytury-i-renty/art45097071-odpowiedzialnosc-pracownika-za-uzycie-ai-pomimo-zakazu
21. [M] „ChatGPT w biurze? Jak legalnie używać AI w pracy" — https://www.praca.pl/poradniki/rynek-pracy/chatgpt-w-biurze-jak-legalnie-uzywac-ai-w-pracy_pr-8759.html
22. [M] „Microsoft wycofuje Copilota z Excela. To koniec" (Wykop) — https://wykop.pl/link/7996559/microsoft-wycofuje-copilota-z-excela-to-koniec (sygnał niestabilności narzędzi, §8)
23. [U][S?] parafraza z Wykopu (oryginał niedostępny): użytkownik-nowicjusz „odpowiada na maile i robi raporty w Excelu", a inni wskazują, że największą słabością ChatGPT jest to, że „nie potrafi powiedzieć 'nie wiem'" — klaster https://wykop.pl/link/7068373/czy-sztuczna-inteligencja-zwolni-nas-z-pracy-te-zawody-sa-zagrozone

→ Słowa-klucze: *czy wolno, zakaz, dyscyplinarka, legalnie, dane firmowe, RODO*. Produkt biurowy musi zawierać **„co wolno wkleić"** — to realny lęk, nie tylko brak umiejętności.

### 6.4 Seniorzy 50+/60+
24. [M] „Jak zacząć korzystać ze sztucznej inteligencji po 60-tce?" (31.08.2026) — https://glosseniora.pl/2026/08/31/jak-zaczac-korzystac-ze-sztucznej-inteligencji-po-60-tce/ — snippet (parafraza): dla części osób po sześćdziesiątce AI „brzmi jak kolejna rewolucja technologiczna, za którą trudno nadążyć"; autor radzi traktować AI „jak kolejne narzędzie, podobnie jak kiedyś internet, bankowość elektroniczną czy smartfony".
25. [M] „Czym jest czat GPT?" (portal dla seniorów) — https://tojasenior.pl/czym-jest-czat-gpt/
- Verbatim wypowiedzi seniorów („boję się", „nie ogarniam"): **brak danych** (fora niedostępne).

### 6.5 Mikrofirmy
- [SP] „50 gotowych promptów po polsku do maili, ofert, postów i codziennych spraw" — https://chatgpt40.pl/
- [SP] „Gotowe prompty AI do tworzenia angażujących treści — przeglądaj, filtruj i kopiuj jednym kliknięciem" — https://gotoweprompty.pl/
- [SP] „Ogromny wybór i profesjonalne ChatGPT prompty czekają na Ciebie na naszym marketplace" — https://prompti.pl/chatgpt-prompty/
- Verbatim wypowiedzi właścicieli („nie mam czasu", „nie umiem pisać postów"): **brak danych**; ślad pośredni: istnienie PostyDlaSalonu.pl i ebooka salonowego (§2.2).

### 6.6 Słownik persony (z powyższych)
„gotowe", „w 10 minut / w 60 sekund", „krok po kroku", „od zera", „bez wiedzy technicznej", „niezależnie od wieku", „oszczędza czas", „po którym nikt nie pozna", „czy wolno", „legalnie", „pachnie plastikiem". Unikać: „prompt engineering", „LLM", „model", „workflow".

---

## 7. Persona problemowa (szkic) — dla konceptu C „Lokalny biznes z AI"

> Szkic hipotetyczny zbudowany z sygnałów §2.2(5), §4 i §6; **nie** z wywiadów.

- **Kto:** „Kasia", 38 l., właścicielka salonu kosmetycznego / fryzjerskiego w mieście 20–80 tys. (analogicznie: mechanik, hydraulik, groomer, cukiernia). 1–3 osoby w firmie, Booksy/Messenger/FB-fanpage prowadzone **z telefonu**.
- **Ból:** po zamknięciu o 19:00 siada z telefonem, żeby „coś wrzucić na fejsa" i odpisać na 6 zapytań; nie ma czasu ani pomysłu; „próbowałam ChatGPT — pisze sztucznie i po angielsku myśli"; boi się, że klientki poznają („pachnie plastikiem", §6.1).
- **Czego już próbowała:** darmowe posty (PostyDlaSalonu — 12 sztuk i koniec), grafiki w Canvie, poradniki „20 promptów dla sklepu" (za ogólne).
- **Czego nie zrobi:** nie kupi kursu 199 zł, nie obejrzy 8 h wideo, nie założy Make.com, nie pójdzie na szkolenie Google 5 tygodni.
- **Wyzwalacz zakupu:** reklama w feedzie wieczorem: „Post o promocji na jesień w 60 sekund — wpisz 3 rzeczy, resztę zrobi AI, po polsku, jak człowiek" + demo na ekranie telefonu; cena 39–49 zł jako „mniej niż jedna wizyta".
- **Obiekcje:** „to kolejny scam z AI" (anonimowa marka), „i tak będzie widać, że to AI", „nie chcę wklejać danych klientek".
- **Sukces po zakupie:** 1 post + 3 odpowiedzi klientom + 1 oferta w 15 minut pierwszego wieczoru; zapisane „ulubione" prompty w telefonie.

(Dla konceptu A analogiczny szkic: „Pani Ania, 44, nauczycielka edukacji wczesnoszkolnej i wychowawczyni, 30 września o 22:00 z telefonem na kanapie kończy WOPFU"; obiekcje: RODO danych ucznia, „dyrektor pozna", „AI nie zna mojego ucznia".)

---

## 8. Ryzyka

| Obszar | Ryzyko | Dowód / źródło | Jak ograniczyć |
|---|---|---|---|
| **Znaki towarowe OpenAI** | Nazwa produktu z „ChatGPT"/„GPT" narusza wytyczne OpenAI: „OpenAI does not permit the GPT brand to be used in app, product, developer or company names" [S] | https://openai.com/brand/ ; „OpenAI Hunts Down Companies Using Trademarked GPT in Brand" https://slator.com/openai-hunts-down-companies-using-trademarked-gpt-in-brand/ | Nazwa własna marki; „działa z ChatGPT, Gemini, Claude" tylko opisowo. |
| **RODO / dane osobowe** | Nauczyciele wklejający dane uczniów (IPET!), pracownicy — dane firmowe; produkt, który do tego zachęca, staje się współodpowiedzialny wizerunkowo | https://www.apptivity.pl/pl/blog/post/czy-chatgpt-jest-zgodny-z-rodo ; https://devstockacademy.pl/blog/bezpieczenstwo-i-jakosc/firmowe-dane-ai-wyciek-chatgpt-rodo-2026/ ; https://eunoiacreativ.pl/blog/bezpieczenstwo-ai-rodo-dane-firmowe-chatgpt-claude | Każdy prompt z polem „[inicjały/opis, bez nazwiska]"; osobna checklista „czego nie wklejać"; to też argument sprzedażowy. |
| **AI Act art. 4 — kąt B2B** | Obowiązek jest miękki („środki… w możliwie największym stopniu"), bez certyfikatu; jedno źródło twierdzi, że od 27.07.2026 przepis „nie wymaga już gwarantowania konkretnego poziomu wiedzy, lecz jedynie wspierania rozwoju kompetencji" [S?] — **nie zweryfikowano na EUR-Lex** (zablokowany) | treść obowiązku wg snippetów: „podejmują środki w celu zapewnienia, w możliwie największym stopniu, odpowiedniego poziomu kompetencji w zakresie AI wśród swojego personelu i innych osób zajmujących się działaniem i wykorzystaniem systemów AI w ich imieniu" — https://pl.andersen.com/newsletter/budowanie-kompetencji-w-zakresie-ai-nowy-obowiazek-pracodawcy-2/ ; https://kadrywpigulce.pl/ai-act-obowiazki-pracodawcy/ ; data 2.02.2025: https://www.prawo.pl/biznes/ai-act-co-wejdzie-w-zycie-2-lutego-2025,531279.html ; „rozsądne środki, dostosowane do ryzyka i udokumentowane": https://chronofy.pl/blog/art-4-ai-act-kompetencje-ai-obowiazek-szkolenia-2026 ; zmiana 2026: https://promptowy.com/ai-act-kompetencje-ai/ ; ogólne stosowanie od 2.08.2026: https://www.kancelariaepoque.pl/post/ai-act-w-firmie-od-2-sierpnia-2026-r-jak-legalnie-korzysta%C4%87-z-chatgpt-i-innych-narz%C4%99dzi-ai ; tekst pierwotny (niepobrany): https://eur-lex.europa.eu/eli/reg/2024/1689/oj/pol | Nigdy „zgodne z AI Act"/„wymagane prawem". Dozwolone: „pomaga udokumentować, że zespół przeszedł podstawy" + imienne potwierdzenie ukończenia (jak Doradcy365). Zweryfikować status nowelizacji przed użyciem w copy. |
| **Polityki reklamowe Meta** | (a) „Nie ogarniasz AI?" może podpaść pod zakaz sugerowania cech osobistych (wiedza ogólna o polityce Meta — nie weryfikowano w tej sesji); (b) produkt dla szukających pracy może zostać zaklasyfikowany do kategorii specjalnej „Zatrudnienie" → utrata targetowania wiek/płeć/lokalizacja (wiedza ogólna, nie weryfikowano); (c) obietnice wyników („zdobędziesz pracę", „więcej klientów") = ryzyko odrzucenia | brak dostępu do Ad Library i do stron polityk w tej sesji | Copy w 2. osobie o zadaniu, nie o osobie („Post w 60 s"), bez obietnic wyniku; unikać słów „praca/zatrudnienie" w reklamie konceptu E. |
| **Prawo konsumenckie** | Treści cyfrowe: odstąpienie 14 dni chyba że konsument zgodzi się na natychmiastowe wykonanie i przyjmie do wiadomości utratę prawa (wiedza ogólna — nie weryfikowano) | — | Checkbox zgody przy zakupie + regulamin; rozważyć dobrowolną gwarancję 14 dni (chatgpt40.pl ją stosuje). |
| **Zaufanie do anonimowej marki** | „AI + anonim + płatność" = wzorzec scamu; szczególnie 60+ i nauczyciele (rynek twarzy) | §3 mapa: w edukacji nauczycieli dominują twarze (Rogalska, Popławska); anonimowi sprzedawcy promptów istnieją, ale ich sprzedaż: brak danych | Wybrać niszę narzędziową (C), transparentny podmiot w stopce (NIP), demo bez logowania, cena „nie boli", gwarancja. Maskotka-AI jako przewodnik po produkcie jest naturalna w narzędziu, nie w „kursie od eksperta". |
| **Sezonowość** | Nauczyciele: piki wrzesień (IPET/WOPFU), styczeń/czerwiec (oceny), martwe wakacje. Szukający pracy: styczeń/wrzesień. Mikrofirmy: neutralne, z pikami przed świętami | daty lejków 29.09 i 12.10.2026 (§5) | Test w październiku sprzyja A i C. |
| **Konkurencja darmowa/instytucjonalna** | Lekcja:AI (11 tys.), Google/SGH (~15 tys. w I edycji), Santander, IBE, OPS/UTW | §2.3 | Nie sprzedawać „kursu"; sprzedawać wynik konkretnego zadania. |
| **Tempo zmian narzędzi** | UI ChatGPT/Gemini zmienia się co miesiące; nagłówek „Microsoft wycofuje Copilota z Excela" pokazuje, że nawet duże funkcje znikają | https://wykop.pl/link/7996559/microsoft-wycofuje-copilota-z-excela-to-koniec | Treści narzędziowo-agnostyczne (prompt działa wszędzie), zero zrzutów ekranu UI, wersjonowanie biblioteki. |
| **Zmęczenie „AI-slopem"** | Odbiorcy treści (rekruterzy, klienci, dyrektorzy) uczą się rozpoznawać generyczne teksty | §6.1 | Prompty z obowiązkowymi polami personalizacji (3 fakty, ton, lokalny detal) + krok „przeczytaj na głos i zmień 2 zdania". |
| **Halucynacje / błędy merytoryczne** | W dokumentach szkolnych (IPET) i CV błędy AI mają realne konsekwencje | ostrzeżenia w poradnikach CV: https://coachingirekrutacja.pl/jak-napisac-cv-z-pomoca-chatgpt-by-nie-zostalo-odrzucone-przez-rekrutera-gotowe-prompty/ | Checklisty weryfikacji w produkcie; komunikat „AI pomaga, Ty decydujesz". |

---

## 9. Ocena wg rubryki (1–5; 14 kryteriów; max 70)

### Koncept A — „Nauczycielski Pomocnik AI: dokumentacja i materiały w 10 minut (telefon)"
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 5 | Dokumentacja (IPET/WOPFU/oceny opisowe) to ból potwierdzony istnieniem SaaS-ów, webinarów i kursów wprost o tym (§3). |
| 2 | Wartość w 1 zdaniu | 5 | „Ocena opisowa, IPET i sprawdzian w 10 minut z gotowymi polami do wypełnienia — na telefonie". |
| 3 | Dotarcie przez Meta | 4 | Nauczyciele to wyraźny, aktywny na FB segment; lejki webinarowe konkurencji dowodzą, że reklama do nich działa. |
| 4 | Konkurencja | 2 | Darmowa Lekcja:AI dla 11 tys., IBE, blogi z 50 promptami, 2 SaaS-y IPET, ≥8 płatnych kursów. |
| 5 | Dowody popytu | 5 | Najwięcej płatnych produktów i instytucjonalnych programów ze wszystkich podnisz. |
| 6 | Szybkość produkcji | 3 | Poprawna struktura IPET/WOPFU/oceny wymaga pracy na wzorach — 3–5 dni. |
| 7 | Dobry produkt bez eksperta | 3 | Da się na publicznych wzorach, ale błąd merytoryczny szybko wyjdzie w pokoju nauczycielskim. |
| 8 | Wizualność reklam | 4 | „3 godziny → 10 minut", ekran telefonu, maskotka, przed/po. |
| 9 | Upsell | 4 | Pakiety sezonowe (zebrania, koniec roku, dostosowania), licencja dla szkoły. |
| 10 | Marża/cena ≤49 | 4 | Rynek 119–199 zł; 39–49 zł to impuls; koszt krańcowy ~0. |
| 11 | Ryzyko prawne/reklamowe | 3 | RODO danych uczniów, znak „ChatGPT", ale brak kategorii specjalnych Meta. |
| 12 | Wejście w kilka dni | 3 | Konta od zera + nisza wrażliwa na zaufanie; cena łagodzi. |
| 13 | Format „telefon" | 4 | Nauczyciele pracują wieczorem z telefonem; wynik i tak trafi do Worda (drobne tarcie). |
| 14 | Bez twarzy eksperta | 3 | Rynek zdominowany przez twarze; narzędzia (IPETonline) sprzedają się jako marki — pół na pół. |
| | **Suma** | **52/70** | |

### Koncept B — „AI w biurze bez wstydu: maile, Excel, notatki, prezentacje — 30 zadań + checklista 'czego nie wklejać'"
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 3 | Ból rozmyty: 31% już używa, reszta nie czuje presji; realny lęk to „czy wolno". |
| 2 | Wartość w 1 zdaniu | 4 | „30 codziennych zadań biurowych z AI w 5 minut każde — i lista, czego nie wklejać". |
| 3 | Dotarcie przez Meta | 3 | „Pracownik biurowy" to szeroka, mało intencyjna grupa; zainteresowania Excel/Office pomagają. |
| 4 | Konkurencja | 2 | Pakiety promptów 29–79 zł, Santander/Google za darmo, szkolenia pracodawców. |
| 5 | Dowody popytu | 4 | Gęsta oferta B2B, pakiety promptów, dyskurs prawny — popyt jest, ale głównie po stronie firm. |
| 6 | Szybkość produkcji | 5 | Treść generyczna; 1–3 dni. |
| 7 | Dobry produkt bez eksperta | 5 | Kompetencje właściciela (AI) wystarczają. |
| 8 | Wizualność reklam | 3 | Maile i tabelki są mało emocjonalne. |
| 9 | Upsell | 4 | Pakiet dla zespołu z imiennymi potwierdzeniami (wzór Doradcy365), moduł Excel, moduł „AI w firmie — podstawy". |
| 10 | Marża/cena ≤49 | 4 | OK, ale kotwica 29 zł (gotoweprompty) ciągnie w dół. |
| 11 | Ryzyko prawne/reklamowe | 4 | Niskie, jeśli bez claimów „zgodne z AI Act". |
| 12 | Wejście w kilka dni | 4 | Tak. |
| 13 | Format „telefon" | 3 | Praca biurowa dzieje się na laptopie; telefon = nauka w drodze. |
| 14 | Bez twarzy eksperta | 4 | Narzędziowy charakter; anonimowe pakiety promptów są normą. |
| | **Suma** | **52/70** | |

### Koncept C — „Lokalny biznes z AI: posty, oferty, odpowiedzi klientom i na opinie — 40 zadań na telefonie (fryzjer, kosmetyczka, mechanik, hydraulik, cukiernia…)"
| # | Kryterium | Ocena | Uzasadnienie |
|---|---|---|---|
| 1 | Siła problemu | 4 | Brak czasu i „nie umiem pisać" potwierdzone istnieniem PostyDlaSalonu, ebooka salonowego, promptów „posty FB". |
| 2 | Wartość w 1 zdaniu | 5 | „Post, oferta i odpowiedź klientowi w 60 sekund — po polsku, jak człowiek, z telefonu". |
| 3 | Dotarcie przez Meta | 4 | Właściciele małych firm/admini stron to dobrze zdefiniowana grupa Meta; aktywni na FB/IG. |
| 4 | Konkurencja | 3 | Kilka produktów niszowych i darmowe listy; brak dominującego gracza w PL (w dostępnych wynikach). |
| 5 | Dowody istniejącego popytu | 3 | Produkty istnieją (Empik, prompti, BUZZcenter 199 zł), ale wolumeny sprzedaży: brak danych. |
| 6 | Szybkość produkcji | 5 | Szablony marketingowe; 2–3 dni z branżowymi wariantami. |
| 7 | Dobry produkt bez eksperta | 4 | Copywriting lokalny + AI — w zasięgu właściciela; brak wymogu certyfikatu. |
| 8 | Wizualność reklam | 4 | Demo na ekranie telefonu: 3 pola → gotowy post; przed/po. |
| 9 | Upsell | 5 | Kalendarz 30 postów, odpowiedzi na opinie Google, oferta PDF, **mini-strona wizytówka** (kompetencja właściciela: strony www). |
| 10 | Marża/cena ≤49 | 4 | 39–49 zł = „mniej niż jedna usługa"; płaci firma. |
| 11 | Ryzyko prawne/reklamowe | 4 | Brak kategorii specjalnych; unikać obietnic „więcej klientów". |
| 12 | Wejście w kilka dni | 4 | Tak; zaufanie budowane demem, nie osobą. |
| 13 | Format „telefon" | 5 | Mikroprzedsiębiorca prowadzi FB/Messenger/Booksy z telefonu — użycie w naturalnym momencie. |
| 14 | Bez twarzy eksperta | 4 | Narzędzie, nie mentoring; maskotka jako „asystent salonu" pasuje. |
| | **Suma** | **58/70** | |

### Warianty odrzucone (skrót, bez pełnej tabeli)
| Koncept | Suma | Główny powód niższej oceny |
|---|---|---|
| D — „Pierwsze kroki z AI po 50-tce" (telefon, 7 dni) | ~50 | Kryt. 5 = 2 (brak dowodów płacenia online; płacą UTW offline 200 zł lub dostają za darmo), kryt. 14 = 2 (anonim = scam w oczach seniora); mocne: 13 = 5, 3 = 4. |
| E — „CV i rozmowa bez plastiku" | ~51 | Kryt. 4 = 2 i 10 = 3 (MakeCV od 19 zł, darmowe kreatory), kryt. 3 = 3 (ryzyko kategorii „Zatrudnienie" na Meta); mocne: ból (§6.1) i 1 zdanie. |

**Uwaga krytyczna do rankingu:** C wygrywa dopasowaniem do ograniczeń (telefon, brak twarzy, cena, upsell), **nie** dowodami popytu — te ma najsłabsze z trójki (3/5). Test za 300 zł jest więc testem hipotezy popytu, a nie jej potwierdzeniem. A ma popyt udowodniony, ale walczy z darmowym państwem i twarzami. Remis A/B rozstrzygać wg apetytu na sezonowość i RODO (A) vs nudę i kotwicę cenową (B).

---

## 10. Produkt interaktywny (telefon) + upsell — dla konceptu C

### 10.1 Produkt główny: „[Nazwa własna] — Asystent Lokalnej Firmy" · 39–49 zł · dostęp linkiem po zakupie (Stripe), bez instalacji
Mobile-first strona (PWA-like, działa w przeglądarce), maskotka-AI jako przewodnik:
1. **Wybór branży** (fryzjer, kosmetyczka, barber, mechanik, hydraulik/elektryk, cukiernia/gastro, korepetycje, groomer, sprzątanie, „inna") → zmienia przykłady i ton.
2. **Kreator zadania (rdzeń):** 8 typów: post o promocji · post „za kulisami" · odpowiedź na zapytanie w Messengerze · odpowiedź na negatywną opinię Google · odpowiedź na pozytywną opinię · oferta/cennik do wysłania · SMS przypominający · ogłoszenie o wolnych terminach. Każdy = **3–4 pola** (co, dla kogo, szczegół lokalny, ton) → generuje **gotowy prompt po polsku** z wbudowanymi zasadami anty-„plastik" (konkret, bez frazesów, 1 lokalny detal, długość).
3. **Jeden przycisk „Kopiuj i otwórz w ChatGPT / Gemini / Claude"** (deep-link z prefillem promptu — do sprawdzenia technicznie, którzy dostawcy wspierają parametr w URL; fallback: schowek + instrukcja 2 kroków).
4. **„Odplastikuj" — checklista 5 pytań** po wygenerowaniu (czy jest liczba/cena, nazwa dzielnicy, imię/zwrot, czy usunięto „Zapraszamy serdecznie!"…) — odpowiedź na §6.1.
5. **„Czego nie wklejać"** — 1 ekran o danych klientów (odpowiedź na §8 RODO).
6. **7-dniowy tryb misji** (dzień 1: pierwszy post; dzień 2: 3 odpowiedzi; …) z paskiem postępu w `localStorage`, bez logowania.
7. **Biblioteka 40 promptów** z ulubionymi + PDF „ściąga" jako dodatek (właściciel lubi ebook jako element).
8. **Bez nazw „ChatGPT/GPT" w nazwie i logo** (§8).

Dlaczego to nie ebook: pola formularza + generowanie promptu + deep-link + checklisty = rzeczy, których PDF nie zrobi, a które są sednem wartości „w 60 sekund".

### 10.2 Landing (pod 150–300 kliknięć)
Hero z nagraniem ekranu telefonu (3 pola → post), cena „mniej niż jedna wizyta", 14-dniowa gwarancja zwrotu (parytet z chatgpt40.pl), 3 przykłady przed/po per branża, sekcja „czego nie wklejać" jako dowód rzetelności, stopka z pełnymi danymi podmiotu (kontra „scam z AI").

### 10.3 Naturalny upsell (kolejność)
1. **Order bump (19 zł):** „30 gotowych tematów postów na najbliższy miesiąc dla Twojej branży".
2. **Po 7 dniach (29 zł):** „Opinie Google pod kontrolą — 20 szablonów odpowiedzi + procedura na hejt".
3. **Po 14 dniach (99–199 zł, usługa/półprodukt):** „Wizytówka www w 1 dzień" — generator prostej strony z tekstami zrobionymi w narzędziu (kompetencja właściciela; poza limitem 49 zł, ale to już nie produkt główny).
4. **Wariant B2B (dla A/B, nie C):** pakiet „dla zespołu 5 osób" z imiennymi potwierdzeniami ukończenia (wzór Doradcy365: dodatkowe potwierdzenia 15 zł netto/os.).

### 10.4 Co zmierzyć za 300 zł (kryteria sygnału)
CTR kreacji „telefon: 3 pola → post" vs „maskotka mówi"; CR landing→Stripe ≥ 2% przy 150–300 klikach = 3–6 sprzedaży to **szum**, więc dodatkowo mierzyć: % osób, które użyły darmowego demo 1 zadania (bramka e-mail, MailerLite) i % powrotów do narzędzia w 7 dni. Równolegle, zanim ruszy reklama: uzupełnić autocomplete/Reddit/YouTube/Ad Library (§2.0).

---

### Aneks — pełna lista URL-i użytych jako źródła (do ponownej weryfikacji z nieblokowanej sieci)
Adopcja/statystyki: news.microsoft.com (Global AI Diffusion, 05.2026) · computerworld.pl/article/100050572 · komputerwfirmie.org (krytyka 31%) · blog.osoz.pl (Human+AI/CampusAI) · rynekinformacji.pl/raport-internet-dzieci-2026 · kpmg.com/pl (zaufanie 41%) · gemius.com/pl/news/jak-polscy-internauci-korzystaja-z-chatgpt-wyniki-raportu-juz-dostepne (niepobrane — liczby brak).
Programy: zpe.gov.pl/lekcja-ai · lekcjaai.pl · fundacja.orange.pl · biuroprasowe.orange.pl · blog.google/intl/pl-pl (Umiejętności Jutra) · rsvp.withgoogle.com/events/umiejetnoscijutra · pg.edu.pl · gazeta.sgh.waw.pl · aioai.pl · strivelab.pl (opinia uczestnika) · app.santanderopenacademy.com/pl/course/chatgpt · ibe.edu.pl · uslugirozwojowe.parp.gov.pl (id 3364741, 3536823).
Konkurencja: strefakursow.pl · nextskill.pl · udemy.com · eduj.pl · chatgpt40.pl · gotoweprompty.pl · promptydochatgpt.pl · smartnetstudio.pl · prompti.pl · buzzcenter.pl · makeai.pl · lp.campusai.pl · aiexpert-academy.pl · vita.edu.pl · edu-akcja.pl · kurswychowawcy.com · edulabor.pl · iodn.pl · kursy.aiprogres.net · eduzabawy.com · ipetonline.pl · ipetgenerator.pl · helion.pl (Rozum, Gmerek) · ebookpoint.pl · empik.com (Woźniak) · makecv.pl · ai-edu.pro · efektywna-nauka.pl · kozminski.edu.pl · comarch.pl · sii.pl · ntg.pl · adnakademia.pl · humanskills.pl · cognity.pl · jsystems.pl · expose.pl · ayprime.pl · drmalinowski.edu.pl · dokodu.it · doradcy365.pl · berlitz.com/pl-pl.
VoC/media: czat.ai · rozwojkariery.pl · grupaprogres.pl · interviewme.pl · livecareer.pl · coachingirekrutacja.pl · webinar.klaudiarogalska.pl · webinar.edunation.com.pl · aktywnynauczyciel.pl · smart-sens.org · technostrefa.com · spidersweb.pl · polityka.pl · parkiet.com · infor.pl · rp.pl · praca.pl · wykop.pl (7996559, 7068373) · glosseniora.pl · tojasenior.pl · praktyczneai.substack.com · steamabc.edu.pl · edumaster.pl.
Prawo: prawo.pl (531279) · pl.andersen.com · kadrywpigulce.pl · chronofy.pl · promptowy.com/ai-act-kompetencje-ai · kancelariaepoque.pl · openai.com/brand · slator.com · apptivity.pl · devstockacademy.pl · eunoiacreativ.pl · eur-lex.europa.eu/eli/reg/2024/1689/oj/pol (niepobrane).
