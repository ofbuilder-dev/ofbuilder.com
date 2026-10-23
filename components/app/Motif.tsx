import type { App } from "@/lib/apps";
// Deterministic pseudo-random so server and client render the same scene.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function seedOf(str: string) {
  let h = 7;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 2147483647;
  return h || 1;
}

function Sunrise({ app }: { app: App }) {
  const flag = app.theme.flag ?? ["#f97316", "#fff", "#f97316"];
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#fff7ed 0%,#ffe4c7 70%,#ffd3a6 100%)" }} />
      <div className="absolute bottom-[-6vmax] left-1/2 h-[34vmax] w-[34vmax] -translate-x-1/2 sm:left-[74%]" style={{ animation: "rise 2.4s cubic-bezier(.22,1,.36,1) both" }}>
        <div className="animate-spin-slow absolute inset-[-40%]">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-0 h-1/2 w-3 origin-bottom -translate-x-1/2 rounded-full"
              style={{
                transform: `translateX(-50%) rotate(${i * 20}deg)`,
                background: "linear-gradient(to top, transparent 55%, #fb923c 70%, transparent)",
                animation: `rays 4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_120px_40px_rgba(251,146,60,0.45)]">
          {flag.map((c, i) => (
            <div key={i} style={{ background: c, height: `${100 / flag.length}%` }} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(255,247,237,.92) 0%, rgba(255,247,237,.6) 45%, transparent 65%)" }} />
      {/* waving ribbon */}
      <svg className="absolute bottom-[8%] left-0 w-[200%] opacity-70" style={{ animation: "wave 14s linear infinite" }} viewBox="0 0 2400 80" preserveAspectRatio="none" height="80">
        {flag.map((c, i) => (
          <path key={i} d={`M0 ${20 + i * 14} Q 150 ${i * 14} 300 ${20 + i * 14} T 600 ${20 + i * 14} T 900 ${20 + i * 14} T 1200 ${20 + i * 14} T 1500 ${20 + i * 14} T 1800 ${20 + i * 14} T 2100 ${20 + i * 14} T 2400 ${20 + i * 14}`} stroke={c === "#ffffff" ? "#fde7cf" : c} strokeWidth="10" fill="none" strokeLinecap="round" />
        ))}
      </svg>
    </>
  );
}

function Road({ app }: { app: App }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#dbeafe 0%,#eff6ff 55%,#bfdbfe 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-[26%]" style={{ perspective: "400px" }}>
        <div
          className="absolute inset-x-[-50%] bottom-0 h-[180%] origin-bottom"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0 40px, #facc15 40px 80px, transparent 80px 120px), linear-gradient(90deg,#16a34a 0 18%,#475569 18% 19%,#334155 19% 81%,#475569 81% 82%,#16a34a 82%)",
            backgroundSize: "12px 120px, 100% 100%",
            backgroundPosition: "center 0, 0 0",
            backgroundRepeat: "repeat-y, no-repeat",
            animation: "road 0.9s linear infinite",
          }}
        />
      </div>
      {/* signs */}
      {[
        { l: "54%", t: "16%", c: "#dc2626", txt: "30" },
        { l: "88%", t: "14%", c: "#dc2626", txt: "!" },
        { l: "92%", t: "50%", c: "#2563eb", txt: "P" },
        { l: "56%", t: "52%", c: "#2563eb", txt: "↑" },
      ].map((s, i) => (
        <div key={i} className="animate-bob absolute hidden sm:block" style={{ left: s.l, top: s.t, animationDelay: `${-i}s` }}>
          <div
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-black shadow-lg"
            style={{ border: `6px solid ${s.c}`, background: s.c === "#2563eb" ? s.c : "#fff", color: s.c === "#2563eb" ? "#fff" : "#0f0f1a" }}
          >
            {s.txt}
          </div>
          <div className="mx-auto h-10 w-1.5 bg-slate-400" />
        </div>
      ))}
      <div className="absolute bottom-[14%] left-0 text-5xl" style={{ animation: "drive 9s linear infinite" }} aria-hidden>
        {app.slug.includes("motorcycle") ? "🏍️" : app.slug.includes("lgv") ? "🚛" : app.slug.includes("bus") ? "🚌" : "🚗"}
      </div>
    </>
  );
}

function Circuit({ app }: { app: App }) {
  const r = rng(seedOf(app.slug));
  const paths = Array.from({ length: 14 }).map(() => {
    const x = Math.round(r() * 1200);
    const y = Math.round(r() * 700);
    const dx = (r() > 0.5 ? 1 : -1) * Math.round(80 + r() * 220);
    const dy = (r() > 0.5 ? 1 : -1) * Math.round(60 + r() * 160);
    return { d: `M${x} ${y} h${dx} v${dy} h${Math.round(dx / 2)}`, end: [x + dx + Math.round(dx / 2), y + dy] };
  });
  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(80% 70% at 70% 20%, ${app.theme.primary}55, transparent 60%), radial-gradient(60% 60% at 10% 90%, ${app.theme.secondary}40, transparent 60%), #070712` }} />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke={i % 2 ? app.theme.primary : app.theme.secondary} strokeWidth="2" strokeDasharray="900" strokeDashoffset="900" opacity="0.8" style={{ animation: `dash 3s ${i * 0.25}s ease-out forwards` }} />
            <circle cx={p.end[0]} cy={p.end[1]} r="4" fill={i % 2 ? app.theme.primary : app.theme.secondary} style={{ animation: `pulse-node 2.4s ${i * 0.2}s ease-in-out infinite` }} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(7,7,18,.85) 0%, rgba(7,7,18,.5) 45%, transparent 65%)" }} />
    </>
  );
}

