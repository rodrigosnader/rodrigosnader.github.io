/* ---------- viz-common.js ----------
 * Shared helpers for the interactive canvas animations on the blog.
 * Kept deliberately tiny: DPI-aware canvas sizing, theme color lookup,
 * a few drawing primitives, and a RAF loop that tracks its own pause state.
 * Any viz that needs more than this should inline its own code.
 */

(function (global) {
  /* Fit a canvas to its CSS size, taking device pixel ratio into account. */
  function fitCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return rect;
  }

  /* Returns the current theme palette. Matches the orbits.html inline values
   * so new posts stay visually consistent with the existing ones. */
  function themeColors() {
    const isDark = document.documentElement.getAttribute('data-theme-resolved') === 'dark';
    if (isDark) {
      return {
        bg: '#211C17',
        fg: '#EFE7D3',
        fgDim: '#9A9080',
        border: 'rgba(234,226,210,0.2)',
        grid: 'rgba(234,226,210,0.08)',
        gridFaint: 'rgba(234,226,210,0.04)',
        accent: '#C56B4A',
        accentWarm: '#d4763a',
        accentSoft: 'rgba(197, 107, 74, 0.35)',
        blue: '#4A6EA0',
        green: '#6E965A',
        purple: '#A878A5',
        gold: '#C8A032',
      };
    }
    return {
      bg: '#FFFDF4',
      fg: '#1A1613',
      fgDim: '#6B6359',
      border: 'rgba(26,22,19,0.2)',
      grid: 'rgba(26,22,19,0.08)',
      gridFaint: 'rgba(26,22,19,0.04)',
      accent: '#C56B4A',
      accentWarm: '#d4763a',
      accentSoft: 'rgba(197, 107, 74, 0.35)',
      blue: '#4A6EA0',
      green: '#6E965A',
      purple: '#A878A5',
      gold: '#C8A032',
    };
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  /* Paint the canvas background using the current theme. */
  function clear(ctx, rect) {
    const c = themeColors();
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }

  /* Grid of faint lines. step is in CSS pixels. */
  function drawGrid(ctx, rect, step) {
    const c = themeColors();
    ctx.strokeStyle = c.gridFaint;
    ctx.lineWidth = 1;
    for (let x = 0; x < rect.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
  }

  /* Utility to draw a pill-shaped label, used by several vizes. */
  function drawPill(ctx, text, x, y, opts = {}) {
    const c = themeColors();
    const fg = opts.fg || c.fg;
    const bg = opts.bg || c.bg;
    const border = opts.border || c.border;
    ctx.font = opts.font || '11px -apple-system, Inter, sans-serif';
    const pad = 6;
    const w = ctx.measureText(text).width + pad * 2;
    const h = 18;
    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    const r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = fg;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + pad, y + r + 0.5);
  }

  /* A standardized RAF loop with pause/reset hooks.
   * stepFn(dtSeconds) gets called each frame if running.
   * drawFn(rect, t) runs every frame regardless. */
  function makeLoop(canvas, stepFn, drawFn) {
    let running = true;
    let last = performance.now();
    const state = {
      set running(v) { running = v; if (v) last = performance.now(); },
      get running() { return running; },
      step: 0,
      pause() { running = false; },
      resume() { running = true; last = performance.now(); },
      toggle() { running = !running; if (running) last = performance.now(); },
    };
    function frame(t) {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const rect = canvas.getBoundingClientRect();
      if (running && stepFn) stepFn(dt, state);
      if (drawFn) drawFn(rect, state, dt);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return state;
  }

  /* A single page-wide "all animations stopped" flag. Flipped to true on:
   *   - pagehide / beforeunload (the page is actually going away)
   *   - any click on an internal link (the page is ABOUT to go away; we
   *     want the RAFs to stop synchronously, before the browser starts the
   *     navigation, so the main thread is free to handle it)
   *
   * Without this, Safari in particular shows a visible lag between click
   * and the new page loading, because the current page's RAF loops keep
   * competing with the navigation for main-thread time. */
  let allStopped = false;
  function stopAll() { allStopped = true; }

  window.addEventListener('pagehide', stopAll);
  window.addEventListener('beforeunload', stopAll);

  // Delegate a click listener so every internal link proactively stops
  // animations the moment it's clicked — even before the browser begins
  // the navigation. Uses capture phase to run before any default actions.
  document.addEventListener(
    'click',
    (ev) => {
      const a = ev.target.closest && ev.target.closest('a[href]');
      if (!a) return;
      // Ignore modifier clicks (they open in new tab, current page stays)
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      if (a.target && a.target !== '' && a.target !== '_self') return;
      const href = a.getAttribute('href') || '';
      // Ignore anchor-only links and explicit externals
      if (href.startsWith('#')) return;
      if (/^https?:/i.test(href) && !href.startsWith(location.origin)) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
      stopAll();
    },
    true
  );

  /* Animate on a requestAnimationFrame loop, but only while the given canvas
   * is visible in the viewport. RAF is cancelled (not just no-op'd) when the
   * canvas leaves the viewport or the tab goes background, so the browser
   * can reclaim the slot entirely.
   *
   * drawFn(t) gets the RAF timestamp so existing draw/loop functions that
   * relied on the RAF signature keep working unchanged. */
  function animate(canvas, drawFn) {
    let rafId = null;
    let visible = true; // optimistic default — observer corrects it
    function start() {
      if (rafId === null && !allStopped) rafId = requestAnimationFrame(tick);
    }
    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function tick(t) {
      rafId = null;
      if (allStopped) return;
      if (!visible || document.hidden) return;
      drawFn(t);
      rafId = requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          const nowVisible = entries[entries.length - 1].isIntersecting;
          if (nowVisible && !visible) { visible = true; start(); }
          else if (!nowVisible) { visible = false; stop(); }
        },
        { rootMargin: '150px' }
      );
      io.observe(canvas);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (visible) start();
    });

    start();
  }

  global.vizCommon = {
    fitCanvas,
    themeColors,
    lerp,
    clamp,
    clear,
    drawGrid,
    drawPill,
    makeLoop,
    animate,
  };
})(window);
