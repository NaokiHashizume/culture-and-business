import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-8xl font-serif font-bold mb-4" style={{ color: "var(--border-soft)" }}>404</p>
      <h1 className="font-serif text-2xl font-bold text-fg mb-3">
        ページが見つかりません
      </h1>
      <p className="text-sm mb-8 text-muted-var">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn-brand">
          ホームへ戻る
        </Link>
        <Link href="/articles" className="btn-outline">
          記事一覧
        </Link>
      </div>
    </div>
  );
}
