/* KA1-Berichtigung (Kl. 8 RS, Terme und Gleichungen) – 19.11.2026
   Ablauf je Aufgabe: ① so wird die Aufgabe der Klassenarbeit gerechnet (Schritt für Schritt mit Erklärung)
   ② „Welcher Fehler ist dir passiert?“ ankreuzen → fertiger Satz fürs Heft
   ③ Ersatzaufgabe mit neuen Zahlen: abschreiben, im Heft lösen, Ergebnis eingeben.
   Generatoren und Termeingabe kommen aus aufgaben.js (Terme-Check). */
"use strict";
const F = frac;
const KEYS = ['1a', '1b', '2', '3a', '3b', '4a', '4b', '4c', '4d', '5', '6', '7a', '7b', '8a', '8b', '9', '10a', '10b', '11'];
const STORE = 'ka1ber.v1';
const st = (() => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(st)); } catch (e) {} };

/* ===== ① Die Aufgaben der Klassenarbeit, Schritt für Schritt ===== */
const D0 = ['D = ℚ \\ {0}', 'x steht im Nenner. Durch 0 darf man nicht teilen – darum darf x nicht 0 sein.'];
const ORIG = {
  A: {
    '1a': ['Multipliziere aus: −3 · (2a − 5)', [
      ['= (−3) · 2a + (−3) · (−5)', 'Die −3 wird mit <b>jedem</b> Teil der Klammer multipliziert. Das Minus gehört zur Zahl dahinter.'],
      ['= −6a + 15', 'Minus mal Minus gibt Plus: (−3) · (−5) = +15.']]],
    '1b': ['Klammere einen möglichst großen Faktor aus: 8a² − 12a', [
      ['8a² = 4a · 2a', 'Größte gemeinsame Zahl von 8 und 12 ist 4 – und in beiden Teilen steckt ein a. Also 4a.'], ['12a = 4a · 3', ''],
      ['= 4a · (2a − 3)', '4a kommt vor die Klammer, der Rest in die Klammer.'],
      ['Probe: 4a · 2a − 4a · 3'], ['= 8a² − 12a ✓', 'Rechne die Klammer wieder aus – kommt die Aufgabe heraus?']]],
    '2': ['Multipliziere aus und fasse zusammen: (2a − 3) · (a + 5)', [
      ['= 2a · a + 2a · 5 + (−3) · a + (−3) · 5', 'Vier Bögen: <b>jeder</b> Teil der ersten Klammer mal <b>jeder</b> Teil der zweiten.'],
      ['= 2a² + 10a − 3a − 15', 'Die vier Ergebnisse. Das Minus gehört zur Zahl: (−3) · 5 = −15.'],
      ['= 2a² + 7a − 15', 'Gleiche Sorten zusammenzählen: 10a − 3a = 7a. a² und a sind <b>verschiedene</b> Sorten.']]],
    '3a': ['Faktorisiere mit einer binomischen Formel: x² + 8x + 16', [
      ['x² = x · x', 'Suche die zwei Quadrate und lies ihre Seiten ab: x und 4.'], ['16 = 4 · 4', ''],
      ['Mittelstück: 2 · x · 4 = 8x ✓', 'Passt das Mittelstück? Ja. Plus in der Mitte → 1. Formel.'],
      ['= (x + 4)²', 'Das ² an der Klammer nicht vergessen.']]],
    '3b': ['Faktorisiere mit einer binomischen Formel: 4x² − 81', [
      ['4x² = (2x)²', 'Zwei Quadrate, dazwischen ein Minus, kein Mittelstück → 3. Formel.'], ['81 = 9²', ''],
      ['= (2x + 9) · (2x − 9)', 'a² − b² = (a + b) · (a − b). Nicht (2x − 9)² – das wäre 4x² − 36x + 81.']]],
    '4a': ['Wende eine binomische Formel an: (x + 5)²', [
      ['= x² + 2 · x · 5 + 5²', '1. Formel: a² + 2ab + b². Das Mittelstück 2ab nicht vergessen!'],
      ['= x² + 10x + 25', '']]],
    '4b': ['Wende eine binomische Formel an: (a + 6) · (a − 6)', [
      ['= a² − 6²', '3. Formel: (a + b) · (a − b) = a² − b². Kein Mittelstück – +6a und −6a heben sich auf.'],
      ['= a² − 36', '']]],
    '4c': ['Wende eine binomische Formel an: (3x − 2)²', [
      ['= (3x)² − 2 · 3x · 2 + 2²', '2. Formel: a² − 2ab + b² mit a = 3x und b = 2.'],
      ['= 9x² − 12x + 4', '(3x)² = 3x · 3x = 9x². Das Mittelstück bekommt Minus, b² bleibt Plus.']]],
    '4d': ['Berechne 51² mithilfe einer binomischen Formel – so, wie du ohne Taschenrechner rechnen würdest.', [
      ['51² = (50 + 1)²', 'Zerlege in eine glatte Zehnerzahl und eine kleine Zahl: 51 = 50 + 1.'],
      ['= 50² + 2 · 50 · 1 + 1²', '1. Formel.'],
      ['= 2500 + 100 + 1', 'Jeden Teil im Kopf ausrechnen.'],
      ['= 2601', '']]],
    '5': ['Löse die Gleichung: (x + 3)² = x² + 33', [
      ['x² + 6x + 9 = x² + 33   | − x²', 'Klammer mit der 1. Formel auflösen. Die rechte Seite bleibt stehen!'],
      ['6x + 9 = 33   | − 9', 'x² fällt auf beiden Seiten weg.'],
      ['6x = 24   | : 6', 'Umkehr-Rechnung: + 9 wird mit − 9 weggemacht – auf beiden Seiten.'],
      ['x = 4', 'Probe links: (4 + 3)² = 49<br>Probe rechts: 4² + 33 = 49 ✓']]],
    '6': ['Löse die Gleichung: (x + 5) · (x − 2) = x² + 11', [
      ['x² − 2x + 5x − 10 = x² + 11', 'Vier Malaufgaben: x · x, x · (−2), 5 · x, 5 · (−2). Rechte Seite mitschreiben!'],
      ['x² + 3x − 10 = x² + 11   | − x²', 'Zusammenfassen: −2x + 5x = 3x.'],
      ['3x − 10 = 11   | + 10', '− 10 wird mit + 10 weggemacht.'],
      ['3x = 21   | : 3', ''],
      ['x = 7', 'Probe links: (7 + 5) · (7 − 2) = 60<br>Probe rechts: 7² + 11 = 60 ✓']]],
    '7a': ['Lässt sich x² + 14x + 36 mit einer binomischen Formel faktorisieren? Begründe.', [
      ['x² = x · x', 'Seiten der beiden Quadrate: x und 6.'], ['36 = 6 · 6', ''],
      ['Das Mittelstück müsste 2 · x · 6 = 12x sein.', 'Jetzt prüfen: Passt das Mittelstück?'],
      ['Es steht aber 14x da. → Nein.', 'Zwei Quadrate allein reichen nicht – das Mittelstück muss passen.']]],
    '7b': ['Tom rechnet: (x − 3)² = x² − 9. Erkläre seinen Fehler.', [
      ['(x − 3)² = (x − 3) · (x − 3)', 'Das Quadrat heißt: die Klammer mal sich selbst – nicht (x − 3) · (x + 3).'],
      ['= x² − 6x + 9', '2. Formel: Mittelstück 2 · x · 3 = 6x mit Minus, und (−3)² = +9.'],
      ['Tom hat das Mittelstück −6x vergessen (und es heißt +9).', 'So schreibt man die Erklärung.']]],
    '8a': [`Löse die Gleichung: ${F(12, 'x')} + 1 = 4`, [
      D0,
      [`${F(12, 'x')} + 1 = 4   | · x`, 'Der gemeinsame Nenner ist x. <b>Jeder</b> Teil wird mal x genommen – auch die 1 und die 4!'],
      ['12 + x = 4x   | − x', `${F(12, 'x')} · x = 12 – das x kürzt sich weg.`],
      ['12 = 3x   | : 3', ''],
      ['x = 4', `Probe: ${F(12, 4)} + 1<br>= 3 + 1<br>= 4 ✓`]]],
    '8b': [`Löse die Gleichung: ${F(3, 'x')} + ${F(1, '2x')} = ${F(7, 8)}`, [
      D0,
      ['Nenner x, 2x und 8 → gemeinsamer Nenner 8x', 'Die kleinste Zahl mit x, in der x, 2x und 8 stecken.'],
      [`${F(3, 'x')} · 8x + ${F(1, '2x')} · 8x = ${F(7, 8)} · 8x`, '<b>Jeden</b> Bruch mal 8x – auf beiden Seiten.'],
      ['24 + 4 = 7x', `${F(3, 'x')} · 8x = 24<br>${F(1, '2x')} · 8x = 4<br>${F(7, 8)} · 8x = 7x`],
      ['28 = 7x   | : 7', ''],
      ['x = 4', `Probe: ${F(3, 4)} + ${F(1, 8)}<br>= ${F(6, 8)} + ${F(1, 8)}<br>= ${F(7, 8)} ✓`]]],
    '9': ['Vereinfache so weit wie möglich: x² − (x − 4)²', [
      ['= x² − (x² − 8x + 16)', 'Zuerst das Binom (2. Formel) – und das Ergebnis <b>in Klammern</b> schreiben!'],
      ['= x² − x² + 8x − 16', 'Das Minus vor der Klammer dreht <b>jedes</b> Vorzeichen in der Klammer um.'],
      ['= 8x − 16', 'x² − x² = 0.']]],
    '10a': ['Ergänze die Lücken: 4x² + 28x + □ = (□ + □)²', [
      ['4x² = (2x)²', 'Ins erste Kästchen kommt, was mal sich selbst den ersten Teil ergibt.'], ['→ 1. Kästchen: 2x', ''],
      ['28x : (2 · 2x) = 7', 'Das Mittelstück ist 2 · erstes Kästchen · zweites Kästchen. Rückwärts heißt das: teilen.'], ['→ 2. Kästchen: 7', ''],
      ['7² = 49', 'Die Zahl ist das zweite Kästchen mal sich selbst.'], ['→ erstes Kästchen: 49', ''],
      ['4x² + 28x + 49 = (2x + 7)²', '']]],
    '10b': ['Faktorisiere: 9x² − 30xy + 25y²', [
      ['9x² = (3x)²', 'Seiten der beiden Quadrate: 3x und 5y.'], ['25y² = (5y)²', ''],
      ['Mittelstück: 2 · 3x · 5y = 30xy ✓', 'Es passt. Minus in der Mitte → 2. Formel.'],
      ['= (3x − 5y)²', '']]],
    '11': [`Löse die Gleichung: ${F(4, 'x')} + 3 = ${F(5, '2x')}`, [
      D0,
      [`${F(4, 'x')} + 3 = ${F(5, '2x')}   | · 2x`, 'Gemeinsamer Nenner von x und 2x ist 2x. Alles mal 2x – <b>auch die 3</b>.'],
      ['8 + 6x = 5   | − 8', `${F(4, 'x')} · 2x = 8<br>3 · 2x = 6x<br>${F(5, '2x')} · 2x = 5`],
      ['6x = −3   | : 6', ''],
      ['x = −0,5', 'Eine Lösung darf negativ sein. Probe links: 4 : (−0,5) + 3 = −5<br>Probe rechts: 5 : (−1) = −5 ✓']]]
  },
  B: {
    '1a': ['Multipliziere aus: −4 · (3a − 2)', [
      ['= (−4) · 3a + (−4) · (−2)', 'Die −4 wird mit <b>jedem</b> Teil der Klammer multipliziert. Das Minus gehört zur Zahl dahinter.'],
      ['= −12a + 8', 'Minus mal Minus gibt Plus: (−4) · (−2) = +8.']]],
    '1b': ['Klammere einen möglichst großen Faktor aus: 9a² − 15a', [
      ['9a² = 3a · 3a', 'Größte gemeinsame Zahl von 9 und 15 ist 3 – und in beiden Teilen steckt ein a. Also 3a.'], ['15a = 3a · 5', ''],
      ['= 3a · (3a − 5)', '3a kommt vor die Klammer, der Rest in die Klammer.'],
      ['Probe: 3a · 3a − 3a · 5'], ['= 9a² − 15a ✓', 'Rechne die Klammer wieder aus – kommt die Aufgabe heraus?']]],
    '2': ['Multipliziere aus und fasse zusammen: (3a − 2) · (a + 4)', [
      ['= 3a · a + 3a · 4 + (−2) · a + (−2) · 4', 'Vier Bögen: <b>jeder</b> Teil der ersten Klammer mal <b>jeder</b> Teil der zweiten.'],
      ['= 3a² + 12a − 2a − 8', 'Die vier Ergebnisse. Das Minus gehört zur Zahl: (−2) · 4 = −8.'],
      ['= 3a² + 10a − 8', 'Gleiche Sorten zusammenzählen: 12a − 2a = 10a. a² und a sind <b>verschiedene</b> Sorten.']]],
    '3a': ['Faktorisiere mit einer binomischen Formel: x² + 10x + 25', [
      ['x² = x · x', 'Suche die zwei Quadrate und lies ihre Seiten ab: x und 5.'], ['25 = 5 · 5', ''],
      ['Mittelstück: 2 · x · 5 = 10x ✓', 'Passt das Mittelstück? Ja. Plus in der Mitte → 1. Formel.'],
      ['= (x + 5)²', 'Das ² an der Klammer nicht vergessen.']]],
    '3b': ['Faktorisiere mit einer binomischen Formel: 9x² − 25', [
      ['9x² = (3x)²', 'Zwei Quadrate, dazwischen ein Minus, kein Mittelstück → 3. Formel.'], ['25 = 5²', ''],
      ['= (3x + 5) · (3x − 5)', 'a² − b² = (a + b) · (a − b). Nicht (3x − 5)² und nicht (9x − 25) · (9x + 25)!']]],
    '4a': ['Wende eine binomische Formel an: (x + 7)²', [
      ['= x² + 2 · x · 7 + 7²', '1. Formel: a² + 2ab + b². Das Mittelstück 2ab nicht vergessen!'],
      ['= x² + 14x + 49', '7 · 7 = 49.']]],
    '4b': ['Wende eine binomische Formel an: (a + 9) · (a − 9)', [
      ['= a² − 9²', '3. Formel: (a + b) · (a − b) = a² − b². Kein Mittelstück – +9a und −9a heben sich auf.'],
      ['= a² − 81', '']]],
    '4c': ['Wende eine binomische Formel an: (2x − 5)²', [
      ['= (2x)² − 2 · 2x · 5 + 5²', '2. Formel: a² − 2ab + b² mit a = 2x und b = 5.'],
      ['= 4x² − 20x + 25', '(2x)² = 2x · 2x = 4x². Das Mittelstück bekommt Minus, b² bleibt Plus.']]],
    '4d': ['Berechne 61² mithilfe einer binomischen Formel – so, wie du ohne Taschenrechner rechnen würdest.', [
      ['61² = (60 + 1)²', 'Zerlege in eine glatte Zehnerzahl und eine kleine Zahl: 61 = 60 + 1.'],
      ['= 60² + 2 · 60 · 1 + 1²', '1. Formel.'],
      ['= 3600 + 120 + 1', 'Jeden Teil im Kopf ausrechnen.'],
      ['= 3721', '']]],
    '5': ['Löse die Gleichung: (x + 2)² = x² + 28', [
      ['x² + 4x + 4 = x² + 28   | − x²', 'Klammer mit der 1. Formel auflösen. Die rechte Seite bleibt stehen!'],
      ['4x + 4 = 28   | − 4', 'x² fällt auf beiden Seiten weg.'],
      ['4x = 24   | : 4', 'Umkehr-Rechnung: + 4 wird mit − 4 weggemacht – auf beiden Seiten.'],
      ['x = 6', 'Probe links: (6 + 2)² = 64<br>Probe rechts: 6² + 28 = 64 ✓']]],
    '6': ['Löse die Gleichung: (x + 6) · (x − 2) = x² + 8', [
      ['x² − 2x + 6x − 12 = x² + 8', 'Vier Malaufgaben: x · x, x · (−2), 6 · x, 6 · (−2). Rechte Seite mitschreiben!'],
      ['x² + 4x − 12 = x² + 8   | − x²', 'Zusammenfassen: −2x + 6x = 4x.'],
      ['4x − 12 = 8   | + 12', '− 12 wird mit + 12 weggemacht.'],
      ['4x = 20   | : 4', ''],
      ['x = 5', 'Probe links: (5 + 6) · (5 − 2) = 33<br>Probe rechts: 5² + 8 = 33 ✓']]],
    '7a': ['Lässt sich x² + 12x + 25 mit einer binomischen Formel faktorisieren? Begründe.', [
      ['x² = x · x', 'Seiten der beiden Quadrate: x und 5.'], ['25 = 5 · 5', ''],
      ['Das Mittelstück müsste 2 · x · 5 = 10x sein.', 'Jetzt prüfen: Passt das Mittelstück?'],
      ['Es steht aber 12x da. → Nein.', 'Zwei Quadrate allein reichen nicht – das Mittelstück muss passen.']]],
    '7b': ['Lena rechnet: (x − 6)² = x² − 36. Erkläre ihren Fehler.', [
      ['(x − 6)² = (x − 6) · (x − 6)', 'Das Quadrat heißt: die Klammer mal sich selbst – nicht (x − 6) · (x + 6).'],
      ['= x² − 12x + 36', '2. Formel: Mittelstück 2 · x · 6 = 12x mit Minus, und (−6)² = +36.'],
      ['Lena hat das Mittelstück −12x vergessen (und es heißt +36).', 'So schreibt man die Erklärung.']]],
    '8a': [`Löse die Gleichung: ${F(18, 'x')} + 2 = 5`, [
      D0,
      [`${F(18, 'x')} + 2 = 5   | · x`, 'Der gemeinsame Nenner ist x. <b>Jeder</b> Teil wird mal x genommen – auch die 2 und die 5!'],
      ['18 + 2x = 5x   | − 2x', `${F(18, 'x')} · x = 18 – das x kürzt sich weg.`],
      ['18 = 3x   | : 3', ''],
      ['x = 6', `Probe: ${F(18, 6)} + 2<br>= 3 + 2<br>= 5 ✓`]]],
    '8b': [`Löse die Gleichung: ${F(5, 'x')} + ${F(1, '2x')} = ${F(11, 6)}`, [
      D0,
      ['Nenner x, 2x und 6 → gemeinsamer Nenner 6x', 'Die kleinste Zahl mit x, in der x, 2x und 6 stecken.'],
      [`${F(5, 'x')} · 6x + ${F(1, '2x')} · 6x = ${F(11, 6)} · 6x`, '<b>Jeden</b> Bruch mal 6x – auf beiden Seiten.'],
      ['30 + 3 = 11x', `${F(5, 'x')} · 6x = 30<br>${F(1, '2x')} · 6x = 3<br>${F(11, 6)} · 6x = 11x`],
      ['33 = 11x   | : 11', ''],
      ['x = 3', `Probe: ${F(5, 3)} + ${F(1, 6)}<br>= ${F(10, 6)} + ${F(1, 6)}<br>= ${F(11, 6)} ✓`]]],
    '9': ['Vereinfache so weit wie möglich: x² − (x − 5)²', [
      ['= x² − (x² − 10x + 25)', 'Zuerst das Binom (2. Formel) – und das Ergebnis <b>in Klammern</b> schreiben!'],
      ['= x² − x² + 10x − 25', 'Das Minus vor der Klammer dreht <b>jedes</b> Vorzeichen in der Klammer um.'],
      ['= 10x − 25', 'x² − x² = 0.']]],
    '10a': ['Ergänze die Lücken: 9x² − 24x + □ = (□ − □)²', [
      ['9x² = (3x)²', 'Ins erste Kästchen kommt, was mal sich selbst den ersten Teil ergibt.'], ['→ 1. Kästchen: 3x', ''],
      ['24x : (2 · 3x) = 4', 'Das Mittelstück ist 2 · erstes Kästchen · zweites Kästchen. Rückwärts heißt das: teilen.'], ['→ 2. Kästchen: 4', ''],
      ['4² = 16', 'Die Zahl ist das zweite Kästchen mal sich selbst.'], ['→ erstes Kästchen: 16', ''],
      ['9x² − 24x + 16 = (3x − 4)²', '']]],
    '10b': ['Faktorisiere: 9x² − 12xy + 4y²', [
      ['9x² = (3x)²', 'Seiten der beiden Quadrate: 3x und 2y.'], ['4y² = (2y)²', ''],
      ['Mittelstück: 2 · 3x · 2y = 12xy ✓', 'Es passt. Minus in der Mitte → 2. Formel.'],
      ['= (3x − 2y)²', '']]],
    '11': [`Löse die Gleichung: ${F(5, 'x')} + 3 = ${F(1, '2x')}`, [
      D0,
      [`${F(5, 'x')} + 3 = ${F(1, '2x')}   | · 2x`, 'Gemeinsamer Nenner von x und 2x ist 2x. Alles mal 2x – <b>auch die 3</b>.'],
      ['10 + 6x = 1   | − 10', `${F(5, 'x')} · 2x = 10<br>3 · 2x = 6x<br>${F(1, '2x')} · 2x = 1`],
      ['6x = −9   | : 6', ''],
      ['x = −1,5', `Eine Lösung darf negativ sein.<br>Probe links: 5 : (−1,5) + 3 = −${F(1, 3)}<br>Probe rechts: 1 : (−3) = −${F(1, 3)} ✓`]]]
  }
};

