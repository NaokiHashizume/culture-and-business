import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Culture & Business へのお問い合わせ。ご質問・ご意見・メディア掲載のご依頼はこちらから。",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="page-header">
        <p className="page-eyebrow">CONTACT</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-fg mb-2">Contact</h1>
        <p className="text-muted-var text-sm">お問い合わせ</p>
      </div>

      <p className="text-sm leading-relaxed mb-8 text-muted-var">
        ご質問・ご意見・取材のご依頼など、お気軽にご連絡ください。通常2〜3営業日以内にご返信いたします。
      </p>

      <ContactForm />
    </div>
  );
}
