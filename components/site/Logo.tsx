import { useId } from "react";

// OfBuilder mark: a "B" built from two stacked blocks, with a spark. Source files live in public/brand/.
export default function Logo({ size = 36, withText = true, light = false }: { size?: number; withText?: boolean; light?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <span className={`flex items-center ${size >= 40 ? "gap-3" : "gap-2.5"}`}>
      <svg width={size} height={size} viewBox="0 0 256 256" aria-label="OfBuilder logo" role="img">
        <defs>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF5A6E" />
            <stop offset=".35" stopColor="#FF8A3D" />
            <stop offset=".7" stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <rect width="256" height="256" rx="64" fill={`url(#${id}g)`} />
        <g fill="#fff" fillRule="evenodd">
          <path d="M78 56h70a32 32 0 0 1 0 64H78a14 14 0 0 1-14-14V70a14 14 0 0 1 14-14zM102 79v18h44a9 9 0 0 0 0-18z" />
          <path d="M78 128h78a36 36 0 0 1 0 72H78a14 14 0 0 1-14-14v-44a14 14 0 0 1 14-14zM102 150v28h52a14 14 0 0 0 0-28z" />
        </g>
        <path fill="#fff" d="M206 30c2.4 12.5 6.5 16.6 19 19-12.5 2.4-16.6 6.5-19 19-2.4-12.5-6.5-16.6-19-19 12.5-2.4 16.6-6.5 19-19z" />
      </svg>
      {withText && <span className={`font-display font-extrabold ${size >= 40 ? "text-[1.7rem]" : "text-xl"} ${light ? "text-white" : "text-[#0f0f1a]"}`}>OfBuilder</span>}
    </span>
  );
}
