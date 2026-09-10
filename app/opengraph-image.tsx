import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Culture & Business | 歴史と美術が切り拓くビジネスの未来";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0E0B08",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left crimson accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "#C8102E" }} />

        {/* Crimson radial glow — bottom left */}
        <div style={{
          position: "absolute", left: 0, bottom: 0, width: 560, height: 420,
          background: "radial-gradient(ellipse at bottom left, rgba(200,16,46,0.32) 0%, transparent 55%)",
        }} />

        {/* Gold radial glow — top right */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: 480, height: 380,
          background: "radial-gradient(ellipse at top right, rgba(158,122,42,0.22) 0%, transparent 55%)",
        }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 80px 64px 88px", position: "relative" }}>

          {/* Top eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
            <div style={{ width: 36, height: 1, background: "#9E7A2A" }} />
            <span style={{ fontSize: 13, letterSpacing: "0.38em", color: "#9E7A2A", textTransform: "uppercase" }}>
              HISTORY · ART · STRATEGY
            </span>
          </div>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: 18, lineHeight: 1 }}>
            <span style={{ fontSize: 78, fontWeight: 700, color: "#E8DDD0", letterSpacing: "-0.01em" }}>CULTURE</span>
            <span style={{ fontSize: 78, fontWeight: 300, color: "#C8102E", margin: "0 14px" }}>&amp;</span>
            <span style={{ fontSize: 78, fontWeight: 700, color: "#E8DDD0", letterSpacing: "-0.01em" }}>BUSINESS</span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 18, letterSpacing: "0.22em", color: "#7A7060" }}>
            歴史と美術の知恵をビジネスに活かすメディア
          </div>
        </div>

        {/* Gold bottom rule */}
        <div style={{ position: "absolute", bottom: 0, left: 8, right: 0, height: 3, background: "#9E7A2A" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
