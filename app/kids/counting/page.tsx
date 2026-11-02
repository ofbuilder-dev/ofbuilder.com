import type { Metadata } from "next";
import CountingGarden from "@/components/extras/CountingGarden";
import KidsShell from "@/components/extras/KidsShell";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Free Counting Game for Kids: Counting Garden (1 to 10)" },
  description: "A free counting game for toddlers and preschoolers. Count the pictures, tap the right number and collect stars. Numbers 1 to 10, no ads, no sign-up.",
  alternates: { canonical: "/kids/counting/" },
  openGraph: { title: "Counting Garden: a free counting game for kids", url: "/kids/counting/", images: ogImage("brightkids", "BrightKids") },
};

export default function CountingPage() {
  return (
    <KidsShell path="/kids/counting/" title="Counting Garden" emoji="🍎" intro="Count the pictures, then tap the right number. Turn the sound on!">
      {(playUrl) => <CountingGarden playUrl={playUrl} />}
    </KidsShell>
  );
}
