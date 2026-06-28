import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

/**
 * Explicitly welcome the AI crawlers. This is the GEO half of the strategy:
 * if you want ChatGPT, Perplexity, Claude, and Google's AI answers to cite
 * your posts, you have to let their bots read you. Allow-list them by name.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bytespider",
    "Meta-ExternalAgent",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
