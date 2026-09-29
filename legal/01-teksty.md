# 01 · Teksty prawne sklepu Odhacz – co gdzie jest i co uzupełnić (v1, 2026-09-28)

Ten plik jest instrukcją dla właściciela. Same dokumenty leżą w `platform/public/legal/` (regulamin, polityka prywatności, „O marce i o Haczu”, archiwum wersji) oraz w `platform/emails/` (e-mail z dostępem = potwierdzenie zawarcia umowy). Wymogi i źródła: `legal/00-wymogi.md`. Miejsca niepewne są oznaczone w plikach komentarzem `<!-- DO WERYFIKACJI: … -->` i zebrane w sekcji 8.

## 0. Co powstało

| Plik | Rola |
|---|---|
| `platform/public/legal/regulamin.html` | Regulamin **v1 z 28.09.2026** – 14 paragrafów + załącznik 1 (wzór formularza odstąpienia, zał. nr 2 UPK) + załącznik 2 (wzór reklamacji/gwarancji) |
| `platform/public/legal/polityka-prywatnosci.html` | Polityka prywatności **i cookies** (administrator, cele/podstawy, odbiorcy: Stripe, Resend, VPS, Meta – współadministrowanie, transfery, tabela cookies, prawa, UODO) |
| `platform/public/legal/o-marce.html` | „O marce i o Haczu”: kto prowadzi markę, Hacz = postać AI (nie ekspert), ilustracje generowane cyfrowo |
| `platform/public/legal/archiwum.html` | Archiwum wersji regulaminu i polityki (tabela: wersja, od–do, co się zmieniło, link) |
| `platform/public/legal/legal.css` | Wspólny arkusz (kolory/fonty marki użyte oszczędnie; bez ładowania czcionek z Google – zero żądań do podmiotów trzecich) |
| `platform/emails/delivery.html`, `delivery.txt` | E-mail z dostępem + **potwierdzenie zawarcia umowy na trwałym nośniku** (art. 21 UPK): numer i data zamówienia, tabela produktów z cenami, sposób płatności, okres dostępu, wymagania techniczne, **blok o zgodzie na natychmiastowe dostarczenie**, gwarancja, reklamacje, faktura na życzenie, dane sprzedawcy, stopka transakcyjna |
| `platform/src/config.js` (`DEFAULT_TERMS_TEXT`), `platform/.env.example` | Finalny tekst zgody w Stripe Checkout (sekcja 2) |

Stopka każdej strony prawnej linkuje: Sklep · Regulamin · Polityka · O marce · Archiwum · **„Ustawienia cookies”** (przycisk wywołuje `Consent.show()` – baner pojawia się ponownie).

## 1. Placeholdery do uzupełnienia (przed publikacją – `grep -r "\[\[" platform/public/legal platform/emails` ma zwrócić 0 wyników)

| Placeholder | Co wpisać | Gdzie występuje |
|---|---|---|
| `[[SPRZEDAWCA_NAZWA]]` | imię i nazwisko / firma **podmiotu z konta Stripe** (ten sam podmiot = płatnik/beneficjent w Meta Ads) | regulamin § 1, § 14, stopki; polityka pkt 1; o-marce; archiwum; oba szablony e-maila |
| `[[SPRZEDAWCA_ADRES]]` | ulica, kod, miasto (adres do korespondencji, reklamacji i odstąpień; może być wirtualne biuro) | jw. |
| `[[NIP]]` | NIP (przy działalności nierejestrowanej: NIP osoby fizycznej; jeśli go nie ma – zamień etykietę na „PESEL” po konsultacji z księgową) | jw. |
| `[[EMAIL_KONTAKT]]` | e-mail do kontaktu, reklamacji, gwarancji, RODO (ten sam co `EMAIL_REPLY_TO` w `.env`) | jw. + załączniki regulaminu |
| `[[TELEFON]]` | telefon (zalecany – art. 12 ust. 1 pkt 3 UPK); jeśli nie chcesz podawać, usuń całą linię „telefon: …” we wszystkich plikach | regulamin § 1, polityka pkt 1, o-marce, e-maile |
| `[[HOSTING]]` | nazwa i kraj dostawcy VPS, np. „Hetzner Online GmbH, Niemcy” – serwer **musi być w EOG** | polityka pkt 4 |

Dodatkowo w `.env`: `SITE_NAME=Odhacz` (trafia też do tekstu zgody: „gwarancja zwrotu Odhacz”), `EMAIL_FROM=Odhacz <hej@TWOJA-DOMENA>`, `EMAIL_REPLY_TO=[[EMAIL_KONTAKT]]`; `CHECKOUT_TERMS_TEXT` i `CHECKOUT_SUBMIT_TEXT` zostaw puste (domyślne teksty są w kodzie).

