import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import StoppingCalc from "@/components/tools/StoppingCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "UK Stopping Distances Calculator (Highway Code)" },
  description: "UK stopping distances from 20 to 70 mph: thinking, braking and total distance from the Highway Code, plus wet and icy roads. Learn them for your theory test.",
  alternates: { canonical: "/tools/stopping-distances/" },
}, "driving-theory");

const ROWS: [string, string, string, string, string][] = [
  ["20 mph", "6 m", "6 m", "12 m", "3"],
  ["30 mph", "9 m", "14 m", "23 m", "6"],
  ["40 mph", "12 m", "24 m", "36 m", "9"],
  ["50 mph", "15 m", "38 m", "53 m", "13"],
  ["60 mph", "18 m", "55 m", "73 m", "18"],
  ["70 mph", "21 m", "75 m", "96 m", "24"],
];

const FAQ = [
  { q: "What is the stopping distance at 30 mph?", a: "23 metres in the Highway Code: 9 metres thinking distance plus 14 metres braking distance. That's about 6 car lengths." },
  { q: "What is the stopping distance at 70 mph?", a: "96 metres: 21 metres thinking distance plus 75 metres braking distance, or about 24 car lengths." },
  { q: "What is the difference between thinking and braking distance?", a: "Thinking distance is how far you travel between seeing a hazard and pressing the brake. Braking distance is how far you travel once the brakes are on. Together they make the stopping distance." },
  { q: "How does the weather affect stopping distances?", a: "On wet roads, stopping distances can be at least double. On icy roads, braking distances can be up to ten times longer, so slow down and leave a much bigger gap." },
  { q: "How do I remember the stopping distances for the theory test?", a: "Thinking distance goes up by 3 metres for every 10 mph: 6, 9, 12, 15, 18, 21. Learn that pattern, then learn the six braking distances: 6, 14, 24, 38, 55 and 75 metres." },
  { q: "What is the two-second rule?", a: "On a fast road in good conditions, leave at least a two-second gap to the vehicle in front. Double it on wet roads, and leave even more on icy roads." },
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
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                {["Speed", "Thinking", "Braking", "Total", "Cars"].map((h) => (
                  <th key={h} className="px-2 py-3 sm:px-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                  {r.map((c, j) => (
                    <td key={j} className={`px-2 py-3 sm:px-4 ${j === 0 || j === 3 ? "font-bold" : ""}`}>
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
        <p className="mt-4 text-[#3d3d52]">
          Want the full explanation, including the two-second rule? Read{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-06-uk-stopping-distances-highway-code/">UK stopping distances: the Highway Code chart explained</a>.
        </p>
      </section>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
