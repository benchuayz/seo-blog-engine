import Link from "next/link";
import { readingMinutes, type BlogBlock, type BlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site.config";
import { buildUtmHref } from "@/lib/utm";
import BlogEmailCapture from "@/components/BlogEmailCapture";

/**
 * <BlogArticle> renders a BlogPost (typed blocks) into a finished article:
 * breadcrumb, byline, author intro, the block flow, the default booking CTA,
 * and a sitewide newsletter capture. Styling is Tailwind + the single accent
 * colour from siteConfig (applied inline so one hex themes the whole thing).
 *
 * It is intentionally self-contained — drop this file + lib/ + the page route
 * into any Next.js App Router site and it works.
 */

const accent = siteConfig.accent;

/** Empathy-led mid-post CTA copy. The FIRST plain `cta` block inherits this so
 *  the mid-article ask stays consistent across every post. Edit to your voice. */
const MID_CTA = {
  heading: "Want this handled for you?",
  body: "Doing it yourself works until it doesn't. If you'd rather have the whole engine run without you, that's the part we take off your plate.",
};

function bridgePath(post: BlogPost): string {
  return post.bridgeSlug ? `/${post.bridgeSlug}` : siteConfig.defaultBridgePath;
}

function internalHref(href: string, utm?: Record<string, string>) {
  return href.startsWith("/") ? buildUtmHref(href, utm) : href;
}

function BlogCta({
  heading,
  body,
  buttonLabel,
  href,
  isRed,
}: {
  heading: string;
  body?: string;
  buttonLabel: string;
  href: string;
  isRed?: boolean;
}) {
  const glow = isRed ? "#dc2626" : accent;
  const isExternal = !href.startsWith("/");
  const btnStyle = isRed
    ? { backgroundColor: "#dc2626", color: "#fff" }
    : { backgroundColor: "#fff", color: "#000" };
  return (
    <div className="relative my-12 overflow-hidden rounded-2xl border border-white/10 bg-[#070707] p-7 md:p-9">
      <div
        className="pointer-events-none absolute -top-16 -right-12 h-64 w-64 rounded-full blur-[90px]"
        style={{ backgroundColor: `${glow}26` }}
      />
      <div className="relative">
        <h3 className="mb-3 text-xl md:text-2xl font-normal tracking-tight text-white">{heading}</h3>
        {body ? (
          <p className="mb-6 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/60">
            {body}
          </p>
        ) : null}
        <a
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-transform hover:scale-105"
          style={btnStyle}
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}

/** One script line: (parens) = dim stage direction, [brackets] = highlighted fill-in. */
function ScriptLine({ line }: { line: string }) {
  if (/^\s*\(.*\)\s*$/.test(line)) {
    return <span className="italic text-white/35">{line}</span>;
  }
  const parts = line.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, k) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={k} className="font-medium" style={{ color: accent }}>
            {part}
          </span>
        ) : (
          <span key={k}>{part}</span>
        )
      )}
    </>
  );
}

