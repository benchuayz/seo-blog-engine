# blog-module

A drop-in, SEO + GEO blog subsystem for Next.js (App Router). Posts are typed
data objects, not MDX, so an LLM can generate a whole post in one shot and you
never fight JSX escaping. Structured data, sitemap, and AI-crawler rules are
wired in.

## Run it standalone (preview the examples)

```bash
cd blog-module
npm install
npm run dev
# open http://localhost:3000/blog
```

Then `npm run build` to confirm a clean production build.

## Make it yours

Edit **one file**: `src/lib/site.config.ts`. Set your domain, brand, author
identity (this powers your author schema / E-E-A-T), the page your CTAs funnel
to, your booking link, and your accent colour. Then run the skill's `setup`
step, which fills most of this in from your answers.

## Drop it into an existing Next.js site

Copy these into your project (keep the paths under `src/`):

- `src/lib/blog.ts`, `src/lib/schema.ts`, `src/lib/site.config.ts`, `src/lib/utm.ts`
- `src/components/BlogArticle.tsx`, `src/components/BlogEmailCapture.tsx`, `src/components/FAQ.tsx`, `src/components/JsonLd.tsx`
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/app/api/lead/route.ts` (only if you want the email-capture form)
- `src/content/blog/` (the registry + your posts)

If your project doesn't use the `@/*` path alias, either add it to your
`tsconfig.json` (`"paths": { "@/*": ["./src/*"] }`) or change the imports to
relative paths.

Requirements: Node 20.9+, Next.js App Router, React 19, Tailwind CSS v4. The styling assumes
a dark background (see `globals.css`); to go light, flip the two CSS variables
and adjust the `text-white/*` opacities in `BlogArticle.tsx`.

## How a post is structured

See `../docs/BLOG-FORMULA.md` for the full block reference and
`src/content/blog/example-founder-post.ts` for an annotated, working example.

## Where the SEO/GEO lives

- `src/lib/schema.ts` — per-post `@graph`: BlogPosting + BreadcrumbList + FAQPage (+ VideoObject)
- `src/app/blog/[slug]/page.tsx` — canonical URL, OG/Twitter metadata
- `src/components/FAQ.tsx` — visible FAQ that mirrors the FAQ schema word-for-word (the GEO trick)
- `src/app/sitemap.ts` / `src/app/robots.ts` — dynamic sitemap + AI-crawler allow-list

---

Blog engine by [Trueframe](https://www.trueframe.xyz) (Benjamin Chua). Want a
done-for-you content engine instead of building your own? Book a call at
[trueframe.xyz](https://www.trueframe.xyz).
