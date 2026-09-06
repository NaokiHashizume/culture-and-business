"use client";

import Link from "next/link";
import { useState } from "react";

const categories = ["歴史", "美術", "経営戦略", "リーダーシップ", "イノベーション"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-stone-100 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8 text-xs text-stone-500">
          <span>歴史と美術が切り拓くビジネスの未来</span>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors flex items-center gap-1"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <div className="font-serif">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Culture
            </span>
            <span className="text-2xl sm:text-3xl font-light text-amber-700 mx-1">&</span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Business
            </span>
          </div>
          <p className="text-xs text-stone-400 tracking-widest uppercase mt-0.5">
            History · Art · Strategy
          </p>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/articles" className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">
            全記事
          </Link>
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat)}`}
              className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors"
            >
              {cat}
            </Link>
          ))}
          <Link href="/about" className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-stone-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <div className="w-5 h-px bg-current mb-1.5"></div>
          <div className="w-5 h-px bg-current mb-1.5"></div>
          <div className="w-5 h-px bg-current"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link href="/articles" className="text-sm font-medium text-stone-700 py-1" onClick={() => setMenuOpen(false)}>
              全記事
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat)}`}
                className="text-sm font-medium text-stone-700 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <Link href="/about" className="text-sm font-medium text-stone-700 py-1" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-stone-700 py-1" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
