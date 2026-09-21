"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  const inputStyle = {
    width: "100%",
    border: "1px solid var(--border-soft)",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "var(--foreground)",
    background: "var(--surface)",
    outline: "none",
    borderRadius: "0",
    fontFamily: "inherit",
  };

  if (state.status === "success") {
    return (
      <div className="p-6 text-sm" style={{ border: "1px solid var(--brand)", background: "rgba(200,16,46,0.04)" }}>
        <p className="font-display text-[10px] tracking-[0.2em] mb-2" style={{ color: "var(--brand)" }}>SENT</p>
        <p style={{ color: "var(--foreground)" }}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && (
        <div className="p-4 text-sm" style={{ border: "1px solid #C8102E", background: "rgba(200,16,46,0.04)", color: "#C8102E" }}>
          {state.message}
        </div>
      )}

      {[
        { id: "name", label: "お名前", type: "text", placeholder: "山田 太郎" },
        { id: "email", label: "メールアドレス", type: "email", placeholder: "your@email.com" },
        { id: "subject", label: "件名", type: "text", placeholder: "お問い合わせの件名" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="block font-display text-[10px] tracking-[0.2em] mb-2" style={{ color: "var(--muted)" }}>
            {label.toUpperCase()} <span style={{ color: "var(--brand)" }}>*</span>
          </label>
          <input
            type={type}
            id={id}
            name={id}
            required
            placeholder={placeholder}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--brand)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-soft)")}
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block font-display text-[10px] tracking-[0.2em] mb-2" style={{ color: "var(--muted)" }}>
          メッセージ <span style={{ color: "var(--brand)" }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="お問い合わせ内容をご記入ください"
          style={{ ...inputStyle, resize: "none" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--brand)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border-soft)")}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full font-display text-[11px] tracking-[0.25em] text-white py-4 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "var(--brand)" }}
        onMouseEnter={(e) => !pending && (e.currentTarget.style.background = "var(--brand-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand)")}
      >
        {pending ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
