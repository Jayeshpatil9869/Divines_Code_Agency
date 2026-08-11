# SEO MASTER PROMPT — Divine's Code + Jayesh Patil — 100% Google Indexing & Entity Ranking Plan

> **Copy-paste this entire file into Cursor / Claude Code / Gemini / ChatGPT Code Agent as your master SEO implementation prompt.**
> Goal: Make BOTH sites 100% crawlable, indexable, rankable on Google and create a strong bi-directional entity relationship so searching "Divine's Code" surfaces Jayesh Patil and searching "Jayesh Patil" surfaces Divine's Code.

---

## 0. YOUR OBJECTIVE

**Primary Domains:**
- Agency: https://divinescode.com/  (Canonical — NOT divinescode.agency)
- Portfolio: https://jayeshbpatil.com/
- Person Entity: Jayesh Patil — MERN Stack Developer, Frontend Architect, Pune, India
- Organization Entity: Divine's Code — Premium Product Design + Frontend Engineering Studio for 0-to-1 to Series B founders

**Business Promise to Implement (Do NOT change copy without approval):**
"We design and engineer product experiences founders finish shipping — zero-to-one through Series B."

**The 100% Truth About Google (What You MUST Tell The Client):**
There is NO way to guarantee #1 ranking. Google says this explicitly. What we CAN guarantee 100% is:
1. Site is discoverable and crawlable
2. Robots.txt allows Googlebot
3. Sitemap.xml exists and is valid and submitted
4. Every important page has unique title, description, canonical, H1, indexable content
5. Structured data is valid
6. No accidental noindex/nofollow/soft 404
7. Performance meets Core Web Vitals
8. Entity relationships are unambiguous
9. Search Console is verified and monitoring

If those 9 are true, Google WILL index you. Ranking then depends on content quality, relevance, E-E-A-T, and authority.

---

## 1. HOW GOOGLE SEO WORKS IN 2026 — YOU MUST UNDERSTAND THIS

### 1.1 The 4 Stages
1. **Discovery / Crawling:** Googlebot finds URLs via sitemap, internal links, external links, Search Console submission. It must be able to fetch HTML, CSS, JS, images.
2. **Rendering:** For React 19 + Vite SPA like divinescode.com, Googlebot runs a headless Chrome to render JS. It waits, but not forever. If content is only visible after heavy GSAP/Three.js/Lenis animations, it may not be indexed. **Critical Fix: Server-side or pre-rendered HTML must contain meaningful text.**
3. **Indexing:** Google parses title, meta, canonical, headings, content, structured data, alt text, internal links. It decides: Is this page unique? Useful? Does it match a query?
4. **Ranking:** 200+ signals: relevance, content helpfulness, E-E-A-T, Page Experience (LCP, INP, CLS), mobile friendliness, internal link structure, entity authority, freshness, backlinks.

### 1.2 What Ranks in 2026
- **Helpful Content System + E-E-A-T:** Experience, Expertise, Authoritativeness, Trust. Show WHO built it.
- **Entity SEO:** Google doesn't rank keywords, it ranks ENTITIES. Jayesh Patil must be a defined Person. Divine's Code must be a defined Organization. Their relationship must be defined via sameAs, founder, creator.
- **Topical Authority:** One landing page is NOT enough. Need /work, /services, /process, /pricing, /about, /contact as real crawlable URLs — NOT just #hash anchors.
- **Core Web Vitals:** LCP <2.5s, INP <200ms, CLS <0.1 despite GSAP/Three.js.
- **No AI spam:** Don't stuff keywords. Provide real case studies, real code, real testimonials.

---

## 2. CURRENT STATE AUDIT (From Live Research)

