"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const categories = ["歴史", "美術"];

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--background)" }}>

      {/* Top utility bar */}
      <div style={{ background: "#1A0D0A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-7">
          <span className="font-display text-[9px] tracking-[0.3em] hidden sm:block" style={{ color: "#555555" }}>
            HISTORY · ART · STRATEGY · EST. 2026
          </span>
          <div className="flex items-center gap-5 ml-auto">
            <a href="https://x.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white font-display text-[9px] tracking-[0.2em]"
              style={{ color: "#555555" }} aria-label="X">
              <XIcon />
              <span className="hidden sm:inline">@culture_and_biz</span>
            </a>
            <a href="https://note.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
              className="font-display text-[9px] tracking-[0.2em] transition-colors hover:text-white"
              style={{ color: "#555555" }} aria-label="note">NOTE</a>
            <a href="https://www.instagram.com/culture_and_biz" target="_blank" rel="noopener noreferrer"
              className="font-display text-[9px] tracking-[0.2em] transition-colors hover:text-white"
              style={{ color: "#555555" }} aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-6">

          {/* Logo */}
          <Link href="/" className="group flex-shrink-0">
            <div className="leading-tight">
              <div className="font-logo">
                <span className="text-[1.75rem] sm:text-[2.25rem] font-bold tracking-wide" style={{ color: "var(--foreground)" }}>
                  Culture
                </span>
                <span className="text-[1.75rem] sm:text-[2.25rem] font-normal italic mx-1" style={{ color: "var(--gold)" }}>
                  &amp;
                </span>
                <span className="text-[1.75rem] sm:text-[2.25rem] font-bold tracking-wide" style={{ color: "var(--foreground)" }}>
                  Business
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="h-px w-4" style={{ background: "var(--gold)" }} />
                <p className="font-display text-[7px] tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                  歴史と美術が切り拓くビジネスの未来
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/articles"
              className="font-display text-[10px] tracking-[0.18em] px-3 py-1.5 transition-colors hover:text-brand"
              style={{ color: "var(--muted)" }}>全記事</Link>
            <span className="text-[10px] px-1" style={{ color: "var(--border-soft)" }}>·</span>
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat} href={`/categories/${encodeURIComponent(cat)}`}
                className="font-display text-[10px] tracking-[0.15em] px-3 py-1.5 transition-colors hover:text-brand"
                style={{ color: "var(--muted)" }}>{cat}</Link>
            ))}
            <span className="text-[10px] px-1" style={{ color: "var(--border-soft)" }}>·</span>
            <Link href="/about"
              className="font-display text-[10px] tracking-[0.15em] px-3 py-1.5 transition-colors hover:text-brand"
              style={{ color: "var(--muted)" }}>ABOUT</Link>
            <Link href="/search" aria-label="検索"
              className="px-3 py-1.5 transition-opacity hover:opacity-60"
              style={{ color: "var(--muted)" }}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
              aria-expanded={menuOpen}
              style={{ color: "var(--foreground)" }}
            >
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Rule — masthead separator */}
      <div style={{ height: "2px", background: "var(--foreground)" }} />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden animate-fade-in-up" style={{ background: "var(--background)", borderBottom: `1px solid var(--border-soft)` }}>
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col">
            {[
              { href: "/articles", label: "全記事" },
              ...categories.map((cat) => ({ href: `/categories/${encodeURIComponent(cat)}`, label: cat })),
              { href: "/search", label: "検索" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="font-display text-sm tracking-[0.12em] py-3.5 border-b transition-colors hover:text-brand"
                style={{ color: "var(--foreground)", borderColor: "var(--border-soft)" }}
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
