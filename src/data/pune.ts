import type { ServiceFaq } from "@/data/services";

export const PUNE_PATH = "/locations/pune";

export const PUNE_H1 = "Web development for Pune";

export const PUNE_INTRO =
  "If you need a web development company in Pune, this page is the honest version of what Divine's Code takes on there: websites, web applications, and custom storefronts, scoped with the founders. There is no published studio address.";

export const PUNE_TITLE = "Web Development Company in Pune | Divine's Code";

export const PUNE_DESCRIPTION =
  "Website, web application, and storefront work for businesses in Pune. No office address on file. Public project: Pravin Realty in West Pune. Talk to the founders directly.";

export const puneFaqs: ServiceFaq[] = [
  {
    q: "Do you have an office in Pune?",
    a: "No street address is published. Pune work is scoped with Jayesh Patil and Mahendra Nagpure by the contact form, phone, or WhatsApp, the same way as other India projects.",
  },
  {
    q: "What have you shipped for a Pune business?",
    a: "Pravin Realty is a public React site for luxury and commercial properties in West Pune: https://pravin-realty.divinescode.com/. We do not invent other local clients or performance numbers.",
  },
  {
    q: "Can you build a web application for a company in Pune?",
    a: "Yes, when the product lives in the browser: a dashboard, a customer portal, or a first product slice. Native iOS and Android apps are not a service we sell.",
  },
  {
    q: "How should a Pune team compare studios?",
    a: "Ask what is actually in scope, whether you can open a live project, who you will talk to, and what happens after launch. A longer keyword list is not evidence of a better build.",
  },
];

export const pravinRealty = {
  name: "Pravin Realty",
  label: "West Pune · Real estate",
  summary:
    "A React site for luxury and commercial properties in West Pune. It is the public Pune project we can point to — not a stand-in for a local office.",
  image: "/images/projects/pravin-realty.png",
  imageAlt: "Pravin Realty website, a real estate project for properties in West Pune",
  url: "https://pravin-realty.divinescode.com/",
} as const;
