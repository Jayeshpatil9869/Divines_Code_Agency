export const PROJECT_TYPES = [
  { value: "", label: "Select a project type" },
  { value: "website", label: "Website (packages)" },
  { value: "frontend", label: "React frontend" },
  { value: "web-app", label: "Web application" },
  { value: "ecommerce", label: "Ecommerce storefront" },
  { value: "integrations", label: "Integrations" },
  { value: "care", label: "Website care" },
  { value: "other", label: "Something else" },
] as const;

export const BUDGET_BANDS = [
  { value: "", label: "Select a budget band" },
  { value: "starter", label: "Starter — ₹9,999+" },
  { value: "modern", label: "Modern — ₹19,999+" },
  { value: "premium", label: "Premium — ₹34,999+" },
  { value: "custom", label: "Custom quote" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const TIMELINES = [
  { value: "", label: "Select a timeline" },
  { value: "asap", label: "As soon as possible" },
  { value: "2-4-weeks", label: "2–4 weeks" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Exploring / no date" },
] as const;

export type ContactInquiry = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  country?: string;
};
