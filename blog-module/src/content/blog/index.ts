/**
 * The blog registry. This is the single source of truth: add a post object,
 * import it here, and it automatically gets a /blog/[slug] route, an entry on
 * the blog index, a row in sitemap.xml, and its JSON-LD schema. Nothing else
 * to wire up.
 */
import type { BlogPost } from "@/lib/blog";
import { exampleFounderPost } from "./example-founder-post";
import { exampleCoachPost } from "./example-coach-post";

/** Newest first. The skill appends new posts to this list. */
export const BLOG_POSTS: BlogPost[] = [exampleCoachPost, exampleFounderPost];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** All distinct categories, in first-seen order (used by the blog index). */
export function getCategories(): string[] {
  const seen = new Set<string>();
  for (const p of BLOG_POSTS) seen.add(p.category);
  return [...seen];
}