## 2. Tekst zgody w Stripe Checkout (`CHECKOUT_TERMS_TEXT`, domyślny w `src/config.js`)

Jedno pole, **wymagane, domyślnie odznaczone** (Stripe `consent_collection.terms_of_service: 'required'`). Stripe zapisuje zaznaczenie w sesji (`consent.terms_of_service = 'accepted'`) – e-mail potwierdzający czyta tę wartość i na jej podstawie wybiera wariant bloku o odstąpieniu. Tekst (~460 znaków z domeną; limit Stripe 1200; linki Markdown renderuje Stripe; `{BASE_URL}` i `{SITE_NAME}` podmienia kod):

> Akceptuję [Regulamin]({BASE_URL}/legal/regulamin.html) i [Politykę prywatności]({BASE_URL}/legal/polityka-prywatnosci.html). Żądam dostarczenia treści cyfrowej od razu po zapłacie, wyrażam na to wyraźną zgodę i przyjmuję do wiadomości, że z chwilą dostarczenia tracę ustawowe prawo odstąpienia od umowy w terminie 14 dni (art. 38 ust. 1 pkt 13 ustawy o prawach konsumenta). Niezależnie od tego przysługuje mi 14-dniowa gwarancja zwrotu {SITE_NAME} opisana w Regulaminie.

Dlaczego tak: kolejność „akceptacja → żądanie/zgoda → skutek → gwarancja” sprawia, że ostatnie zdanie przed „Zapłać” nie jest wyłącznie utratą prawa. Przesłanki art. 38 ust. 1 pkt 13 UPK: (1) **żądanie + wyraźna zgoda** na natychmiastowe rozpoczęcie (słowa „wyrażam na to wyraźną zgodę” celowo powtarzają brzmienie ustawy – samo „żądam” też by się broniło, ale zwrot ustawowy zamyka dyskusję), (2) **poinformowanie o utracie prawa i przyjęcie do wiadomości**, (3) potwierdzenie na trwałym nośniku = e-mail (sekcja 5). Zdanie o gwarancji jest informacją o zobowiązaniu sprzedawcy (gwarancja handlowa), nie warunkiem zgody – dokładnie ten sam tekst jest zacytowany w § 4 regulaminu, a gwarancja opisana w § 9 („Gwarancja zwrotu 14 dni”): jak zgłosić (e-mail z numerem zamówienia), termin (14 dni od zakupu), zwrot na tę samą metodę płatności w 14 dni.

Tekst nad przyciskiem płatności (`CHECKOUT_SUBMIT_TEXT`, domyślny w `src/config.js`): „Dostęp wyślemy od razu na e-mail. 14 dni gwarancji zwrotu.”

**Uwaga Stripe:** `consent_collection.terms_of_service` wymaga wpisania adresu regulaminu w Dashboard → Settings → Business → Public details → „Terms of service URL” (`https://DOMENA/legal/regulamin.html`) i polityki prywatności („Privacy policy URL”). Bez tego tworzenie sesji zwraca błąd API.

## 3. Snippety prawne na landing (`platform/public/index.html`)

### 3.1 Linia ceny (wybierz wariant wg statusu VAT – checkpoint właściciela)

- **Wariant A – zwolnienie podmiotowe z VAT (art. 113 ust. 1 ustawy o VAT):**
  `39 zł · jednorazowo · cena końcowa, bez ukrytych opłat` · dodatek: `+19 zł` · razem `58 zł`.
- **Wariant B – czynny podatnik VAT (narzędzie webowe = 23%):**
  `39 zł brutto (w tym 23% VAT: 7,29 zł) · jednorazowo` · dodatek: `+19 zł brutto (w tym 23% VAT: 3,55 zł)` · razem `58 zł brutto (w tym VAT 10,85 zł)`. Netto: 31,71 zł / 15,45 zł / 47,15 zł.
- Zawsze: cena widoczna **przed** przyciskiem, bez przekreślonych „cen regularnych”, bez liczników czasu. Jeśli kiedyś obniżysz cenę – obok podaj „Najniższa cena z 30 dni przed obniżką: … zł”. Wolno napisać „Cena premierowa 39 zł, od [data] 49 zł” **tylko** jeśli naprawdę podniesiesz.

### 3.2 Informacja przed zakupem o natychmiastowej dostawie (art. 12 ust. 1 pkt 12 UPK) – tuż przy przycisku „Kupuję”

