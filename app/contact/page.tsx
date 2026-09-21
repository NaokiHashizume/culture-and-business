import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Culture & Business へのお問い合わせ。ご質問・ご意見・メディア掲載のご依頼はこちらから。",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 pb-8" style={{ borderBottom: "2px solid var(--foreground)" }}>
        <p className="font-display text-[10px] tracking-[0.3em] mb-3" style={{ color: "var(--brand)" }}>GET IN TOUCH</p>
        <h1 className="font-serif text-5xl font-bold" style={{ color: "var(--foreground)" }}>Contact</h1>
        <p className="font-display text-[11px] tracking-wider mt-3" style={{ color: "var(--muted)" }}>
          お問い合わせ
        </p>
      </div>
      <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
        ご質問・ご意見・取材のご依頼など、お気軽にご連絡ください。通常2〜3営業日以内にご返信いたします。
      </p>
      <ContactForm />
    </div>
  );
}
