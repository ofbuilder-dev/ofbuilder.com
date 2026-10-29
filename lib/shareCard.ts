// Draws a square, shareable score card on a canvas (client-side only) and returns it as a PNG blob.
export type CardInput = {
  headline: string; // e.g. "I passed the Life in the UK mock test!"
  big: string; // e.g. "21/24"
  sub: string; // e.g. "88% · pass mark 18/24"
  color: string;
  icon: string; // same-origin image URL
  appName: string;
  url: string; // shown at the bottom, without protocol
  cta?: string; // button text on the card, e.g. "Try it free →"
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Breaks text into lines that fit maxWidth.
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function drawScoreCard(c: CardInput): Promise<Blob | null> {
  const S = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  try {
    await document.fonts?.ready;
  } catch {
    /* fall back to whatever font is loaded */
  }
  const display = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "sans-serif";
  const body = getComputedStyle(document.documentElement).getPropertyValue("--font-inter").trim() || "sans-serif";

  // Background: app colour into deep navy, with soft glows.
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, c.color);
  bg.addColorStop(1, "#0f0f1a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);
  const glow = (x: number, y: number, r: number, col: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  };
  glow(900, 140, 420, "rgba(255,255,255,0.18)");
  glow(120, 980, 460, "rgba(139,92,246,0.35)");

  // App icon + name
  const icon = await loadImage(c.icon);
  if (icon) {
    ctx.save();
    roundRect(ctx, 80, 80, 120, 120, 30);
    ctx.clip();
    ctx.drawImage(icon, 80, 80, 120, 120);
    ctx.restore();
  }
  ctx.fillStyle = "#fff";
  ctx.font = `800 44px ${display}`;
  ctx.textBaseline = "middle";
  ctx.fillText(c.appName, icon ? 230 : 80, 140, S - 320);

  // Headline
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 64px ${display}`;
  const lines = wrap(ctx, c.headline, S - 160).slice(0, 3);
  lines.forEach((l, i) => ctx.fillText(l, 80, 340 + i * 78));

  // Big score
  const top = 340 + lines.length * 78 + 40;
  ctx.font = `800 260px ${display}`;
  ctx.fillText(c.big, 72, top + 220);

  ctx.font = `600 40px ${body}`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(c.sub, 80, top + 300, S - 160);

  // Footer pill
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  roundRect(ctx, 80, S - 170, S - 160, 96, 48);
  ctx.fill();
  ctx.fillStyle = "#0f0f1a";
  ctx.font = `700 36px ${body}`;
  ctx.textBaseline = "middle";
  ctx.fillText(c.cta ?? "Try it free →", 120, S - 122);
  ctx.textAlign = "right";
  ctx.fillStyle = c.color;
  ctx.font = `700 ${c.url.length > 30 ? 28 : 36}px ${body}`;
  ctx.fillText(c.url, S - 120, S - 122, 560);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}
