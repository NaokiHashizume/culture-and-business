import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ category: encodeURIComponent(c) }));
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

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2 block">カテゴリ</span>
        <h1 className="font-serif text-3xl font-bold text-stone-900">{decoded}</h1>
        <p className="text-stone-500 mt-2 text-sm">{articles.length} 件の記事</p>
      </div>

      <div className="max-w-3xl">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="default" />
        ))}
      </div>
    </div>
  );
}
