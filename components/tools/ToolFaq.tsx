import JsonLd from "@/components/site/JsonLd";
import { faqLd } from "@/lib/seo";

// Question-and-answer block under a tool, also published as FAQ structured data.
export default function ToolFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mt-10">
      <JsonLd data={faqLd(items)} />
      <h2 className="font-display text-2xl font-extrabold">Common questions</h2>
      <div className="mt-4 space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 leading-relaxed text-[#3d3d52]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
