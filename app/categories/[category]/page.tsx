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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-xs text-stone-400 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-amber-700 transition-colors">ホーム</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-amber-700 transition-colors">記事一覧</Link>
          <span>/</span>
          <span className="text-stone-600">{decoded}</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2">Category</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-2">{decoded}</h1>
        <p className="text-stone-400 text-sm">{articles.length} 件の記事</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Articles */}
        <div className="lg:col-span-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="default" />
          ))}
        </div>

        {/* Sidebar: other categories */}
        <aside>
          <div className="sticky top-24">
            <h2 className="font-serif text-base font-bold text-stone-900 pb-2 mb-4 border-b-2 border-amber-600">
              カテゴリ一覧
            </h2>
            <ul className="space-y-1">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`}
                    className={`flex items-center gap-2 text-sm py-1.5 transition-colors group ${
                      cat === decoded ? "text-amber-700 font-semibold" : "text-stone-600 hover:text-amber-700"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      cat === decoded ? "bg-amber-500" : "bg-stone-300 group-hover:bg-amber-500"
                    }`} />
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
