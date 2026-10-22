# DIVINES CODE GLOBAL SEO MASTER STRATEGY

**Brand:** Divines Code (legal/marketing: Divine’s Code)  
**Site:** [https://divinescode.com/](https://divinescode.com/)  
**Audit date:** 3 September 2026  
**Scope:** Worldwide English organic acquisition. Pune is secondary local only.  
**Companion (do not treat as this strategy):** [MASTER-SEO-3-WAY-ENTITY.md](./MASTER-SEO-3-WAY-ENTITY.md) — founder entity cluster.

**How to use this document:** Execute the Top 20 (section 45) in order. Do not create country doorways, SEO-agency pages, AI-agency pages, or native-app pages until the business actually sells those services.

---

## Assumptions (read first)

| ID | Assumption | Impact if wrong |
| -- | ---------- | --------------- |
| A1 | No Google Search Console export was available in this workspace. Section 36 is an operating protocol, not a query table. | Position 4–30 opportunities must be rebuilt from GSC. |
| A2 | No Ahrefs / Semrush / Keyword Planner access. Priority scores use the rubric in section 12. Third-party volumes are **unverified estimates**, never presented as facts. | Recalibrate with a licensed tool after GSC is live. |
| A3 | PageSpeed Insights API quota was exhausted; CrUX field data could not be confirmed. Core Web Vitals are diagnosed from stack risk, not from a published origin score. | Run PSI + GSC CWV in week 1. |
| A4 | Live commercial catalog is the six services in `src/data/services.ts` plus INR packages in `src/data/offerings.ts`. LinkedIn “digital marketing agency” copy is **not** treated as the product. | If the company expands into SEO retainers, AI products, or native apps, reopen clusters 9–11. |
| A5 | Public `site:divinescode.com` search returned no usable index during research. Treat indexation as **weak or unverified**, not as “zero pages forever.” | Confirm with GSC Coverage / URL Inspection. |
| A6 | Founders can produce first-hand case-study facts (stack, constraint, result). Invented testimonials are forbidden. | Case-study URLs stay unpublished until facts exist. |

**Priority rubric (1–100), used everywhere below**

| Factor | Max | How scored |
| ------ | --: | ---------- |
| Relevance to live services | 25 | 25 = sold today; 0 = not offered |
| Commercial intent | 20 | Hire / cost / compare beats “what is” |
| Content feasibility | 20 | Unique proof on hand vs commodity rewrite |
| SERP accessibility | 20 | Inverse of “directories + 200-person firms occupy page 1” |
| Conversion potential | 15 | Can this enquiry become a package or custom quote? |

Bands: **Quick win 70–100** · **Medium 50–69** · **Long-term 1–49**. Scores are strategic, not search-volume.

---

## 1. Executive Summary

Divines Code cannot win “web development company” globally in year one. Those SERPs currently reward [directory listicles](https://www.clutch.co/us/web-developers), [agency roundups](https://www.webkorps.com/blog/top-web-development-companies/), and large delivery firms. The studio is a small React website-and-frontend practice with six public projects, INR packages from ₹9,999, and a client-side Vite app whose **every URL still publishes the homepage title, description, H1, and canonical**.

The growth path is:

1. **Make the existing eight URLs independently indexable** (unique meta, prerendered HTML, complete sitemap, no soft-404 `/about`).
2. **Compete where the catalog is true:** custom websites, React frontend, web apps/dashboards, D2C storefronts, integrations, website care — worldwide English, no “Pune” in titles.
3. **Earn leads from commercial investigation content** (cost, React vs alternatives, slow-site rebuilds, package scope) and from **real `/work/:slug` case studies**.
4. **Only then** attempt mid-competition service head terms. Country pages wait for USD/GBP pricing, timezone overlap, and non-India proof. **Do not build an SEO agency, AI company, or iOS/Android practice in the URL tree until those are real offers.**

**Primary positioning:** Website design and development studio.  
**Default market:** Worldwide English queries.  
**Near-term revenue geography:** India (English), because price, phone, and timezone already match.  
**Pune:** Optional GBP + one location URL later — never the architecture.

**What to do first:** Fix indexation and honest claims. That is the only work that makes every later page worth publishing.

---

## 2. Current Website Situation

**What the site is:** A React 19 + Vite 6 + react-router marketing SPA on **Vercel**, proxied by **Cloudflare**. Live headers on 3 Sep 2026: `Server=cloudflare`, `x-vercel-id` present (e.g. `cdg1::…`), `cf-cache-status=DYNAMIC` on HTML. LinkedIn posts describing a Cloudflare Workers origin are **out of date relative to current response headers**.

**What it sells (live copy, not LinkedIn):**

| Offer | Proof on site |
| ----- | ------------- |
| Starter / Modern / Premium websites | ₹9,999+ / ₹19,999+ / ₹34,999+ |
| Frontend engineering | React, TypeScript, GSAP, design-to-code |
| Web applications | Dashboards, portals, MVPs — custom quote |
| Ecommerce storefronts | Riyansh, Gravitatee |
| Integrations | CMS, booking, APIs |
| Website Care | From ₹999/month; hosting **not** included |

**What it does not sell as products:** SEO retainers, paid ads, native iOS/Android, Flutter, Shopify-as-a-specialty, generative AI products.

**Public URL set today:** `/`, `/services`, `/services/websites|frontend|apps|ecommerce|integrations|care`. Hash sections (`#work`, `#contact`, …) are **not** pages.

**Trust collision:** Homepage metrics claim “40+ Products shipped”, “61% Avg. conversion lift”, “Series B platforms”, while [`src/data/projects.ts`](../../src/data/projects.ts) lists **six** named projects. [`Metrics.tsx`](../../src/components/Metrics.tsx) is an E-E-A-T liability until numbers are sourced or removed.

**Brand collision:** Search for similar names surfaces [Divine Code Studio](https://divinecodestudio.com/), [divinecode.studio](https://divinecode.studio/), and [The Divine Code (Bangalore)](https://internshala.com/company/the-divine-code-1746431265/). LinkedIn company type is “Marketing Services”; the site is a website studio. Entity clarity is weak.

---

## 3. Brand Positioning

### Evidence

- Title and H1: “Website Design & Development.”
- Packages priced in INR with WhatsApp `+91`.
- Tech story: React, Vite, GSAP, Three.js — craft studio, not media-buying agency.
- Portfolio: two D2C/commerce sites, one IT marketing site, three design/motion pieces.

### Recommendation

| Layer | Position | Why |
| ----- | -------- | --- |
| **Primary** | Custom website design and development studio | Matches packages, title, and most plausible commercial queries |
| **Secondary** | React frontend and web-application studio | Matches `/services/frontend` and `/services/apps`; differentiated vs WordPress mills |
| **Supporting** | Ecommerce storefronts + website care | Real projects + a priced retainer |

**Do not use as primary:** Digital marketing agency, SEO agency, AI development company, software product company, full-service “digital solutions” holding company. Those labels fight larger, better-resourced SERPs and contradict the catalog.

**Company vs agency in copy:** Keep **studio / company** for engineering work; use **agency** only if you insist on matching “web development agency” as a secondary phrase on `/services/websites`. Do not retitle the brand as a marketing agency.

**One-line position (use in titles and schema description):**  
*Divine’s Code designs and builds custom React websites, storefronts, and web app interfaces — with clear packages and optional care after launch.*

---

## 4. Global Market Analysis

People searching globally use **unmodified** English service terms. Adding “Pune” or “India” is useful only when the searcher is local or explicitly wants an Indian vendor.

| Query family | Who is searching | What Google rewards (observed 3 Sep 2026) | Divines Code fit |
| ------------ | ---------------- | ----------------------------------------- | ---------------- |
| web development company / agency | Buyers + students; mixed intent | Directories, “top 10” blogs, large firms, some local agencies | Weak on head term; stronger on long-tail + React |
| custom website cost / website development cost | Commercial investigation | Pricing blogs, calculators, agency explainers | **High** — packages are a rare honest asset |
| React development company / agency | Technical buyers | Specialist blogs + mid-size React shops ([Social Animal](https://socialanimal.dev/blog/react-js-development-agency-production-apps-2026/), [Agicent list](https://www.agicent.com/blog/top-reactjs-development-companies/)) | Medium — real stack, small proof set |
| web application development company | Product/ops buyers | Deep service pages (RaftLabs, Corexta, Kavara) | Medium — page exists, proof is thin |
| ecommerce development company | Mid-market / enterprise | Magento/Shopify Plus specialists (Elogic, scandiweb) | **Do not compete on B2B enterprise Magento.** Compete on **custom D2C storefront UI** |
| SEO agency / AI development / mobile app company | Different buying committee | Irrelevant to catalog | **Exclude** |

**Pricing environment (third-party ranges, not Divines Code quotes):** US custom marketing sites often cited at $5k–$30k ([Codolve](https://codolve.com/blog/custom-website-cost-us-2026), [OxelLab](https://oxellab.com/blog/how-much-does-a-custom-website-cost)). Divines Code Starter at ₹9,999 is an **India SMB / early-startup** price, not a US agency price. Global SEO copy must not imply US-agency delivery at Indian starter rates.

**Customer expectations by region**

- **India:** Speed, WhatsApp, transparent INR packages, Hindi/English mix in sales (site stays English).
- **USA/UK/CA/AU:** Timezone overlap, contract entity, USD/GBP, case studies in their market, code ownership — none of this is on-page today.
- **UAE/SG:** English commercial pages work; trust and payment terms matter more than Arabic/Malay in year 1.

---

## 5. Target Market Prioritization

| Market | Opportunity | Competition | Business value | Difficulty | Priority |
| ------ | ----------: | ----------: | -------------: | ---------: | -------- |
| Worldwide English (no geo) | High query diversity | Extreme on head terms | High if long-tail converts | High | **P0 — default** |
| India (English) | Strong SMB website demand | High locally | Highest near-term close rate | Medium | **P1 commercial** |
| USA | Huge demand | Extreme | High ACV later | Very high | P2 after proof + USD |
| UK | Strong agency search | High | High ACV later | High | P2 |
| UAE | English + project spend | Medium-high | Medium | Medium | P2 |
| Singapore | English, smaller volume | High quality bar | Medium | Medium | P3 |
| Canada / Australia | Similar to UK | High | Medium | High | P3 |
| Europe (DE/FR/NL) | Demand exists | Language + GDPR + local firms | Low until localized | Very high | **Do not localize year 1** |
| Pune city | Local pack possible | Local agencies | Secondary | Low–medium | **P4 local only** |

**Tier 1:** Worldwide English pages + India as the honest commercial home.  
**Tier 2:** Remote English-speaking buyers on the **same URLs**, after USD/GBP quote path and 2+ non-India case studies.  
**Tier 3:** Named country pages — not before month 9, and only with unique proof.  
**Not a tier:** Twelve thin `/locations/{country}` clones.

---

## 6. Website Audit

Live fetch 3 Sep 2026. Initial HTML for `/services`, `/services/websites`, and `/about` is the **same shell** (~7.8 KB): homepage title, homepage canonical, homepage H1. React then hydrates a different view. `/about` is **not a real page** — SPA rewrite returns 200.

| URL | Page type | Topic | Current title | H1 (initial HTML) | Meta description | Indexability | Country relevance | Problem | Priority |
| --- | --------- | ----- | ------------- | ----------------- | ---------------- | ------------ | ----------------- | ------- | -------- |
| `/` | Home | Studio + packages | Divine's Code Agency — Website Design & Development | Same as title | Packages from ₹9,999; founders named | Indexable if discovered | Global + India price signal | One page trying to rank for everything; clipped `.seo-shell` | P0 |
| `/services` | Hub | Six services | **Homepage title** | **Homepage H1** | **Homepage** | At risk of duplicate | Global | Canonical points to `/` | P0 |
| `/services/websites` | Service | Website builds | Homepage | Homepage | Homepage | Duplicate signals | Global | Should own website-development cluster | P0 |
| `/services/frontend` | Service | React UI | Homepage | Homepage | Homepage | Duplicate | Global | Unique H1 only after JS | P0 |
| `/services/apps` | Service | Web apps | Homepage | Homepage | Homepage | Duplicate | Global | Competing with “mobile apps” confusion (`apps` slug) | P0 |
| `/services/ecommerce` | Service | Storefronts | Homepage | Homepage | Homepage | Duplicate | Global | Thin vs Magento SERPs — must stay D2C-UI scoped | P1 |
| `/services/integrations` | Service | CMS/API | Homepage | Homepage | Homepage | Duplicate | Global | Long-tail only | P1 |
| `/services/care` | Service | Retainer | Homepage | Homepage | Homepage | Duplicate | Global + India price | Good commercial page if unique meta | P1 |
| `/about` | Soft 404 | None | Homepage | Homepage | Homepage | **Harmful 200** | — | SPA fallback; noindex or 404 | P0 |
| `/#work` etc. | Fragment | Portfolio | = home | = home | = home | Not a URL | — | Do not treat as landing pages | — |
| `/sitemap.xml` | Sitemap | 1 URL | — | — | — | Served `200` `application/xml` | — | Missing 7 service URLs | P0 |
| `/robots.txt` | Robots | Allow all | — | — | — | Fine | — | Points at incomplete sitemap | P2 |

**Content:** Service bodies in `services.ts` are usable if prerendered. Homepage is animation-heavy. No blog. No `/work/:slug`. Testimonials component is project highlights, not quotes (correct — do not fake quotes).

**UX / CRO:** Strong contact surface (form, `tel:`, WhatsApp). CTAs often go to `/#contact` instead of `/contact`.

**Trust:** Gmail as public email; no street address in schema; metrics overclaim; OG image is 512×512 favicon.

**International:** `lang="en"`, `inLanguage: en`, no hreflang (correct for now).

---

## 7. Technical SEO Audit

| Item | Status | Action |
| ---- | ------ | ------ |
| HTTPS | Yes | Keep |
| robots.txt | Allow `/`, sitemap declared | Keep |
| Sitemap | Valid XML, **only `/`** | Add all indexable URLs; generate at build |
| Canonical | Always `https://divinescode.com/` | Per-route canonical |
| Redirects | Unknown old `.agency` host | Confirm 301s in GSC |
| Status codes | Real routes 200; **unknown paths 200 HTML** (`/about`) | Prerender + true 404 |
| Duplicate | All routes share head tags | Route meta |
| JS | CSR; Google *can* render but [does not guarantee it](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | Prerender |
| Internal links | React `<Link>` after hydrate | Must exist in first HTML |
| Images | Project PNGs; OG undersized | Dedicated 1200×630; width/height on LCP |
| Accessibility | Motion-heavy; clip-hidden SEO shell | Visible HTML content; `prefers-reduced-motion` |
| Pagination | None | N/A |
| Orphans | Service URLs not in sitemap | Fix sitemap + HTML nav |

**Vercel rewrite** in `vercel.json` sends non-API paths to `index.html`. That is why `/about` is 200. After prerender, only generated files should 200; everything else 404.

---

## 8. Indexation Analysis

**Discovery paths today**

1. Homepage in sitemap.  
2. Internal links after JavaScript.  
3. External: LinkedIn, GitHub, founder sites (entity doc).  
4. GSC unknown (A1).

**Risks**

- Service URLs may be discovered late or not at all.
- If Google indexes pre-JS HTML, **all URLs look like the homepage** → canonical collapse to `/`.
- If Google indexes post-JS DOM, titles still get overwritten to homepage by `SeoHead` (`useEffect` with empty deps, always `SITE_URL/`).
- Soft-404 `/about` wastes crawl and can taint quality.

**Required GSC week-1 actions:** verify property, submit sitemap, inspect `/`, `/services`, `/services/websites`, request indexing after prerender ships, watch “Duplicate without user-selected canonical” and “Crawled – currently not indexed.”

---

## 9. React/Vite SEO Audit

| Topic | Current | Required |
| ----- | ------- | -------- |
| Rendering | CSR only | **Prerender/SSG** for all marketing routes. Not Next.js rewrite in 90 days. Not [dynamic rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering) (workaround, not recommended). |
| Metadata | Static `index.html` + `SeoHead` homepage constants | Route table in `src/data/seo.ts`; update title/canonical/OG on navigation **and** in prerendered HTML |
| Status codes | SPA 200 | Prerendered files + hosting 404 |
| Canonical | Forced to `/` | Self-referencing per URL |
| Sitemap | Hand-edited public file | Build step from route list |
| robots | Static OK | Keep |
| Schema | Org + WebSite + Persons on every URL | WebPage + BreadcrumbList + Service/FAQ per route; Org on home |
| Dynamic routes | `/services/:slug` | Prerender the six known slugs only |
| Intro overlay | `ArcRevealHero` delays home content | Ensure prerendered HTML includes full home copy, not only the curtain |

**Architecture choice:** Stay on Vite. Add a prerender step (e.g. crawl the production preview into `dist` HTML per path, or `vite-plugin-ssg` / equivalent). Server-side React (Next/Remix) is a later option if the content system outgrows static routes — not a month-1 rewrite.

---

## 10. Core Web Vitals

**Field data:** Not confirmed (A3). Small-traffic origins often have **no CrUX row**; that is not a pass.

**Lab/stack risks (critical vs optional)**

| Issue | Why it matters | Priority |
| ----- | -------------- | -------- |
| GSAP + Lenis + Framer/Motion + Three/R3F on marketing pages | Main-thread long tasks → **INP**; LCP delayed until JS | Critical: code-split 3D and intro; defer WebGL |
| Google Fonts (Caveat Brush, Instrument Serif, Inter Tight) | Extra RTT; possible CLS on swap | Critical: subset, `font-display`, preload only the hero face |
| Intro curtain + sessionStorage hero | LCP is not the H1; users/crawlers wait | Critical: prerender visible H1; shorten/skip intro for repeat visits (already partly done) |
| Heavy homepage JS (analytics + 3D + cursor) | TBT/INP | Critical: route-level splitting; no Three on service pages |
| Project images | LCP candidates below fold should lazy; hero should not | Critical if a poster/video is LCP |
| Vercel Analytics | Small third party | Optional |
| `@vercel/analytics` + Cloudflare | TTFB generally fine on edge | Monitor; not the first bottleneck |
| Clipped `.seo-shell` | Not a CWV issue; quality/cloaking-adjacent | Critical for SEO quality, not CWV |

**Targets (Google thresholds, not promises):** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 field.

---

## 11. Current Keyword Landscape

Divines Code is **not visibly competing** for non-branded commercial heads in public SERP samples. Brand queries are polluted by similarly named companies.

**On-page keyword reality**

- Title/H1 target: website design and development (branded).
- Body (after JS): website packages, frontend, apps, ecommerce, integrations, care.
- Geographic modifiers: **absent** in UI (good for global). INR and +91 leak India (acceptable, honest).

**Implied current targets (unintentional):** homepage for every service query; hash URLs for work/contact.

There is **no** current ranking landscape to optimize from GSC. Treat the site as **pre-visibility**.

---

## 12. Global Keyword Research

Research used live SERP sampling and published explainers. Volumes from [kwrds.ai web development keyword list](https://www.kwrds.ai/top-keywords/web-development) are **unverified estimates** (e.g. they list “web development company” ~60,500 and “web development agency” ~14,800). **Do not budget to those numbers.** Intent and SERP type matter more.

### In-scope clusters (map to live services)

**Websites (one page owns these — do not split)**  
web development company · web development agency · web development services · website development company · website development agency · custom web development · custom website development · professional web development · business website development · startup website

**Frontend (separate page)**  
React development company · React development agency · frontend development company · JavaScript development company (supporting) · Next.js *only as a supporting article until Next is a standard delivery* (portfolio includes Webflow on Rethink — do not pretend to be a Next.js shop on the service page)

**Web apps (separate; slug should not mean mobile)**  
web application development company · custom web application · dashboard development · customer portal development · MVP development (web) · startup web app

**Ecommerce (D2C UI, not Magento enterprise)**  
ecommerce website development · custom ecommerce storefront · ecommerce website design  
*Shopify / WooCommerce: supporting content only if you actually ship them; catalog does not specialize.*

**Integrations / care**  
website maintenance · website care plan · CMS integration · booking system website

### Researched then excluded or delayed

| Cluster | Verdict |
| ------- | ------- |
| SEO agency / company / technical SEO agency | **Exclude as service.** Technical SEO *education* OK as resources proving website quality |
| Digital marketing / performance / lead-gen agency | **Exclude** |
| AI development / chatbot / ML company | **Exclude** until a product exists |
| Mobile / Android / iOS / Flutter / React Native | **Exclude.** Rename mental model: `apps` = **web** applications |
| Enterprise software / SaaS development company (head) | **Delay.** `/services/apps` can mention MVPs without claiming enterprise SaaS factory |
| Country modifiers (USA, UK, …) | **Delay** as page targets; OK in body if a case study is in that country |

### Scoring examples (rubric)

| Keyword | Score | Band | Notes |
| ------- | ----: | ---- | ----- |
| website development cost / custom website cost | 86 | Quick | Pricing SERPs; you have packages |
| custom website development | 78 | Quick | Aligns with packages |
| React website development | 76 | Quick | Stack-true |
| website maintenance cost | 74 | Quick | Care plan |
| web development services | 64 | Medium | Broader; one page with company/agency |
| web development company | 42 | Long | Directory SERP |
| ecommerce development company | 38 | Long | Enterprise specialists |
| SEO agency | 8 | Exclude | Not sold |
| AI development company | 5 | Exclude | Not sold |

---

## 13. Keyword Clusters

### Cluster A — Websites  
**URL:** `/services/websites`  
**Primary:** custom website development  
**Secondary:** website development company, web development services, business website  
**Supporting articles:** cost, React vs WordPress, what’s in a package  
**Do not create** separate URLs for company vs agency vs services.

### Cluster B — Frontend / React  
**URL:** `/services/frontend`  
**Primary:** React development company *(use “React frontend studio” in H1 if “company” feels inflated)*  
**Supporting:** hire React developer vs studio, GSAP marketing sites, design-to-code

### Cluster C — Web applications  
**URL:** `/services/apps`  
**Primary:** custom web application development  
**Secondary:** dashboard, portal, MVP  
**Supporting:** spreadsheet-to-dashboard, when not to build a native app

### Cluster D — Ecommerce  
**URL:** `/services/ecommerce`  
**Primary:** custom ecommerce website  
**Supporting:** D2C storefront UX, catalog performance  
**Do not** target “Adobe Commerce partner” or “Shopify Plus agency”

### Cluster E — Integrations  
**URL:** `/services/integrations`  
**Primary:** website API integration / CMS-connected website  
Long-tail only.

### Cluster F — Care  
**URL:** `/services/care`  
**Primary:** website maintenance / website care plan

### Cluster G — Studio (brand + conversion)  
**URLs:** `/`, `/about`, `/contact`, `/pricing`, `/work`  
Homepage = brand + category. Pricing = cost cluster. Work = proof.

### Cluster H — Resources  
Commercial investigation + technical first-hand. Not a news blog.

---

## 14. Long-Tail Opportunities

Meaningful long-tails (demand inferred from SERP composition: pricing posts, comparison guides, hiring checklists). **No fabricated volumes.**

**Commercial / pricing**  
1. custom website cost  
2. how much does a business website cost  
3. website development cost India *(body mention OK; not a Pune page)*  
4. React website cost  
5. website package vs custom quote  
6. website maintenance cost per month  
7. domain and hosting not included in website price  
8. ecommerce storefront cost vs Shopify theme  
9. dashboard development cost  
10. MVP website vs MVP web app cost  

**Hiring / investigation**  
11. hire React developer vs agency  
12. how to choose a web development studio  
13. questions to ask a website developer  
14. website agency vs freelancer  
15. design-to-code React studio  
16. who owns the website source code  
17. fixed price website development  
18. website project timeline 1–12 pages  
19. red flags when hiring a web agency  
20. offshore website development timezone  

**Problem / rebuild**  
21. website looks good on localhost but slow in production  
22. rebuild slow WordPress site in React  
23. fix CLS on marketing site  
24. GSAP website performance  
25. Three.js hero hurting LCP  
26. SPA SEO not indexing  
27. Vite React sitemap  
28. single page app canonical issues  
29. website not showing in Google  
30. duplicate title tags all pages  

**Technology choice**  
31. React vs WordPress for business website  
32. React vs Webflow  
33. when to use Next.js vs Vite  
34. Tailwind for marketing sites  
35. headless CMS with React  
36. custom storefront vs Shopify  
37. booking system on a React site  
38. WhatsApp button vs contact form conversion  

**Industry (only with proof)**  
39. Ayurvedic ecommerce website  
40. spice brand ecommerce website  
41. IT services company website  
42. design studio portfolio website  
43. D2C catalog UX  
44. manufacturing brand website India  

**Startup / SMB**  
45. startup landing page that can grow  
46. first website for small business  
47. professional website without a template look  
48. portfolio website for founder  
49. service business website structure  
50. local business website WhatsApp enquiry  

**Ecommerce UX**  
51. product catalog filters UX  
52. mobile-first storefront  
53. brand storytelling ecommerce  
54. store redesign when conversion is low  

**Apps / product**  
55. replace spreadsheet with dashboard  
56. customer portal vs new SaaS  
57. internal tools React  
58. booking confirmation flow  
59. auth flows for small web apps  
60. API-backed frontend studio  

**Care / ops**  
61. who updates website after launch  
62. website care vs hosting  
63. content updates retainer  
64. seasonal landing page updates  

**Comparisons**  
65. custom website vs Wix  
66. custom website vs Squarespace  
67. studio vs large IT company for a 10-page site  
68. INR website packages vs US agency quotes *(honest positioning)*  

**SEO-adjacent (education, not SEO-agency)**  
69. technical SEO for React websites  
70. prerender vs SSR for agency site  
71. JSON-LD Organization + Person  
72. Core Web Vitals for GSAP sites  

**Process**  
73. website discovery questions  
74. what is included in website launch QA  
75. SSL and deployment client-owned hosting  

**Geography (do not make pages; use in FAQs/case studies if true)**  
76. work with a website studio in a different timezone  
77. hire Indian React developers for a US site — **only if delivery model is real**  
78. English-language website studio  

**Negative keywords (do not chase)**  
79–88. SEO packages, Google Ads management, iOS app, Flutter, chatbot development, ChatGPT integration as a product, “best SEO company”, “software development company USA”, “web development company Pune” as a global strategy, “AI SaaS development company”

**More commercial tails**  
89. get a website quote  
90. website brief template  
91. how long does a 7 page website take  
92. GSAP animation website examples  
93. React marketing website examples  
94. ecommerce UI case study  
95. website care plan what’s included  
96. custom integrations CMS booking  
97. performance pass for existing React site  
98. component library for marketing site  
99. accessibility on animated websites  
100. convert Figma to React production  

---

## 15. Search Intent Analysis

| Intent | Examples | Page type Google rewards | Divines Code page |
| ------ | -------- | ------------------------ | ----------------- |
| Informational | what is web development | Guides, courses (often **low lead value**) | Resources only if it demonstrates craft; do not rank for courses |
| Commercial investigation | website cost, how to choose agency, React vs WordPress | Long articles + calculators | `/pricing`, `/resources/*` |
| Transactional | hire, company, services, get a quote | Service pages with proof, process, FAQ, CTA | `/services/*`, `/contact` |
| Navigational | Divines Code, Divine’s Code | Homepage, Knowledge panel later | `/`, entity hygiene |
| Local | web designer near me, Pune | Map pack + GBP | Later `/locations/pune` + GBP |
| International | web development company USA | Mix of US firms, directories, offshore listicles | **Same global service page**, not `/usa` |

**Funnel**

- Awareness: technical essays, case studies.  
- Consideration: cost, comparison, process.  
- Decision: service + contact + packages.  
- Expansion: care retainer.

---

## 16. Competitor Analysis

Metrics below are **qualitative from public pages**. No DR/backlink counts invented.

### Global / category competitors (head-term SERP occupants)

| Competitor | Why they appear | Lesson |
| ---------- | --------------- | ------ |
| [Clutch web developers](https://www.clutch.co/us/web-developers) | Directory intent | You will not displace Clutch; get listed later as PR, not as strategy |
| [Webkorps-style listicles](https://www.webkorps.com/blog/top-web-development-companies/) | Affiliate/list SEO | Do not copy 40-service mega pages |
| BairesDev / similar staff-aug | Brand + content | Different offer (teams vs packages) |
| [Geniusee web development](https://geniusee.com/web-development) | Deep service page, compliance proof | Depth + credentials; you need depth + **honest** scope |
| [RaftLabs](https://www.raftlabs.com/services/web-application-development) | Workflow-specific web apps, published process | Model `/services/apps` on this *structure*, not their ACV |
| [Corexta](https://www.corexta.com/services/custom-web-application-development/) | SaaS/enterprise claims | Too broad for you — steal FAQ/process patterns only |
| [Webvio](https://webvio.co/) | Transparent USD pricing, SEO-in-the-build | Pricing honesty converts; you already have INR packages — expose them as URLs |
| [Chromatix](https://www.chromatix.com.au/) | Strong local + conversion specialist | Local proof; not your year-1 model |
| [Agicent React list](https://www.agicent.com/blog/top-reactjs-development-companies/) | Roundup of 10+ year firms | React SERP is listicle-heavy; counter with first-hand build posts |
| [Elogic / scandiweb](https://elogic.co/) | Ecommerce platform specialists | Stay out of their SERP; stay D2C UI |

### Regional (India-relevant)

Indian full-stack houses and Noida/Bengaluru agencies dominate “web development company India” with 100+ engineer claims. Divines Code should **not** imitate headcount claims. Compete on **package clarity, React craft, and named projects**.

### Content competitors

Pricing/ explainer publishers ([Codolve](https://codolve.com/blog/custom-website-cost-us-2026), [OxelLab](https://oxellab.com/blog/how-much-does-a-custom-website-cost), [Social Animal React guides](https://socialanimal.dev/blog/react-web-development-company-hiring-guide/)) own commercial investigation. Opportunity: publish **India+global hybrid** cost content that states INR packages and when a custom quote applies — few studios do this without spam.

### Brand-name competitors (entity)

Divine Code Studio, The Divine Code (Bangalore), Divine Pixel & Codes. Mitigate with consistent `Divine’s Code` / `Divines Code`, Organization schema, LinkedIn category correction, and founder sameAs (already started in JSON-LD).

---

## 17. SERP Analysis

| Keyword (priority) | Observed page types | Intent mix | Features (typical on this class of query) | What to build |
| ------------------ | ------------------- | ---------- | ----------------------------------------- | ------------- |
| web development company | Directories, listicles, large agencies | Mixed; lots of informational leakage | Often AI Overview + People Also Ask + sitelinks for big brands | Do **not** make this the H1 of `/`. Support from `/services/websites` over years |
| web development agency | Boutique agency homepages + lists | More hire-intent than “company” in several samples | PAA, some local packs depending on geo | Secondary phrase on websites page |
| custom website development | Agency service pages + cost blogs | Commercial | PAA on cost/timeline | `/services/websites` |
| custom website cost | Pricing articles, calculators | Investigation | Featured snippet attempts, tables | `/pricing` + cost article |
| React development company | Listicles + specialist agencies | Hire technical | PAA on Next vs React | `/services/frontend` + hiring guide |
| web application development company | Long service pages | Transactional/enterprise | Tables, process, FAQs | `/services/apps` (honest SMB/startup scope) |
| ecommerce development company | Platform partners | Enterprise B2B | Partner badges | Narrow to custom storefront; ignore Magento SERP |
| website maintenance | Mix of hosts, care plans, WP retainers | Transactional | Local/hosting ads | `/services/care` |

**AI Overviews:** Common on definitional and “how to choose” queries. Google’s position: [same technical eligibility as Search; unique, people-first content](https://developers.google.com/search/docs/appearance/ai-features). No special hacks.

---

## 18. Keyword Cannibalization

| Conflict | Resolution |
| -------- | ---------- |
| Homepage vs `/services/websites` for “website development” | Home: brand + category. Websites: commercial cluster. Internal links from home use “Website development” → `/services/websites` |
| `/services` vs each child | Hub is a table of contents, not a ranking page for a head term |
| `apps` vs mobile app queries | Copy must say **web applications**. Consider slug `/services/web-applications` + 301 later |
| Company vs agency vs services | One page |
| Pune vs global duplicates | Never clone service pages with a city suffix |
| Cost article vs `/pricing` | `/pricing` = packages + CTA. Article = education + link to pricing |
| Frontend vs websites both saying “React websites” | Websites = full marketing site packages. Frontend = you already have design/product |
| Care vs “SEO retainer” | Care = updates/fixes, not rankings |
| `/about` 200 vs home | Delete/404 until a real about page exists |
| Founder sites vs agency for “Jayesh Patil web developer” | Entity strategy (companion doc): complementary, not competing service pages |

**Actions:** merge (company/agency/services), differentiate (home vs websites), 404 (fake `/about` until built), canonicalize (self), redirect (if slug rename).

---

## 19. Topical Authority Map

```
WEBSITE DEVELOPMENT
├── Custom website development (service)
├── Packages and cost (commercial)
├── Business / startup websites
├── React marketing sites
├── Performance and CWV
├── Technical SEO for the site you ship
├── Accessibility on motion sites
└── Case studies (Tell Star, Outpost, …)

FRONTEND / REACT
├── Design-to-code
├── Component systems
├── GSAP / motion systems
├── Performance passes
└── Hiring a React studio

WEB APPLICATIONS
├── Dashboards / internal tools
├── Customer portals
├── Booking / auth / API UIs
├── MVP product shells
└── When not to build native mobile

ECOMMERCE (D2C UI)
├── Catalog and storefront UX
├── Brand storytelling shops
├── Riyansh / Gravitatee case studies
└── Custom vs hosted themes (honest)

INTEGRATIONS
├── CMS
├── Booking
├── CRM / payments (scoped)
└── Documentation / ownership

WEBSITE CARE
├── Updates vs hosting
├── Retainers
└── Launch follow-up

SEO / MARKETING / AI / NATIVE APPS
└── (no service node — optional educational leaves only)
```

---

## 20. Recommended Site Architecture

Build only what has demand + unique value.

```
/
├── about/                 (real company page — after 404 fix)
├── contact/
├── pricing/
├── services/
│   ├── websites/
│   ├── frontend/
│   ├── apps/              (web applications; rename later)
│   ├── ecommerce/
│   ├── integrations/
│   └── care/
├── work/
│   └── :slug/             (Riyansh, Gravitatee, Tell Star first)
├── resources/
│   └── :slug/
└── locations/
    └── pune/              (phase 4, if NAP is real)
```

**Do not build in year 1:** `/services/seo`, `/services/ai`, `/services/mobile`, `/industries/healthcare`, `/locations/usa|uk|…`, language folders, `SearchAction` to a fake `/search`.

**Remove / stop:** treating hash routes as SEO pages; clipped-only crawl text as the content strategy; unsubstantiated metrics.

---

## 21. Service Page Strategy

Every service URL must include, in **visible HTML**: positioning, who it is for, problem, approach, capabilities, stack, process, deliverables, packages or “custom quote”, 1–3 real projects, FAQ, related services, related resources, single primary CTA (conversation / WhatsApp).

| URL | Position | Customer | Unique proof | Title (draft) |
| --- | -------- | -------- | ------------ | ------------- |
| `/services/websites` | Full site packages | SMB, founders, local-global English buyers | Packages + Tell Star | Custom Website Development \| Divines Code |
| `/services/frontend` | Design-to-code React | Teams with Figma/product | Motion/performance work | React Frontend Engineering \| Divines Code |
| `/services/apps` | Web apps, not stores, not native | Ops/startup product slices | Dashboards language + custom quote | Custom Web Applications \| Divines Code |
| `/services/ecommerce` | D2C storefront UI | Catalog brands | Riyansh, Gravitatee | Custom Ecommerce Storefronts \| Divines Code |
| `/services/integrations` | Connect the site to ops | After brochure stage | Process + documentation promise | Website Integrations \| Divines Code |
| `/services/care` | Updates, not hosting | Post-launch clients | ₹999+ clarity | Website Care Plans \| Divines Code |
| `/services` | Index of the six | Browsers | Links only | Website & Product Engineering Services \| Divines Code |

Generic “we are passionate / 360-degree digital” copy is banned.

---

## 22. Industry Page Strategy

**Rule:** two live, relevant projects minimum.

| Industry | Evidence | Page? |
| -------- | -------- | ----- |
| D2C / catalog ecommerce | Riyansh, Gravitatee | **Yes, later** `/industries/d2c` or keep as cluster under ecommerce + case studies |
| IT / professional services sites | Tell Star | Article or case study, not a thin industry URL |
| Creative studios | Outpost, Rethink, AnimeVerse | Portfolio, not “industry page” |
| Healthcare, legal, fintech, logistics, hospitality, fitness | No catalog proof | **No** |

Do not manufacture industry URLs for URL count.

---

## 23. International SEO Strategy

**hreflang:** Not needed. Site is English-only and not locale-cloned. Google [detects language algorithmically](https://developers.google.com/search/docs/specialty/international/localized-versions); hreflang is for **pairs of localized URLs**.

**ccTLD / subfolders / subdomains:** Keep `divinescode.com` as the global English host. No `us.divinescode.com`. No `/en-gb/` until you have genuinely different pages.

**Country pages:** Forbidden as near-duplicates. If a US page is ever justified (month 9+), it must contain US-relevant case study, contracting, hours, and pricing currency — otherwise it is a doorway.

**Languages:** Stay English. No machine-translated Hindi/Arabic/French site. Sales can be bilingual; the indexable site is English.

**International targeting in GSC:** Set to **Unlisted / not geographically targeted** (worldwide) unless you later create a true country section.

---

## 24. Local SEO Strategy

Pune is **optional and last**.

**If** you have a real serviceable NAP (office or consistent service-area business):

1. Google Business Profile: Website design service, Pune/Maharashtra, photos of real work, no fake reviews.  
2. One page `/locations/pune` — unique: travel/working model, local projects, INR packages, map, **different** from `/services/websites`.  
3. Citations only on real directories (Clutch later, India business listings that you will maintain).  
4. Local links from actual community/tech events — not citation blasts.

**Do not:** put “Pune” in global titles, create `/web-development-company-in-pune`, or let GBP categories say “SEO agency” / “marketing agency” unless that is the legal business.

Nashik-area coordinates in project UI are **not** a Pune strategy. Pick one honest service area.

---

## 25. Content Gap Analysis

| Gap | Competitors have | You have | Build |
| --- | ---------------- | -------- | ----- |
| Unique titles per URL | Yes | No | P0 engineering |
| Pricing URL | Many | Section only | `/pricing` |
| Case study URLs | Yes | Gallery only | `/work/:slug` |
| Cost/comparison articles | Yes | No | Resources |
| React hiring guides | Yes | No | Resources |
| Reviews (Google/Clutch) | Yes | Thin | After delivery, ask real clients |
| Partner badges | Ecommerce majors | No | Don’t fake |
| Blog cadence | Yes | No | 2–4 serious pieces/month after foundation |
| International proof | US/UK case studies | India-heavy | Do not fake geography |
| SEO/AI/mobile services | Many agencies | Not offered | **Do not fill the gap with pages** |

---

## 26. Global Content Strategy

**12-month mix (after technical foundation in month 1)**

| Category | Purpose | Cadence after month 1 |
| -------- | ------- | --------------------- |
| Commercial | Service + pricing | Update quarterly |
| Educational | Cost, process, choose a studio | 2/month |
| Technical | React/Vite/CWV/SPA SEO from **your** stack | 1/month |
| Comparison | React vs WP vs Webflow, custom vs Shopify theme | 1/month Q2+ |
| Industry | D2C only when case studies live | 2–3 in year |
| Research | One original dataset (e.g. performance of 20 India SMB sites **you measured**) | 1 in H2 |
| Case studies | First-hand | 6 in year (one per current project) |
| Thought leadership | Named founders, DEV.to syndication | Supporting, not the core |

**Quality bar:** If a competent competitor could paste the same article with a find-replace, do not publish. Prefer screenshots, Lighthouse traces, repo architecture, and package math.

---

## 27. First 50 Content Opportunities

Country = **worldwide English** unless noted. CTA default = `/contact` or WhatsApp. Expertise = studio (Jayesh/Mahendra). Backlink potential: High / Medium / Low = likelihood a human editor would cite, not a promise.

**01** Custom Website Development (service rebuild)  
URL `/services/websites` · KW custom website development · Sec: website development company, web development services · Intent transactional · Funnel decision · Pri P0 · Outline: who it’s for, packages, stack, process, 2 projects, FAQ · Links: pricing, care, Tell Star · CTA Start a website · Backlink L

**02** Services hub  
`/services` · KW website and frontend services · Intent commercial · Funnel consideration · P0 · Outline: six lanes, who not to hire you · Links: all services · CTA · Backlink L

**03** React frontend engineering  
`/services/frontend` · KW React development company · Sec: frontend development, design to code · Transactional · P0 · Outline: when you already have design · Links: websites, apps · Backlink L

**04** Custom web applications  
`/services/apps` · KW custom web application development · Sec: dashboards, portals, MVP · Transactional · P0 · Clarify not native mobile · Backlink L

**05** Custom ecommerce storefronts  
`/services/ecommerce` · KW custom ecommerce website · Sec: D2C storefront · Transactional · P1 · Proof Riyansh, Gravitatee · Backlink L

**06** Website integrations  
`/services/integrations` · KW website CMS integration · Long-tail transactional · P1 · Backlink L

**07** Website care plans  
`/services/care` · KW website maintenance · Sec: website care plan · Transactional · India-relevant pricing · P1 · Backlink L

**08** Pricing  
`/pricing` · KW website development cost · Sec: custom website cost · Investigation · P0 · Outline: three packages, custom, what’s excluded (domain/hosting) · Links: websites, care · Backlink M

**09** About  
`/about` · KW Divines Code · Navigational · P0 · Founders, real scope, what you refuse · Links: work, contact · Backlink L

**10** Contact  
`/contact` · KW contact Divines Code · Transactional · P0 · Form + WhatsApp + qualify (budget, timeline, country) · Backlink L

**11** Work index  
`/work` · KW Divines Code work · Commercial · P0 · Filter by type · Backlink L

**12** Case: Riyansh  
`/work/riyansh` · KW Ayurvedic ecommerce website · Case · P0 · Problem, catalog, stack, result **only if measured** · Links: ecommerce · CTA · Backlink M

**13** Case: Gravitatee  
`/work/gravitatee` · KW spice brand website · P0 · Backlink M

**14** Case: Tell Star  
`/work/tell-star` · KW IT company website React · P1 · Backlink M

**15** Case: Outpost  
`/work/outpost` · KW design studio website motion · P2 · Backlink L

**16** How much a custom website costs (2026)  
`/resources/custom-website-cost` · KW custom website cost · Investigation · P0 · Use **your** INR bands + when quotes go custom; cite that US ranges differ · Links: pricing · Backlink **H**

**17** Website package vs custom quote  
`/resources/website-package-vs-custom` · Investigation · P1 · Backlink M

**18** React vs WordPress for a business site  
`/resources/react-vs-wordpress-business-website` · Comparison · P1 · Backlink H

**19** React vs Webflow  
`/resources/react-vs-webflow` · Comparison · P2 · Rethink used Webflow — first-hand · Backlink M

**20** When not to use Next.js (Vite marketing sites)  
`/resources/vite-vs-nextjs-marketing-sites` · Technical · P1 · First-hand this repo · Backlink **H**

**21** SPA SEO: unique titles and prerender  
`/resources/react-vite-spa-seo` · Technical · P0 · Your actual bug list · Backlink **H**

**22** GSAP and Core Web Vitals  
`/resources/gsap-core-web-vitals` · Technical · P1 · Backlink H

**23** Why the site was fast on localhost  
`/resources/localhost-vs-production-performance` · Problem · P1 · Matches founder LinkedIn narrative — make it a **client** guide · Backlink M

**24** Questions to ask a website studio  
`/resources/questions-to-ask-website-developer` · Investigation · P1 · Backlink M

**25** Agency vs freelancer vs studio  
`/resources/website-studio-vs-freelancer` · Investigation · P1 · Backlink M

**26** Design-to-code without losing the Figma  
`/resources/figma-to-react-production` · Technical/commercial · P1 · Backlink M

**27** Who owns hosting and the repo  
`/resources/website-code-ownership-hosting` · Trust · P1 · Backlink L

**28** Website care vs hosting  
`/resources/website-care-vs-hosting` · Commercial · P1 · Backlink L

**29** D2C catalog UX lessons  
`/resources/d2c-catalog-ux` · Industry · P2 · From Riyansh/Gravitatee · Backlink M

**30** Custom storefront vs Shopify theme  
`/resources/custom-storefront-vs-shopify-theme` · Comparison · P2 · Honest “we’re not a Shopify Plus partner” · Backlink M

**31** Spreadsheet to dashboard  
`/resources/spreadsheet-to-react-dashboard` · Apps · P2 · Backlink M

**32** Booking flow on a marketing site  
`/resources/website-booking-integration` · Integrations · P2 · Backlink L

**33** WhatsApp vs form for service businesses  
`/resources/whatsapp-vs-contact-form` · CRO · P2 · Backlink L

**34** Accessibility on animated sites  
`/resources/accessibility-gsap-websites` · Technical · P2 · Backlink M

**35** JSON-LD for a small studio  
`/resources/organization-person-schema-studio` · Technical · P2 · Backlink M

**36** How we structure a 4–7 page business site  
`/resources/business-website-information-architecture` · Educational · P2 · Backlink L

**37** Startup landing page that won’t trap you  
`/resources/startup-landing-page-structure` · Startup · P2 · Backlink L

**38** Performance pass: what’s in scope  
`/resources/frontend-performance-pass` · Commercial · P2 · Backlink L

**39** Component systems for marketing sites  
`/resources/marketing-site-component-system` · Frontend · P2 · Backlink L

**40** Launch QA checklist  
`/resources/website-launch-qa-checklist` · Educational · P1 · Digital PR asset · Backlink **H**

**41** Website brief template (downloadable)  
`/resources/website-brief-template` · Commercial · P1 · Backlink H

**42** Cost calculator (interactive, prerendered explainer)  
`/resources/website-cost-calculator` · Investigation · P1 · Backlink **H**

**43** Case: AnimeVerse (product/motion)  
`/work/animeverse` · P3 · Backlink L

**44** Case: Rethink (Webflow/3D — disclose stack)  
`/work/rethink` · P3 · Backlink L

**45** Internal linking for a studio site  
`/resources/internal-linking-service-pages` · Technical · P3 · Backlink L

**46** How Google treats JavaScript sites (cite Search Central)  
`/resources/javascript-seo-google` · Educational · P2 · [JS SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) · Backlink M

**47** AI Overviews: what actually matters  
`/resources/ai-overviews-for-service-businesses` · Thought · P3 · [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) · Backlink M

**48** Working across timezones (when you start US/UK)  
`/resources/timezone-overlap-website-projects` · International · P3 · Only if true · Backlink L

**49** Founder essay: shipping Riyansh (Mahendra already posted fragments)  
`/resources/building-riyansh-ecommerce` · Case/thought · P1 · Backlink M

**50** Metrics we will and will not publish  
`/resources/honest-agency-metrics` · Trust · P1 · Fixes E-E-A-T · Backlink M

---

## 28. Case Study Strategy

Turn each of the six live projects into `/work/:slug` with **first-hand** fields only:

Client (or brand) · Country · Industry · Problem · Objective · Constraints · Design · Technology · Development · SEO/performance work actually done · Implementation · Results **if measured** · Screenshots · Permissioned quote · Lessons.

If a result is unknown, write the constraint and the shipping outcome — do not invent “61% conversion lift.”

Order: Riyansh → Gravitatee → Tell Star → Outpost → Rethink → AnimeVerse.

---

## 29. E-E-A-T / Trust Strategy

| Pillar | Have | Missing | Fix |
| ------ | ---- | ------- | --- |
| Experience | Named live sites | Process artifacts, before/after | Case URLs, GitHub where allowed |
| Expertise | React/GSAP depth in the product | Expert bylines, original traces | Founder-authored technical posts |
| Authority | Young domain, similar-name clutter | Mentions, directories, DEV.to | Entity cluster + digital PR (white-hat) |
| Trust | Phone, WhatsApp, form | Street NAP, non-Gmail email, honest metrics, policies | `hello@divinescode.com` (or keep Gmail but be consistent), privacy/terms, remove or source Metrics |

**Schema honesty:** Organization is fine. Do not add `AggregateRating` without real reviews. Do not mark `LocalBusiness` until NAP is public and true.

---

## 30. Internal Linking Strategy

```
Home → Services hub → each service
Home → Pricing, Work, Contact, About
Each service → 2 related services + 1–2 resources + 1 case study + pricing or contact
Each case study → parent service + 1 related case + contact
Each resource → one service + pricing or work
Footer: crawlable text links (not icon-only) to all indexable URLs
Founders: keep footer links to jayeshbpatil.com and mahendranagpure.com
```

Anchors: descriptive (“React frontend engineering”), not stuffed “web development company Pune.” Vary exact match.

---

## 31. Schema Strategy

| Page | Types |
| ---- | ----- |
| Home | Organization, WebSite, WebPage (no fake SearchAction) |
| Service | WebPage, BreadcrumbList, Service, FAQPage (visible FAQs only) |
| Pricing | WebPage, Offer/OfferCatalog **matching visible INR** |
| Work slug | CreativeWork or Article + Breadcrumb |
| Resource | Article (author = Person @id) |
| Contact | ContactPage |
| Pune later | LocalBusiness **only with real address** |

Validate in Rich Results Test. Keep JSON-LD = visible text.

---

## 32. Backlink Strategy

**Allowed:** founder DEV.to and GitHub; client “built by” credits; genuine Clutch/design directory **profiles you maintain**; guest technical articles; one original research asset; university/meetup talks; open-source small tools; partner mentions from real vendors.

**Forbidden:** PBNs, farms, bought links, comment spam, mass directories, fake locales, manipulative exact-match anchors.

**Near-term realistic links:** founder sites (already), GitHub repo, LinkedIn, one DEV.to canonical to `/resources/react-vite-spa-seo`, client sites’ footer if they agree.

---

## 33. Digital PR Strategy

Fifteen linkable assets a **small studio can actually ship**:

1. Website cost calculator (INR + “international quote” path)  
2. Launch QA checklist (PDF/HTML)  
3. React SPA SEO checklist (from this audit)  
4. GSAP performance field notes  
5. Localhost vs production performance write-up  
6. Website brief template  
7. “Honest metrics” pledge  
8. Open-source `vite-prerender` config example for studios  
9. D2C catalog UX notes from two real shops  
10. Font-loading recipe for Instrument Serif + UI sans  
11. Accessibility + motion cookbook  
12. Tiny OG-image generator for agencies  
13. Measured CWV before/after on **your** homepage (once fixed)  
14. State of 20 publicly measured India SMB marketing sites (H2 research)  
15. Office hours / recorded teardown of a volunteer SMB site (with permission)

Skip “Global SEO Benchmark 2026” until you have a data collection method.

---

## 34. AI Search Strategy

Follow [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) and [succeeding in AI search](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search):

- Indexable, snippet-eligible HTML  
- Unique first-hand answers (your packages, your stack failures, your projects)  
- Clear entities (Organization + founders)  
- Structured headings and FAQs that match visible text  
- No “AI SEO hacks,” keyword stuffing, or mass AI rewrites of listicles  

Track later via [GSC generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) once verified.

---

## 35. CRO Strategy

**Keep:** form, WhatsApp, `tel:+919209389015`, LinkedIn.

**Change:**

- `/contact` as a real URL; stop relying on `/#contact` for ads/SEO  
- Qualify: project type, budget band, timeline, country, hosting ownership  
- Show packages near CTA without hiding custom work  
- Replace unverifiable metrics with project count you can defend  
- Case studies adjacent to each service CTA  
- Secondary CTA: WhatsApp for India; form for international  
- Thank-you / event to analytics (Vercel Analytics + later a proper event tool)

Do not add fake chatbots or countdown scarcity.

---

## 36. Google Search Console Strategy

**Week 1:** Verify `https://divinescode.com/` (DNS or meta). Submit sitemap after it lists all URLs. Set users. Enable email alerts.

**Protocol (no data yet)**

| View | Use |
| ---- | --- |
| Coverage / Page indexing | Soft 404s, duplicates, not indexed |
| URL Inspection | `/`, each service, after prerender |
| Performance | Filter unbranded; export queries |
| Countries | Confirm India vs other |
| Core Web Vitals | Field once traffic exists |
| Experience / HTTPS | Hygiene |
| Generative AI reports | After eligibility |

**Optimization buckets once you have 90 days of queries**

- Positions 4–10: title/H1/intro refresh on the **mapped** URL  
- 11–20: content depth + internal links  
- 21–30: likely wrong page or weak uniqueness — re-map or fold  

**Branded vs non-branded:** track separately. Success = non-branded clicks to `/services/*`, `/pricing`, `/contact`.

---

## 37. Analytics & KPIs

**SEO:** impressions, clicks, CTR, average position (GSC); indexed URLs; non-branded share.

**Site:** service-page sessions, contact page, WhatsApp click, `tel` click, form submit, qualified lead (human tag).

**Business:** proposals, close rate, revenue tagged “organic” (CRM even if a spreadsheet).

**Vanity to ignore:** “keywords we rank for” without clicks; head-term rank without leads.

Instrument events after `/contact` exists. Vercel Analytics is traffic-only.

---

## 38. 30-Day Plan

**Days 1–10 — Indexation**

- Verify GSC; screenshot baseline  
- Run PSI (mobile/desktop) and save  
- Fix `SeoHead` to be route-aware; unique title/description/canonical/H1 in prerendered HTML  
- Expand sitemap to 8 real URLs; stop 200 on `/about` (404 until about ships)  
- Confirm hosting: Vercel + Cloudflare; cache HTML correctly after prerender  
- Remove or source Metrics claims  
- Align LinkedIn company description with website studio (not generic marketing agency)  
- 1200×630 OG image  

**Days 11–20 — Architecture**

- Implement prerender for `/` + `/services` + six slugs  
- Footer crawlable links  
- FAQ/Service/Breadcrumb JSON-LD on services  
- Draft `/contact` and `/pricing` (can ship end of window)  

**Days 21–30 — Content start**

- Ship `/contact`, `/pricing` if ready  
- Outline three case studies  
- Publish nothing thin  

**KPI:** GSC sees sitemap with 8+ URLs; inspections show unique titles.

---

## 39. 60-Day Plan

- Deepen six service pages (visible copy, not animation-only)  
- `/work` + Riyansh, Gravitatee, Tell Star  
- `/about` real page  
- Internal link pass  
- First two resources: cost, SPA SEO  
- Event tracking  
- Request indexing on new URLs  

**KPI:** first non-branded impressions on service URLs (may still be zero — then debug robots/canonical).

---

## 40. 90-Day Plan

- Two more resources + launch QA checklist  
- One digital PR push (DEV.to + LinkedIn with canonical)  
- CRO: qualification fields  
- Begin Clutch or equivalent **only with real reviews**  
- Decide `/services/apps` slug rename  
- Optional GBP if NAP is real — still not Pune-in-titles  

**KPI:** organic enquiries tagged; not rank screenshots.

---

## 41. 6-Month Plan

| Month | Pages | Content | Links | Technical | Research | Optimize | KPI |
| ----- | ----- | ------- | ----- | --------- | -------- | -------- | --- |
| 1 | Meta + prerender + contact/pricing | — | Entity hygiene | CWV pass 1 | PSI/GSC | Metrics honesty | Index unique URLs |
| 2 | Work ×3, about, service depth | Cost + SPA SEO | Founder syndication | 404 correctness | SERP re-check | Titles | Impressions |
| 3 | Resources ×2, QA checklist | Case polish | DEV.to | Schema validate | Query export | Internal links | First clicks |
| 4 | Frontend/apps articles | React vs WP | 1 genuine directory | Image/CDN | Competitors | FAQ from PAA | Service CTR |
| 5 | Ecommerce resources | D2C UX | Client credit asks | INP on home | — | Service refresh | Leads |
| 6 | Calculator or original mini-study | Care content | PR asset | CWV pass 2 | GSC 4–20 | Content updates | Qualified organic leads |

---

## 42. 12-Month Plan

| Phase | Months | Focus |
| ----- | ------ | ----- |
| Foundation | 1–3 | Prerender, unique URLs, honesty, core pages |
| Growth | 4–6 | Resources, cases, internal links, first PR |
| Authority | 7–9 | Original data asset, reviews, technical reputation |
| International | 10–12 | USD/GBP quote path, timezone page **if true**, still **no** doorway countries |
| Competitive acquisition | 10–12 | Cautious bids on “web development services” / React studio terms — only if GSC shows traction |

Month-by-month 7–12: one case or resource every two weeks; quarterly service-page refresh from GSC; no new service verticals without a sold offer.

---

## 43. Master Keyword Map

| Keyword | Country | Intent | Funnel | Business value | Priority | Target URL |
| ------- | ------- | ------ | ------ | -------------- | -------- | ---------- |
| custom website development | Worldwide | Transactional | Decision | High | 78 | `/services/websites` |
| website development company | Worldwide | Transactional | Decision | High | 58 | `/services/websites` |
| web development agency | Worldwide | Transactional | Decision | Medium | 56 | `/services/websites` |
| web development services | Worldwide | Transactional | Decision | Medium | 64 | `/services/websites` |
| custom website cost | Worldwide | Investigation | Consideration | High | 86 | `/pricing` + `/resources/custom-website-cost` |
| React development company | Worldwide | Transactional | Decision | Medium | 70 | `/services/frontend` |
| frontend development company | Worldwide | Transactional | Decision | Medium | 62 | `/services/frontend` |
| custom web application development | Worldwide | Transactional | Decision | Medium | 68 | `/services/apps` |
| dashboard development | Worldwide | Transactional | Decision | Medium | 66 | `/services/apps` |
| custom ecommerce website | Worldwide | Transactional | Decision | Medium | 64 | `/services/ecommerce` |
| website maintenance | Worldwide | Transactional | Decision | Medium | 74 | `/services/care` |
| website care plan | Worldwide | Transactional | Decision | Medium | 72 | `/services/care` |
| website CMS integration | Worldwide | Transactional | Decision | Lower | 60 | `/services/integrations` |
| Divine’s Code / Divines Code | Worldwide | Navigational | — | High | 90 | `/` |
| web development company Pune | Pune | Local | Decision | Low globally | 25 | `/locations/pune` later only |
| SEO agency | — | — | — | None | 8 | **No URL** |
| AI development company | — | — | — | None | 5 | **No URL** |
| mobile app development company | — | — | — | None | 6 | **No URL** |
| web development company USA | USA | Transactional | Decision | Later | 28 | Same global websites page — **not** `/usa` |

---

## 44. Master URL Map

| URL | Page type | Primary keyword | Secondary | Country | Intent | Priority |
| --- | --------- | --------------- | --------- | ------- | ------ | -------- |
| `/` | Home | Divines Code website studio | website design and development | Worldwide | Navigational + category | P0 |
| `/services` | Hub | — | six services | Worldwide | Commercial | P0 |
| `/services/websites` | Service | custom website development | web development services, website development company | Worldwide | Transactional | P0 |
| `/services/frontend` | Service | React development company | frontend engineering | Worldwide | Transactional | P0 |
| `/services/apps` | Service | custom web application development | dashboards, portals | Worldwide | Transactional | P0 |
| `/services/ecommerce` | Service | custom ecommerce website | D2C storefront | Worldwide | Transactional | P1 |
| `/services/integrations` | Service | website integrations | CMS, booking | Worldwide | Transactional | P1 |
| `/services/care` | Service | website maintenance | care plan | Worldwide | Transactional | P1 |
| `/pricing` | Commercial | website development cost | packages | Worldwide (INR honest) | Investigation | P0 |
| `/work` | Index | — | proof | Worldwide | Commercial | P0 |
| `/work/riyansh` | Case | — | ecommerce proof | Worldwide | Commercial | P0 |
| `/work/gravitatee` | Case | — | brand commerce | Worldwide | Commercial | P0 |
| `/work/tell-star` | Case | — | React marketing site | Worldwide | Commercial | P1 |
| `/about` | Company | Divines Code | founders | Worldwide | Navigational | P0 |
| `/contact` | Conversion | — | quote | Worldwide | Transactional | P0 |
| `/resources/custom-website-cost` | Article | custom website cost | — | Worldwide | Investigation | P0 |
| `/resources/react-vite-spa-seo` | Article | SPA SEO React Vite | — | Worldwide | Informational | P0 |
| `/locations/pune` | Local | (later) | — | Pune | Local | P4 |

---

## 45. Top 20 Priorities

| # | Action | Reason | Page | Priority | Effort | SEO impact | Business impact | Dependencies |
| - | ------ | ------ | ---- | -------- | ------ | ---------- | --------------- | ------------ |
| 1 | Route-level title, description, canonical, OG | Every URL currently looks like home | All | P0 | S | Critical | Indirect | `SeoHead` rewrite |
| 2 | Prerender marketing routes | Google may not see unique bodies | All | P0 | M | Critical | Indirect | Build pipeline |
| 3 | Sitemap of all indexable URLs | Discovery | sitemap.xml | P0 | S | High | Indirect | Route list |
| 4 | True 404 for unknown paths | `/about` 200 soft 404 | Hosting | P0 | M | High | Trust | Prerender |
| 5 | Verify GSC + submit sitemap | No ranking data now | — | P0 | S | High | Measurement | Domain access |
| 6 | Remove or source Metrics | E-E-A-T / misleading | Home | P0 | S | Medium | Trust/CRO | Founders |
| 7 | Unique visible H1 per service in HTML | Relevance | Services | P0 | S | High | Clarity | Prerender |
| 8 | `/contact` URL + events | Conversion + crawl | Contact | P0 | M | Medium | High | Router |
| 9 | `/pricing` URL | Owns cost queries | Pricing | P0 | M | High | High | Copy |
| 10 | Service + FAQ + Breadcrumb schema | Eligibility | Services | P1 | S | Medium | Trust | Visible FAQs |
| 11 | 1200×630 OG | Shares/snippets | Global | P1 | S | Low–med | Brand | Design |
| 12 | Three case-study URLs | Proof Google and buyers lack | /work/* | P0 | M | High | High | Client facts |
| 13 | Code-split Three/intro off service templates | INP/LCP | Home vs services | P1 | M | High CWV | UX | Engineering |
| 14 | Cost resource | SERP type match | Resource | P1 | M | High | Leads | Pricing page |
| 15 | SPA SEO resource (first-hand) | Links + AI/search citations | Resource | P1 | M | Medium | Authority | Audit |
| 16 | Align LinkedIn + schema naming | Entity collision | Off-site | P1 | S | Medium brand | Sales | Admin access |
| 17 | Internal link footer/nav in HTML | Crawl graph | Global | P1 | S | High | UX | Prerender |
| 18 | Qualify inbound (country, budget) | Organic junk vs revenue | Contact | P1 | S | None | High | Form |
| 19 | Font/LCP pass | CWV | Home | P1 | M | Medium | UX | Design |
| 20 | GBP/Pune page | Only if NAP real | Local | P4 | M | Local only | Local leads | Address |

---

## 46. Biggest Opportunities

1. **Indexation arbitrage:** competitors already have unique URLs; you do not. Fixing this is the largest SEO increment available.  
2. **Honest INR packages** on a dedicated `/pricing` + cost article — rare among “we’ll quote you” agencies.  
3. **First-hand React/Vite/GSAP content** from this exact stack.  
4. **D2C storefront case studies** (Riyansh, Gravitatee) in a SERP dominated by Magento giants you should not fight.  
5. **Website care** as a simple commercial page.  
6. **Entity cluster** with two founder domains (companion doc) once the agency URLs are crawlable.

---

## 47. Biggest Risks

- Soft-404 and duplicate canonicals  
- Thin international doorways  
- Keyword cannibalization (home vs websites)  
- Weak domain vs head terms  
- JS rendering delay  
- Over-claiming metrics and “Series B”  
- Generic AI service pages for SEO/AI/mobile  
- LinkedIn “marketing agency” vs studio  
- Brand-name collisions  
- INR pricing misunderstood as US-agency delivery  
- Gmail + no NAP reducing trust  
- Cloaking-adjacent hidden `.seo-shell` if it diverges from visible UI  
- Purchased links  
- Measuring vanity ranks instead of qualified enquiries  

---

## 48. Final Recommendation

**How Divines Code becomes discoverable globally:** stop pretending to be a worldwide SEO/AI/mobile holding company. Become the indexed, honest **React website and interface studio** that already exists — then earn harder keywords.

**WHAT to build**  
Prerendered unique URLs for the six services, `/pricing`, `/contact`, `/about`, `/work/:slug`, then first-hand resources (cost, SPA SEO, CWV/GSAP).

**WHAT to remove**  
Unverified metrics; SPA 200s on imaginary paths; homepage canonical on child routes; Pune-in-every-title thinking; any plan to mass-produce country pages.

**WHAT to optimize**  
Titles/H1s for clusters in section 13; fonts/JS for CWV; LinkedIn entity; Gmail vs professional email consistency.

**WHAT to publish**  
The first 15 items in section 27, in that spirit: services and proof before a blog firehose.

**WHAT keywords to target**  
Quick: cost, custom website, React frontend, care, D2C storefront UX. Medium: web development services. Long: web development company. Never: SEO agency, AI company, iOS app company — until those are real products.

**WHICH markets**  
Worldwide English first. India for revenue. US/UK/etc. on the **same pages** until you have proof and currency. Pune last.

**WHICH pages**  
Section 44. Nothing else in Q1.

**HOW pages link**  
Section 30.

**HOW to earn authority**  
Real case studies, technical write-ups, founder syndication, client credits — not directories-as-strategy.

**HOW to improve Google visibility**  
Eligible unique documents in the first HTML response, then helpful content. That is also the [AI Overview](https://developers.google.com/search/docs/appearance/ai-features) strategy.

**HOW to measure**  
GSC non-branded clicks + form/WhatsApp qualified leads + closed revenue. Not “#1 for web development company.”

**WHAT to do first**  
Items 1–6 in the Top 20: unique meta, prerender, sitemap, real 404s, GSC, honest numbers.

This is how a small studio builds an organic channel: **foundation → services → proof → authority → then, and only then, harder international head terms.**

---

### Sources

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)  
- [Google: Dynamic rendering (not recommended)](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)  
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)  
- [Google: Succeeding in AI search (May 2025)](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)  
- [Google: Localized versions / hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)  
- [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)  
- [Google: Generative AI performance reports in GSC (June 2026)](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)  
- [Clutch US web developers](https://www.clutch.co/us/web-developers)  
- [kwrds.ai web development keywords](https://www.kwrds.ai/top-keywords/web-development) — unverified volume estimates  
- Live headers and HTML from https://divinescode.com/ on 3 September 2026  
- Repo: `src/App.tsx`, `src/components/SeoHead.tsx`, `src/data/services.ts`, `src/data/offerings.ts`, `src/data/projects.ts`, `src/components/Metrics.tsx`, `public/sitemap.xml`, `vercel.json`, `index.html`
