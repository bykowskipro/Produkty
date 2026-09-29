# 00 · Wymogi prawne i platformowe sklepu – checklista startowa (PL, B2C, treść cyfrowa ≤ 49 zł)

Stan na 2026-09-28. Szczegóły, źródła i status weryfikacji każdego twierdzenia: `research/05-policy-legal-tools.md` (oznaczenia [P]/[W]/[N] tam wyjaśnione). Ta lista jest **praktyczna** – co ma być na stronie, w checkoucie, w mailu i w reklamie. Przed publikacją regulaminu przeczytać wskazane artykuły u źródła (ISAP), bo w tej sesji sieć nie pozwoliła pobrać pełnych tekstów.

Legenda: ☐ do zrobienia · **MUST** = wymóg prawny/platformowy · SHOULD = mocno zalecane.

---

## 1. Podmiot i tożsamość sprzedawcy (przed pierwszą sprzedażą)

- ☐ **MUST** Ustalić podmiot sprzedający: istniejące konto Stripe właściciela → sprawdzić, na jaki podmiot (JDG/firma) jest zarejestrowane; sprzedawać z tego podmiotu. Stripe PL dopuszcza „businesses (including sole proprietors)” – osoba bez firmy to szara strefa. Źródło: https://stripe.com/legal/ssa/pl
- ☐ **MUST** Jeśli działalność nierejestrowana: pilnować limitu **10 813,50 zł/kwartał (2026)**, prowadzić ewidencję sprzedaży; pamiętać, że wobec konsumenta jesteśmy przedsiębiorcą (pełne obowiązki). Źródło: https://www.biznes.gov.pl/pl/portal/00115
- ☐ **MUST** Dane identyfikacyjne widoczne na stronie (stopka + regulamin + polityka): imię i nazwisko / firma, adres, NIP, e-mail, (telefon SHOULD). Podstawa: art. 5 ustawy o świadczeniu usług drogą elektroniczną; art. 12 ust. 1 pkt 2–3 ustawy o prawach konsumenta (UPK). Źródło: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000827
- ☐ **MUST (Meta/DSA)** W Ads Managerze każda reklama do UE ma **beneficjenta i płatnika** – dane trafiają do publicznej Biblioteki reklam. Konsekwencja: **pełna anonimowość marki nie jest możliwa** (płatnik = podmiot z pkt 1). Źródło: https://www.jonloomer.com/beneficiary-and-payer-requirements-for-meta-ads-in-the-european-union/
- ☐ SHOULD Adres korespondencyjny inny niż domowy (wirtualne biuro), jeśli właścicielowi zależy na prywatności.

## 2. Strony, które muszą istnieć (linki w stopce każdej podstrony i w checkoucie)