/* ===== ② Typische Fehler zum Ankreuzen – einfache Sprache, ohne Fachwörter (Malte 19.11.2026) =====
   k = Text zum Ankreuzen · x = so sah es in der Klasse oft aus (falsch) · f = Satz „Mein Fehler“ · r = so geht es richtig
   y = richtiges Beispiel (eine Zeile pro Schritt). x und y: {A, B} oder für beide Gruppen gleich. */
const gx = (v, g) => v == null ? null : (typeof v === 'object' && !Array.isArray(v) && (v.A !== undefined || v.B !== undefined)) ? v[g] : v;
const FL = { k: 'Ich habe mich verrechnet oder etwas falsch abgeschrieben', f: 'Ich habe mich verrechnet oder etwas falsch abgeschrieben.', r: 'Ich rechne langsam und mache am Ende die Probe.' };
const LEER = { k: 'Ich habe die Aufgabe nicht gemacht', f: 'Ich habe die Aufgabe nicht gemacht.', r: 'Ich lerne den Weg mit der Ersatzaufgabe.' };
const RECHTS = (A, B) => ({ k: 'Ich habe die rechte Seite der Gleichung weggelassen', x: { A, B }, f: 'Ich habe nur die linke Seite weitergeschrieben.', r: 'Eine Gleichung hat zwei Seiten. In jede Zeile gehört: links = rechts.' });
const ZUENDE = (A, B) => ({ k: 'Ich habe nicht zu Ende gerechnet', x: { A, B }, f: 'Ich habe aufgehört, bevor x allein dastand.', r: 'Ich rechne weiter, bis x = … dasteht. Dann mache ich die Probe.' });
const UMKEHR = (xA, xB, yA, yB) => ({ k: 'Ich habe zum Rüberbringen die falsche Rechnung genommen', x: { A: xA, B: xB }, f: 'Ich habe die falsche Umkehr-Rechnung genommen.', r: '+ mache ich mit − weg. Mal mache ich mit geteilt weg. Immer auf beiden Seiten.', y: { A: yA, B: yB } });
const BRUCH = (n) => {   // n: Daten je Aufgabe 8a / 8b / 11
  const L = [
    { k: 'Bei D habe ich eine falsche Zahl eingetragen', x: n.dx, f: 'Ich habe bei D die falsche Zahl eingetragen.', r: 'Bei D steht die Zahl, die x nicht sein darf. Das ist immer die 0, weil man nicht durch 0 teilen darf.', y: 'D = ℚ \\ {0}' },
    { k: 'Ich wusste nicht, womit ich malnehmen muss', x: n.hx, f: 'Ich habe nicht gefunden, womit ich malnehmen muss.', r: 'Ich suche die kleinste Zahl mit x, in der alle Nenner stecken.', y: n.hy },
    { k: 'Ich habe nicht jeden Teil malgenommen', x: n.ax, f: 'Ich habe einen Teil der Gleichung nicht malgenommen.', r: 'Jeder Teil wird malgenommen – auch die Zahl ohne Bruch und die rechte Seite.', y: n.ay },
    { k: 'Beim Malnehmen habe ich falsch gekürzt', x: n.kx, f: 'Ich habe beim Malnehmen falsch gekürzt.', r: 'Das x unten und das x beim Malnehmen heben sich weg.', y: n.ky },
    { k: 'Ich habe den Bruch falsch gelesen', x: n.lx, f: 'Ich habe den Bruch falsch gelesen.', r: 'Ein Bruch heißt: oben geteilt durch unten.', y: n.ly },
    UMKEHR(n.ux.A, n.ux.B, n.uy.A, n.uy.B),
    { k: 'Ich habe nur Zahlen ausprobiert', x: 'Zahlen eingesetzt, bis es passt – ohne Rechenweg', f: 'Ich habe nur ausprobiert.', r: 'Ich nehme mit dem Nenner mal und rechne, bis x allein steht.' },
    FL, LEER];
  return L;
};
const FEHLER = {
  '1a': [
    { k: 'Minus mal Minus habe ich als Minus gerechnet', x: { A: '−3 · (−5) = −15', B: '−4 · (−2) = −8' }, f: 'Ich habe Minus mal Minus falsch gerechnet.', r: 'Minus mal Minus gibt Plus.', y: { A: '−3 · (−5) = +15', B: '−4 · (−2) = +8' } },
    { k: 'Ich habe nur mit der ersten Zahl in der Klammer malgenommen', x: { A: '−3 · (2a − 5) = −6a − 5', B: '−4 · (3a − 2) = −12a − 2' }, f: 'Ich habe nicht alles in der Klammer malgenommen.', r: 'Die Zahl vor der Klammer wird mit allem in der Klammer malgenommen.', y: { A: ['−3 · 2a = −6a', '−3 · (−5) = +15'], B: ['−4 · 3a = −12a', '−4 · (−2) = +8'] } },
    { k: 'Ich habe das Minus vor der Zahl vergessen', x: { A: '3 · 2a = 6a', B: '4 · 3a = 12a' }, f: 'Ich habe das Minus vor der Zahl vergessen.', r: 'Das Minus gehört zur Zahl und wird mitgerechnet.', y: { A: '−3 · 2a = −6a', B: '−4 · 3a = −12a' } },
    FL, LEER],
  '1b': [
    { k: 'Ich habe zu wenig vor die Klammer geschrieben', x: { A: '4 · (2a² − 3a)  oder  2a · (4a − 6)', B: '3 · (3a² − 5a)' }, f: 'Ich habe nicht alles vor die Klammer geschrieben, was in beiden Teilen steckt.', r: 'Vor die Klammer kommt die größte Zahl UND das a.', y: { A: '4a · (2a − 3)', B: '3a · (3a − 5)' } },
    { k: 'Ich habe geteilt, aber nichts vor die Klammer geschrieben', x: { A: '(2a² − 3a)', B: '(3a² − 5a)' }, f: 'Ich habe vergessen, was vor die Klammer gehört.', r: 'Was ich herausziehe, schreibe ich vor die Klammer.', y: { A: '4a · (2a − 3)', B: '3a · (3a − 5)' } },
    { k: 'In meiner Klammer stimmt etwas nicht', x: { A: '4a · (2a − 12)', B: '3a · (3a − 15)' }, f: 'In meiner Klammer stand etwas Falsches.', r: 'Probe: Ich rechne die Klammer wieder aus. Dann muss die Aufgabe herauskommen.', y: { A: ['4a · 2a = 8a²', '4a · (−3) = −12a'], B: ['3a · 3a = 9a²', '3a · (−5) = −15a'] } },
    { k: 'Ich habe eine binomische Formel benutzt', x: { A: '(8a − 12)²', B: '(3a − 5)²' }, f: 'Ich habe eine binomische Formel benutzt, obwohl man nur herausziehen muss.', r: 'Hier ziehe ich heraus, was in beiden Teilen steckt.', y: { A: '4a · (2a − 3)', B: '3a · (3a − 5)' } },
    FL, LEER],
  '2': [
    { k: 'Ich habe nicht jeden Teil mit jedem malgenommen', x: { A: '(2a − 3) · (a + 5) = 2a² − 15', B: '(3a − 2) · (a + 4) = 3a² − 8' }, f: 'Ich habe nicht alle vier Malaufgaben gerechnet.', r: 'Jeder Teil der ersten Klammer wird mit jedem Teil der zweiten Klammer malgenommen – vier Bögen.', y: { A: ['2a · a = 2a²', '2a · 5 = 10a', '−3 · a = −3a', '−3 · 5 = −15'], B: ['3a · a = 3a²', '3a · 4 = 12a', '−2 · a = −2a', '−2 · 4 = −8'] } },
    { k: 'Bei einer Malaufgabe ist Plus oder Minus falsch', x: { A: '2a² − 10a + 3a + 15', B: '3a² + 12a + 2a − 8' }, f: 'Bei einer Malaufgabe habe ich Plus und Minus vertauscht.', r: 'Das Minus gehört zur Zahl dahinter.', y: { A: '−3 · 5 = −15', B: '−2 · a = −2a' } },
    { k: 'Ich habe a² und a zusammengezählt', x: { A: '2a² + 7a = 9a²', B: '3a² + 10a = 13a²' }, f: 'Ich habe a² und a zusammengezählt.', r: 'Zusammenzählen darf man nur gleiche Sorten: a mit a. a² bleibt allein.', y: { A: ['10a − 3a = 7a', '2a² + 7a − 15'], B: ['12a − 2a = 10a', '3a² + 10a − 8'] } },
    { k: 'Ich habe „mal“ zwischen die vier Ergebnisse geschrieben', x: { A: '2a² · 10a · 3a · 15', B: '3a² · 12a · 2a · 8' }, f: 'Ich habe die vier Ergebnisse mit „mal“ verbunden.', r: 'Zwischen die vier Ergebnisse kommt plus oder minus.', y: { A: '2a² + 10a − 3a − 15', B: '3a² + 12a − 2a − 8' } },
    FL, LEER],
  '3a': [
    { k: 'Ich habe die falsche Zahl in die Klammer geschrieben', x: { A: 'x² + 8x + 16 = (x + 8)²', B: 'x² + 10x + 25 = (x + 10)²' }, f: 'Ich habe die falsche Zahl in die Klammer geschrieben.', r: 'In die Klammer kommt die Zahl, die mal sich selbst die letzte Zahl ergibt.', y: { A: ['4 · 4 = 16', '(x + 4)²'], B: ['5 · 5 = 25', '(x + 5)²'] } },
    { k: 'Ich habe das ² an der Klammer vergessen', x: { A: '(x + 4)', B: '(x + 5)' }, f: 'Ich habe das ² an der Klammer vergessen.', r: 'Die Klammer bekommt ein ².', y: { A: '(x + 4)²', B: '(x + 5)²' } },
    { k: 'Ich habe die Aufgabe falsch abgeschrieben', x: { A: 'x² + 8 + 16  (das x fehlt)', B: 'x² + 10 + 25  (das x fehlt)' }, f: 'Ich habe die Aufgabe falsch abgeschrieben.', r: 'Ich vergleiche meine erste Zeile genau mit der Aufgabe.' },
    LEER],
  '3b': [
    { k: 'Ich habe (… − …)² geschrieben', x: { A: '(2x − 9)²', B: '(3x − 5)²' }, f: 'Ich habe die falsche binomische Formel genommen.', r: 'Steht ein Minus zwischen zwei Quadratzahlen, schreibt man: Plus-Klammer mal Minus-Klammer.', y: { A: '(2x + 9) · (2x − 9)', B: '(3x + 5) · (3x − 5)' } },
    { k: 'Ich habe die Zahlen aus der Aufgabe einfach übernommen', x: { A: '(4x + 81) · (4x − 81)', B: '(9x − 25) · (9x + 25)' }, f: 'Ich habe die Zahlen einfach übernommen.', r: 'Ich suche, was mal sich selbst die Zahl ergibt.', y: { A: ['2x · 2x = 4x²', '9 · 9 = 81'], B: ['3x · 3x = 9x²', '5 · 5 = 25'] } },
    FL, LEER],
  '4a': [
    { k: 'Ich habe das Mittelstück vergessen', x: { A: '(x + 5)² = x² + 25', B: '(x + 7)² = x² + 49' }, f: 'Ich habe den mittleren Teil vergessen.', r: 'Bei (x + 5)² kommen immer drei Teile heraus. Der mittlere ist 2 · x · 5.', y: { A: '(x + 5)² = x² + 10x + 25', B: '(x + 7)² = x² + 14x + 49' } },
    { k: 'In der Mitte fehlt das „2 ·“', x: { A: 'x² + 5x + 25', B: 'x² + 7x + 49' }, f: 'In der Mitte habe ich nicht verdoppelt.', r: 'Der mittlere Teil ist 2 · x · Zahl.', y: { A: '2 · x · 5 = 10x', B: '2 · x · 7 = 14x' } },
    { k: 'Die letzte Zahl ist falsch', x: { A: 'x² + 10x + 10', B: 'x² + 14x + 14' }, f: 'Ich habe die letzte Zahl mal 2 statt mal sich selbst genommen.', r: 'Die letzte Zahl ist die Zahl mal sich selbst.', y: { A: '5 · 5 = 25', B: '7 · 7 = 49' } },
    { k: 'Ich habe nicht fertig zusammengezählt', x: { A: 'x² + 5x + 5x + 25', B: 'x² + 7x + 7x + 49' }, f: 'Ich habe am Ende nicht zusammengezählt.', r: 'Gleiche Sorten zusammenzählen.', y: { A: '5x + 5x = 10x', B: '7x + 7x = 14x' } },
    FL, LEER],
  '4b': [
    { k: 'Ich habe ein Mittelstück hingeschrieben, das es nicht gibt', x: { A: 'a² + 12a − 36', B: 'a² + 18a − 81' }, f: 'Ich habe einen mittleren Teil geschrieben.', r: 'Die beiden mittleren Teile heben sich weg. Es bleiben nur zwei Teile.', y: { A: ['+6a − 6a = 0', 'a² − 36'], B: ['+9a − 9a = 0', 'a² − 81'] } },
    { k: 'Am Ende steht Plus statt Minus', x: { A: 'a² + 36', B: 'a² + 81' }, f: 'Ich habe am Ende Plus geschrieben.', r: 'Plus mal Minus gibt Minus.', y: { A: '6 · (−6) = −36', B: '9 · (−9) = −81' } },
    FL, LEER],
  '4c': [
    { k: 'Die Zahl vor dem x habe ich nicht mit hoch 2 genommen', x: { A: '(3x)² = 3x²', B: '(2x)² = 2x²  oder  4x' }, f: 'Ich habe die Zahl vor dem x nicht mit sich selbst malgenommen.', r: 'Auch die Zahl vor dem x wird mit sich selbst malgenommen.', y: { A: ['(3x)² = 3x · 3x', '= 9x²'], B: ['(2x)² = 2x · 2x', '= 4x²'] } },
    { k: 'Ich habe das Mittelstück vergessen', x: { A: '(3x − 2)² = 9x² + 4', B: '(2x − 5)² = 4x² + 25' }, f: 'Ich habe den mittleren Teil vergessen.', r: 'Der mittlere Teil ist 2 · erster Teil · zweiter Teil, hier mit Minus.', y: { A: '2 · 3x · 2 = 12x', B: '2 · 2x · 5 = 20x' } },
    { k: 'Ich habe einmal Plus und einmal Minus in die Klammern geschrieben', x: { A: '(3x − 2) · (3x + 2) = 9x² − 4', B: '(2x − 5) · (2x + 5) = 4x² − 25' }, f: 'Ich habe eine Plus-Klammer statt der zweiten Minus-Klammer genommen.', r: 'Das ² heißt: die gleiche Klammer noch einmal.', y: { A: '(3x − 2) · (3x − 2)', B: '(2x − 5) · (2x − 5)' } },
    { k: 'Am Ende steht Minus statt Plus', x: { A: '9x² − 12x − 4', B: '4x² − 20x − 25' }, f: 'Ich habe am Ende Minus geschrieben.', r: 'Minus mal Minus gibt Plus.', y: { A: '(−2) · (−2) = +4', B: '(−5) · (−5) = +25' } },
    FL, LEER],
  '4d': [
    { k: 'Ich habe die Zahl ungeschickt zerlegt', x: { A: '51² = (50 − 1)²  oder  (25,5 + 25,5)²', B: '61² = (6 + 1)²  oder  (30,5 + 30,5)²' }, f: 'Ich habe die Zahl ungeschickt zerlegt.', r: 'Ich zerlege in eine Zehnerzahl plus eine kleine Zahl.', y: { A: '51² = (50 + 1)²', B: '61² = (60 + 1)²' } },
    { k: 'Ich habe nur das Ergebnis vom Taschenrechner hingeschrieben', x: { A: '51² = 2601  (ohne Weg)', B: '61² = 3721  (ohne Weg)' }, f: 'Ich habe nur das Ergebnis hingeschrieben.', r: 'Gefragt ist der Weg mit der Formel.', y: { A: ['(50 + 1)²', '= 2500 + 100 + 1', '= 2601'], B: ['(60 + 1)²', '= 3600 + 120 + 1', '= 3721'] } },
    { k: 'Ich habe das Mittelstück vergessen', x: { A: '(50 + 1)² = 2500 + 1', B: '(60 + 1)² = 3600 + 1' }, f: 'Ich habe den mittleren Teil vergessen.', r: 'Auch bei Zahlen gibt es den mittleren Teil.', y: { A: '2 · 50 · 1 = 100', B: '2 · 60 · 1 = 120' } },
    { k: 'Ich habe nicht fertig gerechnet', x: { A: '2500 + 100 + 1  (Ergebnis fehlt)', B: '3600 + 120 + 1  (Ergebnis fehlt)' }, f: 'Ich habe das Ergebnis nicht ausgerechnet.', r: 'Am Ende alles zusammenzählen.', y: { A: '= 2601', B: '= 3721' } },
    LEER],
  '5': [
    { k: 'Die Klammer mit ² habe ich falsch ausgerechnet', x: { A: '(x + 3)² = x² + 9', B: '(x + 2)² = x² + 4' }, f: 'Ich habe die Klammer mit ² falsch ausgerechnet.', r: 'Das Mittelstück nicht vergessen.', y: { A: '(x + 3)² = x² + 6x + 9', B: '(x + 2)² = x² + 4x + 4' } },
    RECHTS('x² + 6x + 9   (ohne „= x² + 33“)', 'x² + 4x + 4   (ohne „= x² + 28“)'),
    UMKEHR('6x + 9 = 33   | + 9', '4x + 4 = 28   | + 4', ['6x + 9 = 33   | − 9', '6x = 24'], ['4x + 4 = 28   | − 4', '4x = 24']),
    { k: 'Beim Teilen habe ich falsch gerechnet', x: { A: '6x = 24, dann x = 18', B: '4x = 24, dann x = 20' }, f: 'Ich habe minus statt geteilt gerechnet.', r: 'Steht eine Zahl vor dem x, teile ich durch diese Zahl.', y: { A: ['6x = 24   | : 6', 'x = 4'], B: ['4x = 24   | : 4', 'x = 6'] } },
    ZUENDE('6x = 24   (x fehlt)', '4x = 24   (x fehlt)'), FL, LEER],
  '6': [
    { k: 'Ich habe nicht jeden Teil mit jedem malgenommen', x: { A: 'x² − 10 = x² + 11', B: 'x² − 12 = x² + 8' }, f: 'Ich habe nicht alle vier Malaufgaben gerechnet.', r: 'Klammer mal Klammer: vier Malaufgaben.', y: { A: ['x · x = x²', 'x · (−2) = −2x', '5 · x = 5x', '5 · (−2) = −10'], B: ['x · x = x²', 'x · (−2) = −2x', '6 · x = 6x', '6 · (−2) = −12'] } },
    { k: 'Bei einer Malaufgabe ist Plus oder Minus falsch', x: { A: 'x² + 2x − 5x + 10', B: 'x² + 2x − 6x + 12' }, f: 'Bei einer Malaufgabe habe ich Plus und Minus vertauscht.', r: 'Das Minus gehört zur Zahl dahinter.', y: { A: ['x · (−2) = −2x', '5 · (−2) = −10'], B: ['x · (−2) = −2x', '6 · (−2) = −12'] } },
    RECHTS('x² + 3x − 10   (ohne „= x² + 11“)', 'x² + 4x − 12   (ohne „= x² + 8“)'),
    UMKEHR('3x − 10 = 11   | − 10', '4x − 12 = 8   | − 12', ['3x − 10 = 11   | + 10', '3x = 21'], ['4x − 12 = 8   | + 12', '4x = 20']),
    ZUENDE('3x = 21   (x fehlt)', '4x = 20   (x fehlt)'), FL, LEER],
  '7a': [
    { k: 'Ich habe „Ja“ gesagt, weil vorne und hinten Quadratzahlen stehen', x: { A: '„Ja, x² und 36 sind Quadratzahlen.“', B: '„Ja, x² und 25 sind Quadratzahlen.“' }, f: 'Ich habe nur auf die Zahlen vorne und hinten geschaut.', r: 'Ich muss auch das Mittelstück prüfen.', y: { A: ['Das Mittelstück müsste 2 · x · 6 = 12x sein.', 'Es steht aber 14x da.', 'Also: Nein.'], B: ['Das Mittelstück müsste 2 · x · 5 = 10x sein.', 'Es steht aber 12x da.', 'Also: Nein.'] } },
    { k: 'Meine Begründung passt nicht', x: { A: '„Nein, weil 14 keine Quadratzahl ist.“', B: '„Nein, weil 12 keine Quadratzahl ist.“' }, f: 'Meine Begründung hat nicht gepasst.', r: 'Die Begründung geht über das Mittelstück.', y: { A: ['Das Mittelstück müsste 2 · x · 6 = 12x sein.', 'Es steht aber 14x da.'], B: ['Das Mittelstück müsste 2 · x · 5 = 10x sein.', 'Es steht aber 12x da.'] } },
    { k: 'Beim Mittelstück habe ich das „2 ·“ vergessen', x: { A: 'x · 6 = 6x', B: 'x · 5 = 5x' }, f: 'Ich habe das Mittelstück falsch ausgerechnet.', r: 'Das Mittelstück ist 2 · x · Zahl.', y: { A: '2 · x · 6 = 12x', B: '2 · x · 5 = 10x' } },
    LEER],
  '7b': [
    { k: 'Ich habe nur gesagt, dass am Ende Plus stehen muss', x: { A: '„Es muss + 9 heißen.“', B: '„Es muss + 36 heißen.“' }, f: 'Ich habe nur das Plus am Ende gefunden.', r: 'Der wichtigste Fehler ist das fehlende Mittelstück.', y: { A: '(x − 3)² = x² − 6x + 9', B: '(x − 6)² = x² − 12x + 36' } },
    { k: 'Ich habe auch mit einer Plus-Klammer gerechnet', x: { A: '„Das stimmt, (x − 3) · (x + 3) = x² − 9.“', B: '„Das stimmt, (x − 6) · (x + 6) = x² − 36.“' }, f: 'Ich habe die gleiche Verwechslung gemacht.', r: 'Das ² heißt: die gleiche Klammer noch einmal.', y: { A: '(x − 3) · (x − 3)', B: '(x − 6) · (x − 6)' } },
    { k: 'Meine Erklärung war zu ungenau', x: '„Er hat falsch gerechnet.“', f: 'Meine Erklärung war zu ungenau.', r: 'Ich rechne es richtig aus und sage genau, was fehlt.', y: { A: 'Tom hat das Mittelstück −6x vergessen.', B: 'Lena hat das Mittelstück −12x vergessen.' } },
    LEER],
  '8a': BRUCH({ dx: { A: 'D = ℚ \\ {4}  (das ist die Lösung)', B: 'D = ℚ \\ {6}  (das ist die Lösung)' },
    hx: 'mal 2  oder  gar nicht malgenommen', hy: 'Der Nenner ist x. Also mal x.',
    ax: { A: '12 + 1 = 4x', B: '18 + 2 = 5x' }, ay: { A: '12 + x = 4x', B: '18 + 2x = 5x' },
    kx: { A: `${F(12, 'x')} · x = 12x`, B: `${F(18, 'x')} · x = 18x` }, ky: { A: `${F(12, 'x')} · x = 12`, B: `${F(18, 'x')} · x = 18` },
    lx: { A: `${F(12, 'x')} wie 12 · x gerechnet`, B: `${F(18, 'x')} wie x : 18 gerechnet` }, ly: { A: `${F(12, 'x')} heißt 12 : x`, B: `${F(18, 'x')} heißt 18 : x` },
    ux: { A: '12 = 3x, dann x = 12 · 3', B: '18 = 3x, dann x = 18 · 3' }, uy: { A: ['12 = 3x   | : 3', 'x = 4'], B: ['18 = 3x   | : 3', 'x = 6'] } }),
  '8b': BRUCH({ dx: { A: 'D = ℚ \\ {8}', B: 'D = ℚ \\ {6}' },
    hx: { A: 'mal 3x  oder  nur mal x', B: 'mal 3x  oder  nur mal x' }, hy: { A: ['Nenner: x, 2x und 8', 'Malnehmen mit 8x'], B: ['Nenner: x, 2x und 6', 'Malnehmen mit 6x'] },
    ax: { A: '24 + 4 = 7  (rechte Seite nicht malgenommen)', B: '30 + 3 = 11  (rechte Seite nicht malgenommen)' }, ay: { A: '24 + 4 = 7x', B: '30 + 3 = 11x' },
    kx: { A: `${F(1, '2x')} · 8x = 16`, B: `${F(1, '2x')} · 6x = 12` }, ky: { A: `${F(1, '2x')} · 8x = 4`, B: `${F(1, '2x')} · 6x = 3` },
    lx: { A: `${F(1, '2x')} wie 2x gerechnet`, B: `${F(1, '2x')} wie 2x gerechnet` }, ly: `${F(1, '2x')} heißt 1 : 2x`,
    ux: { A: '28 = 7x, dann x = 28 · 7', B: '33 = 11x, dann x = 33 − 11' }, uy: { A: ['28 = 7x   | : 7', 'x = 4'], B: ['33 = 11x   | : 11', 'x = 3'] } }),
  '11': BRUCH({ dx: { A: 'D = ℚ \\ {6}  oder  leer', B: 'D = ℚ \\ {5}  oder  leer' },
    hx: 'nur mal x', hy: ['Nenner: x und 2x', 'Malnehmen mit 2x'],
    ax: { A: '8 + 3 = 5  (die 3 nicht malgenommen)', B: '10 + 3 = 1  (die 3 nicht malgenommen)' }, ay: { A: '8 + 6x = 5', B: '10 + 6x = 1' },
    kx: { A: `${F(4, 'x')} · 2x = 4`, B: `${F(5, 'x')} · 2x = 5x` }, ky: { A: `${F(4, 'x')} · 2x = 8`, B: `${F(5, 'x')} · 2x = 10` },
    lx: { A: `${F(5, '2x')} wie 5 · 2x gerechnet`, B: `${F(1, '2x')} wie 2x gerechnet` }, ly: { A: `${F(5, '2x')} heißt 5 : 2x`, B: `${F(1, '2x')} heißt 1 : 2x` },
    ux: { A: '6x = −3, dann x = 6 : (−3)', B: '6x = −9, dann x = 6 : (−9)' }, uy: { A: ['6x = −3   | : 6', 'x = −0,5'], B: ['6x = −9   | : 6', 'x = −1,5'] } }),
  '9': [
    { k: 'Das Minus vor der Klammer habe ich nicht bei allen Teilen beachtet', x: { A: 'x² − x² − 8x + 16', B: 'x² − x² − 10x + 25' }, f: 'Ich habe das Minus vor der Klammer nicht bei allen Teilen beachtet.', r: 'Das Minus vor der Klammer dreht jedes Plus und Minus in der Klammer um.', y: { A: ['x² − (x² − 8x + 16)', '= x² − x² + 8x − 16'], B: ['x² − (x² − 10x + 25)', '= x² − x² + 10x − 25'] } },
    { k: 'Die Klammer mit ² habe ich falsch ausgerechnet', x: { A: '(x − 4)² = x² − 16  oder  x² − 8x − 16', B: '(x − 5)² = x² − 25  oder  x² − 10x − 25' }, f: 'Ich habe die Klammer mit ² falsch ausgerechnet.', r: 'Mittelstück nicht vergessen, am Ende steht Plus.', y: { A: '(x − 4)² = x² − 8x + 16', B: '(x − 5)² = x² − 10x + 25' } },
    { k: 'Ich habe nach dem Ausrechnen keine Klammer gesetzt', x: { A: 'x² − x² − 8x + 16', B: 'x² − x² − 10x + 25' }, f: 'Ich habe die Klammer weggelassen.', r: 'Erst die Klammer mit ² ausrechnen und das Ergebnis in eine Klammer schreiben. Dann das Minus beachten.', y: { A: 'x² − (x² − 8x + 16)', B: 'x² − (x² − 10x + 25)' } },
    { k: 'Ich habe nach x aufgelöst', x: { A: '8x − 16 = 0, dann x = 2', B: '10x − 25 = 0, dann x = 2,5' }, f: 'Ich habe nach x aufgelöst, obwohl es keine Gleichung ist.', r: 'Hier gibt es kein „=“. Ich vereinfache nur.', y: { A: '= 8x − 16', B: '= 10x − 25' } },
    { k: 'Ich habe die Aufgabe falsch abgeschrieben', x: { A: 'x² − (x + 4)²', B: 'x² − (x + 5)²' }, f: 'Ich habe die Aufgabe falsch abgeschrieben.', r: 'Ich vergleiche meine erste Zeile genau mit der Aufgabe.' },
    FL, LEER],
  '10a': [
    { k: 'Das erste Kästchen in der Klammer ist falsch', x: { A: '(4x + …)²', B: '(9x − …)²' }, f: 'Ich habe ins erste Kästchen die falsche Zahl geschrieben.', r: 'Ins erste Kästchen kommt, was mal sich selbst den ersten Teil ergibt.', y: { A: '2x · 2x = 4x²', B: '3x · 3x = 9x²' } },
    { k: 'Das zweite Kästchen in der Klammer ist falsch', x: { A: '(2x + 14)²', B: '(3x − 8)²' }, f: 'Ich habe ins zweite Kästchen die falsche Zahl geschrieben.', r: 'Das Mittelstück ist 2 · erstes Kästchen · zweites Kästchen. Rückwärts heißt das: teilen.', y: { A: '28x : (2 · 2x) = 7', B: '24x : (2 · 3x) = 4' } },
    { k: 'Die Zahl vorne ist falsch', x: { A: '4x² + 28x + 14', B: '9x² − 24x + 8' }, f: 'Ich habe vorne die falsche Zahl eingetragen.', r: 'Die Zahl ist das zweite Kästchen mal sich selbst.', y: { A: '7 · 7 = 49', B: '4 · 4 = 16' } },
    { k: 'Ich habe das ² an der Klammer vergessen', x: { A: '(2x + 7)', B: '(3x − 4)' }, f: 'Ich habe das ² an der Klammer vergessen.', r: 'Die Klammer bekommt ein ².', y: { A: '(2x + 7)²', B: '(3x − 4)²' } },
    FL, LEER],
  '10b': [
    { k: 'Ich dachte, das geht nicht', x: '„Das kann man nicht faktorisieren.“', f: 'Ich habe die binomische Formel nicht erkannt.', r: 'Vorne und hinten stehen Quadrate, und das Mittelstück passt. Dann geht eine binomische Formel.', y: { A: ['9x² = 3x · 3x', '25y² = 5y · 5y', '2 · 3x · 5y = 30xy'], B: ['9x² = 3x · 3x', '4y² = 2y · 2y', '2 · 3x · 2y = 12xy'] } },
    { k: 'Ich habe die Zahlen aus der Aufgabe einfach übernommen', x: { A: '(9x − 25y)²', B: '(9x − 4y)²' }, f: 'Ich habe die Zahlen einfach übernommen.', r: 'Ich suche, was mal sich selbst den Teil ergibt.', y: { A: '(3x − 5y)²', B: '(3x − 2y)²' } },
    { k: 'In der Klammer steht Plus statt Minus', x: { A: '(3x + 5y)²', B: '(3x + 2y)²' }, f: 'Ich habe Plus statt Minus in die Klammer geschrieben.', r: 'Minus in der Mitte heißt Minus in der Klammer.', y: { A: '(3x − 5y)²', B: '(3x − 2y)²' } },
    { k: 'Ich habe nur etwas herausgezogen', x: { A: '3 · (3x² − 10xy + …)', B: 'x · (9x − 12y …)' }, f: 'Ich habe nur etwas vor die Klammer gezogen.', r: 'Hier passt eine binomische Formel.', y: { A: '(3x − 5y)²', B: '(3x − 2y)²' } },
    FL, LEER]
};

