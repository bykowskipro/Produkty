# DECISIONS.md

Format: data · decyzja · dlaczego · co odrzucono.

## 2026-09-28 · Format produktu: interaktywne narzędzie webowe (mobile-first), nie PDF, nie aplikacja
- Dlaczego: właściciel chce czegoś nowatorskiego, działającego na telefonie, bardziej interaktywnego niż ebook, ale bez instalacji. Web-app dostępna linkiem po zakupie spełnia to w 100% i jest w pełni automatyzowalna.
- Odrzucono: klasyczny ebook PDF (commodity, słabo używalny na telefonie), aplikacja natywna (koszt, sklepy, review, czas).

## 2026-09-28 · Infrastruktura budowana jako uniwersalna platforma (niezależna od produktu)
- Dlaczego: cel długoterminowy = system IDEA → PRODUKT → SKLEP → ADS → DANE. Checkout, dostawa, analityka i pipeline kreacji mają być reużywalne dla produktu B, C...
- Odrzucono: no-code (Gumroad/EasyCart itp.) — prowizje, mniejsza kontrola nad analityką i upsellem; właściciel ma Stripe i VPS.

## 2026-09-28 · Właściciel robi 2–3 rolki z AI-awatarem (FB, IG, TikTok) poza budżetem
- Dlaczego: darmowy dodatkowy kanał zasięgu + gotowe wideo do reużycia jako reklama (wideo zwykle bije statyki w cold traffic). TikTok tylko organicznie, bez płatnego ruchu.
- Warunek: scenariusze rolek powstają PO wyborze produktu i persony (rolka = angle produktu, nie luźny content). Ja dostarczam: 3 scenariusze (hook 0–2 s, treść, CTA), napisy, wytyczne wizualne, wersję bez wypalonych napisów do reklam.
- Odrzucono: robienie rolek przed decyzją o produkcie.

## 2026-09-28 · PRODUKT 1: „Oględziny używanego auta w telefonie” (interaktywna checklista + lista uwag do negocjacji)
- Dlaczego: jedyny z 4 kierunków, w którym Meta (brak restrykcji, Purchase działa), prawo (zero regulacji) i zaufanie do anonimowej marki (narzędzie, 39 zł) są jednocześnie na zielono; ostry moment zakupu („jutro oglądam auto”), 3,35 mln transakcji/rok, dowód płacenia (checklista PDF 19,90 zł, usługi 449–749 zł), dosłownie „telefon w ręku”. Szczegóły: `research/10-wybor-produktu.md`.
- Odrzucono w tym teście: B2 chronotyp/sen (restrykcje health & wellness mogą zablokować Purchase; haki objawowe zakazane; brak dowodu sprzedaży bez eksperta), C budżet/finanse (KYC dla reklam finansowych w PL od IX 2026; CPC 5–15 zł; rynek płaci nazwiskom), A1 lokalny biznes z AI (najsłabsze dowody popytu; darmowa konkurencja instytucjonalna) — A1 zostaje kandydatem nr 2, D2 odbiór mieszkania kandydatem sezonowym (X–XII).
- Marka: parasol dla interaktywnych checklist na wydarzenia życiowe, nie marka motoryzacyjna.

## 2026-09-28 · Cena: 39 zł produkt główny, 19 zł upsell (order bump w checkout)
- Dlaczego: kotwice — płatna checklista PDF 19,90 zł (statyczna), stacja diagnostyczna 80–200 zł, mobilny mechanik 449–749 zł. 39 zł = „2× cena PDF-a, 10× taniej niż mechanik”. Poniżej limitu 49 zł, impulsowo. Upsell „Kupione — i co dalej” (umowa, PCC-3, rejestracja, OC, pierwsze 30 dni) za 19 zł domyka historię klienta.
- Odrzucono: 49 zł (mniej sygnału przy 300 zł budżetu), 19–29 zł (za blisko PDF-a, sugeruje „kolejną listę”). Bez przekreślonych cen (Omnibus) — uczciwa cena startowa.

