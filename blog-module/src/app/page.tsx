import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

/** A bare home page so the demo runs. Replace with your real homepage, or
 *  redirect "/" to "/blog" if this engine is your whole site. */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
      <p className="text-sm uppercase tracking-[0.2em] text-white/40">{siteConfig.brand}</p>
      <h1 className="mt-4 text-4xl font-normal tracking-tight text-white">SEO blog engine</h1>
      <p className="mt-4 text-lg font-light leading-relaxed text-white/60">
        A starter blog wired for SEO and GEO. Read the examples, then run the skill to cook your own.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex h-11 w-fit items-center rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-105"
      >
        Read the blog
      </Link>
    </main>
  );
}
