// Renders 1200×630 social share images (Open Graph) with next/og.
import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Bricolage Grotesque (SIL Open Font License), the site's display font, as static TTFs for Satori.
const font = (w: number) => fs.readFileSync(path.join(process.cwd(), "lib", "fonts", `bricolage-${w}.ttf`));

function dataUrl(publicPath: string) {
  const file = path.join(process.cwd(), "public", publicPath);
  return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
}

type Card = {
  title: string;
  subtitle: string;
  kicker: string;
  icon?: string; // public path to a PNG
  from: string;
  to: string;
  dark?: boolean;
};

export function renderOg({ title, subtitle, kicker, icon, from, to, dark }: Card) {
  const fg = dark ? "#ffffff" : "#0f0f1a";
  const sub = dark ? "rgba(255,255,255,0.78)" : "#3d3d52";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          background: dark ? `linear-gradient(135deg, ${from} 0%, #0b0b1a 75%)` : `linear-gradient(135deg, #fffbf5 0%, #fffbf5 35%, ${from}2e 75%, ${to}40 100%)`,
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={dataUrl("/brand/ofbuilder-mark-1024.png")} width={56} height={56} style={{ borderRadius: 14 }} />
            <div style={{ fontSize: 34, fontWeight: 800, color: fg }}>OfBuilder</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: dark ? to : from, textTransform: "uppercase", letterSpacing: 3 }}>{kicker}</div>
            <div style={{ fontSize: title.length > 26 ? 68 : 84, fontWeight: 800, color: fg, lineHeight: 1.02, marginTop: 14, maxWidth: icon ? 760 : 1050 }}>{title}</div>
            <div style={{ fontSize: 32, fontWeight: 500, color: sub, marginTop: 22, maxWidth: icon ? 760 : 1000, lineHeight: 1.3 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: sub }}>ofbuilder.com</div>
        </div>
        {icon && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300 }}>
            <img src={dataUrl(icon)} width={280} height={280} style={{ borderRadius: 64, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }} />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: font(800), weight: 800, style: "normal" },
        { name: "Bricolage", data: font(500), weight: 500, style: "normal" },
      ],
    },
  );
}
