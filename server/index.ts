import "dotenv/config";
import cors from "cors";
import express from "express";
import { sendContactMail } from "../api/_lib/sendContactMail";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const result = await sendContactMail(req.body ?? {});
    if (!result.ok) {
      res.status(result.status).json({
        ok: false,
        error: result.error ?? "Could not send your message.",
      });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("Contact API crashed:", err);
    res.status(500).json({
      ok: false,
      error: "Server error while sending. Please try again shortly.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
