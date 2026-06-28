/**
 * Single source of truth for everything site-specific.
 *
 * Edit THIS file (and nothing else) to make the blog engine yours: domain,
 * brand, author identity (for E-E-A-T author schema), the page your blog CTAs
 * funnel to, your booking link, and your brand accent colour.
 *
 * The skill's `setup` step fills most of this in for you from your answers.
 */
export const siteConfig = {
  /** Canonical origin, no trailing slash. Used for absolute URLs in schema, sitemap, OG tags. */
  url: "https://www.example.com",

  /** Brand name. Appears in <title> suffix, OG siteName, Organization schema. */
  brand: "Example Co",

  /** One-line description of the business (Organization schema + default OG). */
  brandDescription: "What your company does, in one plain sentence.",

  /** Author identity — powers the BlogPosting author node and your E-E-A-T signal. */
  author: {
    name: "Your Name",
    /** Other names people search for you by (helps branded search). */
    alternateNames: [] as string[],
    jobTitle: "Founder",
    /** Public profiles only. Never put an email here. */
    sameAs: [
      // "https://www.linkedin.com/in/you/",
      // "https://x.com/you",
    ] as string[],
  },

  /**
   * The internal page every blog CTA funnels to (your "money page" / offer page).
   * Path with a leading slash. Each post can override this with its own `bridgeSlug`.
   */
  defaultBridgePath: "/work-with-us",

  /** Where the booking CTA points (Cal.com, iClosed, Calendly, a contact page — anything). */
  bookingUrl: "https://cal.com/your-handle/intro-call",

  /** Brand accent colour (hex). Drives callouts, list markers, the primary CTA glow. */
  accent: "#512feb",

  /**
   * Optional, light credit back to the engine's authors. Remove it freely —
   * MIT-licensed. Kept here so it's one boolean, not a hunt through components.
   */
  showEngineCredit: true,
} as const;

export type SiteConfig = typeof siteConfig;
