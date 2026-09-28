# Platforma sprzedaży produktów cyfrowych

Mały, samodzielny sklep na jeden produkt cyfrowy (+ opcjonalny dodatek w koszyku): płatność przez **Stripe Checkout**, natychmiastowa dostawa linkiem, e-mail z dostępem, własna analityka lejka, Meta Pixel + Conversions API, panel admina. Node 22 + Express + wbudowane SQLite (`node:sqlite`) – bez zewnętrznej bazy, bez frameworków frontowych. Produkt jest **konfigurowalny** – platforma nie zakłada, co sprzedajesz.

## Szybki start (lokalnie, bez kluczy Stripe = tryb testowy)

```bash
cd platform
npm install
cp .env.example .env            # do testów lokalnych wystarczy ustawić ADMIN_USER/ADMIN_PASS i BASE_URL=http://localhost:3000
npm run dev                     # http://localhost:3000  (tryb testowy: fałszywy checkout, e-maile trafiają do data/outbox/)
npm test                        # testy jednostkowe (node:test)
npm run e2e                     # test przeglądarkowy całej ścieżki zakupu (Playwright, tryb testowy)
```

Bez `STRIPE_SECRET_KEY` sklep działa w **TRYBIE TESTOWYM**: przycisk „Kup” prowadzi na `/mock-checkout` (wyraźnie oznaczony), „Zapłać (test)” uruchamia identyczną ścieżkę realizacji zamówienia co prawdziwa płatność (zamówienia, tokeny, e-mail do `data/outbox/`, panel). W produkcji (`NODE_ENV=production`) brak klucza Stripe blokuje start, chyba że świadomie ustawisz `MOCK_MODE=1`.

Wdrożenie na VPS: **`ops/DEPLOY.md`** (krok po kroku, Docker Compose + Caddy z automatycznym HTTPS).

## Co gdzie jest

| Ścieżka | Rola |
|---|---|
| `config/products.json` | **Produkty i ceny** (grosze), typ `main`/`upsell`, ścieżka chronionego obszaru `access_path`, opcjonalny `stripe_price_id` |
| `public/index.html` | Landing (placeholder – do podmiany) |
| `public/sukces.html` | Strona po zakupie: linki dostępu, slot `#first-step`, Pixel `Purchase` |
| `public/app/` | Aplikacja produktu głównego (placeholder – do podmiany), chroniona |
| `public/dodatek/` | Obszar dodatku (upsell), chroniony |
| `public/assets/*.js` | `consent.js` (baner cookie + Pixel), `analytics.js` (visitor_id, UTM, `track`), `shop.js` (`Shop.buy`), `access.js` (`Access.*`) |
| `public/legal/` | Regulamin (v1), polityka prywatności i cookies, „O marce i o Haczu”, archiwum wersji, `legal.css` – placeholdery `[[SPRZEDAWCA_NAZWA]]` itd. do uzupełnienia (lista i teksty: `legal/01-teksty.md`) |
| `emails/delivery.{html,txt}` | E-mail z dostępem + potwierdzenie zawarcia umowy (art. 21 UPK): `{{greeting}}`, `{{name}}`, `{{items}}`, `{{access_url}}`, `{{site_name}}`, `{{base_url}}`, `{{year}}`, `{{order_id}}`, `{{order_date}}`, `{{items_table}}`, `{{amount}}`, `{{payment_method}}`, `{{withdrawal_block}}` (wariant zależny od zgody zapisanej w sesji Stripe), `{{consent_ts}}`, `{{delivered_at}}`; placeholdery `[[SPRZEDAWCA_*]]` do uzupełnienia |
| `src/` | Serwer: `server.js` (routing), `stripe.js`, `fulfillment.js`, `access.js`, `analytics.js`, `admin.js`, `email.js`, `meta-capi.js`, `mock.js`, `db.js`, `config.js` |
| `data/` | Baza `platform.sqlite` + `outbox/` (poza gitem; **to jest Twoja kopia zapasowa**) |
| `tests/` | `unit/` (node:test) i `e2e/` (Playwright) |

## Jak to działa (ścieżka zakupu)

1. Landing → `Shop.buy('main')` → `POST /api/checkout` → sesja Stripe Checkout (PLN, po polsku, zgoda na regulamin + zgoda na natychmiastową dostawę treści cyfrowych i utratę prawa odstąpienia, dodatek jako **order bump** przez `optional_items`).
2. Po płatności Stripe wraca na `/sukces?session_id=…`. Strona pyta `GET /api/session/:id`, a serwer uruchamia `fulfill()` – **ten sam kod** co webhook (`POST /webhook/stripe`, zdarzenia `checkout.session.completed` i `checkout.session.async_payment_succeeded`). Dzięki temu dostęp działa nawet, gdy webhook się spóźnia; wszystko jest idempotentne (tabela `fulfillments` + unikalność `(session_id, product_id)`).
3. `fulfill()`: tworzy zamówienia (jedno na produkt), tokeny dostępu, wysyła **jeden** e-mail z wszystkimi linkami (jest zarazem potwierdzeniem zawarcia umowy: numer i data zamówienia, ceny, blok o zgodzie na natychmiastową dostawę wg `session.consent.terms_of_service`), wysyła `Purchase` do Meta CAPI **tylko gdy `metadata.marketing_consent=true`** (dedup z Pixelem po `event_id`), zapisuje zdarzenia `purchase` / `upsell_purchase` z atrybucją UTM.
4. Link `/d/<token>` ustawia ciasteczko `access_<product_id>` (httpOnly, rok) i przekierowuje do `access_path?t=<token>`. Middleware chroni całą ścieżkę `access_path` (ciasteczko **lub** `?t=`), inaczej `/?locked=1`.