| Strona | Minimalna zawartość | Podstawa |
|---|---|---|
| ☐ **Regulamin** (MUST) | dane sprzedawcy; opis treści cyfrowej/narzędzia; **wymagania techniczne** (smartfon/przeglądarka/internet), **funkcjonalność, kompatybilność, interoperacyjność, techniczne środki ochrony**; procedura zakupu krok po kroku; ceny brutto; metody płatności (Stripe: karta, BLIK, Przelewy24); sposób i czas dostarczenia (link po opłaceniu, e-mail); licencja użytkownika (użytek osobisty, zakaz udostępniania); **prawo odstąpienia 14 dni + wyjątek art. 38 ust. 1 pkt 13 + opis zgody**; **załącznik: wzór formularza odstąpienia** (zał. nr 2 do UPK); **zgodność z umową, aktualizacje, odpowiedzialność 2 lata, reklamacje – odpowiedź w 14 dni**; okres dostępu do narzędzia (określić: np. 24 miesiące od zakupu) i zasady zmian; zakaz treści bezprawnych; zmiany regulaminu; pozasądowe rozwiązywanie sporów (rzecznik konsumentów, Inspekcja Handlowa); **nie wpisywać linku do platformy ODR** (wyłączona 2025 – potwierdzić); data wersji + archiwum wersji | art. 8 u.ś.u.d.e.; art. 12, 17, 21, 27–38, 43h–43q, 7a UPK |
| ☐ **Polityka prywatności** (MUST) | administrator; cele i podstawy (umowa – art. 6 ust. 1 lit. b RODO; obowiązek prawny – lit. c, dokumentacja podatkowa 5 lat; uzasadniony interes – lit. f: reklamacje, bezpieczeństwo, statystyka bezcookie’owa; **zgoda – lit. a: newsletter, cookies marketingowe / Meta Pixel**); odbiorcy: Stripe Payments Europe (płatności; możliwy transfer do Stripe Inc. USA – Data Privacy Framework), operator e-mail (Resend/MailerLite), hosting VPS, **Meta Platforms Ireland (Pixel/CAPI – współadministrowanie w zakresie zbierania i przesyłania danych)**; okresy przechowywania; prawa osoby; skarga do Prezesa UODO; informacja o profilowaniu reklamowym | art. 13 RODO; TSUE C-40/17 (Fashion ID) |
| ☐ **Polityka cookies** (może być sekcją polityki prywatności) | lista cookies/skryptów z celem, czasem i dostawcą; kategorie: niezbędne / analityczne / marketingowe; jak zmienić zgodę (link „Ustawienia cookies” w stopce) | art. 399–400 Prawa komunikacji elektronicznej (Dz.U. 2024 poz. 1221) |
| ☐ **Kontakt / reklamacje** | e-mail, czas odpowiedzi (≤ 14 dni), co zawrzeć w zgłoszeniu | art. 7a UPK |
| ☐ **Strona „O marce / o awatarze”** (SHOULD) | jasna informacja, że „[Imię] to przewodnik marki – postać stworzona z pomocą AI, nie prawdziwa osoba ani ekspert”; kto stoi za marką (podmiot z pkt 1) | Meta – zasady treści AI; AI Act art. 50 (od 2.08.2026) |

## 3. Karta produktu / landing page – elementy prawne

- ☐ **MUST** Cena **brutto** w zł, widoczna przed przyciskiem zakupu; przy 23% VAT (narzędzie webowe/kurs) – jeśli jesteśmy VAT-owcem, 49 zł zawiera 9,16 zł VAT.
- ☐ **MUST** Bez fikcyjnej „ceny regularnej”. Dozwolone: „Cena premierowa 29 zł – od [data] 49 zł” (tylko jeśli prawdziwe). Przy późniejszej promocji: „Najniższa cena z 30 dni przed obniżką: X zł” tuż przy cenie. Źródło: art. 4 ust. 2–3 ustawy o informowaniu o cenach; https://uokik.gov.pl/dyrektywa-omnibus-najnowsze-wyjasnienia-do-obnizek-cen
- ☐ **MUST** Bez fałszywych liczników czasu / „zostało 5 sztuk” (art. 7 pkt 7 u.p.n.p.r.); bez zmyślonych opinii (art. 7 pkt 24–25 u.p.n.p.r.).
- ☐ **MUST** Opis, co dokładnie klient dostaje (format, czas dostępu, na czym działa), oraz „Główne cechy świadczenia” – to samo, co potem w mailu potwierdzającym (art. 12 ust. 1 pkt 1, 19, 20 UPK).
- ☐ **MUST** Widoczna informacja przed zakupem: „Treść cyfrowa dostarczana natychmiast – po wyrażeniu zgody na natychmiastowe dostarczenie tracisz prawo odstąpienia (14 dni)” (art. 12 ust. 1 pkt 12 UPK).
- ☐ **MUST** Link do regulaminu i polityki prywatności w widocznym miejscu formularza zakupu.
- ☐ **MUST** Zastrzeżenia branżowe (sekcja 8) na LP **i** w produkcie.
- ☐ SHOULD Oznaczenie „ilustracje/awatar wygenerowane przez AI” w stopce LP.

## 4. Checkout – dokładna sekwencja i checkboxy

Rekomendowana architektura: **własna strona „Zamówienie” (zbiera zgody) → przekierowanie do Stripe Checkout → webhook → e-mail z dostępem.** Powód: Stripe ma tylko jeden checkbox regulaminowy (`consent_collection.terms_of_service`), a zgoda na utratę prawa odstąpienia powinna być **osobna, wyraźna, niezaznaczona domyślnie** i zalogowana.

