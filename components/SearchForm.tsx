"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 mb-8" style={{ borderBottom: "2px solid var(--foreground)" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="タイトル・キーワードで検索..."
        autoFocus
        className="flex-1 px-0 py-3 bg-transparent text-sm font-display tracking-wide outline-none"
        style={{ color: "var(--foreground)", caretColor: "var(--brand)" }}
      />
      <button
        type="submit"
        aria-label="検索"
        className="px-4 py-3 font-display text-[10px] tracking-[0.2em] transition-opacity hover:opacity-60"
        style={{ color: "var(--foreground)" }}
      >
        SEARCH
      </button>
    </form>
  );
}
