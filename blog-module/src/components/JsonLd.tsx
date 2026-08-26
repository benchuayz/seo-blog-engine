/**
 * Renders a JSON-LD object into a <script type="application/ld+json"> tag.
 * Server component, so the structured data ships in the initial HTML where
 * crawlers and AI assistants can read it.
 */
function serializeJsonLd(data: unknown): string {
  const json = JSON.stringify(data) ?? "null";
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
