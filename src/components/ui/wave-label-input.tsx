import { useId, useRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/animations";

type WaveLabelInputProps = Omit<ComponentProps<"input">, "placeholder" | "id"> & {
  id?: string;
  label: string;
};

/**
 * Uiverse-style floating letter label — GSAP stagger on focus / filled.
 * Rest colors use solid --contact-fg (#000 in light phase).
 */
export function WaveLabelInput({
  id,
  label,
  className,
  onFocus,
  onBlur,
  onChange,
  required,
  ...props
}: WaveLabelInputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const inputRef = useRef<HTMLInputElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const floated = focused || hasValue;

  const letters = Array.from(label);

  const floatLetters = (up: boolean) => {
    const spans = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!spans.length) return;

    gsap.killTweensOf(spans);
    if (up) {
      gsap.to(spans, {
        y: -28,
        color: "hsl(32 28% 55%)",
        duration: 0.35,
        stagger: 0.05,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
      return;
    }

    gsap.to(spans, {
      y: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: "back.out(1.4)",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(spans, { clearProps: "color" });
      },
    });
  };

  return (
    <div className="relative w-full pt-2">
      <input
        ref={inputRef}
        id={inputId}
        required={required}
        data-contact-ink="fg"
        className={cn(
          "peer block w-full bg-transparent border-0 border-b-2 px-0 pt-4 pb-3 text-base outline-none transition-[border-color] duration-300",
          "focus:border-primary!",
          className
        )}
        style={{
          color: "var(--contact-fg)",
          borderBottomColor: "var(--contact-border)",
        }}
        onFocus={(e) => {
          setFocused(true);
          floatLetters(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          const filled = e.currentTarget.value.trim().length > 0;
          setHasValue(filled);
          floatLetters(filled);
          onBlur?.(e);
        }}
        onChange={(e) => {
          const filled = e.currentTarget.value.trim().length > 0;
          setHasValue(filled);
          if (focused || filled) floatLetters(true);
          onChange?.(e);
        }}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-0 top-[1.35rem] flex"
        aria-label={label}
      >
        {letters.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            aria-hidden
            data-wave-letter
            className="inline-block text-base min-w-[0.3em] will-change-transform"
            style={{
              color: floated ? undefined : "var(--contact-fg)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </label>
    </div>
  );
}