## KONTRAKT INTEGRACJI (dla zespołów: landing, produkt, prawo)

**(a) Landing `public/index.html`** – można podmienić w całości, ale musi:
- załadować w tej kolejności: `<script src="/assets/consent.js">`, `<script src="/assets/analytics.js">`, `<script src="/assets/shop.js">` (najlepiej na końcu `<body>`);
- mieć CTA wywołujące `Shop.buy('main')` – najprościej `<button data-buy="main">Kup teraz</button>` (shop.js sam obsłuży klik, stan ładowania i toast błędu po polsku). Można też `onclick="Shop.buy('main', {button: this})"`;
- opcjonalnie `<span data-price="main"></span>` – shop.js wpisze cenę z konfiguracji (`49,00 zł`);
- linkować `/legal/regulamin.html` i `/legal/polityka-prywatnosci.html`;
- nie musi nic wiedzieć o Pixelu/UTM – `analytics.js` sam zapisuje `visitor_id`, UTM pierwszego wejścia i wysyła `page_view`; dodatkowe zdarzenia: `track('nazwa_zdarzenia', {props})` (nazwa: `a-z0-9_`, max 40 znaków).
- Dostępne globalnie: `Shop.buy(id, {button, label})`, `Shop.toast(msg, isError)`, `track(event, props)`, `Analytics.visitorId()`, `Analytics.utm()`, `Consent.granted()` (`true/false/null`), `Consent.onChange(fn)`, `Consent.show()`.
- Obsłużone parametry URL: `?canceled=1` (powrót ze Stripe – toast), `?locked=1` (próba wejścia bez dostępu – toast).

**(b) Aplikacja produktu `public/app/`** (ścieżka = `access_path` produktu `main` w `products.json`, każdy plik pod nią jest chroniony; wspólne zasoby publiczne trzymaj w `/assets/`):
- załaduj `<script src="/assets/access.js">`;
- `Access.token()` → token (z `?t=` przy pierwszym wejściu, potem z `localStorage`; `?t=` jest usuwane z adresu);
- `Access.loadProgress()` → `Promise<obiekt | null>`; `Access.saveProgress(obiekt)` → `Promise<{ok, updated_at}>` – JSON do **32 KB** na token, synchronizacja między urządzeniami (klucz = token z e-maila);
- `Access.verify()` → `{ok, product_id, products_owned:[…]}` – np. by pokazać moduł dodatku tylko kupującym `upsell`;
- strategia „ostatni zapis wygrywa”; przy `401` helper przekierowuje na `/?locked=1`.
- Dodatek (upsell) ma własny obszar `public/dodatek/` (`access_path` produktu `upsell`) i własny token/link w e-mailu.

**(c) Strona sukcesu `public/sukces.html`** – zostaw logikę; treść „co zrobić najpierw” wstaw do `<section id="first-step">`.

**(d) Strony prawne** – stałe adresy: `/legal/regulamin.html`, `/legal/polityka-prywatnosci.html` (są też w tekście zgody w Stripe i w stopce e-maila). Uzupełnij miejsca oznaczone **TODO**.

**(e) Zmienne środowiskowe** (`.env`, wzór w `.env.example`):