### divinescode.com
- Built with: React 19 + Vite 6 + Tailwind v4 + GSAP 3 + ScrollTrigger + Flip + Motion + Lenis + Three.js/R3F/Drei + Radix UI
- Problem: Currently SPA with hash navigation (#work, #services, #process...). Google treats https://divinescode.com/#work as SAME as https://divinescode.com/ — NOT a separate page. You lose 90% SEO opportunity.
- Likely missing: /robots.txt, /sitemap.xml, canonical tags, unique titles per section, structured data, OG images, semantic H1-H2 hierarchy, crawlable internal links, image alt text, pre-rendered HTML
- Domain confusion: Old references to hello@divinescode.agency and divinescode.agency still in code. Must canonicalize to divinescode.com and 301 redirect .agency if it exists.

### jayeshbpatil.com
- Built with: React + GSAP portfolio, performance-optimized (per DEV.to article)
- Developer: Jayesh Patil — MERN Stack, Pune. GitHub: Jayeshpatil9869. Portfolio link widely referenced.
- Problem: Also likely SPA, single-page portfolio. Missing structured Person schema, ProfilePage schema, sameAs links to GitHub/LinkedIn/DEV.to/Divine's Code, project detail pages as real URLs.
- Opportunity: This domain should become the E-E-A-T hub for the person entity.

### Interlink Gap
- Currently weak or no bidirectional entity linking. Google does NOT yet know Jayesh Patil = Founder/Creator of Divine's Code with high confidence. Need to fix on BOTH sites + GitHub + DEV.to + LinkedIn.

---

## 3. THE ENTITY INTERLINK STRATEGY — HOW "Divine's Code" SHOWS "Jayesh Patil" AND VICE VERSA

This is the most important part of your request.

**Goal: Entity Stacking**

### 3.1 On divinescode.com — Define the Organization and Link to Person
In footer, about section, and JSON-LD:
```json
{
  "@type": "Organization",
  "@id": "https://divinescode.com/#organization",
  "name": "Divine's Code",
  "url": "https://divinescode.com/",
  "logo": "https://divinescode.com/logo.png",
  "founder": { "@id": "https://jayeshbpatil.com/#person" },
  "creator": { "@id": "https://jayeshbpatil.com/#person" },
  "sameAs": [
    "https://github.com/Jayeshpatil9869/divines_code_website",
    "https://www.linkedin.com/in/jayesh-patil01/"
  ]
}
```
Footer text must contain crawlable HTML (not canvas):
"Designed and engineered by Jayesh Patil — Founder of Divine's Code" with <a href="https://jayeshbpatil.com/"> link.

### 3.2 On jayeshbpatil.com — Define the Person and Link to Organization
```json
{
  "@type": "Person",
  "@id": "https://jayeshbpatil.com/#person",
  "name": "Jayesh Patil",
  "url": "https://jayeshbpatil.com/",
  "jobTitle": "MERN Stack Developer & Founder of Divine's Code",
  "worksFor": { "@id": "https://divinescode.com/#organization" },
  "founder": { "@id": "https://divinescode.com/#organization" },
  "sameAs": [
    "https://divinescode.com/",
    "https://github.com/Jayeshpatil9869",
    "https://dev.to/jayesh_patil",
    "https://www.linkedin.com/in/jayesh-patil01/"
  ]
}
```
Add section: "I run Divine's Code — a product design + frontend engineering studio for founders 0-to-Series B" with link to https://divinescode.com/

### 3.3 External SameAs Stack (Do this manually — coding agent cannot)
- Update GitHub bio: "Founder @ Divine's Code — https://divinescode.com/ — Portfolio https://jayeshbpatil.com/"
- Update DEV.to profile links
- Update LinkedIn experience: Add Divine's Code as company with link to divinescode.com
- Add both domains to all profiles

Result: Google Knowledge Graph merges them. Searching "Jayesh Patil" triggers Organization card for Divine's Code. Searching "Divine's Code" triggers Person card.

---

## 4. TECHNICAL IMPLEMENTATION PLAN — FOR CURSOR AGENT

### PHASE 1: Crawlability Foundation (Do First)

**For BOTH sites:**

1. **Create `/public/robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://divinescode.com/sitemap.xml
```
And for portfolio:
```
Sitemap: https://jayeshbpatil.com/sitemap.xml
```

2. **Create `/public/sitemap.xml` — STATIC, NOT JS-GENERATED**
Must contain canonical URLs only, no hash fragments.

divinescode.com sitemap example:
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://divinescode.com/</loc><priority>1.0</priority></url>
  <url><loc>https://divinescode.com/work</loc></url>
  <url><loc>https://divinescode.com/services</loc></url>
  <url><loc>https://divinescode.com/process</loc></url>
  <url><loc>https://divinescode.com/about</loc></url>
  <url><loc>https://divinescode.com/pricing</loc></url>
  <url><loc>https://divinescode.com/contact</loc></url>
  <url><loc>https://divinescode.com/work/riyansh</loc></url>
  <!-- etc -->
</urlset>
```

3. **Fix SPA Routing:**
- Install `react-router-dom`
- Convert hash anchors #work → real routes /work, #services → /services
- Keep smooth scroll for homepage anchors but also create dedicated pages that render same content with unique titles
- Use History API. Add 404.html fallback for SPA hosting (Netlify/Vercel/Cloudflare)
- IMPORTANT: Keep GSAP/ScrollTrigger animations but ensure content is in DOM on load, not injected after 2s preloader.

4. **Pre-rendering for SEO (Critical for Vite SPA):**
- Option A (Recommended): Migrate to Astro or Next.js — best SEO
- Option B (Quick win): Use `vite-plugin-prerender` or `vite-ssg` to generate static HTML for each route at build time
- Ensure view-source shows H1, p, a tags, not just <div id="root">

### PHASE 2: On-Page SEO

**For every indexable route:**

```html
<title>Divine's Code — Product Design & Frontend Engineering for 0-to-Series B</title>
<meta name="description" content="We design and engineer product experiences founders finish shipping. 0-to-1 product design, frontend architecture, design systems. Built by Jayesh Patil.">
<link rel="canonical" href="https://divinescode.com/">
<meta name="robots" content="index, follow">
<meta name="author" content="Jayesh Patil">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://divinescode.com/">
<meta property="og:title" content="Divine's Code — Product Design & Frontend Engineering">
<meta property="og:description" content="...">
<meta property="og:image" content="https://divinescode.com/og-image.jpg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">

<!-- Theme -->
<meta name="theme-color" content="#0a0a0a">
```

**Semantic HTML Fix:**
- One H1 per page: <h1>We design and engineer product experiences founders finish shipping</h1>
- Proper H2 for each section: Work, Services, Process, etc.
- All images: <img alt="Riyansh Ayurvedic Store — Case Study by Divine's Code">
- All links: crawlable <a href="/work"> not div onClick
- Add skip-to-content, aria-labels, accessible names

### PHASE 3: Structured Data (JSON-LD) — Non-Negotiable

**divinescode.com — index.html <head> or via react-helmet-async:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://divinescode.com/#organization",
      "name": "Divine's Code",
      "alternateName": "Divines Code",
      "url": "https://divinescode.com/",
      "logo": { "@type": "ImageObject", "url": "https://divinescode.com/logo.png" },
      "description": "Product design + frontend engineering studio for founders 0-to-Series B",
      "founder": { "@id": "https://jayeshbpatil.com/#person" },
      "creator": { "@id": "https://jayeshbpatil.com/#person" },
      "email": "hello@divinescode.com",
      "sameAs": [
        "https://github.com/Jayeshpatil9869/divines_code_website",
        "https://jayeshbpatil.com/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://divinescode.com/#website",
      "url": "https://divinescode.com/",
      "name": "Divine's Code",
      "publisher": { "@id": "https://divinescode.com/#organization" },
      "inLanguage": "en-US"
    }
  ]
}
</script>
```

**jayeshbpatil.com — Person + ProfilePage:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jayeshbpatil.com/#person",
      "name": "Jayesh Patil",
      "url": "https://jayeshbpatil.com/",
      "image": "https://jayeshbpatil.com/profile.jpg",
      "jobTitle": "MERN Stack Developer, Founder of Divine's Code",
      "description": "MERN Stack Developer from Pune building performant React, GSAP, and Three.js experiences. Founder of Divine's Code studio.",
      "worksFor": { "@id": "https://divinescode.com/#organization" },
      "founder": { "@id": "https://divinescode.com/#organization" },
      "sameAs": [
        "https://divinescode.com/",
        "https://github.com/Jayeshpatil9869",
        "https://dev.to/jayesh_patil",
        "https://www.linkedin.com/in/jayesh-patil01/"
      ]
    },
    {
      "@type": "ProfilePage",
      "mainEntity": { "@id": "https://jayeshbpatil.com/#person" }
    }
  ]
}
</script>
```

Validate with https://validator.schema.org/ and https://search.google.com/test/rich-results

### PHASE 4: Content & Internal Linking Architecture

**divinescode.com new real routes (all indexable):**
- / → Homepage with full overview + link to Jayesh
- /work → All case studies (Riyansh, Gravitatee, Tell Star, Outpost, Rethink, AnimeVerse) each with /work/[slug]
- /services → 0-to-1 Product Design, Frontend Architecture, Design Systems, Growth
- /process → Discovery → Architecture → Design → Build → Handover
- /pricing → Pricing tiers
- /about → Story, credits: Jayesh Patil + Mahendra Nagpure, link to jayeshbpatil.com
- /contact → Contact form + email hello@divinescode.com

**jayeshbpatil.com new real routes:**
- / → Hero + "Founder @ Divine's Code" + projects
- /projects → MERN projects, link to divinescode.com work
- /about → Detailed bio, E-E-A-T signals
- /uses → Tech stack (React 19, Vite, GSAP, etc.)

**Internal linking rule:** Every page links to at least 3 other relevant pages with descriptive anchor text. Example: "Check our frontend architecture service" not "Click here".

### PHASE 5: Performance — Keep GSAP but Pass Core Web Vitals

1. **Preloader:** Do NOT block LCP. Make preloader CSS-only, hide after load, but ensure H1 is in DOM instantly.
2. **Images:** Convert to WebP/AVIF, add width/height, lazy-load below fold, preload hero image
3. **GSAP + ScrollTrigger:** Use `will-change: transform` only when needed, use `content-visibility: auto` for offscreen sections, defer non-critical timelines until `requestIdleCallback`
4. **Three.js:** Dynamic import(), reduce canvas size on mobile, pause when offscreen, use `draco` compression
5. **Lenis:** Disable on mobile if causing INP issues, ensure `html { scroll-behavior: auto }`
6. **Fonts:** `font-display: swap`, preload critical fonts, subset fonts
7. **JS Bundle:** Code-split routes, lazy load Radix UI, analyze with `rollup-plugin-visualizer`

Target: Lighthouse Performance 90+, Accessibility 95+, SEO 100%

### PHASE 6: Search Console & Indexing Verification

**Manual steps for owner (you):**
1. Go to https://search.google.com/search-console
2. Add property: divinescode.com (Domain verification via DNS TXT)
3. Add property: jayeshbpatil.com
4. Submit sitemap.xml in each
5. Use URL Inspection → Request Indexing for homepage and top 5 pages
6. Check Coverage → Ensure no "Crawled - currently not indexed" due to thin content
7. Check Enhancements → Core Web Vitals, Mobile Usability

**For coding agent to automate:**
- Add `/.well-known/` verification file support
- Ensure no meta noindex in production
- Ensure https + www vs non-www canonicalization (choose one, redirect other)

---

## 5. OFF-PAGE & AUTHORITY PLAN

1. **GitHub:** Pin divines_code_website repo, add README with links to both domains, add topics: mern, gsap, frontend-architecture
2. **DEV.to Article:** Update your portfolio article to link to divinescode.com with anchor "Divine's Code — my product studio"
3. **LinkedIn:** Create Divine's Code company page, link to Jayesh profile
4. **Backlinks (Legit only):** Submit to: Indie Hackers, Product Hunt (if applicable), Dribbble, Behance case studies with links
5. **Local SEO:** Add Pune, India location to Organization schema, footer: "Based in Pune, India — working with founders globally"

---

## 6. FILE STRUCTURE FOR AGENT TO CREATE

```
divinescode.com/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.ico
│   ├── og-image.jpg (1200x630)
│   └── logo.png
├── src/
│   ├── seo/
│   │   ├── Seo.tsx (react-helmet-async wrapper)
│   │   ├── JsonLd.tsx
│   │   └── canonical.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Work.tsx
│   │   ├── WorkDetail.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── About.tsx
│   │   ├── Pricing.tsx
│   │   └── Contact.tsx
│   └── components/
│       └── FooterWithEntityLink.tsx
└── index.html (with pre-rendered H1 + meta)

