/* eslint-disable @next/next/no-img-element */
import type { Screen } from "@/lib/apps";

export type ScreenTheme = { primary: string; secondary: string; soft: string; dark?: boolean };

// A stylised, illustrative app screen used until real screenshots are added (Screen.src).
export function ScreenMock({ screen, theme, name, icon }: { screen: Screen; theme: ScreenTheme; name: string; icon: string }) {
  if (screen.src) return <img src={screen.src} alt={screen.caption} className="h-full w-full object-cover" />;

  const dark = theme.dark;
  const bg = dark ? "#0d0b1f" : "#ffffff";
  const card = dark ? "rgba(255,255,255,0.07)" : theme.soft;
  const text = dark ? "#fff" : "#0f0f1a";
  const sub = dark ? "rgba(255,255,255,0.45)" : "rgba(15,15,26,0.35)";
  const bar = (w: string, c = sub, h = 6) => <div className="rounded-full" style={{ width: w, height: h, background: c }} />;

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4 pt-9 text-[10px]" style={{ background: bg, color: text }}>
      <div className="flex items-center gap-2">
        <img src={icon} alt="" className="h-7 w-7 rounded-lg" />
        <div className="flex-1">
          <div className="text-[11px] font-bold leading-tight">{name}</div>
          <div style={{ color: sub }}>{screen.caption}</div>
        </div>
      </div>

      {screen.kind === "quiz" && (
        <>
          <div className="rounded-2xl p-3" style={{ background: card }}>
            <div className="mb-2 text-[9px] font-semibold" style={{ color: theme.primary }}>Question 12</div>
            <div className="space-y-1.5">{bar("95%", text, 7)}{bar("70%", text, 7)}</div>
          </div>
          {["A", "B", "C", "D"].map((l, i) => (
            <div key={l} className="flex items-center gap-2 rounded-xl p-2.5" style={{ background: i === 1 ? theme.primary : card, color: i === 1 ? "#fff" : text }}>
              <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold" style={{ background: i === 1 ? "rgba(255,255,255,.25)" : bg }}>
                {i === 1 ? "✓" : l}
              </span>
              {bar(`${50 + i * 9}%`, i === 1 ? "rgba(255,255,255,.7)" : sub)}
            </div>
          ))}
          <div className="mt-auto rounded-xl p-2.5 text-center font-bold text-white" style={{ background: theme.secondary }}>Next →</div>
        </>
      )}

      {screen.kind === "list" && (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl p-2.5" style={{ background: card }}>
              <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: i % 2 ? theme.secondary : theme.primary, opacity: 0.85 }} />
              <div className="flex-1 space-y-1.5">{bar(`${80 - i * 7}%`, text, 5)}{bar(`${45 + i * 5}%`)}</div>
              <span className="text-[9px] font-bold" style={{ color: theme.primary }}>{["✓", "›", "✓", "›", "★", "›"][i]}</span>
            </div>
          ))}
        </div>
      )}

      {screen.kind === "chart" && (
        <>
          <div className="rounded-2xl p-3" style={{ background: card }}>
            <div style={{ color: sub }}>This week</div>
            <div className="font-display text-2xl font-extrabold" style={{ color: theme.primary }}>+24%</div>
            <div className="mt-3 flex h-28 items-end gap-1.5">
              {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? theme.primary : theme.secondary, opacity: i === 5 ? 1 : 0.55 }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl p-2.5" style={{ background: card }}>
                {bar("50%")}
                <div className="mt-1.5 font-display text-base font-extrabold">{i ? "92%" : "7.4h"}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {screen.kind === "chat" && (
        <div className="flex flex-1 flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`max-w-[80%] space-y-1.5 rounded-2xl p-2.5 ${i % 2 ? "self-start" : "self-end"}`} style={{ background: i % 2 ? card : theme.primary }}>
              {bar(i % 2 ? "140px" : "110px", i % 2 ? text : "rgba(255,255,255,.8)", 5)}
              {bar(i % 2 ? "120px" : "70px", i % 2 ? sub : "rgba(255,255,255,.5)", 5)}
              {i === 1 && <div className="mt-1 rounded-md px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: theme.secondary + "33", color: theme.secondary }}>📖 Source cited</div>}
            </div>
          ))}
          <div className="mt-auto flex items-center gap-2 rounded-full p-2 pl-3" style={{ background: card }}>
            {bar("70%")}
            <span className="ml-auto grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: theme.primary }}>↑</span>
          </div>
        </div>
      )}

      {screen.kind === "story" && (
        <>
          <div className="relative grid h-28 place-items-center overflow-hidden rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
            <span className="text-4xl">✨</span>
          </div>
          <div className="font-display text-sm font-extrabold">Tonight&apos;s chapter</div>
          <div className="space-y-1.5">
            {["100%", "92%", "97%", "60%", "100%", "88%", "40%"].map((w, i) => (
              <div key={i}>{bar(w, sub, 5)}</div>
            ))}
          </div>
        </>
      )}

      {screen.kind === "map" && (
        <div className="relative flex-1 overflow-hidden rounded-2xl" style={{ background: card }}>
          <svg viewBox="0 0 100 160" className="absolute inset-0 h-full w-full">
            <path d="M20 150 C 80 130, 80 110, 30 95 S 20 50, 70 40 S 60 10, 40 5" fill="none" stroke={theme.primary} strokeWidth="3" strokeDasharray="4 4" opacity=".5" />
            {[
              [20, 150], [62, 125], [30, 95], [45, 68], [70, 40], [40, 8],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="8" fill={i < 4 ? theme.primary : sub} />
                <text x={x} y={y + 3} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700">
                  {i < 4 ? "★" : i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}

      {screen.kind === "timer" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <svg viewBox="0 0 100 100" className="w-36">
            <circle cx="50" cy="50" r="42" fill="none" stroke={card} strokeWidth="9" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={theme.primary} strokeWidth="9" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="80" transform="rotate(-90 50 50)" />
            <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="800" fill={text}>
              32:10
            </text>
          </svg>
          {bar("60%", text, 6)}
          {bar("40%")}
          <div className="w-full rounded-xl p-2.5 text-center font-bold text-white" style={{ background: theme.primary }}>Start</div>
        </div>
      )}

      {screen.kind === "progress" && (
        <>
          <div className="rounded-2xl p-3 text-center" style={{ background: card }}>
            <div style={{ color: sub }}>Overall</div>
            <div className="font-display text-3xl font-extrabold" style={{ color: theme.primary }}>87%</div>
            <div style={{ color: sub }}>On track 🎉</div>
          </div>
          {[92, 78, 64, 85, 55].map((p, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                {bar("40%", text, 5)}
                <span className="text-[9px] font-bold">{p}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: card }}>
                <div className="h-2 rounded-full" style={{ width: `${p}%`, background: i % 2 ? theme.secondary : theme.primary }} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19.5] w-full rounded-[2.6rem] bg-[#111] p-[0.55rem] shadow-[0_40px_80px_-20px_rgba(15,15,26,0.55)] ring-1 ring-black/40 ${className}`}>
      <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">{children}</div>
    </div>
  );
}
