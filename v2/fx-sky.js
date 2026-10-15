/*
 * Shooting-star backdrop. Thirteen streaks are laid out from a fixed seed so the
 * sky looks identical on every visit; the motion itself is CSS (transform and
 * opacity only), so the browser can run it on the compositor.
 */
(function () {
  'use strict';
  var sky = document.querySelector('[data-fx-sky]');
  if (!sky) return;
  var seed = 0x2f6b9d;
  function next() { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return seed / 4294967296; }
  var COUNT = 13, bits = document.createDocumentFragment();
  for (var i = 0; i < COUNT; i++) {
    var lane = (i * 0.6180339887) % 1;           // golden-ratio spread across the width
    var period = 10 + next() * 5;
    var streak = document.createElement('i');
    streak.className = 'streak';
    streak.style.setProperty('--sx', (lane * 96 - 2 + next() * 4).toFixed(1) + '%');
    streak.style.setProperty('--sy', (-12 + ((i * 7) % COUNT) / COUNT * 96 + next() * 6).toFixed(1) + '%');
    streak.style.setProperty('--t', period.toFixed(2) + 's');
    streak.style.setProperty('--d', (-next() * period).toFixed(2) + 's');
    streak.style.setProperty('--len', Math.round(92 + next() * 42) + 'px');
    streak.style.setProperty('--run', Math.round(290 + next() * 100) + 'px');
    streak.appendChild(document.createElement('b'));
    bits.appendChild(streak);
  }
  sky.appendChild(bits);
})();
