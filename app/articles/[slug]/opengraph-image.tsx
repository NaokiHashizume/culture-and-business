import { ImageResponse } from "next/og";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

export const alt = "Culture & Business";
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
  const excerpt = article?.excerpt ?? "";
  const truncatedExcerpt = excerpt.length > 80 ? excerpt.slice(0, 80) + "…" : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top border */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "#1A1A1A", display: "flex" }} />
        {/* Gold accent */}
        <div style={{ position: "absolute", top: 8, left: 0, width: "100%", height: "3px", background: "#C9A84C", display: "flex" }} />

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            background: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 60px",
          }}
        >
          <div style={{ fontSize: 14, letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", display: "flex" }}>
            Culture &amp; Business
          </div>
          <div style={{ fontSize: 13, letterSpacing: "0.2em", color: "#666", display: "flex" }}>
            culture-and-business.vercel.app
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", padding: "70px 60px 100px", flex: 1, justifyContent: "center", gap: "24px" }}>
          {category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ width: 32, height: 2, background: "#C9A84C", display: "flex" }} />
              <div style={{ fontSize: 13, letterSpacing: "0.35em", color: "#C9A84C", textTransform: "uppercase", display: "flex" }}>
                {category}
              </div>
            </div>
          )}

          <div
            style={{
              fontSize: title.length > 30 ? 44 : 52,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.2,
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "100%",
            }}
          >
            {title}
          </div>

          {truncatedExcerpt && (
            <div style={{ fontSize: 18, color: "#666", lineHeight: 1.6, display: "flex", maxWidth: 900 }}>
              {truncatedExcerpt}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
