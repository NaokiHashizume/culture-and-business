import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Culture & Business へのお問い合わせ。ご質問・ご意見・メディア掲載のご依頼はこちらから。",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="border-b border-stone-200 pb-8 mb-10">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">Contact</h1>
        <p className="text-stone-500">お問い合わせ</p>
      </div>

      <p className="text-stone-600 text-sm leading-relaxed mb-8">
        ご質問・ご意見・取材のご依頼など、お気軽にご連絡ください。通常2〜3営業日以内にご返信いたします。
      </p>

      <form
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm"
            placeholder="山田 太郎"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1.5">
            件名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm"
            placeholder="お問い合わせの件名"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
            メッセージ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm resize-none"
            placeholder="お問い合わせ内容をご記入ください"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-stone-900 text-white font-semibold py-3 hover:bg-stone-700 transition-colors text-sm"
        >
          送信する
        </button>
      </form>

      <p className="mt-6 text-xs text-stone-400">
        ※ フォームを使用するには <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="underline">Formspree</a> の設定が必要です。
        メールでの直接連絡をご希望の方はXのDMからどうぞ。
      </p>
    </div>
  );
}
