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
      ['8a² = 4a · 2a   und   12a = 4a · 3', 'Größte gemeinsame Zahl von 8 und 12 ist 4 – und in beiden Teilen steckt ein a. Also 4a.'],
      ['= 4a · (2a − 3)', '4a kommt vor die Klammer, der Rest in die Klammer.'],
      ['Probe: 4a · 2a − 4a · 3 = 8a² − 12a ✓', 'Rechne die Klammer wieder aus – kommt die Aufgabe heraus?']]],
    '2': ['Multipliziere aus und fasse zusammen: (2a − 3) · (a + 5)', [
      ['= 2a · a + 2a · 5 + (−3) · a + (−3) · 5', 'Vier Bögen: <b>jeder</b> Teil der ersten Klammer mal <b>jeder</b> Teil der zweiten.'],
      ['= 2a² + 10a − 3a − 15', 'Die vier Produkte – Vorzeichen mitnehmen: (−3) · 5 = −15.'],
      ['= 2a² + 7a − 15', 'Gleichartige Glieder zusammenfassen: 10a − 3a = 7a. a² und a sind <b>nicht</b> gleichartig.']]],
    '3a': ['Faktorisiere mit einer binomischen Formel: x² + 8x + 16', [
      ['x² = x · x   und   16 = 4 · 4', 'Suche die zwei Quadrate und lies ihre Seiten ab: x und 4.'],
      ['Mittelstück: 2 · x · 4 = 8x ✓', 'Passt das Mittelstück? Ja. Plus in der Mitte → 1. Formel.'],
      ['= (x + 4)²', 'Das ² an der Klammer nicht vergessen.']]],
    '3b': ['Faktorisiere mit einer binomischen Formel: 4x² − 81', [
      ['4x² = (2x)²   und   81 = 9²', 'Zwei Quadrate, dazwischen ein Minus, kein Mittelstück → 3. Formel.'],
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
      ['6x = 24   | : 6', 'Gegenoperation: + 9 wird mit − 9 weggemacht – auf beiden Seiten.'],
      ['x = 4', 'Probe: (4 + 3)² = 49 und 4² + 33 = 49 ✓']]],
    '6': ['Löse die Gleichung: (x + 5) · (x − 2) = x² + 11', [
      ['x² − 2x + 5x − 10 = x² + 11', 'Vier Produkte: x · x, x · (−2), 5 · x, 5 · (−2). Rechte Seite mitschreiben!'],
      ['x² + 3x − 10 = x² + 11   | − x²', 'Zusammenfassen: −2x + 5x = 3x.'],
      ['3x − 10 = 11   | + 10', '− 10 wird mit + 10 weggemacht.'],
      ['3x = 21   | : 3', ''],
      ['x = 7', 'Probe: (7 + 5) · (7 − 2) = 60 und 7² + 11 = 60 ✓']]],
    '7a': ['Lässt sich x² + 14x + 36 mit einer binomischen Formel faktorisieren? Begründe.', [
      ['x² = x · x   und   36 = 6 · 6', 'Seiten der beiden Quadrate: x und 6.'],
      ['Das Mittelstück müsste 2 · x · 6 = 12x sein.', 'Jetzt prüfen: Passt das Mittelstück?'],
      ['Im Term steht aber 14x. → Nein.', 'Zwei Quadrate allein reichen nicht – das Mittelstück muss passen.']]],
    '7b': ['Tom rechnet: (x − 3)² = x² − 9. Erkläre seinen Fehler.', [
      ['(x − 3)² = (x − 3) · (x − 3)', 'Das Quadrat heißt: die Klammer mal sich selbst – nicht (x − 3) · (x + 3).'],
      ['= x² − 6x + 9', '2. Formel: Mittelstück 2 · x · 3 = 6x mit Minus, und (−3)² = +9.'],
      ['Tom hat das Mittelstück −6x vergessen (und es heißt +9).', 'So schreibt man die Erklärung.']]],
    '8a': [`Löse die Gleichung: ${F(12, 'x')} + 1 = 4`, [
      D0,
      [`${F(12, 'x')} + 1 = 4   | · x`, 'Der gemeinsame Nenner ist x. <b>Jeder</b> Teil wird mal x genommen – auch die 1 und die 4!'],
      ['12 + x = 4x   | − x', `${F(12, 'x')} · x = 12 – das x kürzt sich weg.`],
      ['12 = 3x   | : 3', ''],
      ['x = 4', `Probe: ${F(12, 4)} + 1 = 3 + 1 = 4 ✓`]]],
    '8b': [`Löse die Gleichung: ${F(3, 'x')} + ${F(1, '2x')} = ${F(7, 8)}`, [
      D0,
      ['Nenner x, 2x und 8 → gemeinsamer Nenner 8x', 'Die kleinste Zahl mit x, in der x, 2x und 8 stecken.'],
      [`${F(3, 'x')} · 8x + ${F(1, '2x')} · 8x = ${F(7, 8)} · 8x`, '<b>Jeden</b> Bruch mal 8x – auf beiden Seiten.'],
      ['24 + 4 = 7x', '3 · 8 = 24;   8x : 2x = 4;   8x : 8 = x, mal 7 = 7x.'],
      ['28 = 7x   | : 7', ''],
      ['x = 4', `Probe: ${F(3, 4)} + ${F(1, 8)} = ${F(6, 8)} + ${F(1, 8)} = ${F(7, 8)} ✓`]]],
    '9': ['Vereinfache so weit wie möglich: x² − (x − 4)²', [
      ['= x² − (x² − 8x + 16)', 'Zuerst das Binom (2. Formel) – und das Ergebnis <b>in Klammern</b> schreiben!'],
      ['= x² − x² + 8x − 16', 'Das Minus vor der Klammer dreht <b>jedes</b> Vorzeichen in der Klammer um.'],
      ['= 8x − 16', 'x² − x² = 0.']]],
    '10a': ['Ergänze die Lücken: 4x² + 28x + □ = (□ + □)²', [
      ['4x² = (2x)²  →  1. Kästchen: 2x', 'Der erste Term ist die Seite des ersten Quadrats.'],
      ['28x : (2 · 2x) = 7  →  2. Kästchen: 7', 'Mittelstück = 2 · 1. Term · 2. Term. Rückwärts: teilen.'],
      ['7² = 49  →  erstes Kästchen: 49', 'Das letzte Glied ist das Quadrat des 2. Terms.'],
      ['4x² + 28x + 49 = (2x + 7)²', '']]],
    '10b': ['Faktorisiere: 9x² − 30xy + 25y²', [
      ['9x² = (3x)²   und   25y² = (5y)²', 'Seiten der beiden Quadrate: 3x und 5y.'],
      ['Mittelstück: 2 · 3x · 5y = 30xy ✓', 'Es passt. Minus in der Mitte → 2. Formel.'],
      ['= (3x − 5y)²', '']]],
    '11': [`Löse die Gleichung: ${F(4, 'x')} + 3 = ${F(5, '2x')}`, [
      D0,
      [`${F(4, 'x')} + 3 = ${F(5, '2x')}   | · 2x`, 'Gemeinsamer Nenner von x und 2x ist 2x. Alles mal 2x – <b>auch die 3</b>.'],
      ['8 + 6x = 5   | − 8', `${F(4, 'x')} · 2x = 8;   3 · 2x = 6x;   ${F(5, '2x')} · 2x = 5.`],
      ['6x = −3   | : 6', ''],
      ['x = −0,5', 'Eine Lösung darf negativ sein. Probe: 4 : (−0,5) + 3 = −5 und 5 : (−1) = −5 ✓']]]
  },
  B: {
    '1a': ['Multipliziere aus: −4 · (3a − 2)', [
      ['= (−4) · 3a + (−4) · (−2)', 'Die −4 wird mit <b>jedem</b> Teil der Klammer multipliziert. Das Minus gehört zur Zahl dahinter.'],
      ['= −12a + 8', 'Minus mal Minus gibt Plus: (−4) · (−2) = +8.']]],
    '1b': ['Klammere einen möglichst großen Faktor aus: 9a² − 15a', [
      ['9a² = 3a · 3a   und   15a = 3a · 5', 'Größte gemeinsame Zahl von 9 und 15 ist 3 – und in beiden Teilen steckt ein a. Also 3a.'],
      ['= 3a · (3a − 5)', '3a kommt vor die Klammer, der Rest in die Klammer.'],
      ['Probe: 3a · 3a − 3a · 5 = 9a² − 15a ✓', 'Rechne die Klammer wieder aus – kommt die Aufgabe heraus?']]],
    '2': ['Multipliziere aus und fasse zusammen: (3a − 2) · (a + 4)', [
      ['= 3a · a + 3a · 4 + (−2) · a + (−2) · 4', 'Vier Bögen: <b>jeder</b> Teil der ersten Klammer mal <b>jeder</b> Teil der zweiten.'],
      ['= 3a² + 12a − 2a − 8', 'Die vier Produkte – Vorzeichen mitnehmen: (−2) · 4 = −8.'],
      ['= 3a² + 10a − 8', 'Gleichartige Glieder zusammenfassen: 12a − 2a = 10a. a² und a sind <b>nicht</b> gleichartig.']]],
    '3a': ['Faktorisiere mit einer binomischen Formel: x² + 10x + 25', [
      ['x² = x · x   und   25 = 5 · 5', 'Suche die zwei Quadrate und lies ihre Seiten ab: x und 5.'],
      ['Mittelstück: 2 · x · 5 = 10x ✓', 'Passt das Mittelstück? Ja. Plus in der Mitte → 1. Formel.'],
      ['= (x + 5)²', 'Das ² an der Klammer nicht vergessen.']]],
    '3b': ['Faktorisiere mit einer binomischen Formel: 9x² − 25', [
      ['9x² = (3x)²   und   25 = 5²', 'Zwei Quadrate, dazwischen ein Minus, kein Mittelstück → 3. Formel.'],
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
      ['4x = 24   | : 4', 'Gegenoperation: + 4 wird mit − 4 weggemacht – auf beiden Seiten.'],
      ['x = 6', 'Probe: (6 + 2)² = 64 und 6² + 28 = 64 ✓']]],
    '6': ['Löse die Gleichung: (x + 6) · (x − 2) = x² + 8', [
      ['x² − 2x + 6x − 12 = x² + 8', 'Vier Produkte: x · x, x · (−2), 6 · x, 6 · (−2). Rechte Seite mitschreiben!'],
      ['x² + 4x − 12 = x² + 8   | − x²', 'Zusammenfassen: −2x + 6x = 4x.'],
      ['4x − 12 = 8   | + 12', '− 12 wird mit + 12 weggemacht.'],
      ['4x = 20   | : 4', ''],
      ['x = 5', 'Probe: (5 + 6) · (5 − 2) = 33 und 5² + 8 = 33 ✓']]],
    '7a': ['Lässt sich x² + 12x + 25 mit einer binomischen Formel faktorisieren? Begründe.', [
      ['x² = x · x   und   25 = 5 · 5', 'Seiten der beiden Quadrate: x und 5.'],
      ['Das Mittelstück müsste 2 · x · 5 = 10x sein.', 'Jetzt prüfen: Passt das Mittelstück?'],
      ['Im Term steht aber 12x. → Nein.', 'Zwei Quadrate allein reichen nicht – das Mittelstück muss passen.']]],
    '7b': ['Lena rechnet: (x − 6)² = x² − 36. Erkläre ihren Fehler.', [
      ['(x − 6)² = (x − 6) · (x − 6)', 'Das Quadrat heißt: die Klammer mal sich selbst – nicht (x − 6) · (x + 6).'],
      ['= x² − 12x + 36', '2. Formel: Mittelstück 2 · x · 6 = 12x mit Minus, und (−6)² = +36.'],
      ['Lena hat das Mittelstück −12x vergessen (und es heißt +36).', 'So schreibt man die Erklärung.']]],
    '8a': [`Löse die Gleichung: ${F(18, 'x')} + 2 = 5`, [
      D0,
      [`${F(18, 'x')} + 2 = 5   | · x`, 'Der gemeinsame Nenner ist x. <b>Jeder</b> Teil wird mal x genommen – auch die 2 und die 5!'],
      ['18 + 2x = 5x   | − 2x', `${F(18, 'x')} · x = 18 – das x kürzt sich weg.`],
      ['18 = 3x   | : 3', ''],
      ['x = 6', `Probe: ${F(18, 6)} + 2 = 3 + 2 = 5 ✓`]]],
    '8b': [`Löse die Gleichung: ${F(5, 'x')} + ${F(1, '2x')} = ${F(11, 6)}`, [
      D0,
      ['Nenner x, 2x und 6 → gemeinsamer Nenner 6x', 'Die kleinste Zahl mit x, in der x, 2x und 6 stecken.'],
      [`${F(5, 'x')} · 6x + ${F(1, '2x')} · 6x = ${F(11, 6)} · 6x`, '<b>Jeden</b> Bruch mal 6x – auf beiden Seiten.'],
      ['30 + 3 = 11x', '5 · 6 = 30;   6x : 2x = 3;   6x : 6 = x, mal 11 = 11x.'],
      ['33 = 11x   | : 11', ''],
      ['x = 3', `Probe: ${F(5, 3)} + ${F(1, 6)} = ${F(10, 6)} + ${F(1, 6)} = ${F(11, 6)} ✓`]]],
    '9': ['Vereinfache so weit wie möglich: x² − (x − 5)²', [
      ['= x² − (x² − 10x + 25)', 'Zuerst das Binom (2. Formel) – und das Ergebnis <b>in Klammern</b> schreiben!'],
      ['= x² − x² + 10x − 25', 'Das Minus vor der Klammer dreht <b>jedes</b> Vorzeichen in der Klammer um.'],
      ['= 10x − 25', 'x² − x² = 0.']]],
    '10a': ['Ergänze die Lücken: 9x² − 24x + □ = (□ − □)²', [
      ['9x² = (3x)²  →  1. Kästchen: 3x', 'Der erste Term ist die Seite des ersten Quadrats.'],
      ['24x : (2 · 3x) = 4  →  2. Kästchen: 4', 'Mittelstück = 2 · 1. Term · 2. Term. Rückwärts: teilen.'],
      ['4² = 16  →  erstes Kästchen: 16', 'Das letzte Glied ist das Quadrat des 2. Terms.'],
      ['9x² − 24x + 16 = (3x − 4)²', '']]],
    '10b': ['Faktorisiere: 9x² − 12xy + 4y²', [
      ['9x² = (3x)²   und   4y² = (2y)²', 'Seiten der beiden Quadrate: 3x und 2y.'],
      ['Mittelstück: 2 · 3x · 2y = 12xy ✓', 'Es passt. Minus in der Mitte → 2. Formel.'],
      ['= (3x − 2y)²', '']]],
    '11': [`Löse die Gleichung: ${F(5, 'x')} + 3 = ${F(1, '2x')}`, [
      D0,
      [`${F(5, 'x')} + 3 = ${F(1, '2x')}   | · 2x`, 'Gemeinsamer Nenner von x und 2x ist 2x. Alles mal 2x – <b>auch die 3</b>.'],
      ['10 + 6x = 1   | − 10', `${F(5, 'x')} · 2x = 10;   3 · 2x = 6x;   ${F(1, '2x')} · 2x = 1.`],
      ['6x = −9   | : 6', ''],
      ['x = −1,5', `Eine Lösung darf negativ sein. Probe: 5 : (−1,5) + 3 = −${F(1, 3)} und 1 : (−3) = −${F(1, 3)} ✓`]]]
  }
};