## 2026-09-28 · Marka: ODHACZ (parasol), awatar AI „Hacz”, violet + lime + ink, Space Grotesk/Inter
- Dlaczego: nazwa-czasownik działa dla każdej checklisty (auto dziś, mieszkanie jutro), po polsku, bez cudzych znaków; awatar stylizowany (nie fotorealistyczny) omija ryzyka Meta/AI Act i „sugerowania profesji”; paleta nie koliduje ze stanami OK/Uwaga/Problem.
- Odrzucono: nazwy motoryzacyjne (zamykają parasol), fotorealistyczny awatar (uncanny valley, oznaczenia AI, ryzyko „udawania eksperta”), czerwień/zieleń jako kolory marki (kolizja ze stanami).

## 2026-09-28 · Checkout: zostaje jeden krok w Stripe (bez własnej strony „Zamówienie”)
- Dlaczego: minimum tarcia „chcę → zapłaciłem”; checkbox Stripe jest domyślnie odznaczony i wymagany, a jego tekst zawiera wyraźne żądanie natychmiastowej dostawy + przyjęcie do wiadomości utraty prawa odstąpienia (art. 38 ust. 1 pkt 13 UPK); Stripe loguje akceptację w sesji; e-mail potwierdzający zawiera blok o zgodzie (art. 21 UPK). Prawnicza rekomendacja „dwa osobne checkboxy na własnej stronie” jest bezpieczniejsza — wdrożymy, jeśli pojawią się spory lub skala.
- Odrzucono: dodatkowa strona zamówienia (kolejny ekran = mniej zakupów przy 300 zł testu).

## 2026-09-28 · Gwarancja satysfakcji 14 dni (dobrowolna) + demo bez bramki e-mail
- Dlaczego: główna obiekcja = nieznana marka; gwarancja handlowa i klikalne demo usuwają ją taniej niż budowanie „autorytetu”. Lead-gate odrzucony: przy 300 zł liczymy zakupy, nie e-maile.

## 2026-09-28 · Model „treść AI + weryfikacja przez podpisanego specjalistę” — zapisany jako narzędzie na przyszłość, nie na EXP-001
- Dlaczego: rozwiązuje problem zaufania anonimowej marki (główny hamulec w śnie/finansach/diecie i w edukacji), ale nie zmienia restrykcji Meta (zdrowie/finanse) i wymaga pozyskania eksperta przed sprzedażą — sprzeczne z celem pierwszego testu (szybkość, zero kosztów, minimalny udział właściciela).
- Zastosowanie: produkt 2/3 w edukacji „z datą” (egzaminy) albo powrót do snu z podpisanym psychologiem/lekarzem, gdy lejek udowodni, że sprzedaje.

## 2026-09-28 · Zmiany po adwokacie diabła (`experiments/devils-advocate-01.md`)
- Przyjęte: usunięcie „pierwsza w Polsce” (istnieje darmowe kupbezwtopy.pl); demo na landingu z etapu „Nadwozie i lakier” (praca przy aucie, nie sprawdzanie ogłoszenia); człowiek/firma przed maskotką w bloku zaufania; poprawne brzmienie statystyki 65% (skup AAA AUTO, nie „auta z ogłoszeń”); zdjęcie z copy obietnic „offline” i „dodaj do ekranu” do czasu testu SW na iPhonie/Androidzie; 3 kreacje w turze 1 zamiast 7; twardy wiek 24–50; 20 zł rozgrzewki konta; sukces testu zdefiniowany jako drabinka uwagi (CTR → CTA → demo → checkout), zakupy jako bonus; beta 10 prawdziwych kupujących za 0 zł przed reklamą; recenzja treści przez mechanika jako zalecenie; gwarancja w tekście zgody i nad przyciskiem płatności; kody promocyjne wyłączone w checkout.
- Odrzucone: skrócenie dostępu do 12 miesięcy (treść statyczna, koszt utrzymania pomijalny; 24 miesiące zostaje jako uczciwa obietnica); rezygnacja z optymalizacji pod Purchase (jedyne zdarzenie odpowiadające na pytanie o pieniądze; przy braku danych przełączamy na InitiateCheckout w nowej kampanii dnia 3).

