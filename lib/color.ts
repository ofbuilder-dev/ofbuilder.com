// Colour helpers for readable text: darken a brand colour until white text on it (or it on white) passes WCAG AA.
function luminance(hex: string) {
  const n = parseInt(hex.slice(1, 7), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

export const contrastWithWhite = (hex: string) => 1.05 / (luminance(hex) + 0.05);

/** The colour, darkened just enough to reach a 4.5:1 contrast ratio against white. */
export function ink(hex: string, target = 4.5) {
  let [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  let out = hex;
  for (let i = 0; i < 40 && contrastWithWhite(out) < target; i++) {
    [r, g, b] = [r, g, b].map((v) => Math.round(v * 0.94));
    out = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }
  return out;
}