| Zmienna | Znaczenie |
|---|---|
| `BASE_URL` | Publiczny adres sklepu, np. `https://domena.pl` (linki dostępu, e-maile, powroty ze Stripe) |
| `DOMAIN` | Domena dla Caddy (automatyczny certyfikat HTTPS) |
| `SITE_NAME` | Nazwa marki w e-mailach i panelu |
| `PORT` / `NODE_ENV` | Port aplikacji (3000) / `production` na serwerze |
| `STRIPE_SECRET_KEY` | Klucz `sk_live_…`/`sk_test_…`; brak = tryb testowy (w produkcji wymagany) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` z endpointu webhooka `https://DOMENA/webhook/stripe` |
| `CHECKOUT_TERMS_TEXT` | (opcjonalnie) własny tekst zgody w Checkout; `{BASE_URL}` i `{SITE_NAME}` są podmieniane; domyślny (żądanie natychmiastowej dostawy + art. 38 ust. 1 pkt 13 UPK + gwarancja zwrotu) w `src/config.js`, uzasadnienie w `legal/01-teksty.md` |
| `CHECKOUT_SUBMIT_TEXT` | (opcjonalnie) tekst nad przyciskiem płatności; domyślnie „Dostęp wyślemy od razu na e-mail. 14 dni gwarancji zwrotu.” |
| `MOCK_MODE` | `1` wymusza tryb testowy (także z kluczem Stripe) |
| `RESEND_API_KEY` | Klucz Resend; brak = e-maile zapisywane do `data/outbox/` |
| `EMAIL_FROM` / `EMAIL_REPLY_TO` | Nadawca (domena zweryfikowana w Resend) / adres na odpowiedzi |
| `META_PIXEL_ID` | ID Pixela; brak = Pixel i CAPI wyłączone |
| `META_CAPI_TOKEN` | Token Conversions API |
| `META_TEST_EVENT_CODE` | Kod testowy z Events Manager (tylko na czas testów) |
| `ADMIN_USER` / `ADMIN_PASS` | Logowanie do `/admin` (Basic Auth; w produkcji wymagane, hasło ≥ 10 znaków) |
| `IP_HASH_SALT` | Sól do skracania IP w statystykach |
| `DATA_DIR` | Katalog bazy i outboxa (domyślnie `./data`, w Dockerze `/app/data`) |
| `TRUST_PROXY` | Liczba proxy przed aplikacją (Caddy = `1`) |

## API (skrót)

| Metoda i ścieżka | Opis |
|---|---|
| `GET /api/config` | `{site_name, mock, meta_pixel_id, products[]}` |
| `POST /api/checkout` | `{product_id, visitor_id, event_id, fbp, fbc, utm_*, landing_url}` → `{url}` (limit 15/min/IP) |
| `GET /api/session/:id` | `{paid:false}` lub `{paid:true, email, event_id, value, currency, items:[{product_id,name,access_url}]}` |
| `POST /webhook/stripe` | Webhook Stripe (podpis weryfikowany) |
| `GET /d/:token` | Ustawia ciasteczko dostępu i przekierowuje do produktu |
| `GET /api/access/verify?token=` | `{ok, product_id, products_owned}` |
| `GET/PUT /api/progress` | Postęp per token (nagłówek `X-Access-Token` lub ciasteczko) |
| `POST /api/events` | Zdarzenie analityczne (`visitor_id, event, props, url, referrer, utm_*`) |
| `GET /admin` | Panel: lejek dziennie i wg `utm_content`, wydatki na reklamę (CPA/ROAS), ostatnie 50 zamówień, `export.csv`, ponowna wysyłka e-maila |
| `GET /healthz` | `{ok:true}` |

## Analityka i zgody – decyzja projektowa

- **Statystyki własne (first-party) działają zawsze**: losowy `visitor_id` (localStorage + ciasteczko `vid`), zdarzenia lejka (`page_view`, `cta_click`, `checkout_start`, `purchase`, `upsell_purchase`), UTM pierwszego wejścia, skrócony hash IP. Nic nie trafia do podmiotów trzecich, nie ma profilowania między stronami – traktujemy to jak niezbędny pomiar działania sklepu (uzasadniony interes) i opisujemy w polityce prywatności. **Alternatywa** (bardziej zachowawcza): wysyłać `/api/events` dopiero po zgodzie – wystarczy w `analytics.js` owinąć `track` warunkiem `Consent.granted()`; kosztem będzie utrata większości danych lejka przy 300 zł budżetu testu.
- **Meta Pixel ładuje się wyłącznie po „Akceptuję”, a CAPI `Purchase` wysyłamy tylko, gdy w metadata sesji jest `marketing_consent=true`** (`shop.js` przekazuje `Consent.granted()` do `/api/checkout`). Decyzja etapu prawnego (2026-09-28, art. 399 PKE + RODO): bez zgody żadne dane nie trafiają do Meta – ani z przeglądarki, ani z serwera. Cookie `_fbc` z `fbclid` zapisujemy też dopiero po zgodzie, „Odrzucam” usuwa `_fbp`/`_fbc`, a każda decyzja w banerze jest logowana jako zdarzenie `cookie_consent` (dowód zgody: visitor_id, czas, wybór, wersja banera).
- Deduplikacja Pixel/CAPI: to samo `event_id` (generowane w `shop.js` przy starcie checkoutu, przekazywane w `metadata` sesji Stripe).

## Bezpieczeństwo

Nagłówki (CSP dopuszczające Stripe i Meta, `nosniff`, `frame-ancestors 'none'`, Referrer-Policy), walidacja wejść, limity zapytań per IP, tokeny 256-bitowe, ciasteczka `httpOnly`/`SameSite=Lax`/`Secure`, Basic Auth + ochrona przed CSRF w panelu, brak stack trace'ów dla klienta, `trust proxy` dla Caddy. CSP zmienia się w `src/server.js` (stała `CSP`), gdy landing potrzebuje np. zewnętrznych czcionek innych niż Google Fonts.

## Kopia zapasowa

Cały stan to katalog `data/` (`platform.sqlite` + `outbox/`). Kopiuj go regularnie (`ops/DEPLOY.md`, punkt „Kopia zapasowa”).
