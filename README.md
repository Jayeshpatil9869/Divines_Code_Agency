# Divine's Code Agency

**Where design and engineering argue — and both sides ship.**

This is the marketing site and studio portfolio for [Divine's Code](https://divinescode.com) — a web development agency based in India. We build custom React websites, storefronts, and web applications for businesses that need something clearer than a template and more honest than a pitch deck.

Live site: **[divinescode.com](https://divinescode.com)**

---

## What this project is

Not a generic agency template. This repo is the real front door for the studio: story, services, pricing, work, team, and a working contact path.

We care about the craft visitors feel first — scroll, motion, typography, load — and the practical stuff that comes after: packages you can understand, SEO that isn’t fluff, and a form that actually lands in someone’s inbox.

Founded by **Jayesh Patil** and **Mahendra Nagpure**, with a small roster that stays close to the work. No account managers between you and the people building the site.

---

## What we offer (on the site)

| Track | What it covers |
| --- | --- |
| **Website Development** | Starter, Modern, and Premium packages — design + build + launch |
| **Frontend Engineering** | Design-to-code, component systems, motion, performance |
| **Web Applications** | Dashboards, portals, booking flows, MVP shells |
| **E-commerce** | Brand storefronts and catalog experiences |
| **Custom Integrations** | CMS, CRM, payments, automation bridges |
| **Website Care** | Optional monthly updates and fixes (not hosting) |

Published packages start from **₹9,999+**. Domain and hosting stay with the client; care is optional after launch.

---

## Site map

| Route | Purpose |
| --- | --- |
| `/` | Full studio homepage (hero → work → services → team → pricing → contact) |
| `/services` | Services overview |
| `/services/:slug` | Deep service stories |
| `/showcase` | Selected work |
| `/pricing` | Packages and commercial model |
| `/about` | Studio story |
| `/contact` | Inquiry form |
| `/locations/pune` | Local presence page |
| `/work`, `/projects` | Redirect to `/showcase` |

---

## Stack

Built as a Vite + React SPA with an eye toward motion, SEO, and a thin API for contact mail.

**Frontend**
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- GSAP + ScrollTrigger (section choreography)
- Framer Motion / Motion
- Lenis (editorial smooth scroll)
- Three.js + React Three Fiber (selective 3D / shader moments)
- Radix UI primitives + custom UI kit under `src/components/ui`

**Backend / ops**
- Express (local) + Vercel serverless (`api/contact.ts`) for inquiries
- Nodemailer → Gmail App Password
- Vercel Analytics
- Prerender + SEO validation scripts in the production build

---

## Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm (lockfile included; `pnpm` / `bun` also present if you prefer)

### Install

```bash
npm install
```

### Environment

Copy the example env and fill in what you need:

```bash
cp .env.example .env
```

| Variable | Used for |
| --- | --- |
| `GMAIL_USER` | Gmail address that sends inquiry mail |
| `GMAIL_APP_PASSWORD` | Google App Password (not your normal login password) |
| `CONTACT_TO` | Inbox that receives inquiries (defaults to studio mail) |
| `PORT` | Local API port (default `3001`) |
| `GEMINI_API_KEY` | Optional — only if you use Gemini-backed features |
| `APP_URL` | Public app URL when needed for absolute links |

> Create a Gmail App Password under Google Account → Security → 2-Step Verification → App passwords. A normal Gmail password will not work with Nodemailer.

### Run locally

Frontend only:

```bash
npm run dev
```

Opens on **http://localhost:3000**.

Frontend + contact API together:

```bash
npm run dev:all
```

API health check: `GET http://localhost:3001/api/health`

### Build & quality

```bash
npm run build      # Vite build + prerender routes + SEO validation
npm run seo        # SEO checks only
npm run lint       # TypeScript — no emit
npm run preview    # Preview the production build
```

---

## Project structure

```text
├── api/                 # Vercel serverless (contact)
├── server/              # Local Express mirror of contact API
├── scripts/             # Prerender + SEO validation
├── public/              # Static assets, robots, sitemap, favicons
├── src/
│   ├── animations/      # GSAP section systems
│   ├── components/      # UI, layout, service experience, showcase
│   ├── data/            # Services, offerings, team, SEO, projects
│   ├── hooks/           # Lenis, mobile, toast
│   ├── pages/           # Route-level screens
│   ├── App.tsx          # Routes + intro reveal
│   └── main.tsx
├── docs/seo/            # SEO strategy notes
└── vercel.json          # Hosting routes & redirects
```

Content for services, pricing, team, and SEO lives in `src/data/` so copy stays in one place instead of scattered across JSX.

---

## Contact form

Inquiries POST to `/api/contact` with name, email, message, and optional project fields.

- **Local:** Express in `server/index.ts` (via `npm run server` or `npm run dev:all`)
- **Production:** Vercel function in `api/contact.ts`

Without `GMAIL_USER` and `GMAIL_APP_PASSWORD`, the endpoint returns an error — by design, so misconfigured deploys fail loudly instead of silently dropping leads.

---

## Team

| Name | Role |
| --- | --- |
| Mahendra Nagpure | Full Stack (Backend) |
| Apurv Ahire | Full Stack |
| Jayesh Patil | Full Stack (Frontend UI/UX) |
| Sanket Gangurde | Influencer / outreach |
| Sumedhraj Tribhuvan | Business Development & Strategy |

---

## Deploy

Configured for **Vercel** (`vercel.json`: clean URLs, redirects, filesystem + SPA 404).

1. Connect the repo to a Vercel project  
2. Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `CONTACT_TO` in Project → Settings → Environment Variables  
3. Redeploy  

Production domain: [https://divinescode.com](https://divinescode.com)

---

## A note on tone

This codebase is meant to feel like the studio: direct, a little opinionated, and careful with details. If you fork it for learning or reference, keep the motion intentional — don’t pile on effects. The homepage intro (“Think. Create. Differently.”) is a one-shot per session for a reason.

Questions or project briefs: **divinescode@gmail.com** · WhatsApp via the site · [LinkedIn](https://www.linkedin.com/company/divines-code/)

---

<p align="center">
  Built with care by the Divine's Code team · India
</p>
