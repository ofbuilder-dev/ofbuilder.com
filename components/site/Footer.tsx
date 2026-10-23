import Link from "next/link";
import { appsInSuite, contactEmail, playDeveloperUrl, socials, suites } from "@/lib/apps";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0f0f1a] text-white">
      <div aria-hidden className="bg-rainbow h-1.5 w-full" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              An indie app studio building calm, useful, privacy-first apps that help people learn, pass, sleep and grow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {Object.entries(socials).map(([k, v]) => (
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-3 py-1.5 capitalize transition-colors hover:bg-white/20">
                  {k}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {suites.map((s) => (
              <div key={s.id}>
                <Link href={`/suites/${s.id}/`} className="text-sm font-semibold hover:underline">
                  {s.short}
                </Link>
                <ul className="mt-3 space-y-2 text-sm text-white/55">
                  {appsInSuite(s.id).map((a) => (
                    <li key={a.slug}>
                      <Link href={`/${a.slug}/`} className="transition-colors hover:text-white">
                        {a.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} OfBuilder. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/apps/" className="hover:text-white">All apps</Link>
            <Link href="/blog/" className="hover:text-white">Blog</Link>
            <Link href="/privacy/" className="hover:text-white">Privacy</Link>
            <Link href="/contact/" className="hover:text-white">Contact</Link>
            <a href={`mailto:${contactEmail}`} className="hover:text-white">{contactEmail}</a>
            <a href={playDeveloperUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Play ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
