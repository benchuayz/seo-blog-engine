import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { siteConfig } from "@/lib/site.config";

const SITE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
