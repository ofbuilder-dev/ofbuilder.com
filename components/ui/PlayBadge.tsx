export default function PlayBadge({
  href,
  dark = true,
  label = "Get it on",
}: {
  href: string;
  dark?: boolean;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex h-16 items-center gap-3 rounded-2xl px-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
        dark ? "bg-[#0f0f1a] text-white shadow-lg shadow-black/20" : "bg-white text-[#0f0f1a] shadow-lg shadow-black/10 ring-1 ring-black/5"
      }`}
    >
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden className="transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
        <path d="M1.2.6 14.4 13.9 1.2 27.3A2 2 0 0 1 .5 25.8V2.1A2 2 0 0 1 1.2.6Z" fill="#00d7fe" />
        <path d="m18.8 18.3-4.4-4.4 4.4-4.5 5.3 3a1.6 1.6 0 0 1 0 2.9l-5.3 3Z" fill="#ffce00" />
        <path d="M18.8 18.3 14.4 13.9 1.2 27.3c.5.5 1.3.5 2.1.1l15.5-9.1Z" fill="#ff3a44" />
        <path d="M18.8 9.4 3.3.4C2.5 0 1.7 0 1.2.6l13.2 13.3 4.4-4.5Z" fill="#00f076" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">{label}</span>
        <span className="mt-1 text-lg font-semibold tracking-tight">Google Play</span>
      </span>
    </a>
  );
}
