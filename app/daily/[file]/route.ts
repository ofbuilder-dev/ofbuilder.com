// Question of the Day pools as small static JSON files (/daily/<app-slug>.json), loaded only when shown,
// so pages don't carry every exam's questions in their HTML.
import { dailyPool, practiceSlugs } from "@/lib/questions";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return practiceSlugs().map((slug) => ({ file: `${slug}.json` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const slug = (await params).file.replace(/\.json$/, "");
  // Only what the card needs: no wording variants.
  const pool = dailyPool(slug).map(({ id, topic, question, options, correct, explanation, image }) => ({ id, topic, question, variants: [question], options, correct, explanation, ...(image ? { image } : {}) }));
  return Response.json(pool);
}
