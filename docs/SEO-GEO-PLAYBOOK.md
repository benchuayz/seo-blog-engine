# SEO + GEO playbook

SEO gets you into Google's ten blue links. GEO gets you quoted inside the AI
answer that now sits above them. This engine does both from the same post. Here's
exactly how, and what to do if you're not on the Next.js module.

## 1. One post, one buyer, one search intent

Before anything else, answer: who is this for, and what one thing are they typing
into a search box? A post aimed at "founders" ranks for nothing. A post aimed at
"why is my Series B dashboard so slow" can own that question. Put the keyword
phrase in the `title`, the `metaTitle` (near the front), the `slug`, the `dek`,
and the first paragraph. Don't stuff it. Use it where it's natural.

## 2. Answer first, then earn the scroll

AI assistants lift the clearest, earliest, most self-contained answer on the page.
So the first paragraph states the answer in plain language. The rest of the post
proves it, expands it, and handles objections. This also helps featured snippets.

## 3. FAQs are the highest-leverage GEO move

Each post carries 4-6 real buyer questions. They render in two places from the
same array:

- **Visibly**, as an accordion a human reads.
- **As `FAQPage` JSON-LD**, which Google turns into a rich result and assistants
  read directly.

The text must be identical in both. When ChatGPT or Perplexity quotes your
answer, the words it cites are the words on your page. In the module this is
automatic: `FAQ.tsx` and `buildArticleSchema()` both read `post.faqs`.

Write questions the way people actually ask them ("how long until …", "do I need
…", "what if I've tried …"), not keyword phrases.

## 4. Structured data on every post

`blog-module/src/lib/schema.ts` builds a per-post `@graph`:

- **BlogPosting** — the article, with `datePublished`/`dateModified`, linked to
  the author and publisher by `@id`.
- **BreadcrumbList** — Home › Blog › Post.
- **FAQPage** — the Q&A above.
- **VideoObject** — one per embedded YouTube video that carries metadata.

The author (`Person`) and `Organization` nodes are declared once in `layout.tsx`
and referenced everywhere by `@id`, so the entity graph stays connected. That
connection is what builds author authority (E-E-A-T) over time and feeds an
eventual Google Knowledge Panel. Fill in `siteConfig.author.sameAs` with your real
public profiles.

Validate any post with Google's
[Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema validator](https://validator.schema.org/).

## 5. Welcome the AI crawlers

If you want to be cited by AI, you have to let their bots read you.
`blog-module/src/app/robots.ts` explicitly allow-lists GPTBot, ChatGPT-User,
OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, and
others, and points them at the sitemap. Blocking these (many sites do by default)
is the most common reason a good page never shows up in AI answers.

## 6. Internal links + canonical URLs

- Every post sets a `canonical` URL so duplicates don't split ranking signal.
- The `related` block and in-body links connect posts to each other and to the
  offer page. Denser internal linking helps crawl depth and spreads authority.
- The CTA bridge carries a UTM tagged with the post slug, so you can attribute
  bookings back to the post that drove them (see `docs/MEASUREMENT.md`).

## 7. Sitemap + freshness

`sitemap.ts` is generated from the post registry, so new posts appear
automatically. Set `dateModified` only when you genuinely revise a post — it
renders an "Updated" line and signals freshness. Don't fake it; lying about
freshness is a known way to lose trust.

After publishing, submit the URL in
[Google Search Console](https://search.google.com/search-console) to request a
priority crawl. Diagnose indexing problems by reading GSC's actual reason, not by
guessing.

---

## If you're NOT on the Next.js module

The strategy is identical; you just generate the schema yourself. Add this to the
`<head>` of each post (the skill will fill it in):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", "headline": "…", "datePublished": "…",
      "author": { "@type": "Person", "name": "…" } },
    { "@type": "FAQPage", "mainEntity": [
      { "@type": "Question", "name": "…",
        "acceptedAnswer": { "@type": "Answer", "text": "…" } }
    ]}
  ]
}
</script>
```

And in your `robots.txt`:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

Render the FAQ Q&A visibly on the page with the exact same text as the schema.
That's the part most people skip, and it's the part that gets you cited.
