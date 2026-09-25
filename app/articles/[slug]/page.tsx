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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";
  const articleUrl = `${siteUrl}/articles/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: articleUrl,
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: ["Culture & Business"],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
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
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);
  const recent = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const sidebarArticles = related.length > 0 ? related : recent;

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";
  const articleUrl = `${siteUrl}/articles/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": { "@type": "Organization", "name": "Culture & Business", "url": siteUrl },
    "publisher": { "@type": "Organization", "name": "Culture & Business", "url": siteUrl },
    "url": articleUrl,
    "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "inLanguage": "ja",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "記事一覧", "item": `${siteUrl}/articles` },
      { "@type": "ListItem", "position": 3, "name": article.category, "item": `${siteUrl}/categories/${encodeURIComponent(article.category)}` },
      { "@type": "ListItem", "position": 4, "name": article.title, "item": articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">

        {/* Article body */}
        <article className="lg:col-span-3 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs mb-6 flex items-center gap-1.5 flex-wrap text-muted-var">
            <Link href="/" className="hover-text-brand transition-colors">ホーム</Link>
            <span style={{ color: "var(--border-soft)" }}>/</span>
            <Link href="/articles" className="hover-text-brand transition-colors">記事一覧</Link>
            <span style={{ color: "var(--border-soft)" }}>/</span>
            <Link href={`/categories/${encodeURIComponent(article.category)}`} className="hover-text-brand transition-colors">
              {article.category}
            </Link>
          </nav>

          {/* Article header */}
          <header className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--border-soft)" }}>
            <span className="inline-block font-display text-[10px] tracking-[0.25em] px-3 py-1.5 mb-4" style={{ background: "var(--brand)", color: "var(--background)" }}>
              {article.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-fg">
              {article.title}
            </h1>
            <p className="text-base leading-relaxed mb-4 pl-4" style={{ color: "var(--muted)", borderLeft: "3px solid var(--gold)" }}>
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 font-display text-[10px] tracking-wider text-muted-var">
              <time dateTime={article.date}>{formattedDate}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}で読める</span>
              {article.tags.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span key={tag} className="border px-2 py-0.5" style={{ borderColor: "var(--border-soft)" }}>#{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="prose-article">
            <MDXRemote source={article.content} />
          </div>

          {/* Footer: share + nav */}
          <div className="mt-10 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid var(--border-soft)" }}>
            <ShareButtons title={article.title} url={articleUrl} />
            <Link href="/articles" className="nav-link">
              ← 記事一覧へ戻る
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Share */}
            <div className="p-5" style={{ border: "1px solid var(--border-soft)" }}>
              <p className="font-display text-[9px] tracking-[0.32em] mb-4 text-muted-var">SHARE</p>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            {/* Related/Recent articles */}
            <div>
              <div className="flex items-center gap-3 pb-3 mb-1" style={{ borderBottom: "2px solid var(--brand)" }}>
                <span className="inline-block w-3 h-px" style={{ background: "var(--muted)" }} />
                <h3 className="font-display text-[10px] text-fg tracking-[0.28em]">
                  {related.length > 0 ? "関連記事" : "最新記事"}
                </h3>
              </div>
              {sidebarArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>

            {/* About */}
            <div className="relative overflow-hidden p-6" style={{ background: "var(--foreground)", color: "var(--background)" }}>
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "var(--gold)" }} />
              <div className="absolute top-[1px] left-0 w-full h-[2px]" style={{ background: "var(--brand)" }} />
              <p className="font-display text-[9px] tracking-[0.32em] mb-3 mt-1 opacity-50">ABOUT</p>
              <h3 className="font-serif text-lg font-bold mb-3 leading-snug">Culture &amp; Business</h3>
              <p className="text-xs leading-relaxed mb-5 opacity-60">
                歴史と美術の知恵をビジネスに活かすメディア。
              </p>
              <Link href="/about" className="font-display text-[9px] tracking-[0.28em] opacity-60 hover:opacity-100 transition-opacity">
                詳しく見る →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
