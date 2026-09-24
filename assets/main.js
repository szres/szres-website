/* SZRES site interactions: nav, reveal animations, memories rendering */
(function () {
  'use strict';

  /* ---- top nav ---- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
  }
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---- language (set by i18n.js, toggled in top-right corner) ---- */
  var I18N = window.SZRES_I18N || {};
  var LANG = I18N.lang || 'zh';
  function pick(zhVal, enVal) { return (LANG === 'en' && enVal) ? enVal : zhVal; }

  /* ---- memories data ---- */
  var DATA = (window.SZRES_MEMORIES || []).slice().sort(function (a, b) {
    return (a.year - b.year) || String(a.date || '').localeCompare(String(b.date || ''));
  });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function cardHTML(m) {
    var tags = (m.tags || []).map(function (t) {
      var label = LANG === 'en' ? ((I18N.TAGS && I18N.TAGS[t]) || t) : t;
      return '<span>' + esc(label) + '</span>';
    }).join('');
    var btn = '';
    if (m.button && m.button.url) {
      var rawLabel = m.button.label_en || m.button.label || 'Read more';
      var label = LANG === 'en' ? ((I18N.BTN && I18N.BTN[rawLabel]) || rawLabel) : rawLabel;
      btn = m.link
        ? '<span class="mem-btn">' + esc(label) + '</span>'
        : '<a class="mem-btn" href="' + esc(m.button.url) + '" target="_blank" rel="noopener">' + esc(label) + '</a>';
    }
    var inner =
      '<div class="mem-year">' + m.year +
      '<span class="mem-date">' + esc(m.date || '') + '</span></div>' +
      '<h3>' + esc(pick(m.title, m.title_en)) + '</h3>' +
      '<p>' + esc(pick(m.excerpt, m.excerpt_en)) + '</p>' +
      (tags ? '<div class="mem-tags">' + tags + '</div>' : '') +
      (btn ? '<div class="mem-btnrow">' + btn + '</div>' : '');
    var cls = 'mem-card reveal';
    return m.link
      ? '<a class="' + cls + '" href="' + esc(m.link) + '">' + inner + '</a>'
      : '<div class="' + cls + '">' + inner + '</div>';
  }

  function emptyHTML(label) {
    return '<div class="mem-empty reveal">『 ' + label + ' · TO BE ARCHIVED 』</div>';
  }

  /* home preview: latest three entries */
  var prev = document.getElementById('mem-preview-grid');
  if (prev) {
    prev.innerHTML = DATA.length
      ? DATA.slice(-3).reverse().map(cardHTML).join('')
      : emptyHTML('回忆档案整理中');
  }

  /* archive page: every year 2013-2026, newest year first (within a year, newest entry first) */
  var arch = document.getElementById('mem-archive');
  if (arch) {
    var byYear = {};
    DATA.forEach(function (m) { (byYear[m.year] = byYear[m.year] || []).push(m); });
    var html = '';
    for (var y = 2026; y >= 2013; y--) {
      var yearCards = (byYear[y] || []).slice().reverse();
      var cards = yearCards.map(cardHTML).join('') || emptyHTML(pick(y + ' 档案整理中', String(y)));
      html += '<section class="year-block"><div class="year-num">' + y +
        '<small>YEAR ' + String(y).slice(2) + '</small></div>' +
        '<div class="year-cards">' + cards + '</div></section>';
    }
    arch.innerHTML = html;
  }

  /* ---- reveal on scroll (after cards are injected) ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
