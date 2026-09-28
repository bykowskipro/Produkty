# Kampania Meta — plan testu (300 PLN) · v2 po adwokacie diabła

## Cel testu (zdefiniowany uczciwie)
300 zł kupuje ~100–250 wejść na landing. To **nie wystarczy**, żeby odróżnić konwersję 0,5% od 2% (przy 150 wejściach zdrowy produkt z CR 1–1,5% daje 0 zakupów w 22–37% przypadków). Dlatego test odpowiada na pytanie: **czy hak i landing trzymają zimną uwagę** (CTR, klik w CTA, start checkoutu, demo), a zakupy traktujemy jako bonus/anegdotę, nie jako wyrok.

## Zanim wydamy 1 zł (0 zł, tydzień przed startem)
1. **10 beta-użytkowników z prawdziwym autem do obejrzenia** (znajomi, Wykop, forum-mechanika, grupy FB „kupię/sprzedam auto”): darmowe kody dostępu (generowane w `/admin`), po fakcie 5 pytań (co byś zapłacił, czego brakowało, użyłeś zdjęć, pokazałeś listę sprzedawcy, gdzie się zaciąłeś). W `/admin` patrzymy na `app_open`, `quick_start_done`, `phase_done`. **Jeśli mniej niż 3 z 10 dojdą do „Jazdy próbnej” — nie palimy 300 zł, poprawiamy produkt.** Bonus: 3–5 prawdziwych opinii na landing (za zgodą, z imieniem).
2. **Jeden mechanik czyta treść** (150 punktów) i podpisuje się jako „treść sprawdził: [imię], mechanik z [miasto]” — jeśli właściciel ma taką osobę. Najtańszy dowód zaufania po gwarancji.
3. Test BLIK/P24 na żywo z telefonu (w trybie testowym Stripe), e-mail dostępowy dochodzi na Gmail/iCloud/O2/WP.

## Struktura
- **Kampania:** `P1-odhacz-auto-sales-v1` · cel Sprzedaż · optymalizacja Purchase · budżet kampanii **40 zł/dzień** · limit wydatków kampanii **280 zł** (+20 zł rozgrzewka, patrz niżej) · limit wydatków konta 300 zł.
- **Zestaw reklam:** `PL-24-50-moto` · Polska · **24–50 twardo (oryginalne odbiorcy, bez rozszerzania Advantage+ na wiek)** · wszystkie płcie · umiejscowienia Advantage+ · zainteresowania: samochody używane, Otomoto, OLX, motoryzacja (jeden blok). Jeden zestaw.
- **Reklamy (3):** `problem-static-v1` (moment), `lista-static-v1` (rezultat), `story-motion-v1` / `story-video-v1` (rolka właściciela, jeśli pokazuje prawdziwe narzędzie). Reszta kreacji = rezerwa na turę 2.
- **Rozgrzewka konta (20 zł, D-4…D-2):** promocja seed posta nr 2 lub 3 (cel: aktywność) — świeże konto + Sprzedaż od dnia 0 to typowy wzorzec automatycznych blokad; 2 dni historii i kilkadziesiąt reakcji na stronie kosztują 20 zł.

## Harmonogram
- D-7…D-3: beta (10 osób), recenzja mechanika, poprawki.
- D-4…D-2: rozgrzewka 20 zł, 5 seed postów opublikowanych, weryfikacja domeny, beneficjent/płatnik (DSA).
- D-1: test zakupu na żywo (BLIK), Test Events: Pixel + CAPI = 1 zdarzenie Purchase po deduplikacji.
- D0: start 3 reklam rano.
- D1–D6: odczyt o stałej porze (Ads Manager + `/admin`), wpis spendu, decyzje wg drabinki.
- D7: koniec → raport w `EXPERIMENTS.md`.

## Drabinka decyzyjna (diagnoza etapu, nie automat)
| Krok | Metryka | Próg „kontynuuj” | Jeśli poniżej |
|---|---|---|---|
| Reklama | CTR (link) per kreacja, po ≥ 1500 wyświetleń | ≥ 1,0% | wyłącz najsłabszą, zostaw ≥ 2 |
| Landing — uwaga | `cta_click / page_view`, po ≥ 120 wejść | ≥ 10% | zmień hero (jedna zmiana) |
| Landing — demo | `demo_start / page_view` · `demo_done / demo_start` | ≥ 30% · ≥ 40% | demo nie angażuje → zmień etap w demie |
| Landing — intencja | `checkout_start / page_view` | ≥ 4% | oferta/cena/zaufanie → EXP-002 |
| Checkout | `purchase / checkout_start`, po ≥ 8 startów | > 0 | dopiero wtedy ruszamy cenę/zgodę/płatności |
| Zakupy | liczba | 0–2 = **brak informacji**; ≥ 3 = bonus | — |

Twardy stop: 300 zł wydane. Wcześniejszy stop: po 150 zł CTR < 0,6% na wszystkich kreacjach (hak nie działa — wracamy do kreacji, nie do produktu).
Skalowanie: **dopiero** przy CPA ≤ 35 zł na ≥ 10 zakupach (marża ~30 zł). Wcześniej co najwyżej „druga tura 300 zł na 1 zwycięską kreację”.

## Pomiar (źródła prawdy)
1. `/admin`: `page_view`, `demo_start`, `demo_done`, `cta_click`, `checkout_start`, `purchase`, `upsell_purchase`, przychód, wg `utm_content`.
2. Ads Manager: wydatki, wyświetlenia, CTR, CPC, LPV, wiek odbiorców (sprawdzić, czy 24–50 się trzyma).
3. Meta zobaczy mniej zakupów niż my (zgody) — decyzje z `/admin`.

## Przed startem (final QA)
URL z UTM · zakup testowy (karta 4242 + BLIK test) · Purchase w Test Events (1 zdarzenie po dedup) · e-mail dostępowy · kreacje bez błędów · landing 390×844 · beneficjent/płatnik · limit konta 300 zł · strona FB kompletna (avatar, okładka, 5 postów) · claimy na landingu zgodne z tym, co działa (offline/PWA tylko po teście).

## Checkpoint 4 (przed wydaniem 1 zł)
PRODUCT: Odhacz Auto (39 zł) + upsell Po zakupie (19 zł)
PRICE: 39 / 19 zł
TARGET: PL, 24–50 twardo, motoryzacja/Otomoto/OLX, 1 zestaw
CAMPAIGN: 1 kampania Sprzedaż, 3 reklamy + 20 zł rozgrzewki
TEST BUDGET: 40 zł/dzień
MAXIMUM SPEND: 300 zł (limit kampanii 280 + rozgrzewka 20; limit konta 300)
SUCCESS = drabinka wyżej (uwaga → demo → intencja), zakupy jako bonus
→ START albo STOP/ZMIEŃ.
