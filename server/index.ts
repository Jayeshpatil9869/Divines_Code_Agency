import "dotenv/config";
import cors from "cors";
import express from "express";

// Local Express mirrors the Vercel handler by dynamic-importing the same mail path.
async function sendViaNodemailer(payload: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}) {
  const gmailUser = (process.env.GMAIL_USER ?? "").trim();
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");
  const contactTo = (process.env.CONTACT_TO ?? "divinescode@gmail.com").trim();

  if (!gmailUser || !gmailAppPassword) {
    return {
      ok: false as const,
      status: 500,
      error:
        "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.",
    };
  }

  const nodemailerMod = await import("nodemailer");
  const nodemailer = nodemailerMod.default ?? nodemailerMod;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  await transporter.sendMail({
    from: `"Divine's Code" <${gmailUser}>`,
    to: contactTo,
    replyTo: payload.email,
    subject: `New inquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      "",
      "Message:",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { ok: true as const, status: 200, error: null };
}

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mailConfigured: Boolean(
      process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim()
    ),
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phone } = req.body ?? {};
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      res.status(400).json({
        ok: false,
        error: "Name, email, and message are required.",
      });
      return;
    }

    const result = await sendViaNodemailer({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      phone: typeof phone === "string" ? phone.trim() : undefined,
    });

    if (!result.ok) {
      res.status(result.status).json({ ok: false, error: result.error });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("Contact API crashed:", err);
    res.status(500).json({
      ok: false,
      error: "Could not send your message. Please try again or email us directly.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
