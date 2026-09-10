import { ImageResponse } from "next/og";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.title ?? "Culture & Business";
  const category = article?.category ?? "";
  const fontSize = title.length > 40 ? 42 : title.length > 28 ? 52 : 62;

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
        {/* Left crimson bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "#C8102E" }} />

        {/* Crimson glow */}
        <div style={{
          position: "absolute", left: 0, bottom: 0, width: 500, height: 400,
          background: "radial-gradient(ellipse at bottom left, rgba(200,16,46,0.28) 0%, transparent 55%)",
        }} />

        {/* Gold glow */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: 420, height: 360,
          background: "radial-gradient(ellipse at top right, rgba(158,122,42,0.18) 0%, transparent 55%)",
        }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 80px 60px 88px", position: "relative" }}>

          {/* Site name */}
          <div style={{ fontSize: 14, letterSpacing: "0.28em", color: "#3A3228", textTransform: "uppercase", marginBottom: 24 }}>
            CULTURE &amp; BUSINESS
          </div>

          {/* Category badge */}
          {category && (
            <div style={{ display: "flex", marginBottom: 20 }}>
              <div style={{
                background: "#C8102E", color: "#fff",
                fontSize: 12, letterSpacing: "0.28em", padding: "7px 16px", textTransform: "uppercase",
              }}>
                {category}
              </div>
            </div>
          )}

          {/* Article title */}
          <div style={{
            fontSize,
            fontWeight: 700,
            color: "#E8DDD0",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            maxWidth: 980,
            marginBottom: 36,
          }}>
            {title}
          </div>

          {/* Bottom label */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 28, height: 1, background: "#9E7A2A" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.32em", color: "#9E7A2A", textTransform: "uppercase" }}>
              HISTORY · ART · STRATEGY
            </span>
          </div>
        </div>

        {/* Gold bottom rule */}
        <div style={{ position: "absolute", bottom: 0, left: 8, right: 0, height: 3, background: "#9E7A2A" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
