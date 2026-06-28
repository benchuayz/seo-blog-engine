import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import BlogArticle from "@/components/BlogArticle";
import { BLOG_POSTS, getPostBySlug } from "@/content/blog";
import { buildArticleSchema, isoDuration, type ArticleVideo } from "@/lib/schema";
import { postUtm } from "@/lib/utm";
import { siteConfig } from "@/lib/site.config";

// Only slugs in the registry are valid routes; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonical = `${siteConfig.url}/blog/${post.slug}`;
  const title = `${post.metaTitle} | ${siteConfig.brand}`;
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: post.description,
      url: canonical,
      siteName: siteConfig.brand,
      type: "article",
      locale: "en_US",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
    twitter: { card: "summary_large_image", title, description: post.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const utm = postUtm(post.slug);

  // Any youtube block carrying metadata becomes a VideoObject in the schema
  // (video rich results + a citable source for AI assistants).
  const videos: ArticleVideo[] = post.blocks.flatMap((b) =>
    b.type === "youtube" && b.title && b.uploadDate && b.durationSeconds
      ? [{
          id: b.videoId,
          name: b.title,
          description: b.caption ?? b.title,
          uploadDate: b.uploadDate,
          duration: isoDuration(b.durationSeconds),
        }]
      : []
  );

  const schema = buildArticleSchema({
    slug: post.slug,
    title: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    breadcrumbLabel: post.metaTitle,
    faqs: post.faqs,
    videos,
  });

  return (
    <>
      <JsonLd data={schema} />
      <BlogArticle post={post} utm={utm} />
      <FAQ items={post.faqs} />
    </>
  );
}
