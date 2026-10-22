/* Terme-Check – gemeinsame Aufgaben-Logik für Schülerseite (index.html) und Lehrerseite (lehrer.html).
   Aufbau wie der Wurzel-Check (Kl. 9). Alle Aufgaben sind eigene Zufallsgeneratoren; statt Math.random() benutzen sie rand(),
   damit ein Test aus Testcode + Listennummer exakt reproduzierbar ist. */
"use strict";
const $ = id => document.getElementById(id);
let rand = Math.random;

/* ---------- Reproduzierbarer Zufall ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hash32(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h1 ^ h2) >>> 0;
}

/* ---------- Hilfsfunktionen ---------- */
const R = (a, b) => a + Math.floor(rand() * (b - a + 1));
const pick = arr => arr[Math.floor(rand() * arr.length)];
const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
const eq = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));

function fmt(x) {
  x = Number(x.toPrecision(12));
  const neg = x < 0; x = Math.abs(x);
  let s = x.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
  let [i, d] = s.split('.');
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + i + (d ? ',' + d : '');
}
function parseNum(s) {
  s = String(s).trim().replace(/[\s  ']/g, '').replace(/^[−–]/, '-').replace(/^\+/, '');
  if (!s) return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return /^-?\d*\.?\d+$/.test(s) ? Number(s) : NaN;
}
const frac = (z, n) => `<span class="fr"><span>${z}</span><span>${n}</span></span>`;
const ggT = (a, b) => b ? ggT(b, a % b) : Math.abs(a);

/* ================= Terme lesen und prüfen =================
   Eingabe als Text (z. B. „6x² − 15x“, „6x^2-15x“, „6x2-15x“, „3(2x+5)“, „(x+4)²“).
   Gerechnet wird mit Polynomen (Koeffizienten je Glied), damit gleichwertige Terme sicher erkannt werden.
   Danach wird die FORM geprüft: ausmultipliziert und zusammengefasst ('sum'),
   möglichst großer Faktor ausgeklammert ('factor') oder als binomische Klammer geschrieben ('binom'). */
function termNorm(src) {
  return String(src).replace(/<sup>(\d+)<\/sup>/g, '^$1').replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/[·×∙•*]/g, '*')
    .replace(/,/g, '.').replace(/²/g, '^2').replace(/³/g, '^3').toLowerCase()
    .replace(/([a-z])(\d+)/g, '$1^$2')                 // iPads haben keine Hochzahl-Taste: x2 heißt x²
    .replace(/\)([23])(?![\d.^])/g, ')^$1');          // (x+3)2 heißt (x+3)²
}
function termParse(src) {
  const s = termNorm(src);
  if (!s) return { empty: true };
  const toks = s.match(/\d+(?:\.\d+)?|[a-z]|[-+*^()]/g) || [];
  if (toks.join('') !== s) return { error: true };
  let i = 0;
  const peek = () => toks[i], next = () => toks[i++];
  const isAtomStart = t => t !== undefined && (/^[\d.a-z]/.test(t) || t === '(');
  function sum() {
    const parts = [];
    let neg = false;
    if (peek() === '+' || peek() === '-') neg = next() === '-';
    parts.push({ neg, n: prod() });
    while (peek() === '+' || peek() === '-') { const n = next() === '-'; parts.push({ neg: n, n: prod() }); }
    return parts.length === 1 && !parts[0].neg ? parts[0].n : { t: 'sum', parts };
  }
  function prod() {
    const f = [factor()];
    while (peek() === '*' || isAtomStart(peek())) { if (peek() === '*') next(); f.push(factor()); }
    return f.length === 1 ? f[0] : { t: 'prod', f };
  }
  function factor() {
    if (peek() === '-') { next(); return { t: 'neg', x: factor() }; }
    const b = atom();
    if (peek() === '^') { next(); const e = next(); if (!/^\d$/.test(e || '')) throw 0; return { t: 'pow', b, e: +e }; }
    return b;
  }
  function atom() {
    const t = next();
    if (t === undefined) throw 0;
    if (/^[\d.]/.test(t)) return { t: 'num', v: Number(t) };
    if (/^[a-z]$/.test(t)) return { t: 'var', n: t };
    if (t === '(') { const e = sum(); if (next() !== ')') throw 0; return { t: 'par', x: e }; }
    throw 0;
  }
  try {
    const ast = sum();
    if (i !== toks.length) return { error: true };
    return { ast, hasParen: toks.includes('('), poly: toPoly(ast) };
  } catch (e) { return { error: true }; }
}
/* Polynom = { Schlüssel: Koeffizient }, Schlüssel z. B. "a1b2" (Variablen sortiert), "" = Zahl ohne Variable */
const keyObj = k => { const o = {}; (k.match(/[a-z]\d+/g) || []).forEach(m => o[m[0]] = +m.slice(1)); return o; };
const objKey = o => Object.keys(o).sort().filter(v => o[v]).map(v => v + o[v]).join('');
const pClean = p => { Object.keys(p).forEach(k => { if (Math.abs(p[k]) < 1e-9) delete p[k]; }); return p; };
function pAdd(p, q, s = 1) { const r = { ...p }; for (const k in q) r[k] = (r[k] || 0) + s * q[k]; return pClean(r); }
function pMul(p, q) {
  const r = {};
  for (const a in p) for (const b in q) {
    const o = keyObj(a), o2 = keyObj(b); for (const v in o2) o[v] = (o[v] || 0) + o2[v];
    const k = objKey(o); r[k] = (r[k] || 0) + p[a] * q[b];
  }
  return pClean(r);
}
function toPoly(n) {
  switch (n.t) {
    case 'num': return pClean({ '': n.v });
    case 'var': return { [n.n + '1']: 1 };
    case 'par': return toPoly(n.x);
    case 'neg': return pAdd({}, toPoly(n.x), -1);
    case 'sum': return n.parts.reduce((p, x) => pAdd(p, toPoly(x.n), x.neg ? -1 : 1), {});
    case 'prod': return n.f.reduce((p, x) => pMul(p, toPoly(x)), { '': 1 });
    case 'pow': { let p = { '': 1 }; const b = toPoly(n.b); for (let k = 0; k < n.e; k++) p = pMul(p, b); return p; }
  }
}
const pEq = (p, q) => Object.keys(pAdd(p, q, -1)).length === 0;
const nTerms = p => Object.keys(p).length;
const kDeg = k => (k.match(/\d+/g) || []).reduce((s, d) => s + +d, 0);
/* Faktoren eines Produkts: (x+3)² zählt als zwei Faktoren (x+3); Minus davor wird ignoriert. null = kein Produkt */
function productFactors(ast) {
  let n = ast;
  while (n.t === 'neg' || (n.t === 'sum' && n.parts.length === 1)) n = n.t === 'neg' ? n.x : n.parts[0].n;
  const out = [];
  const add = x => {
    if (x.t === 'neg') return add(x.x);
    if (x.t === 'prod') return x.f.forEach(add);
    if (x.t === 'pow' && x.b.t === 'par') { for (let k = 0; k < x.e; k++) out.push(toPoly(x.b)); return; }
    out.push(toPoly(x));
  };
  if (n.t === 'prod' || (n.t === 'pow' && n.b.t === 'par')) { add(n); return out; }
  return null;
}
/* „Primitiv“: Koeffizienten ganzzahlig ohne gemeinsamen Teiler und keine Variable in allen Gliedern */
function primitive(p) {
  const ks = Object.keys(p), cs = ks.map(k => p[k]);
  if (!cs.every(c => Number.isInteger(c))) return false;
  if (cs.reduce((g, c) => ggT(g, c), 0) !== 1) return false;
  const vs = ks.map(keyObj);
  return !Object.keys(vs[0]).some(v => vs.every(o => o[v]));
}
function gradeTerm(t, src) {
  const r = termParse(src);
  if (r.empty) return -1;
  if (r.error) return 0;
  if (!pEq(r.poly, termParse(t.target).poly)) return 0;
  if (t.form === 'sum') {
    const parts = r.ast.t === 'sum' ? r.ast.parts.map(p => p.n) : [r.ast];
    return !r.hasParen && parts.length === nTerms(r.poly) && parts.every(fertigesGlied) ? 2 : 1;
  }
  const f = productFactors(r.ast);
  if (!f) return 0;                                           // nicht faktorisiert – die Aufgabe ist ja gerade das Faktorisieren
  const sums = f.filter(p => nTerms(p) >= 2);
  if (!sums.length) return 0;
  if (t.form === 'factor') return sums.every(primitive) ? 2 : 1;
  if (t.form === 'binomK') {   // erst ausklammern, dann binomisch: 3x² − 27 = 3 · (x + 3) · (x − 3)
    const ok = sums.every(p => primitive(p) && Object.keys(p).every(k => kDeg(k) <= 1)) && f.every(p => nTerms(p) >= 2 || Object.keys(p).every(k => k === ''));
    return ok ? 2 : 1;
  }
  if (t.form === 'binom') return sums.every(p => primitive(p) && Object.keys(p).every(k => kDeg(k) <= 1)) && f.every(p => nTerms(p) >= 2 || (nTerms(p) === 1 && Math.abs(p['']) === 1)) ? 2 : 1;
  return 0;
}
/* Ein fertiges Glied: höchstens eine Zahl, jede Variable nur einmal (3x² statt 3 · 4x oder x · x) */
function fertigesGlied(n) {
  const f = [];
  const add = x => x.t === 'neg' ? add(x.x) : x.t === 'prod' ? x.f.forEach(add) : f.push(x);
  add(n);
  const vars = f.map(x => x.t === 'var' ? x.n : x.t === 'pow' && x.b.t === 'var' ? x.b.n : null).filter(Boolean);
  return f.filter(x => x.t === 'num' || (x.t === 'pow' && x.b.t === 'num')).length <= 1 && new Set(vars).size === vars.length;
}
/* Eingabe lesbar anzeigen (Vorschau, Lehrerseite) */
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function termHtml(src) {
  return escH(termNorm(src)).replace(/\^(\d)/g, '<sup>$1</sup>').replace(/\*/g, ' · ').replace(/\./g, ',')
    .replace(/([^(])([+-])/g, '$1 $2 ').replace(/-/g, '−');
}

/* ================= Terme schön schreiben ================= */
const MI = '−';
const X2 = v => `${v}<sup>2</sup>`;
function glied(c, v, first) {
  const a = Math.abs(c), s = (a === 1 && v ? '' : fmt(a)) + v;
  return first ? (c < 0 ? MI : '') + s : (c < 0 ? ` ${MI} ` : ' + ') + s;
}
/* poly([3, X2('x')], [-5, 'x'], [2, '']) → „3x² − 5x + 2“ */
function poly(...gl) { let out = '', first = true; for (const [c, v] of gl) { if (!c) continue; out += glied(c, v, first); first = false; } return out || '0'; }
const pk = n => n < 0 ? `(${MI}${fmt(-n)})` : fmt(n);           // Zahl in einer Malaufgabe, negativ mit Klammer
const tgt = html => html.replace(/<sup>(\d)<\/sup>/g, '^$1');   // Anzeige → Eingabe-Schreibweise für die Bewertung
const sgn = () => pick([1, -1]);
const big = s => `<div class="big">${s}</div>`;
const termTask = (o) => Object.assign({ type: 'term', target: tgt(o.ansHtml) }, o);

/* ---------- Aufgabengeneratoren ----------
   Jede Aufgabe: { title, q, type: 'term'|'num'|'mc', ..., hint, sol:[Schritte] }
   'term': ansHtml (Musterlösung), target (zum Vergleichen), form ('sum'|'factor'|'binom'), vars (Tasten) */
const G = {
  /* ===== I.1a Ausmultiplizieren ===== */
  ausmultZahl() {
    const v = pick(['x', 'a', 'y']), k = pick([-2, -3, -4, -5, 2, 3, 4, 5, 6]), a = R(2, 6), b = R(1, 9) * sgn();
    const res = poly([k * a, v], [k * b, '']);
    return termTask({
      title: 'Ausmultiplizieren', q: `Multipliziere aus.${big(`${glied(k, '', true)} · (${poly([a, v], [b, ''])})`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: 'Die Zahl vor der Klammer wird mit jedem Teil in der Klammer multipliziert. Ein Minus gehört zur Zahl dahinter: plus · minus = minus, minus · minus = plus.',
      sol: [`= ${pk(k)} · ${a}${v} + ${pk(k)} · ${pk(b)}`, `= ${res}`]
    });
  },
  ausmultVar() {
    const v = pick(['x', 'a']), w = v === 'x' ? 'y' : 'b', k = R(2, 5) * sgn(), a = R(2, 5), b = R(1, 7) * sgn(), zwei = rand() < .4;
    const inner = poly([a, v], [b, zwei ? w : '']);
    const res = poly([k * a, X2(v)], [k * b, v + (zwei ? w : '')]);
    return termTask({
      title: 'Ausmultiplizieren', q: `Multipliziere aus.${big(`${glied(k, v, true)} · (${inner})`)}`, form: 'sum', vars: zwei ? [v, w] : [v], ansHtml: res,
      hint: `Multipliziere ${glied(k, v, true)} mit jedem Teil in der Klammer. ${v} · ${v} = ${X2(v)}. Achte auf die Vorzeichen.`,
      sol: [`= ${k < 0 ? `(${glied(k, v, true)})` : glied(k, v, true)} · ${a}${v} + ${k < 0 ? `(${glied(k, v, true)})` : glied(k, v, true)} · ${b < 0 ? `(${glied(b, zwei ? w : '', true)})` : glied(b, zwei ? w : '', true)}`, `= ${res}`]
    });
  },

  /* ===== I.1b Ausklammern ===== */
  ausklZahl() {
    let g, a, b;
    do { g = R(2, 9); a = R(1, 6); b = R(1, 9); } while (ggT(a, b) !== 1 || g * a > 54 || g * b > 72);
    const v = pick(['x', 'a', 'y']), s = sgn();
    const ans = `${g} · (${poly([a, v], [s * b, ''])})`;
    return termTask({
      title: 'Ausklammern', q: `Klammere einen möglichst großen Faktor aus.${big(poly([g * a, v], [s * g * b, '']))}`, form: 'factor', vars: [v], ansHtml: ans,
      hint: 'Suche die größte Zahl, durch die beide Zahlen teilbar sind. Sie kommt vor die Klammer, der Rest in die Klammer. Probe: Rechne die Klammer wieder aus.',
      sol: [`${glied(g * a, v, true)} = ${g} · ${glied(a, v, true)}   und   ${g * b} = ${g} · ${b}`, `= ${ans}`]
    });
  },
  ausklVar() {
    let g, a, b;
    do { g = R(2, 6); a = R(1, 5); b = R(1, 7); } while (ggT(a, b) !== 1);
    const v = pick(['x', 'a']), s = sgn();
    const ans = `${glied(g, v, true)} · (${poly([a, v], [s * b, ''])})`;
    return termTask({
      title: 'Ausklammern', q: `Klammere einen möglichst großen Faktor aus.${big(poly([g * a, X2(v)], [s * g * b, v]))}`, form: 'factor', vars: [v], ansHtml: ans,
      hint: `In beiden Teilen steckt eine Zahl und ein ${v}. Klammere beides aus: die größte gemeinsame Zahl und ${v}.`,
      sol: [`${glied(g * a, X2(v), true)} = ${g} · ${v} · ${glied(a, v, true)}   und   ${g * b}${v} = ${g} · ${v} · ${b}`, `= ${ans}`]
    });
  },
  ausklZwei() {   // wie im Skript: 8x − 14xy = 2x · (4 − 7y)
    let g, a, b;
    do { g = R(2, 6); a = R(2, 7); b = R(2, 7); } while (ggT(a, b) !== 1);
    const s = sgn();
    const ans = `${g}x · (${poly([a, ''], [s * b, 'y'])})`;
    return termTask({
      title: 'Ausklammern', q: `Klammere einen möglichst großen Faktor aus.${big(poly([g * a, 'x'], [s * g * b, 'xy']))}`, form: 'factor', vars: ['x', 'y'], ansHtml: ans,
      hint: 'Zerlege beide Teile in kleine Malaufgaben. Was in beiden steckt, kommt vor die Klammer – so viel wie möglich. Bleibt nur eine Zahl übrig, steht sie allein in der Klammer.',
      sol: [`${g * a}x = ${g} · ${a} · x   und   ${g * b}xy = ${g} · ${b} · x · y`, `= ${ans}`]
    });
  },

  /* ===== I.2 Summen multiplizieren ===== */
  summenXX() {
    let a, b;
    do { a = R(1, 9) * sgn(); b = R(1, 9) * sgn(); } while (Math.abs(a) === Math.abs(b));
    const v = pick(['x', 'a', 'y']), res = poly([1, X2(v)], [a + b, v], [a * b, '']);
    return termTask({
      title: 'Summen multiplizieren', q: `Multipliziere aus und fasse zusammen.${big(`(${poly([1, v], [a, ''])}) · (${poly([1, v], [b, ''])})`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: 'Jeder Teil der ersten Klammer wird mit jedem Teil der zweiten Klammer multipliziert – vier Bögen, vier Felder. Danach gleiche Glieder zusammenfassen.',
      sol: [`= ${v} · ${v} + ${v} · ${pk(b)} + ${pk(a)} · ${v} + ${pk(a)} · ${pk(b)}`, `= ${poly([1, X2(v)], [b, v], [a, v], [a * b, ''])}`, `= ${res}`]
    });
  },
  summenXY() {
    const a = R(1, 9) * sgn(), b = R(1, 9) * sgn(), res = poly([1, 'xy'], [b, 'x'], [a, 'y'], [a * b, '']);
    return termTask({
      title: 'Summen multiplizieren', q: `Multipliziere aus.${big(`(${poly([1, 'x'], [a, ''])}) · (${poly([1, 'y'], [b, ''])})`)}`, form: 'sum', vars: ['x', 'y'], ansHtml: res,
      hint: 'Jeder Teil der ersten Klammer wird mit jedem Teil der zweiten Klammer multipliziert – vier Bögen, vier Felder. Ein Minus gehört zur Zahl dahinter.',
      sol: [`= x · y + x · ${pk(b)} + ${pk(a)} · y + ${pk(a)} · ${pk(b)}`, `= ${res}`]
    });
  },
  summen2() {
    let k, a, b;
    do { k = R(2, 4); a = R(1, 7) * sgn(); b = R(1, 6) * sgn(); } while (k * b + a === 0);
    const v = pick(['x', 'a']), res = poly([k, X2(v)], [k * b + a, v], [a * b, '']);
    return termTask({
      title: 'Summen multiplizieren', q: `Multipliziere aus und fasse zusammen.${big(`(${poly([k, v], [a, ''])}) · (${poly([1, v], [b, ''])})`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: 'Vier Bögen: jeder Teil der ersten Klammer mal jeder Teil der zweiten. Dann die beiden Glieder mit ' + v + ' zusammenfassen.',
      sol: [`= ${k}${v} · ${v} + ${k}${v} · ${pk(b)} + ${pk(a)} · ${v} + ${pk(a)} · ${pk(b)}`, `= ${poly([k, X2(v)], [k * b, v], [a, v], [a * b, ''])}`, `= ${res}`]
    });
  },

  /* ===== I.3 Binomische Formeln ===== */
  binom1() { return binomTask(1, 1); },
  binom1k() { return binomTask(1, R(2, 3)); },
  binom2() { return binomTask(2, 1); },
  binom2k() { return binomTask(2, R(2, 3)); },
  binom3() { return binomTask(3, rand() < .3 ? R(2, 3) : 1); },
  binom3k() { return binomTask(3, R(2, 4)); },
  /* Kopfrechnen: Taschenrechner ist erlaubt – darum wird der Schritt der Formel gefragt, nicht das Ergebnis */
  kopf1() {
    const t = R(2, 9) * 10, u = R(1, 3), n = t + u;
    return { title: 'Kopfrechnen mit der 1. binomischen Formel', q: `So rechnet man ${n}² mit der 1. binomischen Formel im Kopf. Welche Zahl gehört in das Kästchen?${big(`${n}<sup>2</sup> = (${t} + ${u})<sup>2</sup> = ${fmt(t * t)} + □ + ${u * u}`)}`, type: 'num', ans: 2 * t * u, pre: '□ =',
      hint: `Das Mittelstück ist 2 · a · b – hier also 2 · ${t} · ${u}.`,
      sol: [`(${t} + ${u})² = ${t}² + 2 · ${t} · ${u} + ${u}²`, `= ${fmt(t * t)} + ${2 * t * u} + ${u * u} = ${fmt(n * n)}`, `□ = ${2 * t * u}`] };
  },
  kopf2() {
    const t = R(2, 10) * 10, u = R(1, 3), n = t - u;
    return { title: 'Kopfrechnen mit der 2. binomischen Formel', q: `So rechnet man ${n}² mit der 2. binomischen Formel im Kopf. Welche Zahl gehört in das Kästchen?${big(`${n}<sup>2</sup> = (${t} − ${u})<sup>2</sup> = ${fmt(t * t)} − □ + ${u * u}`)}`, type: 'num', ans: 2 * t * u, pre: '□ =',
      hint: `Das Mittelstück ist 2 · a · b – hier also 2 · ${t} · ${u}. Das Minus steht schon davor.`,
      sol: [`(${t} − ${u})² = ${t}² − 2 · ${t} · ${u} + ${u}²`, `= ${fmt(t * t)} − ${2 * t * u} + ${u * u} = ${fmt(n * n)}`, `□ = ${2 * t * u}`] };
  },
  kopf3() {
    const t = R(2, 10) * 10, u = R(2, 4);
    return { title: 'Kopfrechnen mit der 3. binomischen Formel', q: `So rechnet man ${t + u} · ${t - u} mit der 3. binomischen Formel im Kopf. Welche Zahl gehört in das Kästchen?${big(`${t + u} · ${t - u} = (${t} + ${u}) · (${t} − ${u}) = ${fmt(t * t)} − □`)}`, type: 'num', ans: u * u, pre: '□ =',
      hint: `(a + b) · (a − b) = a² − b². Hier ist b = ${u}.`,
      sol: [`(${t} + ${u}) · (${t} − ${u}) = ${t}² − ${u}²`, `= ${fmt(t * t)} − ${u * u} = ${fmt(t * t - u * u)}`, `□ = ${u * u}`] };
  },

  /* ===== I.4 Faktorisieren mit binomischen Formeln ===== */
  faktor12() { return faktorTask(R(1, 9), 1); },
  faktor12k() { let k, a; do { k = R(2, 3); a = R(1, 5); } while (ggT(k, a) !== 1); return faktorTask(a, k); },
  faktorCheck() {
    const a = R(2, 7), v = 'x';
    const right = poly([1, X2(v)], [2 * a, v], [a * a, '']);
    const opts = shuffle([right, poly([1, X2(v)], [2 * a, v], [(a + 1) * (a + 1), '']), poly([1, X2(v)], [a, v], [a * a, '']), poly([1, X2(v)], [a * a, ''])]);
    return { title: 'Passt das Mittelstück?', q: 'Welcher Term lässt sich mit einer binomischen Formel faktorisieren?', type: 'mc', options: opts, ans: right,
      hint: 'Suche bei jedem Term die zwei Quadrate und lies ihre Seiten ab. Prüfe dann: Ist das Mittelstück genau 2 · Seite · Seite?',
      sol: [`${right}: Quadrate ${X2(v)} und ${a * a} = ${a}², Mittelstück 2 · ${v} · ${a} = ${2 * a}${v} ✓`, `= (${v} + ${a})<sup>2</sup>`, 'Bei den anderen passt das Mittelstück nicht (oder es fehlt).'] };
  },
  faktor3() { return faktor3Task(R(2, 10), 1); },
  faktor3k() { let k, a; do { k = R(2, 3); a = R(1, 7); } while (ggT(k, a) !== 1); return faktor3Task(a, k); },

  /* ===== I.5 Gleichungen mit Klammern ===== */
  gleichungBinom() {
    const a = R(1, 6), x0 = R(1, 9), plus = rand() < .55;
    const s = plus ? 1 : -1, d = a * a + s * 2 * a * x0;   // (x ± a)² = x² + d
    if (d === 0) return G.gleichungBinom();
    const L = `(x ${plus ? '+' : MI} ${a})<sup>2</sup>`, Rt = poly([1, X2('x')], [plus ? d : d, '']);
    const exp = poly([1, X2('x')], [s * 2 * a, 'x'], [a * a, '']);
    return { title: 'Gleichung mit Klammern', q: `Löse die Gleichung.${big(`${L} = ${Rt}`)}`, type: 'num', ans: x0, pre: 'x =',
      hint: 'Löse zuerst die Klammer mit der binomischen Formel auf. Dann fällt x² auf beiden Seiten weg. Danach wie gewohnt umformen, bis x allein steht.',
      sol: [`${exp} = ${Rt}`, `${poly([s * 2 * a, 'x'], [a * a, ''])} = ${fmt(d)}   | x² auf beiden Seiten weg`, `${poly([s * 2 * a, 'x'])} = ${fmt(d - a * a)}`, `x = ${x0}`,
        `Probe: (${x0} ${plus ? '+' : MI} ${a})² = ${(x0 + s * a) ** 2}  und  ${x0}² ${d < 0 ? MI : '+'} ${Math.abs(d)} = ${x0 * x0 + d} ✓`] };
  },
  gleichungLinear() {   // a · (x − b) − (x + c) = r
    const k = R(2, 5), b = R(1, 6), c = R(1, 9), x0 = R(2, 10), r = k * (x0 - b) - (x0 + c);
    return { title: 'Gleichung mit Klammern', q: `Löse die Gleichung.${big(`${k} · (x ${MI} ${b}) ${MI} (x + ${c}) = ${fmt(r)}`)}`, type: 'num', ans: x0, pre: 'x =',
      hint: 'Löse beide Klammern auf. Das Minus vor der zweiten Klammer dreht jedes Vorzeichen in der Klammer um. Dann zusammenfassen und umformen.',
      sol: [`${poly([k, 'x'], [-k * b, ''])} ${MI} x ${MI} ${c} = ${fmt(r)}`, `${poly([k - 1, 'x'], [-k * b - c, ''])} = ${fmt(r)}`, `${poly([k - 1, 'x'])} = ${fmt(r + k * b + c)}`, `x = ${x0}`] };
  },
  minusBinom() {
    const a = R(1, 7), v = pick(['x', 'a']), typ = R(0, 2);
    if (typ < 2) {   // x² − (x ± a)²
      const s = typ === 0 ? -1 : 1, exp = poly([1, X2(v)], [s * 2 * a, v], [a * a, '']);
      const res = poly([-s * 2 * a, v], [-a * a, '']);
      return termTask({ title: 'Minus vor einer Klammer', q: `Vereinfache so weit wie möglich.${big(`${X2(v)} ${MI} (${v} ${s > 0 ? '+' : MI} ${a})<sup>2</sup>`)}`, form: 'sum', vars: [v], ansHtml: res,
        hint: 'Hoch vor Punkt vor Strich: Erst die binomische Formel ausrechnen und das Ergebnis in eine Klammer schreiben. Dann dreht das Minus jedes Vorzeichen in der Klammer um.',
        sol: [`= ${X2(v)} ${MI} (${exp})`, `= ${X2(v)} ${MI} ${X2(v)}${glied(-s * 2 * a, v, false)}${glied(-a * a, '', false)}`, `= ${res}`] });
    }
    // 2x² − (x + a)(x − a)
    const res = poly([1, X2(v)], [a * a, '']);
    return termTask({ title: 'Minus vor einer Klammer', q: `Vereinfache so weit wie möglich.${big(`2${X2(v)} ${MI} (${v} + ${a}) · (${v} ${MI} ${a})`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: 'Erst das Produkt mit der 3. binomischen Formel ausrechnen und in eine Klammer schreiben. Dann dreht das Minus jedes Vorzeichen in der Klammer um.',
      sol: [`= 2${X2(v)} ${MI} (${X2(v)} ${MI} ${a * a})`, `= 2${X2(v)} ${MI} ${X2(v)} + ${a * a}`, `= ${res}`] });
  },
  minusLinear() {   // (x + a)² − (x² + b x)
    const a = R(1, 6), b = R(1, 9), v = 'x', res = poly([2 * a - b, v], [a * a, '']);
    return termTask({ title: 'Minus vor einer Klammer', q: `Vereinfache so weit wie möglich.${big(`(x + ${a})<sup>2</sup> ${MI} (${X2(v)} + ${b}x)`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: 'Löse die erste Klammer mit der binomischen Formel auf. Das Minus vor der zweiten Klammer dreht jedes Vorzeichen darin um.',
      sol: [`= ${poly([1, X2(v)], [2 * a, v], [a * a, ''])} ${MI} ${X2(v)} ${MI} ${b}x`, `= ${res}`] });
  },
  /* ===== I.6 Bruchgleichungen ===== */
  bruchX() {   // k/x + a = b
    const x0 = R(2, 6), a = R(1, 4), m = R(1, 4), b = a + m, k = m * x0;
    return { title: 'Bruchgleichung', q: `Löse die Gleichung.${big(`${frac(k, 'x')} + ${a} = ${b}`)}`, type: 'num', ans: x0, pre: 'x =',
      hint: 'x darf nicht 0 sein. Der Hauptnenner ist x: Nimm jeden Teil der Gleichung mal x – auch die Zahl ohne Bruch. Dann wie gewohnt lösen.',
      sol: ['x darf nicht 0 sein. Hauptnenner: x', `${k} + ${glied(a, 'x', true)} = ${b}x`, `${k} = ${glied(m, 'x', true)}`, `x = ${x0}`, `Probe: ${fmt(k / x0)} + ${a} = ${b} ✓`] };
  },
  bruchHN() {   // x/p + x/q = c
    const [p, q, hn] = pick([[2, 3, 6], [2, 4, 4], [3, 6, 6], [2, 5, 10], [4, 6, 12], [3, 4, 12]]), x0 = hn * R(1, 3), c = x0 / p + x0 / q;
    return { title: 'Bruchgleichung', q: `Löse die Gleichung.${big(`${frac('x', p)} + ${frac('x', q)} = ${c}`)}`, type: 'num', ans: x0, pre: 'x =',
      hint: `Finde den Hauptnenner von ${p} und ${q} und nimm jeden Teil der Gleichung damit mal. Dann kürzen – die Brüche verschwinden.`,
      sol: [`Hauptnenner: ${hn}`, `${glied(hn / p, 'x', true)} + ${glied(hn / q, 'x', true)} = ${c * hn}`, `${glied(hn / p + hn / q, 'x', true)} = ${c * hn}`, `x = ${x0}`] };
  },
  bruch2x() {   // k/(2x) + a = b
    const x0 = R(1, 5), a = R(1, 3), m = R(1, 3), b = a + m, k = 2 * m * x0;
    return { title: 'Bruchgleichung', q: `Löse die Gleichung.${big(`${frac(k, '2x')} + ${a} = ${b}`)}`, type: 'num', ans: x0, pre: 'x =',
      hint: 'x darf nicht 0 sein. Hauptnenner: 2x. Nimm jeden Teil mal 2x und kürze.',
      sol: ['x darf nicht 0 sein. Hauptnenner: 2x', `${k} + ${2 * a}x = ${2 * b}x`, `${k} = ${2 * m}x`, `x = ${x0}`] };
  },

  /* ===== Wiederholung (Klasse 7): Dreisatz ===== */
  dreisatz() {
    const [pl, sg, preise] = pick([['Hefte', 'Heft', [0.8, 1.2, 1.5, 2]], ['Brezeln', 'Brezel', [0.6, 0.8, 0.9, 1.2]], ['Kugeln Eis', 'Kugel', [1.2, 1.5, 2]], ['Busfahrkarten', 'Karte', [1.5, 2.5, 3]]]);
    const p = pick(preise), n = pick([2, 3, 4, 5]), m = pick([6, 7, 8, 10]);
    const eu = x => x.toFixed(2).replace('.', ',');
    return { title: 'Dreisatz', q: `${n} ${pl} kosten <b>${eu(n * p)} €</b>. Wie viel kosten <b>${m} ${pl}</b>?`, type: 'num', ans: Math.round(m * p * 100) / 100, post: '€',
      hint: `Rechne zuerst aus, was 1 ${sg} kostet: teilen durch ${n}. Dann mal ${m}.`,
      sol: [`${n} ${pl} → ${eu(n * p)} €`, `1 ${sg} → ${eu(n * p)} € : ${n} = ${eu(p)} €`, `${m} ${pl} → ${eu(p)} € · ${m} = ${eu(m * p)} €`] };
  }
};
function binomTask(nr, k) {
  const v = pick(['x', 'a', 'y']), a = k === 1 ? R(1, 9) : pick([1, 2, 3, 4, 5].filter(z => ggT(z, k) === 1));
  const kv = glied(k, v, true), kvq = k === 1 ? X2(v) : `(${kv})<sup>2</sup>`;
  const titles = { 1: '1. binomische Formel', 2: '2. binomische Formel', 3: '3. binomische Formel' };
  if (nr === 3) {
    const res = poly([k * k, X2(v)], [-a * a, '']), first = rand() < .5;
    const f1 = `(${kv} + ${a})`, f2 = `(${kv} ${MI} ${a})`;
    return termTask({ title: titles[3], q: `Forme mit einer binomischen Formel um.${big(first ? `${f1} · ${f2}` : `${f2} · ${f1}`)}`, form: 'sum', vars: [v], ansHtml: res,
      hint: '(a + b) · (a − b) = a² − b². Es gibt kein Mittelstück – die beiden Rechtecke heben sich auf.',
      sol: [`= ${kvq} ${MI} ${a}²`, `= ${res}`] });
  }
  const s = nr === 1 ? 1 : -1, res = poly([k * k, X2(v)], [s * 2 * k * a, v], [a * a, '']);
  return termTask({ title: titles[nr], q: `Forme mit einer binomischen Formel um.${big(`(${kv} ${s > 0 ? '+' : MI} ${a})<sup>2</sup>`)}`, form: 'sum', vars: [v], ansHtml: res,
    hint: nr === 1 ? '(a + b)² = a² + 2ab + b². Vergiss das Mittelstück 2ab nicht – (a + b)² ist nicht a² + b²!' : '(a − b)² = a² − 2ab + b². Das Mittelstück bekommt ein Minus, b² bleibt plus.',
    sol: [`= ${kvq} ${s > 0 ? '+' : MI} 2 · ${kv} · ${a} + ${a}²`, `= ${res}`] });
}
function faktorTask(a, k) {
  const v = pick(['x', 'a', 'y']), s = sgn(), kv = glied(k, v, true);
  const term = poly([k * k, X2(v)], [s * 2 * k * a, v], [a * a, '']);
  const ans = `(${kv} ${s > 0 ? '+' : MI} ${a})<sup>2</sup>`;
  return termTask({ title: 'Faktorisieren', q: `Faktorisiere mit einer binomischen Formel.${big(term)}`, form: 'binom', vars: [v], ansHtml: ans,
    hint: 'Suche die zwei Quadrate und lies ihre Seiten ab. Prüfe das Mittelstück: Ist es genau 2 · Seite · Seite? Plus in der Mitte → (a + b)², Minus → (a − b)².',
    sol: [`Quadrate: ${glied(k * k, X2(v), true)} = ${k === 1 ? `${v} · ${v}` : `(${kv})²`}   und   ${a * a} = ${a} · ${a}`, `Mittelstück: 2 · ${kv} · ${a} = ${glied(2 * k * a, v, true)} ✓`, `= ${ans}`] });
}
function faktor3Task(a, k) {
  const v = pick(['x', 'a', 'y']), kv = glied(k, v, true);
  const term = poly([k * k, X2(v)], [-a * a, '']), ans = `(${kv} + ${a}) · (${kv} ${MI} ${a})`;
  return termTask({ title: 'Faktorisieren', q: `Faktorisiere mit einer binomischen Formel.${big(term)}`, form: 'binom', vars: [v], ansHtml: ans,
    hint: 'Zwei Quadrate mit Minus dazwischen: a² − b² = (a + b) · (a − b). Lies die Seiten der beiden Quadrate ab.',
    sol: [`Quadrate: ${glied(k * k, X2(v), true)} = ${k === 1 ? `${v} · ${v}` : `(${kv})²`}   und   ${a * a} = ${a} · ${a}`, `= ${ans}`] });
}

/* Taschenrechner: in Übung und Test erlaubt (Malte 22.10.2026) – es gibt deshalb keine reinen Rechen-Ergebnisse beim Kopfrechnen. */
const MIT_TR = new Set();

/* ---------- Die Aufgabenplätze: 11 zum aktuellen Thema (je einer pro „Ich kann …“-Zeile des Kompetenzrasters)
   + 1 Wiederholung aus einem früheren Thema (review: true, farblich abgesetzt, im Test immer zuletzt) ----------
   Reihenfolge NICHT ändern, solange Ergebnisse aus laufenden Tests eingesammelt werden.
   area = Stunde im Skript (= Abschnitt im Kompetenzraster), name = Themenname für „Gezielt üben“.
   gens = im Test (nur Grundlagen), practiceGens = in der Übung zusätzlich schwierigere Varianten.
   Die „Ich kann …“-Sätze stehen in RASTER und müssen WORTGLEICH im Kompetenzraster stehen. */
const SLOTS = [
  { area: 'I.1a Ausmultiplizieren', name: 'Ausmultiplizieren', gens: ['ausmultZahl', 'ausmultVar'] },
  { area: 'I.1b Ausklammern', name: 'Ausklammern', gens: ['ausklZahl', 'ausklVar'], practiceGens: ['ausklZahl', 'ausklVar', 'ausklZwei'] },
  { area: 'I.2 Summen multiplizieren', name: 'Summen multiplizieren', gens: ['summenXX', 'summenXY'], practiceGens: ['summenXX', 'summenXY', 'summen2'] },
  { area: 'I.3a Erste binomische Formel', name: '1. binomische Formel', gens: ['binom1', 'kopf1'], practiceGens: ['binom1', 'binom1k', 'kopf1'] },
  { area: 'I.3b Zweite binomische Formel', name: '2. binomische Formel', gens: ['binom2', 'kopf2'], practiceGens: ['binom2', 'binom2k', 'kopf2'] },
  { area: 'I.3c Dritte binomische Formel', name: '3. binomische Formel', gens: ['binom3', 'kopf3'], practiceGens: ['binom3', 'binom3k', 'kopf3'] },
  { area: 'I.4 Faktorisieren mit binomischen Formeln', name: 'Faktorisieren mit der 1. und 2. Formel', gens: ['faktor12'], practiceGens: ['faktor12', 'faktor12k', 'faktorCheck'] },
  { area: 'I.4 Faktorisieren mit binomischen Formeln', name: 'Faktorisieren mit der 3. Formel', gens: ['faktor3'], practiceGens: ['faktor3', 'faktor3k'] },
  { area: 'I.5 Gleichungen mit Klammern', name: 'Gleichungen mit Klammern', gens: ['gleichungBinom'], practiceGens: ['gleichungBinom', 'gleichungLinear'] },
  { area: 'I.5 Gleichungen mit Klammern', name: 'Minus vor einer Klammer', gens: ['minusBinom'], practiceGens: ['minusBinom', 'minusLinear'] },
  { area: 'I.6 Bruchgleichungen', name: 'Bruchgleichungen', gens: ['bruchX', 'bruchHN'], practiceGens: ['bruchX', 'bruchHN', 'bruch2x'], tauschbar: true },
  { area: 'Wiederholung: Zuordnungen (Klasse 7)', name: 'Dreisatz', gens: ['dreisatz'], review: true }   // bei künftigen Tests hier ein anderes altes Thema eintragen
];
const CAN = [
  'Terme durch Ausmultiplizieren umformen – auch mit Minus.',
  'einen möglichst großen gemeinsamen Faktor ausklammern.',
  'Summen multiplizieren und gleiche Glieder zusammenfassen.',
  'die 1. binomische Formel anwenden – auch zum Kopfrechnen.',
  'die 2. binomische Formel anwenden – auch zum Kopfrechnen.',
  'die 3. binomische Formel anwenden – auch zum Kopfrechnen.',
  'Terme mit der 1. und 2. binomischen Formel faktorisieren und das Mittelstück prüfen.',
  'Terme mit der 3. binomischen Formel faktorisieren.',
  'Gleichungen mit Klammern lösen und die Probe machen.',
  'ein Minus vor einer Klammer mit Hochzahl richtig auflösen.',
  'Bruchgleichungen mit dem Hauptnenner lösen und angeben, welche Zahl x nicht sein darf.',
  'mit dem Dreisatz rechnen.'
];
const RASTER = {};
SLOTS.forEach((s, i) => [...new Set([...s.gens, ...(s.practiceGens || [])])].forEach(g => RASTER[g] = CAN[i]));

function makeTask(gen) { const t = G[gen](); t.gen = gen; t.tr = MIT_TR.has(gen); t.can = RASTER[gen]; return t; }

/* Rückmeldung in der Sprache des Kompetenzrasters: nach Abschnitten geordnet, je Aufgabe der „Ich kann …“-Satz */
function rasterReport(tasks, grades, withButtons = false) {
  const sym = g => g === 2 ? '<span class="g2">✓</span>' : g === 1 ? '<span class="g1">½</span>' : '<span class="g0">✗</span>';
  const idx = tasks.map((t, i) => i).sort((a, b) => tasks[a].slot - tasks[b].slot);
  let html = '', area = '';
  for (const i of idx) {
    const t = tasks[i];
    if (SLOTS[t.slot].area !== area) { if (area) html += '</div>'; area = SLOTS[t.slot].area; html += `<div class="rarea${SLOTS[t.slot].review ? ' rev' : ''}"><div class="rhead">${SLOTS[t.slot].review ? `🔁 ${area} <span class="muted" style="font-weight:400">(nicht im Kompetenzraster)</span>` : area}</div>`; }
    html += `<div class="rrow"><span class="sy">${sym(grades[i])}</span><span class="txt">Ich kann ${t.can}</span>${withButtons && grades[i] !== 2 ? ` <button class="mini" data-i="${t.slot}">üben</button>` : ''}</div>`;
  }
  return `<div class="rreport">${html}</div></div>`;
}

/* Übung: echter Zufall. slotIdx = null → alle Plätze; sonst n Aufgaben eines Platzes */
function practiceTasks(slotIdx = null, n = 5) {
  rand = Math.random;
  const gens = s => s.practiceGens || s.gens;   // die Übung darf mehr Varianten haben als der Test
  if (slotIdx === null) return shuffle(SLOTS.map((s, i) => Object.assign(makeTask(pick(gens(s))), { slot: i })));   // Übung gemischt, Test fest
  return Array.from({ length: n }, () => Object.assign(makeTask(pick(gens(SLOTS[slotIdx]))), { slot: slotIdx }));
}

/* Test: Aufgabentyp hängt nur vom Testcode ab (gleich für die ganze Klasse),
   die Zahlen hängen von Testcode + Listennummer ab (jeder bekommt andere). */
/* Bruchgleichungen tauschen (sie kommen erst nach den Ferien dran, die Schüler üben aber schon vorher):
   in der Übung per Knopf, im Test, wenn die Lehrkraft den Test „ohne Bruchgleichungen“ anlegt (steckt im Testcode: 1. Ziffer ungerade).
   Ersatz im Test: eine Gleichung bzw. ein Minus-vor-der-Klammer-Term aus I.5. */
const ERSATZ_TEST = [{ slot: 8, gen: 'gleichungLinear' }, { slot: 9, gen: 'minusLinear' }];
const ohneBruch = code => +String(code)[0] % 2 === 1;
function swapTask() {
  rand = Math.random;
  const i = pick(SLOTS.map((s, k) => k).filter(k => !SLOTS[k].review && !SLOTS[k].tauschbar)), s = SLOTS[i];
  return Object.assign(makeTask(pick(s.practiceGens || s.gens)), { slot: i, getauscht: true });
}
function testTasks(code, nr) {
  const out = SLOTS.map((s, i) => {
    rand = mulberry32(hash32(`typ|${code}|${i}`));
    const ers = s.tauschbar && ohneBruch(code) ? pick(ERSATZ_TEST) : null;
    const gen = ers ? ers.gen : pick(s.gens);
    rand = mulberry32(hash32(`zahl|${code}|${nr}|${i}`));
    return Object.assign(makeTask(gen), { slot: ers ? ers.slot : i });
  });
  rand = Math.random;
  return out;
}

/* ---------- Bewerten ----------
   ans: { k } bei Auswahl, sonst { a1 } als Text. Ergebnis: 2 = richtig, 1 = halb (gleichwertig, aber Form nicht ganz fertig), 0 = falsch, -1 = leer */
function grade(t, ans) {
  if (!ans) return -1;
  if (t.type === 'mc') return ans.k == null ? -1 : (t.options[ans.k] === t.ans ? 2 : 0);
  if (t.type === 'term') return gradeTerm(t, ans.a1 || '');
  const v1 = parseNum(ans.a1 || '');
  if (t.type === 'num') return isNaN(v1) ? (String(ans.a1 || '').trim() ? 0 : -1) : (eq(v1, t.ans) ? 2 : 0);
  return 0;
}
/* Was bei ½ fehlt – für die Rückmeldung in der Übung */
const HALF_TIP = {
  sum: 'Der Term stimmt, ist aber noch nicht fertig: Löse alle Klammern auf und fasse gleiche Glieder zusammen.',
  factor: 'Richtig umgeformt – aber in der Klammer steckt noch ein gemeinsamer Faktor. Klammere so viel wie möglich aus.',
  binomK: 'Gleichwertig – aber noch nicht fertig: Klammere zuerst die gemeinsame Zahl aus und schreibe den Rest als binomische Klammer.',
  binom: 'Gleichwertig – aber noch nicht als binomische Klammer geschrieben. Schreibe das Ergebnis als (… + …)², (… − …)² oder (… + …) · (… − …).'
};
const points = g => g === 2 ? 1 : g === 1 ? 0.5 : 0;
const fmtPts = p => String(p).replace('.', ',');
/* Note linear (Realschule): volle Punktzahl = 1,0, halbe Punktzahl = 3,5, null Punkte = 6,0; auf eine Dezimale gerundet */
const noteFor = (pts, max = SLOTS.length) => Math.round((6 - 5 * pts / max) * 10 + 1e-9) / 10;
const fmtNote = n => n.toFixed(1).replace('.', ',');

/* Antwort lesbar machen (für Lehrerseite und Ergebnisanzeige) */
function answerText(t, ans) {
  if (!ans) return '—';
  if (t.type === 'mc') return ans.k == null ? '—' : t.options[ans.k];
  const a1 = String(ans.a1 || '').trim();
  if (!a1) return '—';
  if (t.type === 'term') return termHtml(a1);
  return `${t.pre ? t.pre + ' ' : ''}${escH(a1)}${t.post ? ' ' + t.post : ''}`;
}
function correctText(t) {
  if (t.type === 'mc') return t.ans;
  if (t.type === 'term') return t.ansHtml;
  if (t.type === 'num') return `${t.pre ? t.pre + ' ' : ''}${t.post === '€' ? t.ans.toFixed(2).replace('.', ',') : fmt(t.ans)}${t.post ? ' ' + t.post : ''}`;
}

/* ---------- Testcode: 4 Zufallsziffern + 1 Prüfziffer (fängt Tippfehler ab) ---------- */
function codeCheckDigit(d4) { const w = [3, 7, 9, 1]; return String([...d4].reduce((s, c, i) => s + (+c) * w[i], 0) % 10); }
function newTestCode(ohneBr = false) { let d; do { d = String(Math.floor(Math.random() * 10000)).padStart(4, '0'); } while ((+d[0] % 2 === 1) !== ohneBr); return d + codeCheckDigit(d); }
function validCode(c) { return /^\d{5}$/.test(c) && codeCheckDigit(c.slice(0, 4)) === c[4]; }

/* ---------- Schülernummer: 3 Ziffern, die letzte ist Prüfziffer ----------
   Gültig, wenn (3·d1 + 7·d2 + d3) mod 10 = 0. Das ergibt 90 mögliche Nummern (genug für eine Klasse)
   und fängt Zahlendreher und einzelne Tippfehler ab. Die Nummer verrät nichts über die Klassenliste. */
function validNr(n) {
  const s = String(n).trim();
  if (!/^[1-9]\d\d$/.test(s)) return false;
  return (3 * +s[0] + 7 * +s[1] + +s[2]) % 10 === 0;
}
const ALL_NRS = Array.from({ length: 900 }, (_, i) => i + 100).filter(validNr);
function randomNrs(count) {
  const pool = ALL_NRS.slice();
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, Math.min(count, pool.length)).sort((a, b) => a - b);
}

/* ---------- Übungsstatistik (bleibt auf dem Schülergerät, bis sie per QR gezeigt wird) ----------
   { dev, rounds, drills, tasks, correct, days: ['2026-10-18', …], minutes, last } */
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
function encPractice(p) {
  if (!p) return '';
  return [p.dev, p.rounds, p.drills, p.tasks, p.correct, p.days.length, Math.round(p.minutes), (p.last || '').replace(/-/g, '')].join('.');
}
function decPractice(s) {
  if (!s) return null;
  const [dev, rounds, drills, tasks, correct, days, minutes, last] = s.split('.');
  return { dev, rounds: +rounds, drills: +drills, tasks: +tasks, correct: +correct, days: +days, minutes: +minutes,
    last: last ? `${last.slice(0, 4)}-${last.slice(4, 6)}-${last.slice(6, 8)}` : '' };
}

/* ---------- Ergebnis-Übertragung per QR-Code ----------
   Test:  TC1|code|nr|tabs|minuten|antworten|übung|prüfsumme  (die Lehrerseite bewertet anhand der Antworten selbst neu)
   Übung: TU1|nr|übung|prüfsumme                               (Übungsnachweis, auch von einem anderen Gerät) */
const SALT = 'Hoeri-Terme';
/* Stand der Aufgaben: bei jeder Änderung an Generatoren/SLOTS erhöhen (und ?v= in index.html/lehrer.html anpassen).
   Steckt im Ergebnis-Code, damit die Lehrerseite merkt, wenn ein Schülergerät eine andere Fassung hatte. */
const APPV = '20261022c';
const sig = s => hash32(SALT + '|' + s).toString(36).toUpperCase().padStart(7, '0').slice(-5);
function encAnswers(answers) {
  return answers.map(a => !a ? '' : a.k != null ? '#' + a.k : [a.a1 || '', a.a2 || ''].map(x => encodeURIComponent(String(x).trim()).replace(/!/g, '%21').replace(/~/g, '%7E')).join('~')).join('!');
}
function decAnswers(s) {
  return s.split('!').map(x => {
    if (x === '') return null;
    if (x[0] === '#') return { k: +x.slice(1) };
    const [a1, a2] = x.split('~').map(decodeURIComponent);
    return { a1, a2 };
  });
}
function makePayload(code, nr, tabs, minutes, answers, practice) {
  const body = ['TC1.' + APPV, code, nr, tabs, minutes, encAnswers(answers), encPractice(practice)].join('|');
  return body + '|' + sig(body);
}
function makePracticePayload(nr, practice) {
  const body = ['TU1', nr, encPractice(practice)].join('|');
  return body + '|' + sig(body);
}
function parsePayload(txt) {
  const p = String(txt).trim().split('|');
  if (/^TC1(\.|$)/.test(p[0]) && p.length === 8) {
    const body = p.slice(0, 7).join('|');
    return { kind: 'test', version: p[0].split('.')[1] || '', code: p[1], nr: +p[2], tabs: +p[3], minutes: +p[4], answers: decAnswers(p[5]), practice: decPractice(p[6]), valid: sig(body) === p[7] };
  }
  if (p[0] === 'TU1' && p.length === 4) {
    const body = p.slice(0, 3).join('|');
    return { kind: 'practice', nr: +p[1], practice: decPractice(p[2]), valid: sig(body) === p[3] };
  }
  return null;
}
/* Kurzcode zum Abtippen (ohne Antworten und Übung): Nr-Bewertungen-Tabwechsel-Prüfsumme, z. B. 417-222120222202-0-K3F9A */
function makeShortCode(code, nr, tabs, grades) {
  const g = grades.map(x => Math.max(0, x)).join('');
  return `${nr}-${g}-${tabs}-${sig(`S|${code}|${nr}|${g}|${tabs}`)}`;
}
function parseShortCode(txt, code) {
  const m = String(txt).trim().toUpperCase().replace(/\s/g, '').match(new RegExp(`^(\\d{3})-([012]{${SLOTS.length}})-(\\d{1,3})-([0-9A-Z]{5})$`));
  if (!m) return null;
  const [, nr, g, tabs, s] = m;
  return { nr: +nr, grades: [...g].map(Number), tabs: +tabs, valid: sig(`S|${code}|${+nr}|${g}|${+tabs}`) === s };
}
