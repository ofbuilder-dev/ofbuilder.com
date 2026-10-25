"use client";

import { useState } from "react";
import { contactEmail } from "@/lib/apps";
import { track } from "@/lib/analytics";

// Static site, so the story is sent as a pre-filled email. Nothing is published without review.
export default function StoryForm({ apps }: { apps: { slug: string; name: string }[] }) {
  const [name, setName] = useState("");
  const [app, setApp] = useState(apps[0]?.slug ?? "");
  const [country, setCountry] = useState("");
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);

  const appName = apps.find((a) => a.slug === app)?.name ?? app;
  const ready = name.trim() && text.trim().length > 10 && consent;
  const href = `mailto:${contactEmail}?subject=${encodeURIComponent(`My success story: ${appName}`)}&body=${encodeURIComponent(
    `Name (as shown): ${name}\nApp: ${appName} (${app})\nCountry: ${country}\n\nMy story:\n${text}\n\nI agree that OfBuilder may publish this story with my first name on ofbuilder.com.`,
  )}`;

  const field = "mt-1.5 w-full rounded-2xl bg-white px-4 py-3 ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#8b5cf6]";

  return (
    <div className="rounded-[2rem] bg-[#0f0f1a] p-6 text-white sm:p-10">
      <h2 className="font-display text-3xl font-extrabold">Share your story</h2>
      <p className="mt-1 text-white/65">It takes a minute. We read every story before it goes on the wall.</p>
      <div className="mt-8 grid gap-4 text-[#0f0f1a] sm:grid-cols-3">
        <label className="text-sm font-semibold text-white/80">
          First name
          <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Sara" />
        </label>
        <label className="text-sm font-semibold text-white/80">
          App
          <select value={app} onChange={(e) => setApp(e.target.value)} className={field}>
            {apps.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-white/80">
          Country (optional)
          <input value={country} onChange={(e) => setCountry(e.target.value)} className={field} placeholder="United Kingdom" />
        </label>
        <label className="text-sm font-semibold text-white/80 sm:col-span-3">
          Your story
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className={field} placeholder="I passed my test first time! The mock tests helped me because…" />
        </label>
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm text-white/75">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4" />I agree that OfBuilder may publish my story with my first name.
      </label>
      <a
        href={ready ? href : undefined}
        onClick={() => ready && track("story_submit", app)}
        aria-disabled={!ready}
        className={`mt-6 inline-flex h-14 items-center rounded-full px-8 font-bold transition-all ${ready ? "bg-white text-[#0f0f1a] hover:-translate-y-0.5" : "cursor-not-allowed bg-white/20 text-white/50"}`}
      >
        Send my story ✉️
      </a>
      <p className="mt-3 text-xs text-white/45">This opens your email app with your story ready to send.</p>
    </div>
  );
}
