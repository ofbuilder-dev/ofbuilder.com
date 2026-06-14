import Logo from "./Logo";
import { facebookUrl, playDeveloperUrl } from "@/lib/projects";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <a href="/" aria-label="OfBuilder home">
          <Logo size={28} />
        </a>
        <p className="text-xs text-[var(--text-faint)]">
          © {new Date().getFullYear()} OfBuilder. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-[var(--text-dim)]">
          <a href="/#products" className="hover:text-white">
            Products
          </a>
          <a href="/#about" className="hover:text-white">
            About
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Facebook
          </a>
          <a
            href={playDeveloperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Google Play
          </a>
        </div>
      </div>
    </footer>
  );
}
