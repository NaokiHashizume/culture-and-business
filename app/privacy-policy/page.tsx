import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Culture & Business のプライバシーポリシー。個人情報の取り扱い、Cookieの使用、Google Adsenseについて。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="border-b border-stone-200 pb-8 mb-10">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">プライバシーポリシー</h1>
        <p className="text-stone-500 text-sm">最終更新日：2025年1月1日</p>
      </div>

      <div className="prose-article">
        <p>
          Culture &amp; Business（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーは、当サイトにおける個人情報の取り扱いについて説明します。
        </p>

        <h2>1. 収集する情報</h2>
        <p>当サイトでは、以下の情報を収集する場合があります。</p>
        <ul>
          <li>お問い合わせフォームから送信された氏名・メールアドレス・メッセージ内容</li>
          <li>アクセスログ（IPアドレス、ブラウザの種類、参照元URLなど）</li>
          <li>Cookieを通じた閲覧履歴・行動情報</li>
        </ul>

        <h2>2. Cookieについて</h2>
        <p>
          当サイトでは、Cookieを使用しています。Cookieとは、Webサイトがお使いのブラウザに保存する小さなデータファイルです。Cookieはサービス改善・アクセス解析・広告配信に使用されます。
        </p>
        <p>
          お使いのブラウザの設定でCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
        </p>

        <h2>3. Google AdSenseについて</h2>
        <p>
          当サイトでは、Google AdSenseを利用した広告を掲載しています。GoogleはCookieを使用して、ユーザーが過去に当サイトや他のサイトを訪問した際の情報を基に、適切な広告を表示します。
        </p>
        <p>
          Googleによるデータ収集・利用を無効にするには、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google広告設定ページ</a>にアクセスしてください。
        </p>

        <h2>4. Google Analyticsについて</h2>
        <p>
          当サイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を利用しています。Google AnalyticsはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
        </p>

        <h2>5. 第三者への提供</h2>
        <p>
          当サイトは、法令に基づく場合を除き、収集した個人情報を第三者に提供・開示しません。
        </p>

        <h2>6. 個人情報の管理</h2>
        <p>
          当サイトは、収集した個人情報の漏洩・紛失・改ざん等を防止するため、適切なセキュリティ対策を講じます。
        </p>

        <h2>7. お問い合わせ</h2>
        <p>
          本プライバシーポリシーに関するお問い合わせは、お問い合わせフォームよりご連絡ください。
        </p>

        <h2>8. ポリシーの変更</h2>
        <p>
          当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のポリシーは、本ページに掲載した時点で効力を生じるものとします。
        </p>
      </div>
    </div>
  );
}