> Dostęp od razu po opłaceniu – link na ekranie i e-mailem. W formularzu płatności zaznaczysz, że chcesz dostać treść cyfrową natychmiast; przez to tracisz ustawowe prawo odstąpienia od umowy w 14 dni (art. 38 ust. 1 pkt 13 ustawy o prawach konsumenta). W zamian masz naszą 14-dniową gwarancję satysfakcji: nie pomogło – oddajemy pieniądze.

Wersja krótka (mobile, pod CTA): „Dostęp natychmiast po płatności · zgoda na natychmiastowe dostarczenie = brak 14-dniowego prawa odstąpienia · w zamian 14-dniowa gwarancja satysfakcji”.

Zdanie pod przyciskiem (już jest w placeholderze, zostaw): „Płatność obsługuje Stripe (karta, BLIK, Przelewy24, Link). Kupując, akceptujesz [regulamin] i [politykę prywatności].”

### 3.3 Gwarancja (spójnie z § 9 regulaminu)

> **14-dniowa gwarancja zwrotu („gwarancja spokojnej głowy”).** Jeśli narzędzie Ci nie pomogło, napisz do nas w ciągu 14 dni od zakupu – oddajemy pieniądze na tę samą metodę płatności, bez pytań. To dobrowolna gwarancja handlowa; nie ogranicza Twoich praw z ustawy (§ 9 regulaminu).

### 3.4 Stopka (HTML)

```html
<footer>
  <p>[[SPRZEDAWCA_NAZWA]] · [[SPRZEDAWCA_ADRES]] · NIP [[NIP]] · <a href="mailto:[[EMAIL_KONTAKT]]">[[EMAIL_KONTAKT]]</a></p>
  <nav>
    <a href="/legal/regulamin.html">Regulamin</a> ·
    <a href="/legal/polityka-prywatnosci.html">Polityka prywatności i cookies</a> ·
    <a href="/legal/o-marce.html">O marce i o Haczu</a> ·
    <button type="button" onclick="Consent.show()">Ustawienia cookies</button>
  </nav>
  <p>Płatności: Stripe (karta, BLIK, Przelewy24, Link). Ceny końcowe w zł. Materiał edukacyjny i pomocniczy – nie zastępuje mechanika ani rzeczoznawcy.</p>
  <p>Ilustracje i postać Hacza zostały wygenerowane i zaprojektowane cyfrowo (z użyciem AI). Hacz — przewodnik marki, postać stworzona z pomocą AI, nie ekspert; w narzędziu nie działa sztuczna inteligencja.</p>
  <p>© 2026 Odhacz</p>
</footer>
```

### 3.5 Oznaczenie AI (jeśli nie w stopce, to przy pierwszym wystąpieniu Hacza)

„Hacz — przewodnik Odhacz. Postać i ilustracje stworzone z pomocą AI.” W bio FB/IG/TikTok: „Hacz to przewodnik marki Odhacz – postać stworzona z pomocą AI, nie mechanik”. Nigdy „asystent AI”: w produkcie nie działa AI.

## 4. Zastrzeżenie produktu (disclaimer) – na landingu (sekcja FAQ/„Czym to nie jest”) **i** w narzędziu (ekran „O narzędziu” + stopka aplikacji) **i** w § 3.3 regulaminu (już jest)

Wersja pełna (LP + ekran „O narzędziu”):

> Odhacz Auto to materiał pomocniczy o charakterze edukacyjnym i informacyjnym, opracowany na podstawie powszechnie dostępnej wiedzy i praktyki oględzin używanych samochodów. **Nie zastępuje przeglądu u mechanika, opinii rzeczoznawcy ani – w razie sporu ze sprzedawcą – porady prawnej.** Nie wycenia napraw i nie gwarantuje wykrycia każdej wady; efekt zależy od Twojej sytuacji i staranności. Podpowiada za to, kiedy zawołać mechanika. Hacz to postać AI, nie mechanik. Część „Po zakupie” (umowa, PCC-3, rejestracja, OC) odzwierciedla stan prawny na 28.09.2026 – przed załatwieniem formalności sprawdź aktualne wymagania.

Wersja krótka (stopka aplikacji, jedna linia): „Materiał pomocniczy, nie ekspertyza. Nie zastępuje mechanika ani rzeczoznawcy. Hacz to postać AI. Stan prawny: 28.09.2026.”

Zasady treści (z `00-wymogi.md` sekcja 8): nie używać słowa „doradztwo” (VAT art. 113 ust. 13 + klasyfikatory Meta), nie obiecywać „wykryjesz każdą wadę”, nie podawać wycen napraw jako pewnych, nie kopiować cudzych checklist.

