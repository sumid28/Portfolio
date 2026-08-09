/* =========================================================
   Shared nav behaviour.
   Loaded with `defer` from every page, so the DOM is already
   parsed by the time this runs — no DOMContentLoaded needed.
   ========================================================= */

/* On mobile the nav links sit in a horizontally scrolling row.
   Without this, landing on (say) the Art page shows a row that
   appears to start at "Home" with the current page hidden off
   to the right. Centre the active pill instead.

   Timing matters: the fonts are loaded with `display=swap`, so
   the row is first laid out with fallback metrics and reflows
   once Fraunces and Inter arrive. Scrolling before that lands
   in the wrong place, so wait on document.fonts.ready. */
(function () {
  function centreActivePill() {
    var active = document.querySelector('.nav-links a.active');
    if (!active) return;                    // e.g. ARTF1250, which has no active link

    var row = active.closest('.nav-links');
    if (!row) return;
    if (row.scrollWidth <= row.clientWidth) return;   // desktop: nothing to scroll

    // block:'nearest' stops the browser scrolling the whole page
    // down to reach the header.
    active.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(centreActivePill);
  } else {
    centreActivePill();
  }
})();
