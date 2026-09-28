# 05 · Polityki Meta, prawo PL, narzędzia, benchmarki (stan na 2026-09-28)

**Cel:** ten dokument decyduje, co wolno nam sprzedawać i reklamować w teście za 300 PLN (produkt ≤ 49 PLN, PL, marka + AI-awatar, nowe konta Meta).

**Jak czytać oznaczenia wiarygodności (przy każdym twierdzeniu):**
- **[P]** – źródło pierwotne (Meta, Stripe, ustawa, urząd); treść potwierdzona przez wyszukiwarkę/streszczenie strony. UWAGA: w tej sesji sieć blokowała bezpośrednie pobranie stron transparency.meta.com, facebook.com, stripe.com, isap.sejm.gov.pl, uokik.gov.pl, uodo.gov.pl – pełnego tekstu nie odczytano, tylko streszczenia. Przed publikacją regulaminu / kampanii kliknąć w podany URL i potwierdzić.
- **[W]** – źródło wtórne (agencja, blog, kancelaria). Traktować jako wskazówkę, nie dowód.
- **[N]** – nie zweryfikowano w tej sesji (wiedza ogólna autora, wymaga sprawdzenia). Tam, gdzie nic nie wiemy: „brak danych / nie zweryfikowano”.

---

## A. Polityki reklamowe Meta (Facebook / Instagram)

### A1. Cechy osobiste (Personal attributes) – czego nie wolno pisać w reklamie

**Źródło pierwotne [P]:** https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/

Zasada: reklama **nie może twierdzić ani sugerować**, że odbiorca (lub jego rodzina) ma określoną cechę osobistą. Lista cech wg polityki [P]: rasa, pochodzenie etniczne, religia, przekonania, **wiek**, orientacja/praktyki seksualne, tożsamość płciowa, niepełnosprawność, **stan zdrowia fizycznego lub psychicznego (w tym schorzenia)**, **trudna sytuacja finansowa („vulnerable financial status”)**, status wyborczy, członkostwo w związku zawodowym, karalność, imię i nazwisko. Zakazane jest też sugerowanie, że znamy informacje medyczne lub finansowe odbiorcy [P].

