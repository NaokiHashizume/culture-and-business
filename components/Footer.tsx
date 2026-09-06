import Link from "next/link";

const NoteIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h18v2H3v-2zm0 4h12v2H3v-2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-stone-950 text-stone-300 mt-auto">
      {/* Accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-serif mb-3">
              <span className="text-xl font-bold text-white">Culture</span>
              <span className="text-xl font-light text-amber-500 mx-1">&</span>
              <span className="text-xl font-bold text-white">Business</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-5">
              歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の課題を解く。
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://x.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors" aria-label="X">
                <XIcon />
              </a>
              <a href="https://note.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors" aria-label="note">
                <NoteIcon />
              </a>
              <a href="https://www.instagram.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-[0.15em] mb-4">カテゴリ</h3>
            <ul className="space-y-2.5 text-sm">
              {["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"].map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`}
                    className="text-stone-400 hover:text-amber-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-[0.15em] mb-4">ナビゲーション</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-stone-400 hover:text-amber-400 transition-colors">ホーム</Link></li>
              <li><Link href="/articles" className="text-stone-400 hover:text-amber-400 transition-colors">全記事</Link></li>
              <li><Link href="/about" className="text-stone-400 hover:text-amber-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-stone-400 hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-[0.15em] mb-4">その他</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-stone-400 hover:text-amber-400 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-600">
          <p>&copy; {year} Culture &amp; Business. All rights reserved.</p>
          <p className="text-stone-700">History · Art · Strategy</p>
        </div>
      </div>
    </footer>
  );
}
