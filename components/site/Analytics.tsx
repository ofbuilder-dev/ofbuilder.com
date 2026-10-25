"use client";

import { useEffect } from "react";
import { GOATCOUNTER_CODE, track } from "@/lib/analytics";

// Loads GoatCounter when configured and counts every Google Play click as an event.
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href*='play.google.com']") as HTMLAnchorElement | null;
      if (a) track("play_click", location.pathname.replace(/^\/|\/$/g, "") || "home");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GOATCOUNTER_CODE) return null;
  return <script data-goatcounter={`https://${GOATCOUNTER_CODE}.goatcounter.com/count`} async src="https://gc.zgo.at/count.js" />;
}
