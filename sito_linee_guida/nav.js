// Link di navigazione: il numero n della slide si ricava dal nome del file
// (slide-07.html → 7) e le frecce puntano sempre a n-1 e n+1
const m = location.pathname.match(/slide-(\d+)[^\/]*\.html$/);
if (m) {
  const n = parseInt(m[1], 10);
  const file = k => 'slide-' + String(k).padStart(m[1].length, '0') + '.html';
  const prev = document.querySelector('.nav-prev'), next = document.querySelector('.nav-next');
  if (prev && n > 1) prev.href = file(n - 1);
  if (next) next.href = file(n + 1);
}

// Navigazione da tastiera: ← precedente, → successiva
document.addEventListener('keydown', e => {
  const sel = e.key === 'ArrowRight' ? '.nav-next' : e.key === 'ArrowLeft' ? '.nav-prev' : null;
  const a = sel && document.querySelector(sel);
  if (a && a.href) location.href = a.href;
});

// Quiz: clic su una risposta per vedere se è corretta
document.querySelectorAll('.opts').forEach(box => {
  box.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
    box.querySelectorAll('.opt').forEach(b => b.classList.remove('right', 'wrong'));
    box.querySelector('.opt[data-correct]').classList.add('right');
    if (!btn.hasAttribute('data-correct')) btn.classList.add('wrong');
  }));
});

// Diagrammi Mermaid: render locale, poi l'SVG si adatta al div che lo contiene
if (window.mermaid) {
  mermaid.initialize({
    startOnLoad: false, securityLevel: 'loose', theme: 'base',
    themeVariables: {
      fontFamily: "Lato, 'Helvetica Neue', Arial, sans-serif", fontSize: '14px',
      primaryColor: '#FFFFFF', primaryTextColor: '#1F2937', primaryBorderColor: '#2F5D8A',
      lineColor: '#2F5D8A', secondaryColor: '#EBF2FA', tertiaryColor: '#FFFFFF'
    },
    flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis', padding: 8, nodeSpacing: 30, rankSpacing: 36, wrappingWidth: 260 }
  });
  const fonts = ['400 14px Lato', '700 14px Lato'].map(f => document.fonts.load(f));
  Promise.all(fonts).then(() => mermaid.run({ querySelector: 'pre.mermaid' })).then(() => {
    document.querySelectorAll('pre.mermaid svg').forEach(s => {
      s.removeAttribute('width'); s.removeAttribute('height');
      s.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    });
    document.documentElement.setAttribute('data-ready', '1');
  });
} else {
  document.documentElement.setAttribute('data-ready', '1');
}
