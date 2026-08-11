import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactMail } from "./_lib/sendContactMail";

export const config = {
  runtime: "nodejs",
  maxDuration: 20,
};

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ ok: false, error: "Method not allowed." });
      return;
    }

    const result = await sendContactMail(readBody(req));
    if (!result.ok) {
      res.status(result.status).json({
        ok: false,
        error: result.error ?? "Could not send your message.",
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Contact API crashed:", detail);
    res.status(500).json({
      ok: false,
      error: "Server error while sending. Please try again shortly.",
    });
  }
}
