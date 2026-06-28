/**
 * Renders a JSON-LD object into a <script type="application/ld+json"> tag.
 * Server component, so the structured data ships in the initial HTML where
 * crawlers and AI assistants can read it.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; it contains no user-controlled HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
