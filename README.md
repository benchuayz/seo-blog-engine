# SEO Blog Engine

Turn what you know (or already recorded) into blog posts that rank in Google
**and** get quoted by AI assistants like ChatGPT, Perplexity, and Claude.

This is the system [Trueframe](https://www.trueframe.xyz) uses to write founder
content that drives pipeline, packaged as a [Claude Code](https://claude.com/claude-code)
skill plus a drop-in Next.js blog. You install it, answer a short intake once,
hand it your transcripts and writing samples, and it cooks publish-ready posts in
your site's format.

See it running in production: [trueframe.xyz/blog](https://www.trueframe.xyz/blog).

---

## What you get

- **A Claude Code skill** (`skill/seo-blog-engine/`) — runs an intake in plan
  mode, learns your voice, then writes finished posts from a topic, a transcript,
  or rough notes. Self-contained: install and go.
- **A working Next.js blog** (`blog-module/`) — typed, block-based posts with
  full SEO + GEO schema, a dynamic sitemap, an AI-crawler-friendly `robots.txt`,
  and two example posts. `npm install && npm run dev` and it's live.
- **The playbook** (`docs/`) — the post formula, the voice rules, the SEO/GEO
  mechanics, and the optional measurement loop, written out so you (and the
  skill) follow the same standard every time.

Not on Next.js? The skill also outputs Markdown/MDX or HTML with the schema
attached, so it works on Astro, Hugo, WordPress, or a hand-built site.

## The idea in one paragraph

Most blog posts fail for the same reasons: they're written for "everyone" instead
of one buyer, they bury the answer, they have no structured data, and they sound
like a machine wrote them. This engine fixes all four. One post targets one buyer
and one search query, answers it in the first paragraph, ships real FAQs as both
visible text and `FAQPage` schema (the move that gets you cited by AI), and is
written in your actual voice with the AI-slop scrubbed out. Do that 40 times and
the traffic compounds.

## Quickstart

```bash
# 1. Install the skill (available in every project)
cp -r skill/seo-blog-engine ~/.claude/skills/

# 2. Try the blog module
cd blog-module && npm install && npm run dev   # http://localhost:3000/blog

# 3. In Claude Code, switch to PLAN MODE (Shift+Tab), then:
/seo-blog-engine setup        # answer the intake once

# 4. Cook posts
/seo-blog-engine cook "a topic, a question, or a transcript path"
```

Full steps, including what to prepare first, are in [`docs/SETUP.md`](docs/SETUP.md).

## What's in the box

```
seo-blog-engine/
├── skill/seo-blog-engine/SKILL.md   the Claude Code skill (the brain)
├── blog-module/                     drop-in Next.js blog (SEO + GEO wired in)
├── docs/
│   ├── SETUP.md                     install + first run
│   ├── HOW-IT-WORKS.md              the pipeline + the strategy
│   ├── BLOG-FORMULA.md              post structure + every block type
│   ├── VOICE-AND-AI-SLOP.md         the voice rules + the kill-list
│   ├── SEO-GEO-PLAYBOOK.md          schema, FAQ-for-GEO, crawlers, sitemap
│   └── MEASUREMENT.md               optional attribution + lead capture
├── templates/                       config + post skeleton to clone
└── examples/                        a worked intake-to-post walkthrough
```

## Requirements

- [Claude Code](https://claude.com/claude-code)
- For the Next.js module: Node 20.9+, and it uses Next.js (App Router), React 19,
  Tailwind CSS v4.

## Secrets

Nothing in this repo contains real keys. The blog module needs none to run; the
optional analytics and lead-capture features read from environment variables you
set in `.env.local` (gitignored). See [`.env.example`](.env.example) and
[`docs/MEASUREMENT.md`](docs/MEASUREMENT.md).

## License

MIT. Use it, fork it, build a business on it. See [`LICENSE`](LICENSE).

---

## Built by Trueframe

This engine was built by [**Trueframe**](https://www.trueframe.xyz)
([Benjamin Chua](https://www.linkedin.com/in/benchuchu/)). Trueframe is a
done-for-you premium content engine for founders and high-revenue brands.

**Want the whole content engine run for you instead of building it yourself?**
Book a call at [**www.trueframe.xyz**](https://www.trueframe.xyz).

If this is useful, a star on the repo and a credit back are appreciated. We made
this, and we think it's great.
