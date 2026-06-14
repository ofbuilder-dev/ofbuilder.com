import type { Shot } from "@/lib/projects";

// Stylized phone-screen placeholder. Swap the inner content for a real
// screenshot <img> per Shot when assets are available.
export default function PhoneMockup({
  shot,
  emoji,
  name,
  tagline,
  accent,
}: {
  shot: Shot;
  emoji: string;
  name: string;
  tagline: string;
  accent: string;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className="relative h-[420px] w-[210px] rounded-[2.2rem] border-[6px] border-[#1a1a26] bg-[#0a0a12] p-2 shadow-2xl"
        style={{ boxShadow: `0 20px 60px -20px ${accent}55` }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#1a1a26]" />
        {/* screen */}
        <div
          className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.7rem] p-5 text-center"
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${accent}33, transparent 60%), linear-gradient(180deg, #0d0d16, #07070b)`,
          }}
        >
          <div
            className="grid h-16 w-16 place-items-center rounded-2xl text-3xl"
            style={{
              background: `${accent}22`,
              border: `1px solid ${accent}44`,
            }}
          >
            {emoji}
          </div>
          <p className="mt-4 text-sm font-semibold text-white">{name}</p>
          <p className="mt-1 text-[11px] leading-snug text-white/55">
            {tagline}
          </p>

          {/* faux UI rows */}
          <div className="mt-6 w-full space-y-2">
            {[0.9, 0.7, 0.8, 0.5].map((w, i) => (
              <div
                key={i}
                className="mx-auto h-7 rounded-lg border border-white/5 bg-white/[0.04]"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-[var(--text-faint)]">{shot.caption}</p>
    </div>
  );
}