function Breath({ app }: { app: App }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(70% 60% at 50% 45%, ${app.theme.primary}66, transparent 70%), linear-gradient(180deg,#0e0b2e,#1e1b4b 60%,#312e81)` }} />
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
        {[1, 0.75, 0.5].map((s, i) => (
          <div
            key={i}
            className="animate-breathe absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${s * 60}vmin`,
              height: `${s * 60}vmin`,
              marginLeft: `${-s * 30}vmin`,
              marginTop: `${-s * 30}vmin`,
              border: `1px solid ${app.theme.secondary}66`,
              background: `${app.theme.secondary}${i === 2 ? "33" : "0d"}`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <svg key={i} className="absolute bottom-0 left-0 w-[200%]" style={{ animation: `wave ${16 + i * 6}s linear infinite`, opacity: 0.25 + i * 0.15 }} viewBox="0 0 2400 160" preserveAspectRatio="none" height={120 + i * 30}>
          <path d="M0 80 Q 300 0 600 80 T 1200 80 T 1800 80 T 2400 80 V160 H0Z" fill={i === 2 ? "#fffbf5" : app.theme.secondary} />
        </svg>
      ))}
    </>
  );
}

function Stars({ app }: { app: App }) {
  const r = rng(seedOf(app.slug));
  const stars = Array.from({ length: 70 }).map(() => ({ x: r() * 100, y: r() * 85, s: 1 + r() * 3, d: r() * 4 }));
  return (
    <>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#0b0726 0%,#2a1a5e 55%,#5b3a9b 100%)" }} />
      {stars.map((s, i) => (
        <span key={i} className="animate-twinkle absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${-s.d}s`, boxShadow: "0 0 6px #fff" }} />
      ))}
      <div className="animate-bob absolute right-[-6%] top-[6%] h-24 w-24 rounded-full opacity-70 sm:right-[10%] sm:top-[14%] sm:h-44 sm:w-44 sm:opacity-100" style={{ background: "#fde68a", boxShadow: "0 0 80px 20px rgba(253,230,138,.45), inset -28px -10px 0 0 #fbbf24" }} />
      <span className="absolute left-[20%] top-[12%] h-0.5 w-32 rotate-[20deg] rounded-full bg-gradient-to-r from-white to-transparent" style={{ animation: "drive 7s linear infinite" }} />
      {[
        { t: "62%", w: 260, d: 0 },
        { t: "74%", w: 340, d: -8 },
        { t: "84%", w: 300, d: -4 },
      ].map((c, i) => (
        <div key={i} className="absolute left-0 h-16 rounded-full bg-white/[0.07] blur-xl" style={{ top: c.t, width: c.w, animation: `drive ${40 + i * 10}s linear ${c.d}s infinite` }} />
      ))}
    </>
  );
}