Na stronie „Zamówienie” (przed Stripe):
1. ☐ Podsumowanie: nazwa produktu, cena brutto, sposób dostarczenia (link e-mail natychmiast po opłaceniu), okres dostępu.
2. ☐ Pole e-mail (do dostarczenia treści i potwierdzenia umowy).
3. ☐ **Checkbox 1 – MUST, wymagany, domyślnie odznaczony:**
   > „Zapoznałem/-am się z [Regulaminem] i [Polityką prywatności] i akceptuję ich treść.”
4. ☐ **Checkbox 2 – MUST, wymagany, domyślnie odznaczony, osobny (PROJEKT BRZMIENIA):**
   > „**Żądam dostarczenia treści cyfrowej ([nazwa produktu]) natychmiast po dokonaniu płatności, czyli przed upływem 14-dniowego terminu do odstąpienia od umowy, i wyrażam na to wyraźną zgodę. Przyjmuję do wiadomości, że z chwilą dostarczenia treści cyfrowej (udostępnienia linku dostępowego) tracę prawo do odstąpienia od umowy** (art. 38 ust. 1 pkt 13 ustawy z 30 maja 2014 r. o prawach konsumenta).”
   Wariant krótszy na mobile (rozwijane „więcej”): „Chcę dostęp od razu i wiem, że tracę prawo do zwrotu w 14 dni. [Pełna treść zgody]”.
5. ☐ Checkbox 3 – opcjonalny, domyślnie odznaczony, **nigdy nie łączony z 1–2**:
   > „Chcę otrzymywać newsletter [marka] z materiałami o [temat] na podany e-mail. Zgodę mogę wycofać w każdej chwili (link w stopce maila).” (art. 398 PKE – informacja handlowa e-mailem za zgodą; RODO art. 6 ust. 1 lit. a)
6. ☐ **Przycisk – MUST:** „**Kupuję i płacę – 49,00 zł**” (art. 17 ust. 3–4 UPK: „zamówienie z obowiązkiem zapłaty” lub równoważne). Nie „Dalej”, nie „Wyślij”.
7. ☐ **Logowanie zgód – MUST:** zapisać w bazie: e-mail, timestamp UTC, IP, user-agent, **wersja tekstu zgody (hash/ID)**, wersja regulaminu, wynik checkboxów; przekazać do Stripe w `metadata` sesji: `consent_digital=v1`, `consent_ts`, `terms_version`, `marketing_consent=true/false`, `fbp`/`fbc` (jeśli zgoda marketingowa). Przechowywać 6 lat (przedawnienie roszczeń + kontrola).

W Stripe Checkout:
- ☐ `mode: 'payment'`, `currency: 'pln'`, `locale: 'pl'`, `customer_email` = e-mail z formularza, `customer_creation: 'always'` (SHOULD, ułatwia upsell).
- ☐ **Order bump:** `optional_items` (maks. 10, tylko ceny jednorazowe w trybie payment; `adjustable_quantity` opcjonalnie). Źródło: https://docs.stripe.com/payments/checkout/optional-items
- ☐ `consent_collection.terms_of_service: 'required'` (dodatkowo, nie zamiast checkboxów z pkt 3–4) + ustawiony URL regulaminu w Dashboard → Public details. `custom_text.terms_of_service_acceptance.message`: „Akceptuję [Regulamin]. Zgodę na natychmiastowe dostarczenie treści cyfrowej wyraziłem/-am na poprzednim kroku.”
- ☐ `custom_text.submit.message`: „Po opłaceniu dostęp wyślemy natychmiast na podany e-mail.”
- ☐ Metody płatności: karta, **BLIK**, Przelewy24, Link (włączyć w Dashboard → Payment methods).
- ☐ Ograniczenie kraju: `billing_address_collection: 'required'` + w webhooku odrzucać/zwracać zamówienia spoza PL **albo** świadomie obsłużyć VAT OSS (usługi elektroniczne B2C w UE).
- ☐ Paragony e-mail Stripe („receipts”) włączone – jako potwierdzenie płatności (to **nie** jest faktura).
- ☐ `success_url` z `{CHECKOUT_SESSION_ID}` → strona „Dziękujemy” pokazuje dostęp dopiero po weryfikacji sesji po stronie serwera (nie polegać na samym URL).

