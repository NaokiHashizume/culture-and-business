import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display, Oswald, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

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

const cormorant = Cormorant_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://culture-and-business.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    template: "%s | Culture & Business",
  },
  description:
    "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
  keywords: ["歴史", "美術", "ビジネス", "経営戦略", "文化", "ルネサンス", "江戸時代", "経営", "マーケティング"],
  authors: [{ name: "Culture & Business", url: siteUrl }],
  creator: "Culture & Business",
  publisher: "Culture & Business",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Culture & Business",
    title: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Culture & Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Culture & Business | 歴史と美術が切り拓くビジネスの未来",
    description: "歴史と美術の知恵をビジネスに活かす。時代を超えた洞察で、現代の経営課題を読み解くメディア。",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const themeScript = `(function(){
  var t=localStorage.getItem('theme');
  var m=window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(t==='dark'||(t===null&&m)){document.documentElement.classList.add('dark')}
})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${geist.variable} ${playfair.variable} ${oswald.variable} ${cormorant.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}} />
          </>
        )}
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
