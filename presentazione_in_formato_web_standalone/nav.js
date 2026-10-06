// Frecce da tastiera: ← precedente, → successiva
document.addEventListener('keydown', e => {
  const sel = e.key === 'ArrowRight' ? '.nav-next' : e.key === 'ArrowLeft' ? '.nav-prev' : null;
  const a = sel && document.querySelector(sel);
  if (a && a.href) location.href = a.href;
});
