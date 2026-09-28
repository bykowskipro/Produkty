# Konta i dostępy — instrukcja dla właściciela (Checkpoint 3)

Zasada: sekrety (klucze, tokeny) wpisujesz **tylko do pliku `.env` na serwerze**. Do mnie wysyłasz wyłącznie rzeczy publiczne (nazwa domeny, Pixel ID, adres strony FB). Nigdy nie wklejaj kluczy na czacie.

Załóż **jeden nowy adres e-mail marki** (np. na własnej domenie po jej kupnie albo tymczasowo Gmail) i używaj go do wszystkich kont poniżej. Wszędzie włącz 2FA.

## 1. Domena (10 min)
1. Kup domenę (propozycje dostanę Ci po wyborze marki; sprawdź dostępność, weź `.pl` lub `.com`).
2. W panelu DNS dodaj rekord **A** → adres IP Twojego VPS (dla `@` i `www`).
3. Wyślij mi: nazwę domeny. Nic więcej.

## 2. VPS (10 min)
1. Zainstaluj Docker + Docker Compose (Ubuntu: `curl -fsSL https://get.docker.com | sh`).
2. Otwórz porty 80 i 443.
3. Dalsze kroki są w `ops/DEPLOY.md` (skopiuj repo, wypełnij `.env`, `docker compose up -d`).

## 3. Stripe (15 min) — masz konto, więc tylko konfiguracja
1. Ustawienia → **Metody płatności**: włącz karty, **BLIK**, **Przelewy24** (to standard w Polsce; sama karta obniża konwersję).
2. Ustawienia → **Branding**: logo, kolor (dostaniesz z `brand/`), nazwa publiczna, e-mail wsparcia, opis na wyciągu (statement descriptor).
3. Ustawienia → **E-maile klientów**: włącz paragony (receipts) po udanej płatności.
4. Developers → **API keys**: klucz testowy i produkcyjny → do `.env` (`STRIPE_SECRET_KEY`).
5. Developers → **Webhooks** → Add endpoint: `https://TWOJA-DOMENA/webhook/stripe`, zdarzenia: `checkout.session.completed`, `checkout.session.async_payment_succeeded` → skopiuj **signing secret** → `.env` (`STRIPE_WEBHOOK_SECRET`).
6. Najpierw robimy wszystko w trybie testowym (karta `4242 4242 4242 4242`), potem przełączamy klucze na produkcyjne.

## 4. E-mail transakcyjny — Resend (10 min, darmowy plan)
1. Załóż konto na resend.com (e-mail marki).
2. Domains → Add domain → dodaj podane rekordy DNS (DKIM, SPF, MX dla zwrotów) w panelu domeny → poczekaj na "Verified".
3. API Keys → utwórz klucz → `.env` (`RESEND_API_KEY`), adres nadawcy np. `hej@TWOJA-DOMENA` → `.env` (`EMAIL_FROM`).

## 5. Meta (30–40 min) — konto reklamowe, strona, Instagram, Pixel
Potrzebujesz prawdziwego konta osobistego na Facebooku (Meta nie pozwala na fikcyjne profile osobiste; marka i AI-awatar żyją na **Stronie**, nie na profilu).
1. Wejdź na business.facebook.com → utwórz **Portfolio firmowe** (nazwa marki).
2. Utwórz **Stronę na Facebooku** (nazwa marki; bio, avatar i opis dostaniesz z `social/`).
3. Załóż **Instagram** z aplikacji (e-mail marki), przełącz na konto profesjonalne → Firma → połącz ze Stroną FB.
4. Ustawienia firmowe → Konta → **Konta reklamowe** → utwórz: waluta **PLN**, strefa **Europe/Warsaw**. Dodaj kartę płatniczą.
5. W koncie reklamowym ustaw **limit wydatków konta: 300 PLN** (Ustawienia płatności → Limit wydatków konta). To twardy bezpiecznik.
6. **Menedżer zdarzeń** → Połącz źródła danych → Sieć → nazwa → zapisz **Pixel ID / ID zestawu danych** (to jest publiczne — wyślij mi).
7. W ustawieniach zestawu danych → sekcja **Conversions API** → "Wygeneruj token dostępu" → token → `.env` (`META_CAPI_TOKEN`). W zakładce **Testuj zdarzenia** znajdziesz **kod testowy** (np. `TEST12345`) → `.env` (`META_TEST_EVENT_CODE`) tylko na czas testów.
8. Ustawienia firmowe → Bezpieczeństwo marki → **Domeny** → dodaj domenę → metoda **meta-tag**: skopiuj zawartość tagu i wyślij mi (wkleję ją do strony), potem kliknij "Zweryfikuj".
9. Weryfikacja firmy zwykle **nie** jest wymagana przy małych wydatkach; jeśli Meta jej zażąda, przejdziesz ją danymi swojej działalności.

## 6. MailerLite — na później (nie potrzebne do pierwszego testu)
Dostawa produktu idzie przez Resend automatycznie. Newsletter/lead magnet dołożymy po pierwszych sprzedażach.

## Co odsyłasz do mnie (bez sekretów)
- nazwa domeny · Pixel ID · adres Strony FB · nick IG · treść meta-tagu do weryfikacji domeny
- potwierdzenie: ".env wypełniony, `docker compose up -d` działa, strona otwiera się po HTTPS"
- kod testowy zdarzeń Meta (tylko na czas QA)

Potem robię pełny test zakupowy w trybie testowym, sprawdzam Pixel/CAPI, i wracam z **Checkpointem 4** (zgoda na start kampanii).