/* ===== ② Typische Fehler zum Ankreuzen (aus der Korrektur der Klasse) – f = mein Fehler, r = so geht es richtig ===== */
const FL = { f: 'Ich habe mich verrechnet oder etwas falsch abgeschrieben.', r: 'Ich rechne langsamer und mache am Ende die Probe.', k: 'Flüchtigkeitsfehler (verrechnet, falsch abgeschrieben)' };
const LEER = { f: 'Ich habe die Aufgabe nicht bearbeitet.', r: 'Ich lerne den Lösungsweg mit der Ersatzaufgabe.', k: 'Ich habe die Aufgabe nicht bearbeitet' };
const VZ = { k: 'Vorzeichenfehler: Minus mal Minus', f: 'Ich habe Minus mal Minus nicht als Plus gerechnet.', r: 'Minus mal Minus gibt Plus, Plus mal Minus gibt Minus.' };
const BINOM = [
  { k: 'Das Mittelstück fehlt', f: 'Ich habe das Mittelstück vergessen.', r: '(a + b)² = a² + 2ab + b² – das Mittelstück 2ab gehört immer dazu.' },
  { k: 'Mittelstück nicht verdoppelt (nur a · b statt 2 · a · b)', f: 'Ich habe beim Mittelstück das „2 ·“ vergessen.', r: 'Das Mittelstück ist 2 · a · b.' },
  { k: '(3x)² bzw. (2x)² falsch gerechnet', f: 'Ich habe die Zahl vor dem x nicht mit quadriert.', r: '(3x)² = 3x · 3x = 9x² – die Zahl wird auch quadriert.' },
  { k: '(a − b)² mit (a + b) · (a − b) verwechselt', f: 'Ich habe die 2. und die 3. binomische Formel verwechselt.', r: '(a − b)² = (a − b) · (a − b), dabei gibt es ein Mittelstück. Nur (a + b) · (a − b) hat keins.' },
  VZ];