jayeshbpatil.com/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.jpg
│   └── profile.jpg
└── src/
    ├── seo/
    └── pages/
```

---

## 7. COPY-PASTE PROMPT FOR YOUR CODING AGENT

> Use this as the first message to Cursor:

```
You are a senior Technical SEO Engineer + Frontend Architect + Google Search specialist.

PROJECT 1: https://divinescode.com/ — Divine's Code agency site — React 19 + Vite 6 + Tailwind v4 + GSAP 3 + Lenis + Three.js
PROJECT 2: https://jayeshbpatil.com/ — Jayesh Patil personal portfolio — React + GSAP

GOAL: Make both sites 100% crawlable, indexable, and entity-linked so:
- Searching "Divine's Code" surfaces jayeshbpatil.com
- Searching "Jayesh Patil" surfaces divinescode.com

DO NOT promise fake #1 ranking. Implement Google Search Central best practices.

YOUR TASKS:

1. AUDIT both repos — find all instances of divinescode.agency vs divinescode.com, hash routes #work etc, missing robots/sitemap/canonical/JSON-LD

2. FIX CRAWLABILITY:
- Create /robots.txt and /sitemap.xml for both domains (no hashes, only canonical URLs)
- Convert hash navigation to real routes using react-router-dom: /work, /services, /process, /about, /pricing, /contact, /work/[slug]
- Implement vite-plugin-prerender or vite-ssg so view-source shows H1 and content
- Ensure no accidental noindex, no CSS/JS blocking

