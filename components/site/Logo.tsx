export default function Logo({ size = 36, withText = true, light = false }: { size?: number; withText?: boolean; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-label="OfBuilder logo" role="img">
        <defs>
          <linearGradient id="of-rainbow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="35%" stopColor="#ffb347" />
            <stop offset="65%" stopColor="#4cc9f0" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#of-rainbow)" />
        <path d="M19 20 L19 15 L25 18.5 L32 12 L39 18.5 L45 15 L45 20 Z" fill="#fff" />
        <path
          d="M22 24 h12.5 a8.5 8.5 0 0 1 0 17 h-0.5 a9 9 0 0 1 0.5 18 H22 Z M29.5 30.5 v5 h4 a2.5 2.5 0 0 0 0-5 Z M29.5 42 v9.5 h5 a4.75 4.75 0 0 0 0-9.5 Z"
          fill="#fff"
          fillRule="evenodd"
        />
      </svg>
      {withText && (
        <span className={`font-display text-xl font-extrabold ${light ? "text-white" : "text-[#0f0f1a]"}`}>OfBuilder</span>
      )}
    </span>
  );
}
