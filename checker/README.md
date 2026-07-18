# Calque Checker

A tiny, dependency-free linter that scans Macedonian text for the **high-confidence "foreigner Macedonian" tells** from [`BUSINESS-MACEDONIAN.md`](../BUSINESS-MACEDONIAN.md): blacklisted calques, bookish connectors, and English typography.

It needs only [Node.js](https://nodejs.org) (any recent version). No install, no packages.

## Usage

```bash
# check a file
node checker/check-macedonian.mjs draft.md

# check piped text
echo "Се надевам дека овој меил ве затекнува добро." | node checker/check-macedonian.mjs
```

Exit code is `0` if clean and `1` if any **error**-level issue is found, so you can use it in a pre-commit hook or CI.

## What it catches

| Severity | Checks | Confidence |
|---|---|---|
| **ERROR** | Blacklisted calques (from Section 1); straight `"` quotes instead of `„ … "` | High |
| **WARN** | Bookish connectors (следствено, всушност, воедно, притоа…); over-used меѓутоа/имено/токму; em/en-dashes | High |
| **CHECK** | Decimal points and comma-thousands that look like English number formatting | Heuristic |

Example output:

```
   1:1   ERROR Calque „Се надевам дека овој е-меил ве" (hope this email finds you well) → почнете директно, без ваков вовед
   1:49  ERROR Calque „На крајот на денот" (at the end of the day) → на крајот / конечно / во суштина
   1:106 ERROR Calque „скокнеме на брз повик" (jump on a call) → да се слушнеме / да се јавиме
   1:179 WARN  Bookish connector „следствено" — near-absent in real prose. Use а / но / затоа / доколку or a full stop.
```

## Honest limits — read this

This is a **regex** tool. It reliably catches the tells it has been *taught* and the mechanical typography rules. It **cannot**:

- see a **missing clitic** (го/ја/ги), a **wrong verb tense** (plain past where the l-form is needed), or English **word order** — those need real grammar parsing;
- catch a **calque it doesn't know** — the blacklist only grows as people report new ones.

**A clean report means "no *known* tells", not "certified native".** The real gate is still the read-aloud test in Section 7 of the guide: *would a Macedonian actually say this out loud?*

Think of the checker as a smoke detector, not a fire marshal.

## Extending it

The calque blacklist and connector lists live in [`rules.json`](rules.json) — plain data, no code. Add a calque:

```json
{ "pattern": "нова калка", "suggestion": "природен израз", "english": "the English source" }
```

`pattern` is a case-insensitive regular expression. Use `[а-џ]*` as a word-stem wildcard (JavaScript's `\w` does not match Cyrillic). Better yet, report it via the [calque issue form](../../issues/new?template=calque-report.yml) so it helps everyone.
