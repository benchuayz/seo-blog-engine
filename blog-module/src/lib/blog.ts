/**
 * Blog content model.
 *
 * Posts are authored as typed DATA (a small `BlogPost` object + an array of
 * content blocks) under src/content/blog/, then rendered by <BlogArticle>.
 *
 * Why blocks instead of MDX:
 *  - All prose lives in plain JS strings, so you never fight JSX escaping of
 *    apostrophes/quotes, and an LLM can generate a whole post as one object.
 *  - The CTA bridges, internal links, and structured data stay fully under
 *    your control instead of being scattered through markdown.
 *
 * This is the contract the skill writes to. Add a block type here, handle it
 * in BlogArticle.tsx, and every post can use it.
 */
import type { FaqItem } from "./schema";

export type BlogBlock =
  /** Larger intro paragraph — the opening line that frames the whole post. */
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** Highlighted insight box (accent left rule). Use for the one-line thesis. */
  | { type: "callout"; text: string }
  | { type: "quote"; text: string; cite?: string }
  /** "The short version" recap box near the end. */
  | { type: "takeaways"; heading?: string; items: string[] }
  /**
   * Inline CTA card. With no `href` it bridges to the post's `bridgeSlug`
   * (your offer page), carrying UTM. Set `href` to point at a specific page.
   * `accent: "red"` renders an urgent red variant instead of the brand colour.
   */
  | {
      type: "cta";
      heading: string;
      body?: string;
      buttonLabel: string;
      href?: string;
      accent?: "red";
    }
  /** CTA that points straight at your booking link (siteConfig.bookingUrl). */
  | { type: "bookingCta"; heading: string; body?: string; buttonLabel: string }
  /**
   * Embedded YouTube video. Pass title/uploadDate/durationSeconds to also emit
   * a VideoObject in the page schema (video rich results + GEO citations).
   */
  | {
      type: "youtube";
      videoId: string;
      caption?: string;
      title?: string;
      /** ISO date, e.g. "2026-03-01". */
      uploadDate?: string;
      durationSeconds?: number;
      /** Render as a 9:16 phone frame instead of 16:9. */
      vertical?: boolean;
    }
  /** Self-hosted mp4 (e.g. /videos/clip.mp4) with optional source attribution. */
  | { type: "video"; src: string; caption?: string; originalUrl?: string; originalLabel?: string }
  /** Embedded Instagram reel/post via the official iframe embed. */
  | { type: "instagram"; url: string; caption?: string }
  /** Embedded TikTok video via the official v2 iframe embed. */
  | { type: "tiktok"; videoId: string; caption?: string }
  /** Inline image from /public (e.g. an analytics screenshot used as proof). */
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      /** Render wider than the default narrow column (e.g. a labelled diagram). */
      wide?: boolean;
    }
  /**
   * Script block. Each entry is one line; any [bracketed] segment renders as a
   * highlighted fill-in-the-blank, and a line wrapped entirely in (parens)
   * renders as a dim stage direction. Great for before/after script pairs.
   */
  | { type: "scriptCard"; label?: string; lines: string[] }
  /** Responsive grid of images, e.g. a before/after reference gallery. */
  | { type: "imageGrid"; heading?: string; caption?: string; images: { src: string; alt: string }[] }
  /**
   * Inline email-capture card. Posts to /api/lead (see docs/MEASUREMENT.md).
   * `resource` tags which offer they opted into.
   */
  | {
      type: "emailCapture";
      heading: string;
      body?: string;
      buttonLabel?: string;
      resource: string;
      successMessage?: string;
      accent?: "red" | "brand";
    }
  /** Internal resource / lead-magnet link card (href starts with "/"; UTM-carried). */
  | {
      type: "resource";
      href: string;
      eyebrow?: string;
      title: string;
      description: string;
      buttonLabel?: string;
    }
  /** External reference card (opens in a new tab). */
  | {
      type: "linkcard";
      href: string;
      source: string;
      title: string;
      description?: string;
    }
  /** Internal cross-links to related posts/pages (SEO + GEO internal linking). */
  | { type: "related"; heading?: string; links: { href: string; label: string }[] };

export interface BlogPost {
  /** URL slug under /blog/. Keep it keyword-rich and stable once published. */
  slug: string;
  /** H1 (no hard length limit). */
  title: string;
  /** <title> text — aim for ~48 chars before the " | {brand}" suffix. */
  metaTitle: string;
  /** Meta description, ~150-160 chars. The search-result snippet. */
  description: string;
  /** Standfirst shown under the H1. */
  dek: string;
  /** ISO date, e.g. "2026-06-01". */
  datePublished: string;
  /** Set when genuinely revised — renders "Updated …" and feeds a freshness signal. */
  dateModified?: string;
  /** Optional manual override; otherwise read time is estimated from content. */
  readMinutes?: number;
  category: string;
  /** Internal note: the source idea this reuses. Not rendered. */
  hookIdea?: string;
  /** Offer page this post funnels to (no leading slash). Falls back to siteConfig.defaultBridgePath. */
  bridgeSlug?: string;
  /** Suppress the default end-of-post booking module (for single-offer posts). */
  suppressDefaultBookingCta?: boolean;
  /** 4-6 real buyer questions. Feeds the visible FAQ AND the FAQPage schema. */
  faqs: FaqItem[];
  blocks: BlogBlock[];
}

/** All reader-visible text in a single block, for word-counting. */
function blockText(b: BlogBlock): string {
  switch (b.type) {
    case "lead":
    case "p":
    case "h2":
    case "h3":
    case "callout":
      return b.text;
    case "quote":
      return `${b.text} ${b.cite ?? ""}`;
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "takeaways":
      return `${b.heading ?? ""} ${b.items.join(" ")}`;
    case "cta":
    case "bookingCta":
      return `${b.heading} ${b.body ?? ""} ${b.buttonLabel}`;
    case "resource":
      return `${b.eyebrow ?? ""} ${b.title} ${b.description} ${b.buttonLabel ?? ""}`;
    case "linkcard":
      return `${b.source} ${b.title} ${b.description ?? ""}`;
    case "youtube":
    case "video":
    case "instagram":
    case "tiktok":
    case "image":
      return b.caption ?? "";
    case "scriptCard":
      return `${b.label ?? ""} ${b.lines.join(" ")}`;
    case "imageGrid":
      return `${b.heading ?? ""} ${b.caption ?? ""}`;
    case "emailCapture":
      return `${b.heading} ${b.body ?? ""} ${b.buttonLabel ?? ""}`;
    case "related":
      return `${b.heading ?? ""} ${b.links.map((l) => l.label).join(" ")}`;
    default:
      return "";
  }
}

/**
 * Reading time in minutes. Uses readMinutes when set, otherwise estimates from
 * the full word count (dek + blocks + FAQs) at ~225 wpm. Floored at 2.
 */
export function readingMinutes(post: BlogPost): number {
  if (post.readMinutes) return post.readMinutes;
  const text = [
    post.dek,
    ...post.blocks.map(blockText),
    ...post.faqs.map((f) => `${f.question} ${f.answer}`),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 225));
}