## 5. E-mail potwierdzający zawarcie umowy (trwały nośnik) – MUST, wysyłany natychmiast po `checkout.session.completed`

Podstawa: art. 21 ust. 1–2 UPK (potwierdzenie na trwałym nośniku najpóźniej w chwili dostarczenia treści; musi zawierać informację o zgodzie na dostarczenie przed upływem terminu odstąpienia). Link do strony **nie** wystarczy – treść ma być w mailu lub w załączniku PDF (TSUE C-49/11).

Treść (kolejność od góry):
1. ☐ Temat: „Twój dostęp do [produkt] + potwierdzenie zamówienia nr [ID]”.
2. ☐ **Link/przycisk dostępu** (unikalny token, bez logowania) + instrukcja „dodaj do ekranu głównego” (mobile-first).
3. ☐ Podsumowanie umowy: produkt (główne cechy), cena brutto (i VAT, jeśli VAT-owiec), data i numer zamówienia, sposób płatności, okres dostępu, wymagania techniczne, funkcjonalność/kompatybilność.
4. ☐ **Blok o prawie odstąpienia (dokładne brzmienie):**
   > „Prawo odstąpienia od umowy. Zgodnie z ustawą o prawach konsumenta konsument może odstąpić od umowy zawartej na odległość w terminie 14 dni. **W dniu [data, godz.] wyraził/-a Pan/Pani wyraźną zgodę na dostarczenie treści cyfrowej przed upływem tego terminu i przyjął/-ęła do wiadomości, że z chwilą dostarczenia treści traci prawo odstąpienia od umowy** (art. 38 ust. 1 pkt 13). Treść cyfrowa została dostarczona [data, godz.] wraz z tym e-mailem. W związku z tym prawo odstąpienia nie przysługuje. Nie ogranicza to Pana/Pani uprawnień z tytułu niezgodności treści cyfrowej z umową (reklamacja – patrz niżej).”
   Jeśli z jakiegoś powodu zgody nie zebrano → w mailu **pouczenie o prawie odstąpienia + formularz** (zał. nr 2 UPK) i **nie** dostarczać treści przed upływem 14 dni albo dostarczyć, akceptując ryzyko pełnego zwrotu (art. 36 pkt 2 UPK).
5. ☐ **Reklamacje / niezgodność z umową:** „Odpowiadamy za zgodność treści cyfrowej z umową przez 2 lata od dostarczenia. Reklamację prześlij na [e-mail], opisz problem i podaj numer zamówienia; odpowiemy w ciągu 14 dni.” (art. 43k, 7a UPK)
6. ☐ **Dane sprzedawcy** (jak w pkt 1) + kontakt.
7. ☐ **Załącznik PDF: Regulamin w wersji z dnia zakupu** (+ polityka prywatności lub link) – to spełnia „trwały nośnik”.
8. ☐ Informacja o fakturze: „Fakturę wystawimy na życzenie – odpowiedz na tego maila z danymi (w ciągu 3 miesięcy od końca miesiąca zakupu).”
9. ☐ Jeśli była zgoda newsletterowa – osobny mail powitalny z linkiem rezygnacji; bez zgody – **żadnych** maili marketingowych (tylko transakcyjne dot. tego zamówienia).
10. ☐ Stopka: podmiot, adres, NIP; „Wiadomość transakcyjna dotycząca Twojego zamówienia”.

Technicznie: Resend (darmowy: 3 000/mies., 100/dzień, 1 domena) z SPF/DKIM/DMARC na własnej domenie; zapisać `message_id` i status doręczenia przy zamówieniu (dowód potwierdzenia).

## 6. Paragony, faktury, ewidencja

