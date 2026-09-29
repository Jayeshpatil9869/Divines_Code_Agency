/**
 * Queries an answer engine might use, mapped only to pages this site actually has.
 * Imported by the SEO check only. Do not import from React.
 * Observations are recorded by a person. This file does not call any AI API.
 */

export type AiQueryIntent = "commercial" | "informational" | "local-commercial";

export type AiQuery = {
  query: string;
  intent: AiQueryIntent;
  target: string;
};

export const AI_QUERIES: AiQuery[] = [
  {
    query: "web development agency in India",
    intent: "commercial",
    target: "/",
  },
  {
    query: "professional website development company",
    intent: "commercial",
    target: "/services/websites",
  },
  {
    query: "website development company for small businesses",
    intent: "commercial",
    target: "/services/websites",
  },
  {
    query: "web application development companies in India",
    intent: "commercial",
    target: "/services/apps",
  },
  {
    query: "website vs web application",
    intent: "informational",
    target: "/services",
  },
  {
    query: "how much does a website cost in India",
    intent: "informational",
    target: "/pricing",
  },
  {
    query: "custom ecommerce storefront",
    intent: "commercial",
    target: "/services/ecommerce",
  },
  {
    query: "web development company in Pune",
    intent: "local-commercial",
    target: "/locations/pune",
  },
  {
    query: "web application development companies in Pune",
    intent: "local-commercial",
    target: "/locations/pune",
  },
];
