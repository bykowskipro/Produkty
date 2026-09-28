# Wdrożenie sklepu na VPS – krok po kroku

Potrzebujesz: VPS z Ubuntu/Debian (1 vCPU, 1 GB RAM wystarczy), domenę, konto Stripe, konto Resend, konto Meta Business. Cały proces to ok. 60–90 minut.

## 1. DNS (u rejestratora domeny)
1. Dodaj rekord **A**: nazwa `@` (domena główna) → adres IP serwera.
2. Dodaj rekord **A**: nazwa `www` → ten sam adres IP.
3. Poczekaj 5–30 minut (sprawdź: https://dnschecker.org).

## 2. Serwer
1. Zaloguj się: `ssh root@ADRES_IP`.
2. Zainstaluj Dockera: `curl -fsSL https://get.docker.com | sh`
3. Wgraj folder `platform/` na serwer, np. `git clone …` albo z komputera: `scp -r platform root@ADRES_IP:/opt/sklep`.
4. `cd /opt/sklep` (lub `/opt/sklep/platform`, jeśli skopiowałeś całe repo).
5. `mkdir -p data && chown -R 1000:1000 data` (aplikacja działa jako zwykły użytkownik i musi móc pisać do `data/`).

## 3. Plik .env
1. `cp .env.example .env` i otwórz: `nano .env`.
2. Uzupełnij co najmniej: `BASE_URL=https://twojadomena.pl`, `DOMAIN=twojadomena.pl`, `SITE_NAME`, `ADMIN_USER`, `ADMIN_PASS` (długie hasło), `IP_HASH_SALT` (dowolny losowy ciąg).
3. Klucze Stripe / Resend / Meta dopisujesz w kolejnych krokach (po każdej zmianie `.env` wykonaj `docker compose up -d --force-recreate app`).
4. `docker compose up -d --build` – po ~1 minucie sklep działa pod `https://twojadomena.pl` (Caddy sam pobiera certyfikat HTTPS).
5. Sprawdź: `docker compose logs -f app` (Ctrl+C wychodzi). Powinno być `listening on :3000`.

## 4. Stripe
1. Dashboard → **Developers → API keys** → skopiuj **Secret key** (`sk_live_…`; do testów `sk_test_…`) do `STRIPE_SECRET_KEY`.
2. **Developers → Webhooks → Add endpoint**: URL `https://twojadomena.pl/webhook/stripe`, zdarzenia: `checkout.session.completed` oraz `checkout.session.async_payment_succeeded`. Po zapisaniu skopiuj **Signing secret** (`whsec_…`) do `STRIPE_WEBHOOK_SECRET`.
3. **Settings → Business → Public details**: wpisz adres regulaminu `https://twojadomena.pl/legal/regulamin.html` i polityki prywatności (wymagane, bo checkout wymusza akceptację regulaminu).
4. **Settings → Payment methods**: włącz BLIK, Przelewy24, karty.
5. Zrestartuj: `docker compose up -d --force-recreate app`.
6. Ceny bierzemy z `config/products.json` (w groszach: `4900` = 49 zł). Nie trzeba tworzyć produktów w Stripe – powstaną same. Zmiana ceny = edycja pliku + restart.

## 5. Resend (e-maile z dostępem)
1. https://resend.com → **Domains → Add domain** → wpisz domenę → dodaj u rejestratora podane rekordy DNS (DKIM/SPF, zwykle 3 rekordy TXT/MX) → poczekaj na „Verified”.
2. **API Keys → Create** → wklej do `RESEND_API_KEY`.
3. Ustaw `EMAIL_FROM=Nazwa Marki <kontakt@twojadomena.pl>` i `EMAIL_REPLY_TO` (skrzynka, którą czytasz).
4. Restart aplikacji jak wyżej.

## 6. Meta (Pixel + Conversions API)
1. **Events Manager → Connect data sources → Web → Meta Pixel** → skopiuj **Pixel ID** do `META_PIXEL_ID`.
2. Pixel → **Settings → Conversions API → Generate access token** → do `META_CAPI_TOKEN`.
3. Na czas testów: **Test events** → skopiuj kod `TEST…` do `META_TEST_EVENT_CODE`. **Po testach usuń** go z `.env`, bo zdarzenia testowe nie liczą się w kampaniach.
4. Restart aplikacji.

## 7. Test dymny (zrób przed uruchomieniem reklam)
1. Otwórz `https://twojadomena.pl/?utm_source=test&utm_content=smoke` na telefonie – strona się ładuje, baner cookie działa („Akceptuję”).
2. Kliknij CTA → otwiera się Stripe Checkout po polsku z ceną, opcją dodania dodatku i checkboxem zgody.
3. Zapłać kartą testową (przy `sk_test_`): numer `4242 4242 4242 4242`, dowolna przyszła data, CVC `123`. Przy kluczu `sk_live_` zrób prawdziwy zakup za 49 zł i zwróć go potem w Stripe.
4. Strona `/sukces` pokazuje „Zakup udany” i przyciski dostępu; klikając, wchodzisz do produktu.
5. E-mail z dostępem dotarł (sprawdź spam). Bez Resend – plik w `data/outbox/`.
6. `https://twojadomena.pl/admin` (login z `.env`) pokazuje 1 odwiedzającego, 1 CTA, 1 checkout, 1 zakup, przychód; w wierszu `smoke` w tabeli utm_content jest zakup.
7. Meta Events Manager → **Test events**: widać `PageView`, `InitiateCheckout`, `Purchase` (z przeglądarki i serwera, oznaczone jako zdeduplikowane).
8. Stripe → Webhooks → endpoint pokazuje odpowiedź `200`.

## 8. Codzienna obsługa
- Panel: `/admin` – wpisuj **dzienny wydatek na reklamę** (formularz „Wydatki”), a zobaczysz CPA i ROAS.
- Klient nie dostał e-maila? W panelu przy zamówieniu kliknij „Wyślij e-mail ponownie”.
- Logi: `docker compose logs -f app`. Restart: `docker compose restart app`. Aktualizacja kodu: `git pull && docker compose up -d --build`.

## 9. Kopia zapasowa
Cały stan sklepu to katalog `data/`. Raz dziennie (cron) lub przed każdą zmianą:
```
tar czf /root/backup-sklep-$(date +%F).tar.gz -C /opt/sklep data .env
```
Kopiuj archiwum poza serwer (np. `scp` na komputer). Przywrócenie: rozpakuj do `/opt/sklep` i `docker compose up -d`.
