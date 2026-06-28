import type { FaqItem } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";

/**
 * Visible FAQ accordion. Pure <details>/<summary> — no JavaScript, works on the
 * first server-rendered byte. CRITICAL for GEO: this renders the EXACT same
 * `faqs` array that feeds the FAQPage JSON-LD, so when ChatGPT / Perplexity /
 * Google quote your answer, the words they cite are the words on the page.
 */
export default function FAQ({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-6 mt-16">
      <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-white mb-6">
        {heading}
      </h2>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((f, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-white/90 text-base md:text-lg font-light list-none">
              {f.question}
              <span
                className="shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                style={{ color: siteConfig.accent }}
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-white/60 text-base font-light leading-relaxed">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
