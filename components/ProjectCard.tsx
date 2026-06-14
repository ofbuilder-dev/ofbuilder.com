import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const live = project.status === "live";

  return (
    <article
      className="card-glow group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)] p-6 transition-all duration-300 hover:-translate-y-1"
      style={
        {
          // expose accent to inline gradients below
          ["--a" as string]: project.accent,
        } as React.CSSProperties
      }
    >
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: project.accent }}
      />

      {/* full-card click target → product detail page */}
      <a
        href={`/products/${project.slug}/`}
        aria-label={`View ${project.name}`}
        className="absolute inset-0 z-[1]"
      />

      <div className="relative flex items-start justify-between">
        <div
          className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
          style={{
            background: `${project.accent}1a`,
            border: `1px solid ${project.accent}33`,
          }}
        >
          {project.emoji}
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            live
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-white/5 text-[var(--text-faint)]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              live ? "bg-emerald-400" : "bg-[var(--text-faint)]"
            }`}
          />
          {live ? "Live on Play" : "Coming soon"}
        </span>
      </div>

      <div className="relative mt-5 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-faint)]">
          {project.category}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-1 text-sm font-medium" style={{ color: project.accent }}>
          {project.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-dim)]">
          {project.description}
        </p>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-[var(--text-dim)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative z-[2] mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
        {live && project.playUrl ? (
          <a
            href={project.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            <svg width="14" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.6 1.8 13 11.2l2.6-2.6L4.5 1.2a1.7 1.7 0 0 0-.9.6Zm-.4 1.3v17.8L12.1 12 3.2 3.1Zm12.9 7.8L18.8 12l-2.7 1.1L13.9 12l2.2-1.1ZM4.6 22.8l11.1-7.4-2.6-2.6L3.7 22.2c.2.3.5.5.9.6Z" />
            </svg>
            Google Play
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] font-medium text-[var(--text-dim)]">
            In the works
          </span>
        )}

        {/* decorative; the whole card links to the detail page */}
        <span className="ml-auto inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text-dim)] transition-colors group-hover:text-white">
          Learn more
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
