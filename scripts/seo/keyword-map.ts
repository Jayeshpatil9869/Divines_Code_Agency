/**
 * Keyword map for the SEO audit script only.
 * Do not import this module from React pages — it must stay out of the client bundle.
 * Phrases come from Divinescode_Final_SEO_Keywords_2026-09-28.xlsx (Keyword Planner).
 * Volumes are not stored here; do not invent them.
 */

export type KeywordSource = "filtered-xlsx";

export type KeywordRole = "primary" | "secondary" | "not-targeted";

export type SearchIntent =
  | "commercial"
  | "commercial-investigation"
  | "local-commercial";

export type KeywordRow = {
  keyword: string;
  source: KeywordSource;
  role: KeywordRole;
  /** Indexable path, or null when the phrase is intentionally not given a URL. */
  target: string | null;
  intent: SearchIntent;
};

function row(
  keyword: string,
  role: KeywordRole,
  target: string | null,
  intent: SearchIntent,
): KeywordRow {
  return { keyword, source: "filtered-xlsx", role, target, intent };
}

const notTargeted = (keyword: string, intent: SearchIntent = "local-commercial"): KeywordRow =>
  row(keyword, "not-targeted", null, intent);

export const KEYWORD_MAP: KeywordRow[] = [
  row("web development agency in india", "primary", "/", "commercial"),
  row("india web development companies", "secondary", "/", "commercial"),
  row("web development firm in india", "secondary", "/", "commercial"),
  row("professional web development company", "secondary", "/", "commercial"),
  row("professional web development company in india", "secondary", "/", "commercial"),
  row("professional web development company india", "secondary", "/", "commercial"),
  row("professional web development agency", "secondary", "/", "commercial"),
  row("web agency in india", "secondary", "/", "commercial"),

  row("professional website development company", "primary", "/services/websites", "commercial"),
  row("professional website development company for business", "secondary", "/services/websites", "commercial"),
  row("website development companies for small businesses", "secondary", "/services/websites", "commercial"),
  row("website development company for small businesses", "secondary", "/services/websites", "commercial"),
  row("small business web development agency", "secondary", "/services/websites", "commercial"),
  row("web design agency india", "secondary", "/services/websites", "commercial"),
  row("web design development company india", "secondary", "/services/websites", "commercial"),
  row("india web design company", "secondary", "/services/websites", "commercial"),
  row("professional web design company in india", "secondary", "/services/websites", "commercial"),
  row("professional web design company india", "secondary", "/services/websites", "commercial"),
  row("professional web design development company", "secondary", "/services/websites", "commercial"),
  row(
    "professional website design and development company in india",
    "secondary",
    "/services/websites",
    "commercial",
  ),
  row(
    "best web design and development company in india",
    "secondary",
    "/services/websites",
    "commercial-investigation",
  ),

  row(
    "web application development companies in india",
    "primary",
    "/services/apps",
    "commercial",
  ),
  row("web portal development company in india", "secondary", "/services/apps", "commercial"),

  row("professional cms development company", "secondary", "/services/integrations", "commercial"),

  row("web development company in pune", "primary", "/locations/pune", "local-commercial"),
  row(
    "web application development companies in pune",
    "secondary",
    "/locations/pune",
    "local-commercial",
  ),
  row(
    "best website development company in pune",
    "secondary",
    "/locations/pune",
    "commercial-investigation",
  ),
  row("best web design company in pune", "secondary", "/locations/pune", "commercial-investigation"),

  notTargeted("web development company in bangalore"),
  notTargeted("web development company in delhi"),
  notTargeted("web development company in kolkata"),
  notTargeted("web development company in coimbatore"),
  notTargeted("web development company in jaipur"),
  notTargeted("web development company in indore"),
  notTargeted("web development company in chandigarh"),
  notTargeted("website development company in delhi"),
  notTargeted("website development company in coimbatore"),
  notTargeted("website development company ahmedabad"),
  notTargeted("website development company kolkata"),
  notTargeted("website development company chandigarh"),
  notTargeted("website development company delhi ncr"),
  notTargeted("website development company in navi mumbai"),
  notTargeted("web design and development company in chennai"),
  notTargeted("web design and development company delhi"),
  notTargeted("web design and development company gurgaon"),
  notTargeted("web design and development company in navi mumbai"),
  notTargeted("web design company gurgaon"),
  notTargeted("web design company in bhopal"),
  notTargeted("web design company in faridabad"),
  notTargeted("web design company in lucknow"),
  notTargeted("web design company in mohali"),
  notTargeted("website design and development company in ahmedabad"),
  notTargeted("website design and development company in hyderabad"),
  notTargeted("best web development company in bangalore"),
  notTargeted("best website development company in bangalore"),
  notTargeted("best website development company in mumbai"),
  notTargeted("best web development company in delhi ncr"),
  notTargeted("best web development company in hyderabad"),
  notTargeted("best web development company in chennai"),
  notTargeted("best web development company in chandigarh"),
  notTargeted("best website development company in chennai"),
  notTargeted("best website development company in jaipur"),
  notTargeted("best website development company in kolkata"),
  notTargeted("best website development company in coimbatore"),
  notTargeted("best website development company in nagpur"),
  notTargeted("best web design company in delhi"),
  notTargeted("best web design company chennai"),
  notTargeted("best web design company in jaipur"),
  notTargeted("best web design companies in hyderabad"),
  notTargeted("best web design companies in chennai"),
  notTargeted("wordpress development company in pune"),
  notTargeted("best wordpress development company in india", "commercial"),
  notTargeted("best wordpress website development company in india", "commercial"),
  notTargeted("ecommerce website development company in bangalore"),
  notTargeted("ecommerce web development company in bangalore"),
  notTargeted("best ecommerce website development company in pune"),
  notTargeted("best ecommerce website development company in mumbai"),
  notTargeted("best ecommerce website development company in delhi"),
];
