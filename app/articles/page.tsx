import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "全記事",
  description: "Culture & Business の全記事一覧。歴史と美術の視点からビジネスを読み解く記事をお届けします。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900">全記事</h1>
        <p className="text-stone-500 mt-2 text-sm">{articles.length} 件の記事</p>
      </div>

      <div className="max-w-3xl">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="default" />
          ))
        ) : (
          <p className="text-stone-400">記事を準備中です。</p>
        )}
      </div>
    </div>
  );
}
