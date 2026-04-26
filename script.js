/* Shared theme toggle + progress bar + active nav highlighting */
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const modes = ['auto','light','dark'];
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const icons = {
      auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none"/></svg>',
      light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
      dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
    };
    function apply(mode){
      if (mode === 'auto') {
        root.removeAttribute('data-theme');
        root.setAttribute('data-theme-resolved', mq.matches ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', mode);
        root.setAttribute('data-theme-resolved', mode);
      }
      btn.innerHTML = icons[mode];
      btn.setAttribute('title', 'Theme: ' + mode);
    }
    apply(localStorage.getItem('theme') || 'auto');
    btn.addEventListener('click', () => {
      const cur = localStorage.getItem('theme') || 'auto';
      const next = modes[(modes.indexOf(cur) + 1) % modes.length];
      localStorage.setItem('theme', next);
      apply(next);
    });
    mq.addEventListener('change', () => { if ((localStorage.getItem('theme') || 'auto') === 'auto') apply('auto'); });
  }

  const bar = document.getElementById('progress');
  if (bar) {
    function onScroll(){
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      bar.style.transform = 'scaleX(' + (total > 0 ? h.scrollTop / total : 0) + ')';
    }
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Active nav highlighting
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const normalized = href.replace(/\/$/, '') || '/';
    if (normalized === path) a.classList.add('active');
    else if (normalized !== '/' && path.startsWith(normalized.replace('.html', ''))) a.classList.add('active');
  });

  // Keyboard shortcuts: g h, g w, g n, g l, g a, Escape
  let seq = '';
  let seqTimer = null;
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,[contenteditable]')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape' && location.pathname !== '/') { window.location.href = '/'; return; }
    if (e.key === '?') {
      e.preventDefault();
      alert('Shortcuts\n\ng h — home\ng w — writing\ng n — notes\ng l — links\ng a — about\nEsc — home');
      return;
    }
    seq = (seq + e.key).slice(-2);
    clearTimeout(seqTimer);
    seqTimer = setTimeout(() => seq = '', 800);
    const map = { gh:'/', gw:'/writing.html', gn:'/notes.html', gl:'/links.html', ga:'/about.html' };
    if (map[seq]) { window.location.href = map[seq]; seq = ''; }
  });
})();