/* ===== ③ Ersatzaufgaben: Generatoren aus aufgaben.js + neue für Aufg. 6, 7, 8b, 10, 11 ===== */
function gl6() {   // (x + a) · (x − b) = x² + c
  let a, b, x0, c;
  do { a = R(2, 8); b = R(1, 6); x0 = R(1, 9); c = (a - b) * x0 - a * b; } while (a === b || c === 0);
  const rs = poly([1, X2('x')], [c, '']);
  return { title: 'Gleichung mit zwei Klammern', q: `Löse die Gleichung.${big(`(x + ${a}) · (x ${MI} ${b}) = ${rs}`)}`, type: 'num', ans: x0, pre: 'x =',
    grafik: vierBoegen('x', a, 'x', -b),
    hint: 'Multipliziere die Klammern aus: vier Malaufgaben. Schreib die rechte Seite in jeder Zeile mit! Dann fällt x² weg, und du formst um, bis x allein steht.',
    sol: [`${poly([1, X2('x')], [-b, 'x'], [a, 'x'], [-a * b, ''])} = ${rs}`, `${poly([1, X2('x')], [a - b, 'x'], [-a * b, ''])} = ${rs}   | − x²`,
      `${poly([a - b, 'x'], [-a * b, ''])} = ${fmt(c)}   | + ${a * b}`, `${poly([a - b, 'x'])} = ${fmt(c + a * b)}   | : ${a - b}`, `x = ${x0}`] };
}
function m7a() {
  const a = R(3, 9), ok = rand() < .35, b = ok ? 2 * a : pick([a, a + 1, 2 * a + 2, 2 * a - 2, a * a].filter(z => z !== 2 * a && z > 0));
  const term = `x² + ${b}x + ${a * a}`;
  const R0 = ok ? `Ja: x² = x · x, ${a * a} = ${a} · ${a} und 2 · x · ${a} = ${2 * a}x passt → (x + ${a})²` : `Nein: Das Mittelstück müsste 2 · x · ${a} = ${2 * a}x sein, es steht aber ${b}x da.`;
  const opts = shuffle([R0, ok ? `Nein: Das Mittelstück müsste ${a}x sein.` : `Ja: x² und ${a * a} sind Quadrate → (x + ${a})²`,
    ok ? `Nein: ${a * a} ist kein Quadrat.` : `Ja: Man kann immer faktorisieren, wenn vorne x² steht.`, `Nein: Es gibt kein Minus in der Mitte.`]);
  return { title: 'Begründen', q: `Lässt sich <b>${term}</b> mit einer binomischen Formel faktorisieren? Wähle die richtige Begründung.`, type: 'mc', options: opts, ans: R0,
    hint: 'Lies die Seiten der beiden Quadrate ab. Prüfe dann: Ist das Mittelstück genau 2 · Seite · Seite?',
    sol: ['x² = x · x', `${a * a} = ${a} · ${a}`, `Mittelstück müsste 2 · x · ${a} = ${2 * a}x sein.`, `Im Term steht ${b}x.`, ok ? `Passt → (x + ${a})²` : 'Passt nicht → Nein.'] };
}
function m7b() {
  const a = R(2, 9), name = pick(['Ben', 'Nina', 'Noah', 'Emma']);
  const R0 = `Das Mittelstück −${2 * a}x fehlt (und es heißt +${a * a}): (x − ${a})² = x² − ${2 * a}x + ${a * a}.`;
  const opts = shuffle([R0, `Nur das Vorzeichen ist falsch: Es heißt x² + ${a * a}.`, `Es ist richtig, denn (x − ${a})² = (x + ${a}) · (x − ${a}).`, `${name} hätte x² − ${2 * a} rechnen müssen.`]);
  return { title: 'Fehler erklären', q: `${name} rechnet: <b>(x − ${a})² = x² − ${a * a}</b>. Was ist der Fehler?`, type: 'mc', options: opts, ans: R0,
    hint: `(x − ${a})² heißt (x − ${a}) · (x − ${a}). Rechne mit der 2. Formel nach.`,
    sol: [`(x − ${a})² = (x − ${a}) · (x − ${a})`, `= x² − 2 · x · ${a} + ${a}²`, `= x² − ${2 * a}x + ${a * a}`, `${name} hat das Mittelstück −${2 * a}x vergessen.`] };
}
function br8b() {   // a/x + 1/(2x) = n/d
  let a, x0; do { a = R(2, 6); x0 = R(2, 6); } while (false);
  let n = 2 * a + 1, d = 2 * x0; const g = ggT(n, d); n /= g; d /= g;
  if (d < 3 || d % 2) return br8b();
  const L = d;   // d ist gerade → gemeinsamer Nenner d · x
  return { title: 'Bruchgleichung', q: `Löse die Gleichung.${big(`${F(a, 'x')} + ${F(1, '2x')} = ${F(n, d)}`)}`, type: 'num', ans: x0, pre: 'x =', nenner: ['x', '2x', String(d)],
    hint: `x darf nicht 0 sein. Die Nenner sind x, 2x und ${d}. Der gemeinsame Nenner ist ${L}x. Nimm jeden Bruch mal ${L}x und kürze.`,
    sol: [`Gemeinsamer Nenner: ${L}x`, `${F(a, 'x')} · ${L}x + ${F(1, '2x')} · ${L}x = ${F(n, d)} · ${L}x`, `${a * L} + ${L / 2} = ${n * L / d}x`, `${a * L + L / 2} = ${n * L / d}x   | : ${n * L / d}`, `x = ${x0}`] };
}
function br11() {   // a/x + b = c/(2x), Lösung negativ
  let a, b, x0, c;
  do { a = R(2, 7); b = R(1, 4); x0 = -pick([0.5, 1, 1.5, 2, 2.5]); c = 2 * a + 2 * b * x0; } while (c < 1 || !Number.isInteger(c));
  return { title: 'Bruchgleichung', q: `Löse die Gleichung.${big(`${F(a, 'x')} + ${b} = ${F(c, '2x')}`)}`, type: 'num', ans: x0, pre: 'x =', nenner: ['x', '2x'],
    hint: 'x darf nicht 0 sein. Der gemeinsame Nenner ist 2x. Nimm jeden Teil mal 2x – auch die Zahl ohne Bruch. Die Lösung darf negativ sein.',
    sol: ['Gemeinsamer Nenner: 2x', `${F(a, 'x')} · 2x + ${b} · 2x = ${F(c, '2x')} · 2x`, `${2 * a} + ${2 * b}x = ${c}   | − ${2 * a}`, `${2 * b}x = ${fmt(c - 2 * a)}   | : ${2 * b}`, `x = ${fmt(x0)}`] };
}
function erg10a() {
  let k, a; do { k = R(2, 3); a = R(1, 7); } while (ggT(k, a) !== 1);
  const s = sgn(), kv = `${k}x`, op = s > 0 ? '+' : MI;
  const ans = `(${kv} ${op} ${a})<sup>2</sup>`;
  return termTask({ title: 'Lücken ergänzen', q: `Ergänze die Lücken.${big(`${k * k}x<sup>2</sup> ${op} ${2 * k * a}x + □ = (□ ${op} □)<sup>2</sup>`)}<p class="muted" style="font-size:1rem">Tippe die fertige Klammer ein, z. B. (2x+7)².</p>`,
    form: 'binom', vars: ['x'], ansHtml: ans,
    hint: `Erstes Kästchen: Was mal sich selbst ergibt ${k * k}x²? Zweites Kästchen: Mittelstück geteilt durch (2 · erstes Kästchen). Die Zahl vorne: zweites Kästchen mal sich selbst.`,
    sol: [`${k * k}x² = (${kv})²`, `→ erstes Kästchen: ${kv}`, `${2 * k * a}x : (2 · ${kv}) = ${a}`, `→ zweites Kästchen: ${a}`, `${a}² = ${a * a}`, `${k * k}x² ${op} ${2 * k * a}x + ${a * a} = ${ans}`] });
}
function fak10b() {
  let k, l; do { k = R(2, 5); l = R(2, 5); } while (ggT(k, l) !== 1);
  const s = sgn(), op = s > 0 ? '+' : MI, ans = `(${k}x ${op} ${l}y)<sup>2</sup>`;
  return termTask({ title: 'Faktorisieren', q: `Faktorisiere mit einer binomischen Formel.${big(`${k * k}x<sup>2</sup> ${op} ${2 * k * l}xy + ${l * l}y<sup>2</sup>`)}`, form: 'binom', vars: ['x', 'y'], ansHtml: ans,
    hint: 'Was mal sich selbst ergibt den ersten Teil (mit x)? Was mal sich selbst ergibt den letzten Teil (mit y)? Prüfe dann das Mittelstück: 2 · erstes · zweites.',
    sol: [`${k * k}x² = (${k}x)²`, `${l * l}y² = (${l}y)²`, `Mittelstück: 2 · ${k}x · ${l}y = ${2 * k * l}xy ✓`, `= ${ans}`] });
}
function minus9() { let t, n = 0; do { t = G.minusBinom(); } while (/· \(/.test(t.q) && ++n < 30); return t; }
const ERSATZ = {
  '1a': () => G.ausmultZahl(), '1b': () => G.ausklVar(), '2': () => G.summen2(), '3a': () => G.faktor12(), '3b': () => G.faktor3k(),
  '4a': () => G.binom1(), '4b': () => G.binom3(), '4c': () => G.binom2k(), '4d': () => G.kopf1(), '5': () => G.gleichungBinom(), '6': gl6,
  '7a': m7a, '7b': m7b, '8a': () => G.bruchX(), '8b': br8b, '9': minus9, '10a': erg10a, '10b': fak10b, '11': br11
};
function ersatz(key) { const t = ERSATZ[key](); if (!t.grafik && t.nenner) t.grafik = korbGrafik(t.nenner);
  t.hint = t.hint.replace(/gleiche Glieder/g, 'gleiche Sorten').replace(/Glieder/g, 'Teile').replace(/einen möglichst großen Faktor/g, 'so viel wie möglich');   // einfache Sprache (Malte 19.11.)
  return t; }

/* ===== Oberfläche ===== */
let S = { g: st.g || null, key: null, step: 0, sel: new Set(), t: null, tries: 0, done: false, a: {} };
function inputHtml(t) {
  if (t.type === 'num') return `<div class="answer">${t.pre ? `<span>${t.pre}</span>` : ''}<input id="a1" inputmode="decimal" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Antwort">${t.post ? `<span>${t.post}</span>` : ''}</div>`;
  if (t.type === 'term') {
    const keys = [...(t.vars || ['x']), '²', '(', ')', '+', '−', '·'];
    return `<div class="answer term"><input id="a1" class="termin" inputmode="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Dein Term" placeholder="Term eintippen"></div>
      <div class="keys">${keys.map(k => `<button type="button" class="key" data-ins="${k}">${k}</button>`).join('')}<button type="button" class="key del" data-ins="⌫" aria-label="Löschen">⌫</button></div><div class="tprev"></div>`;
  }
  return `<div class="mc mcl">${t.options.map((o, k) => `<button class="opt" data-k="${k}">${o}</button>`).join('')}</div>`;
}
function wireTerm(root) {
  const inp = root.querySelector('.termin'), pv = root.querySelector('.tprev'); if (!inp) return;
  const prev = () => { const r = termParse(inp.value);
    pv.innerHTML = r.empty ? '<small class="muted"><b>Tippe nur das Ergebnis ein</b> – den Rechenweg schreibst du ins Heft. Statt ² geht auch x2.</small>'
      : r.error ? '<small class="err">⚠ Das kann ich noch nicht lesen – fehlt eine Klammer oder ein Rechenzeichen?</small>'
      : `<small class="muted">So lese ich deine Eingabe:</small> <span class="prevterm">${termHtml(inp.value)}</span>`; };
  root.querySelectorAll('.key').forEach(b => { b.addEventListener('pointerdown', e => e.preventDefault()); b.addEventListener('click', () => {
    if (inp.disabled) return; const k = b.dataset.ins, s0 = inp.selectionStart ?? inp.value.length, s1 = inp.selectionEnd ?? s0;
    if (k === '⌫') { const from = s0 === s1 ? Math.max(0, s0 - 1) : s0; inp.value = inp.value.slice(0, from) + inp.value.slice(s1); inp.setSelectionRange(from, from); }
    else { inp.value = inp.value.slice(0, s0) + k + inp.value.slice(s1); inp.setSelectionRange(s0 + k.length, s0 + k.length); }
    inp.focus({ preventScroll: true }); prev(); }); });
  inp.addEventListener('input', prev); prev();
}
function doneBar() {
  const d = (st.done || []).filter(x => x.g === S.g);
  $('doneBar').innerHTML = d.length ? `<b>Berichtigt:</b> ${d.map(x => `<span class="dchip">✓ ${x.k}</span>`).join(' ')}` : '';
}
function renderStart() {
  $('grp').querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.g === S.g));
  $('auf').classList.toggle('hidden', !S.g);
  $('auf').querySelector('.tasks').innerHTML = KEYS.map(k => `<button data-k="${k}" class="${(st.done || []).some(x => x.g === S.g && x.k === k) ? 'erledigt' : ''}">${k}</button>`).join('');
  $('auf').querySelectorAll('.tasks button').forEach(b => b.onclick = () => openTask(b.dataset.k));
  doneBar();
}
$('grp').querySelectorAll('button').forEach(b => b.onclick = () => { S.g = b.dataset.g; st.g = S.g; save(); $('work').innerHTML = ''; renderStart(); });

