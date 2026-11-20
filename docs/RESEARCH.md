# Research

The goal of research is a ranked list of questions your buyer types into Google or asks
ChatGPT, that you can answer better than whoever ranks today. No paid tools needed. If the
person has Ahrefs, Semrush or a Search Console export, use it as an extra input.

Output: `content/topic-backlog.md` (shape in `templates/topic-backlog.md`).

## 1. Seed list (from the business, 15 minutes)

Pull 20 to 40 seed questions from:

- the intake: the buyer's pains, the outcome they want, their objections
- sales-call and podcast transcripts: every question a prospect asked, in their words
- the person's own FAQ, support inbox or DMs, if they share it
- the offer: "how much does X cost", "X vs doing it yourself", "best X for <buyer>"

Write questions the way the buyer would type them, not as keywords.

## 2. Expand (web search)

For each seed, search it and record:

- **"People also ask"** and related searches at the bottom of the results page
- **autocomplete** variants ("how to price a bookkeeping retainer for...")
- **Reddit and forum threads** where the buyer asks it. Their wording becomes your heading.
- **what ranks now**: the top 3 to 5 results. Note if they're thin, old, generic, or written
  for a different buyer. That's your opening.
- **AI answers**: ask ChatGPT or Perplexity the question. Note who gets cited. Those are the
  pages to beat for GEO.

Competitor gap: open 2 or 3 competitors' `/sitemap.xml`. List their blog topics. Note the
ones that fit the buyer and that you have proof for.

## 3. Score each topic

Score 1 to 3 on each, multiply:

- **Buyer fit**: is the person searching this someone who could buy?
- **Intent**: 3 = ready to act (pricing, comparison, "hire", "best"), 2 = solving the problem
  now (how-to), 1 = curious (what is)
- **Winnable**: 3 = current results are weak or off-target, 1 = big brands with great pages

Then check you have something real to say: proof, a method, a strong opinion. Drop topics
where the honest answer would be generic.

## 4. Group into clusters

Group topics that share a parent problem. Each cluster gets one pillar (the broad guide) and
the rest become cluster posts. Rank clusters by total score. See `docs/SITE-STRUCTURE.md`.

## 5. Write the backlog

For each topic, one row: primary keyword, the question in the buyer's words, intent, cluster,
pillar or cluster post, the angle (why ours will be better), the proof it will use, and which
pages it should link to. Order by score, pillar posts first within each cluster.

## Once the site has data (week 3 onwards)

Run `node --env-file=.env.local scripts/seo.mjs report`. It lists:

- **queries ranking 8 to 30**: Google already half-trusts you here. Write a dedicated post or
  strengthen the page that ranks. These are the fastest wins on the whole site.
- **pages with 50+ impressions and under 1% CTR**: rewrite the title and meta description.

Add what it finds to the top of the backlog. The weekly autopilot does this for you.

## Never cannibalize

Before adding a topic, check `content/PUBLISHING-LOG.md` and the post registry. Two posts
targeting the same keyword compete with each other and both rank worse. Strengthen the
existing post instead.
