import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

const categories = ["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"];

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) || articles[0];
  const recent = articles.filter((a) => a.slug !== featured?.slug).slice(0, 5);
  const sidebarArticles = articles.filter((a) => a.slug !== featured?.slug).slice(0, 4);

  return (
    <>
      {/* Hero */}
      {featured && <ArticleCard article={featured} variant="featured" />}

      {/* Category strip */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <Link key={cat}
                href={`/categories/${encodeURIComponent(cat)}`}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 hover:text-amber-700 hover:bg-amber-50 whitespace-nowrap transition-colors px-4 py-3 border-b-2 border-transparent hover:border-amber-500">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Latest articles */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline justify-between mb-6 pb-3 border-b-2 border-stone-900">
              <h2 className="font-serif text-xl font-bold text-stone-900 tracking-tight">最新記事</h2>
              <Link href="/articles" className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 transition-colors">
                すべて見る →
              </Link>
            </div>
            <div>
              {recent.length > 0
                ? recent.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
                : <p className="text-stone-400 text-sm py-8">記事を準備中です。</p>
              }
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Recent sidebar */}
            {sidebarArticles.length > 0 && (
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 pb-2 mb-1 border-b-2 border-amber-600">
                  注目記事
                </h3>
                <div>
                  {sidebarArticles.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            {/* About card */}
            <div className="bg-stone-900 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/10 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">About</p>
              <h3 className="font-serif text-lg font-bold mb-3 leading-snug">Culture &amp; Business とは</h3>
              <p className="text-sm text-stone-300 leading-relaxed mb-4">
                歴史と美術の視点から現代ビジネスを読み解くメディア。古今東西の知恵を経営に活かします。
              </p>
              <Link href="/about"
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider transition-colors">
                詳しく見る <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Follow card */}
            <div className="border border-stone-200 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 mb-4">Follow Us</p>
              <div className="flex flex-col gap-3">
                <a href="https://x.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group">
                  <span className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center rounded-sm flex-shrink-0 group-hover:bg-amber-700 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                  X @culture_and_biz
                </a>
                <a href="https://note.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group">
                  <span className="w-8 h-8 bg-stone-100 text-stone-700 flex items-center justify-center rounded-sm flex-shrink-0 text-xs font-black group-hover:bg-amber-100 transition-colors">
                    n
                  </span>
                  note
                </a>
                <a href="https://www.instagram.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group">
                  <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center rounded-sm flex-shrink-0 group-hover:opacity-90 transition-opacity">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </span>
                  Instagram
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
