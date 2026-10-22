# SEO MASTER PROMPT — Divine's Code + Jayesh Patil + Mahendra Nagpure — 100% Indexing & 3-Way Entity Ranking Plan

> **COPY-PASTE THIS ENTIRE FILE INTO Cursor / Claude Code / Gemini / ChatGPT Code Agent.**
> Goal: Make ALL 3 sites 100% crawlable, indexable, and create a strong entity cluster so:
> - Searching "Divine's Code" surfaces jayeshbpatil.com and mahendranagpure.com
> - Searching "Jayesh Patil" surfaces divinescode.com
> - Searching "Mahendra Nagpure" surfaces divinescode.com
> - All three rank for "Divine's Code founders / team"

---

## 0. PRIMARY DOMAINS & ENTITIES

**Canonical Domains (FINAL):**
- Agency (Organization): https://divinescode.com/ — PRIMARY, all .agency references must 301 redirect here
- Founder 1 Portfolio (Person): https://jayeshbpatil.com/ — MERN Stack Developer, Frontend Architect, Pune
- Founder 2 Portfolio (Person): https://mahendranagpure.com/ — Full Stack Developer, Malegaon/Nashik, Builder of Riyanshamrit.com

**Entity Definitions:**
- **Person 1:** Jayesh Patil — GitHub: Jayeshpatil9869 — LinkedIn: /in/jayesh-patil01/ — DEV.to: jayesh_patil — Email from code: hello@divinescode.com
- **Person 2:** Mahendra Vinod Nagpure — Full Stack Dev, React, Next.js, Node, Express, Supabase, MongoDB — Email: work@mahendranagpure.com — GitHub: mahendra111111 — Built Riyanshamrit.com Production E-Commerce
- **Organization:** Divine's Code — Premium Product Design + Frontend Engineering Studio — Promise: "We design and engineer product experiences founders finish shipping — zero-to-one through Series B."
- **Relationships:** Jayesh Patil is Founder/Creator of Divine's Code. Mahendra Nagpure is Co-Creator / Full Stack Developer at Divine's Code. Both portfolios are proof of E-E-A-T.

**Critical Truth About Google:**
There is NO 100% guarantee of #1 ranking. Google docs state ranking is programmatic. What we CAN guarantee 100% is indexability:
1. robots.txt allows Googlebot
2. sitemap.xml exists, valid, submitted in Search Console
3. Canonical URLs are correct
4. Every indexable page has unique title, description, H1, content, internal links
5. No accidental noindex, blocked JS/CSS, soft 404
6. Structured data is valid JSON-LD
7. Core Web Vitals pass
8. Entity relationships are explicit
9. Search Console verified and monitored

If those 9 are true, Google WILL crawl and index. Ranking then depends on content helpfulness, E-E-A-T, and authority.

---

## 1. HOW GOOGLE SEO WORKS IN 2026 — CORE KNOWLEDGE

### 1.1 The Pipeline
1.  **Discovery:** Google finds URLs via sitemap.xml, internal links (<a href>), external links, Search Console submission, Chrome data.
2.  **Crawling:** Googlebot must be able to GET HTML, CSS, JS, images, fonts. If robots.txt blocks /assets/ or /src/, rendering fails.
3.  **Rendering (JS SEO):** Google runs Chrome headless. For React 19 + Vite 6 + GSAP + Lenis + Three.js sites like yours, if text only appears AFTER animation, Google may not see it. **Fix: Pre-render or SSR the HTML shell so H1, H2, paragraphs, links are in initial HTML.**
4.  **Indexing:** Google extracts title, meta description, canonical, headings H1-H6, body copy, alt text, internal link graph, structured data. It decides: Is this page unique, helpful, and for which queries?
5.  **Ranking:** 200+ signals: Relevance, Helpful Content, E-E-A-T, Page Experience (LCP <2.5s, INP <200ms, CLS <0.1), mobile usability, HTTPS, internal linking depth, entity authority, topical coverage, backlinks.