3. ON-PAGE SEO:
- Every route gets unique <title> (50-60 chars), meta description (140-160 chars), canonical, one H1, semantic H2-H3, OG tags, Twitter cards
- Footer on divinescode.com must have crawlable HTML: "Designed and engineered by <a href='https://jayeshbpatil.com/'>Jayesh Patil</a> — Founder of Divine's Code"
- On jayeshbpatil.com add section: "Founder @ <a href='https://divinescode.com/'>Divine's Code</a>"

4. STRUCTURED DATA:
- divinescode.com: Organization with founder -> https://jayeshbpatil.com/#person
- jayeshbpatil.com: Person + ProfilePage with worksFor/founder -> https://divinescode.com/#organization
- sameAs links to GitHub, LinkedIn, DEV.to
- Validate with schema.org validator

5. PERFORMANCE:
- Keep GSAP/Lenis/Three.js but optimize LCP, INP, CLS
- WebP images, preload hero, lazy offscreen, code-split, font-display: swap

6. ENTITY STACKING:
- Update all external profiles README/bio to link both domains

7. DELIVER:
- List of changed files
- Route map with title/description/canonical/schema
- Entity map
- Search Console checklist
- Lighthouse scores before/after

CONSTRAINTS: Do not break visual design, GSAP timelines, Lenis scroll, Three.js canvas, responsive behavior. No keyword stuffing. No fake backlinks. No spam.

