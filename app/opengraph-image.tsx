import { ImageResponse } from "next/og";

export const alt = "Culture & Business | 歴史と美術が切り拓くビジネスの未来";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top border */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "#1A1A1A", display: "flex" }} />
        {/* Gold accent */}
        <div style={{ position: "absolute", top: 8, left: 0, width: "100%", height: "3px", background: "#C9A84C", display: "flex" }} />

        {/* Left decorative line */}
        <div style={{ position: "absolute", left: 60, top: 60, bottom: 60, width: "1px", background: "#D0C9BE", display: "flex" }} />
        {/* Right decorative line */}
        <div style={{ position: "absolute", right: 60, top: 60, bottom: 60, width: "1px", background: "#D0C9BE", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "0 120px", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.45em", color: "#999", textTransform: "uppercase", display: "flex" }}>
            HISTORY · ART · BUSINESS
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", lineHeight: 1.1, display: "flex" }}>
            Culture &amp; Business
          </div>
          <div style={{ width: 80, height: 2, background: "#C9A84C", display: "flex" }} />
          <div style={{ fontSize: 24, color: "#555", display: "flex", lineHeight: 1.5 }}>
            歴史と美術の知恵をビジネスに活かす
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, display: "flex", fontSize: 14, letterSpacing: "0.2em", color: "#aaa" }}>
          culture-and-business.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