### 1.2 2026 Ranking Factors That Matter For You
- **Entity SEO > Keywords:** Google ranks entities. Define Jayesh Patil as Person, Mahendra Nagpure as Person, Divine's Code as Organization with founder/member properties.
- **E-E-A-T:** Show real work. Link GitHub commits, DEV.to article "How I Built My Developer Portfolio with React, GSAP, and Performance in Mind", case studies: Riyansh, Gravitatee, Tell Star, Outpost, Rethink, AnimeVerse, Riyanshamrit.com
- **SPA Warning:** Do NOT use #work, #services, #process as SEO pages. Google treats https://divinescode.com/#work == https://divinescode.com/ — same page. You need REAL URLs: /work, /services, /process, /pricing, /about, /contact
- **Helpful Content:** Each route needs >300 words of unique, useful text, not just animation.
- **Core Web Vitals with GSAP/Lenis/Three.js:** Lazy-load WebGL, respect prefers-reduced-motion, avoid layout shifts.

---

## 2. AUDIT OF CURRENT STATE (From Live Search)

### divinescode.com
- Stack: React 19 + TypeScript + Vite 6 + Tailwind v4 + GSAP 3 + ScrollTrigger + Flip + Motion + Lenis + Three.js/R3F/Drei + Radix UI
- Issue: Likely SPA with hash nav. Missing robots.txt, sitemap.xml, canonicals, unique titles, structured data, OG images, semantic headings
- Domain confusion: Old refs to divinescode.agency and hello@divinescode.agency in code. Must canonicalize to divinescode.com

### jayeshbpatil.com
- MERN Stack Developer, Pune. GitHub Jayeshpatil9869. Portfolio referenced on DEV.to, GitHub profile jayeshpatil9869/jayeshpatil9869
- Freelance Web Developer — Divines Code (2025-2026) — 5+ production MERN apps
- Missing: Person + ProfilePage schema, project detail routes, sameAs to divinescode.com

### mahendranagpure.com
- Full Stack Developer, Based Malegaon, Nashik. Stack: React, Next.js, Node, Express, Supabase, MongoDB
- Production work: Riyanshamrit.com (E-Commerce Platform), SaaS platforms, admin dashboards, auth flows
- Email: work@mahendranagpure.com
- Portfolio article: "Building My Developer Portfolio: A Journey from Passion to Production" on DEV.to
- Missing: Person schema linking to Divine's Code, team page cross-link

### Interlink Gap
Google does not yet strongly associate all three. Need bidirectional linking on all 3 domains + GitHub + DEV.to + LinkedIn.

---

## 3. THE 3-WAY ENTITY CLUSTER — HOW TO MAKE SEARCHES INTERLINK

### 3.1 On divinescode.com — Define Organization with founders

**Footer must have crawlable HTML (not canvas):**
```html
<footer>
  <p>Crafted by <a href="https://jayeshbpatil.com/">Jayesh Patil</a> and <a href="https://mahendranagpure.com/">Mahendra Nagpure</a> — Founders of Divine's Code</p>
  <p><a href="https://divinescode.com/about#team">Meet the team</a></p>
</footer>
```