## 2026-09-28 · Treść produktu: 160 punktów w 7 etapach (nie „ok. 150”), 14 dealbreakerów, 18 pól liczbowych, 0 wycen napraw
- Dlaczego: liczba na landingu, w reklamach i w produkcie ma się zgadzać co do sztuki (zaufanie); wyceny napraw wyłączone z treści (ryzyko błędu i sporu), zostają fakty i zdania do negocjacji.
- 16 pozycji „do weryfikacji” zebranych w `product/content/SOURCES-auto.md` — do przejrzenia przed startem (najlepiej przez mechanika, patrz Checkpoint 3 pkt G).

## 2026-09-29 · Po audycie zewnętrznym A i pomyśle właściciela: przesuwamy przewagę z „checklisty” na „raport, dowody i porównanie aut”
- Przyjęte (wdrażane przed deployem, bez udziału właściciela): pozycjonowanie „prowadzenie przy aucie + dowody przypięte do problemu + dealbreakery + raport i argumenty” zamiast „interaktywna checklista, 160 punktów”; „160” schodzi niżej jako dowód kompletności; obietnica „lista, o co zbić cenę” → „lista problemów i argumentów do negocjacji”; kotwica „39 zł raz, używasz przy każdym aucie” zamiast paliwa; sekcja „Tak wygląda raport” z pełnym przykładowym wynikiem; sekcja „Skąd to wiemy” (źródła, metoda, kto sprawdził, testy beta); tabela „darmowa checklista vs Odhacz” bez nazw konkurentów; w produkcie: **Szybki filtr** (najpierw odsiej: dokumenty, VIN, zimny start, dealbreakery), **mapa lakieru** (12 elementów auta z odczytami µm względem dachu), **Raport z oględzin** (nagłówek, decyzja, mapa, lista wg etapów, pomiary, notatki, zdjęcia), **porównanie aut** obok siebie (2–3 auta), **pełny scenariusz rozmowy** (co powiedzieć, co gdy sprzedawca kręci, wersja wiadomości OLX/Otomoto dla tych, którzy nie dzwonią).
- Odrzucone: koszty napraw i kwoty negocjacji w produkcie (ryzyko błędu i sporu; przewaga AutoLert w tej sferze jest ich, nie nasza); test ceny 39 vs 49 w pierwszej turze (przy ~150 wejściach 75 na ramię to szum; wraca przy drugiej turze budżetu); podnoszenie ceny na start.
- Offline: aplikacja ma service worker; deklarację „działa bez zasięgu po pierwszym otwarciu” przywracamy na landingu dopiero po teście na prawdziwym iPhonie i Androidzie (Checkpoint 3).

## 2026-09-29 · Po teście właściciela na telefonie: etap 1 staje się kreatorem „Zanim pojedziesz”, rozmowa ze sprzedawcą wbudowana w krok, jedno otwarcie na typ sprzedawcy
- Dlaczego: statyczna lista „Zacznij tu” odsyłała do skryptu rozmowy schowanego w kafelku (właściciel musiał go szukać); 3 warianty otwarcia bez instrukcji, kiedy którego użyć. Zasada produktu: narzędzie prowadzi za rękę, więc każda instrukcja typu „zadzwoń i przejdź skrypt” musi mieć skrypt w tym samym miejscu.
- Zmiany: kreator 5 kroków (Ogłoszenie → VIN i historia → Rozmowa z wbudowanym skryptem i ustaleniami → Co zabrać → Plan B); wybór „Osoba prywatna / Handlarz·komis” na starcie rozmowy, dokładnie jedno otwarcie na typ; dla prywatnego test „czy to nie handlarz” (3 pytania) z przełącznikiem; dla komisu 3 dodatkowe pytania o fakturę, pochodzenie i odpowiedzialność; odpowiedzi z rozmowy liczą się do raportu jako grupa „Rozmowa ze sprzedawcą”; strona główna: jeden przycisk „Kontynuuj”, kafelki schowane pod „Więcej”.
- Odrzucono: trzeci wariant otwarcia „Nie wiem” (zamiast tego: prywatny + test na handlarza), osobny ekran skryptu jako główne wejście.
