"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const subject = formData.get("subject")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !subject || !message) {
    return { status: "error", message: "すべての項目を入力してください。" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return {
      status: "error",
      message: "メール設定が完了していません。管理者にお知らせください。",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Culture & Business <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `[Culture & Business] ${subject}`,
      text: `差出人: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>差出人:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>件名:</strong> ${subject}</p>
        <hr />
        <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      `,
    });
    return { status: "success", message: "送信しました。2〜3営業日以内にご返信いたします。" };
  } catch {
    return { status: "error", message: "送信に失敗しました。時間をおいて再度お試しください。" };
  }
}