const BRUCH = [
  { k: 'D falsch: Die Lösung oder eine andere Zahl eingetragen', f: 'Ich habe in D die falsche Zahl eingetragen.', r: 'In D steht die Zahl, die x nicht sein darf: 0, weil man nicht durch 0 teilen darf.' },
  { k: 'Gemeinsamen Nenner (Hauptnenner) nicht gefunden', f: 'Ich habe den gemeinsamen Nenner nicht gefunden.', r: 'Der gemeinsame Nenner ist der kleinste Term, in dem alle Nenner stecken (z. B. x, 2x und 8 → 8x).' },
  { k: 'Nicht alle Teile mit dem Nenner multipliziert (auch die Zahl ohne Bruch!)', f: 'Ich habe nicht jeden Teil der Gleichung mit dem Nenner multipliziert.', r: 'Jeder Teil der Gleichung wird mit dem gemeinsamen Nenner multipliziert – auch die Zahl ohne Bruch.' },
  { k: 'Nur eine Seite der Gleichung multipliziert', f: 'Ich habe nur eine Seite der Gleichung multipliziert.', r: 'Was ich auf der einen Seite mache, mache ich auch auf der anderen Seite.' },
  { k: 'Falsch gekürzt (z. B. 12/x · x = 12x statt 12)', f: 'Ich habe beim Malnehmen falsch gekürzt.', r: 'Bruch mal Nenner: Das x kürzt sich weg, z. B. 12/x · x = 12.' },
  { k: 'Bruch falsch gelesen (12/x als 12 · x oder x : 12)', f: 'Ich habe den Bruch falsch gelesen.', r: '12/x heißt 12 geteilt durch x.' },
  { k: 'Beim Umformen die falsche Gegenoperation genommen', f: 'Ich habe beim Umformen die falsche Gegenoperation genommen.', r: '+ wird mit −, · wird mit : weggemacht – auf beiden Seiten.' },
  { k: 'Durch Probieren gelöst statt umgeformt', f: 'Ich habe nur probiert.', r: 'Ich forme mit dem gemeinsamen Nenner um, bis x allein steht.' }];
