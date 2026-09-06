import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import Link from "next/link";

export const metadata: Metadata = {
  title: "全記事",
  description: "Culture & Business の全記事一覧。歴史と美術の視点からビジネスを読み解く記事をお届けします。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2">Archive</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">全記事</h1>
        <p className="text-stone-400 text-sm">{articles.length} 件の記事</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Article list */}
        <div className="lg:col-span-3">
          {articles.length > 0
            ? articles.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
            : <p className="text-stone-400 py-12 text-center">記事を準備中です。</p>
          }
        </div>

        {/* Sidebar: categories */}
        <aside>
          <div className="sticky top-24">
            <h2 className="font-serif text-base font-bold text-stone-900 pb-2 mb-4 border-b-2 border-amber-600">
              カテゴリ
            </h2>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`}
                    className="flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 py-1.5 transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-amber-500 transition-colors flex-shrink-0" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