## 5. E-mail potwierdzający (trwały nośnik) – co robi kod

- Wysyłany raz, natychmiast po `checkout.session.completed` (i ze strony sukcesu, jeśli webhook się spóźni). Przycisk dostępu na górze, potem potwierdzenie umowy.
- Zmienne dostarczane przez `src/fulfillment.js` → `src/email.js`: `order_id` (numer = id pierwszego wiersza zamówienia, np. `000012`), `order_date` = czas potwierdzenia płatności w czasie polskim (to zarazem `consent_ts` i `delivered_at` – zgoda jest kliknięciem sekundy wcześniej, e-mail i strona sukcesu = dostarczenie), `items_table` (nazwa + opis z `products.json` + cena), `amount` (razem brutto), `payment_method` (ogólnie „płatność online przez Stripe…”; dokładna metoda jest na paragonie Stripe), `withdrawal_block`.
- **Blok o odstąpieniu ma dwa warianty:** (A) gdy Stripe zapisał `consent.terms_of_service = 'accepted'` → tekst w duchu projektu z `00-wymogi.md` pkt 5.4 („…wyraziłeś/-aś wyraźną zgodę… tracisz prawo odstąpienia (art. 38 ust. 1 pkt 13)… Treść dostarczona … wraz z tym e-mailem… prawo odstąpienia nie przysługuje… nie ogranicza to reklamacji ani gwarancji”); (B) gdy zgody brak/nieznana → pouczenie o 14 dniach + jak odstąpić + link do formularza (bezpieczny domyślny wariant). Wariant testują `tests/unit/email.test.js` i `fulfillment.test.js`.
- Do zrobienia ręcznie: placeholdery `[[…]]`; jeśli jesteś czynnym VAT-owcem, dopisz w szablonie przy „Razem zapłacono” frazę „(w tym 23% VAT)”; przy nowej wersji regulaminu zmień „wersja v1 z 28.09.2026”.
- SHOULD (nie zrobione w kodzie): załącznik PDF z regulaminem w wersji z dnia zakupu. Dziś e-mail zawiera w treści wszystkie informacje z art. 12/21 UPK + link do konkretnej wersji i archiwum; PDF można dodać w `mailer.send` (Resend obsługuje `attachments`).

## 6. Zmiany w kodzie platformy (etap prawny, 2026-09-28)

1. `src/config.js` – nowy `DEFAULT_TERMS_TEXT` i `DEFAULT_SUBMIT_TEXT` (sekcja 2), podmiana `{BASE_URL}`/`{SITE_NAME}`; `.env.example` i README – udokumentowane.
2. `src/email.js` – nowe zmienne i dwa warianty bloku o odstąpieniu; `src/fulfillment.js` – `orderInfo()` (numer, data, kwota, zgoda z sesji Stripe zapisana w `fulfillments.metadata` jako `_consent_tos`), temat e-maila z numerem zamówienia; `src/mock.js` – mock ustawia `consent.terms_of_service='accepted'` (checkbox wymagany).
3. **Meta tylko za zgodą (MUST z `00-wymogi.md` sekcja 7):** `shop.js` wysyła `marketing_consent` → `server.js` waliduje → `stripe.js` zapisuje w `metadata` → `fulfillment.js` wysyła CAPI **tylko gdy `true`**. `analytics.js`: cookie `_fbc` z `fbclid` zapisywane dopiero po zgodzie; decyzja z banera logowana jako zdarzenie `cookie_consent` (dowód zgody). `consent.js`: baner wspomina Pixel **i** Conversions API, zapisuje znacznik czasu decyzji, „Odrzucam” usuwa `_fbp`/`_fbc`.
4. Testy: nowy `tests/unit/email.test.js`; rozszerzone `fulfillment.test.js`, `stripe.test.js`, `config.test.js`; `helpers.js` (sesja z `consent` i `marketing_consent`). Testy jednostkowe i e2e odczytują ceny/nazwy z `config/products.json` zamiast wartości na sztywno (po zmianie oferty na 39/19 zł stare asercje padały).

## 7. Checklista „przed startem” (10 linii)

