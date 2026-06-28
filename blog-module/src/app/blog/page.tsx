import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, getCategories } from "@/content/blog";
import { readingMinutes } from "@/lib/blog";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing from ${siteConfig.brand}.`,
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogIndexPage() {
  const categories = getCategories();
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-white">Blog</h1>
      <p className="mt-3 text-lg font-light text-white/60">Writing from {siteConfig.brand}.</p>

      {categories.map((category) => (
        <section key={category} className="mt-12">
          <h2 className="mb-5 text-xs uppercase tracking-[0.18em]" style={{ color: siteConfig.accent }}>
            {category}
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {BLOG_POSTS.filter((p) => p.category === category).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-5">
                <h3 className="text-lg md:text-xl font-normal text-white transition-colors group-hover:text-white/80">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-white/55">{post.dek}</p>
                <span className="mt-2 block text-xs text-white/35">{readingMinutes(post)} min read</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
