/* Odhacz Auto — landing behaviour (vanilla, no dependencies):
 *  - sticky bottom CTA bar on mobile, shown after the hero is scrolled past,
 *    hidden whenever the cookie banner (#consent-banner from consent.js) is on screen;
 *  - "Ustawienia cookies" -> Consent.show();
 *  - interactive demo: 6 items of the phase "Zanim pojedziesz" with OK / Uwaga / Problem / Pomiń,
 *    live red-flag + dealbreaker counter, and the "wpis na liście uwag" card for the dealbreaker.
 * Depends only on globals that consent.js / analytics.js may provide (Consent, track) — all optional.
 */
(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;

  /* ---------- Sticky CTA bar ---------- */
  var sticky = doc.getElementById('sticky-cta');
  var hero = doc.getElementById('hero');
  var finalCta = doc.getElementById('start');
  var pastHero = false;
  var finalVisible = false;
  var stickyOn = false;

  function applySticky() {
    var on = pastHero && !finalVisible;
    if (on === stickyOn) return;
    stickyOn = on;
    sticky.classList.toggle('is-on', on);
    doc.body.classList.toggle('sticky-space', on);
  }

  if (sticky && hero) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var e = entries[0];
        pastHero = !e.isIntersecting && e.boundingClientRect.bottom < 0;
        applySticky();
      }, { threshold: 0 }).observe(hero);
      if (finalCta) {
        new IntersectionObserver(function (entries) {
          finalVisible = entries[0].isIntersecting;
          applySticky();
        }, { threshold: 0.2 }).observe(finalCta);
      }
    } else {
      var onScroll = function () {
        pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight;
        applySticky();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* The cookie banner is a fixed bottom bar too: while it is in the DOM, the sticky CTA stays hidden. */
  function syncBanner() {
    root.classList.toggle('has-consent-banner', !!doc.getElementById('consent-banner'));
  }
  if ('MutationObserver' in window) new MutationObserver(syncBanner).observe(doc.body, { childList: true });
  window.addEventListener('consentchange', syncBanner);
  syncBanner();

  /* ---------- Cookie settings link ---------- */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cookie-settings]');
    if (!el) return;
    e.preventDefault();
    if (window.Consent && typeof window.Consent.show === 'function') window.Consent.show();
  });

  /* ---------- Demo: phase 1 "Zanim pojedziesz" (6 of the real items) ---------- */
  var ITEMS = [
    {
      id: 'zdjecia',
      title: 'Zdjęcia w ogłoszeniu pokazują całe auto',
      how: 'Szukasz: wszystkie boki, wnętrze, licznik z przebiegiem, komora silnika. Brak zdjęcia licznika albo zdjęcia tylko po deszczu i nocą = Uwaga.'
    },
    {
      id: 'cena',
      title: 'Cena w normie dla rocznika i przebiegu',
      how: 'Porównaj 5–10 podobnych ogłoszeń. Wyraźnie taniej bez podanego powodu = Problem: ktoś chce sprzedać szybko albo coś ukrywa.'
    },
    {
      id: 'vin',
      title: 'VIN podany przed spotkaniem',
      how: 'Poproś o VIN w wiadomości albo przez telefon. Sprzedawca odmawia podania VIN przed spotkaniem = Problem i dealbreaker: nie sprawdzisz historii, nie jedziesz.',
      dealbreaker: true,
      note: 'Sprzedawca odmawia podania VIN przed spotkaniem — nie da się sprawdzić historii pojazdu. Dealbreaker: nie jadę.'
    },
    {
      id: 'historia',
      title: 'Historia pojazdu zgadza się z ogłoszeniem',
      how: 'Wpisz VIN w bezpłatnej Historii Pojazdu (gov.pl). Przebieg w ogłoszeniu niższy niż na ostatnim przeglądzie = Problem.'
    },
    {
      id: 'wlasciciel',
      title: 'Telefon: sprzedawca jest właścicielem z dowodu',
      how: 'Pytasz wprost: „Auto jest na Pana / Panią? Od kiedy?”. „Sprzedaję dla znajomego” = Uwaga — sprawdzisz w dowodzie rejestracyjnym na miejscu.'
    },
    {
      id: 'zimny',
      title: 'Oględziny umówione na zimnym silniku',
      how: 'Poproś, żeby auto nie było odpalane przed Twoim przyjazdem. Sprzedawca „podjedzie na miejsce” = Uwaga: zimny start sprawdzisz innym razem albo odejmiesz od ceny.'
    }
  ];
  var STATES = [
    { key: 'ok', label: 'OK' },
    { key: 'warn', label: 'Uwaga' },
    { key: 'bad', label: 'Problem' },
    { key: 'skip', label: 'Pomiń' }
  ];

  var list = doc.getElementById('demo-list');
  if (list) {
    var state = {};
    var tracked = false;
    var flagsEl = doc.getElementById('demo-flags');
    var dbEl = doc.getElementById('demo-db');
    var progEl = doc.getElementById('demo-progress');
    var counterEl = doc.getElementById('demo-counter');
    var doneEl = doc.getElementById('demo-done');
    var doneText = doc.getElementById('demo-done-text');

    function el(tag, cls, text) {
      var n = doc.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    }

    function plural(n, forms) { // forms: ['flaga', 'flagi', 'flag']
      if (n === 1) return forms[0];
      var m10 = n % 10, m100 = n % 100;
      if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
      return forms[2];
    }

    ITEMS.forEach(function (it, i) {
      var li = el('li', 'demo-item');
      li.id = 'demo-item-' + it.id;
      li.setAttribute('data-id', it.id);

      var head = el('div', 'demo-head');
      head.appendChild(el('span', 'demo-n', String(i + 1)));
      var body = el('div');
      var h = el('h3', 'demo-title', it.title);
      if (it.dealbreaker) h.appendChild(el('span', 'badge-db', 'dealbreaker'));
      body.appendChild(h);
      body.appendChild(el('p', 'demo-how', it.how));
      head.appendChild(body);
      li.appendChild(head);

      var group = el('div', 'states');
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', 'Odpowiedź: ' + it.title);
      STATES.forEach(function (s) {
        var b = el('button', 'st st-' + s.key, s.label);
        b.type = 'button';
        b.setAttribute('data-state', s.key);
        b.setAttribute('aria-pressed', 'false');
        group.appendChild(b);
      });
      li.appendChild(group);

      if (it.dealbreaker) {
        var note = el('div', 'demo-note');
        note.hidden = true;
        note.setAttribute('role', 'status');
        note.appendChild(el('span', 'demo-note-l', 'Tak wygląda wpis na Twojej liście uwag:'));
        note.appendChild(el('p', 'demo-note-t', it.note));
        li.appendChild(note);
      }
      list.appendChild(li);
    });

    function render() {
      var flags = 0, dbs = 0, answered = 0;
      ITEMS.forEach(function (it) {
        var s = state[it.id];
        if (s) answered++;
        if (s === 'bad') { flags++; if (it.dealbreaker) dbs++; }
        var li = doc.getElementById('demo-item-' + it.id);
        li.className = 'demo-item' + (s ? ' is-' + s : '');
        var buttons = li.querySelectorAll('.st');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-state') === s));
        }
        var note = li.querySelector('.demo-note');
        if (note) note.hidden = !(it.dealbreaker && s === 'bad');
      });
      flagsEl.textContent = String(flags);
      dbEl.textContent = String(dbs);
      progEl.textContent = answered + '/' + ITEMS.length;
      counterEl.classList.toggle('has-db', dbs > 0);

      var complete = answered === ITEMS.length;
      doneEl.hidden = !complete;
      if (complete) {
        var msg;
        if (dbs > 0) {
          msg = 'Etap 1 odhaczony: ' + flags + ' ' + plural(flags, ['czerwona flaga', 'czerwone flagi', 'czerwonych flag']) + ', w tym dealbreaker. W pełnej wersji podsumowanie mówi wprost: odpuść — i wypisuje dlaczego.';
        } else if (flags > 0) {
          msg = 'Etap 1 odhaczony: ' + flags + ' ' + plural(flags, ['czerwona flaga', 'czerwone flagi', 'czerwonych flag']) + '. W pełnej wersji każda trafia na listę uwag do negocjacji — a przed Tobą jeszcze 6 etapów przy aucie.';
        } else {
          msg = 'Etap 1 odhaczony, bez czerwonych flag. Przed Tobą jeszcze 6 etapów przy aucie — tam zwykle zaczyna się liczenie.';
        }
        doneText.textContent = msg;
      }
    }

    list.addEventListener('click', function (e) {
      var b = e.target.closest('.st');
      if (!b) return;
      var li = b.closest('.demo-item');
      var id = li.getAttribute('data-id');
      var s = b.getAttribute('data-state');
      state[id] = state[id] === s ? undefined : s; // tap again to clear
      render();
      if (!tracked && typeof window.track === 'function') {
        tracked = true;
        try { window.track('demo_interact', { item: id, state: s }); } catch (err) { /* analytics is best-effort */ }
      }
    });

    var reset = doc.getElementById('demo-reset');
    if (reset) reset.addEventListener('click', function () {
      state = {};
      render();
      var first = list.querySelector('.st');
      if (first) first.focus();
    });

    render();
  }
})();
