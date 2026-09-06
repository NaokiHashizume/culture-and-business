import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Culture & Business について。歴史と美術の知恵をビジネスに活かすメディアのコンセプトと運営者について。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="border-b border-stone-200 pb-8 mb-10">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">About</h1>
        <p className="text-stone-500">Culture &amp; Business について</p>
      </div>

      <div className="prose-article">
        <h2>このサイトについて</h2>
        <p>
          <strong>Culture &amp; Business</strong> は、歴史と美術の視点から現代のビジネスを読み解くメディアです。
        </p>
        <p>
          ビジネスの本質は、時代を超えて変わりません。ローマ帝国の覇権戦略、ルネサンス期の芸術家たちのイノベーション、江戸時代の商人道徳——古今東西の知恵は、現代の経営課題に対する深い洞察をもたらしてくれます。
        </p>

        <h2>コンセプト</h2>
        <p>
          私たちは以下のテーマを中心に、独自の視点で記事をお届けします。
        </p>
        <ul>
          <li><strong>歴史 × 経営戦略</strong>：歴史上の指導者や帝国の意思決定から学ぶ戦略論</li>
          <li><strong>美術 × イノベーション</strong>：芸術家の創造プロセスから学ぶイノベーション思考</li>
          <li><strong>文化 × リーダーシップ</strong>：文化的背景が生み出すリーダーシップの多様性</li>
          <li><strong>哲学 × 意思決定</strong>：哲学的思考がビジネス判断を洗練させる方法</li>
        </ul>

        <h2>運営について</h2>
        <p>
          本サイトは、歴史・美術・ビジネスの交差点に深い関心を持つ個人が運営しています。週に複数回、新しい記事を公開していきます。
        </p>
        <p>
          ご意見・ご感想は<Link href="/contact">お問い合わせフォーム</Link>よりお気軽にどうぞ。Xでもぜひフォローしてください。
        </p>

        <h2>免責事項</h2>
        <p>
          本サイトの記事は情報提供を目的としたものであり、投資・経営判断の根拠となるものではありません。記事の内容には万全を期しておりますが、その正確性・完全性を保証するものではありません。
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-stone-200 flex gap-4 flex-wrap">
        <Link href="/contact" className="bg-stone-900 text-white text-sm font-semibold px-5 py-2.5 hover:bg-stone-700 transition-colors">
          お問い合わせ
        </Link>
        <Link href="/articles" className="border border-stone-300 text-stone-700 text-sm font-semibold px-5 py-2.5 hover:bg-stone-50 transition-colors">
          記事を読む
        </Link>
      </div>
    </div>
  );
}
