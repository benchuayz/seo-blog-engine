# Site structure

Most small sites that "don't rank" have good pages Google never found. The pages exist,
but nothing links to them, so the only path in is the sitemap, and Google treats a page
nobody links to as a page nobody cares about. We had exactly this on trueframe.xyz: every
blog post and every service page was orphaned. Adding links from the nav, footer and
homepage got them indexed within days.

So structure comes before content. Build this skeleton, then fill it.

## The pages

| Page | URL pattern | Job |
|---|---|---|
| Homepage | `/` | Says who you help and what happens next. Shows proof. Lists the latest 6 posts. |
| Offer page (the "bridge") | `/work-with-us`, `/pricing`, `/audit` | Where every post's CTA lands. One per offer. |
| Buyer pages | `/<service>-for-<buyer>` e.g. `/bookkeeping-for-dental-clinics` | One page per buyer type. Their pains, your proof for them, FAQs, CTA. These are your money pages for search. |
| About / founder page | `/about` or `/<your-name>` | Real person, real history, links to your public profiles. Person schema. Feeds trust (E-E-A-T) and branded search. |
| Blog index | `/blog` | Posts grouped by category. |
| Pillar posts | `/blog/<topic>` | The long guide for a cluster. Links to every post in it. |
| Cluster posts | `/blog/<specific-question>` | One buyer question each. Links up to the pillar and across to 1 or 2 siblings. |
| Case studies | `/blog/<client>-case-study` or `/work/<client>` | Proof pages. Only with real numbers and permission. |
| `llms.txt` | `/llms.txt` | A plain map of the site for AI assistants. The blog module generates it. |
| `sitemap.xml`, `robots.txt` | | Generated. robots allows the AI crawlers by name. |

Two or three buyer pages is plenty to start. Make them good before making more.

## How the pages link (the part that gets you indexed)

```
            nav + footer (on every page)
   ┌──────────┬──────────┬──────────┬─────────┐
   ▼          ▼          ▼          ▼         ▼
 Home ──► Offer page ◄── Buyer pages ──► Blog index ──► About
   │          ▲              │  ▲            │
   │          │              ▼  │            ▼
   └─ latest posts ──►  Pillar post ◄──► Cluster posts
                         (every post's CTA goes to the offer page)
```

Rules:

1. **Nav or footer links to the blog, the offer page, every buyer page and about.** Sitewide.
   This one change is the biggest indexing win on a new site.
2. **Homepage lists the latest posts.** The homepage gets the most links from the outside
   world. Pass some of that to the new pages.
3. **Every post links to the offer page (UTM-tagged) and to at least two other pages** on the
   site: its pillar, a sibling, or a buyer page.
4. **Every buyer page links to the 2 or 3 posts that match it** ("Related reading").
5. **Pillars link to every post in their cluster, and every cluster post links back.**
6. **When you publish a post, add a link to it from at least one older page.** New pages that
   only link out, and never get linked in, stay invisible.

## URL rules

- Short, lowercase, hyphenated, keyword first: `/blog/how-to-price-a-bookkeeping-retainer`.
- Never change a URL once it's live. If you must, add a permanent redirect.
- One host. Pick `www.` or bare, redirect the other permanently, and use it in every
  canonical tag, the sitemap and `site.config.ts`. A split host shows up in Search Console as
  "Duplicate, Google chose different canonical" and halves your signal.
- No dates in URLs. They make good posts look old.

## Clusters (how the blog grows)

A cluster is one pillar post plus 5 to 10 posts that each answer one narrower question in
the same area. Google ranks sites that cover a topic in depth above sites with one post on
everything.

How we pick them:

1. Start from the buyer's biggest pains (from the intake and sales calls). Each pain is a
   candidate cluster.
2. The strongest clusters sit closest to money: pricing, "how do I choose", "X vs Y", "is it
   worth it", "how to do it yourself".
3. Once Search Console has data, watch for a topic that pulls impressions fast. When one
   does, build its cluster out immediately: a pillar, then one post per question people
   are searching. Most of our search traffic came from a single cluster built this way,
   built quickly while interest was rising.

## Every page, every time

- One `<h1>`, the primary keyword near the front of the title and the first paragraph.
- Meta description that earns the click (150 to 160 characters).
- FAQ section with the same text in the visible page and the FAQPage schema.
- A share image (Open Graph). Without one, links on LinkedIn and Slack look broken.
- One primary CTA. UTM-tagged so you can see which page drove the booking.
- Readable on a phone. Most of your first visitors will be on one.
