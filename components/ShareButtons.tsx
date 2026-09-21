"use client";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-[9px] tracking-[0.25em]" style={{ color: "var(--muted)" }}>SHARE</span>
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white text-[11px] font-display tracking-wider px-4 py-2 transition-colors"
        style={{ background: "var(--brand)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand)")}
        aria-label="Xでシェア"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        SHARE ON X
      </a>
    </div>
  );
}
