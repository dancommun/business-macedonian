# Using this as a skill

This folder is a ready-to-upload **skill**: `SKILL.md` (the entry point) plus `business-macedonian.md` (the full guide it applies).

## claude.ai (your regular Claude)

1. Zip this `skill/` folder (or its two files).
2. Go to **claude.ai → Settings → Capabilities → Skills** and upload the zip.
3. From then on, Claude applies the Business Macedonian rules automatically whenever you write or translate Macedonian — in any chat, no attaching needed. It also syncs to Claude Code.

## Claude Code

Drop this `skill/` folder into your `~/.claude/skills/` directory (or your project's `.claude/skills/`). It loads by name.

## ChatGPT / Gemini / other AIs

These don't take "skills", but the same content works: paste `business-macedonian.md` (or the repo's `SYSTEM-PROMPT.md`) into a Custom GPT, a Gemini Gem, or the project's custom instructions.

---

**Keeping it in sync:** `business-macedonian.md` here is a copy of the repo's top-level `BUSINESS-MACEDONIAN.md`. If the guide is updated, refresh this copy before re-uploading:

```bash
cp BUSINESS-MACEDONIAN.md skill/business-macedonian.md
```