const GLEICH = [
  { k: 'Die rechte Seite der Gleichung weggelassen', f: 'Ich habe die rechte Seite der Gleichung weggelassen.', r: 'Eine Gleichung schreibe ich immer ganz: linke Seite = rechte Seite – in jeder Zeile.' },
  { k: 'Falsche Gegenoperation (z. B. − 10 mit − 10 weggemacht)', f: 'Ich habe die falsche Gegenoperation genommen.', r: 'Die Gegenoperation von − 10 ist + 10, von · 3 ist : 3 – immer auf beiden Seiten.' },
  { k: 'Nicht bis zum Ende gelöst (x steht nicht allein)', f: 'Ich habe die Gleichung nicht bis zum Ende gelöst.', r: 'Ich forme so lange um, bis x = … dasteht, und mache dann die Probe.' },
  { k: 'Beim Teilen verrechnet oder falsch herum geteilt', f: 'Ich habe beim Teilen falsch gerechnet.', r: 'Bei 6x = 24 teile ich beide Seiten durch 6: x = 24 : 6.' }];
const FEHLER = {
  '1a': [VZ, { k: 'Nur den ersten Teil der Klammer multipliziert', f: 'Ich habe nicht jeden Teil der Klammer multipliziert.', r: 'Die Zahl vor der Klammer wird mit jedem Teil in der Klammer multipliziert.' },
    { k: 'Das Minus vor der Zahl verloren', f: 'Ich habe das Minus vor der Zahl verloren.', r: 'Das Minus gehört zur Zahl dahinter und wird mitmultipliziert.' }, FL],
  '1b': [{ k: 'Nicht den größten Faktor ausgeklammert (nur die Zahl oder nur a)', f: 'Ich habe nicht den größten Faktor ausgeklammert.', r: 'Ich klammere die größte gemeinsame Zahl UND die Variable aus, z. B. 4a.' },
    { k: 'Den Faktor nicht vor die Klammer geschrieben', f: 'Ich habe den Faktor nicht vor die Klammer geschrieben.', r: 'Der Faktor steht vor der Klammer: 4a · (2a − 3).' },
    { k: 'In der Klammer steht etwas Falsches', f: 'In meiner Klammer stand etwas Falsches.', r: 'Ich mache die Probe: Klammer wieder ausrechnen.' },
    { k: 'Mit einer binomischen Formel verwechselt', f: 'Ich habe Ausklammern mit einer binomischen Formel verwechselt.', r: 'Ausklammern: Was in beiden Teilen steckt, kommt vor die Klammer.' }, FL, LEER],
  '2': [{ k: 'Nicht alle vier Produkte gebildet', f: 'Ich habe nicht alle vier Produkte gebildet.', r: 'Jeder Teil der ersten Klammer wird mit jedem Teil der zweiten multipliziert – vier Produkte.' },
    { k: 'Vorzeichen bei einem Produkt falsch', f: 'Ich habe bei einem Produkt das Vorzeichen falsch.', r: 'Das Vorzeichen gehört zur Zahl dahinter: (−3) · 5 = −15.' },
    { k: 'Falsch zusammengefasst (z. B. a² und a addiert)', f: 'Ich habe Glieder zusammengefasst, die nicht gleichartig sind.', r: 'Nur gleichartige Glieder werden zusammengefasst: 10a − 3a = 7a, aber a² bleibt allein.' },
    { k: 'Mal statt plus zwischen die Produkte geschrieben', f: 'Ich habe die Produkte mit „mal“ verbunden.', r: 'Zwischen den vier Produkten steht plus oder minus.' }, FL, LEER],
  '3a': [{ k: 'Die Quadrate nicht erkannt', f: 'Ich habe die Quadrate nicht erkannt.', r: 'Ich suche die zwei Quadrate und lese ihre Seiten ab: 16 = 4 · 4.' },
    { k: 'Das ² an der Klammer vergessen', f: 'Ich habe das ² an der Klammer vergessen.', r: 'x² + 8x + 16 = (x + 4)² – mit Hochzahl.' }, FL, LEER],
  '3b': [{ k: 'Falsche Formel: (… − …)² statt (… + …) · (… − …)', f: 'Ich habe die falsche binomische Formel genommen.', r: 'Minus zwischen zwei Quadraten, kein Mittelstück: a² − b² = (a + b) · (a − b).' },
    { k: 'Die Seiten falsch abgelesen (z. B. 9x statt 3x)', f: 'Ich habe die Seiten der Quadrate falsch abgelesen.', r: '9x² = (3x)², also ist die Seite 3x – nicht 9x.' }, FL, LEER],
  '4a': [...BINOM, FL], '4b': [{ k: 'Ein Mittelstück hingeschrieben, obwohl es keins gibt', f: 'Ich habe ein Mittelstück geschrieben.', r: '(a + b) · (a − b) = a² − b² – die beiden Mittelteile heben sich auf.' }, VZ, FL],
  '4c': [...BINOM, FL],
  '4d': [{ k: 'Ungeeignet zerlegt (z. B. 50 − 1 oder 30,5 + 30,5)', f: 'Ich habe die Zahl ungeschickt zerlegt.', r: 'Zerlegen in eine glatte Zehnerzahl plus eine kleine Zahl: 61 = 60 + 1.' },
    { k: 'Nur das Ergebnis aus dem Taschenrechner', f: 'Ich habe nur das Ergebnis hingeschrieben.', r: 'Gefragt ist der Weg: (60 + 1)² = 3600 + 120 + 1.' },
    { k: 'Das Mittelstück vergessen', f: 'Ich habe das Mittelstück vergessen.', r: 'Auch bei Zahlen gibt es das Mittelstück 2 · a · b.' },
    { k: 'Das Ergebnis nicht ausgerechnet', f: 'Ich habe das Ergebnis nicht fertig ausgerechnet.', r: 'Am Ende alles zusammenzählen.' }, LEER],
  '5': [{ k: 'Das Binom falsch aufgelöst', f: 'Ich habe die binomische Formel falsch angewendet.', r: '(x + 3)² = x² + 6x + 9 – mit Mittelstück.' }, ...GLEICH, FL, LEER],
  '6': [{ k: 'Nicht alle vier Produkte gebildet', f: 'Ich habe beim Ausmultiplizieren nicht alle vier Produkte gebildet.', r: 'Klammer mal Klammer: vier Produkte.' },
    { k: 'Vorzeichenfehler beim Ausmultiplizieren', f: 'Ich habe beim Ausmultiplizieren ein Vorzeichen falsch.', r: 'x · (−2) = −2x und 5 · (−2) = −10.' }, ...GLEICH, FL, LEER],
  '7a': [{ k: '„Ja“, weil es zwei Quadrate gibt – Mittelstück nicht geprüft', f: 'Ich habe nur auf die Quadrate geschaut.', r: 'Ich prüfe immer das Mittelstück: Es muss 2 · Seite · Seite sein.' },
    { k: 'Begründung fehlt oder passt nicht', f: 'Meine Begründung hat nicht gepasst.', r: 'Die Begründung geht über das Mittelstück: „Es müsste 2 · x · 6 = 12x sein, es steht aber 14x da.“' },
    { k: 'Das Mittelstück falsch ausgerechnet', f: 'Ich habe das Mittelstück falsch ausgerechnet.', r: 'Mittelstück = 2 · Seite · Seite.' }, LEER],
  '7b': [{ k: 'Nur das Vorzeichen genannt, das Mittelstück nicht', f: 'Ich habe nur das Vorzeichen genannt.', r: 'Der Hauptfehler ist das fehlende Mittelstück: (x − 3)² = x² − 6x + 9.' },
    { k: '(x − 3)² mit (x + 3) · (x − 3) verwechselt', f: 'Ich habe die 2. und die 3. binomische Formel verwechselt.', r: '(x − 3)² = (x − 3) · (x − 3), mit Mittelstück.' },
    { k: 'Erklärung passt nicht zur Aufgabe', f: 'Meine Erklärung hat nicht gepasst.', r: 'Ich rechne es richtig aus und vergleiche mit der falschen Rechnung.' }, LEER],
  '8a': [...BRUCH, FL, LEER], '8b': [...BRUCH, FL, LEER], '11': [...BRUCH, FL, LEER],
  '9': [{ k: 'Das Minus vor der Klammer nicht auf alle Glieder angewendet', f: 'Ich habe das Minus vor der Klammer nicht auf alle Glieder angewendet.', r: 'Das Minus vor der Klammer dreht jedes Vorzeichen in der Klammer um.' },
    { k: 'Das Binom nicht in Klammern geschrieben', f: 'Ich habe das Binom ohne Klammer geschrieben.', r: 'Erst das Binom ausrechnen und das Ergebnis in Klammern schreiben, dann das Minus anwenden.' },
    { k: 'Das Binom selbst falsch (Vorzeichen in (x − 4)²)', f: 'Ich habe das Binom falsch ausgerechnet.', r: '(x − 4)² = x² − 8x + 16 – die Zahl am Ende ist plus.' },
    { k: 'Aufgabe falsch abgeschrieben (z. B. + statt −)', f: 'Ich habe die Aufgabe falsch abgeschrieben.', r: 'Ich vergleiche meine erste Zeile mit der Aufgabe.' }, FL, LEER],
  '10a': [{ k: 'Den 1. Term falsch (Seite des Quadrats)', f: 'Ich habe den ersten Term falsch.', r: 'Der 1. Term ist die Seite des ersten Quadrats: 4x² = (2x)².' },
    { k: 'Den 2. Term falsch (Mittelstück rückwärts)', f: 'Ich habe den zweiten Term falsch.', r: '2. Term = Mittelstück : (2 · 1. Term).' },
    { k: 'Die Zahl falsch (nicht das Quadrat des 2. Terms)', f: 'Ich habe die Zahl falsch.', r: 'Die fehlende Zahl ist das Quadrat des 2. Terms.' },
    { k: 'Das ² an der Klammer vergessen', f: 'Ich habe das ² an der Klammer vergessen.', r: 'Die Klammer bekommt ein ².' }, FL, LEER],
  '10b': [{ k: 'Nicht als binomische Formel erkannt', f: 'Ich habe die binomische Formel nicht erkannt.', r: 'Zwei Quadrate und ein passendes Mittelstück → 1. oder 2. Formel.' },
    { k: 'Die Seiten falsch abgelesen (z. B. 9x statt 3x)', f: 'Ich habe die Seiten der Quadrate falsch abgelesen.', r: '9x² = (3x)² und 25y² = (5y)².' },
    { k: 'Vorzeichen oder Formel falsch', f: 'Ich habe die falsche Formel genommen.', r: 'Minus in der Mitte → (… − …)².' },
    { k: 'Ausgeklammert statt faktorisiert', f: 'Ich habe ausgeklammert statt die binomische Formel zu nehmen.', r: 'Ohne gemeinsamen Faktor hilft nur die binomische Formel.' }, FL, LEER]
};

