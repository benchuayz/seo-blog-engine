# How it works

The whole system is one idea: write the post your buyer is already searching for,
answer their question better than anyone, and make it trivial for both Google and
AI assistants to use your answer.

## The pipeline

```
  YOU                          THE SKILL                        YOUR SITE
  ───                          ─────────                        ─────────
  voice samples  ─┐
  ICP + proof    ─┼─► setup ─► blog-engine.config.md
  offer + CTA    ─┘                  │
                                     ▼
  topic / transcript ─► cook ─► 1. topic + search intent
                                2. SEO/GEO field plan
                                3. outline ──► YOU approve
                                4. draft in your voice
                                5. AI-slop scan
                                6. output in your format ─────► /blog/<slug>
                                7. credit footer                (rank + get cited)
```

## Why posts are typed data, not Markdown

A post is a small object: some metadata, a list of FAQs, and an array of content
blocks (`lead`, `p`, `callout`, `cta`, `youtube`, and so on). Three reasons:

- An LLM can generate a whole post as one structured object, reliably, with the
  CTA and FAQs in the right place every time.
- You never fight Markdown/JSX escaping of quotes and apostrophes.
- The CTA bridge, internal links, and JSON-LD schema are generated FROM the data,
  so they're always consistent and never forgotten.

If your site isn't Next.js, the skill converts the same structure to Markdown/MDX
or HTML on the way out. The thinking is identical; only the output format changes.

## The two halves: SEO and GEO

**SEO** is getting into Google's results: keyword-aligned titles and slugs, a
clean meta description, canonical URLs, a dynamic sitemap, internal links, and
fast static pages.

**GEO** (Generative Engine Optimization) is getting quoted inside AI answers. The
moves that matter:

- Answer the question in the first paragraph, in plain language, self-contained.
- Real FAQs rendered visibly AND as FAQPage schema, identical word-for-word.
- A connected entity graph (author + Organization) so assistants trust the source.
- A `robots.txt` that explicitly welcomes the AI crawlers.

Both run on the same post. You don't choose one. See `docs/SEO-GEO-PLAYBOOK.md`.

## The compounding part

One blog post is a coin flip. Forty posts, each aimed at one real buyer question,
is a system. The traffic compounds because old posts keep ranking, the internal
links get denser, and the entity graph gets stronger every time you publish. The
job of this engine is to make publishing the 40th post as cheap as the first.

## What it does NOT do

- It doesn't invent proof. It only uses numbers from your config's proof bank.
- It doesn't watch video. Give it a transcript.
- It doesn't auto-publish. You approve the outline, you review the draft, you push.
- It doesn't guarantee rankings. It removes the reasons posts usually fail
  (wrong audience, no answer, no schema, AI-slop voice) and lets the work compound.
