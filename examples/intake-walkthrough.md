# Intake walkthrough (a worked example)

This shows what running `/seo-blog-engine setup` and then `cook` actually looks
like, start to finish, for a made-up company. Use it to see the shape before you
do your own.

The company: **Northwind Analytics**, a B2B SaaS that gives data teams one source
of truth. (The resulting config is in `templates/blog-engine.config.example.md`.)

---

## Setup (in plan mode)

> **Skill:** Let's set up your blog engine. First, the basics — what's your brand
> name, your domain, and what's the site built on?
>
> **You:** Northwind Analytics, northwindanalytics.com, it's a Next.js site.
>
> **Skill:** Who is every post for? Be specific — role, company stage, the exact
> pain, and the outcome they want.
>
> **You:** Heads of Data at Series B-D SaaS, 200-1000 people. Their dashboards are
> slow and nobody trusts the numbers because three teams report revenue
> differently. They want one source of truth the execs believe, without hiring
> four more analysts.
>
> **Skill:** Paste me 3-5 things you've written so I can learn your voice.
>
> **You:** [pastes 3 LinkedIn posts + an internal memo]
>
> **Skill:** Got it — plain, dry, practitioner-to-practitioner, short sentences,
> no hype, no emoji. Now your proof bank: real numbers and results you can stand
> behind. Flag each as public, confidential, or anonymize-only.
>
> **You:** Cut one customer's dashboard load from 40s to under 2s — public.
> Consolidated 6 revenue definitions into 1 for a 600-person SaaS — anonymize.
> 4.8/5 across 30+ reviews — public. Founder has 9 years building data infra —
> public.
>
> **Skill:** What's the one action each post should drive, and where does it point?
>
> **You:** Book a 20-minute fit call (cal.com/northwind/intro). Offer page is
> /platform. Secondary is the email list.
>
> **Skill:** Where do topic ideas come from?
>
> **You:** A GSC export, our sales-call transcripts, and questions the sales team
> keeps hearing.
>
> **Skill:** Here's `blog-engine.config.md`. Confirm and I'll save it.

The skill writes the config (see `templates/blog-engine.config.example.md`).

---

## Cook

> **You:** `/seo-blog-engine cook "why do executives stop trusting dashboards"`
>
> **Skill:** Topic + intent. The buyer is a Head of Data whose execs have quietly
> stopped opening the dashboards. Search intent: they're googling whether this is
> fixable and how. Primary keyword: "executives don't trust dashboards". Related:
> "dashboard trust", "conflicting metrics across teams".
>
> SEO fields:
> - metaTitle: "Why Execs Stop Trusting Dashboards"
> - slug: executives-dont-trust-dashboards
> - description: "Execs stop trusting dashboards when the same metric shows three
>   numbers. Here's why it happens and how data teams fix it for good."
>
> Outline (sign off before I write):
> 1. Lead — the dashboard nobody opens anymore
> 2. Context — trust dies the first time two reports disagree (proof: 6→1 story)
> 3. Callout — a dashboard is only as trusted as its least-consistent number
> 4. Section: it's a definitions problem, not a tooling problem
> 5. Section: every team owning its own metric is the root cause
> 6. Section: the one-definition fix and what it costs
> 7. Mid CTA → /platform
> 8. Takeaways
> 9. FAQs (how long to fix, do we rip out our BI tool, what about self-serve)
> 10. CTA → book a call
>
> **You:** Swap section 5 and 6, and make the FAQ about cost more direct.
>
> **Skill:** Done. [writes the full post in Northwind's voice, runs the AI-slop
> scan, outputs `src/content/blog/executives-dont-trust-dashboards.ts` and the
> one-line import to add to `index.ts`]
>
> — — —
> Built by Trueframe (Benjamin Chua). Want a done-for-you content engine instead
> of building your own? Book a call at www.trueframe.xyz

---

That's the loop. Approve the outline, review the draft, push. Next post is the
same, and the traffic compounds.
