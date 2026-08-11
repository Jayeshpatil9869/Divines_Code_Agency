import type { VercelRequest, VercelResponse } from "@vercel/node";

function readBody(req: VercelRequest): Record<string, unknown> {
  const raw = req.body;
  if (raw == null) return {};
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return {};
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      res.status(200).json({
        ok: true,
        mailConfigured: Boolean(
          process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim()
        ),
      });
      return;
    }

    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      res.status(405).json({ ok: false, error: "Method not allowed." });
      return;
    }

    const body = readBody(req);
    const name = body.name;
    const email = body.email;
    const message = body.message;
    const phone = body.phone;

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      res.status(400).json({
        ok: false,
        error: "Name, email, and message are required.",
      });
      return;
    }

    if (!isValidEmail(email.trim())) {
      res.status(400).json({
        ok: false,
        error: "Please provide a valid email address.",
      });
      return;
    }

    const gmailUser = (process.env.GMAIL_USER ?? "").trim();
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");
    const contactTo = (process.env.CONTACT_TO ?? "divinescode@gmail.com").trim();

    if (!gmailUser || !gmailAppPassword) {
      res.status(500).json({
        ok: false,
        error:
          "Email is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD in Vercel Project Settings → Environment Variables, then redeploy.",
      });
      return;
    }

    // Dynamic import avoids cold-start crash if CJS/ESM interop fails at module load.
    const nodemailerMod = await import("nodemailer");
    const nodemailer = nodemailerMod.default ?? nodemailerMod;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const safeName = name.trim().slice(0, 120);
    const safeEmail = email.trim().slice(0, 200);
    const safeMessage = message.trim().slice(0, 5000);
    const safePhone =
      typeof phone === "string" && phone.trim() ? phone.trim().slice(0, 40) : "";

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

    res.status(200).json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Contact API error:", detail);
    res.status(500).json({
      ok: false,
      error: "Could not send your message. Please try again or email us directly.",
    });
  }
}
