const DEFAULT = ["#ff6b6b", "#ffb347", "#4cc9f0", "#8b5cf6"];
const SPOTS = [
  "left-[-10%] top-[-10%] h-[42vmax] w-[42vmax]",
  "right-[-12%] top-[5%] h-[38vmax] w-[38vmax]",
  "left-[25%] bottom-[-20%] h-[36vmax] w-[36vmax]",
  "right-[15%] bottom-[-10%] h-[28vmax] w-[28vmax]",
];

export default function Blobs({ colors = DEFAULT, opacity }: { colors?: string[]; opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {colors.slice(0, 4).map((c, i) => (
        <div key={i} className={`blob ${SPOTS[i]}`} style={{ background: c, opacity }} />
      ))}
    </div>
  );
}
