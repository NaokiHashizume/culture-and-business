"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-green-200 bg-green-50 text-green-800 px-6 py-5 rounded-sm text-sm">
        <p className="font-semibold mb-1">送信完了</p>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && (
        <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-sm text-sm">
          {state.message}
        </div>
      )}

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
        disabled={pending}
        className="w-full bg-stone-900 text-white font-semibold py-3 hover:bg-stone-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
