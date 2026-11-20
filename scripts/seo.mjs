#!/usr/bin/env node
/**
 * seo.mjs: indexing + reporting helper for the SEO Blog Engine. Zero dependencies (Node 20+).
 *
 *   node scripts/seo.mjs sitemap                 submit SITE_URL/sitemap.xml to Google Search Console
 *   node scripts/seo.mjs inspect <url> [url...]  ask GSC whether each URL is indexed, and why not
 *   node scripts/seo.mjs indexnow <url> [url...] ping Bing/Yandex/etc. (IndexNow) about new or changed URLs
 *   node scripts/seo.mjs indexnow-key [dir]      make an IndexNow key + write <key>.txt into dir (default blog-module/public)
 *   node scripts/seo.mjs report [days]           pages + queries from GSC, with "fix this" and "write this" flags
 *   node scripts/seo.mjs selftest                offline check of the signing code
 *
 * Env (put them in .env.local and run with: node --env-file=.env.local scripts/seo.mjs ...):
 *   SITE_URL      https://www.yourdomain.com   (no trailing slash)
 *   GSC_SITE      sc-domain:yourdomain.com     (domain property) or https://www.yourdomain.com/ (URL-prefix property)
 *   GSC_SA_JSON   path to the Google service-account JSON key (never commit it)
 *   INDEXNOW_KEY  the key from `indexnow-key`
 *
 * Google has no API to "Request indexing" for normal pages. That button lives in the
 * Search Console UI only. See docs/INDEXING.md for how the agent handles it.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const env = process.env;
const die = (msg) => {
  console.error(`error: ${msg}`);
  process.exit(1);
};
const need = (...keys) => keys.forEach((k) => env[k] || die(`${k} is not set (see docs/INDEXING.md)`));
const b64url = (buf) => Buffer.from(buf).toString("base64url");

/** Sign a Google service-account JWT (RS256). Exported shape kept tiny for the selftest. */
function signJwt(sa, scope, now = Math.floor(Date.now() / 1000)) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({ iss: sa.client_email, scope, aud: sa.token_uri, iat: now, exp: now + 3600 }),
  );
  const sig = crypto.createSign("RSA-SHA256").update(`${header}.${claim}`).sign(sa.private_key);
  return `${header}.${claim}.${b64url(sig)}`;
}

async function googleToken(scope) {
  need("GSC_SA_JSON");
  const sa = JSON.parse(fs.readFileSync(env.GSC_SA_JSON, "utf8"));
  sa.token_uri ||= "https://oauth2.googleapis.com/token";
  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signJwt(sa, scope),
    }),
  });
  const json = await res.json();
  if (!res.ok) die(`Google auth failed: ${json.error_description || json.error || res.status}`);
  return json.access_token;
}

async function gsc(method, url, scope, body) {
  const token = await googleToken(scope);
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  // Print Google's own reason. Diagnose from it, never guess.
  if (!res.ok) die(`GSC ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

const RO = "https://www.googleapis.com/auth/webmasters.readonly";
const RW = "https://www.googleapis.com/auth/webmasters";
const site = () => encodeURIComponent(env.GSC_SITE);

async function submitSitemap() {
  need("SITE_URL", "GSC_SITE");
  const feed = `${env.SITE_URL}/sitemap.xml`;
  await gsc("PUT", `https://www.googleapis.com/webmasters/v3/sites/${site()}/sitemaps/${encodeURIComponent(feed)}`, RW);
  console.log(`submitted ${feed}`);
  const { sitemap = [] } = await gsc("GET", `https://www.googleapis.com/webmasters/v3/sites/${site()}/sitemaps`, RO);
  for (const s of sitemap) {
    console.log(`  ${s.path}  last read: ${s.lastDownloaded ?? "not yet"}  errors: ${s.errors ?? 0}  warnings: ${s.warnings ?? 0}`);
  }
}

async function inspect(urls) {
  need("GSC_SITE");
  if (!urls.length) die("give at least one URL");
  for (const inspectionUrl of urls) {
    const { inspectionResult: r = {} } = await gsc(
      "POST",
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
      RO,
      { inspectionUrl, siteUrl: env.GSC_SITE },
    );
    const i = r.indexStatusResult ?? {};
    console.log(`${inspectionUrl}
  verdict: ${i.verdict ?? "?"}   coverage: ${i.coverageState ?? "?"}
  last crawl: ${i.lastCrawlTime ?? "never"}   google canonical: ${i.googleCanonical ?? "-"}
  sitemaps: ${(i.sitemap ?? []).join(", ") || "none"}   referring pages: ${(i.referringUrls ?? []).length}`);
  }
}

async function indexnow(urls) {
  need("SITE_URL", "INDEXNOW_KEY");
  if (!urls.length) die("give at least one URL");
  const host = new URL(env.SITE_URL).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: env.INDEXNOW_KEY,
      keyLocation: `${env.SITE_URL}/${env.INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10000),
    }),
  });
  // 200 = accepted, 202 = accepted while the key is being checked. 403 = key file not reachable.
  console.log(`IndexNow ${res.status} for ${urls.length} URL(s)${res.ok ? "" : `: ${await res.text()}`}`);
  if (!res.ok) process.exit(1);
}

function indexnowKey(dir = "blog-module/public") {
  const key = crypto.randomBytes(16).toString("hex");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${key}.txt`), key);
  console.log(`wrote ${path.join(dir, `${key}.txt`)}\nadd to .env.local:  INDEXNOW_KEY=${key}`);
}

