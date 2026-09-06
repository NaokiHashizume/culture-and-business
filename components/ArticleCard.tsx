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

  if (variant === "featured") {
    return (
      <Link href={`/articles/${article.slug}`} className="group block">
        <article className="hero-pattern relative overflow-hidden text-white flex flex-col justify-end min-h-[340px] sm:min-h-[460px]">
          {/* Decorative art-deco lines */}
          <div className="absolute top-8 right-8 opacity-20 hidden sm:block" aria-hidden="true">
            <div className="w-24 h-px bg-amber-400 mb-2" />
            <div className="w-16 h-px bg-amber-400 mb-2" />
            <div className="w-20 h-px bg-amber-400" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="relative z-20 p-6 sm:p-12 max-w-4xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-4 border border-amber-400/40 px-3 py-1">
              {article.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 group-hover:text-amber-100 transition-colors duration-300">
              {article.title}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base line-clamp-2 max-w-2xl mb-5 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <time dateTime={article.date}>{formattedDate}</time>
              <span className="w-1 h-1 rounded-full bg-stone-500" aria-hidden="true" />
              <span>{article.readingTime}で読める</span>
              <span className="ml-2 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-block">
                続きを読む →
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-3 py-3 border-b border-stone-100 last:border-0">
        <div className="flex-shrink-0 w-1 bg-stone-200 group-hover:bg-amber-500 transition-colors duration-200 rounded-full" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
            {article.category}
          </span>
          <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2 mt-0.5 leading-snug text-[0.95rem]">
            {article.title}
          </h3>
          <time className="text-xs text-stone-400 mt-1 block" dateTime={article.date}>
            {formattedDate}
          </time>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="py-6 border-b border-stone-100 group-hover:bg-stone-50/70 transition-colors duration-200 -mx-3 px-3 rounded-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-sm">
            {article.category}
          </span>
          <span className="text-stone-300 text-xs">·</span>
          <time className="text-xs text-stone-400" dateTime={article.date}>
            {formattedDate}
          </time>
          <span className="text-stone-300 text-xs">·</span>
          <span className="text-xs text-stone-400">{article.readingTime}</span>
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors duration-200 leading-snug mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-stone-400 px-2 py-0.5 border border-stone-200 rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
