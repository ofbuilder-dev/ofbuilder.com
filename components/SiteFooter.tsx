import Logo from "./Logo";

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
          <a href="/#products" className="hover:text-white">Products</a>
          <a href="/#about" className="hover:text-white">About</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="/#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