async function report(days = 28) {
  need("GSC_SITE");
  const end = new Date(Date.now() - 2 * 864e5); // GSC lags ~2 days
  const start = new Date(end - (days - 1) * 864e5);
  const iso = (d) => d.toISOString().slice(0, 10);
  const q = (dimensions) =>
    gsc("POST", `https://www.googleapis.com/webmasters/v3/sites/${site()}/searchAnalytics/query`, RO, {
      startDate: iso(start),
      endDate: iso(end),
      dimensions,
      rowLimit: 500,
      dataState: "all", // without this, recent days come back empty
    });
  const [pages, queries] = await Promise.all([q(["page"]), q(["query"])]);
  const fmt = (r) =>
    `${String(r.impressions).padStart(6)} impr  ${String(r.clicks).padStart(4)} clicks  pos ${r.position.toFixed(1).padStart(5)}  ${r.keys[0]}`;

  console.log(`\nGSC ${iso(start)} to ${iso(end)}\n\nTOP PAGES`);
  (pages.rows ?? []).slice(0, 20).forEach((r) => console.log(fmt(r)));

  console.log(`\nFIX THE TITLE + META (50+ impressions, under 1% CTR)`);
  (pages.rows ?? []).filter((r) => r.impressions >= 50 && r.ctr < 0.01).forEach((r) => console.log(fmt(r)));

  console.log(`\nWRITE OR STRENGTHEN A POST (queries ranking 8-30: Google already half-trusts you here)`);
  (queries.rows ?? [])
    .filter((r) => r.position >= 8 && r.position <= 30 && r.impressions >= 10)
    .slice(0, 25)
    .forEach((r) => console.log(fmt(r)));
}

function selftest() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });
  const jwt = signJwt({ client_email: "t@x.iam.gserviceaccount.com", private_key: privateKey, token_uri: "https://oauth2.googleapis.com/token" }, RO, 1000);
  const [h, c, s] = jwt.split(".");
  const ok = crypto.createVerify("RSA-SHA256").update(`${h}.${c}`).verify(publicKey, Buffer.from(s, "base64url"));
  const claim = JSON.parse(Buffer.from(c, "base64url"));
  if (!ok || claim.exp !== 4600 || claim.scope !== RO) die("selftest failed");
  console.log("selftest ok");
}

const [cmd, ...args] = process.argv.slice(2);
const commands = {
  sitemap: submitSitemap,
  inspect: () => inspect(args),
  indexnow: () => indexnow(args),
  "indexnow-key": () => indexnowKey(args[0]),
  report: () => report(Number(args[0]) || 28),
  selftest,
};
if (!commands[cmd]) {
  console.log(fs.readFileSync(new URL(import.meta.url), "utf8").split("*/")[0]);
  process.exit(cmd ? 1 : 0);
}
await commands[cmd]();
