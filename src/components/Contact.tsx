import { useState, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateSectionReveals, gsap, EASE } from "@/animations";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_WHATSAPP,
} from "@/data/contact";

const contactLinkClass =
  "group inline-flex items-center gap-2 whitespace-nowrap border border-white/15 bg-white/[0.03] px-3.5 py-2.5 text-[10px] uppercase tracking-[0.18em] font-bold text-white/75 transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  useLayoutEffect(() => {
    if (status !== "success" || !formRef.current) return;
    const fields = formRef.current.querySelectorAll("input, textarea, button");
    const tl = gsap.timeline();
    tl.to(fields, { opacity: 0.4, duration: 0.25, ease: EASE.soft }).to(
      fields,
      { opacity: 1, duration: 0.4, ease: EASE.out },
      "+=0.2"
    );
    return () => {
      tl.kill();
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setErrorMessage("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !payload?.ok) {
        setErrorMessage(
          payload?.error ?? "Could not send your message. Please try again."
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  };

  const canSubmit = status === "idle" || status === "error";

  return (
    <section id="contact" ref={rootRef} className="w-full py-24 md:py-32 border-t border-border">
      <div className="max-w-4xl mx-auto px-6">
        <div data-gsap="reveal">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Tell us what you&apos;re building.
          </h2>
          <p className="text-[11px] text-muted-foreground mb-16 max-w-md uppercase tracking-widest font-bold">
            A sentence is enough to start. We reply within one business day — always personally.
          </p>
        </div>

        <form
          ref={formRef}
          data-gsap="reveal"
          onSubmit={handleSubmit}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Priya Sharma" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="priya@business.com" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">What are you building?</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="A short note on the site you need, timeline, and what success looks like."
            />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0">
                <Magnetic strength={0.3}>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="min-w-45 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {(status === "idle" || status === "error") && (
                        <motion.span
                          key="idle"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                        >
                          {status === "error" ? "Try again →" : "Send it →"}
                        </motion.span>
                      )}
                      {status === "submitting" && (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Sending…
                        </motion.span>
                      )}
                      {status === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Sent — talk soon
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </Magnetic>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  Or email us
                </a>
              </div>

              <div className="flex flex-nowrap items-center gap-2 sm:gap-3 lg:justify-end">
                <Magnetic strength={0.2}>
                  <a
                    href={`tel:${CONTACT_PHONE_E164}`}
                    className={contactLinkClass}
                    aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
                  >
                    <Phone
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 text-primary/80 group-hover:text-primary transition-colors"
                    />
                    <span>Call {CONTACT_PHONE_DISPLAY}</span>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      contactLinkClass,
                      "border-primary/35 bg-primary/10 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    )}
                    aria-label="WhatsApp inquire"
                  >
                    <MessageCircle
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 transition-colors"
                    />
                    <span>WhatsApp</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            {status === "error" && errorMessage ? (
              <p role="alert" className="text-sm text-red-400 font-light">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
