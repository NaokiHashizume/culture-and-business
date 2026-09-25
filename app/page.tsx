import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

const categories = ["歴史", "美術"];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Culture & Business",
  "url": siteUrl,
  "description": "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  "inLanguage": "ja",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.find((a) => a.featured) || articles[0];
  const recent = articles.filter((a) => a.slug !== featured?.slug).slice(0, 5);
  const sidebarArticles = articles.filter((a) => a.slug !== featured?.slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      {/* Hero */}
      {featured && <ArticleCard article={featured} variant="featured" />}

      {/* Category navigation strip */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto items-stretch">
            <div className="flex-shrink-0 hidden sm:flex items-center pr-5 mr-1"
              style={{ borderRight: "1px solid var(--border-soft)" }}>
              <span className="font-display text-[8px] tracking-[0.38em]" style={{ color: "var(--muted)" }}>
                CATEGORY
              </span>
            </div>
            {categories.map((cat) => (
              <Link key={cat} href={`/categories/${encodeURIComponent(cat)}`} className="cat-link">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Latest articles */}
          <div className="lg:col-span-2">

            {/* Section header with double rule */}
            <div className="mb-6">
              <div className="flex items-center justify-between pb-3" style={{ borderBottom: "2px solid var(--foreground)" }}>
                <div className="flex items-center gap-3">
                  <span className="inline-block w-5 h-px" style={{ background: "var(--muted)" }} />
                  <h2 className="font-display text-[10px] tracking-[0.32em] text-fg">LATEST ARTICLES</h2>
                  <span className="inline-block w-5 h-px" style={{ background: "var(--muted)" }} />
                </div>
                <Link href="/articles" className="nav-link">すべて見る →</Link>
              </div>
              <div className="h-px mt-[3px]" style={{ background: "var(--border-soft)" }} />
            </div>

            <div>
              {recent.length > 0
                ? recent.map((a) => <ArticleCard key={a.slug} article={a} variant="default" />)
                : <p className="text-sm py-8 text-muted-var">記事を準備中です。</p>
              }
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">

            {sidebarArticles.length > 0 && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "2px solid var(--brand)" }}>
                    <span className="inline-block w-3 h-px" style={{ background: "var(--muted)" }} />
                    <h3 className="font-display text-[10px] text-fg tracking-[0.28em]">FEATURED</h3>
                  </div>
                </div>
                {sidebarArticles.map((a) => <ArticleCard key={a.slug} article={a} variant="compact" />)}
              </div>
            )}

            {/* About card */}
            <div className="relative overflow-hidden p-6" style={{ background: "var(--foreground)", color: "var(--background)" }}>
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "var(--gold)" }} />
              <div className="absolute top-[1px] left-0 w-full h-[2px]" style={{ background: "var(--brand)" }} />
              <p className="font-display text-[9px] tracking-[0.32em] mb-3 mt-1 opacity-50">ABOUT THIS SITE</p>
              <h3 className="font-serif text-lg font-bold mb-3 leading-snug">Culture &amp; Business とは</h3>
              <p className="text-xs leading-relaxed mb-5 opacity-60">
                歴史と美術の視点から現代ビジネスを読み解くメディア。古今東西の知恵を経営に活かします。
              </p>
              <Link href="/about" className="font-display text-[9px] tracking-[0.28em] opacity-60 hover:opacity-100 transition-opacity">
                詳しく見る →
              </Link>
            </div>

            {/* Follow */}
            <div className="p-5" style={{ border: "1px solid var(--border-soft)" }}>
              <p className="font-display text-[9px] tracking-[0.32em] mb-5 text-muted-var">FOLLOW US</p>
              <div className="flex flex-col gap-3">
                {[
                  { href: "https://x.com/culture_and_biz", label: "X  @culture_and_biz", bg: "#0D0D0D", initial: "X" },
                  { href: "https://note.com/culture_and_biz", label: "note", bg: "#41C9B4", initial: "N" },
                  { href: "https://www.instagram.com/culture_and_biz", label: "Instagram", bg: "#E1306C", initial: "IG" },
                ].map(({ href, label, bg, initial }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 flex items-center justify-center text-white font-display text-[9px] flex-shrink-0"
                      style={{ background: bg }}>{initial}</span>
                    <span className="font-display text-[10px] tracking-[0.12em] text-fg">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
