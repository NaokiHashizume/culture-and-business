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
      <div className="mb-10 pb-6" style={{ borderBottom: "2px solid var(--foreground)" }}>
        <p className="font-display text-[10px] tracking-[0.3em] mb-2 text-brand">ARCHIVE</p>
        <h1 className="font-serif text-4xl font-bold text-fg">全記事</h1>
        <p className="font-display text-[10px] tracking-wider mt-2 text-muted-var">{articles.length} ARTICLES</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          {articles.length > 0
            ? articles.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
            : <p className="py-12 text-center text-muted-var">記事を準備中です。</p>
          }
        </div>

        <aside>
          <div className="sticky top-24">
            <div className="pb-3 mb-4" style={{ borderBottom: "2px solid var(--brand)" }}>
              <h2 className="font-display text-[11px] tracking-[0.2em] text-fg">CATEGORY</h2>
            </div>
            <ul className="space-y-0">
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
