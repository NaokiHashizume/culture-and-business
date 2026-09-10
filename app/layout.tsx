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

export const metadata: Metadata = {
  title: {
    default: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    template: "%s | Culture & Business",
  },
  description:
    "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  keywords: ["歴史", "美術", "ビジネス", "経営戦略", "リーダーシップ", "イノベーション"],
  authors: [{ name: "Culture & Business" }],
  creator: "Culture & Business",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Culture & Business",
    title: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Culture & Business",
    description: "歴史と美術の知恵をビジネスに活かす。",
  },
  robots: { index: true, follow: true },
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