Mechanizm (ważny dla copywritera): problemem nie jest temat, tylko **„wycelowanie w odbiorcę”** – pytania i zdania z „Ty/masz/cierpisz”, które przypisują cechę czytelnikowi. Opis usługi w trzeciej osobie jest OK [W: https://www.stackmatix.com/blog/meta-ads-personal-attributes-policy , https://leadsync.me/blog/meta-privacy-violations-and-personal-attributes-advertising-policy/].

| Obszar | Ryzykowne (odrzucane) | Bezpieczne przeformułowanie |
|---|---|---|
| Zdrowie | „Are you diabetic?”, „Do you have diabetes?” – przykłady odrzucane [W, zgodne z polityką P] · PL: **„Masz problemy ze snem?”**, „Cierpisz na bezsenność?”, „Budzisz się zmęczony?” | „Diabetes treatment and monitoring services are available” [W] · PL: „Narzędzie do planowania wieczornej rutyny – 7 technik opisanych krok po kroku”, „Jak działa higiena snu: przewodnik” |
| Wiek | „Masz 40+ i…”, „Dla seniorów takich jak Ty” | „Przewodnik dla osób 40+” jest na granicy; bezpieczniej: „Przewodnik po AI bez żargonu” (bez adresowania wieku) |
| Finanse | „Nie masz oszczędności?”, „Toniesz w długach?”, „Nie stać Cię na…” (sugestia trudnej sytuacji finansowej) | „Kalkulator budżetu domowego w 10 minut”, „Metoda kopertowa wyjaśniona na przykładach” |
| Inne | „Jesteś nietechniczny?” (to nie cecha chroniona, ale styl „Ty + brak” bywa flagowany) | „AI dla osób, które nie kodują – od zera” |

Praktyka: pisać o **produkcie i metodzie**, nie o **stanie czytelnika**. Unikać pytań retorycznych o zdrowie/pieniądze/wiek w nagłówku i w pierwszych 2 s wideo.

Uwaga: część agencji pisze o „rozszerzeniu egzekwowania w marcu 2026” (frazy typu „dla osób zmagających się z…” też odrzucane) [W: https://www.auditsocials.com/blog/meta-ad-misleading-claims-personal-attributes-prohibited-content-policy-2026] – **nie zweryfikowano** u źródła; traktować jako ostrzeżenie.

### A2. Zdrowie i wellness – (a) treść reklam, (b) ograniczenia DANYCH z 2025 r.

**(a) Personal health and appearance [P – URL, treść wg wiedzy ogólnej, N]:** https://transparency.meta.com/policies/ad-standards/objectionable-content/personal-health-appearance/
- Zakaz obrazów „przed/po” i obrazów sugerujących nieoczekiwane/nieprawdopodobne rezultaty [N].
- Zakaz treści budujących **negatywny obraz własnego ciała/zdrowia**, by sprzedać dietę, odchudzanie lub inne produkty zdrowotne (np. zbliżenia na „problematyczne” partie ciała, zawstydzanie) [N].
- Produkty i plany odchudzające, suplementy, zabiegi kosmetyczne: targetowanie **tylko 18+** [N].
- Zakaz „cudownych” obietnic („wylecz bezsenność w 3 dni”) – pokrywa się z polityką Unacceptable Business Practices (A6) i z polskim prawem (art. 7 pkt 17 u.p.n.p.r. – fałszywe twierdzenie, że produkt leczy choroby) [N].

**(b) Ograniczenia danych „health & wellness” (styczeń 2025 →) – to decyduje o optymalizacji pod zakup**

**Źródło pierwotne [P – URL, treść wg streszczeń]:** Meta Business Help Center „Manage data source categories” – https://www.facebook.com/business/help/467621355878794 (ścieżka: Events Manager → Data Sources → Settings → Manage Data Source Categories).
Źródła wtórne, spójne między sobą [W]: https://searchengineland.com/meta-ads-restrictions-health-wellness-campaigns-453094 · https://www.triplewhale.com/blog/meta-health-and-wellness-brands · https://oursprivacy.com/blog/meta-platform-restrictions-explained-core-setup · https://www.zappush.com/blog/remove-metas-health-and-wellness-restriction-heres-how · https://www.cardinaldigitalmarketing.com/healthcare-resources/blog/meta-announces-major-changes-healthcare-advertising/

Co wiadomo:
1. Od ok. 6–13 stycznia 2025 (egzekwowanie od lutego 2025) Meta **automatycznie kategoryzuje źródła danych (Pixel/CAPI dataset)** na podstawie treści strony, reklam, kategorii fanpage’a. Jeśli firma zostanie uznana za „Health & Wellness” (w tym kategoria zbiorcza „Health & Wellness – Other” [W]), na dataset nakładane są ograniczenia [W].
2. Trzy poziomy [W]:
   - **Core Setup** – zdarzenia docierają, ale Meta **obcina URL do domeny i usuwa parametry niestandardowe** (nie widzi, jaki produkt, jaka podstrona).
   - **Ograniczenie średnie („restricted”)** – zablokowane **standardowe zdarzenia dolnego i środkowego lejka**: Purchase, AddToCart, InitiateCheckout, AddPaymentInfo, CompleteRegistration, Schedule itp. → **nie da się optymalizować kampanii pod Purchase**; PageView i ViewContent zostają.
   - **Pełne ograniczenie** – brak wszystkich zdarzeń.
3. Core Setup można włączyć samemu (profilaktycznie); jeśli włączy je Meta, **nie da się go wyłączyć bez skutecznego odwołania** [W: oursprivacy].
4. Odwołanie / rekategoryzacja: w Events Manager przy kategorii jest opcja wniosku o ponowną weryfikację; agencje raportują, że działa, ale trwa i nie zawsze się udaje; warto wcześniej „odzdrowotnić” stronę (język edukacyjny, brak słów „leczenie/objawy/diagnoza”) [W].
5. Zdarzenia niestandardowe (custom events) z neutralnymi nazwami wciąż mogą służyć do optymalizacji [W: searchengineland/zappush] – ale wysyłanie de facto danych zdrowotnych pod inną nazwą łamie Meta Business Tools Terms (zakaz przesyłania danych wrażliwych) i może skończyć się blokadą [N, ocena ryzyka autora].

**Wniosek dla kierunku B (sen/energia/biohacking):** duże prawdopodobieństwo automatycznej kategoryzacji jako Health & Wellness → **optymalizacja pod zakup prawdopodobnie zablokowana**, pozostaje optymalizacja pod Landing Page Views / ViewContent / zdarzenia niestandardowe. Przy budżecie 300 PLN i tak nie wyjdziemy z fazy uczenia (~50 zdarzeń/tydz. [N]), ale **utrata Purchase w Events Managerze utrudni pomiar** – trzeba mierzyć zakupy po własnej stronie (Stripe webhook + własny log).

### A3. Produkty i usługi finansowe – stan na wrzesień 2026

**Źródło pierwotne [P – URL, treść wg streszczeń]:** https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/
- Reklamy produktów i usług finansowych (kredyty, karty, ubezpieczenia, inwestycje, krypto itd.) muszą być zgodne z prawem, a w wybranych krajach reklamodawca musi przejść **weryfikację (firma i/lub tożsamość) i wykazać uprawnienia regulatora** [P/W].
- **Najważniejsze dla nas – Polska, sierpień/wrzesień 2026:** po naciskach polskich władz (UKE/DSA, raport Brzoski o scamie) Meta ogłosiła, że **weryfikacją zostanie objętych 100% reklamodawców usług finansowych kierujących kampanie do użytkowników w Polsce**, „w ciągu najbliższych tygodni”; Polska w pierwszej grupie krajów z nowym systemem AI do wykrywania oszustw [P – komunikat Meta: https://about.fb.com/news/2026/09/prostujemy-fakty-o-walce-z-oszukanczymi-reklamami-w-polsce/ ; relacje: https://imagazine.pl/2026/08/29/meta-weryfikacja-reklam-finansowych-polska-dsa/ , https://www.rp.pl/media/art45067611-meta-mieknie-pod-naciskiem-polski-zuckerberg-wprowadza-zmiany-nad-wisla , https://pl.euronews.com/europa/2026/09/02/meta-zaczyna-ustepowac-po-presji-polski-zuckerberg-uruchamia-nowe-zabezpieczenia-przed-sca , https://www.wnp.pl/tech/meta-w-ogniu-krytyki-koncern-odpowiada-na-zarzuty-i-oglasza-nowe-metody-walki-ze-scamem,1093912.html].
- Źródła wtórne podają, że obowiązkowa weryfikacja finansowa rozszerzyła się w 2026 r. z 12 do 38 krajów, w tym 24 rynki EOG [W: https://dhruboduti.com/blog/financial-advertiser-verification-on-meta-now-required-in-38-countries-what-this-means-for-fintech-and-finance-ads , https://www.auditsocials.com/blog/meta-identity-verification-financial-advertisers-2026]. Lista krajów u źródła – nie odczytano.
- **Czy czysta EDUKACJA finansowa podlega?** Brak danych / nie zweryfikowano. Polityka dotyczy „produktów i usług finansowych”; kurs o budżecie domowym nie jest produktem finansowym, ale (1) automatyczne klasyfikatory reagują na słowa „inwestowanie, ETF, akcje, krypto, zysk, pasywny dochód”, (2) po zapowiedzi „100% reklamodawców finansowych w PL” należy założyć, że **reklama o inwestowaniu trafi do kolejki weryfikacyjnej**, a edukator bez zezwolenia KNF może nie mieć czego przedstawić. Budżet domowy / oszczędzanie / podatki = niższe ryzyko niż inwestycje.
- Krypto: reklamy produktów/usług krypto wymagają uprzedniej zgody Meta i licencji; treści edukacyjne o krypto formalnie nie, ale w praktyce są często odrzucane [N]. Rekomendacja: **unikać w teście**.

### A4. Kategorie specjalne (kredyt / zatrudnienie / mieszkania) w PL/UE

**Źródło pierwotne [P – URL, treść wg streszczeń]:** https://www.facebook.com/business/help/298000447747885 („About Special Ad Categories”).
- Deklaracja kategorii specjalnej jest wymagana dla reklamodawców kierujących reklamy do USA, Kanady **i „niektórych części Europy”**; Meta wprost wspomina, że reklamodawcy kredytowi **w Europie** mogą wybrać inny przedział wieku – co potwierdza, że regulacja obejmuje Europę [W: https://www.jonloomer.com/special-ad-categories-meta-ads/ , https://www.data-axle.com/resources/blog/meta-special-ad-categories-rules/]. **Dokładny status Polski – nie zweryfikowano** (strona pierwotna niepobrana). Założenie robocze: **tak, obowiązuje**.
- Ograniczenia targetowania po zadeklarowaniu kategorii [W/P]: wiek zablokowany na 18–65+, płeć „wszystkie”, lokalizacja co najmniej promień ~15 mil (brak kodów pocztowych), mocno ograniczone zainteresowania/zachowania, brak wykluczeń, brak klasycznych lookalike.
- **Co zostanie zaklasyfikowane?**
  - Płatna checklista **odbioru mieszkania od dewelopera**: nie jest ofertą sprzedaży/najmu/kredytu, więc formalnie nie jest „housing ad”. Ale źródła wtórne opisują w 2026 r. **klasyfikację multimodalną** (obrazy mieszkań, kluczy, planów) i automatyczne nakładanie ograniczeń nawet bez deklaracji [W: https://www.auditsocials.com/blog/meta-ad-policy-updates-2026-guide]. Ryzyko: średnie – najgorszy scenariusz to utrata precyzyjnego targetowania (wciąż można reklamować), nie zakaz.
  - **Kurs dla osób szukających pracy**: kategoria „employment” obejmuje oferty pracy, staże, programy certyfikacji zawodowej [N]; kurs „jak przejść rekrutację” jest na granicy – możliwa klasyfikacja. Ryzyko: średnie.
  - Checklista **kupna używanego auta**: brak związku z kategoriami specjalnymi (chyba że wspomnimy leasing/kredyt).
- Kategoria „social issues/elections/politics”: w UE Meta **zakończyła reklamy polityczne i społeczne (od października 2025, rozporządzenie TTPA)** [P: https://about.fb.com/news/2025/07/ending-political-electoral-and-social-issue-advertising-in-the-eu/]. Nie dotyczy nas, ale nie używać haseł „społecznych” (klimat, równość itp.) w reklamach – ryzyko odrzucenia jako „social issue”.

### A5. Treści generowane przez AI – etykiety, awatar jako twarz marki

- Meta **automatycznie** dodaje etykietę „AI info” do reklam tworzonych/edytowanych narzędziami generatywnymi Meta (generowanie tła, obrazu, animacji); etykieta jest w „About this ad” [W – relacja z komunikatu Meta: https://www.marketingdive.com/news/sociable-meta-adds-updated-disclosure-tags-for-ai-generated-ads/824833/]. Wg źródeł wtórnych od czerwca 2026 Meta automatycznie wykrywa też treści z narzędzi zewnętrznych po metadanych (C2PA) [W: https://coinis.com/blog/meta-ai-content-labeling-facebook-instagram-ads-2026]. Etykieta to informacja, nie kara [W].
- Bardziej widoczna etykieta (obok „Sponsorowane”) przy **fotorealistycznej osobie wygenerowanej przez AI** lub syntetycznym wideo/audio przedstawiającym realną osobę [W: https://www.cinerads.com/blog/ai-ugc-facebook-ad-policy].
- **Treści organiczne:** standard społeczności „Misinformation / Manipulated media” wymaga **samodzielnego oznaczenia** fotorealistycznego wideo lub realistycznego audio, które zostało cyfrowo utworzone/zmienione; za brak oznaczenia Meta może nakładać kary [P – polityka: https://transparency.meta.com/policies/community-standards/misinformation/ ; W: https://mintface.ai/blog/instagram-ai-content-policy-2026].
- **Fikcyjna persona AI jako twarz marki:** dozwolona, o ile nie podszywa się pod realną osobę (brak zdjęć prawdziwych ludzi jako materiału źródłowego, brak sugestii, że to prawdziwy ekspert/lekarz/doradca) [W: mintface, hookads]. Zalecenie: (1) awatar **stylizowany** (ilustracja/3D, nie fotorealizm) – omija większość reguł o „photorealistic human”; (2) jeśli fotorealistyczny – zawsze włączyć oznaczenie AI w rolkach i nie nadawać mu tytułów zawodowych („dr”, „dietetyk”, „doradca”); (3) w bio i na LP napisać wprost, że „X to wirtualny asystent marki (postać AI)”.
- **AI Act (UE) 2024/1689, art. 50** – obowiązki przejrzystości (m.in. oznaczanie deepfake’ów i treści syntetycznych) **stosuje się od 2 sierpnia 2026** [N – do potwierdzenia: https://eur-lex.europa.eu/eli/reg/2024/1689/oj]. Fikcyjna postać nieprzypominająca realnej osoby raczej nie jest „deepfake”, ale oznaczenie „treść wygenerowana przez AI” jest tanie i usuwa ryzyko. Wpisać do checklisty.

### A6. Nieakceptowalne praktyki biznesowe, wprowadzające twierdzenia, słabe landing pages

- **Unacceptable Business Practices [P – URL]:** https://transparency.meta.com/policies/ad-standards/deceptive-content/unacceptable-business-practices/ – zakaz oszustw, fałszywych/wprowadzających w błąd twierdzeń, „szybkiego bogacenia się”, obietnic gwarantowanych rezultatów, ukrywania istotnych informacji o produkcie [P/N].
- **Low quality or disruptive content [N – URL wg pamięci]:** https://transparency.meta.com/policies/ad-standards/business-assets/low-quality-disruptive-content/ – clickbait, sensacyjny język, „nie uwierzysz…”, ukrywanie informacji, strony docelowe z natrętnymi pop-upami, nadmiarem reklam, niedziałające, „w budowie”, niezgodne z treścią reklamy [N].
- **Landing page – wymagania praktyczne [N]:** strona musi działać na mobile, ładować się szybko, treść zgodna z reklamą, brak automatycznego pobierania pliku, widoczne dane sprzedawcy i regulamin, brak fałszywych liczników/„zostały 3 sztuki” (to także czarna lista w PL: art. 7 pkt 7 ustawy o przeciwdziałaniu nieuczciwym praktykom rynkowym – fałszywa ograniczona dostępność).
- **Dla infoproduktów szczególnie:** nie obiecywać dochodu („zarabiaj 5000 zł z AI”), nie używać „sekret”, „lekarze/banki tego nie chcą”, nie pokazywać fałszywych opinii (Omnibus: art. 7 pkt 24–25 u.p.n.p.r. – fałszywe/niezweryfikowane opinie [N]), nie używać logo/marki OpenAI/ChatGPT jako własnych (znaki towarowe – można wspomnieć opisowo).

### A7. Realia nowego konta reklamowego i nowej strony w PL

| Temat | Co wiadomo | Źródło |
|---|---|---|
| Dzienne limity wydatków nakładane przez Meta | Nowe konta startują z niskim dziennym limitem (źródła wtórne: ok. 25–50 USD/dzień), rosnącym wraz z historią płatności. Przy 300 PLN na 7–10 dni (≈30–45 PLN/dzień) limit nas nie ogranicza. | [P – URL] https://www.facebook.com/business/help/563129151097553 · [P] https://www.facebook.com/business/help/141820733085330 · [W] https://www.admove.ai/blog/new-facebook-ad-account-guide |
| Beneficjent i płatnik (DSA) | Od 10.07.2023 każda reklama kierowana do UE musi mieć wskazanego **beneficjenta** i **płatnika**; bez tego nie opublikujesz reklamy; dane są **publiczne w Bibliotece reklam**. Konsekwencja dla „marki anonimowej”: nazwa płatnika (przy JDG = imię i nazwisko) będzie publiczna. | [W – relacja z komunikatu Meta] https://www.jonloomer.com/beneficiary-and-payer-requirements-for-meta-ads-in-the-european-union/ · https://www.socialmediatoday.com/news/meta-implements-new-updates-eu-advertisers-evolving-requirements/653046/ |
| Weryfikacja domeny / AEM | W czerwcu 2025 Meta usunęła limit 8 zdarzeń i ręczną priorytetyzację; zakładka AEM zniknęła; weryfikacja domeny **nie jest już wymagana** do konfiguracji zdarzeń (nadal przydatna do edycji linków). Zrobić i tak (5 min, rekord DNS). | [W] https://www.jonloomer.com/meta-announces-big-changes-to-website-conversion-campaigns/ · https://segwise.ai/blog/facebook-aggregated-event-measurement |
| Weryfikacja firmy (Business Verification) | Nie jest wymagana do zwykłych reklam; wymagana m.in. przy reklamach finansowych (A3), części API. Może być zażądana w dowolnym momencie po flagowaniu. | [N] |
| Częste wczesne blokady | Konsensus praktyków: nowy fanpage + nowa domena + wrażliwa branża (zdrowie/finanse) + kreacje AI + szybki start budżetu = wysokie ryzyko automatycznego „konto ograniczone”. Mitigacje: kompletny fanpage (avatar, opis, kilka postów), 2FA, karta na nazwisko właściciela konta, brak zmian metody płatności, start od kampanii ruchu/zaangażowania 2–3 dni, brak duplikowania kont, natychmiastowa odpowiedź na prośbę o weryfikację tożsamości. | [W] admove.ai, agrowth.io (j.w.) |
| „Mniej spersonalizowane reklamy” w UE | Od 2026 użytkownicy w UE mają opcję mniej spersonalizowanych reklam (zobowiązania DMA) → część odbiorców niedostępna dla targetowania po zainteresowaniach; szerokie targetowanie + dobra kreacja ważniejsze. | [P] https://digital-markets-act.ec.europa.eu/meta-commits-give-eu-users-choice-personalised-ads-under-digital-markets-act-2025-12-08_en |

---

## B. Prawo polskie dla sprzedaży treści cyfrowych B2C

Uwaga ogólna: **osoba prowadząca działalność nierejestrowaną też jest „przedsiębiorcą” wobec konsumenta** (art. 43¹ k.c., art. 2 ustawy o prawach konsumenta) – wszystkie obowiązki poniżej stosują się w pełni [N].

### B1. Prawo odstąpienia od umowy – treści cyfrowe (ustawa z 30.05.2014 o prawach konsumenta, „UPK”)

Tekst ustawy [P]: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000827 (tekst jednolity). Wygodny podgląd artykułów [W]: https://standardyprawa.pl/akt/51/art/9883

- **Termin:** 14 dni, bez podawania przyczyny (art. 27) [P].
- **Wyjątek dla treści cyfrowych – art. 38 ust. 1 pkt 13** (brzmienie od 1.01.2023, potwierdzone [P/W]): prawo odstąpienia nie przysługuje w odniesieniu do umów *„o dostarczanie treści cyfrowych niedostarczanych na nośniku materialnym, za które konsument jest zobowiązany do zapłaty ceny, jeżeli przedsiębiorca rozpoczął świadczenie za wyraźną i uprzednią zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez przedsiębiorcę utraci prawo odstąpienia od umowy, i przyjął to do wiadomości, a przedsiębiorca przekazał konsumentowi potwierdzenie, o którym mowa w art. 15 ust. 1 i 2 albo art. 21 ust. 1”* (ostatni człon o potwierdzeniu – [N], sprawdzić w tekście jednolitym).
  Trzy warunki łącznie: (1) **wyraźna i uprzednia zgoda** na natychmiastowe dostarczenie, (2) **poinformowanie o utracie prawa** + **przyjęcie do wiadomości**, (3) **potwierdzenie na trwałym nośniku** (e-mail) zawierające informację o tej zgodzie.
- **Potwierdzenie – art. 21 ust. 1–2 [N – brzmienie do sprawdzenia]:** przedsiębiorca przekazuje potwierdzenie zawarcia umowy na trwałym nośniku w rozsądnym czasie, najpóźniej w chwili dostarczenia treści cyfrowej; potwierdzenie zawiera informacje z art. 12 (chyba że przekazano je wcześniej na trwałym nośniku) **oraz informację o zgodzie konsumenta na dostarczenie treści cyfrowych w okolicznościach powodujących utratę prawa odstąpienia**. Sam link do strony WWW nie jest trwałym nośnikiem (TSUE C-49/11 Content Services) [N] → regulamin jako załącznik PDF lub pełna treść w e-mailu.
- **Informacje przedumowne – art. 12 ust. 1 [N – numeracja punktów do sprawdzenia]:** m.in. główne cechy świadczenia (pkt 1), dane identyfikujące przedsiębiorcę: firma, organ rejestrowy, NIP (pkt 2), adres, e-mail, telefon (pkt 3), łączna cena z podatkami (pkt 5), sposób i termin zapłaty i spełnienia świadczenia, procedura reklamacyjna (pkt 8), sposób i termin wykonania prawa odstąpienia oraz **wzór formularza (załącznik nr 2 do UPK)** (pkt 9), **informacja o braku prawa odstąpienia lub okolicznościach jego utraty** (pkt 12), obowiązek dostarczenia treści cyfrowych zgodnych z umową (pkt 13), **funkcjonalność treści cyfrowych oraz techniczne środki ich ochrony** (pkt 19), **kompatybilność i interoperacyjność** (pkt 20).
- **Przycisk zamówienia – art. 17 ust. 3–4 [N]:** przycisk musi być oznaczony „zamówienie z obowiązkiem zapłaty” lub równoważnym jednoznacznym sformułowaniem; „Zapłać 49,00 zł” w Stripe Checkout jest uznawane za równoważne, ale bezpieczniej mieć własny przycisk „Kupuję i płacę” przed przekierowaniem do Stripe.
- **Skutki błędu:**
  - Brak zgody / brak pouczenia / brak potwierdzenia → wyjątek z art. 38 pkt 13 nie działa: konsument **może odstąpić w 14 dni mimo pobrania/używania** i **nie ponosi kosztów** (art. 36 pkt 2 UPK [N]) → pełny zwrot.
  - Brak informacji o prawie odstąpienia w ogóle → termin wydłuża się o **12 miesięcy** (art. 29 ust. 1); jeśli poinformujesz później – 14 dni od poinformowania (art. 29 ust. 2) [P].
  - Naruszenia mogą być praktyką naruszającą zbiorowe interesy konsumentów (UOKiK, kara do 10% obrotu) – dla mikrosprzedawcy realniejsze są zwroty i chargebacki Stripe.

### B2. Zgodność treści cyfrowej z umową (implementacja dyrektywy 2019/770 – Rozdział 5b UPK, art. 43h–43q, od 1.01.2023)

Ustawa zmieniająca [P]: https://orka.sejm.gov.pl/proc9.nsf/ustawy/2425_u.htm (ustawa z 4.11.2022, Dz.U. 2022 poz. 2337). Komentarz do art. 43k [W]: https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/prawa-konsumenta-18105223/art-43-k

Obowiązki sprzedawcy narzędzia webowego / PDF:
1. **Dostarczenie niezwłocznie** po zawarciu umowy, chyba że umówiono inaczej; treść uznaje się za dostarczoną, gdy jest udostępniona konsumentowi/jego urządzeniu (art. 43h) [P/W]. Jeśli nie dostarczono – konsument wzywa, a potem może odstąpić.
2. **Zgodność z umową** (art. 43i–43j) [W/N]: opis, ilość, jakość, funkcjonalność, kompatybilność, interoperacyjność; przydatność do zwykłego celu; zgodność z wersją próbną/zapowiedzią; **obowiązek informowania o aktualizacjach i dostarczania aktualizacji niezbędnych do zachowania zgodności** przez czas rozsądnie oczekiwany (dla dostawy jednorazowej) albo przez okres dostarczania (dla dostawy ciągłej).
3. **Odpowiedzialność 2 lata** za brak zgodności istniejący w chwili dostarczenia, jeśli ujawni się w ciągu 2 lat (dostawa jednorazowa lub częściami – art. 43k ust. 1) [P/W]; domniemanie istnienia wady przy dostawie, jeśli ujawni się w ciągu **1 roku** (ust. 2) [N]; przy dostawie ciągłej – przez cały okres.
4. **Środki ochrony:** najpierw doprowadzenie do zgodności w rozsądnym czasie i bez nadmiernych niedogodności (art. 43l); potem obniżenie ceny lub odstąpienie, gdy naprawa niemożliwa/nieskuteczna/wada istotna (art. 43m); zwrot ceny w 14 dni (art. 43n–43o) [W/N].
5. **Zmiany treści cyfrowej** (art. 43m–43n wg numeracji z ustawy [W]): dopuszczalne tylko, gdy umowa to przewiduje z uzasadnionych przyczyn, bez kosztów; przy zmianie istotnie negatywnej – informacja z wyprzedzeniem na trwałym nośniku i prawo wypowiedzenia w 30 dni; **nie dotyczy treści dostarczanych jednorazowo**. Dla narzędzia webowego z dostępem „na zawsze” lepiej w regulaminie zapisać: dostęp na czas określony (np. 24 mies.) lub jasno opisać zasady aktualizacji.
6. **Reklamacje:** brak odpowiedzi w **14 dni** = uznanie reklamacji (art. 7a UPK) [N]. Wpisać procedurę do regulaminu (e-mail, treść zgłoszenia, termin).
7. Platforma **ODR** UE została wyłączona (lipiec 2025) – nie wpisywać już linku do ec.europa.eu/odr w regulaminie [N – sprawdzić].

### B3. Omnibus – informowanie o obniżkach cen

Ustawa o informowaniu o cenach towarów i usług, **art. 4 ust. 2** (od 1.01.2023) – treść potwierdzona [P/W]: *„W każdym przypadku informowania o obniżeniu ceny towaru lub usługi obok informacji o obniżonej cenie uwidacznia się również informację o najniższej cenie tego towaru lub tej usługi, która obowiązywała w okresie 30 dni przed wprowadzeniem obniżki.”* Ust. 3: dla produktu oferowanego krócej niż 30 dni – najniższa cena od dnia rozpoczęcia oferowania [P/W]. Wyjaśnienia Prezesa UOKiK (2023) z przykładami [P]: https://uokik.gov.pl/dyrektywa-omnibus-najnowsze-wyjasnienia-do-obnizek-cen (streszczenia: https://kpmg.com/pl/pl/home/insights/2023/05/legal-alert-omnibus-ponownie-wyjasnienia-prezesa-uokik-odnosnie-informacji-o-obnizce-ceny.html , https://fepw.parp.gov.pl/component/content/article/86157:oznaczenie-obnizek-cen-w-jaki-sposob-zrobic-to-prawidlowo).

Konsekwencje dla nas:
- **Zakaz „ceny regularnej”, która nigdy nie obowiązywała.** „~~99 zł~~ 49 zł” na nowym produkcie = informowanie o obniżce od fikcyjnej ceny → nieuczciwa praktyka rynkowa (art. 5 u.p.n.p.r.) + naruszenie art. 4 (kara IH do 20 000 zł, do 40 000 zł przy 3 naruszeniach w 12 mies. [W]).
- **Dozwolone:** „Cena premierowa 29 zł. Od 15.10 cena 49 zł” – to zapowiedź podwyżki, nie obniżka; musi być prawdziwa (naprawdę podnieść).
- **Dozwolone:** stała cena 49 zł bez porównań; „w zestawie o wartości X” – tylko jeśli składniki realnie sprzedajemy osobno po tych cenach.
- Jeśli po tygodniach zrobimy promocję: pokazać „Najniższa cena z 30 dni przed obniżką: 49 zł” tuż przy cenie promocyjnej, czytelnie.
- Fałszywe liczniki/„tylko dziś” bez pokrycia = czarna lista (art. 7 pkt 7 u.p.n.p.r.).

### B4. Regulamin, polityka prywatności, RODO (e-mail + Stripe + Meta Pixel), cookies

**Minimum regulaminu** (art. 8 ustawy o świadczeniu usług drogą elektroniczną + art. 12 UPK + Rozdz. 5b UPK) [N – lista autorska na bazie przepisów]: dane sprzedawcy (imię i nazwisko/firma, adres, NIP, e-mail – art. 5 u.ś.u.d.e. i art. 12 pkt 2–3 UPK); opis usługi/treści cyfrowej i wymagania techniczne (przeglądarka, internet, smartfon; art. 8 ust. 3 pkt 2 u.ś.u.d.e.); zawarcie umowy krok po kroku; ceny brutto; płatności (Stripe: karta, BLIK, P24); dostarczenie (link, czas, licencja użytkownika – zakres, brak odsprzedaży); prawo odstąpienia + zgoda + utrata + wzór formularza; zgodność z umową, aktualizacje, odpowiedzialność 2 lata, reklamacje 14 dni; zakaz treści bezprawnych; zmiany regulaminu; prawo właściwe; pozasądowe rozwiązywanie sporów (Rzecznik Konsumentów, IH); wersjonowanie (data, archiwum).

**Polityka prywatności (RODO art. 13):** administrator; cele i podstawy: umowa (art. 6 ust. 1 lit. b – zakup, dostęp), obowiązek prawny (lit. c – podatki, 5 lat), prawnie uzasadniony interes (lit. f – obsługa reklamacji, bezpieczeństwo, statystyka bezcookie’owa), **zgoda (lit. a – newsletter, cookies marketingowe/Pixel)**; odbiorcy: Stripe (płatności; Stripe Payments Europe Ltd, Irlandia + transfer do Stripe Inc. USA – DPF), operator poczty (Resend/MailerLite/Brevo), hosting/VPS, Meta Platforms Ireland (Pixel/CAPI – **współadministrowanie** w zakresie zbierania i przesyłania danych: TSUE C-40/17 Fashion ID, „Controller Addendum” Meta [N]); okresy; prawa; skarga do PUODO; informacja o profilowaniu reklamowym.

**Cookies / Pixel – czy zgoda przed odpaleniem Pixela?** TAK.
- **Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221), art. 399** [P – URL: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221 ; omówienie: https://grantthornton.pl/publikacja/prawo-komunikacji-elektronicznej-a-ochrona-danych-osobowych/ , https://creativa.legal/cookies-jak-wdrozyc-je-zgodnie-z-prawem/]: przechowywanie informacji lub uzyskiwanie dostępu do informacji w urządzeniu końcowym wymaga **uprzedniej zgody** (po informacji o celu), z wyjątkiem cookies niezbędnych do świadczenia usługi żądanej przez użytkownika; **art. 400** – zgoda musi spełniać wymogi RODO (dobrowolna, konkretna, świadoma, jednoznaczna) [P/W]. Pixel Meta = cookie `_fbp` + przesył danych → zgoda konieczna zarówno z PKE, jak i z RODO (cel marketingowy).
- **UODO – „Poradnik e-commerce: pliki cookies i zgody marketingowe” (marzec 2025)** [P – uodo.gov.pl; treść wg streszczeń W: https://www.solveit.pl/jak-prawidlowo-zaprojektowac-baner-cookies-zgody-blokowanie-skryptow-i-wymogi-uodo/ , https://lawup.pl/pliki-cookies-zgody-marketingowe-i-rodo-%E2%80%93-co-musi-wiedziec-kazdy-wlasciciel-sklepu-internetowego-w-2025-roku]: przycisk **„Odrzuć wszystkie” równie łatwy jak „Akceptuj”**; zakaz domyślnie zaznaczonych zgód; **blokowanie skryptów do czasu zgody**; zapowiedziane kontrole w II poł. 2025.
- **UOKiK:** wadliwy baner może być praktyką naruszającą zbiorowe interesy konsumentów (kara do 10% obrotu) [W]. **Konkretnych decyzji UOKiK z karą za banery cookies z lat 2024–2025 nie zweryfikowano w tej sesji** (brak danych). Orzecznictwo WSA: nie każde cookie to dana osobowa [W: https://www.prawo.pl/biznes/wazny-wyrok-wsa-nie-kazde-cookies-jest-dana-osobowa,512328.html] – nie zmienia to obowiązku zgody z PKE.
- Projekt unijnego „Digital Omnibus” (listopad 2025) może w przyszłości poluzować reguły cookies – **nie obowiązuje** [W: https://www.osborneclarke.com/insights/digital-omnibus-reshapes-eu-cookie-rules-leaves-banner-fatigue-largely-intact].
- **Konsekwencja pomiarowa:** część użytkowników odrzuci → Pixel/CAPI nie zobaczą ich zakupów. CAPI bez zgody nie jest obejściem (te same dane, ten sam cel). Rozwiązanie: własny, bezcookie’owy log zakupów po stronie serwera (Stripe webhook) jako źródło prawdy; Meta dostaje tylko zdarzenia użytkowników, którzy się zgodzili.

### B5. VAT, próg zwolnienia, działalność nierejestrowana, Stripe dla osób bez firmy

| Kwestia | Ustalenie | Źródło |
|---|---|---|
| Stawka VAT – **e-book** | **5%** (książka elektroniczna bez dominujących treści wideo/muzycznych; art. 41 ust. 2a + załącznik nr 10 do ustawy o VAT, poz. dot. książek dostarczanych elektronicznie; od 1.11.2019) | [W] https://ksiegowosc.infor.pl/podatki/vat/stawki-vat/303300,Stawka-podstawowa-VAT-na-ebooki-w-Polsce.html · https://sgk.gofin.pl/11,7122,314317,ksiazka-w-wersji-elektronicznej-jaka-stawka-vat.html |
| Stawka VAT – **kurs online / PDF szkoleniowy / dostęp do platformy lub narzędzia webowego** | **23%** (usługa elektroniczna / usługa edukacyjna poza systemem oświaty). WIS-y rozróżniają: „publikacja elektroniczna” (5%) vs „dostęp do platformy” (23%). **Nasze interaktywne narzędzie = 23%.** | [W] https://stonefeather.pl/artykul/aktualnosci/e-book-publikacja-elektroniczna-czy-dostep-do-platformy-nowe-wis-y-pokazuja-istotna-roznice-dla-stawki-vat · https://taxshield.pl/blog/publikacje-cyfrowe-ebooki-szkolenia-kursy-stawka-vat-5-czy-23 |
| Zwolnienie podmiotowe | **200 000 zł** rocznie (art. 113 ust. 1 ustawy o VAT; w pierwszym roku proporcjonalnie – ust. 9). Zwolniony nie nalicza VAT (49 zł = przychód), nie odlicza VAT od kosztów (Meta Ads, narzędzia). **Wyłączenie:** „usługi w zakresie doradztwa” (art. 113 ust. 13 pkt 2 lit. b) → **nie nazywać produktu „doradztwem”**. | [N – tekst ustawy: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20040540535] |
| Sprzedaż do konsumentów w innych krajach UE | Usługi elektroniczne B2C opodatkowane w kraju konsumenta powyżej 10 000 EUR łącznej sprzedaży (OSS). W teście **ograniczyć Checkout do Polski** (Stripe: `billing_address_collection` + walidacja kraju) albo świadomie wejść w OSS. | [N] |
| **Działalność nierejestrowana 2026** | Od 1.01.2026 limit **kwartalny 225% minimalnego wynagrodzenia = 10 813,50 zł/kwartał** (płaca minimalna 4 806 zł); zmiana art. 5 ust. 1 Prawa przedsiębiorców ustawą o uproszczeniach administracyjnych i wsparciu przedsiębiorczości (podpis lipiec 2025). Warunki: brak działalności w ostatnich 60 mies.; obowiązki: ewidencja sprzedaży, PIT-36 („inne źródła”), pełne prawa konsumenta, VAT wg zasad ogólnych (zwolnienie do 200 tys.), kasa fiskalna wg zasad ogólnych. | [P – portal rządowy] https://www.biznes.gov.pl/pl/portal/00115 · [W] https://www.infakt.pl/blog/dzialalnosc-nierejestrowana-nowe-zasady-limitu-w-2026-r/ · https://www.gazetaprawna.pl/firma/artykuly/11187531,dzialalnoscnierejestrowana2026nowylimitprzychodow.html |
| **Stripe w PL dla osoby bez firmy** | Stripe Services Agreement – Poland: do konta uprawnione są **„businesses (including sole proprietors) and non-profit organisations located in Poland”**. Osoba fizyczna bez działalności nie mieści się wprost w tej definicji; działalność nierejestrowana to szara strefa (Stripe może poprosić o NIP/REGON, wstrzymać wypłaty). **Właściciel ma już konto Stripe – sprawdzić, na jaki podmiot/typ jest zarejestrowane, i sprzedawać z tego podmiotu.** | [P] https://stripe.com/legal/ssa/pl · [P – tytuł, treść nieodczytana] https://support.stripe.com/questions/selling-on-stripe-without-a-separate-business-entity |

### B6. Granice sektorowe

**(a) Zdrowie / dieta / sen**
- **Świadczenie zdrowotne** = „działania służące zachowaniu, ratowaniu, przywracaniu lub poprawie zdrowia oraz inne działania medyczne wynikające z procesu leczenia lub przepisów odrębnych” – art. 2 ust. 1 pkt 10 ustawy o działalności leczniczej [P/W: https://www.prawo.pl/zdrowie/podmioty-lecznicze-i-definicje-z-ustawy-o-dzialalnosci-leczniczej,234944.html]. Wykonywanie zawodu lekarza obejmuje badanie, rozpoznawanie chorób, leczenie, udzielanie porad lekarskich (art. 2 ust. 1 ustawy o zawodach lekarza i lekarza dentysty) [N].
- **Granica praktyczna:** treść **ogólna, edukacyjna, jednakowa dla wszystkich** (jak działa sen, higiena snu, protokół światła/kofeiny, przykładowy jadłospis) = publikacja, nie świadczenie zdrowotne. **Indywidualna** ocena stanu konkretnej osoby, „diagnoza” („masz bezsenność”), zalecenie leczenia lub dawkowania, plan „pod Ciebie” po ankiecie zdrowotnej = zbliża się do porady medycznej/dietetycznej i do odpowiedzialności za szkodę. **Interaktywny quiz nie może zwracać diagnozy** – tylko „profil nawyków” i materiał edukacyjny.
- **Oprogramowanie jako wyrób medyczny (MDR 2017/745, art. 2 pkt 1):** aplikacja/strona, której *przeznaczeniem* jest diagnozowanie, monitorowanie, leczenie lub łagodzenie choroby, może być wyrobem medycznym → certyfikacja. Unikać słów „diagnoza”, „leczy”, „terapia”, „monitoruje zaburzenie” w opisie narzędzia [N].
- **Dietetyk – status 2026:** brak odrębnej ustawy; zawód wykreślono z ustawy o niektórych zawodach medycznych (2023); w prywatnej praktyce tytuł nie jest w pełni chroniony; projekt ustawy o zawodzie dietetyka (wersja robocza 18.02.2026) przewiduje ochronę tytułu i samorząd [W: https://dietetykxxiwieku.pl/b/zawod-dietetyk-blog-publikuje-pod-b-zawod-dietetyk/ , https://pzzd.pl/projekt-ustawy-o-zawodzie-dietetyka-i-samorzadzie-zawodowym-aktualnosci-2026/ , https://www.infor.pl/prawo/nowosci-prawne/5766123,logopedzi-i-dietetycy-wykresleni-z-ustawy-o-niektorych-zawodach-medycz.html]. Wniosek: generyczny jadłospis/ebook – OK; **nie tytułować awatara „dietetykiem”**, nie robić indywidualnych diet.
- **Leki i suplementy w treści:** melatonina w PL to lek OTC – wskazywanie jej „na sen” w reklamie = reklama produktu leczniczego (Prawo farmaceutyczne, art. 52 i n.) [N]; oświadczenia zdrowotne o żywności/suplementach tylko z listy dopuszczonych (rozporządzenie (WE) 1924/2006) [N]. W teście: **nie polecać konkretnych leków ani suplementów**.
- Czarna lista praktyk: fałszywe twierdzenie, że produkt leczy choroby, dysfunkcje lub wady rozwojowe – art. 7 pkt 17 u.p.n.p.r. [N].

**(b) Finanse**
- **Doradztwo inwestycyjne – art. 76 ust. 1 ustawy o obrocie instrumentami finansowymi:** przygotowywanie i przekazywanie klientowi **rekomendacji dotyczącej nabycia lub zbycia jednego lub większej liczby instrumentów finansowych** (rekomendacja osobista – oparta na potrzebach klienta lub przedstawiona jako dla niego odpowiednia). **Nie jest** doradztwem rekomendowanie zachowań wobec instrumentów **w ujęciu rodzajowym** (np. „akcje”, „fundusze indeksowe”), lecz konkretnie oznaczonego instrumentu [P: Stanowisko UKNF z 14.02.2020 – https://www.knf.gov.pl/knf/pl/komponenty/img/Stanowisko_UKNF_ws_doradztwa_inwestycyjnego.pdf ; https://www.knf.gov.pl/knf/pl/komponenty/img/DORADZTWO_INWESTYCYJNE_05_09_2013_35555.pdf]. Prowadzenie działalności maklerskiej (w tym doradztwa) bez zezwolenia – sankcje z art. 178 tej ustawy [N].
- **Rekomendacje inwestycyjne „ogólne”** (publiczne, o konkretnych spółkach/instrumentach) podlegają MAR (rozporządzenie 596/2014, art. 3 ust. 1 pkt 34–35; rozporządzenie delegowane 2016/958 – obowiązki ujawnień) [N]. Wniosek: **żadnych nazw konkretnych spółek/ETF-ów/kryptowalut z sugestią „kup/sprzedaj”**; klasy aktywów i mechanizmy (IKE/IKZE, procent składany, budżet, fundusz awaryjny) – OK.
- **KNF – kampania „Finfluencer: dobre praktyki i ryzyka”** [P: https://www.knf.gov.pl/dla_konsumenta/kampanie_informacyjne/Finfluencer_dobre_praktyki_i_ryzyka]: promowanie produktów konkretnej firmy inwestycyjnej wobec konkretnych osób może być działalnością zastrzeżoną dla agenta firmy inwestycyjnej [P/W]. **Bez linków afiliacyjnych do brokerów/pożyczek** w teście (pośrednictwo kredytowe wymaga wpisu do rejestru KNF [N]).
- **Typowe zastrzeżenia** (wzór w pliku legal/00-wymogi.md): treści edukacyjne, nie doradztwo inwestycyjne (art. 76) ani rekomendacja (MAR); ryzyko utraty kapitału; wyniki historyczne nie gwarantują przyszłych; autor nie jest licencjonowanym doradcą; decyzje na własną odpowiedzialność.
- Dodatkowo: nie używać słowa „doradztwo” w nazwie/opisie (VAT art. 113 ust. 13 – B5; klasyfikatory Meta – A3).

**(c) Checklisty budowlane / motoryzacyjne**
- Brak licencji/uprawnień dla treści informacyjnych o odbiorze mieszkania czy oględzinach auta – **potwierdzone brakiem regulacji** (nie znaleziono żadnej; to nie jest usługa rzeczoznawcy ani inspektora). Warto oprzeć checklistę odbioru na **ustawie deweloperskiej z 20.05.2021 (Dz.U. 2021 poz. 1177), art. 41 (odbiór, protokół, wady, terminy)** [N – numer artykułu do sprawdzenia] i na normach wykończenia; przy aucie – na Prawie o ruchu drogowym/ k.c. (rękojmia). Ryzyko prawne: tylko prawa autorskie (nie kopiować cudzych list) i odpowiedzialność za oczywiste błędy merytoryczne (dodać zastrzeżenie „materiał pomocniczy, nie zastępuje rzeczoznawcy”).

### B7. Kasa fiskalna i faktury przy sprzedaży online B2C

- **Rozporządzenie MF z 17.12.2024 w sprawie zwolnień z obowiązku prowadzenia ewidencji sprzedaży przy zastosowaniu kas rejestrujących (Dz.U. 2024 poz. 1902), obowiązuje 1.01.2025–31.12.2027** [P: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001902 ; omówienia W: https://www.ifirma.pl/blog/zwolnienie-z-kasy-fiskalnej-zmiany-2025/ , https://ksiegowosc.infor.pl/wiadomosci/7437422,zwolnienia-z-kasy-fiskalnej-aktualne-przepisy-i-wyjatki-2025.html].
- Dwie drogi zwolnienia:
  1. **Limit obrotu 20 000 zł** rocznie ze sprzedaży na rzecz osób fizycznych (proporcjonalnie w pierwszym roku) – § 3 ust. 1 pkt 1–2 [P/W].
  2. **Zwolnienie przedmiotowe z załącznika** dla **świadczenia usług** na rzecz konsumentów, gdy zapłata w całości wpływa **za pośrednictwem poczty, banku lub SKOK** na rachunek, a **z ewidencji i dowodów zapłaty jednoznacznie wynika, jakiej czynności dotyczyła** (w rozporządzeniu z 2021 r. była to poz. 37; **numer pozycji w wersji 2024 potwierdzić w załączniku**) [P/W]. Treść cyfrowa dostarczana online = usługa elektroniczna → ta pozycja. Płatności przez Stripe (karta/BLIK/P24 → wypłata na konto) są w praktyce interpretacyjnej traktowane jak zapłata przez bank, **pod warunkiem** prowadzenia ewidencji wiążącej każdą wpłatę z zamówieniem i nabywcą (eksport Stripe + własna tabela zamówień) [N – linia interpretacyjna KIS; przy wzroście skali rozważyć interpretację indywidualną].
- **Faktury:** B2C – faktura **na żądanie** zgłoszone w ciągu 3 miesięcy od końca miesiąca sprzedaży (art. 106b ust. 3 ustawy o VAT) [N]; przy zwolnieniu z art. 113 – faktura bez VAT (może zawierać podstawę zwolnienia). **KSeF** (obowiązkowy od 1.02/1.04.2026, mikro od 1.01.2027) **nie obejmuje faktur konsumenckich** – faktury B2C wystawiamy poza KSeF (można dobrowolnie) [N – potwierdzić na podatki.gov.pl]. Paragon Stripe (e-mail „receipt”) **nie jest** fakturą ani paragonem fiskalnym – jest OK jako potwierdzenie płatności, jeśli korzystamy ze zwolnienia z kasy.
- **Ewidencja:** podatnik zwolniony z VAT prowadzi dzienną ewidencję sprzedaży (art. 109 ust. 1 ustawy o VAT) [N]; przy działalności nierejestrowanej – uproszczona ewidencja sprzedaży [P: biznes.gov.pl].

---

## C. Narzędzia (stan darmowych planów – do potwierdzenia w dniu wdrożenia; strony cenowe były zablokowane dla bezpośredniego pobrania)

### C1. Stripe Checkout
- **`optional_items` (order bump / cross-sell w koszyku):** istnieje, dodane w API **2025-03-31.basil**; konfigurowane jak `line_items` (`price`, `quantity`); **maks. 10 pozycji**; obsługuje `adjustable_quantity` (`enabled/minimum/maximum`); **nie działa w trybie `setup`**; **w trybie `payment` nie można dodać pozycji cyklicznej**; cross-sells z katalogu produktów nie pokazują się w sesji z `optional_items`; dostępne też w Payment Links [P: https://docs.stripe.com/payments/checkout/optional-items , https://docs.stripe.com/changelog/basil/2025-03-31/checkout_optional_items , https://docs.stripe.com/payments/checkout/cross-sells].
- **Upsell po zakupie (one-click):** Stripe **nie ma natywnego post-purchase upsellu** dla płatności jednorazowych (strona „upsells” dotyczy subskrypcji) [P: https://docs.stripe.com/payments/checkout/upsells ; W: https://checkoutpage.com/blog/stripe-one-click-upsell]. Opcje: (1) order bump przez `optional_items` (najprostsze, zalecane w teście); (2) na stronie „dziękujemy” drugi Checkout z prefill e-maila (`customer_email`/`customer`) – dwa kliknięcia, działa z BLIK; (3) prawdziwy one-click: `setup_future_usage: 'off_session'` + obciążenie off-session PaymentIntent – tylko karty, ryzyko SCA, więcej kodu [N].
- **Polski język:** `locale: 'pl'` (domyślnie `auto` wg przeglądarki) [N]. **Zgoda na regulamin:** `consent_collection.terms_of_service: 'required'` wyświetla checkbox; wymaga wcześniej ustawionego URL regulaminu w Dashboard (Public details) [N]. **Własne teksty:** `custom_text.terms_of_service_acceptance.message`, `custom_text.submit.message`, `custom_text.after_submit.message` (obsługują link w Markdown) [N]. **Ocena:** checkbox Stripe łączy regulamin i zgodę cyfrową w jedno – lepiej zebrać **osobną** zgodę na utratę prawa odstąpienia na własnej stronie przed przekierowaniem i zapisać ją w bazie + w `metadata` sesji.
- **Paragony e-mail:** Stripe wysyła „receipt” po udanej płatności po włączeniu w Dashboard (tylko tryb live) [N]. **Link:** portfel jednokliknięciowy Stripe, domyślnie włączony w Checkout [N].
- **Opłaty w Polsce** (wg strony cenowej Stripe PL relacjonowanej przez źródła wtórne; potwierdzić na https://stripe.com/en-pl/pricing): karty standardowe EOG **1,5% + 1,00 zł**; karty premium EOG 1,9% + 1 zł; karty UK 2,5% + 1 zł; pozostałe międzynarodowe 3,25% + 1 zł; **BLIK 1,6% + 1 zł**; **Przelewy24 1,9% + 1 zł** [W: https://seomantyczny.pl/stripe-dla-polskich-sklepow-prowizje-blik-2026/ , https://kcmobile.pl/baza-wiedzy/porownania/stripe-vs-payu-porownanie-platnosci/ , https://jflowlabs.pl/wiedza/stripe-dla-polskiej-firmy/]. Uwaga: jedno ze źródeł twierdzi, że Stripe nie ma BLIK natywnie – **to nieaktualne**; BLIK jest natywną metodą w Stripe (docs.stripe.com/payments/blik) [N]. Przy 49 zł: karta ≈ 1,74 zł prowizji (3,5%), BLIK ≈ 1,78 zł.
- **Wypłaty:** pierwsza wypłata zwykle **7 dni** po pierwszej udanej płatności (w wielu krajach Europy 7 dni roboczych), potem domyślny harmonogram rynku (zwykle 3 dni robocze; dla PL potwierdzić w Dashboard → Balance → Payout schedule) [P – support Stripe: https://support.stripe.com/questions/default-payout-speeds-in-europe-and-canada , https://support.stripe.com/questions/waiting-on-your-first-stripe-payout-what-you-need-to-know].

### C2. E-mail
| Narzędzie | Darmowy plan (wg źródeł, 2026) | Uwagi | Źródło |
|---|---|---|---|
| **Resend** (transakcyjne) | 3 000 maili/mies., **100/dzień**, 1 własna domena, logi 30 dni | Idealne do maili „dostęp do produktu”; wymaga rekordów SPF/DKIM; brak newslettera z automatyzacją w darmowym planie (Broadcasts ograniczone) | [P – URL] https://resend.com/pricing · [W] https://nuntly.com/resend-pricing |
| **MailerLite** (newsletter) | Źródła wtórne: od czerwca 2026 **250 subskrybentów i 2 500 maili/mies.** (wcześniej 500 / 12 000); automatyzacje, landing pages, formularze w planie darmowym; logo MailerLite w stopce | **Zweryfikować** – zmiana świeża, źródła wtórne | [P – URL] https://www.mailerlite.com/pricing · https://www.mailerlite.com/help/free-plan-update-faq · [W] https://blog.groupmail.io/mailerlite-free-plan-limits/ |
| **Brevo** | **300 maili/dzień**, do 100 000 kontaktów, branding Brevo; automatyzacje ograniczone w planie darmowym (limit kontaktów w workflow – sprawdzić) | Limit dzienny bywa problemem przy wysyłce do całej listy | [P – URL] https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan · https://www.brevo.com/pricing/ |

Rekomendacja: Resend do maili transakcyjnych (potwierdzenie umowy + dostęp), MailerLite do listy/newslettera (zgoda osobna). Przy 300 PLN budżetu limity darmowe wystarczą.

### C3. Meta Conversions API (CAPI) + status pomiaru w 2026
- Wymagane: ID zestawu danych (Pixel ID), **token dostępu** (System User w Business Settings lub „Generate access token” w Events Manager), zdarzenia z `event_name`, `event_time`, `action_source: 'website'`, `event_source_url`, `user_data` z co najmniej jednym identyfikatorem; dla zdarzeń web Meta wymaga `client_ip_address` i `client_user_agent`, zaleca `fbp`/`fbc`, `em` (SHA-256), `external_id` [N – docs: https://developers.facebook.com/docs/marketing-api/conversions-api/get-started].
- **Deduplikacja:** ten sam `event_name` + ten sam `event_id` w zdarzeniu z Pixela i z serwera (okno ok. 48 h) [N – docs: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events].
- **AEM / weryfikacja domeny:** od czerwca 2025 brak limitu 8 zdarzeń i ręcznej priorytetyzacji; weryfikacja domeny niewymagana do zdarzeń [W: Jon Loomer – j.w.]. Weryfikację domeny i tak zrobić.
- **Zgoda:** CAPI wysyłać tylko dla użytkowników, którzy zaakceptowali cookies marketingowe (B4). Zakup z Stripe (webhook `checkout.session.completed`) → serwer wysyła `Purchase` do CAPI **tylko jeśli** w metadata sesji zapisano `marketing_consent=true` i `fbp/fbc`.
- **Health & wellness:** patrz A2(b) – możliwe zablokowanie Purchase; przygotować zdarzenie niestandardowe o neutralnej nazwie tylko jako pomiar, nie jako obejście polityki.

### C4. Analityka szanująca zgodę (darmowa)
- **Umami** (open source, MIT; self-host: Node + PostgreSQL/MySQL; bez cookies, hashowany identyfikator dzienny) [N: https://umami.is/docs]. **Plausible Community Edition** (AGPL; Docker: Postgres + ClickHouse, ~2 GB RAM; bez cookies) [N: https://plausible.io/docs/self-hosting]. Oba na VPS właściciela = 0 zł. Bezcookie’owe ≠ automatycznie bez RODO (IP/UA to dane osobowe → podstawa: uzasadniony interes, informacja w polityce); wg UODO 2025 analityka nienależąca do „niezbędnych” może wymagać zgody – **konserwatywnie:** Umami/Plausible bez zgody (brak zapisu na urządzeniu), ale z informacją; Meta Pixel/GA – za zgodą.
- **Logowanie first-party:** własna tabela `events` (session_id z URL/serwera, utm_*, krok lejka, order_id, consent_state) – bez cookies, źródło prawdy dla eksperymentu.
- **GA4 – zastrzeżenia:** cookies `_ga` → zgoda z PKE; Consent Mode v2 wymagany do funkcji reklamowych w EOG; historyczne decyzje organów (AT/FR 2022) ws. transferu danych; przy 300 PLN i tak niepotrzebny [N].

### C5. Darmowe narzędzia do AI-awatara / maskotki (po stronie właściciela)
- Canva Free: edytor, szablony, ograniczone kredyty AI (Magic Media / Dream Lab) – limity do sprawdzenia [N: https://www.canva.com/pricing/].
- Generatory obrazu z darmowym limitem dziennym/kredytami (stan może się zmieniać – sprawdzić w dniu użycia) [N]: Microsoft Designer / Bing Image Creator, Leonardo.ai (funkcja spójnej postaci), Ideogram (tekst na obrazie), meta.ai. Wideo z awatarem: HeyGen (darmowy plan z watermarkiem, limit minut) [N] – rolki właściciel robi poza budżetem (DECISIONS.md).
- Zasady: postać **fikcyjna i stylizowana**, wygenerowana od zera (bez zdjęć realnych osób), zapisane prompt/seed dla spójności, oznaczenie „postać AI” w bio/LP (A5).

---

## D. Benchmarki Meta Ads Polska + co realnie kupi 300 PLN

### D1. Dane
| Źródło | Wartości | Data | Uwagi |
|---|---|---|---|
| **Sotrender Trends – Ads Polska** | **CPC 0,94 zł (+20% m/m), CPM 2,49 zł (+11% m/m)** – marzec 2026; sierpień 2024: CPC 0,75 zł, CPM 2,02 zł | 03/2026; 01/2025 | [P] https://www.sotrender.com/trends/ads/poland/ · https://www.sotrender.com/blog/pl/2025/01/reklamowe-podsumowanie-2024-roku-w-ekosystemie-meta/ · **Uwaga:** CPM ~2–2,5 zł jest rażąco niższy niż doświadczenie reklamodawców (10–40 zł) – najpewniej inna metodologia (mediana wszystkich kampanii, w tym zasięgowych) – **do CPM Sotrendera nie kalibrować budżetu**, CPC jest bardziej wiarygodny |
| Agencje PL (kcmobile.pl, 2026) | CPM e-commerce **25–45 zł**, usługi lokalne 15–30 zł; **CPC 0,30–1,50 zł**; CTR feed 0,9–1,5%, Stories 1,5–2,5%, Reels 1,5–3,0% | 2026 | [W] https://kcmobile.pl/baza-wiedzy/facebook-ads/benchmarki-facebook-ads-srednie-wyniki-branze/ |
| Gupta Media (globalne CPM Meta) | Średnia 2025 ≈ 8,15 USD (luty 2025: 7,75 USD; październik 2025: 6,59 USD) | 2025 | [W – relacja] https://www.guptamedia.com/social-media-ads-cost |
| Zbiorcze benchmarki 2026 (globalne) | CPM 14,19 USD (+20% r/r), CTR 1,55%, CPC 0,78 USD; e-commerce: mediana CVR **1,57%** (2025), CPA ≈ 38 USD | 2025/2026 | [W] https://www.get-ryze.ai/blog/meta-ads-cost-benchmarks-by-industry-2026 · https://mhigrowthengine.com/blog/meta-ads-benchmarks-ecommerce-2026/ · https://superscale.ai/learn/meta-ads-benchmarks-by-industry/ |
| Konwersja LP na zimnym ruchu | e-commerce zimny ruch 1,3–3,4%; niskie ceny (<150 USD) do 3–5% wg części źródeł; mediana Meta e-commerce 1,6% | 2025/2026 | [W] https://landerlab.io/blog/landing-page-conversion-rate · https://www.smartinsights.com/ecommerce/ecommerce-analytics/ecommerce-conversion-rates/ |
| Raporty NapoleonCat / Sempai / Semahead / Business Insider PL / Revealbot / WordStream dla PL | **brak danych w tej sesji** (wyszukiwanie nie zwróciło zestawień PL z 2025/2026; strony niepobrane) | – | – |

### D2. Model: co kupi 300 PLN (założenia jawne)
Założenia: zimny ruch PL, mobile, feed + Reels, kreacja przyzwoita; ~70% kliknięć linku kończy się załadowaniem LP; CR liczony od wyświetleń LP; cena 49 zł brutto.

| Scenariusz CPC | Kliknięcia (300 zł) | Wyświetlenia LP (×0,7) | Zakupy przy CR 1% | CR 2% | CR 3% |
|---|---|---|---|---|---|
| 0,75 zł (bardzo dobra kreacja, Sotrender 2024) | 400 | 280 | 2,8 | 5,6 | 8,4 |
| 1,25 zł (dobry wynik) | 240 | 168 | 1,7 | 3,4 | 5,0 |
| 2,00 zł (typowo dla nowego konta i kampanii konwersji) | 150 | 105 | 1,1 | 2,1 | 3,2 |
| 3,00 zł (słaba kreacja / wąska grupa) | 100 | 70 | 0,7 | 1,4 | 2,1 |

- Przychód netto na sztukę: **VAT-owiec** 49/1,23 = 39,84 zł − prowizja Stripe ≈ 1,74 zł → **≈ 38,1 zł**; **zwolniony z VAT** 49 − 1,74 → **≈ 47,3 zł**.
- **Próg zwrotu 300 zł:** ≈ 7,9 sprzedaży (VAT-owiec) lub ≈ 6,3 (zwolniony) → osiągalny tylko przy CPC ≤ ~1 zł **i** CR ≥ 2–3%. Realistyczny wynik testu: **1–6 zakupów**.
- **Wniosek statystyczny:** przy 1–6 zakupach nie odróżnimy CR 1% od 3% (przedziały ufności nakładają się). Test mierzy sygnał: CTR, koszt wyświetlenia LP, % przejść LP→Checkout, % ukończenia Checkout, CPC. To zgodne z briefem („budżet na sygnał”).
- Faza uczenia Meta (~50 zdarzeń optymalizacji/tydzień) jest nieosiągalna → optymalizować pod **Landing Page Views** lub **InitiateCheckout** (jeśli dostępne), nie pod Purchase; zakupy liczyć po stronie Stripe/serwera.

---

## E. Werdykt dla kierunków (5 = bezpiecznie, 1 = wysokie ryzyko)

| Kierunek | Ryzyko polityk reklam | Ryzyko prawne | Ryzyko Pixel/optymalizacji | Uzasadnienie (1 zdanie) |
|---|---|---|---|---|
| **A. AI dla nietechnicznych** | **5** | **5** | **5** | Brak kategorii wrażliwej i regulacji sektorowej; jedyne pułapki to obietnice zarobku („zarabiaj z AI” → unacceptable business practices) i oznaczanie treści AI, które i tak robimy. |
| **B. Sen / energia / biohacking** | **2** | **3** | **1–2** | Reklamy nie mogą pytać o sen/zdrowie odbiorcy (personal attributes), brak „przed/po” i obietnic; edukacja jest legalna, ale dataset prawdopodobnie trafi do „Health & Wellness” → **prawdopodobny brak optymalizacji pod Purchase** i utrudniony pomiar; quiz nie może „diagnozować”. |
| **C. Finanse osobiste (edukacja)** | **2** (inwestowanie) / **3** (budżet) | **3–4** | **4** | Meta w PL zapowiedziała weryfikację **100% reklamodawców usług finansowych** (IX 2026) – kurs o inwestowaniu z dużym prawdopodobieństwem utknie w weryfikacji; prawnie edukacja jest OK poza rekomendacjami konkretnych instrumentów (art. 76, MAR); wariant „budżet domowy/oszczędzanie” jest wyraźnie bezpieczniejszy niż „inwestowanie”. |
| **D. Checklisty (odbiór mieszkania; używane auto)** | **4** (mieszkanie) / **5** (auto) | **5** | **5** | Brak regulacji; ryzyko to tylko możliwa automatyczna klasyfikacja checklisty mieszkaniowej jako „housing” (utrata precyzyjnego targetowania, nie zakaz); pixel czysty. |

**Rekomendacja z perspektywy polityk/prawa:** A > D (auto) ≈ D (mieszkanie) > C (budżet) > C (inwestycje) ≈ B. Jeśli zespół wybierze B lub C, koniecznie: (B) przygotować pomiar niezależny od Meta, język czysto edukacyjny, przetestować kategoryzację datasetu przed wydaniem budżetu; (C) unikać słów „inwestuj/zysk/ETF/akcje/krypto” w reklamie i na LP, wybrać wariant „budżet domowy”.

---

## Źródła – lista zbiorcza (data dostępu 2026-09-28; strony oznaczone „niepobrana” były zablokowane przez sieć – treść oparta o streszczenia wyszukiwarki i źródła wtórne)
Meta: https://transparency.meta.com/policies/ad-standards/ · https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/ · https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/ · https://transparency.meta.com/policies/ad-standards/deceptive-content/unacceptable-business-practices/ · https://www.facebook.com/business/help/298000447747885 · https://www.facebook.com/business/help/467621355878794 · https://www.facebook.com/business/help/563129151097553 · https://www.facebook.com/business/help/141820733085330 · https://about.fb.com/news/2026/09/prostujemy-fakty-o-walce-z-oszukanczymi-reklamami-w-polsce/ · https://about.fb.com/news/2025/07/ending-political-electoral-and-social-issue-advertising-in-the-eu/ · https://digital-markets-act.ec.europa.eu/meta-commits-give-eu-users-choice-personalised-ads-under-digital-markets-act-2025-12-08_en
Prawo PL/UE: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20140000827 · https://orka.sejm.gov.pl/proc9.nsf/ustawy/2425_u.htm · https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221 · https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001902 · https://uokik.gov.pl/dyrektywa-omnibus-najnowsze-wyjasnienia-do-obnizek-cen · https://www.biznes.gov.pl/pl/portal/00115 · https://www.knf.gov.pl/knf/pl/komponenty/img/Stanowisko_UKNF_ws_doradztwa_inwestycyjnego.pdf · https://www.knf.gov.pl/dla_konsumenta/kampanie_informacyjne/Finfluencer_dobre_praktyki_i_ryzyka · https://eur-lex.europa.eu/eli/reg/2024/1689/oj
Stripe/narzędzia: https://docs.stripe.com/payments/checkout/optional-items · https://docs.stripe.com/changelog/basil/2025-03-31/checkout_optional_items · https://stripe.com/en-pl/pricing · https://stripe.com/legal/ssa/pl · https://support.stripe.com/questions/default-payout-speeds-in-europe-and-canada · https://resend.com/pricing · https://www.mailerlite.com/pricing · https://www.brevo.com/pricing/ · https://umami.is/docs · https://plausible.io/docs/self-hosting
Wtórne (agencje/kancelarie), użyte z ostrożnością: wymienione inline przy twierdzeniach.
