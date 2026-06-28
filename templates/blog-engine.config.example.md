# blog-engine.config.md

> This is the file the skill's `setup` step writes (a filled example is in
> `examples/intake-walkthrough.md`). It's the brain of your blog engine — every
> post the skill cooks reads from here. Keep it private (it's gitignored by
> default). Edit it anytime your offer, proof, or voice changes.

## Site
- **Brand:** Northwind Analytics
- **Domain:** https://www.northwindanalytics.com
- **Stack:** Next.js (App Router) — using the `blog-module` from seo-blog-engine
- **Booking link:** https://cal.com/northwind/intro
- **Offer / bridge page:** /platform

## ICP (who every post is for)
- **Who:** Heads of Data at Series B-D B2B SaaS companies (200-1000 employees)
- **Pain:** Their dashboards are slow, trusted by no one, and three teams keep
  reporting different numbers for the same metric.
- **Desired outcome:** One source of truth the exec team actually believes,
  without hiring four more analysts.
- **NOT for:** agencies, solo founders, pre-revenue startups.

## Voice fingerprint
- Plain, direct, a little dry. Short sentences. No hype.
- Writes like a practitioner talking to another practitioner.
- Uses concrete examples over abstraction. Occasional self-deprecating aside.
- Never uses: exclamation points, emoji, buzzwords, em dashes.
- Reference samples: `./voice-samples/` (3 LinkedIn posts + 1 internal memo)

## Proof bank (only use numbers from this list)
- Cut one customer's dashboard load time from 40s to under 2s. (public, named OK)
- Consolidated 6 conflicting revenue definitions into 1 for a 600-person SaaS.
  (anonymized — do not name the client)
- 4.8/5 across 30+ implementation reviews. (public)
- Founder spent 9 years building data infra at two scale-ups. (public, E-E-A-T)

## Offer + CTA
- **Primary action:** book a 20-minute fit call.
- **Secondary:** join the "Trusted Metrics" email list.
- **Lead magnet:** "The metric-definition audit" (1-page checklist).

## Topic sources
- Google Search Console export: `./gsc-queries.csv`
- Sales-call transcripts: `./transcripts/`
- Recurring buyer questions logged by the sales team.

## Internal pages to link
- /platform (the offer page / bridge)
- /blog/why-your-dashboards-are-slow
- /customers (case studies)

## Categories
- "Data Strategy"
- "Analytics Engineering"
- "Leadership"
