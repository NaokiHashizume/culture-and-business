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
              href="https://x.com/culture_and_biz"
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
            <a
              href="https://note.com/culture_and_biz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors text-xs font-medium"
              aria-label="note"
            >
              note
            </a>
            <a
              href="https://www.instagram.com/culture_and_biz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
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
