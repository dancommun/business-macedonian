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

## How it was built

The rules were derived by reverse-engineering roughly **87,000 words of real, human-written Macedonian business prose** — news, columns, interviews and analysis from Macedonian economy and finance desks, most of it published before 2023 so no AI could have influenced it. The method was *literal back-translation*: take a native sentence, translate it word-for-word into English, and every place the English breaks marks a Macedonian-specific pattern. See the appendix of `BUSINESS-MACEDONIAN.md` for the full method and confidence notes.

## How to use it

**Any AI, one-off:** attach or paste `BUSINESS-MACEDONIAN.md` into your chat and say *"Write the Macedonian following this guide."*

**ChatGPT / Claude Projects / Gemini Gems:** add `BUSINESS-MACEDONIAN.md` to the project's knowledge / custom instructions. Every chat in that project then follows it automatically.

**Claude Code (or other agent tools):** drop `BUSINESS-MACEDONIAN.md` into your project and reference it from your instructions file (e.g. `CLAUDE.md`), or load it as a skill.

**As a skill:** the file is self-contained Markdown — upload it wherever your tool accepts skill/knowledge files.

## Scope

This teaches the **language**, not any individual's house voice. It is business Macedonian (economy, entrepreneurship, management, finance). Layer your own tone on top.

## Contributing

The highest-value contribution is a **caught calque** — a phrase an AI produced that no native would say. See [CONTRIBUTING.md](CONTRIBUTING.md). Every correction makes the guide sharper for everyone.

## License

[CC BY 4.0](LICENSE) — free to use, share, and adapt, with attribution.
