#!/usr/bin/env node
// check-macedonian.mjs — a lightweight "foreigner Macedonian" linter.
// Flags the high-confidence tells from BUSINESS-MACEDONIAN.md: blacklisted
// calques, bookish connectors, and English typography. No dependencies.
//
// Usage:
//   node check-macedonian.mjs <file.txt|file.md>
//   echo "твојот текст" | node check-macedonian.mjs
//
// Exit code: 0 if clean, 1 if any ERROR-level issue was found (usable in CI).
//
// HONEST LIMITS: this catches what a regex reliably can — known calques,
// over-used connectors, and typography. It does NOT understand grammar, so it
// cannot see a missing clitic, a wrong verb tense, or a calque it hasn't been
// taught. A clean report means "no KNOWN tells", not "certified native". The
// read-aloud test in Section 7 of the guide is still the real gate.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rules = JSON.parse(readFileSync(join(scriptDir, 'rules.json'), 'utf8'));

const paint = process.stdout.isTTY
  ? { red: s => `\x1b[31m${s}\x1b[0m`, yellow: s => `\x1b[33m${s}\x1b[0m`, cyan: s => `\x1b[36m${s}\x1b[0m`, dim: s => `\x1b[2m${s}\x1b[0m`, bold: s => `\x1b[1m${s}\x1b[0m` }
  : { red: s => s, yellow: s => s, cyan: s => s, dim: s => s, bold: s => s };

function readInput() {
  const arg = process.argv[2];
  if (arg) return { text: readFileSync(arg, 'utf8'), name: arg };
  try {
    return { text: readFileSync(0, 'utf8'), name: '(stdin)' };
  } catch {
    console.error('Usage: node check-macedonian.mjs <file>  |  echo "текст" | node check-macedonian.mjs');
    process.exit(2);
  }
}

const { text, name } = readInput();
const lines = text.split(/\r?\n/);
const wordCount = (text.match(/[а-шА-ШЀ-ӿ]+/g) || []).length;

const findings = [];
function add(severity, lineIdx, col, message, snippet) {
  findings.push({ severity, line: lineIdx + 1, col: col + 1, message, snippet });
}

function scanLine(line, pattern, flags = 'gi') {
  const re = new RegExp(pattern, flags);
  const hits = [];
  let m;
  while ((m = re.exec(line)) !== null) {
    hits.push({ index: m.index, match: m[0] });
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return hits;
}

// 1) CALQUES — ERROR
for (const c of rules.calques) {
  lines.forEach((line, i) => {
    for (const hit of scanLine(line, c.pattern)) {
      add('ERROR', i, hit.index,
        `Calque „${hit.match}" (${c.english}) → ${c.suggestion}`, hit.match);
    }
  });
}

// 2) CONNECTORS
const connectorCounts = {};
function countConnector(word) {
  let n = 0;
  const pat = `(^|[^а-шА-Ш\\u0400-\\u04FF])(${word})([^а-шА-Ш\\u0400-\\u04FF]|$)`;
  lines.forEach((line) => {
    for (const hit of scanLine(line, pat)) {
      n++;
      connectorCounts[word] = (connectorCounts[word] || 0) + 1;
    }
  });
  return n;
}
for (const w of rules.connectors.avoid.words) {
  lines.forEach((line, i) => {
    const pat = `(^|[^а-шА-Ш\\u0400-\\u04FF])(${w})([^а-шА-Ш\\u0400-\\u04FF]|$)`;
    for (const hit of scanLine(line, pat)) {
      const col = hit.index + hit.match.indexOf(w.split(' ')[0]);
      add('WARN', i, Math.max(col, hit.index),
        `Bookish connector „${w}" — near-absent in real prose. Use а / но / затоа / доколку or a full stop.`, w);
    }
  });
}
const budget = Math.max(1, Math.round((wordCount / 400) * rules.connectors.ration.budgetPer400Words));
for (const w of rules.connectors.ration.words) {
  const count = countConnector(w);
  if (count > budget) {
    add('WARN', 0, 0,
      `„${w}" used ${count}× (budget ≈ ${budget} for ${wordCount} words) — formal/column register only; thin it out.`, w);
  }
}

// 3) TYPOGRAPHY
lines.forEach((line, i) => {
  for (const hit of scanLine(line, '"')) {
    add('ERROR', i, hit.index, 'Straight quote " — Macedonian uses „ … " (low-open, high-close).', '"');
  }
  for (const hit of scanLine(line, '[\\u2014\\u2013]')) {
    add('WARN', i, hit.index, 'Em/en-dash — prefer a plain spaced hyphen "-" in Macedonian running text.', hit.match);
  }
  for (const hit of scanLine(line, '\\d\\.\\d{1,2}(?!\\d)')) {
    add('CHECK', i, hit.index, `Possible decimal point in "${hit.match}" — Macedonian uses a comma for decimals (e.g. 23,5).`, hit.match);
  }
  for (const hit of scanLine(line, '\\d,\\d{3}(?!\\d)')) {
    add('CHECK', i, hit.index, `Possible English thousands comma in "${hit.match}" — Macedonian uses a dot (e.g. 15.868).`, hit.match);
  }
});

// ---- REPORT ----
const order = { ERROR: 0, WARN: 1, CHECK: 2 };
findings.sort((a, b) => (a.line - b.line) || (a.col - b.col) || (order[a.severity] - order[b.severity]));

const counts = { ERROR: 0, WARN: 0, CHECK: 0 };
for (const f of findings) counts[f.severity]++;

const tag = { ERROR: s => paint.red(s), WARN: s => paint.yellow(s), CHECK: s => paint.cyan(s) };

console.log(paint.bold(`\nchecking ${name} — ${wordCount} Macedonian words\n`));
if (findings.length === 0) {
  console.log(paint.bold('✓ No known tells found.') + paint.dim(' (Regex-level only — still run the read-aloud test.)'));
} else {
  for (const f of findings) {
    const loc = f.line > 0 ? paint.dim(`${String(f.line).padStart(4)}:${String(f.col).padEnd(3)}`) : paint.dim('   —   ');
    console.log(`${loc} ${tag[f.severity](f.severity.padEnd(5))} ${f.message}`);
  }
  console.log('');
  console.log(`${paint.red(counts.ERROR + ' error')}  ${paint.yellow(counts.WARN + ' warning')}  ${paint.cyan(counts.CHECK + ' check')}`);
}
console.log(paint.dim('\nFull guide: BUSINESS-MACEDONIAN.md · This linter catches known tells, not all of them.\n'));

process.exit(counts.ERROR > 0 ? 1 : 0);
