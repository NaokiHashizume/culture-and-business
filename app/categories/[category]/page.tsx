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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const url = `${siteUrl}/categories/${category}`;
  return {
    title: `${decoded}の記事`,
    description: `${decoded}に関する記事一覧。歴史と美術の視点からビジネスを読み解きます。`,
    alternates: { canonical: url },
    openGraph: {
      title: `${decoded}の記事 | Culture & Business`,
      description: `${decoded}に関する記事一覧。歴史と美術の視点からビジネスを読み解きます。`,
      type: "website",
      url,
      locale: "ja_JP",
      siteName: "Culture & Business",
    },
    twitter: {
      card: "summary_large_image",
      site: "@culture_and_biz",
      title: `${decoded}の記事 | Culture & Business`,
      description: `${decoded}に関する記事一覧。歴史と美術の視点からビジネスを読み解きます。`,
    },
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
      <div className="mb-10">
        <nav className="font-display text-[9px] tracking-[0.2em] mb-5 flex items-center gap-2 text-muted-var">
          <Link href="/" className="hover-text-brand transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/articles" className="hover-text-brand transition-colors">ARTICLES</Link>
          <span>/</span>
          <span className="text-fg">{decoded.toUpperCase()}</span>
        </nav>
        <div className="pb-6" style={{ borderBottom: "2px solid var(--foreground)" }}>
          <p className="font-display text-[10px] tracking-[0.3em] mb-2 text-brand">CATEGORY</p>
          <h1 className="font-serif text-4xl font-bold text-fg">{decoded}</h1>
          <p className="font-display text-[10px] tracking-wider mt-2 text-muted-var">{articles.length} ARTICLES</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          {articles.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)}
        </div>

        <aside>
          <div className="sticky top-24">
            <div className="pb-3 mb-4" style={{ borderBottom: "2px solid var(--brand)" }}>
              <h2 className="font-display text-[11px] tracking-[0.2em] text-fg">CATEGORY</h2>
            </div>
            <ul className="space-y-0">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${encodeURIComponent(cat)}`}
                    className={`sidebar-cat-link${cat === decoded ? " active" : ""}`}>
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
