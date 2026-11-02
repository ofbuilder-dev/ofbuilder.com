import type { Metadata } from "next";
import StoppingCalc from "@/components/tools/StoppingCalc";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "UK Stopping Distances Calculator (Highway Code)" },
  description: "UK stopping distances from 20 to 70 mph: thinking, braking and total distance from the Highway Code, plus wet and icy roads. Learn them for your theory test.",
  alternates: { canonical: "/tools/stopping-distances/" },
};

const ROWS: [string, string, string, string][] = [
  ["20 mph", "6 m", "6 m", "12 m"],
  ["30 mph", "9 m", "14 m", "23 m"],
  ["40 mph", "12 m", "24 m", "36 m"],
  ["50 mph", "15 m", "38 m", "53 m"],
  ["60 mph", "18 m", "55 m", "73 m"],
  ["70 mph", "21 m", "75 m", "96 m"],
];

export default function StoppingDistances() {
  return (
    <ToolShell
      path="/tools/stopping-distances/"
      name="Stopping distances"
      eyebrow="Free tool"
      title="UK stopping distances"
      intro="Slide the speed and switch the road conditions to see how far it takes to stop. Stopping distance questions come up a lot in the theory test."
      apps={["driving-theory", "motorcycle-theory"]}
    >
      <StoppingCalc />
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Highway Code stopping distances (dry road)</h2>
        <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
          <table className="w-full text-left">
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                {["Speed", "Thinking", "Braking", "Total"].map((h) => (
                  <th key={h} className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 || j === 3 ? "font-bold" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[#3d3d52]">
          <b>Memory tip:</b> thinking distance goes up by 3 m for every 10 mph. In wet weather braking distances can be at least double, and on ice up to ten times longer.
        </p>
        <p className="mt-2 text-sm text-[#6b6b80]">Figures are the typical stopping distances shown in the Highway Code. Real distances depend on the driver, vehicle, tyres and road.</p>
      </section>
    </ToolShell>
  );
}
