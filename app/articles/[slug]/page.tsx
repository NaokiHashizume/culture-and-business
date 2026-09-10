import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import ShareButtons from "@/components/ShareButtons";
import ArticleCard from "@/components/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const url = `${siteUrl}/articles/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: "Culture & Business", url: siteUrl }],
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      publishedTime: article.date,
      authors: ["Culture & Business"],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@culture_and_biz",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3);
  const recent = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const sidebarArticles = related.length > 0 ? related : recent;

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric", month: "long", day: "numeric",
  });

  const articleUrl = `${siteUrl}/articles/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "url": articleUrl,
    "datePublished": article.date,
    "inLanguage": "ja",
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "author": { "@type": "Organization", "name": "Culture & Business", "url": siteUrl },
    "publisher": { "@type": "Organization", "name": "Culture & Business", "url": siteUrl },
    "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">

        {/* Article body */}
        <article className="lg:col-span-3 min-w-0">
          <nav className="flex items-center gap-2 mb-8 font-display text-[9px] tracking-[0.2em] text-muted-var">
            <Link href="/" className="hover-text-brand transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/articles" className="hover-text-brand transition-colors">ARTICLES</Link>
            <span>/</span>
            <Link href={`/categories/${encodeURIComponent(article.category)}`} className="hover-text-brand transition-colors">
              {article.category.toUpperCase()}
            </Link>
          </nav>

          <header className="mb-10 pb-8 border-soft" style={{ borderBottom: "1px solid var(--border-soft)" }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-[10px] tracking-[0.3em] px-3 py-1.5 text-white bg-brand">
                {article.category}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-fg">
              {article.title}
            </h1>
            <p className="text-lg leading-relaxed mb-6 pl-4 text-muted-var" style={{ borderLeft: "3px solid var(--brand)" }}>
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 font-display text-[10px] tracking-wider text-muted-var">
              <time dateTime={article.date}>{formattedDate}</time>
              <span>—</span>
              <span>{article.readingTime}で読める</span>
              {article.tags.length > 0 && (
                <>
                  <span>—</span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="border px-2 py-0.5 border-soft">#{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          <div className="prose-article">
            <MDXRemote source={article.content} />
          </div>

          <div className="mt-12 pt-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <ShareButtons title={article.title} url={articleUrl} />
            <Link href="/articles" className="nav-link">← ALL ARTICLES</Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className="p-5" style={{ border: "1px solid var(--border-soft)" }}>
              <p className="font-display text-[9px] tracking-[0.3em] mb-4 text-muted-var">SHARE</p>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            <div>
              <div className="pb-3 mb-2" style={{ borderBottom: "2px solid var(--brand)" }}>
                <h3 className="font-display text-[11px] tracking-[0.2em] text-fg">
                  {related.length > 0 ? "関連記事" : "最新記事"}
                </h3>
              </div>
              {sidebarArticles.map((a) => <ArticleCard key={a.slug} article={a} variant="compact" />)}
            </div>

            <div className="p-5 relative overflow-hidden bg-fg" style={{ color: "var(--background)" }}>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-brand" />
              <p className="font-display text-[9px] tracking-[0.3em] mb-2 text-brand">ABOUT</p>
              <h3 className="font-serif font-bold mb-2 leading-snug">Culture &amp; Business</h3>
              <p className="text-xs leading-relaxed mb-3 opacity-70">歴史と美術の知恵をビジネスに活かすメディア。</p>
              <Link href="/about" className="font-display text-[9px] tracking-[0.2em] text-brand">詳しく →</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
