import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) || articles[0];
  const recent = articles.filter((a) => a.slug !== featured?.slug).slice(0, 5);
  const secondaryFeatured = articles.filter((a) => a.slug !== featured?.slug).slice(0, 3);

  return (
    <>
      {/* Hero / Featured article */}
      {featured && (
        <section>
          <ArticleCard article={featured} variant="featured" />
        </section>
      )}

      {/* Category strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-6 overflow-x-auto">
          {["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"].map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat)}`}
              className="text-sm font-medium text-stone-600 hover:text-amber-700 whitespace-nowrap transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Latest articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-stone-900">最新記事</h2>
              <Link href="/articles" className="text-sm text-amber-700 hover:text-amber-800 font-medium">
                すべて見る →
              </Link>
            </div>
            <div>
              {recent.length > 0 ? (
                recent.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))
              ) : (
                <p className="text-stone-400 text-sm">記事を準備中です。</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Recommended */}
            {secondaryFeatured.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 border-b-2 border-amber-600 pb-2 mb-4">
                  注目記事
                </h3>
                <div className="space-y-5">
                  {secondaryFeatured.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            {/* About card */}
            <div className="bg-stone-900 text-white p-6 rounded-sm">
              <h3 className="font-serif text-lg font-bold mb-2">Culture &amp; Business とは</h3>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                歴史と美術の視点から現代ビジネスを読み解くメディアです。マキャベリの戦略論からダヴィンチの創造性まで、古今東西の知恵を経営に活かします。
              </p>
              <Link href="/about" className="text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider">
                詳しく見る →
              </Link>
            </div>

            {/* X follow */}
            <div className="border border-stone-200 p-6 rounded-sm text-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current mx-auto mb-3" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="text-sm text-stone-600 mb-3">最新記事をXでフォロー</p>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-stone-900 text-white text-xs font-semibold px-4 py-2 hover:bg-stone-700 transition-colors"
              >
                フォローする
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
