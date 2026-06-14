import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";
import Stars from "@/components/Stars";
import PhoneMockup from "@/components/PhoneMockup";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Not found — OfBuilder" };
  return {
    title: `${p.name} — ${p.tagline} | OfBuilder`,
    description: p.description,
    openGraph: {
      title: `${p.name} — OfBuilder`,
      description: p.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const live = p.status === "live";
  const avgRating =
    p.reviews.length > 0
      ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
      : p.rating ?? 0;

  return (
    <div className="relative">
      {/* minimal top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" aria-label="OfBuilder home">
            <Logo size={30} />
          </a>
          <a
            href="/#products"
            className="text-sm text-[var(--text-dim)] transition-colors hover:text-white"
          >
            ← All products
          </a>
        </div>
      </header>

      {/* ===== App header ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(60% 60% at 20% 0%, ${p.accent}26, transparent 70%)`,
        }}
      >
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-14">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            <div
              className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.6rem] text-5xl"
              style={{
                background: `${p.accent}1f`,
                border: `1px solid ${p.accent}40`,
              }}
            >
              {p.emoji}
            </div>

            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-faint)]">
                {p.category}
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {p.name}
              </h1>
              <p
                className="mt-1.5 text-base font-medium"
                style={{ color: p.accent }}
              >
                {p.tagline}
              </p>

              {/* stat row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                {live ? (
                  <>
                    <span className="flex items-center gap-2">
                      <Stars rating={avgRating} />
                      <span className="font-semibold">
                        {avgRating.toFixed(1)}
                      </span>
                    </span>
                    {p.downloads && (
                      <span className="text-[var(--text-dim)]">
                        <span className="font-semibold text-white">
                          {p.downloads}
                        </span>{" "}
                        downloads
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[12px] font-medium text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live on Google Play
                    </span>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[12px] font-medium text-[var(--text-dim)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]" />
                    Coming soon
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {live && p.playUrl ? (
                  <a
                    href={p.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                  >
                    <svg width="16" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.6 1.8 13 11.2l2.6-2.6L4.5 1.2a1.7 1.7 0 0 0-.9.6Zm-.4 1.3v17.8L12.1 12 3.2 3.1Zm12.9 7.8L18.8 12l-2.7 1.1L13.9 12l2.2-1.1ZM4.6 22.8l11.1-7.4-2.6-2.6L3.7 22.2c.2.3.5.5.9.6Z" />
                    </svg>
                    Download on Google Play
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[var(--text-dim)]">
                    Coming soon to Google Play
                  </span>
                )}
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  {live ? "Send feedback" : "Get notified"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Screenshots ===== */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-lg font-semibold">Screenshots</h2>
          <p className="mt-1 text-sm text-[var(--text-faint)]">
            A look inside {p.name}.
          </p>
          <div className="mt-6 flex gap-6 overflow-x-auto pb-4">
            {p.screenshots.map((shot, i) => (
              <PhoneMockup
                key={i}
                shot={shot}
                emoji={p.emoji}
                name={p.name}
                tagline={p.tagline}
                accent={p.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Overview + features ===== */}
      <section className="border-t border-white/5 bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              About {p.name}
            </h2>
            <div className="mt-4 space-y-4">
              {p.longDescription.map((para, i) => (
                <p key={i} className="leading-relaxed text-[var(--text-dim)]">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[var(--text-dim)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {p.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-[var(--panel)] p-5"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dim)]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What people say
              </h2>
              <p className="mt-1 text-sm text-[var(--text-faint)]">
                {p.reviews.length > 0
                  ? `Reviews from ${p.name} users.`
                  : "Be one of the first to review this app."}
              </p>
            </div>
            {live && p.playUrl && (
              <a
                href={p.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Write a review
              </a>
            )}
          </div>

          {p.reviews.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.reviews.map((r, i) => (
                <figure
                  key={i}
                  className="flex flex-col rounded-2xl border border-white/10 bg-[var(--panel)] p-5"
                >
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-dim)]">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-black"
                      style={{ background: p.accent }}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">
                        {r.name}
                      </span>
                      <span className="block text-xs text-[var(--text-faint)]">
                        {r.role ? `${r.role} · ` : ""}
                        {r.date}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-[var(--panel)] p-10 text-center">
              <p className="text-[var(--text-dim)]">
                No reviews yet — {p.name} hasn&apos;t launched.
              </p>
              <a
                href="/#contact"
                className="mt-4 inline-flex rounded-lg bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-4 py-2 text-sm font-semibold text-black"
              >
                Get notified at launch
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== What's new ===== */}
      {p.updates.length > 0 && (
        <section className="border-t border-white/5 bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              What&apos;s new
            </h2>
            <ol className="mt-8 space-y-6 border-l border-white/10 pl-6">
              {p.updates.map((u, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-faint)]">
                    {u.date}
                  </p>
                  <h3 className="mt-1 font-semibold">{u.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-dim)]">
                    {u.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ===== Bottom CTA ===== */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {live ? `Ready to try ${p.name}?` : `${p.name} is on the way`}
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {live && p.playUrl ? (
              <a
                href={p.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Download on Google Play
              </a>
            ) : (
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Get notified at launch
              </a>
            )}
            <a
              href="/#products"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Explore other apps
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
