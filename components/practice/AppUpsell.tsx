/* eslint-disable @next/next/no-img-element */
import PlayBadge from "@/components/ui/PlayBadge";
import { quizText, type Lang } from "@/lib/quizText";

// Post-quiz upsell card: a headline that reacts to the result, the app's benefits and a Play badge.
export default function AppUpsell({
  appName,
  icon,
  color,
  playUrl,
  premiumCount,
  rating,
  headline,
  sub,
  lang = "en",
}: {
  appName: string;
  icon: string;
  color: string;
  playUrl: string;
  premiumCount: number;
  rating?: number;
  headline: string;
  sub: string;
  lang?: Lang;
}) {
  const T = quizText[lang];
  const perks = T.perks(premiumCount);

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#0f0f1a] p-6 text-white shadow-2xl sm:p-10">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: color }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#8b5cf6] opacity-25 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-4">
          <img src={icon} alt={`${appName} app icon`} width={64} height={64} className="h-16 w-16 shrink-0 rounded-2xl shadow-lg ring-2 ring-white/20" />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">{appName}</p>
            <p className="text-sm text-white/60">
              {rating ? (
                <>
                  <span className="text-amber-400">★★★★★</span> {rating.toFixed(1)} {T.onPlay}
                </>
              ) : (
                <>{T.freeOnPlay}</>
              )}
            </p>
          </div>
        </div>

        <h3 className="font-display mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">{headline}</h3>
        <p className="mt-2 text-white/70">{sub}</p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-[15px]">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-black text-[#0f0f1a]" style={{ background: color }}>
                ✓
              </span>
              <span className="text-white/90">{perk}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <PlayBadge href={playUrl} dark={false} label={T.badge} />
          <p className="text-sm text-white/55">{T.freeDl}</p>
        </div>
      </div>
    </div>
  );
}