1. ☐ Uzupełnij wszystkie `[[placeholdery]]` (sekcja 1) i sprawdź `grep -r "\[\[" platform/public/legal platform/emails` → 0 wyników.
2. ☐ Ustal status VAT → wariant linii ceny (3.1), dopisek w § 5 regulaminu i w e-mailu; faktura na życzenie w 3 miesiące (art. 106b ust. 3 ustawy o VAT), B2C poza KSeF (potwierdź).
3. ☐ Stripe Dashboard: Terms of service URL + Privacy policy URL (Public details), włącz BLIK/Przelewy24/Link, włącz receipts, branding z nazwą „Odhacz” i opisem na wyciągu.
4. ☐ Zakup testowy (klucz testowy): w e-mailu jest numer zamówienia, ceny, blok „prawo odstąpienia nie przysługuje” z datą (nie „Masz prawo odstąpić…”), stopka sprzedawcy; strona sukcesu pokazuje link; link działa na telefonie.
5. ☐ `.env`: `SITE_NAME=Odhacz`, `EMAIL_REPLY_TO=[[EMAIL_KONTAKT]]`, `CHECKOUT_SUBMIT_TEXT`; DNS Resend (SPF/DKIM/DMARC) zweryfikowany.
6. ☐ Polityka: wpisz `[[HOSTING]]` (EOG); sprawdź DPA Resend (podstawa transferu do USA / region UE); jeśli landing ładuje Google Fonts – dodaj wiersz w pkt 4 polityki albo hostuj czcionki lokalnie (zalecane).
7. ☐ Test banera na telefonie: przed „Akceptuję” **zero** żądań do `facebook.com`/`connect.facebook.net` (DevTools → Network), po „Odrzucam” brak `_fbp`/`_fbc`; w stopce landingu działa „Ustawienia cookies”; zdarzenie `cookie_consent` widać w `/admin/export.csv`.
8. ☐ Meta: beneficjent i płatnik (DSA) = podmiot z § 1 regulaminu; bio „Hacz — przewodnik Odhacz, postać stworzona z pomocą AI”; brak zdań o cechach odbiorcy w reklamach.
9. ☐ Ewidencja i retencja: comiesięczny eksport zamówień (`/admin/export.csv` + CSV ze Stripe) do własnej ewidencji; kopia `data/`; skasowanie zdarzeń analitycznych starszych niż 24 mies., logów po 30 dniach, postępu 90 dni po końcu dostępu (ręcznie/cron – polityka to obiecuje).
10. ☐ Zapisz regulamin v1 jako PDF (Drukuj → PDF) do własnego archiwum; każda zmiana = v2 + wiersz w `archiwum.html` + poprzednia wersja pod `/legal/archiwum/regulamin-v1.html` + zmiana „wersja v1” w szablonach e-mail + e-mail do klientów w trakcie dostępu 14 dni wcześniej.

## 8. DO WERYFIKACJI (zebrane z komentarzy w plikach)

- **Numeracja art. 43h–43o UPK** (dostarczenie, zgodność/aktualizacje, 2 lata, naprawa, obniżka/odstąpienie, zwrot 14 dni, zmiany treści) – potwierdzona w streszczeniach źródeł, nie w tekście jednolitym; sprawdzić w ISAP (Dz.U. 2024 poz. 1796).
- **Brzmienie załącznika nr 2 UPK** (formularz odstąpienia) po nowelizacji 2022 – użyto wariantu z „towarów” i „o dostarczanie treści cyfrowej lub usługi cyfrowej”.
- **Statystyki własne bez zgody** (localStorage + cookie `vid`): UODO traktuje analitykę jako wymagającą zgody (art. 399 PKE). Polityka opisuje uzasadniony interes; opcja zachowawcza = wysyłać `/api/events` dopiero po zgodzie (README platformy).
- Numery infolinii konsumenckiej (nie wpisane – potwierdzić na uokik.gov.pl), status faktur B2C poza KSeF, numer pozycji zwolnienia z kasy fiskalnej (Dz.U. 2024 poz. 1902).
- Zespół produktu: czy narzędzie działa offline po pierwszym otwarciu i czy zdjęcia są tylko na urządzeniu (§ 3.4–3.5 regulaminu, tabela cookies).
- Resend: podstawa transferu do USA (SCC/DPF) i region UE; Google Fonts na landingu (odbiorca Google LLC).
- „Zakup bez rezygnacji z prawa odstąpienia” (§ 4 pkt 2, § 8 pkt 5) – właściciel obsługuje ręcznie (np. link płatności Stripe + dostarczenie po 14 dniach); jeśli nie chce, usunąć te dwa zdania.
- `payment_method` w e-mailu jest ogólny (dokładna metoda na paragonie Stripe); można rozszerzyć `retrieveSession` o `payment_intent.latest_charge` – nieprzetestowane na żywym Stripe, celowo nie włączone.
- Sprzedaż tylko do PL vs VAT OSS (00-wymogi sekcja 4) – regulamin nie ogranicza terytorium; decyzja właściciela.
- Załącznik PDF z regulaminem do e-maila (SHOULD).
