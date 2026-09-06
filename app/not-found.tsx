import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <p className="text-8xl font-serif font-bold text-stone-200 mb-4">404</p>
      <h1 className="font-serif text-2xl font-bold text-stone-900 mb-3">
        ページが見つかりません
      </h1>
      <p className="text-stone-500 text-sm mb-8">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="bg-stone-900 text-white text-sm font-semibold px-5 py-2.5 hover:bg-stone-700 transition-colors">
          ホームへ戻る
        </Link>
        <Link href="/articles" className="border border-stone-300 text-stone-700 text-sm font-semibold px-5 py-2.5 hover:bg-stone-50 transition-colors">
          記事一覧
        </Link>
      </div>
    </div>
  );
}
