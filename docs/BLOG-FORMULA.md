# The blog formula + block reference

## The shape every post takes

```
1.  Lead          one or two lines naming the real problem
2.  Context       why it matters, who it's for — front-load proof here
3.  Callout       the one-line thesis, set apart
4.  Sections      3-6 numbered sections. One point each. Each answers an objection.
                  Headings read like things a person would actually say.
5.  Resource      (optional) a lead-magnet card mid-post
6.  Mid CTA       bridges to your offer page, UTM-tagged
7.  Proof         a specific result/story/example — real numbers only
8.  Takeaways     "the short version" recap box
9.  FAQs          4-6 real buyer questions (visible + FAQPage schema)
10. CTA           the single next step
```

A working, annotated version of this is
`blog-module/src/content/blog/example-founder-post.ts`. Read it alongside this doc.

## Length

Aim for what the question deserves, usually 1,200-2,500 words. Long enough to be
the best answer, short enough that every paragraph earns its place. Reading time
is auto-estimated at ~225 wpm.

## The blocks

Every post is a `BlogPost` object (see `blog-module/src/lib/blog.ts`) with a
`blocks: BlogBlock[]` array. Here is every block type.

### Text
```ts
{ type: "lead", text: "Larger opening paragraph." }
{ type: "p", text: "A normal paragraph." }
{ type: "h2", text: "A major section heading" }
{ type: "h3", text: "A sub-heading" }
{ type: "ul", items: ["point", "point"] }
{ type: "ol", items: ["step", "step"] }
```

### Emphasis
```ts
{ type: "callout", text: "The one-line thesis, in an accent box." }
{ type: "quote", text: "A pull quote.", cite: "Who said it" }
{ type: "takeaways", heading: "The short version", items: ["recap", "recap"] }
```

### CTAs
```ts
// Bridges to the post's offer page (bridgeSlug) and inherits the shared mid-post
// copy when it's the FIRST cta in the post. Give it a buttonLabel.
{ type: "cta", heading: "", buttonLabel: "See how it works" }

// Points at a specific internal page; keeps its own copy.
{ type: "cta", heading: "Get the playbook", buttonLabel: "Read it", href: "/playbook" }

// Urgent red variant.
{ type: "cta", heading: "Doors close Friday", buttonLabel: "Join now", href: "/cohort", accent: "red" }

// Straight to your booking link (siteConfig.bookingUrl).
{ type: "bookingCta", heading: "Want this run for you?", body: "…", buttonLabel: "Book a call" }
```

### Media
```ts
// YouTube. Add title/uploadDate/durationSeconds to ALSO emit VideoObject schema
// (video rich results + a citable source for AI assistants).
{ type: "youtube", videoId: "abc123", caption: "The 3-minute version",
  title: "Why founder content fails", uploadDate: "2026-01-10", durationSeconds: 212 }

{ type: "youtube", videoId: "abc123", vertical: true }   // 9:16 phone frame
{ type: "video", src: "/clips/demo.mp4", caption: "…", originalUrl: "https://…" }
{ type: "instagram", url: "https://www.instagram.com/reel/XXXX", caption: "…" }
{ type: "tiktok", videoId: "7300000000000000000", caption: "…" }
{ type: "image", src: "/proof/insights.png", alt: "Analytics screenshot",
  width: 1200, height: 800, caption: "…", wide: true }
{ type: "imageGrid", heading: "Before / after", images: [{ src: "/a.jpg", alt: "…" }] }
```

### Conversion + linking
```ts
// Inline email capture — posts to /api/lead. `resource` tags the offer.
{ type: "emailCapture", heading: "Want the checklist?", body: "…",
  buttonLabel: "Email it to me", resource: "Founder Checklist", accent: "brand" }

// Internal lead-magnet / resource card (UTM-carried).
{ type: "resource", href: "/hooks", eyebrow: "Free resource",
  title: "100+ hooks", description: "…", buttonLabel: "Get them free" }

// External reference (opens in a new tab).
{ type: "linkcard", href: "https://…", source: "Source name", title: "…", description: "…" }

// Internal cross-links (SEO + GEO internal linking).
{ type: "related", heading: "Keep reading", links: [{ href: "/blog/x", label: "Post title" }] }
```

### Script block (before/after, scripts)
```ts
// [brackets] render as highlighted fill-ins; a line all in (parens) is a dim direction.
{ type: "scriptCard", label: "Before → after", lines: [
  "Before: In this clip I talk about [topic].",
  "After: The [number]-minute habit that [outcome].",
  "(Same clip. The second one tells the viewer what they get.)",
] }
```

## The required metadata fields

```ts
slug          // keyword-rich, hyphenated, stable once published
title         // the H1
metaTitle     // ~48 chars + brand suffix, keyword near the front
description   // ~150-160 chars, earns the click
dek           // standfirst under the H1
datePublished // ISO date
category      // groups posts on the index
bridgeSlug    // offer page this post funnels to (optional; falls back to default)
faqs          // 4-6 real buyer Q&A — visible AND FAQPage schema
blocks        // the body
```

## Adding a new block type

Add it to the `BlogBlock` union in `blog-module/src/lib/blog.ts`, handle it in the
`switch` in `BlogArticle.tsx`, and add its text to `blockText()` so reading time
stays accurate. That's the whole contract.
