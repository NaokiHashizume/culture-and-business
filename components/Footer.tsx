import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-serif mb-3">
              <span className="text-xl font-bold text-white">Culture</span>
              <span className="text-xl font-light text-amber-500 mx-1">&</span>
              <span className="text-xl font-bold text-white">Business</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代のビジネス課題を解く。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">カテゴリ</h3>
            <ul className="space-y-2 text-sm">
              {["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"].map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`} className="hover:text-amber-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">サイト情報</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">プライバシーポリシー</Link></li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-6 text-xs text-stone-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {year} Culture &amp; Business. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-stone-300 transition-colors">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
