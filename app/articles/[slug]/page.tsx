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
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">

        {/* Article body */}
        <article className="lg:col-span-3 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-400 mb-8 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-amber-700 transition-colors">ホーム</Link>
            <span className="text-stone-300">/</span>
            <Link href="/articles" className="hover:text-amber-700 transition-colors">記事一覧</Link>
            <span className="text-stone-300">/</span>
            <Link href={`/categories/${encodeURIComponent(article.category)}`} className="hover:text-amber-700 transition-colors">
              {article.category}
            </Link>
          </nav>

          {/* Article header */}
          <header className="mb-10 pb-8 border-b border-stone-200">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 mb-5">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-5">
              {article.title}
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed mb-5 border-l-4 border-stone-200 pl-4">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
              <time dateTime={article.date} className="font-medium">{formattedDate}</time>
              <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
              <span>{article.readingTime}で読める</span>
              {article.tags.length > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span key={tag} className="border border-stone-200 px-2 py-0.5 rounded-sm">#{tag}</span>
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
          <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
            <ShareButtons title={article.title} url={articleUrl} />
            <Link href="/articles" className="text-sm text-stone-400 hover:text-amber-700 transition-colors">
              ← 記事一覧へ戻る
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Share */}
            <div className="border border-stone-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 mb-4">Share</p>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            {/* Related/Recent articles */}
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 pb-2 mb-1 border-b-2 border-amber-600">
                {related.length > 0 ? "関連記事" : "最新記事"}
              </h3>
              {sidebarArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>

            {/* About */}
            <div className="bg-stone-900 text-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 mb-2">About</p>
              <h3 className="font-serif font-bold mb-2 leading-snug">Culture &amp; Business</h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                歴史と美術の知恵をビジネスに活かすメディア。
              </p>
              <Link href="/about" className="text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider transition-colors">
                詳しく →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
