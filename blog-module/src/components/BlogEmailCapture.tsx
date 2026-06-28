"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site.config";

/**
 * Inline email-capture card. POSTs { email, resource, source } to /api/lead,
 * which forwards to your webhook (see docs/MEASUREMENT.md). Works with no
 * backend wired — the route no-ops and the success state still shows — so the
 * demo never looks broken before you connect a CRM.
 */
export default function BlogEmailCapture({
  heading,
  body,
  buttonLabel = "Send it to me",
  resource,
  successMessage = "You're on the list. Check your inbox shortly.",
  accent = "brand",
}: {
  heading: string;
  body?: string;
  buttonLabel?: string;
  resource: string;
  successMessage?: string;
  accent?: "red" | "brand";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const isRed = accent === "red";
  const accentColor = isRed ? "#dc2626" : siteConfig.accent;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          resource,
          source: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div
      className="my-12 rounded-2xl border bg-[#070707] p-7 md:p-9"
      style={{ borderColor: `${accentColor}55` }}
    >
      <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white mb-3">
        {heading}
      </h3>
      {body ? (
        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed mb-6 max-w-xl">
          {body}
        </p>
      ) : null}

      {state === "done" ? (
        <p className="text-white/80 font-light">{successMessage}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-11 flex-1 rounded-full border border-white/15 bg-black px-5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="h-11 shrink-0 rounded-full px-6 text-sm font-medium text-white transition-transform hover:scale-105 disabled:opacity-60"
            style={{ backgroundColor: accentColor }}
          >
            {state === "loading" ? "…" : buttonLabel}
          </button>
        </form>
      )}
      {state === "error" ? (
        <p className="mt-3 text-sm text-red-400">Something went wrong. Try again in a moment.</p>
      ) : null}
    </div>
  );
}
