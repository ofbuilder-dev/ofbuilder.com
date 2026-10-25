"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { drawScoreCard, type CardInput } from "@/lib/shareCard";

// "Share my result" button: builds a score card image and opens the phone's share sheet,
// or downloads the image and copies the link on desktop.
export default function ShareResult({ card, path, slug, light = true }: { card: Omit<CardInput, "url">; path: string; slug: string; light?: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "saved" | "copied">("idle");

  const share = async () => {
    setState("busy");
    const link = `https://ofbuilder.com${path}`;
    const text = `${card.headline} ${card.big}. Try the free test: ${link}`;
    track("share_result", slug);
    try {
      const blob = await drawScoreCard({ ...card, url: `ofbuilder.com${path}` });
      const file = blob ? new File([blob], `${slug}-score.png`, { type: "image/png" }) : null;
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, title: card.headline });
        setState("idle");
        return;
      }
      if (navigator.share) {
        await navigator.share({ text, url: link, title: card.headline });
        setState("idle");
        return;
      }
      if (blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${slug}-score.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      }
      try {
        await navigator.clipboard.writeText(text);
        setState("copied");
      } catch {
        setState("saved");
      }
    } catch {
      setState("idle"); // share sheet dismissed
    }
  };

  const label = state === "busy" ? "Creating…" : state === "copied" ? "Image saved, link copied ✓" : state === "saved" ? "Image saved ✓" : "Share my result";

  return (
    <button
      onClick={share}
      disabled={state === "busy"}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 ${light ? "bg-white text-[#0f0f1a]" : "bg-[#0f0f1a] text-white"}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
      {label}
    </button>
  );
}