function BlockView({
  block,
  post,
  utm,
  isMidCta,
}: {
  block: BlogBlock;
  post: BlogPost;
  utm?: Record<string, string>;
  isMidCta?: boolean;
}) {
  switch (block.type) {
    case "lead":
      return <p className="mb-6 text-lg md:text-xl font-light leading-relaxed text-white/85">{block.text}</p>;
    case "p":
      return <p className="mb-5 text-base md:text-[17px] font-light leading-[1.75] text-white/70">{block.text}</p>;
    case "h2":
      return <h2 className="mt-14 mb-4 scroll-mt-20 text-2xl md:text-3xl font-normal leading-snug tracking-tight text-white">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 text-lg md:text-xl font-medium tracking-tight text-white/90">{block.text}</h3>;
    case "ul":
      return (
        <ul className="my-6 list-disc space-y-2.5 pl-5 text-base md:text-[17px] font-light text-white/70 marker:text-white/40">
          {block.items.map((item, j) => (
            <li key={j} className="pl-1 leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-6 list-decimal space-y-2.5 pl-5 text-base md:text-[17px] font-light text-white/70">
          {block.items.map((item, j) => (
            <li key={j} className="pl-1 leading-relaxed">{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="my-8 rounded-2xl border-l-2 bg-[#0a0a0a] p-5 md:p-6" style={{ borderColor: accent }}>
          <p className="text-lg md:text-xl font-light leading-relaxed text-white/90">{block.text}</p>
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-white/20 pl-5 md:pl-6">
          <p className="text-lg md:text-xl font-light italic leading-relaxed text-white/80">{block.text}</p>
          {block.cite ? <cite className="mt-3 block text-sm not-italic text-white/40">{block.cite}</cite> : null}
        </blockquote>
      );
    case "takeaways":
      return (
        <div className="my-12 rounded-2xl border border-white/10 bg-[#070707] p-6 md:p-8">
          <h3 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">{block.heading ?? "The short version"}</h3>
          <ul className="list-disc space-y-2.5 pl-5 text-base font-light text-white/75">
            {block.items.map((item, j) => <li key={j} className="pl-1 leading-relaxed">{item}</li>)}
          </ul>
        </div>
      );
    case "cta": {
      const useMid = isMidCta && !block.href;
      const href = block.href ? internalHref(block.href, utm) : buildUtmHref(bridgePath(post), utm);
      return (
        <BlogCta
          heading={useMid ? MID_CTA.heading : block.heading}
          body={useMid ? MID_CTA.body : block.body}
          buttonLabel={block.buttonLabel}
          href={href}
          isRed={block.accent === "red"}
        />
      );
    }
    case "bookingCta":
      return (
        <BlogCta heading={block.heading} body={block.body} buttonLabel={block.buttonLabel} href={siteConfig.bookingUrl} />
      );
    case "youtube":
      return (
        <figure className="my-10">
          <div className={block.vertical
            ? "relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black"
            : "relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${block.videoId}`}
              title={block.title ?? "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          {block.caption ? <figcaption className="mt-3 text-center text-sm text-white/40">{block.caption}</figcaption> : null}
        </figure>
      );
    case "video":
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line */}
          <video controls playsInline preload="metadata" className="mx-auto w-full max-w-[360px] rounded-2xl border border-white/10 bg-black" src={block.src} />
          {block.caption || block.originalUrl ? (
            <figcaption className="mt-3 text-center text-sm text-white/40">
              {block.caption}
              {block.originalUrl ? (
                <>
                  {block.caption ? " · " : null}
                  <a href={block.originalUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">
                    {block.originalLabel ?? "Watch the original"}
                  </a>
                </>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      );
    case "image":
      return (
        <figure className="my-10">
          {/* Plain <img> keeps the module drop-in with zero next/image remote config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            className={block.wide
              ? "mx-auto h-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white"
              : "mx-auto h-auto w-full max-w-[340px] rounded-2xl border border-white/10 bg-black"}
          />
          {block.caption ? <figcaption className="mt-3 text-center text-sm text-white/40">{block.caption}</figcaption> : null}
        </figure>
      );
    case "scriptCard":
      return (
        <figure className="my-8 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 md:p-7">
          {block.label ? <div className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">{block.label}</div> : null}
          <div className="space-y-3 text-base md:text-[17px] font-light leading-relaxed text-white/85">
            {block.lines.map((line, j) => <p key={j}><ScriptLine line={line} /></p>)}
          </div>
        </figure>
      );
    case "imageGrid":
      return (
        <figure className="my-10">
          {block.heading ? <div className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">{block.heading}</div> : null}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {block.images.map((img, j) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={j} src={img.src} alt={img.alt} className="aspect-[3/4] h-full w-full rounded-xl border border-white/10 bg-black object-cover object-top" />
            ))}
          </div>
          {block.caption ? <figcaption className="mt-3 text-center text-sm text-white/40">{block.caption}</figcaption> : null}
        </figure>
      );
    case "emailCapture":
      return (
        <BlogEmailCapture
          heading={block.heading}
          body={block.body}
          buttonLabel={block.buttonLabel}
          resource={block.resource}
          successMessage={block.successMessage}
          accent={block.accent}
        />
      );
    case "instagram":
      return (
        <figure className="my-10">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black">
            <iframe className="absolute inset-0 h-full w-full" src={`${block.url.replace(/\/$/, "")}/embed/`} title="Instagram" loading="lazy" allowFullScreen />
          </div>
          {block.caption ? <figcaption className="mt-3 text-center text-sm text-white/40">{block.caption}</figcaption> : null}
        </figure>
      );
    case "tiktok":
      return (
        <figure className="my-10">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black">
            <iframe className="absolute inset-0 h-full w-full" src={`https://www.tiktok.com/embed/v2/${block.videoId}`} title="TikTok" loading="lazy" allowFullScreen />
          </div>
          {block.caption ? <figcaption className="mt-3 text-center text-sm text-white/40">{block.caption}</figcaption> : null}
        </figure>
      );
    case "resource":
      return (
        <a href={internalHref(block.href, utm)} className="group my-8 block rounded-2xl border border-white/10 bg-[#070707] p-6 transition-colors hover:border-white/30">
          {block.eyebrow ? <div className="mb-2 text-xs uppercase tracking-[0.18em]" style={{ color: accent }}>{block.eyebrow}</div> : null}
          <div className="text-lg font-normal text-white">{block.title}</div>
          <p className="mt-1.5 text-sm font-light leading-relaxed text-white/55">{block.description}</p>
          <span className="mt-3 inline-block text-sm text-white/70 transition-colors group-hover:text-white">{block.buttonLabel ?? "Get it free"}</span>
        </a>
      );
    case "linkcard":
      return (
        <a href={block.href} target="_blank" rel="noopener noreferrer" className="group my-8 block rounded-2xl border border-white/10 bg-[#070707] p-6 transition-colors hover:border-white/25">
          <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/40">{block.source}</div>
          <div className="text-base md:text-lg font-normal text-white">{block.title}</div>
          {block.description ? <p className="mt-1.5 text-sm font-light leading-relaxed text-white/55">{block.description}</p> : null}
        </a>
      );
    case "related":
      return (
        <div className="my-10 rounded-2xl border border-white/10 bg-[#050505] p-6">
          <h3 className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">{block.heading ?? "Keep reading"}</h3>
          <ul className="space-y-2.5">
            {block.links.map((l, j) => (
              <li key={j}>
                <a href={internalHref(l.href, utm)} className="text-base font-light text-white/75 transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

function AuthorIntro() {
  return (
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#070707] p-4">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        {siteConfig.author.name.slice(0, 1)}
      </div>
      <div className="text-sm text-white/60">
        <span className="text-white/85">{siteConfig.author.name}</span>, {siteConfig.author.jobTitle} at {siteConfig.brand}
      </div>
    </div>
  );
}

export default function BlogArticle({
  post,
  utm,
}: {
  post: BlogPost;
  utm?: Record<string, string>;
}) {
  const dateLabel = new Date(post.datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const showUpdated =
    !!post.dateModified && post.dateModified.slice(0, 10) !== post.datePublished.slice(0, 10);
  const updatedLabel = post.dateModified
    ? new Date(post.dateModified).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;
  const firstCtaIndex = post.blocks.findIndex((b) => b.type === "cta");

  return (
    <article className="pt-12 pb-10">
      <div className="mx-auto max-w-3xl px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/40">
          <Link href="/" className="transition-colors hover:text-white/70">{siteConfig.brand}</Link>
          <span aria-hidden>/</span>
          <Link href="/blog" className="transition-colors hover:text-white/70">Blog</Link>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
          <span style={{ color: accent }}>{post.category}</span>
          <span>·</span>
          <span>{dateLabel}</span>
          {showUpdated && (<><span>·</span><span>Updated {updatedLabel}</span></>)}
          <span>·</span>
          <span>{readingMinutes(post)} min read</span>
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-white">
          {post.title}
        </h1>
        <p className="mt-5 text-lg font-light leading-relaxed text-white/65">{post.dek}</p>

        <AuthorIntro />

        <div className="mt-10 border-t border-white/5 pt-10">
          {post.blocks.map((block, i) => (
            <BlockView
              key={`${block.type}-${i}`}
              block={block}
              post={post}
              utm={utm}
              isMidCta={i === firstCtaIndex}
            />
          ))}
        </div>

        {!post.suppressDefaultBookingCta && (
          <BlogCta
            heading="Want to talk it through?"
            body={`See if ${siteConfig.brand} is a fit. Book a quick call and we'll map it to your situation.`}
            buttonLabel="Book a call"
            href={siteConfig.bookingUrl}
          />
        )}

        <BlogEmailCapture
          heading="Don't miss the next one"
          body="Some of what we share is time-sensitive. Drop your email and we'll send the next one the moment it's worth your time."
          buttonLabel="Keep me posted"
          resource="Blog Newsletter"
          successMessage="You're in. We'll email you when the next one drops."
        />
      </div>
    </article>
  );
}
