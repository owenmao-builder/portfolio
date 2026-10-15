/*
 * Opening cover for Owen's site.
 * Greeting phrases are pure CSS; when the hold time ends the cover is replaced
 * by a grid of solid tiles that fade out in a ripple centred on the greeting,
 * while the words themselves blur away. Written for this site; no third-party code.
 */
(function (global) {
  'use strict';
  var fx = global.OwenFx || (global.OwenFx = {});

  function ease(x) { return x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x); }

  // Small integer hash -> [0, 1). Deterministic so the ripple looks the same every time.
  function grain(col, row) {
    var h = Math.imul(col + 40503, 2246822519) ^ Math.imul(row + 9973, 3266489917);
    h ^= h >>> 15; h = Math.imul(h, 668265263); h ^= h >>> 13;
    return (h >>> 0) / 4294967296;
  }

  function buildRipple(cover, anchor, totalMs, onEnd) {
    var width = cover.clientWidth, height = cover.clientHeight;
    var canvas = document.createElement('canvas');
    var pen = canvas.getContext && canvas.getContext('2d');
    if (!width || !height || !pen) return null;

    var scale = Math.min(global.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);
    canvas.className = 'intro-tiles';
    canvas.setAttribute('aria-hidden', 'true');

    var colour = getComputedStyle(cover).backgroundColor;
    var side = Math.max(10, Math.round(Math.sqrt(width * height / 2600)));
    var cols = Math.ceil(width / side), rows = Math.ceil(height / side);
    var coverBox = cover.getBoundingClientRect(), anchorBox = anchor.getBoundingClientRect();
    var ox = anchorBox.left - coverBox.left + anchorBox.width / 2;
    var oy = anchorBox.top - coverBox.top + anchorBox.height / 2;
    var reach = Math.max(Math.hypot(ox, oy), Math.hypot(width - ox, oy),
      Math.hypot(ox, height - oy), Math.hypot(width - ox, height - oy)) || 1;

    var count = cols * rows;
    var startAt = new Float32Array(count);
    var boxes = new Int32Array(count * 4);
    var fadeMs = totalMs * 0.3;
    for (var row = 0, i = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++, i++) {
        var cx = (col + 0.5) * side, cy = (row + 0.5) * side;
        var ring = Math.min(1, Math.hypot(cx - ox, cy - oy) / reach);
        startAt[i] = totalMs * (0.03 + 0.62 * ring + 0.04 * grain(col, row));
        // Snap tile edges to device pixels so neighbours never leave hairline seams.
        var left = Math.round(col * side * scale), top = Math.round(row * side * scale);
        boxes[i * 4] = left;
        boxes[i * 4 + 1] = top;
        boxes[i * 4 + 2] = Math.round(Math.min(width, (col + 1) * side) * scale) - left;
        boxes[i * 4 + 3] = Math.round(Math.min(height, (row + 1) * side) * scale) - top;
      }
    }

    function paint(elapsed) {
      pen.clearRect(0, 0, canvas.width, canvas.height);
      pen.fillStyle = colour;
      for (var k = 0; k < count; k++) {
        var t = (elapsed - startAt[k]) / fadeMs;
        if (t >= 1) continue;
        pen.globalAlpha = 1 - ease(t);
        pen.fillRect(boxes[k * 4], boxes[k * 4 + 1], boxes[k * 4 + 2], boxes[k * 4 + 3]);
      }
      pen.globalAlpha = 1;
    }

    var raf = 0, origin = null, stopped = false;
    function release() {
      stopped = true;
      cancelAnimationFrame(raf);
      canvas.remove();
      canvas.width = canvas.height = 0; // free the backing store straight away
    }
    function frame(now) {
      if (stopped) return;
      if (origin === null) origin = now;
      var elapsed = now - origin;
      if (elapsed >= totalMs) { release(); onEnd(); return; }
      paint(elapsed);
      raf = requestAnimationFrame(frame);
    }

    paint(0);
    cover.insertBefore(canvas, cover.firstChild);
    cover.classList.add('is-dissolving');
    raf = requestAnimationFrame(frame);
    return { stop: function () { if (!stopped) release(); } };
  }

  /**
   * Show the cover, run the greeting, then dissolve.
   * options: holdMs, dissolveMs, onDissolve(), onDone()
   * returns { finish() } - finish() ends immediately (skip / cleanup).
   */
  fx.playIntro = function (cover, options) {
    var opts = options || {};
    var holdMs = opts.holdMs || 2500, dissolveMs = opts.dissolveMs || 1800;
    var stage = cover.querySelector('.intro-stage') || cover;
    var holdTimer = 0, safetyTimer = 0, ripple = null, wordsOut = null, closed = false;

    function finish() {
      if (closed) return;
      closed = true;
      clearTimeout(holdTimer); clearTimeout(safetyTimer);
      global.removeEventListener('resize', finish);
      if (ripple) ripple.stop();
      if (wordsOut) wordsOut.cancel();
      cover.classList.remove('is-playing', 'is-dissolving');
      cover.hidden = true;
      if (opts.onDone) opts.onDone();
    }

    function dissolve() {
      if (closed) return;
      if (opts.onDissolve) opts.onDissolve();
      ripple = buildRipple(cover, cover.querySelector('.intro-phrase--b') || stage, dissolveMs, finish);
      if (!ripple) { finish(); return; }
      if (stage.animate) {
        wordsOut = stage.animate(
          [{ opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(6px)' }],
          { duration: 480, easing: 'ease-in', fill: 'forwards' });
      }
      global.addEventListener('resize', finish);
    }

    cover.hidden = false;
    cover.classList.remove('is-playing');
    void cover.offsetWidth; // restart the CSS greeting if the cover is replayed
    cover.classList.add('is-playing');
    holdTimer = setTimeout(dissolve, holdMs);
    safetyTimer = setTimeout(finish, holdMs + dissolveMs + 1500);
    return { finish: finish };
  };
})(window);