/* ===== ③ Ersatzaufgaben: Generatoren aus aufgaben.js + neue für Aufg. 6, 7, 8b, 10, 11 ===== */
function gl6() {   // (x + a) · (x − b) = x² + c
  let a, b, x0, c;
  do { a = R(2, 8); b = R(1, 6); x0 = R(1, 9); c = (a - b) * x0 - a * b; } while (a === b || c === 0);
  const rs = poly([1, X2('x')], [c, '']);
  return { title: 'Gleichung mit zwei Klammern', q: `Löse die Gleichung.${big(`(x + ${a}) · (x ${MI} ${b}) = ${rs}`)}`, type: 'num', ans: x0, pre: 'x =',
    grafik: vierBoegen('x', a, 'x', -b),
    hint: 'Multipliziere die Klammern aus: vier Produkte. Schreib die rechte Seite in jeder Zeile mit! Dann fällt x² weg, und du formst um, bis x allein steht.',
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
    sol: [`Quadrate: x² = x · x und ${a * a} = ${a} · ${a}`, `Mittelstück müsste 2 · x · ${a} = ${2 * a}x sein – im Term steht ${b}x.`, ok ? `Passt → (x + ${a})²` : 'Passt nicht → Nein.'] };
}
function m7b() {
  const a = R(2, 9), name = pick(['Ben', 'Nina', 'Noah', 'Emma']);
  const R0 = `Das Mittelstück −${2 * a}x fehlt (und es heißt +${a * a}): (x − ${a})² = x² − ${2 * a}x + ${a * a}.`;
  const opts = shuffle([R0, `Nur das Vorzeichen ist falsch: Es heißt x² + ${a * a}.`, `Es ist richtig, denn (x − ${a})² = (x + ${a}) · (x − ${a}).`, `${name} hätte x² − ${2 * a} rechnen müssen.`]);
  return { title: 'Fehler erklären', q: `${name} rechnet: <b>(x − ${a})² = x² − ${a * a}</b>. Was ist der Fehler?`, type: 'mc', options: opts, ans: R0,
    hint: `(x − ${a})² heißt (x − ${a}) · (x − ${a}). Rechne mit der 2. Formel nach.`,
    sol: [`(x − ${a})² = (x − ${a}) · (x − ${a})`, `= x² − 2 · x · ${a} + ${a}² = x² − ${2 * a}x + ${a * a}`, `${name} hat das Mittelstück −${2 * a}x vergessen.`] };
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
    hint: `1. Kästchen: die Seite von ${k * k}x². 2. Kästchen: Mittelstück : (2 · 1. Term). Die Zahl vorne: das Quadrat des 2. Terms.`,
    sol: [`${k * k}x² = (${kv})²  → 1. Term ${kv}`, `${2 * k * a}x : (2 · ${kv}) = ${a}  → 2. Term ${a}`, `${a}² = ${a * a}`, `${k * k}x² ${op} ${2 * k * a}x + ${a * a} = ${ans}`] });
}
function fak10b() {
  let k, l; do { k = R(2, 5); l = R(2, 5); } while (ggT(k, l) !== 1);
  const s = sgn(), op = s > 0 ? '+' : MI, ans = `(${k}x ${op} ${l}y)<sup>2</sup>`;
  return termTask({ title: 'Faktorisieren', q: `Faktorisiere mit einer binomischen Formel.${big(`${k * k}x<sup>2</sup> ${op} ${2 * k * l}xy + ${l * l}y<sup>2</sup>`)}`, form: 'binom', vars: ['x', 'y'], ansHtml: ans,
    hint: 'Lies die Seiten der beiden Quadrate ab (mit Variable!). Prüfe das Mittelstück: 2 · Seite · Seite.',
    sol: [`${k * k}x² = (${k}x)²   und   ${l * l}y² = (${l}y)²`, `Mittelstück: 2 · ${k}x · ${l}y = ${2 * k * l}xy ✓`, `= ${ans}`] });
}
function minus9() { let t, n = 0; do { t = G.minusBinom(); } while (/· \(/.test(t.q) && ++n < 30); return t; }
const ERSATZ = {
  '1a': () => G.ausmultZahl(), '1b': () => G.ausklVar(), '2': () => G.summen2(), '3a': () => G.faktor12(), '3b': () => G.faktor3k(),
  '4a': () => G.binom1(), '4b': () => G.binom3(), '4c': () => G.binom2k(), '4d': () => G.kopf1(), '5': () => G.gleichungBinom(), '6': gl6,
  '7a': m7a, '7b': m7b, '8a': () => G.bruchX(), '8b': br8b, '9': minus9, '10a': erg10a, '10b': fak10b, '11': br11
};
function ersatz(key) { const t = ERSATZ[key](); if (!t.grafik && t.nenner) t.grafik = korbGrafik(t.nenner); return t; }

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
    <div class="fehler">${FEHLER[key].map((e, i) => `<label class="fopt"><input type="checkbox" data-i="${i}"> ${e.k}</label>`).join('')}</div>
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
    ${sel.map(e => `<div class="hl">Mein Fehler: ${e.f}</div><div class="hl">Richtig: ${e.r}</div>`).join('')}
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
