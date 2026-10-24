import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { appsInSuite, contactEmail, playDeveloperUrl, socials, suites } from "@/lib/apps";
import PlayBadge from "@/components/ui/PlayBadge";
import Logo from "./Logo";

function XLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
    </svg>
  );
}

function TikTokLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.3V6.6a4.5 4.5 0 0 1-4.4-4.6Z" />
    </svg>
  );
}

const SOCIAL = [
  { label: "Facebook", href: socials.facebook, icon: <Facebook size={17} /> },
  { label: "Instagram", href: socials.instagram, icon: <Instagram size={17} /> },
  { label: "YouTube", href: socials.youtube, icon: <Youtube size={18} /> },
  { label: "TikTok", href: socials.tiktok, icon: <TikTokLogo /> },
  { label: "LinkedIn", href: socials.linkedin, icon: <Linkedin size={17} /> },
  { label: "X", href: socials.x, icon: <XLogo size={15} /> },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{children}</h3>;
}

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0b0b14] text-white">
      {/* soft colour glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#ff6b6b] opacity-[0.12] blur-[120px]" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#8b5cf6] opacity-[0.16] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#4cc9f0] opacity-[0.1] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 sm:py-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Find your next <span className="text-rainbow">favourite app.</span>
            </h2>
            <p className="mt-2 text-white/60">Free to download on Google Play. Built with care by a small studio.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PlayBadge href={playDeveloperUrl} dark={false} />
            <Link
              href="/apps/"
              className="inline-flex h-16 items-center gap-2 rounded-2xl px-6 font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/10"
            >
              Browse all apps →
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-[1.6fr_1.2fr_0.8fr] lg:gap-16">
          <div className="col-span-2 lg:col-span-1">
            <Logo light size={40} />
            <p className="mt-5 max-w-xs leading-relaxed text-white/60">
              An indie app studio building calm, useful, privacy-first apps that help people learn, pass, sleep and grow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.07] text-white/80 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#0b0b14]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Heading>Suites</Heading>
            <ul className="mt-5 space-y-3">
              {suites.map((s) => (
                <li key={s.id}>
                  <Link href={`/suites/${s.id}/`} className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white">
                    <span className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-150" style={{ background: s.color }} />
                    {s.name}
                    <span className="ml-auto rounded-full bg-white/[0.07] px-2 py-0.5 text-xs text-white/50">{appsInSuite(s.id).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Heading>Studio</Heading>
            <ul className="mt-5 space-y-3 text-white/75">
              {[
                ["All apps", "/apps/"],
                ["Blog", "/blog/"],
                ["About", "/#studio"],
                ["Contact", "/contact/"],
                ["Privacy", "/privacy/"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="transition-colors hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={`mailto:${contactEmail}`} className="mt-6 inline-flex items-center gap-2 break-all text-sm text-white/60 transition-colors hover:text-white">
              <Mail size={15} className="shrink-0" /> {contactEmail}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OfBuilder. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy/" className="hover:text-white">
              Privacy
            </Link>
            <a href={playDeveloperUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Google Play ↗
            </a>
            <a href="#" aria-label="Back to top" className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.07] text-white/80 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#0b0b14]">
              ↑
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden className="pointer-events-none relative -mb-[0.22em] select-none overflow-hidden text-center">
        <span className="font-display block bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-[clamp(4.5rem,21vw,19rem)] font-extrabold leading-none text-transparent">
          OfBuilder
        </span>
      </div>
    </footer>
  );
}
