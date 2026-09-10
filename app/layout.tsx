import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    template: "%s | Culture & Business",
  },
  description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  keywords: ["歴史", "美術", "ビジネス", "経営戦略", "リーダーシップ", "イノベーション", "パーソナルブランディング", "組織論"],
  authors: [{ name: "Culture & Business", url: siteUrl }],
  creator: "Culture & Business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Culture & Business",
    title: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  },
  twitter: {
    card: "summary_large_image",
    site: "@culture_and_biz",
    creator: "@culture_and_biz",
    title: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  },
  robots: { index: true, follow: true },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Culture & Business",
  "url": siteUrl,
  "description": "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  "inLanguage": "ja",
  "publisher": {
    "@type": "Organization",
    "name": "Culture & Business",
    "url": siteUrl,
  },
};

const themeScript = `(function(){
  var t=localStorage.getItem('theme');
  var m=window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(t==='dark'||(t===null&&m)){document.documentElement.classList.add('dark')}
})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${geist.variable} ${playfair.variable} ${oswald.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
