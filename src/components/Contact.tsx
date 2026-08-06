import { useState, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateSectionReveals, gsap, EASE } from "@/animations";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

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
              <Input id="name" name="name" required placeholder="Alex Rivera" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="alex@company.com" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">What are you building?</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="A short note on the product, timeline, and what success looks like."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2">
            <Magnetic strength={0.3}>
              <Button type="submit" disabled={status !== "idle"} className="min-w-[180px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      Send it →
                    </motion.span>
                  )}
                  {status === "submitting" && (
                    <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Sending…
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Sent — talk soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Magnetic>
            <a
              href="mailto:hello@divinescode.agency"
              className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Or book 20 minutes
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
