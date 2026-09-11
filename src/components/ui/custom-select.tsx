import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

export interface CustomSelectProps {
  id?: string;
  name: string;
  options: readonly SelectOption[] | SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function CustomSelect({
  id,
  name,
  options,
  defaultValue = "",
  placeholder,
  className,
  required,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find current selected option or default
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const placeholderText = placeholder || options[0]?.label || "Select an option";

  // Listen to parent form reset event
  useEffect(() => {
    const hiddenInput = containerRef.current?.querySelector("input[type='hidden']") as HTMLInputElement | null;
    const form = hiddenInput?.form;
    if (!form) return;

    const handleFormReset = () => {
      setSelectedValue(defaultValue);
    };

    form.addEventListener("reset", handleFormReset);
    return () => {
      form.removeEventListener("reset", handleFormReset);
    };
  }, [defaultValue]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
        const nextIndex = Math.min(options.length - 1, currentIndex + 1);
        setSelectedValue(options[nextIndex].value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
        const prevIndex = Math.max(0, currentIndex - 1);
        setSelectedValue(options[prevIndex].value);
      }
    }
  };

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    setIsOpen(false);
  };

  const isPlaceholderSelected = !selectedValue;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden input to serialize with standard FormData / HTML forms */}
      <input
        type="hidden"
        id={id}
        name={name}
        value={selectedValue}
        required={required}
      />

      {/* Trigger button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group flex h-12 w-full items-center justify-between border-b bg-transparent px-0 py-3 text-left transition-all duration-300 outline-none cursor-pointer select-none",
          isOpen
            ? "border-primary text-white shadow-[0_4px_16px_-4px_rgba(172,142,108,0.25)]"
            : "border-border hover:border-white/40 text-foreground"
        )}
      >
        <span
          className={cn(
            "text-base truncate transition-colors duration-200",
            isPlaceholderSelected
              ? "text-muted-foreground/60 font-light"
              : "text-white font-normal"
          )}
        >
          {selectedOption ? selectedOption.label : placeholderText}
        </span>

        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-transform duration-300 ease-out",
            isOpen
              ? "rotate-180 text-primary scale-110"
              : "text-white/40 group-hover:text-white/70"
          )}
        />
      </button>

      {/* Luxury Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            tabIndex={-1}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-[calc(100%+6px)] z-50 w-full min-w-[220px] max-h-72 overflow-y-auto rounded-xl border border-white/12 bg-[#0d0c0a]/95 backdrop-blur-2xl p-1.5 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.9),0_0_0_1px_rgba(172,142,108,0.15)] focus:outline-none"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(172,142,108,0.3) transparent",
            }}
          >
            {options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              const isOptionEmpty = opt.value === "";

              return (
                <li
                  key={opt.value || "__empty__"}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "group relative flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "bg-primary/15 text-primary font-medium"
                      : isOptionEmpty
                      ? "text-muted-foreground/60 hover:text-white hover:bg-white/[0.04]"
                      : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  <span className="truncate">{opt.label}</span>

                  {isSelected && (
                    <motion.span
                      layoutId="check-icon"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    </motion.span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
