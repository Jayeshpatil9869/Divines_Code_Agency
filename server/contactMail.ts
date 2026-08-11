import nodemailer from "nodemailer";

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  phone?: unknown;
};

/** Flat shape so Vercel/API typecheck never needs discriminant narrowing. */
export type ContactResult = {
  ok: boolean;
  status: number;
  error: string | null;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactMail(
  payload: ContactPayload
): Promise<ContactResult> {
  const { name, email, message, phone } = payload;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return {
      ok: false,
      status: 400,
      error: "Name, email, and message are required.",
    };
  }

  if (!isValidEmail(email.trim())) {
    return {
      ok: false,
      status: 400,
      error: "Please provide a valid email address.",
    };
  }

  const gmailUser = process.env.GMAIL_USER ?? "";
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD ?? "";
  const contactTo = process.env.CONTACT_TO ?? "divinescode@gmail.com";

  if (!gmailUser || !gmailAppPassword) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return {
      ok: false,
      status: 500,
      error: "Email is not configured on the server yet.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword.replace(/\s+/g, ""),
    },
  });

  const safeName = name.trim().slice(0, 120);
  const safeEmail = email.trim().slice(0, 200);
  const safeMessage = message.trim().slice(0, 5000);
  const safePhone =
    typeof phone === "string" && phone.trim() ? phone.trim().slice(0, 40) : "";

  try {
    await transporter.sendMail({
      from: `"Divine's Code" <${gmailUser}>`,
      to: contactTo,
      replyTo: safeEmail,
      subject: `New inquiry from ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        safePhone ? `Phone: ${safePhone}` : null,
        "",
        "Message:",
        safeMessage,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return { ok: true, status: 200, error: null };
  } catch (err) {
    console.error("Nodemailer send failed:", err);
    return {
      ok: false,
      status: 502,
      error: "Could not send your message. Please try again or email us directly.",
    };
  }
}
