import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactMail } from "../server/contactMail";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const result = await sendContactMail(req.body ?? {});
  if (!result.ok) {
    res.status(result.status).json({ ok: false, error: result.error });
    return;
  }

  res.status(200).json({ ok: true });
}
