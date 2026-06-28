/**
 * UTM helpers. Every internal CTA carries utm_campaign = the post slug, so when
 * a reader books a call or opts in, you can see which post drove it. The default
 * tagging is utm_source=organic, utm_medium=seo — adjust to taste.
 */

/** Append UTM params to an internal href (leaves external/absolute URLs untouched). */
export function buildUtmHref(href: string, utmParams?: Record<string, string>): string {
  if (!href.startsWith("/") || !utmParams) return href;
  const [path, existing] = href.split("?");
  const params = new URLSearchParams(existing);
  for (const [k, v] of Object.entries(utmParams)) {
    if (v) params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** Default UTM set for a post's internal links. */
export function postUtm(slug: string): Record<string, string> {
  return { utm_source: "organic", utm_medium: "seo", utm_campaign: slug };
}
