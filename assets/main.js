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
    var tags = (m.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var btn = '';
    if (m.button && m.button.url) {
      var label = esc(m.button.label || '阅读更多');
      btn = m.link
        ? '<span class="mem-btn">' + label + '</span>'
        : '<a class="mem-btn" href="' + esc(m.button.url) + '" target="_blank" rel="noopener">' + label + '</a>';
    }
    var inner =
      '<div class="mem-year">' + m.year +
      '<span class="mem-date">' + esc(m.date || '') + '</span></div>' +
      '<h3>' + esc(m.title) + '</h3>' +
      '<p>' + esc(m.excerpt || '') + '</p>' +
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

  /* archive page: every year 2013-2026 */
  var arch = document.getElementById('mem-archive');
  if (arch) {
    var byYear = {};
    DATA.forEach(function (m) { (byYear[m.year] = byYear[m.year] || []).push(m); });
    var html = '';
    for (var y = 2013; y <= 2026; y++) {
      var cards = (byYear[y] || []).map(cardHTML).join('') || emptyHTML(y + ' 档案整理中');
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
