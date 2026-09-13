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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="page-header">
        <p className="page-eyebrow">ARCHIVE</p>
        <div className="flex items-end justify-between flex-wrap gap-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-fg">全記事</h1>
          <p className="font-display text-[10px] tracking-[0.2em] text-muted-var">{articles.length} ARTICLES</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Article list */}
        <div className="lg:col-span-3">
          {articles.length > 0
            ? articles.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
            : <p className="text-sm py-10 text-center text-muted-var">記事を準備中です。</p>
          }
        </div>

        {/* Sidebar: categories */}
        <aside>
          <div className="sticky top-24">
            <div className="flex items-center gap-3 pb-3 mb-1" style={{ borderBottom: "2px solid var(--brand)" }}>
              <span className="inline-block w-3 h-px" style={{ background: "var(--muted)" }} />
              <h2 className="font-display text-[10px] tracking-[0.28em] text-fg">CATEGORY</h2>
            </div>
            <ul>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`} className="sidebar-cat-link">
                    <span className="cat-line" />
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