- ☐ **MUST** Decyzja: kasa fiskalna niepotrzebna, jeśli (a) roczny obrót B2C ≤ 20 000 zł **lub** (b) korzystamy ze zwolnienia dla usług opłacanych w całości przez bank/pocztę/SKOK z ewidencją jednoznacznie wiążącą zapłatę z czynnością. Rozporządzenie MF z 17.12.2024 (Dz.U. 2024 poz. 1902), obowiązuje do 31.12.2027: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001902 – numer pozycji załącznika potwierdzić w tekście.
- ☐ **MUST** Prowadzić **własną ewidencję zamówień**: nr zamówienia, data, e-mail/nazwisko nabywcy, produkt, kwota, ID płatności Stripe, data wypłaty Stripe → to jest „ewidencja i dowody”, z których wynika, czego dotyczyła zapłata. Comiesięczny eksport CSV ze Stripe archiwizować.
- ☐ **MUST** Faktura **na żądanie** (art. 106b ust. 3 ustawy o VAT) – w 3 miesiące od końca miesiąca sprzedaży; VAT-owiec: 23% (narzędzie/kurs) lub 5% (czysty e-book); zwolniony z art. 113: faktura bez VAT. Faktury konsumenckie **poza KSeF** (potwierdzić aktualny stan na podatki.gov.pl). Darmowe narzędzie do faktur (np. plan darmowy Fakturownia/inFakt – limity sprawdzić) albo własny PDF.
- ☐ **MUST (zwolniony z VAT)** Dzienna ewidencja sprzedaży (art. 109 ust. 1 ustawy o VAT); pilnować progu 200 000 zł (proporcjonalnie w 1. roku) i **nie opisywać usługi jako „doradztwo”** (utrata zwolnienia – art. 113 ust. 13 pkt 2 lit. b).
- ☐ SHOULD Przechowywać dokumenty 5 lat od końca roku podatkowego.

## 7. Cookies, Meta Pixel/CAPI, analityka – zachowanie strony

- ☐ **MUST** Baner zgody przy pierwszej wizycie: przyciski **„Akceptuję wszystkie” i „Odrzucam wszystkie” równie widoczne**, opcja „Ustawienia” (kategorie: niezbędne – zawsze włączone; analityczne; marketingowe). Brak domyślnie zaznaczonych zgód, brak „cookie wall”. Podstawa: art. 399–400 PKE; UODO „Poradnik e-commerce – cookies i zgody marketingowe” (III 2025); https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221
- ☐ **MUST** **Meta Pixel ładuje się dopiero po zgodzie marketingowej**; przed zgodą – zero requestów do facebook.com. Bez zgody **nie wysyłać też CAPI** (te same dane, ten sam cel).
- ☐ **MUST** Zapis dowodu zgody cookies (ID, timestamp, wybór, wersja banera) w cookie technicznym + w logu serwera; link „Ustawienia cookies” w stopce (wycofanie równie łatwe jak udzielenie).
- ☐ **MUST** Mobile: baner jako dolny pasek, nie pełnoekranowy; treść zrozumiała („Używamy Meta Pixel, żeby mierzyć skuteczność reklam i dopasowywać reklamy na Facebooku/Instagramie”).
- ☐ SHOULD Analityka bezcookie’owa na VPS (Umami lub Plausible CE) jako podstawowy pomiar ruchu; nie wymaga zapisu na urządzeniu – uruchamiana bez zgody, ale opisana w polityce (uzasadniony interes). Konserwatywna opcja: włączyć ją dopiero po zgodzie „analityczne”.
- ☐ SHOULD Własny log lejka po stronie serwera: wejście na LP (utm), klik „Kupuję”, utworzenie sesji Stripe, `checkout.session.completed` – bez cookies, po `order_id`/`session_id`. To jest **źródło prawdy dla eksperymentu**, niezależne od zgód i od kategoryzacji Meta.
- ☐ SHOULD CAPI: `Purchase` z webhooka Stripe tylko gdy `marketing_consent=true`; `event_id` = ID sesji Stripe (deduplikacja z Pixelem na stronie „Dziękujemy”); `action_source: 'website'`, `client_ip_address`, `client_user_agent`, `fbp/fbc`, `em` (SHA-256). Źródło: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- ☐ SHOULD Jeśli kierunek zdrowotny: **przed** wydaniem budżetu sprawdzić w Events Manager → Data Sources → Settings → „Manage data source categories”, czy dataset dostał kategorię Health & Wellness (blokada Purchase). Źródło: https://www.facebook.com/business/help/467621355878794

## 8. Zastrzeżenia (disclaimery) – gotowe brzmienia

**Wszystkie kierunki (LP + w produkcie + regulamin):**
> „Materiał ma charakter edukacyjny i informacyjny. Efekty zależą od indywidualnej sytuacji i zaangażowania; nie gwarantujemy określonych rezultatów.”

