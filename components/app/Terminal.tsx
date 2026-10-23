"use client";

import { useEffect, useState } from "react";

// Types out terminal lines one character at a time, then loops.
export default function Terminal({ lines, color }: { lines: string[]; color: string }) {
  const [n, setN] = useState(0);
  const total = lines.reduce((a, l) => a + l.length, 0);

  useEffect(() => {
    const t = setInterval(() => setN((v) => (v > total + 40 ? 0 : v + 1)), 45);
    return () => clearInterval(t);
  }, [total]);

  let left = n;
  return (
    <div className="rounded-2xl bg-black/60 p-4 font-mono text-xs leading-relaxed text-white/85 shadow-2xl ring-1 ring-white/10 backdrop-blur">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      {lines.map((l, i) => {
        const shown = l.slice(0, Math.max(0, left));
        const typing = left > 0 && left < l.length;
        left -= l.length;
        return (
          <div key={i} className="min-h-[1.25rem]" style={{ color: i === 0 ? color : undefined }}>
            {shown}
            {typing && <span className="caret">▋</span>}
          </div>
        );
      })}
    </div>
  );
}