**JSON-LD for Organization (place in <head> or via react-helmet):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://divinescode.com/#organization",
  "name": "Divine's Code",
  "alternateName": "Divines Code",
  "url": "https://divinescode.com/",
  "logo": "https://divinescode.com/logo.png",
  "description": "We design and engineer product experiences founders finish shipping — zero-to-one through Series B.",
  "founder": [
    { "@id": "https://jayeshbpatil.com/#person" },
    { "@id": "https://mahendranagpure.com/#person" }
  ],
  "member": [
    { "@id": "https://jayeshbpatil.com/#person" },
    { "@id": "https://mahendranagpure.com/#person" }
  ],
  "email": "hello@divinescode.com",
  "sameAs": [
    "https://github.com/Jayeshpatil9869/divines_code_website",
    "https://www.linkedin.com/company/divines-code/"
  ]
}
```

**WebSite schema + SearchAction:**
```json
{
  "@type": "WebSite",
  "@id": "https://divinescode.com/#website",
  "url": "https://divinescode.com/",
  "name": "Divine's Code",
  "publisher": { "@id": "https://divinescode.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://divinescode.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 3.2 On jayeshbpatil.com — Person linking to Organization

**About section text:**
"I run Divine's Code — a premium product design + frontend engineering studio for founders 0-to-Series B — with co-creator Mahendra Nagpure. We ship MERN apps, e-commerce platforms, SaaS tools."

**JSON-LD Person:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://jayeshbpatil.com/#person",
  "name": "Jayesh Patil",
  "url": "https://jayeshbpatil.com/",
  "jobTitle": "MERN Stack Developer & Founder at Divine's Code",
  "worksFor": { "@id": "https://divinescode.com/#organization" },
  "founder": { "@id": "https://divinescode.com/#organization" },
  "colleague": { "@id": "https://mahendranagpure.com/#person" },
  "sameAs": [
    "https://divinescode.com/",
    "https://mahendranagpure.com/",
    "https://github.com/Jayeshpatil9869",
    "https://dev.to/jayesh_patil",
    "https://www.linkedin.com/in/jayesh-patil01/",
    "https://github.com/Jayeshpatil9869/divines_code_website"
  ]
}
```

**ProfilePage schema:**
```json
{
  "@type": "ProfilePage",
  "mainEntity": { "@id": "https://jayeshbpatil.com/#person" }
}
```

### 3.3 On mahendranagpure.com — Person linking to Organization

**About text:**
"I build production MERN apps at Divine's Code — founded with Jayesh Patil. Recent work: Riyanshamrit.com e-commerce platform."

**JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mahendranagpure.com/#person",
  "name": "Mahendra Nagpure",
  "alternateName": "Mahendra Vinod Nagpure",
  "url": "https://mahendranagpure.com/",
  "jobTitle": "Full Stack Developer & Co-Creator at Divine's Code",
  "worksFor": { "@id": "https://divinescode.com/#organization" },
  "colleague": { "@id": "https://jayeshbpatil.com/#person" },
  "sameAs": [
    "https://divinescode.com/",
    "https://jayeshbpatil.com/",
    "https://github.com/mahendra111111",
    "https://www.linkedin.com/in/mahendra-nagpure/",
    "https://mahendranagpure.com/"
  ]
}
```

### 3.4 External Entity Stack (Manual — Human Must Do)
- GitHub: Update bio on Jayeshpatil9869 and mahendra111111: "Co-Founder @ Divine's Code — https://divinescode.com/"
- DEV.to: Update both profiles with links to divinescode.com + each other's portfolios
- LinkedIn: Add Divine's Code as company experience with URL https://divinescode.com/ for both
- Add all three domains to each LinkedIn website field
- Ensure consistent NAP: Name spelling, location Pune/Malegaon Nashik

This creates a Knowledge Graph triangle: Organization ↔ Person ↔ Person

---

## 4. TECHNICAL SEO IMPLEMENTATION — FOR CURSOR AI AGENT

### PHASE 1: Foundation — robots.txt + sitemap.xml + canonical

**For EACH domain create public/robots.txt:**

divinescode.com:
```
User-agent: *
Allow: /

Sitemap: https://divinescode.com/sitemap.xml
```

jayeshbpatil.com:
```
User-agent: *
Allow: /
Sitemap: https://jayeshbpatil.com/sitemap.xml
```

mahendranagpure.com:
```
User-agent: *
Allow: /
Sitemap: https://mahendranagpure.com/sitemap.xml
```

**Create sitemap.xml (static file in /public):**

divinescode.com sitemap:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://divinescode.com/</loc><lastmod>2026-05-13</lastmod><priority>1.0</priority></url>
  <url><loc>https://divinescode.com/work</loc></url>
  <url><loc>https://divinescode.com/services</loc></url>
  <url><loc>https://divinescode.com/process</loc></url>
  <url><loc>https://divinescode.com/about</loc></url>
  <url><loc>https://divinescode.com/pricing</loc></url>
  <url><loc>https://divinescode.com/contact</loc></url>
  <url><loc>https://divinescode.com/faq</loc></url>
  <url><loc>https://divinescode.com/work/riyansh</loc></url>
  <url><loc>https://divinescode.com/work/gravitatee</loc></url>
  <url><loc>https://divinescode.com/work/riyanshamrit</loc></url>
</urlset>
```

Similarly for portfolio sites: /, /work, /projects, /about, /contact, /blog

**Canonical + Meta in React:**

Install react-helmet-async, create SEO component:
```tsx
<SEO
  title="Divine's Code — Product Design + Frontend Engineering for 0-to-Series B Founders"
  description="We design and engineer product experiences founders finish shipping. MERN stack, GSAP, Three.js, performance-obsessed. Founded by Jayesh Patil & Mahendra Nagpure."
  canonical="https://divinescode.com/"
  ogImage="https://divinescode.com/og/home.png"
  jsonLd={[...schemas]}
/>
```

Each route must have UNIQUE title + description + H1:
- Home: "Divine's Code — Product Design + Frontend Engineering Studio"
- Work: "Selected Work — Divine's Code — MERN E-commerce, SaaS, Dashboards"
- About: "About Divine's Code — Founded by Jayesh Patil & Mahendra Nagpure, Pune/Nashik"
- etc.

### PHASE 2: Fix SPA SEO — From Hash to Real Routes

Current: /#work, /#services — BAD

Required:
- Use React Router v6+ with BrowserRouter
- Keep hash scroll as progressive enhancement, but also create real routes: /work, /services, /process
- Each route renders same section but with unique SEO component
- Implement pre-rendering: Use vite-plugin-prerender or vite-plugin-ssg or Next.js if migrating
- At minimum: vite-plugin-prerender to generate index.html for each route with H1 + text already in HTML before JS
- Ensure <a href="/work"> is crawlable <a> not div onClick

### PHASE 3: Performance — Core Web Vitals

- Lenis: disable on mobile or respect prefers-reduced-motion
- GSAP: use will-change sparingly, avoid animating large images
- Three.js: dynamic import() with <Suspense>, load only on desktop, reduce canvas size
- Images: use <img loading="lazy" decoding="async" width height> + WebP/AVIF
- Fonts: preload, font-display: swap
- Target: LCP <2.5s, INP <200ms, CLS <0.1

### PHASE 4: On-Page SEO Checklist Per Page

For EVERY indexable URL:
- [ ] One H1, contains primary keyword naturally
- [ ] H2-H3 hierarchy semantic
- [ ] Title 50-60 chars, unique
- [ ] Meta description 120-160 chars, unique, compelling
- [ ] Canonical absolute URL https://
- [ ] Open Graph: og:title, og:description, og:image (1200x630), og:url, og:type
- [ ] Twitter Card: summary_large_image
- [ ] Alt text for all images
- [ ] Internal links to other relevant pages
- [ ] JSON-LD valid, tested via Rich Results Test
- [ ] No noindex
- [ ] Mobile responsive

### PHASE 5: Content That Ranks

**divinescode.com needs:**
- /work/[slug] case studies: Problem, Solution, Stack (React, GSAP, MERN), Outcome, link to live site, founder credit: Built by Jayesh Patil & Mahendra Nagpure
- /services pages: 0-to-1 Product Design, Frontend Architecture, Design Systems, Growth
- /blog or /insights: Write 3 pillar articles: "How we built performance-optimized GSAP portfolio that still passes Core Web Vitals", "MERN e-commerce architecture for Riyanshamrit", "From Figma to Three.js: shipping agency-grade sites in Vite"

**jayeshbpatil.com needs:**
- /projects with detail pages
- /about with founder story linking to divinescode.com
- Add /uses or /stack page

**mahendranagpure.com needs:**
- /projects/riyanshamrit detailed case study linking to divinescode.com
- /about linking to Jayesh

---

## 5. IMPLEMENTATION COMMANDS FOR AGENT

1. Audit repo: find all old divinescode.agency strings, replace with divinescode.com
2. Install: npm i react-helmet-async react-router-dom
3. Create src/components/SEO.tsx
4. Create public/robots.txt + public/sitemap.xml for each repo
5. Setup BrowserRouter with routes: /, /work, /services, /process, /about, /pricing, /faq, /contact, /work/:slug
6. Keep home as SPA but each route must also render SEO + H1 + text in initial HTML
7. Add pre-render: vite-plugin-prerender or vite-ssg
8. Add JSON-LD: Organization on divinescode.com, Person + ProfilePage on portfolios, link via @id
9. Add footer cross-links as <a> tags
10. Test: npm run build, check dist/sitemap.xml exists, dist/robots.txt exists, dist/index.html contains <title> and <h1> text, JSON-LD valid
11. Lighthouse CI: 90+ performance, 100 SEO

---

## 6. SEARCH CONSOLE VERIFICATION (Human Steps)

After deploy:
1. Go to Google Search Console, add property: https://divinescode.com/, https://jayeshbpatil.com/, https://mahendranagpure.com/
2. Verify via DNS TXT or HTML file
3. Submit sitemap.xml for each
4. Use URL Inspection to test homepage + 2 internal pages
5. Check Coverage: Must show Indexed, not Crawled - not indexed
6. Check Enhancements: Rich Results must be valid
7. Setup GA4 + Search Console link

---

## 7. OFF-PAGE AUTHORITY

- Update GitHub READMEs with links to all 3 domains
- Publish DEV.to article: "We built Divine's Code as a performance-obsessed studio" — link all 3
- LinkedIn Company Page: Create Divine's Code company page, add founders
- Backlinks: Product Hunt, Peerlist, Contra, Behance case studies linking back

---

## 8. ACCEPTANCE CRITERIA — DO NOT SAY DONE UNTIL THIS PASSES

**divinescode.com:**
- https://divinescode.com/robots.txt returns Allow + Sitemap
- https://divinescode.com/sitemap.xml returns valid XML with 8+ URLs, no hash
- View Source shows <title>, <meta name="description">, <link rel="canonical">, <h1>
- JSON-LD Organization + WebSite valid on Rich Results Test
- Footer has crawlable links to jayeshbpatil.com and mahendranagpure.com
- Lighthouse SEO 100

**jayeshbpatil.com:**
- Same checks + Person schema + link to divinescode.com + mahendranagpure.com

**mahendranagpure.com:**
- Same checks + Person schema + link to divinescode.com + jayeshbpatil.com

**Cross-check:**
- Search "site:divinescode.com" on Google after 48h shows pages
- Search "Jayesh Patil Divine's Code" shows both
- Search "Mahendra Nagpure Divine's Code" shows both

---

## 9. FINAL DELIVERABLE FROM CODING AGENT

After implementation produce:
A. Audit report: current state, problems, changes, risks
B. File list: every changed file
C. Route map: URL, Title, Description, Canonical, Schema, Indexable?
D. Entity map: Entity, Canonical URL, sameAs, relationship
E. Search Console checklist
F. Manual actions remaining for human

---

## 10. MOST IMPORTANT RULE

Goal is NOT keyword stuffing.

Goal is: "Make Google understand exactly what Divine's Code is, who Jayesh Patil and Mahendra Nagpure are, how they are related, what each page is about, and why content deserves to be shown."

Build real IA, real content, real entities, real links, technically accessible.

---

## REFERENCES (Use as authority)
- https://developers.google.com/search/docs/fundamentals/how-search-works
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/crawling-indexing/canonicalization

---

**Act as Senior Technical SEO + Entity SEO + Frontend Architect. First AUDIT, then PLAN, then IMPLEMENT, then VALIDATE. Do NOT break GSAP/Lenis/Three.js visuals. Do NOT promise #1 ranking.**