**Zdrowie / sen / energia / dieta (kierunek B):**
> „Treści w [produkt] mają charakter wyłącznie edukacyjny i ogólny. **Nie stanowią porady medycznej, diagnozy ani planu leczenia** i nie zastępują konsultacji z lekarzem, dietetykiem lub innym specjalistą. Narzędzie nie ocenia stanu zdrowia – porządkuje nawyki i wiedzę. Jeśli masz przewlekłe problemy ze snem, chorobę przewlekłą, jesteś w ciąży, karmisz piersią lub przyjmujesz leki – skonsultuj zmiany z lekarzem. Nie przerywaj leczenia na podstawie tych materiałów. [Awatar] to postać AI, nie lekarz ani dietetyk.”
Zasady treści: brak słów „leczy”, „diagnoza”, „terapia”, „objawy” w opisie produktu; quiz zwraca „profil nawyków”, nie „wynik zdrowotny”; nie wymieniać leków (melatonina = lek OTC) ani suplementów z obietnicami; brak zdjęć „przed/po”; targetowanie 18+.

**Finanse osobiste (kierunek C):**
> „Treści w [produkt] mają charakter edukacyjny. **Nie stanowią doradztwa inwestycyjnego w rozumieniu art. 76 ustawy z 29 lipca 2005 r. o obrocie instrumentami finansowymi, rekomendacji inwestycyjnej w rozumieniu rozporządzenia (UE) nr 596/2014 (MAR), doradztwa podatkowego ani prawnego.** Nie wskazujemy konkretnych instrumentów finansowych do kupna lub sprzedaży. Inwestowanie wiąże się z ryzykiem utraty części lub całości kapitału; wyniki historyczne nie gwarantują przyszłych. Decyzje finansowe podejmujesz samodzielnie i na własną odpowiedzialność. Autorzy i [awatar] nie są licencjonowanymi doradcami inwestycyjnymi i nie są nadzorowani przez KNF.”
Zasady treści: klasy aktywów i mechanizmy – tak; nazwy spółek/ETF-ów/kryptowalut z „kup/sprzedaj” – nie; żadnych linków afiliacyjnych do brokerów/pożyczek; słowo „doradztwo” – nigdzie. Źródła: https://www.knf.gov.pl/knf/pl/komponenty/img/Stanowisko_UKNF_ws_doradztwa_inwestycyjnego.pdf ; https://www.knf.gov.pl/dla_konsumenta/kampanie_informacyjne/Finfluencer_dobre_praktyki_i_ryzyka

**Checklisty (kierunek D):**
> „Checklista jest materiałem pomocniczym opracowanym na podstawie powszechnie dostępnych przepisów i praktyki. Nie zastępuje opinii rzeczoznawcy, inspektora nadzoru ani prawnika, a w przypadku sporu z deweloperem/sprzedawcą – porady prawnej. Stan prawny na [data].”

**AI dla nietechnicznych (kierunek A):**
> „Materiały opisują narzędzia firm trzecich (np. ChatGPT, Gemini, Claude) w celach edukacyjnych; nazwy są znakami towarowymi ich właścicieli; nie jesteśmy z nimi powiązani. Funkcje i ceny narzędzi mogą się zmieniać. Nie obiecujemy zarobków.”

## 9. Reklamy Meta – checklista zgodności (przed wysłaniem kreacji do akceptacji)

