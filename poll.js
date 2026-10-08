// Risultati di un sondaggio: riceve le risposte come lista di record (un oggetto per risposta,
// con i nomi delle colonne come nomi dei campi) e mostra, per ogni domanda aperta,
// le parole più frequenti. La lettura dei dati è a carico della pagina, che chiama
// pollRender(records) ogni volta che ha dati nuovi e pollStatus(testo) per i messaggi.
(() => {
  const box = document.querySelector('.poll-results');
  if (!box) return;

  const maxWords = parseInt(box.dataset.words, 10) || 7;
  const status = box.querySelector('.poll-status');
  const total = box.querySelector('.poll-total');
  const charts = [...box.querySelectorAll('[data-question]')];

  // Parole troppo comuni per dire qualcosa sul contenuto delle risposte
  const STOP = new Set(('a ad al alla alle allo ai agli all anche avere che chi ci come con cosa cui da dal dalla dalle dei del della ' +
    'delle dello di dove due e ed era essere fa fare gli ha hai hanno ho il in io la le lei li lo loro lui ma mi mia mio molto ne nei nel ' +
    'nella nelle no non nostra nostro o oggi ogni per perché perche però piu più po poi quale quali quando quanto quella quelle quello ' +
    'questa queste questi questo se sei si sì sia siamo sono sta stato stata su sua sue sul sulla suo tra tu tutto tutti tutte un una uno ' +
    'the and for with stati degli sulle sugli negli dagli alcuni alcune stesso stessa avevo aveva erano lezione classe').split(/\s+/));

  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

  // Campo del record che corrisponde alla domanda (confronto sul testo, senza badare a spazi e accenti)
  function fieldOf(record, question) {
    const q = norm(question).slice(0, 30);
    return Object.keys(record).find(k => norm(k).startsWith(q));
  }

  // Quante risposte contengono ciascuna parola (una risposta conta una volta sola per parola)
  function topWords(answers) {
    const count = new Map();
    for (const a of answers) {
      const words = new Set((a.toLowerCase().match(/[a-zà-ÿ]{3,}/g) || []).filter(w => !STOP.has(w)));
      for (const w of words) count.set(w, (count.get(w) || 0) + 1);
    }
    return [...count.entries()].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0], 'it')).slice(0, maxWords);
  }

  function draw(el, answers) {
    const words = topWords(answers);
    const bars = el.querySelector('.bars');
    el.querySelector('.poll-n').textContent = answers.length === 1 ? '1 risposta' : answers.length + ' risposte';
    if (!words.length) { bars.innerHTML = '<p class="poll-empty">Ancora nessuna risposta.</p>'; return; }
    const max = words[0][1];
    bars.innerHTML = words.map(([w, n]) => {
      const share = Math.round(n / answers.length * 100);
      return `<div class="bar-row" tabindex="0" data-tip="«${w}» compare in ${n} ${n === 1 ? 'risposta' : 'risposte'} su ${answers.length} (${share}%)">` +
        `<span class="bar-label">${w}</span><span class="bar-track"><span class="bar" style="width:${n / max * 100}%"></span></span>` +
        `<span class="bar-value">${n}</span></div>`;
    }).join('');
  }

  window.pollStatus = text => { status.textContent = text; };

  window.pollRender = records => {
    total.textContent = records.length;
    box.querySelector(".poll-total-label").textContent = records.length === 1 ? "risposta ricevuta" : "risposte ricevute";
    charts.forEach(el => {
      const field = records.length ? fieldOf(records[0], el.dataset.question) : null;
      draw(el, field ? records.map(r => String(r[field] ?? '').trim()).filter(Boolean) : []);
    });
  };

  total.textContent = '–';
  charts.forEach(el => { el.querySelector('.bars').innerHTML = '<p class="poll-empty">In attesa dei dati.</p>'; });
})();
