/* Odhacz Auto — landing behaviour (vanilla, no dependencies):
 *  - sticky bottom CTA bar on mobile, shown after the hero is scrolled past,
 *    hidden whenever the cookie banner (#consent-banner from consent.js) is on screen;
 *  - "Ustawienia cookies" -> Consent.show();
 *  - interactive demo: 5 items of the phase "Nadwozie i lakier" with OK / Uwaga / Problem / Pomiń,
 *    a µm field, a photo toggle, a live red-flag counter and generated negotiation lines.
 *  Analytics: demo_start (first tap) and demo_done (all items answered) via window.track when present.
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

  /* ---------- Demo: phase 3 "Nadwozie i lakier" (5 of the real items) ---------- */
  var ITEMS = [
    {
      id: 'lakier',
      title: 'Grubość lakieru: maska',
      how: 'Fabrycznie zwykle kilkadziesiąt–ok. 150 µm na stali; jeden element wyraźnie wyżej = malowany.',
      field: { label: 'Pomiar', unit: 'µm', placeholder: 'np. 110' },
      line: function (ctx) {
        return ctx.value
          ? 'Lakier na masce ' + ctx.value + ' µm przy ~110 na reszcie — proszę o wyjaśnienie i korektę ceny.'
          : 'Lakier na masce wyraźnie grubszy niż na reszcie auta — proszę o wyjaśnienie i korektę ceny.';
      }
    },
    {
      id: 'spasowanie',
      title: 'Spasowanie drzwi i błotników — równe szczeliny?',
      how: 'Przejedź palcem wzdłuż szczelin po obu stronach auta. Jedna szersza albo zbiegająca się = element był zdejmowany.',
      line: 'Nierówne szczeliny przy drzwiach i błotniku — element był demontowany lub naprawiany, proszę o wyjaśnienie.'
    },
    {
      id: 'szyby',
      title: 'Szyby: ten sam producent i rok na wszystkich?',
      how: 'W rogu każdej szyby jest logo producenta i kod z rokiem. Inna szyba = wymieniana; pytanie brzmi: dlaczego.',
      line: 'Jedna z szyb ma innego producenta lub rok niż pozostałe — była wymieniana, proszę o powód.'
    },
    {
      id: 'sruby',
      title: 'Śruby maski/błotników — ślady klucza?',
      how: 'Fabryczne śruby mają nienaruszony lakier. Obtarte krawędzie = element był odkręcany.',
      photo: true,
      line: function (ctx) {
        return 'Ślady klucza na śrubach maski/błotników — element był demontowany, proszę o historię napraw.' + (ctx.photo ? ' (zdjęcie w załączniku)' : '');
      }
    },
    {
      id: 'rdza',
      title: 'Rdza: progi, nadkola, krawędzie drzwi',
      how: 'Zajrzyj pod uszczelki i za nadkola, dotknij progów od spodu. Bąble pod lakierem liczą się jak rdza.',
      line: 'Rdza na progach / nadkolach / krawędziach drzwi — obniża wartość, proszę o korektę ceny.'
    }
  ];
  var STATES = [
    { key: 'ok', label: 'OK' },
    { key: 'warn', label: 'Uwaga' },
    { key: 'bad', label: 'Problem' },
    { key: 'skip', label: 'Pomiń' }
  ];
  var ICON_CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A2.5 2.5 0 016.5 6H8l1.2-2h5.6L16 6h1.5A2.5 2.5 0 0120 8.5v8a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var list = doc.getElementById('demo-list');
  if (list) {
    var state = {};   // id -> 'ok' | 'warn' | 'bad' | 'skip'
    var values = {};  // id -> numeric field value (string)
    var photos = {};  // id -> true when "zdjęcie dodane"
    var started = false;
    var finished = false;
    var flagsEl = doc.getElementById('demo-flags');
    var notesEl = doc.getElementById('demo-notes');
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
    function plural(n, forms) { // forms: ['wpis', 'wpisy', 'wpisów']
      if (n === 1) return forms[0];
      var m10 = n % 10, m100 = n % 100;
      if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
      return forms[2];
    }
    function send(event, props) {
      if (typeof window.track !== 'function') return;
      try { window.track(event, props || {}); } catch (err) { /* analytics is best-effort */ }
    }
    function markStart(id) {
      if (started) return;
      started = true;
      send('demo_start', { item: id });
    }
    function lineFor(it) {
      var ctx = { value: values[it.id] || '', photo: !!photos[it.id] };
      return typeof it.line === 'function' ? it.line(ctx) : it.line;
    }

    ITEMS.forEach(function (it, i) {
      var li = el('li', 'demo-item');
      li.id = 'demo-item-' + it.id;
      li.setAttribute('data-id', it.id);

      var head = el('div', 'demo-head');
      head.appendChild(el('span', 'demo-n', String(i + 1)));
      var body = el('div');
      body.appendChild(el('h3', 'demo-title', it.title));
      body.appendChild(el('p', 'demo-how', it.how));
      head.appendChild(body);
      li.appendChild(head);

      if (it.field || it.photo) {
        var tools = el('div', 'demo-tools');
        if (it.field) {
          var label = el('label', 'demo-field');
          label.appendChild(el('span', null, it.field.label));
          var input = doc.createElement('input');
          input.type = 'number';
          input.inputMode = 'numeric';
          input.min = '0';
          input.max = '3000';
          input.step = '1';
          input.placeholder = it.field.placeholder;
          input.setAttribute('aria-label', it.field.label + ' w ' + it.field.unit + ': ' + it.title);
          input.setAttribute('data-field', it.id);
          label.appendChild(input);
          label.appendChild(el('span', 'unit', it.field.unit));
          tools.appendChild(label);
        }
        if (it.photo) {
          var btn = el('button', 'demo-photo');
          btn.type = 'button';
          btn.setAttribute('data-photo', it.id);
          btn.setAttribute('aria-pressed', 'false');
          btn.innerHTML = ICON_CAMERA + '<span>Dodaj zdjęcie</span>';
          tools.appendChild(btn);
          var chip = el('span', 'chip-photo');
          chip.hidden = true;
          chip.innerHTML = ICON_CHECK + 'zdjęcie dodane';
          tools.appendChild(chip);
        }
        li.appendChild(tools);
      }

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

      var note = el('div', 'demo-note');
      note.hidden = true;
      note.setAttribute('role', 'status');
      note.appendChild(el('span', 'demo-note-l', 'Tak wygląda wpis na Twojej liście uwag:'));
      note.appendChild(el('p', 'demo-note-t', ''));
      li.appendChild(note);

      list.appendChild(li);
    });

    function render() {
      var flags = 0, notes = 0, answered = 0;
      ITEMS.forEach(function (it) {
        var s = state[it.id];
        if (s) answered++;
        if (s === 'bad') flags++;
        if (s === 'bad' || s === 'warn') notes++;
        var li = doc.getElementById('demo-item-' + it.id);
        li.className = 'demo-item' + (s ? ' is-' + s : '');
        var buttons = li.querySelectorAll('.st');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-state') === s));
        }
        var note = li.querySelector('.demo-note');
        var show = s === 'bad' || s === 'warn';
        note.hidden = !show;
        note.classList.toggle('is-warn', s === 'warn');
        if (show) note.querySelector('.demo-note-t').textContent = lineFor(it);
        if (it.photo) {
          var btn = li.querySelector('.demo-photo');
          var chip = li.querySelector('.chip-photo');
          btn.setAttribute('aria-pressed', String(!!photos[it.id]));
          btn.querySelector('span').textContent = photos[it.id] ? 'Usuń zdjęcie' : 'Dodaj zdjęcie';
          chip.hidden = !photos[it.id];
        }
      });
      flagsEl.textContent = String(flags);
      notesEl.textContent = String(notes);
      progEl.textContent = answered + '/' + ITEMS.length;
      counterEl.classList.toggle('has-flags', flags > 0);

      var complete = answered === ITEMS.length;
      doneEl.hidden = !complete;
      if (complete) {
        var msg;
        if (notes > 0) {
          msg = 'Etap odhaczony: ' + notes + ' ' + plural(notes, ['wpis', 'wpisy', 'wpisów']) + ' na liście uwag, w tym ' +
            flags + ' ' + plural(flags, ['czerwona flaga', 'czerwone flagi', 'czerwonych flag']) +
            '. W pełnej wersji raport składa się sam ze wszystkich 7 etapów — zapisujesz PDF albo wysyłasz sobie jednym tapnięciem.';
        } else {
          msg = 'Etap odhaczony bez uwag. Dealbreakery czekają w innych etapach: zimny start, zgodność VIN, kontrolka airbag.';
        }
        doneText.textContent = msg;
        if (!finished) {
          finished = true;
          send('demo_done', { flags: flags, notes: notes });
        }
      }
    }

    list.addEventListener('click', function (e) {
      var st = e.target.closest('.st');
      if (st) {
        var li = st.closest('.demo-item');
        var id = li.getAttribute('data-id');
        var s = st.getAttribute('data-state');
        state[id] = state[id] === s ? undefined : s; // tap again to clear
        markStart(id);
        render();
        return;
      }
      var ph = e.target.closest('[data-photo]');
      if (ph) {
        var pid = ph.getAttribute('data-photo');
        photos[pid] = !photos[pid];
        markStart(pid);
        render();
      }
    });
    list.addEventListener('input', function (e) {
      var f = e.target.closest('[data-field]');
      if (!f) return;
      var v = String(f.value || '').replace(/[^\d]/g, '').slice(0, 4);
      values[f.getAttribute('data-field')] = v;
      markStart(f.getAttribute('data-field'));
      render();
    });

    var reset = doc.getElementById('demo-reset');
    if (reset) reset.addEventListener('click', function () {
      state = {}; values = {}; photos = {};
      list.querySelectorAll('[data-field]').forEach(function (f) { f.value = ''; });
      render();
      var first = list.querySelector('.st');
      if (first) first.focus();
    });

    render();
  }
})();
