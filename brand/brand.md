# Marka minimalna — ODHACZ

## Nazwa
**Odhacz** — parasol dla interaktywnych checklist na ważne momenty życia. Produkty nazywamy „Odhacz Auto”, „Odhacz Mieszkanie” (następny), „Odhacz Po zakupie” (dodatek). Krótko, po polsku, czasownik w trybie rozkazującym = działanie. Nie zawiera nazw cudzych marek.

## Domena — propozycje do sprawdzenia przy zakupie (kolejność preferencji)
1. `odhacz.pl` 2. `odhacz.app` 3. `odhacz.to` 4. `odhacz.com` 5. `odhaczam.pl` 6. `odhaczone.pl`. Jeśli wszystkie zajęte: `checklisto.pl`, `odhaczauto.pl` (gorzej: zamyka parasol).

## Tagline
„Odhaczasz punkt po punkcie. Zero zgadywania.”
Krótsza wersja do avatara/bio: „Zero zgadywania.”

## AI-awatar: **Hacz**
- Kim jest: przewodnik marki — postać stworzona z pomocą AI; nie ekspert, nie mechanik, nie człowiek i nie „asystent AI” (w produkcie nie działa żadna AI: Hacz mówi gotowymi tekstami, oceny to jawne reguły). Zawsze podpisany jako „Hacz — przewodnik Odhacz”. (Uczciwość wobec klienta: nie nazywamy AI czegoś, co nie jest AI w działaniu; treści generowane cyfrowo oznaczamy — zasady Meta; AI Act art. 50 dotyczy systemów AI w interakcji z ludźmi, których tu nie ma.)
- Wygląd: stylizowany, nie fotorealistyczny. Zaokrąglony „ptaszek” (znak ✓) z oczami, w kolorze limonki na tle atramentu; w wersji „Auto” ma czołówkę (latarkę) na głowie. Bez białego fartucha, bez stetoskopu, bez elementów sugerujących zawód regulowany.
- Charakter: konkretny, lekko zaczepny, bez nadęcia. Mówi krótko, w 2. osobie, na „Ty”. Nie straszy, nie moralizuje. Przykład: „Sprzedawca przyjechał ciepłym autem? Zimny start był częścią umowy. Poproś o powtórkę jutro albo odejmij to od ceny.”
- Czego nie robi: nie udaje mechanika, nie wycenia napraw, nie mówi „to auto jest bezpieczne”.

## Kolory (tokeny)
| Token | HEX | Użycie |
|---|---|---|
| ink | #0B0F19 | tekst, ciemne tła (hero, kreacje) |
| paper | #FFFFFF | tło strony |
| mist | #F1F5F9 | tła sekcji, karty |
| line | #E2E8F0 | obramowania |
| violet (primary) | #6D28D9 | przyciski na jasnym tle, linki, akcenty marki |
| violet-soft | #EDE9FE | tła wyróżnień |
| lime (accent) | #C6F135 | CTA na ciemnym tle, wyróżnienia w kreacjach, kolor maskotki |
| ok | #16A34A | stan OK |
| warn | #F59E0B | stan Uwaga |
| bad | #DC2626 | stan Problem / czerwona flaga |
| info | #0284C7 | informacja |
Zasada: stany (ok/warn/bad) nigdy nie są kolorami marki. Marka = violet + lime + ink.

## Typografia (Google Fonts — dozwolone przez CSP platformy)
- Nagłówki: **Space Grotesk** 700 (techniczna, przyjazna, dobrze wygląda w dużych liczbach).
- Tekst: **Inter** 400/600. Minimalny rozmiar tekstu na mobile: 16 px; przyciski 48 px wysokości.

## Kierunek wizualny
„Narzędzie, nie poradnik.” Duże rzędy do tapnięcia, grube stany OK/Uwaga/Problem, wielkie liczby (licznik flag), makiety telefonu w kreacjach, limonkowe podkreślenia na atramencie. Zdjęcia aut tylko jako tło/kontekst; bohaterem jest ekran z checklistą. Ilustracje i awatar oznaczamy w stopce jako wygenerowane/zaprojektowane cyfrowo.

## Logo / wordmark
Wordmark „Odhacz” w Space Grotesk 700 z „✓” wpisanym w literę „O” (ptaszek w kółku). Wersje: ciemna na jasnym, jasna (paper/lime) na ink, sam sygnet (O z ptaszkiem) jako favicon i avatar.

## Ton głosu (skrót)
Krótko. Konkret zamiast przymiotników. „Odhaczasz 17 punktów” zamiast „kompleksowe rozwiązanie”. Żadnych „rewolucji”, „sekretów”, „gwarancji sukcesu”. Humor: suchy, jedno zdanie, nigdy kosztem klienta.

## Zasoby (pliki)
Źródła SVG: `brand/assets/` (generator `gen-svg.mjs`); kopie + PNG serwowane przez aplikację: `platform/public/assets/brand/` (`/assets/brand/…`). Szczegóły i 6 zasad użycia: `brand/assets/README.md`.
- Logotyp: `wordmark.svg` (ink + violet, jasne tła), `wordmark-light.svg` (paper + lime, tło ink).
- Sygnet „O z ptaszkiem”: `sygnet.svg`, `sygnet-light.svg` (kwadrat, czytelny od 16 px).
- Hacz (viewBox 256×256, wymienne pozy): `hacz.svg`, `hacz-latarka.svg` (Auto), `hacz-kciuk.svg` (OK), `hacz-uwaga.svg` (ostrzeżenia).
- PNG: `avatar-1024.png`, `icon-192.png`, `icon-512.png`, `favicon-32.png`, `og-1200x630.png`, `cover-fb-820x312.png`, `cover-fb-1640x624.png` — szablony w `creatives/brand-templates/`, eksport `cd creatives && node brand-export.mjs`.
- Podpis maskotki zawsze: „Hacz — przewodnik Odhacz”. Nie przebarwiać, bez fartucha/stetoskopu.