Start with AUDIT then PLAN then IMPLEMENT then VALIDATE.
```

---

## 8. ACCEPTANCE CHECKLIST

For both domains, verify:

- [ ] https://divinescode.com/robots.txt returns 200 and points to sitemap
- [ ] https://divinescode.com/sitemap.xml valid XML with <loc> canonical URLs only
- [ ] https://jayeshbpatil.com/robots.txt and sitemap.xml same
- [ ] view-source shows real H1, not empty #root
- [ ] No #hash in sitemap
- [ ] Each page has unique title, description, canonical
- [ ] JSON-LD Organization + Person validates
- [ ] Footer cross-links are crawlable <a> tags
- [ ] OG image 1200x630 exists and loads
- [ ] Search Console verified, sitemap submitted, URL Inspection requested
- [ ] Lighthouse SEO 100, Performance 90+, Accessibility 95+
- [ ] Searching site:divinescode.com on Google shows pages
- [ ] Searching site:jayeshbpatil.com shows pages

---

## 9. FINAL NOTE

Google's official docs (use as authority):
- https://developers.google.com/search/docs/fundamentals/how-search-works
- https://developers.google.com/search/docs/fundamentals/get-on-google
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/profile-page

The outcome you want — "Divine's Code shows Jayesh Patil and vice versa" — is NOT achieved by keywords. It is achieved by clean technical SEO + real entity definitions + consistent sameAs references + natural cross-site HTML links + verified Search Console.

Implement this and you will be 100% on Google (indexed). Rankings will grow with content and legitimate authority.
