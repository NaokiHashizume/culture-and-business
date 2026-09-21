import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import SearchForm from "@/components/SearchForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "記事を検索 | Culture & Business",
  description: "Culture & Businessの記事をキーワードで検索できます。",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const allArticles = getAllArticles();
  const results = query
    ? allArticles.filter((a) => {
        const lower = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(lower) ||
          a.excerpt.toLowerCase().includes(lower) ||
          a.category.toLowerCase().includes(lower) ||
          a.tags.some((t) => t.toLowerCase().includes(lower))
        );
      })
    : allArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="page-header">
        <nav className="text-xs mb-3 flex items-center gap-1.5 text-muted-var">
          <Link href="/" className="hover-text-brand transition-colors">ホーム</Link>
          <span style={{ color: "var(--border-soft)" }}>/</span>
          <span className="text-fg">検索</span>
        </nav>
        <p className="page-eyebrow">SEARCH</p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-fg mb-6">記事を検索</h1>
        <SearchForm initialQuery={query} />
      </div>

      {query && (
        <p className="font-display text-[10px] tracking-[0.2em] text-muted-var mb-6">
          &ldquo;{query}&rdquo; の検索結果：{results.length}件
        </p>
      )}

      <div>
        {results.length > 0 ? (
          results.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
        ) : (
          <p className="text-sm py-12 text-muted-var">該当する記事が見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
}
