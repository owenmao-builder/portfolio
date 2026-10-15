/*
 * Edge flipping: once the reader reaches the end (or start) of a page, keep
 * scrolling, swipe, or press PageDown/PageUp to move to the next (or previous)
 * page in sidebar order. Reading always wins: a gesture that scrolled text,
 * or that happens inside a scrollable box, never turns the page.
 */
(function (global) {
  'use strict';
  var fx = global.OwenFx || (global.OwenFx = {});
  var QUIET_MS = 200;   // pause that separates two wheel gestures
  var WHEEL_PX = 90;    // wheel travel needed past the edge
  var SWIPE_PX = 60;    // finger travel needed past the edge
  var SWIPE_MS = 1200;  // slower drags count as reading, not flipping
  var SLACK = 2;
  var LIVE = { passive: false }, CALM = { passive: true };
  var FIELDS = 'textarea, input, select, [contenteditable]:not([contenteditable="false"]), [data-native-scroll]';

  function inField(node) {
    return Boolean(node && node.closest && node.closest(FIELDS));
  }
  function hasRoom(el, dir) {
    return dir > 0 ? el.scrollHeight - el.clientHeight - el.scrollTop > SLACK : el.scrollTop > SLACK;
  }
  function innerRoom(node, boundary, dir) {
    for (var el = node instanceof Element ? node : null; el && el !== boundary; el = el.parentElement) {
      if (el.scrollHeight - el.clientHeight <= SLACK) continue;
      var overflow = getComputedStyle(el).overflowY;
      if ((overflow === 'auto' || overflow === 'scroll') && hasRoom(el, dir)) return true;
    }
    return false;
  }

  fx.attachEdgeFlip = function (scroller, hooks) {
    function readable(target, dir) { return innerRoom(target, scroller, dir) || hasRoom(scroller, dir); }

    var gesture = null; // { dir, travel, last, read, spent }
    scroller.addEventListener('wheel', function (event) {
      if (event.ctrlKey || !hooks.allowed() || inField(event.target)) return; // ctrl+wheel is zoom
      var sideways = Math.abs(event.deltaX), upright = Math.abs(event.deltaY);
      if (sideways > upright) return;
      var perUnit = [1, 16, scroller.clientHeight][event.deltaMode] || 1; // pixels, lines, pages
      var dy = event.deltaY * perUnit;
      if (Math.abs(dy) < 0.5) return;
      var dir = dy > 0 ? 1 : -1, now = performance.now();
      if (!gesture || now - gesture.last > QUIET_MS) gesture = { dir: dir, travel: 0, last: now, read: false, spent: false };
      gesture.last = now;
      if (gesture.spent || hooks.busy()) return void event.preventDefault();
      if (readable(event.target, dir)) { gesture.read = true; gesture.travel = 0; return; }
      if (!hooks.hasPage(dir)) return;
      event.preventDefault(); // at the edge: stop the bounce, maybe flip
      if (gesture.read) return; // this gesture already scrolled text; wait for the next one
      if (gesture.dir !== dir) { gesture.dir = dir; gesture.travel = 0; }
      gesture.travel += Math.abs(dy);
      if (gesture.travel >= WHEEL_PX) { gesture.spent = true; hooks.go(dir); }
    }, LIVE);

    var finger = null;
    scroller.addEventListener('touchstart', function (event) {
      finger = null;
      var single = event.touches.length === 1;
      if (!single || inField(event.target) || !hooks.allowed() || hooks.busy()) return;
      var p = event.touches[0];
      finger = { x: p.clientX, y: p.clientY, dx: 0, dy: 0, at: performance.now(), read: false };
    }, CALM);
    scroller.addEventListener('touchmove', function (event) {
      if (!finger) return;
      if (event.touches.length > 1 || !hooks.allowed()) { finger = null; return; }
      var p = event.touches[0];
      finger.dx = finger.x - p.clientX;
      finger.dy = finger.y - p.clientY;
      if (Math.abs(finger.dy) < 8 || Math.abs(finger.dy) < Math.abs(finger.dx) * 1.2) return;
      var dir = finger.dy > 0 ? 1 : -1;
      if (readable(event.target, dir)) finger.read = true;
      if (finger.read || !hooks.hasPage(dir) || !event.cancelable) return;
      event.preventDefault();
    }, LIVE);
    scroller.addEventListener('touchend', function () {
      var f = finger; finger = null;
      if (!f || f.read || !hooks.allowed() || hooks.busy()) return;
      var tooSlow = performance.now() - f.at > SWIPE_MS;
      if (tooSlow) return;
      if (Math.abs(f.dy) < SWIPE_PX || Math.abs(f.dy) < Math.abs(f.dx) * 1.2) return;
      var dir = f.dy > 0 ? 1 : -1;
      if (!hasRoom(scroller, dir) && hooks.hasPage(dir)) hooks.go(dir);
    }, CALM);
    scroller.addEventListener('touchcancel', function () { finger = null; }, CALM);

    scroller.addEventListener('keydown', function (event) {
      var dir = { PageDown: 1, PageUp: -1 }[event.key];
      var chord = event.altKey || event.ctrlKey || event.metaKey;
      if (!dir || chord || inField(event.target) || !hooks.allowed()) return;
      if (hasRoom(scroller, dir) || !hooks.hasPage(dir)) return; // let the browser page through text
      event.preventDefault();
      if (event.repeat || hooks.busy()) return;
      hooks.go(dir);
    });
  };
})(window);
