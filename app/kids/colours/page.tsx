import type { Metadata } from "next";
import ColourPop from "@/components/extras/ColourPop";
import KidsShell from "@/components/extras/KidsShell";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Free Colours Game for Kids: Colour Pop Balloons" },
  description: "A free colours game for toddlers. Hear a colour and pop the matching balloon: red, blue, green, yellow and more. No ads, no sign-up.",
  alternates: { canonical: "/kids/colours/" },
  openGraph: { title: "Colour Pop: a free colours game for kids", url: "/kids/colours/", images: ogImage("brightkids", "BrightKids") },
};

export default function ColoursPage() {
  return (
    <KidsShell path="/kids/colours/" title="Colour Pop" emoji="🎈" intro="Listen for the colour, then pop the matching balloon. Turn the sound on!">
      {(playUrl) => <ColourPop playUrl={playUrl} />}
    </KidsShell>
  );
}
