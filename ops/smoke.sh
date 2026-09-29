#!/usr/bin/env bash
# Szybki test serwera po wdrożeniu. Użycie: bash ops/smoke.sh odhacz.pl
set -u
D="${1:?Podaj domenę, np. bash ops/smoke.sh odhacz.pl}"
B="https://$D"
ok=0; bad=0
check() { # check "opis" oczekiwany_kod URL [metoda] [dane]
  local desc="$1" want="$2" url="$3" method="${4:-GET}" data="${5:-}"
  local code
  if [ "$method" = POST ]; then code=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "stripe-signature: t=1,v1=zle" -d "$data" --max-time 15 "$url"); else code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$url"); fi
  if [ "$code" = "$want" ]; then echo "OK    $desc ($code)"; ok=$((ok+1)); else echo "BŁĄD  $desc: jest $code, ma być $want  [$url]"; bad=$((bad+1)); fi
}
echo "Sprawdzam $B"
check "serwer żyje (/healthz)" 200 "$B/healthz"
check "landing" 200 "$B/"
check "regulamin" 200 "$B/legal/regulamin.html"
check "polityka prywatności" 200 "$B/legal/polityka-prywatnosci.html"
check "strona sukcesu" 200 "$B/sukces"
check "silnik aplikacji (plik publiczny)" 200 "$B/assets/checklist/engine.js"
check "produkt zamknięty bez linku (302 na stronę)" 302 "$B/app/content/auto.json"
check "dodatek zamknięty bez linku (302)" 302 "$B/dodatek/content/po-zakupie.json"
check "panel wymaga hasła (401)" 401 "$B/admin"
check "webhook odrzuca zły podpis (400)" 400 "$B/webhook/stripe" POST '{}'
check "www przekierowuje (301)" 301 "https://www.$D/"
hsts=$(curl -s -I --max-time 15 "$B/" | grep -i "strict-transport-security" | wc -l)
if [ "$hsts" -ge 1 ]; then echo "OK    HTTPS z HSTS (Caddy)"; ok=$((ok+1)); else echo "BŁĄD  brak nagłówka HSTS (Caddy nie działa przed aplikacją?)"; bad=$((bad+1)); fi
ph=$(curl -s --max-time 15 "$B/" | grep -o "\[\[[A-Z_]*\]\]" | sort -u | tr '\n' ' ')
if [ -z "$ph" ]; then echo "OK    brak placeholderów na landingu"; ok=$((ok+1)); else echo "BŁĄD  na landingu zostały placeholdery: $ph (uruchom ops/fill-placeholders.mjs)"; bad=$((bad+1)); fi
t=$(curl -s -o /dev/null -w "%{time_total}" --max-time 15 "$B/")
echo "INFO  czas ładowania landingu: ${t}s"
echo; echo "Wynik: $ok OK, $bad błędów."
[ "$bad" -eq 0 ]
