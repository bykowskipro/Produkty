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
