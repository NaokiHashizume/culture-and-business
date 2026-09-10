import Link from "next/link";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#0D0D0D", color: "#888580" }} className="mt-auto">
      {/* Gold + Crimson double rule at top */}
      <div style={{ height: "1px", background: "#9E7A2A" }} />
      <div style={{ height: "3px", background: "#C8102E" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-serif mb-0.5 leading-none">
              <span className="text-xl font-bold text-white">CULTURE</span>
              <span className="text-xl font-light mx-1" style={{ color: "#C8102E" }}>&amp;</span>
              <span className="text-xl font-bold text-white">BUSINESS</span>
            </div>
            <p className="font-display text-[9px] tracking-[0.3em] mb-1" style={{ color: "#9E7A2A" }}>
              HISTORY · ART · STRATEGY
            </p>
            <p className="font-display text-[9px] tracking-[0.22em] mb-5" style={{ color: "#2E2820" }}>
              EST. 2026
            </p>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "#555048" }}>
              歴史と美術の知恵をビジネスに活かす。<br />時代を超えた洞察で、現代の課題を解く。
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="transition-colors hover:text-white" style={{ color: "#444038" }} aria-label="X">
                <XIcon />
              </a>
              <a href="https://note.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="font-display text-[10px] tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: "#444038" }} aria-label="note">NOTE</a>
              <a href="https://www.instagram.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
                className="font-display text-[10px] tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: "#444038" }} aria-label="Instagram">IG</a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-[9px] tracking-[0.3em] mb-5 pb-2" style={{ color: "#9E7A2A", borderBottom: "1px solid #1E1A16" }}>
              CATEGORY
            </h3>
            <ul className="space-y-3">
              {["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"].map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${encodeURIComponent(cat)}`}
                    className="text-sm transition-colors flex items-center gap-2 group" style={{ color: "#555048" }}>
                    <span className="w-3 h-px group-hover:w-4 group-hover:bg-brand transition-all" style={{ background: "#2E2820" }} />
                    <span className="group-hover:text-[#C8102E] transition-colors">{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-[9px] tracking-[0.3em] mb-5 pb-2" style={{ color: "#9E7A2A", borderBottom: "1px solid #1E1A16" }}>
              NAVIGATE
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "ホーム" },
                { href: "/articles", label: "全記事" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors flex items-center gap-2 group" style={{ color: "#555048" }}>
                    <span className="w-3 h-px group-hover:w-4 group-hover:bg-brand transition-all" style={{ background: "#2E2820" }} />
                    <span className="group-hover:text-[#C8102E] transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-[9px] tracking-[0.3em] mb-5 pb-2" style={{ color: "#9E7A2A", borderBottom: "1px solid #1E1A16" }}>
              LEGAL
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm transition-colors flex items-center gap-2 group" style={{ color: "#555048" }}>
                  <span className="w-3 h-px group-hover:w-4 group-hover:bg-brand transition-all" style={{ background: "#2E2820" }} />
                  <span className="group-hover:text-[#C8102E] transition-colors">プライバシーポリシー</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: "1px solid #1A1510" }}>
          <p className="text-xs" style={{ color: "#302820" }}>&copy; {year} Culture &amp; Business. All rights reserved.</p>
          <p className="font-display text-[9px] tracking-[0.3em]" style={{ color: "#9E7A2A" }}>HISTORY · ART · STRATEGY</p>
        </div>
      </div>
    </footer>
  );
}
