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
        <article className="relative overflow-hidden bg-stone-900 text-white aspect-[16/9] sm:aspect-[21/9] flex flex-col justify-end">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent z-10" />
          <div className="relative z-20 p-6 sm:p-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3 border border-amber-400/50 px-2 py-0.5">
              {article.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-3 group-hover:text-amber-100 transition-colors">
              {article.title}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base line-clamp-2 max-w-2xl mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <time dateTime={article.date}>{formattedDate}</time>
              <span>·</span>
              <span>{article.readingTime}で読める</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="group flex gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
            {article.category}
          </span>
          <h3 className="font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mt-0.5 leading-snug">
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
      <article className="border-t border-stone-200 pt-4 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            {article.category}
          </span>
          <span className="text-stone-300">·</span>
          <time className="text-xs text-stone-400" dateTime={article.date}>
            {formattedDate}
          </time>
          <span className="text-stone-300">·</span>
          <span className="text-xs text-stone-400">{article.readingTime}</span>
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
