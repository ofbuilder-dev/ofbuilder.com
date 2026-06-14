export default function Logo({
  size = 32,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OfBuilder logo"
        role="img"
      >
        <defs>
          <linearGradient id="ofgold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7e08a" />
            <stop offset="45%" stopColor="#e8b923" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>

        {/* crown */}
        <path
          d="M18 21 L18 15 L24 19 L32 11 L40 19 L46 15 L46 21 Z"
          fill="url(#ofgold)"
        />
        <circle cx="32" cy="9" r="2.4" fill="url(#ofgold)" />
        <circle cx="18" cy="13" r="2" fill="url(#ofgold)" />
        <circle cx="46" cy="13" r="2" fill="url(#ofgold)" />

        {/* B */}
        <path
          d="M22 24 h13 a9 9 0 0 1 0 18 h-1 a9.5 9.5 0 0 1 1 19 H22 Z M30 31 v6 h4 a3 3 0 0 0 0-6 Z M30 44 v10 h5 a5 5 0 0 0 0-10 Z"
          fill="url(#ofgold)"
        />
      </svg>
      {withText && (
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Of<span className="text-gold">Builder</span>
        </span>
      )}
    </span>
  );
}
