/*
 * Layered entrance for page content. Three looks, picked per section via data-motion:
 *   rise    - blocks drift up into place
 *   stagger - cards and rows glide in from the right, one after another
 *   focus   - the portrait sharpens and settles while text drifts up
 * Content below the fold waits until it scrolls into view. Any interaction
 * jumps running entrances to their end state so nothing gets in the reader's way.
 */
(function (global) {
  'use strict';
  var fx = global.OwenFx || (global.OwenFx = {});
  var CURVE = 'cubic-bezier(.16,.84,.3,1)';

  function lift(px) { return { opacity: 0, transform: 'translate3d(0,' + px + 'px,0)' }; }
  var HEAD = '.view-head', BODY = ['.body-copy > *', '.inline-link'];
  var LOOKS = {
    rise: {
      targets: [HEAD, '.facts', '.callout'].concat(BODY).join(),
      from: function () { return lift(14); }, ms: 640, gap: 85
    },
    stagger: {
      targets: [HEAD, '.tile', '.post', '.channel'].join(),
      from: function (el) {
        return el.matches(HEAD) ? lift(12) : { opacity: 0, transform: 'translate3d(18px,0,0)' };
      }, ms: 620, gap: 80
    },
    focus: {
      targets: [HEAD, '.bio > img', '.bio > div'].concat(BODY).join(),
      from: function (el) {
        return el.tagName === 'IMG' ? { filter: 'blur(6px)', opacity: 0, transform: 'scale(.95)' } : lift(10);
      }, ms: 760, gap: 90
    }
  };

  fx.createRevealer = function (viewport) {
    var running = new Set();
    var waiting = new Map(); // element -> { from, ms } until it becomes visible
    var watcher = null;

    function start(el, from, ms, delay) {
      var to = { opacity: 1, transform: 'none' };
      if (from.filter) to.filter = 'none';
      var anim = el.animate([from, to], { duration: ms, delay: delay, easing: CURVE, fill: 'backwards' });
      running.add(anim);
      var forget = function () { running.delete(anim); };
      anim.addEventListener('finish', forget);
      anim.addEventListener('cancel', forget);
    }

    function wake(el) {
      var job = waiting.get(el);
      if (!job) return;
      waiting.delete(el);
      if (watcher) watcher.unobserve(el);
      el.classList.remove('fx-parked');
      start(el, job.from, job.ms, 0);
    }

    function watch(el, job) {
      if (!watcher) watcher = new IntersectionObserver(onSeen, { threshold: 0.08, root: viewport });
      waiting.set(el, job);
      el.classList.add('fx-parked');
      watcher.observe(el);
    }

    function onSeen(entries) {
      for (var n = 0; n < entries.length; n++) if (entries[n].isIntersecting) wake(entries[n].target);
    }

    // Jump every running entrance to its final frame.
    function settle() {
      running.forEach(function (anim) { try { anim.finish(); } catch (err) { anim.cancel(); } });
      running.clear();
    }

    function stop() {
      settle();
      waiting.forEach(function (job, el) { el.classList.remove('fx-parked'); });
      waiting.clear();
      if (watcher) { watcher.disconnect(); watcher = null; }
    }

    // steps: [element, delayMs, durationMs, risePx = 6, startOpacity = 0, kind]
    function play(steps) {
      steps.forEach(function (step) {
        var el = step[0];
        if (!el) return;
        var rise = step[3] == null ? 6 : step[3], fade = step[4] || 0;
        var from = step[5] === 'scale'
          ? { opacity: fade, transform: 'scale(.97)' }
          : { opacity: fade, transform: 'translate3d(0,' + rise + 'px,0)' };
        start(el, from, step[2], step[1]);
      });
    }

    function page(section, delay) {
      if (!section) return;
      var look = LOOKS[section.dataset.motion] || LOOKS.rise;
      var view = viewport.getBoundingClientRect();
      var shown = 0;
      section.querySelectorAll(look.targets).forEach(function (el) {
        var box = el.getBoundingClientRect();
        var job = { from: look.from(el), ms: look.ms };
        if (box.bottom > view.top && box.top < view.bottom) {
          start(el, job.from, job.ms, (delay || 0) + Math.min(shown++ * look.gap, 510));
        } else if ('IntersectionObserver' in global) {
          watch(el, job);
        }
      });
    }

    ['pointerdown', 'keydown', 'wheel', 'focusin'].forEach(function (type) {
      document.addEventListener(type, function (event) {
        if (!running.size && !waiting.size) return;
        settle();
        if (type === 'focusin') {
          waiting.forEach(function (job, el) { if (el.contains(event.target)) wake(el); });
        }
      }, { capture: true, passive: true });
    });

    return { play: play, page: page, settle: settle, stop: stop };
  };
})(window);
