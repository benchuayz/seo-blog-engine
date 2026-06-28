import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, personSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand} Blog`,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.brandDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Sitewide Person + Organization nodes, declared ONCE. Every blog post's
            BlogPosting references these by @id so the entity graph stays connected. */}
        <JsonLd data={personSchema} />
        <JsonLd data={organizationSchema} />
        {children}
        {siteConfig.showEngineCredit ? (
          <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
            Blog engine by{" "}
            <a
              href="https://www.trueframe.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              Trueframe
            </a>
          </footer>
        ) : null}
      </body>
    </html>
  );
}