- ☐ **MUST** Żadnych zdań przypisujących odbiorcy cechę: zdrowie („Masz problemy ze snem?”), wiek („Masz 40+?”), sytuację finansową („Nie masz oszczędności?”). Mów o metodzie/produkcie, nie o czytelniku. Źródło: https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/
- ☐ **MUST** Bez „przed/po”, bez zawstydzania, bez „cudownych” efektów, bez obietnic dochodu, bez „sekretów, których X nie chce ujawnić”. Źródło: https://transparency.meta.com/policies/ad-standards/deceptive-content/unacceptable-business-practices/
- ☐ **MUST** LP zgodna z reklamą, działa na mobile, bez natrętnych pop-upów (baner cookies – dolny pasek), dane sprzedawcy i regulamin dostępne.
- ☐ **MUST** Beneficjent i płatnik uzupełnione (DSA). Kategoria specjalna: zadeklarować, jeśli kreacja/LP dotyczy mieszkań/pracy/kredytu w sposób, który klasyfikator uzna za ofertę; przy checkliście odbioru mieszkania – rozważyć deklarację „Housing” profilaktycznie (utrata precyzyjnego targetowania, ale mniejsze ryzyko odrzuceń). Źródło: https://www.facebook.com/business/help/298000447747885
- ☐ **MUST (kierunek C)** Założyć konieczność **weryfikacji reklamodawcy usług finansowych** w PL (Meta, IX 2026) – jeśli kreacja mówi o inwestowaniu; wariant „budżet domowy” bez słów inwestycyjnych. Źródło: https://about.fb.com/news/2026/09/prostujemy-fakty-o-walce-z-oszukanczymi-reklamami-w-polsce/
- ☐ **MUST (kierunek B)** Targetowanie 18+; nie optymalizować pod Purchase, dopóki nie sprawdzimy kategorii datasetu.
- ☐ SHOULD Awatar stylizowany (nie fotorealistyczny); w rolkach organicznych z realistycznym wideo/głosem – włączyć oznaczenie AI (standard „Manipulated media”); w opisie profilu „postać AI”. Źródło: https://transparency.meta.com/policies/community-standards/misinformation/
- ☐ SHOULD Nowe konto: fanpage kompletny, 2FA, karta właściciela, 2–3 dni kampanii ruchu przed konwersjami, budżet dzienny ≤ 45 zł, bez duplikowania kont.

## 10. Checkpoint „rzeczy od właściciela” (jedno okno, jak w briefie)

- ☐ Podmiot + dane do stopki/regulaminu/faktur (nazwa, adres, NIP, e-mail, telefon).
- ☐ Status VAT (zwolniony / czynny) → decyduje o cenie netto i treści faktur.
- ☐ Klucze Stripe (restricted key + webhook secret), włączone BLIK/P24/Link, ustawiony URL regulaminu w Public details, włączone receipts.
- ☐ Domena: DNS dla Resend (SPF/DKIM/DMARC) i weryfikacji domeny Meta (meta-tag lub TXT).
- ☐ Meta: Business Portfolio, fanpage, konto reklamowe w PLN, dataset (Pixel ID), token System User do CAPI, beneficjent/płatnik.
- ☐ Decyzja o kierunku produktu → dobór disclaimerów z sekcji 8 i ustawień z sekcji 9.

---

### Źródła (pierwotne, do kliknięcia przed publikacją)
- Ustawa o prawach konsumenta (t.j.): https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000827 · nowelizacja 2022 (treści cyfrowe): https://orka.sejm.gov.pl/proc9.nsf/ustawy/2425_u.htm · art. 38 (podgląd): https://standardyprawa.pl/akt/51/art/9883
- Prawo komunikacji elektronicznej (cookies, art. 399–400): https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221
- UOKiK – Omnibus, obniżki cen: https://uokik.gov.pl/dyrektywa-omnibus-najnowsze-wyjasnienia-do-obnizek-cen
- Kasy rejestrujące – zwolnienia 2025–2027: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001902
- Działalność nierejestrowana: https://www.biznes.gov.pl/pl/portal/00115
- KNF – doradztwo inwestycyjne / finfluencerzy: https://www.knf.gov.pl/knf/pl/komponenty/img/Stanowisko_UKNF_ws_doradztwa_inwestycyjnego.pdf · https://www.knf.gov.pl/dla_konsumenta/kampanie_informacyjne/Finfluencer_dobre_praktyki_i_ryzyka
- Meta: cechy osobiste, praktyki biznesowe, kategorie specjalne, kategorie źródeł danych, komunikat PL IX 2026 – linki w sekcjach 7 i 9.
- Stripe: optional items https://docs.stripe.com/payments/checkout/optional-items · cennik PL https://stripe.com/en-pl/pricing · SSA PL https://stripe.com/legal/ssa/pl
- Resend: https://resend.com/pricing · MailerLite: https://www.mailerlite.com/pricing · Brevo: https://www.brevo.com/pricing/