function Geometric({ app }: { app: App }) {
  const star = (cx: number, cy: number, rr: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 16; i++) {
      const a = (Math.PI / 8) * i;
      const rad = i % 2 ? rr * 0.72 : rr;
      pts.push(`${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`);
    }
    return pts.join(" ");
  };
  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(70% 70% at 50% 30%, ${app.theme.primary}, #052e2b 75%)` }} />
      <svg className="animate-spin-slow absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-25" viewBox="0 0 400 400" style={{ animationDuration: "120s" }}>
        <defs>
          <pattern id="geo" width="50" height="50" patternUnits="userSpaceOnUse">
            <polygon points={star(25, 25, 22)} fill="none" stroke={app.theme.secondary} strokeWidth="1" />
            <rect x="13" y="13" width="24" height="24" fill="none" stroke={app.theme.secondary} strokeWidth="0.6" transform="rotate(45 25 25)" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#geo)" />
      </svg>
      <div className="animate-bob absolute right-[-4%] top-[6%] h-24 w-24 rounded-full sm:right-[12%] sm:top-[14%] sm:h-40 sm:w-40" style={{ boxShadow: `inset 22px -12px 0 0 ${app.theme.secondary}`, filter: `drop-shadow(0 0 30px ${app.theme.secondary})` }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
    </>
  );
}

function FloatingGlyphs({ glyphs, colors, bg }: { glyphs: string[]; colors: string[]; bg: string }) {
  const r = rng(seedOf(glyphs.join("")));
  const items = Array.from({ length: 22 }).map((_, i) => ({
    g: glyphs[i % glyphs.length],
    c: colors[i % colors.length],
    x: r() * 96,
    y: r() * 90,
    s: 28 + r() * 56,
    rot: Math.round(r() * 60 - 30),
    d: r() * 5,
  }));
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />
      {items.map((it, i) => (
        <span
          key={i}
          className="animate-bob absolute font-display font-extrabold"
          style={{ left: `${it.x}%`, top: `${it.y}%`, fontSize: it.s, color: it.c, opacity: 0.85, animationDelay: `${-it.d}s`, animationDuration: `${4 + (i % 4)}s`, ["--r" as string]: `${it.rot}deg`, textShadow: "0 8px 20px rgba(0,0,0,.12)" }}
        >
          {it.g}
        </span>
      ))}
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,.5) 42%, transparent 62%)" }} />
    </>
  );
}

function Maze({ app }: { app: App }) {
  const cells = 12;
  const r = rng(42);
  const walls = Array.from({ length: 60 }).map(() => ({ x: Math.floor(r() * cells), y: Math.floor(r() * 8), v: r() > 0.5 }));
  return (
    <>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${app.theme.soft}, #dbeafe)` }} />
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {walls.map((w, i) => (
          <rect key={i} x={w.x * 100 + 10} y={w.y * 100 + 10} width={w.v ? 14 : 100} height={w.v ? 100 : 14} rx="7" fill={i % 3 ? app.theme.primary : "#93c5fd"} opacity={0.35} />
        ))}
        <path id="maze-path" d="M60 700 H 460 V 300 H 860 V 120 H 1140" fill="none" stroke={app.theme.secondary} strokeWidth="10" strokeDasharray="20 18" strokeLinecap="round" />
        <g>
          <polygon points="-26,-20 22,0 -26,20 -14,0" fill={app.theme.secondary} stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M60 700 H 460 V 300 H 860 V 120 H 1140" keyPoints="0;0.25;0.5;0.75;1" keyTimes="0;0.25;0.5;0.75;1" calcMode="linear" />
          </polygon>
        </g>
        <circle cx="1140" cy="120" r="26" fill="#22c55e" />
        <text x="1140" y="130" textAnchor="middle" fontSize="28" fill="#fff">★</text>
      </svg>
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,.5) 42%, transparent 62%)" }} />
    </>
  );
}

