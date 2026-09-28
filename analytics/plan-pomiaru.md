# Plan pomiaru (niezależny od produktu)

## Pytanie, na które odpowiada pomiar
ILE WYDALIŚMY → ILE OSÓB PRZYSZŁO → ILE ROZPOCZĘŁO CHECKOUT → ILE KUPIŁO → JAKI BYŁ PRZYCHÓD (+ ile dokupiło upsell).

## Dwa niezależne źródła prawdy
1. **Własne eventy (first-party, SQLite, `/admin`)** — liczby, którym ufamy. Nie zależą od zgody na cookies (anonimowy identyfikator w localStorage, bez danych osobowych).
2. **Meta Pixel + Conversions API** — potrzebne algorytmowi Meta do optymalizacji i do raportu w Ads Managerze. Pixel odpala się tylko po zgodzie; CAPI (serwer) wysyła Purchase z tym samym `event_id`, więc Meta nie liczy podwójnie.

Zasada: decyzje biznesowe podejmujemy na podstawie `/admin` + faktycznych wydatków w Ads Managerze. Meta pokaże mniej zakupów niż my (część osób odrzuci cookies) i to jest normalne.

## Eventy
| Event | Gdzie | Kiedy | Meta |
|---|---|---|---|
| `page_view` | landing, app | każde wejście | PageView (po zgodzie) |
| `cta_click` | landing | klik w dowolny przycisk "Kup" | — |
| `checkout_start` | landing | tuż przed przekierowaniem do Stripe | InitiateCheckout (eventID) |
| `purchase` | serwer (webhook / strona sukcesu) | opłacona sesja | Purchase (Pixel + CAPI, ten sam eventID, value/currency PLN) |
| `upsell_purchase` | serwer | w sesji był dodatek | zawarte w value Purchase |
| `app_open` | app | pierwsze otwarcie produktu | — |
| `quick_start_done` | app | ukończony quick start | — |

Atrybucja: każdy event niesie `utm_source / utm_medium / utm_campaign / utm_content / utm_term` (first-touch zapisany w localStorage). `utm_content` = nazwa kreacji, więc lejek da się rozbić na kreację.

## Konwencja UTM w reklamach
`?utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`
(Meta podstawia zmienne dynamiczne w URL parameters.)

## Metryki i progi diagnostyczne (cold traffic, produkt ≤ 49 PLN)
| Krok | Metryka | Słabo | OK | Dobrze |
|---|---|---|---|---|
| Reklama | CTR (link) | < 0,8% | 1–1,5% | > 2% |
| Reklama | CPC (link) | > 2,5 zł | 1–2 zł | < 1 zł |
| Landing | CTA click / page_view | < 8% | 10–20% | > 25% |
| Landing | checkout_start / page_view | < 3% | 4–8% | > 10% |
| Checkout | purchase / checkout_start | < 25% | 30–50% | > 50% |
| Całość | purchase / page_view | < 1% | 1–2% | > 3% |
| Upsell | upsell / purchase | < 10% | 15–25% | > 30% |

Progi są orientacyjne (do potwierdzenia benchmarkami z `research/05-policy-legal-tools.md`). Służą do wskazania **etapu**, który diagnozujemy, nie do automatycznych decyzji.

## Czego NIE robimy
- Nie wyłączamy kreacji po < 1000 wyświetleń.
- Nie zmieniamy jednocześnie ceny, strony i reklamy.
- Nie liczymy ROAS z Ads Managera jako prawdy — liczymy z `/admin` (przychód) i faktycznego spendu.

## Ręczna czynność właściciela (1 min dziennie w czasie testu)
Wpisać dzienny wydatek z Ads Managera w `/admin` (formularz "spend"). Dashboard policzy CPA i ROAS.
