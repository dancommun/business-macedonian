# Business Macedonian for AI

**A rulebook that teaches any AI language model (Claude, ChatGPT, Gemini, or other) to write natural business Macedonian instead of translated-sounding "foreigner Macedonian".**

AI models know Macedonian *grammar* but lack Macedonian *instinct*. Left alone they produce English thoughts wearing Cyrillic letters — sentences that are individually correct and collectively wrong. A native reader spots it instantly, usually from a single calqued idiom (for example „одговарајте од стомак" for "answer from the gut" — an expression no Macedonian has ever said).

[`BUSINESS-MACEDONIAN.md`](BUSINESS-MACEDONIAN.md) is the cure: an operating manual, instructions in English, examples in Macedonian.

## What's inside

The guide has eight sections:

1. **The anti-calque law** — the deadliest mistake, with a growing blacklist of caught calques
2. **Sentence architecture** — clitic doubling, information order, verb placement, sentence length
3. **How to make a point** — claim-first attribution, giving institutions a voice, argument shape by genre
4. **Connector lexicon** — frequency-based: which connectors natives actually use vs. the "bookish" ones AI overuses (that barely appear in real prose)
5. **Business phrase bank** — ~110 natural collocations, Macedonian + English meaning
6. **Register** — the `Вие` form, formal-but-warm business tone, numbers, evidentiality
7. **Mandatory self-review checklist** — the "would a native say this aloud?" pass
8. **Typography** — quotes, number formats, dashes
9. **Marketing & sales register** — the ти-vs-Вие map, native CTAs and slogans, brand-story voice, and the "решенија" calque plague
10. **Formal document & proposal register** — report and strategy prose: frozen salutations and sign-offs, nominalized objectives, indirect commitment, double-hedged forecasts, the dense formal-connector inventory
11. **Email & correspondence register** — vocative salutations, the sign-off hierarchy, a functional phrase bank, and the email calques to never open with

## How it was built

The rules were derived by reverse-engineering roughly **87,000 words of real, human-written Macedonian business prose** — news, columns, interviews and analysis from Macedonian economy and finance desks, most of it published before 2023 so no AI could have influenced it. The method was *literal back-translation*: take a native sentence, translate it word-for-word into English, and every place the English breaks marks a Macedonian-specific pattern. See the appendix of `BUSINESS-MACEDONIAN.md` for the full method and confidence notes.

## How to use it

**Fastest — set it and forget it:** copy the ready-made prompt in [`SYSTEM-PROMPT.md`](SYSTEM-PROMPT.md) into your ChatGPT custom instructions, a Claude Project, or a Gemini Gem. Your AI then follows the guide in every reply, with nothing to attach.

**In a hurry / no room for the whole file:** paste the one-page [`CHEATSHEET.md`](CHEATSHEET.md) — the 10 rules that catch almost everything.

**Full power:** attach or add [`BUSINESS-MACEDONIAN.md`](BUSINESS-MACEDONIAN.md) itself — the complete manual with examples, the connector table, and the ~110-phrase business phrase bank. Works as project knowledge, a skill file, or a one-off attachment in any AI tool.

**Best results:** use the system prompt *and* attach the full guide — the prompt is the compressed law, the file has the detail.

## Does it actually work?

See [`EXAMPLES.md`](EXAMPLES.md) — four real content types (cold email, sales copy, LinkedIn post, report paragraph), each shown as the AI writes it and as a native writes it, with every fix explained. The foreign versions are grammatically correct; that's exactly why they're instructive.

## Check your draft automatically

The [`checker/`](checker/) folder has a tiny Node script that scans Macedonian text and flags known calques, bookish connectors, and English typography:

```bash
node checker/check-macedonian.mjs draft.md
```

It's a smoke detector, not a certificate — it catches *known* tells, and the read-aloud test is still the real gate. See [checker/README.md](checker/README.md).

## Scope

This teaches the **language**, not any individual's house voice. It is business Macedonian (economy, entrepreneurship, management, finance). Layer your own tone on top.

## Contributing

The highest-value contribution is a **caught calque** — a phrase an AI produced that no native would say. See [CONTRIBUTING.md](CONTRIBUTING.md). Every correction makes the guide sharper for everyone.

## License

[CC BY 4.0](LICENSE) — free to use, share, and adapt, with attribution.