function Orbit({ app }: { app: App }) {
  const chips = ["🎬", "🎵", "☁️", "🏋️", "📺", "🎮", "📰", "💼"];
  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(60% 60% at 70% 40%, ${app.theme.secondary}55, transparent 70%), ${app.theme.soft}` }} />
      <div className="absolute right-[-10%] top-1/2 h-[90vmin] w-[90vmin] -translate-y-1/2 sm:right-[2%]">
        {[1, 0.7, 0.42].map((s, ring) => (
          <div
            key={ring}
            className="absolute left-1/2 top-1/2 rounded-full border-2 border-dashed"
            style={{
              width: `${s * 100}%`,
              height: `${s * 100}%`,
              transform: "translate(-50%,-50%)",
              borderColor: app.theme.primary + "40",
              animation: `spin-slow ${30 + ring * 12}s linear infinite ${ring % 2 ? "reverse" : ""}`,
            }}
          >
            {chips.slice(ring * 3, ring * 3 + 3).map((c, i) => (
              <span
                key={i}
                className="absolute grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-xl"
                style={{ left: `${50 + 50 * Math.cos((i * 2 * Math.PI) / 3)}%`, top: `${50 + 50 * Math.sin((i * 2 * Math.PI) / 3)}%`, transform: "translate(-50%,-50%)" }}
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Donut({ app }: { app: App }) {
  const segs = [
    { v: 50, c: app.theme.primary },
    { v: 30, c: app.theme.secondary },
    { v: 20, c: "#f59e0b" },
  ];
  let acc = 0;
  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(60% 60% at 75% 40%, ${app.theme.primary}33, transparent 70%), ${app.theme.soft}` }} />
      <svg className="animate-spin-slow absolute right-[-15%] top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 sm:right-[4%]" viewBox="0 0 200 200" style={{ animationDuration: "60s" }}>
        {segs.map((s, i) => {
          const len = (s.v / 100) * 502;
          const el = (
            <circle key={i} cx="100" cy="100" r="80" fill="none" stroke={s.c} strokeWidth="26" strokeDasharray={`${len - 6} 502`} strokeDashoffset={-acc} strokeLinecap="round" transform="rotate(-90 100 100)" style={{ animation: `dash 2s ${i * 0.3}s ease-out both` }} />
          );
          acc += len;
          return el;
        })}
      </svg>
      {["🪙", "💰", "🪙", "📈", "🪙"].map((c, i) => (
        <span key={i} className="animate-bob absolute text-4xl" style={{ left: `${10 + i * 18}%`, top: `${15 + ((i * 37) % 60)}%`, animationDelay: `${-i}s` }}>
          {c}
        </span>
      ))}
    </>
  );
}

export default function Motif({ app }: { app: App }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {app.motif === "sunrise" && <Sunrise app={app} />}
      {app.motif === "road" && <Road app={app} />}
      {app.motif === "circuit" && <Circuit app={app} />}
      {app.motif === "breath" && <Breath app={app} />}
      {app.motif === "stars" && <Stars app={app} />}
      {app.motif === "geometric" && <Geometric app={app} />}
      {app.motif === "shapes" && (
        <FloatingGlyphs glyphs={["A", "●", "3", "▲", "b", "■", "★", "7", "♥", "C"]} colors={["#f97316", "#22c55e", "#3b82f6", "#ec4899", "#facc15", "#8b5cf6"]} bg="linear-gradient(135deg,#fff7e6,#ffe8f0 50%,#e6f7ff)" />
      )}
      {app.motif === "math" && (
        <FloatingGlyphs glyphs={["+", "−", "×", "÷", "=", "7", "%", "9", "√", "π"]} colors={[app.theme.primary, app.theme.secondary, "#14b8a6", "#fb7185"]} bg={`linear-gradient(135deg, ${app.theme.soft}, #fff7e0)`} />
      )}
      {app.motif === "maze" && <Maze app={app} />}
      {app.motif === "orbit" && <Orbit app={app} />}
      {app.motif === "donut" && <Donut app={app} />}
    </div>
  );
}
