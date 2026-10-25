// Privacy-friendly analytics via GoatCounter (free, no cookies, no consent banner needed).
// Set GOATCOUNTER_CODE to your GoatCounter site code (the "xyz" in xyz.goatcounter.com) to switch it on.
export const GOATCOUNTER_CODE = "";

type GoatCounter = { count?: (o: { path: string; title?: string; event?: boolean }) => void };

/** Records a custom event, e.g. track("mock_finish", "life-in-the-uk"). A no-op until analytics is configured. */
export function track(event: string, label?: string) {
  if (typeof window === "undefined") return;
  try {
    const gc = (window as unknown as { goatcounter?: GoatCounter }).goatcounter;
    gc?.count?.({ path: label ? `${event}/${label}` : event, title: label ?? event, event: true });
  } catch {
    /* analytics must never break the page */
  }
}
