/**
 * JSON-LD schema builders for SEO + GEO.
 *
 * These return plain objects that <JsonLd> serialises into
 * <script type="application/ld+json"> tags in the server-rendered HTML, so
 * Google can build rich results and AI assistants (ChatGPT, Perplexity,
 * Claude) can read and cite your pages.
 *
 * Everything reads from siteConfig — you don't edit this file to rebrand.
 */
import { siteConfig } from "./site.config";

const SITE = siteConfig.url;

/** Stable @id anchors so Organization <-> Person nodes cross-link across pages. */
export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#author`;

export interface FaqItem {
  question: string;
  answer: string;
}

/** A YouTube embed resolved to a VideoObject (video rich results + GEO). */
export interface ArticleVideo {
  id: string;
  name: string;
  description: string;
  /** ISO 8601 date. */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT3M27S". */
  duration: string;
}

export interface ArticleSchemaInput {
  /** Blog slug without the /blog/ prefix. */
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 date. */
  datePublished: string;
  dateModified?: string;
  /** Breadcrumb leaf label. */
  breadcrumbLabel: string;
  faqs: FaqItem[];
  videos?: ArticleVideo[];
}

/** Seconds -> ISO 8601 duration, e.g. 695 -> "PT11M35S". */
export function isoDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}` || "PT0S";
}

/**
 * Build the per-post @graph: BlogPosting + BreadcrumbList + FAQPage (+ a
 * VideoObject per embedded video). author/publisher reference the sitewide
 * Person/Organization nodes (declared once in layout.tsx) by @id, so the
 * entity graph stays connected and every article inherits author E-E-A-T.
 */
export function buildArticleSchema(input: ArticleSchemaInput) {
  const pageUrl = `${SITE}/blog/${input.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      headline: input.title,
      description: input.description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      datePublished: input.datePublished,
      dateModified: input.dateModified ?? input.datePublished,
      author: { "@id": PERSON_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: input.breadcrumbLabel, item: pageUrl },
      ],
    },
  ];

  if (input.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: input.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  for (const v of input.videos ?? []) {
    graph.push({
      "@type": "VideoObject",
      name: v.name,
      description: v.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      uploadDate: v.uploadDate,
      duration: v.duration,
      contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
      publisher: { "@id": ORG_ID },
      author: { "@id": PERSON_ID },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Sitewide Organization node. Declared once in layout.tsx, referenced by @id everywhere. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: siteConfig.brand,
  description: siteConfig.brandDescription,
  url: SITE,
};

/**
 * Sitewide Person node for the author. Powers branded search, E-E-A-T author
 * signals, and an eventual Google Knowledge Panel. No email per policy.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.author.name,
  ...(siteConfig.author.alternateNames.length
    ? { alternateName: siteConfig.author.alternateNames }
    : {}),
  jobTitle: siteConfig.author.jobTitle,
  worksFor: { "@id": ORG_ID },
  ...(siteConfig.author.sameAs.length ? { sameAs: siteConfig.author.sameAs } : {}),
};
