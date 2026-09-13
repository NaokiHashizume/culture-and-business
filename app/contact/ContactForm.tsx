"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div className="alert alert-success">
        <p className="font-semibold mb-1">送信完了</p>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && (
        <div className="alert alert-error">{state.message}</div>
      )}

      <div>
        <label htmlFor="name" className="field-label">
          お名前 <span style={{ color: "#C53030" }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="field-input"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="email" className="field-label">
          メールアドレス <span style={{ color: "#C53030" }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="field-input"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="field-label">
          件名 <span style={{ color: "#C53030" }}>*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="field-input"
          placeholder="お問い合わせの件名"
        />
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          メッセージ <span style={{ color: "#C53030" }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="field-input resize-none"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <button type="submit" disabled={pending} className="btn-brand w-full justify-center !py-3 disabled:opacity-50 disabled:cursor-not-allowed">
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
