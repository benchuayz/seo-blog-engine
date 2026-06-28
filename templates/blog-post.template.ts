import type { BlogPost } from "@/lib/blog";

/**
 * Empty post skeleton. Clone this to src/content/blog/<slug>.ts, fill it in,
 * then add it to src/content/blog/index.ts. (The skill does all of this for
 * you — this is here for when you want to write one by hand.)
 *
 * Full block reference: docs/BLOG-FORMULA.md
 */
export const yourPostName: BlogPost = {
  slug: "your-keyword-rich-slug",
  title: "The Full H1 Headline (no length limit)",
  metaTitle: "Short Title With Keyword", // ~48 chars before the brand suffix
  description: "150-160 chars that earn the click in a search result.", // the snippet
  dek: "One or two lines under the H1 that frame why this matters and who it's for.",
  datePublished: "2026-01-01",
  // dateModified: "2026-03-01", // set only when genuinely revised
  category: "Your Category",
  bridgeSlug: "your-offer-page", // omit to use siteConfig.defaultBridgePath
  faqs: [
    { question: "A question your buyer actually types into search?", answer: "A direct, self-contained answer in 2-4 sentences." },
    { question: "Another real buyer question?", answer: "Another clear answer." },
    // 4-6 total. These render visibly AND become FAQPage schema.
  ],
  blocks: [
    { type: "lead", text: "Open by naming the real problem in one or two lines." },
    { type: "p", text: "Context: why it matters, who it's for. Front-load proof here." },
    { type: "callout", text: "The one-line thesis of the whole post." },

    { type: "h2", text: "1. First point (reads like something a person would say)" },
    { type: "p", text: "Make the point. Answer the objection a skeptic would raise." },

    { type: "h2", text: "2. Second point" },
    { type: "p", text: "…" },

    // Mid-post CTA. With no href it bridges to your offer page and inherits the
    // shared empathy copy. Give it a buttonLabel.
    { type: "cta", heading: "", buttonLabel: "See how it works" },

    { type: "h2", text: "3. Third point" },
    { type: "p", text: "…" },

    { type: "takeaways", heading: "The short version", items: [
      "One-line recap of point 1.",
      "One-line recap of point 2.",
      "One-line recap of point 3.",
    ] },

    { type: "related", heading: "Keep reading", links: [
      { href: "/blog/another-post", label: "Another relevant post title" },
    ] },
  ],
};
