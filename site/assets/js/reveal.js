/* NorthBound Web — section reveal.
   8px rise, 200ms, once per element. The only motion on the site.
   The hidden state lives in CSS behind html.js, so with JS disabled
   every section renders normally. */
(function () {
  'use strict';

  var els = document.querySelectorAll('[data-rise]');
  if (!els.length) return;

  function reveal(el) { el.classList.add('is-revealed'); }
  function revealAll() { Array.prototype.forEach.call(els, reveal); }

  // Reduced motion, or no IntersectionObserver: show everything immediately.
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  Array.prototype.forEach.call(els, function (el) { io.observe(el); });

  // Failsafe: nothing stays hidden longer than 2s regardless.
  setTimeout(revealAll, 2000);
})();
