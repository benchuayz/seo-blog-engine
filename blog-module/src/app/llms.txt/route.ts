import { BLOG_POSTS } from "@/content/blog";
import { siteConfig } from "@/lib/site.config";

/**
 * /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org).
 * Generated from the post registry, so new posts show up automatically.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = BLOG_POSTS.map(
    (p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}): ${p.description}`,
  ).join("\n");

  const body = `# ${siteConfig.brand}

> ${siteConfig.brandDescription}

## Work with us
- [Offer](${siteConfig.url}${siteConfig.defaultBridgePath})
- [Book a call](${siteConfig.bookingUrl})

## Blog
${posts}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
