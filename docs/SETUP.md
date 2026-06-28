# Setup

Two things ship in this repo, and you can use either or both:

1. **The skill** (`skill/seo-blog-engine/`) — the brain that writes posts.
2. **The blog module** (`blog-module/`) — a working Next.js blog the skill can
   write straight into.

You need [Claude Code](https://claude.com/claude-code) installed.

---

## 1. Install the skill

The skill is a folder Claude Code loads. Copy it to one of these:

```bash
# Available in ALL your projects:
cp -r skill/seo-blog-engine ~/.claude/skills/

# OR available only in the current project:
mkdir -p .claude/skills
cp -r skill/seo-blog-engine .claude/skills/
```

Restart Claude Code (or open a new session) and type `/seo-blog-engine` to
confirm it shows up.

---

## 2. Get the blog onto your site

Pick one:

**A. Use the Next.js module as-is.** Copy `blog-module/` into your project, or
run it standalone first to see it work:

```bash
cd blog-module
npm install
npm run dev      # http://localhost:3000/blog
```

Then edit `src/lib/site.config.ts` (one file) with your domain, brand, author,
booking link, and accent colour.

**B. You have a different stack** (Astro, Hugo, WordPress, plain HTML). Skip the
module. The skill will output posts as Markdown/MDX or HTML with the SEO/GEO
schema attached. See `docs/SEO-GEO-PLAYBOOK.md` for what to paste where.

---

## 3. Prepare your inputs (do this before `setup`)

The quality of every post depends on what you feed the engine. Have these ready:

- **3-5 writing samples** in your real voice (posts, emails, a memo). Links or
  pasted text both work.
- **Your ICP** in one specific sentence: who, their pain, the outcome they want.
- **A proof bank**: real numbers and results you can stand behind, flagged as
  public / confidential / anonymize-only.
- **Your offer**: the one action a post should drive, and the page/booking link
  it points to.
- **Raw material to write from**: a keyword list, a Google Search Console export,
  or transcripts of podcasts / sales calls / videos. (Got footage? Transcribe it
  first — the skill reads text, not video.)

---

## 4. Run setup (in plan mode)

In Claude Code, switch to **plan mode** (press `Shift+Tab` until it says "plan
mode"), then run:

```
/seo-blog-engine setup
```

Answer the intake. Nothing is written until you approve. It saves your answers to
`blog-engine.config.md` (gitignored — it stays private).

---

## 5. Cook posts

```
/seo-blog-engine cook "the topic, a question, or a transcript path"
/seo-blog-engine cook ./transcripts/sales-call-2026-01.txt
/seo-blog-engine batch        # work through a backlog of topics
```

The skill researches, shows you an outline, waits for your sign-off, writes the
post in your voice, runs the AI-slop scan, and hands back a publish-ready file in
your site's format. Add it to your blog, push, done.

See `docs/HOW-IT-WORKS.md` for the full pipeline and `docs/BLOG-FORMULA.md` for
the post structure.
