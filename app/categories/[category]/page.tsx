import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: encodeURIComponent(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded}の記事`,
    description: `${decoded}に関する記事一覧。歴史と美術の視点からビジネスを読み解きます。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const articles = getArticlesByCategory(decoded);
  const allCategories = getAllCategories();

  if (articles.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="page-header">
        <nav className="text-xs mb-3 flex items-center gap-1.5 text-muted-var">
          <Link href="/" className="hover-text-brand transition-colors">ホーム</Link>
          <span style={{ color: "var(--border-soft)" }}>/</span>
          <Link href="/articles" className="hover-text-brand transition-colors">記事一覧</Link>
          <span style={{ color: "var(--border-soft)" }}>/</span>
          <span className="text-fg">{decoded}</span>
        </nav>
        <p className="page-eyebrow">CATEGORY</p>
        <div className="flex items-end justify-between flex-wrap gap-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-fg">{decoded}</h1>
          <p className="font-display text-[10px] tracking-[0.2em] text-muted-var">{articles.length} ARTICLES</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Articles */}
        <div className="lg:col-span-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="default" />
          ))}
        </div>

        {/* Sidebar: other categories */}
        <aside>
          <div className="sticky top-24">
            <div className="flex items-center gap-3 pb-3 mb-1" style={{ borderBottom: "2px solid var(--brand)" }}>
              <span className="inline-block w-3 h-px" style={{ background: "var(--muted)" }} />
              <h2 className="font-display text-[10px] tracking-[0.28em] text-fg">カテゴリ一覧</h2>
            </div>
            <ul>
              {allCategories.map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`}
                    className={`sidebar-cat-link ${cat === decoded ? "active" : ""}`}>
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
