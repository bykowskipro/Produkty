# Zasoby marki Odhacz — pliki i zasady użycia

Źródła (SVG) leżą tutaj; identyczne kopie + eksporty PNG leżą w `platform/public/assets/brand/`
(serwowane przez aplikację pod `/assets/brand/…`). Wszystkie SVG to czysta geometria — nie zależą
od zainstalowanych fontów. Kolory: ink `#0B0F19`, paper `#FFFFFF`, lime `#C6F135`, violet `#6D28D9`.

## Pliki

| Plik | Co to jest | Gdzie używać |
|---|---|---|
| `wordmark.svg` | Logotyp „Odhacz”, litery ink, ptaszek w „O” violet (540×110, tło przezroczyste) | Jasne tła: nagłówek landingu, e-maile, dokumenty, faktury |
| `wordmark-light.svg` | Logotyp w wersji jasnej: litery paper, ptaszek lime | Tło ink lub przyciemnione zdjęcia: hero, kreacje, OG, cover |
| `sygnet.svg` | Sam znak „O z ptaszkiem” (ink + violet), kwadrat 64×64, czytelny od 16 px | Jasne tła: ikona w aplikacji, wypunktowania, pieczątka |
| `sygnet-light.svg` | Sygnet jasny (paper + lime) | Ciemne tła; źródło ikon PWA i favicony |
| `hacz.svg` | **Hacz** — maskotka marki, poza podstawowa (uśmiech). viewBox 256×256 | Avatar, sekcja „Kim jest Hacz”, dymki z podpowiedziami |
| `hacz-latarka.svg` | Hacz z czołówką (ta sama geometria, te same proporcje) | Produkt **Odhacz Auto**: etapy „Pod maską”, kreacje Auto |
| `hacz-kciuk.svg` | Hacz z kciukiem w górę | Stan OK, ekran sukcesu po zakupie, potwierdzenia |
| `hacz-uwaga.svg` | Hacz z uniesioną brwią, wskazuje palcem | Ostrzeżenia, „czerwona flaga”, wskazówki „na co uważać” |
| `gen-svg.mjs` | Generator powyższych SVG z jednej geometrii (`node brand/assets/gen-svg.mjs`) | Zmiana pozy/koloru — edytuj tu, nie w SVG ręcznie |

Eksporty PNG (tylko w `platform/public/assets/brand/`, generowane z `creatives/brand-templates/`):

| Plik | Rozmiar | Gdzie używać |
|---|---|---|
| `avatar-1024.png` | 1024×1024 | Zdjęcie profilowe FB/IG/Google/YouTube (Hacz na ink, limonkowy pierścień; bezpieczne przy kadrowaniu do koła) |
| `icon-192.png`, `icon-512.png` | 192², 512² | `manifest.webmanifest` → `icons` z `purpose: "any maskable"` (sygnet w strefie bezpiecznej 80 %) oraz `apple-touch-icon` |
| `favicon-32.png` | 32×32 | `<link rel="icon" href="/assets/brand/favicon-32.png" sizes="32x32">` (zaokrąglony kafelek ink, przezroczyste rogi) |
| `og-1200x630.png` | 1200×630 | `og:image` / `twitter:image` na landingu i w aplikacji |
| `cover-fb-820x312.png`, `cover-fb-1640x624.png` | 820×312, 1640×624 | Cover strony na Facebooku — wgrywać wersję 1640×624; kluczowa treść mieści się w strefie widocznej na mobile |

Regeneracja: `node brand/assets/gen-svg.mjs` (SVG) → `cd creatives && node brand-export.mjs` (PNG; Playwright/Chromium).
Fonty do renderu (Space Grotesk 700, Inter 400/600, licencja OFL) leżą w `creatives/fonts/*.ttf` i są ładowane
przez `@font-face` — Chromium w środowisku buildu nie ufa proxy dla Google Fonts, a lokalne pliki dają powtarzalny render.

## Zasady użycia (6 linii)

1. **Pole ochronne:** wokół wordmarku i sygnetu co najmniej połowa wysokości litery „O”; wokół Hacza co najmniej 10 % jego szerokości — bez tekstu, ramek ani innych znaków w tym polu.
2. **Minimalne rozmiary:** wordmark 96 px szerokości (druk 25 mm), sygnet 16 px, Hacz 48 px (twarz musi być czytelna), pozy „latarka” i „uwaga” 64 px.
3. **Kolory tylko z plików:** ink + violet na jasnym tle, paper + lime na ink. **Nigdy nie przebarwiaj Hacza** (lime/ink/violet), bez gradientów, cieni, obrysów, rozciągania i obracania; stany OK/Uwaga/Problem nie są kolorami marki.
4. **Hacz nigdy** nie nosi białego fartucha, stetoskopu, kombinezonu mechanika ani niczego, co sugeruje zawód regulowany; nie jest fotorealistyczny i nie „mówi” w pierwszej osobie jako człowiek.
5. **Podpis obowiązkowy:** przy każdym użyciu Hacza z wypowiedzią lub w materiale marketingowym podpis „Hacz — maskotka Odhacz” (skrót „Hacz · maskotka”, gdy brakuje miejsca) — wymóg AI Act art. 50 i zasad Meta.
6. **Jedna marka, jeden znak:** nie łącz sygnetu z innym „O”, nie twórz własnych wariantów logotypu (kontur, 3D, inne fonty); nowe pozy Hacza tylko przez `gen-svg.mjs`, z tą samą geometrią ciała i viewBox 256×256.