function openTask(key) {
  S.key = key; S.step = 0; S.sel = new Set(); S.t = null;
  const [q, steps] = ORIG[S.g][key];
  $('work').innerHTML = `<div class="card">
    <div class="qtitle">Gruppe ${S.g} · Aufgabe ${key}</div><div class="q">${q}</div>
    <h2>① So wird die Aufgabe gerechnet</h2>
    <ol class="steps" id="steps"></ol>
    <div class="btns"><button class="primary" id="nextStep">Nächster Schritt ▸</button><button id="allSteps">Alle Schritte zeigen</button></div>
  </div>
  <div class="card" id="c2"><h2>② Welcher Fehler ist dir passiert?</h2><p class="muted" style="margin:.2rem 0 .5rem">Vergleiche mit deiner Klassenarbeit. Kreuze an, was passt (auch mehreres).</p>
    <div class="fehler">${FEHLER[key].map((e, i) => { const x = gx(e.x, S.g); return `<label class="fopt"><input type="checkbox" data-i="${i}"><span>${e.k}${x ? `<span class="bsp">So sah es oft aus: ${x} <b class="nein">✗</b></span>` : ''}</span></label>`; }).join('')}</div>
    <div id="heft"></div></div>
  <div class="card hidden" id="c3"></div>`;
  const ol = $('steps');
  const showStep = () => { ol.innerHTML = steps.slice(0, S.step).map(([z, e]) => `<li><div class="z">${z}</div>${e ? `<div class="e">${e}</div>` : ''}</li>`).join('');
    $('nextStep').disabled = S.step >= steps.length; $('allSteps').disabled = S.step >= steps.length; };
  $('nextStep').onclick = () => { S.step++; showStep(); };
  $('allSteps').onclick = () => { S.step = steps.length; showStep(); };
  S.step = 1; showStep();
  $('c2').querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? S.sel.add(+c.dataset.i) : S.sel.delete(+c.dataset.i); renderHeft(); });
  renderHeft();
  $('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function renderHeft() {
  const sel = [...S.sel].sort((a, b) => a - b).map(i => FEHLER[S.key][i]);
  if (!sel.length) { $('heft').innerHTML = ''; $('c3').classList.add('hidden'); return; }
  $('heft').innerHTML = `<div class="heft"><div class="hk">✎ Schreib das in dein Heft:</div>
    <div class="hl"><b>Berichtigung Aufgabe ${S.key}</b></div>
    ${sel.map(e => { const y = gx(e.y, S.g); const ys = y == null ? [] : Array.isArray(y) ? y : [y];
      return `<div class="hl">Mein Fehler: ${e.f}</div><div class="hl">Richtig: ${e.r}</div>${ys.length ? `<div class="hl">Beispiel:</div>${ys.map(z => `<div class="hl hy">${z}</div>`).join('')}` : ''}`; }).join('<div class="hsep"></div>')}
    <div class="hl">Ersatzaufgabe:</div></div>
    <div class="btns"><button class="primary" id="toErs">Ich habe es ins Heft geschrieben → Ersatzaufgabe</button></div>`;
  $('toErs').onclick = () => { if (!S.t) newErsatz(); else $('c3').scrollIntoView({ behavior: 'smooth' }); };
}
function newErsatz() {
  S.t = ersatz(S.key); S.tries = 0; S.done = false; S.a = {};
  const t = S.t;
  $('c3').classList.remove('hidden');
  $('c3').innerHTML = `<h2>③ Ersatzaufgabe</h2>
    <p class="muted" style="margin:.2rem 0 .6rem"><b>Schreib die Aufgabe ins Heft und löse sie darunter – mit Rechenweg.</b> Dann gib dein Ergebnis hier ein.</p>
    <div class="q">${t.q}</div>${inputHtml(t)}
    <div class="btns"><button class="primary" id="eCheck">Prüfen ✓</button><button id="eHint">💡 Tipp</button></div><div id="fb"></div>`;
  wireTerm($('c3'));
  if (t.type === 'mc') $('c3').querySelectorAll('.opt').forEach(b => b.onclick = () => { if (S.done) return; S.a = { k: +b.dataset.k }; $('c3').querySelectorAll('.opt').forEach(x => x.classList.toggle('sel', x === b)); });
  const inp = $('c3').querySelector('#a1'); if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  $('eCheck').onclick = check;
  $('eHint').onclick = () => { if (!S.done) { $('fb').innerHTML = `<div class="fb hint">💡 ${t.hint}${t.grafik || ''}</div>`; zeichneBoegen($('fb')); } };
  $('c3').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function check() {
  if (S.done) return;
  const t = S.t; if (t.type !== 'mc') S.a = { a1: $('c3').querySelector('#a1').value };
  if (t.type === 'term' && termParse(S.a.a1 || '').error) { $('fb').innerHTML = '<div class="fb warn">Das kann ich noch nicht lesen. Fehlt eine Klammer oder ein Rechenzeichen?</div>'; return; }
  const g = grade(t, S.a);
  if (g === -1) { $('fb').innerHTML = `<div class="fb warn">${t.type === 'mc' ? 'Bitte tippe zuerst eine Antwort an.' : 'Bitte trage zuerst dein Ergebnis ein.'}</div>`; return; }
  const sol = `<ol class="sol">${t.sol.map(s => `<li>${s}</li>`).join('')}</ol>`;
  if (g === 1) { $('fb').innerHTML = `<div class="fb hint">Fast! ${HALF_TIP[t.form] || ''} Verbessere noch.</div>`; return; }
  if (g === 2) {
    S.done = true;
    st.done = (st.done || []).filter(x => !(x.g === S.g && x.k === S.key)); st.done.push({ g: S.g, k: S.key, z: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }); save();
    $('fb').innerHTML = `<div class="fb ok big2">✅ Richtig! Aufgabe ${S.key} ist berichtigt.</div><div class="fb ok">So sieht der Rechenweg aus – vergleiche mit deinem Heft:${sol}</div>
      <div class="btns"><button class="primary" id="nextTask">Nächste Aufgabe berichtigen</button></div>`;
    $('c3').querySelectorAll('input,.opt,.key,#eCheck,#eHint').forEach(x => x.disabled = true);
    $('nextTask').onclick = () => { $('work').innerHTML = ''; renderStart(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    doneBar(); renderStart(); return;
  }
  S.tries++;
  if (S.tries === 1) {
    if (t.type === 'mc') $('c3').querySelectorAll('.opt').forEach(b => { if (+b.dataset.k === S.a.k) b.disabled = true; b.classList.remove('sel'); });
    $('fb').innerHTML = `<div class="fb bad">Leider falsch. Schau dir den Tipp an, prüfe deinen Rechenweg im Heft und versuche es noch einmal.</div><div class="fb hint">💡 ${t.hint}${t.grafik || ''}</div>`;
    zeichneBoegen($('fb')); return;
  }
  S.done = true;
  $('fb').innerHTML = `<div class="fb bad">Leider wieder falsch. Richtig ist: <b>${correctText(t)}</b>${sol}</div>
    <p><b>Schreib den richtigen Rechenweg ins Heft. Dann löse eine neue Ersatzaufgabe – erst wenn eine richtig ist, ist die Aufgabe berichtigt.</b></p>
    <div class="btns"><button class="primary" id="again">Neue Ersatzaufgabe</button></div>`;
  $('c3').querySelectorAll('input,.opt,.key,#eCheck,#eHint').forEach(x => x.disabled = true);
  $('again').onclick = newErsatz;
}
renderStart();
