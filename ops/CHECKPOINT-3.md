# Checkpoint 3 — co musi zrobić właściciel (jedno okno, ~1,5 h)

Kolejność ma znaczenie. Odpisz jednym komunikatem „GOTOWE” + dane z sekcji „Co odsyłasz”. Sekrety zostają w `.env` na serwerze.

## A. Decyzje (5 min) — odpowiedz w wiadomości
1. **Podmiot sprzedający** (na kogo jest konto Stripe): nazwa, adres, NIP, e-mail kontaktowy, telefon (opcjonalnie). Trafią do regulaminu, polityki, stopki i maila. Bez tego nie wolno sprzedawać.
2. **Status VAT:** zwolniony (art. 113) czy czynny? Decyduje o dopisku przy cenie i o fakturach.
3. **Domena:** którą kupiłeś (preferencja: `odhacz.pl`, potem `.app`/`.to`/`.com`; lista w `brand/brand.md`).
4. **Adres e-mail marki** (np. `hej@odhacz.pl`) — nadawca maili z dostępem.

## B. Domena + VPS (20 min)
1. Kup domenę, w DNS ustaw rekord **A** dla `@` i `www` na IP VPS.
2. Na VPS: Docker + Compose, porty 80/443 otwarte.
3. Sklonuj repo (gałąź `claude/amazing-edison-dxulwx`), wejdź do `platform/`, skopiuj `.env.example` → `.env`, uzupełnij wg `ops/DEPLOY.md`. Na początek zostaw `STRIPE_SECRET_KEY` **testowy** (`sk_test_…`).
4. `docker compose up -d --build`. Potem z dowolnego komputera: `bash ops/smoke.sh TWOJA-DOMENA` — 13 automatycznych sprawdzeń (HTTPS, strony, zamknięty produkt, panel, webhook, placeholdery).

## C. Stripe (15 min)
1. Ustawienia → Metody płatności: **karty, BLIK, Przelewy24, Link** włączone. **Potwierdź mi, że BLIK faktycznie widać w Twoim Checkout** (nie każde konto ma go aktywnego od ręki).
2. Ustawienia → Dane publiczne (Public details): nazwa „Odhacz”, e-mail wsparcia, **adres URL regulaminu** `https://TWOJA-DOMENA/legal/regulamin.html` (wymagane przez checkbox zgody w Checkout), statement descriptor „ODHACZ”.
3. Ustawienia → Branding: logo/sygnet z `platform/public/assets/brand/`, kolor `#6D28D9`.
4. Ustawienia → E-maile klientów: paragony włączone.
5. Developers → Webhooks → endpoint `https://TWOJA-DOMENA/webhook/stripe`, zdarzenia `checkout.session.completed`, `checkout.session.async_payment_succeeded` → sekret do `.env` (`STRIPE_WEBHOOK_SECRET`). Zrób to osobno dla trybu testowego i produkcyjnego.
6. Klucze: test do `.env` teraz; produkcyjny wkleisz po moim „QA OK”.

## D. Resend (10 min)
Konto → Domains → dodaj domenę → wklej rekordy DNS (DKIM/SPF/MX) → „Verified” → API key → `.env` (`RESEND_API_KEY`, `EMAIL_FROM=hej@TWOJA-DOMENA`).

## E. Meta (30–40 min) — szczegóły krok po kroku w `ops/KONTA.md`
1. Portfolio firmowe → Strona FB „Odhacz” (avatar/okładka/opisy z `social/profil.md` i `platform/public/assets/brand/`) → Instagram profesjonalny połączony ze Stroną.
2. Konto reklamowe (PLN, Europe/Warsaw) + karta + **limit wydatków konta 300 zł**.
3. Menedżer zdarzeń → zestaw danych (Pixel) → wyślij mi **Pixel ID**; wygeneruj token CAPI → `.env` (`META_CAPI_TOKEN`); kod testowy zdarzeń → `.env` (`META_TEST_EVENT_CODE`) na czas QA.
4. Weryfikacja domeny (meta-tag): wyślij mi treść tagu, wkleję do strony.
5. Ustawienia firmowe → beneficjent i płatnik reklam (DSA) = podmiot z A.1.
6. Opublikuj 5 pierwszych postów z `social/seed-posty.md` (grafiki w `creatives/out/`), post 6 w dniu startu.

## F. Beta za 0 zł (najważniejsze z całej listy, 30 min Twojego czasu)
Znajdź **10 osób, które w tym tygodniu jadą oglądać używane auto** (znajomi, Wykop, forum-mechanika, grupy FB „kupię/sprzedam auto”). Dostaną darmowy link z `/admin` („Wygeneruj dostęp”). Po ich oględzinach zadaj 5 pytań: co byś zapłacił · czego brakowało · użyłeś zdjęć · pokazałeś listę sprzedawcy · gdzie się zaciąłeś. Jeśli mniej niż 3 z 10 dojdą do etapu „Jazda próbna” — nie odpalamy reklam, poprawiamy produkt. To jest tańsze niż 300 zł na wniosek, którego dane nie uzasadnią.

## G. Mechanik (opcjonalnie, mocno zalecane)
Jeśli znasz mechanika, który przeczyta 150 punktów (godzina) i zgodzi się na podpis „treść sprawdził: [imię], mechanik z [miasto]” — daj znać. To realizuje Twój pomysł „AI + weryfikacja przez człowieka” i podnosi zaufanie bardziej niż cokolwiek innego na landingu.

## H. Rolki (poza budżetem, kiedy chcesz)
Scenariusze: `social/rolki.md`. Nagraj wersję bez napisów. B-roll z aplikacji nagrasz po deployu (dam link demo).

## Co odsyłasz (bez sekretów)
domena · potwierdzenie „healthz OK” · Pixel ID · treść meta-tagu weryfikacji domeny · adres Strony FB i nick IG · dane podmiotu (A.1) · status VAT (A.2) · e-mail marki

## Co robię po Twoim „GOTOWE”
1. Wstawiam dane podmiotu i meta-tag, deployuję poprawki.
2. Pełny test zakupu w trybie testowym (karta 4242, BLIK test), sprawdzam e-mail, `/admin`, Test Events (Pixel + CAPI, 1 zdarzenie po deduplikacji).
3. Przełączamy klucze na produkcyjne, robię zakup za 1 zł? — nie: Stripe nie pozwala na test w live bez kosztu; zamiast tego weryfikuję konfigurację live (metody płatności, webhook live) i pierwszy realny zakup monitoruję ręcznie.
4. Wgrywam kampanię jako **wstrzymaną** (draft) i przychodzę z **Checkpointem 4**: START / STOP.
