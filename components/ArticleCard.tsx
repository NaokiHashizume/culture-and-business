import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface Props {
  article: ArticleMeta;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* ── Featured ──────────────────────────────────────────── */
  if (variant === "featured") {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <article className="hero-pattern relative overflow-hidden text-white flex flex-col justify-end min-h-[420px] sm:min-h-[580px]">

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

          {/* Top gold label */}
          <div className="absolute top-0 left-0 right-0 z-20 px-8 sm:px-14 pt-8 hidden sm:flex items-center gap-4">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="font-display text-[9px] tracking-[0.38em]" style={{ color: "var(--gold)" }}>
              FEATURE ARTICLE
            </span>
            <div className="h-px w-16" style={{ background: "rgba(158,122,42,0.35)" }} />
          </div>

          {/* Content */}
          <div className="relative z-20 px-8 sm:px-14 pb-10 sm:pb-14 max-w-5xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-[10px] tracking-[0.3em] px-3 py-1.5 text-white" style={{ background: "var(--brand)" }}>
                {article.category}
              </span>
              {article.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="font-display text-[9px] tracking-wider border border-white/20 px-2 py-1 text-white/45">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-5 transition-colors duration-300 group-hover:text-[#E8DDD0]">
              {article.title}
            </h1>

            <p className="text-white/50 text-sm sm:text-base line-clamp-2 max-w-2xl mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 font-display text-[9px] tracking-wider text-white/35">
                <time dateTime={article.date}>{formattedDate}</time>
                <span>·</span>
                <span>{article.readingTime}で読める</span>
              </div>
              <span className="font-display text-[10px] tracking-[0.25em] text-white/50 group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                続きを読む
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  /* ── Compact ────────────────────────────────────────────── */
  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-4 py-4 border-b"
        style={{ borderColor: "var(--border-soft)" }}>
        <div className="flex-shrink-0 w-[2px] self-stretch transition-colors duration-200 group-hover:bg-brand"
          style={{ background: "var(--border-soft)" }} />
        <div className="flex-1 min-w-0">
          <span className="font-display text-[9px] tracking-[0.25em]" style={{ color: "var(--brand)" }}>
            {article.category}
          </span>
          <h3 className="font-serif font-bold transition-colors duration-200 line-clamp-2 mt-1 leading-snug text-[0.9rem] group-hover:text-brand"
            style={{ color: "var(--foreground)" }}>
            {article.title}
          </h3>
          <time className="font-display text-[9px] tracking-wider mt-1.5 block" style={{ color: "var(--muted)" }}
            dateTime={article.date}>{formattedDate}</time>
        </div>
      </Link>
    );
  }

  /* ── Default ────────────────────────────────────────────── */
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="py-7 border-b" style={{ borderColor: "var(--border-soft)" }}>
        <div className="flex gap-5">

          {/* Left accent bar — grows on hover */}
          <div className="flex-shrink-0 pt-1">
            <div className="w-[3px] h-14 transition-colors duration-300 group-hover:bg-brand"
              style={{ background: "var(--border-soft)" }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2.5">
              <span className="font-display text-[9px] tracking-[0.25em] px-2 py-0.5 text-white" style={{ background: "var(--brand)" }}>
                {article.category}
              </span>
              <time className="font-display text-[9px] tracking-wider" style={{ color: "var(--muted)" }} dateTime={article.date}>
                {formattedDate}
              </time>
              <span style={{ color: "var(--border-soft)" }}>·</span>
              <span className="font-display text-[9px] tracking-wider" style={{ color: "var(--muted)" }}>
                {article.readingTime}
              </span>
            </div>

            <h2 className="font-serif text-xl font-bold leading-snug mb-2.5 transition-colors duration-200 group-hover:text-brand"
              style={{ color: "var(--foreground)" }}>
              {article.title}
            </h2>

            <p className="text-sm line-clamp-2 leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              {article.excerpt}
            </p>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-display text-[9px] tracking-wider px-2 py-0.5 border"
                    style={{ color: "var(--muted)", borderColor: "var(--border-soft)" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
