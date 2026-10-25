/* eslint-disable @next/next/no-img-element */
export default function AppIcon({
  src,
  name,
  size = 64,
  className = "",
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden bg-white shadow-[0_10px_30px_-10px_rgba(15,15,26,0.35)] ring-1 ring-black/5 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.24 }}
    >
      <img src={src} alt={`${name} app icon`} width={size} height={size} className="h-full w-full scale-[1.04] object-cover" loading="lazy" />
    </span>
  );
}
