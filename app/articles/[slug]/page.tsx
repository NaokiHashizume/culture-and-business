import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import ShareButtons from "@/components/ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
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

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";
  const articleUrl = `${siteUrl}/articles/${slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Article */}
        <article className="lg:col-span-3">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-amber-700">ホーム</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-amber-700">記事一覧</Link>
            <span>/</span>
            <Link href={`/categories/${encodeURIComponent(article.category)}`} className="hover:text-amber-700">
              {article.category}
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-8 border-b border-stone-200 pb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 bg-amber-50 px-2 py-0.5 mb-4">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed mb-4">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
              <time dateTime={article.date}>{formattedDate}</time>
              <span>{article.readingTime}で読める</span>
              {article.tags.map((tag) => (
                <span key={tag} className="bg-stone-100 px-2 py-0.5 rounded-sm">#{tag}</span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose-article">
            <MDXRemote source={article.content} />
          </div>

          {/* Share */}
          <div className="mt-10 pt-6 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
            <ShareButtons title={article.title} url={articleUrl} />
            <Link href="/articles" className="text-sm text-stone-500 hover:text-amber-700 transition-colors">
              ← 記事一覧へ戻る
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-stone-900 text-white p-5">
            <h3 className="font-serif font-bold mb-2">Culture &amp; Business</h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              歴史と美術の知恵をビジネスに活かすメディア。
            </p>
            <Link href="/about" className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              詳しく →
            </Link>
          </div>

          <div className="border border-stone-200 p-5 text-center">
            <p className="text-xs text-stone-500 mb-3">この記事をシェア</p>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </aside>
      </div>
    </div>
  );
}
