import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import { KEYWORD_MAP } from "./seo/keyword-map.ts";
import { AI_QUERIES } from "./seo/ai-queries.ts";

const distDir = path.resolve(process.cwd(), "dist");
const failures: string[] = [];

function fail(message: string): void {
  failures.push(message);
}

function canonicalFor(siteUrl: string, pagePath: string): string {
  if (pagePath === "/") return `${siteUrl}/`;
  return `${siteUrl}${pagePath}`;
}

function outputFileFor(pagePath: string): string {
  if (pagePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, pagePath.replace(/^\//, ""), "index.html");
}

async function main(): Promise<void> {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });

  try {
    const seoMod = await vite.ssrLoadModule("/src/data/seo.ts");
    const pagesMod = await vite.ssrLoadModule("/src/data/seo-pages.ts");
    const servicesMod = await vite.ssrLoadModule("/src/data/services.ts");
    const puneMod = await vite.ssrLoadModule("/src/data/pune.ts");

    const { SITE_URL, HOME_H1 } = seoMod as { SITE_URL: string; HOME_H1: string };
    const { PAGE_SEO_LIST, NOT_FOUND_SEO } = pagesMod as {
      PAGE_SEO_LIST: {
        path: string;
        title: string;
        description: string;
        h1: string;
        intro: string;
        robots: string;
        primaryTopic: string;
      }[];
      NOT_FOUND_SEO: { robots: string; path: string };
    };
    const { serviceFaqsBySlug, serviceFaqs } = servicesMod as {
      serviceFaqsBySlug: Record<string, { q: string; a: string }[]>;
      serviceFaqs: { q: string }[];
    };
    const { puneFaqs, PUNE_H1, PUNE_PATH } = puneMod as {
      puneFaqs: { q: string; a: string }[];
      PUNE_H1: string;
      PUNE_PATH: string;
    };

    const indexable = PAGE_SEO_LIST.filter((page) => page.robots === "index,follow");
    const paths = new Set(indexable.map((page) => page.path));

    const unique = (label: string, values: string[]) => {
      const seen = new Map<string, number>();
      for (const value of values) {
        const key = value.trim().toLowerCase();
        seen.set(key, (seen.get(key) ?? 0) + 1);
      }
      for (const [key, count] of seen) {
        if (!key) fail(`${label} is empty`);
        if (count > 1) fail(`Duplicate ${label}: ${key}`);
      }
    };

    unique("title", indexable.map((page) => page.title));
    unique("description", indexable.map((page) => page.description));
    unique("h1", indexable.map((page) => page.h1));
    unique("primary topic", indexable.map((page) => page.primaryTopic));

    for (const page of indexable) {
      if (!page.title.trim() || !page.description.trim() || !page.h1.trim()) {
        fail(`Missing metadata on ${page.path}`);
      }
      const canonical = canonicalFor(SITE_URL, page.path);
      if (!canonical.startsWith("https://divinescode.com")) {
        fail(`Canonical is not absolute for ${page.path}`);
      }
      if (page.path !== "/" && canonical.endsWith("/")) {
        fail(`Canonical has a trailing slash: ${canonical}`);
      }
      if (page.robots !== "index,follow") {
        fail(`${page.path} is indexable list but robots is ${page.robots}`);
      }
    }

    if (NOT_FOUND_SEO.robots !== "noindex,follow") {
      fail("404 must be noindex,follow");
    }
    if (paths.has("/404") || paths.has("/work") || paths.has("/projects")) {
      fail("Sitemap set includes a non-canonical or noindex path");
    }
    if (!paths.has(PUNE_PATH) || !paths.has("/showcase") || !paths.has("/")) {
      fail("Required indexable paths are missing");
    }
    if (indexable.some((page) => page.path === "/" && page.h1 !== HOME_H1)) {
      fail("Homepage H1 does not match the visible hero lockup");
    }
    if (indexable.some((page) => page.path === PUNE_PATH && page.h1 !== PUNE_H1)) {
      fail("Pune H1 drifted from the page constant");
    }

    const primaries = KEYWORD_MAP.filter((row) => row.role === "primary");
    const primaryTargets = primaries.map((row) => row.target ?? "");
    unique("primary keyword target", primaryTargets);
    for (const row of primaries) {
      if (!row.target || !paths.has(row.target)) {
        fail(`Primary keyword has no indexable target: ${row.keyword}`);
      }
    }

    for (const row of KEYWORD_MAP) {
      if (row.role === "not-targeted" && row.target !== null) {
        fail(`Not-targeted keyword has a URL: ${row.keyword}`);
      }
      if (row.role !== "not-targeted" && row.target && !paths.has(row.target)) {
        fail(`Keyword target is not an indexable page: ${row.keyword} -> ${row.target}`);
      }
    }

    const questionSets = Object.entries(serviceFaqsBySlug);
    const allServiceQuestions = new Set<string>();
    for (const [slug, faqs] of questionSets) {
      if (faqs.length < 3) fail(`Service ${slug} needs its own FAQs`);
      for (const faq of faqs) {
        const key = faq.q.trim().toLowerCase();
        if (allServiceQuestions.has(key)) fail(`Duplicate service FAQ: ${faq.q}`);
        allServiceQuestions.add(key);
        if (!faq.a.trim()) fail(`Empty FAQ answer: ${faq.q}`);
      }
    }

    for (const faq of puneFaqs) {
      if (allServiceQuestions.has(faq.q.trim().toLowerCase())) {
        fail(`Pune FAQ repeats a service question: ${faq.q}`);
      }
      if (serviceFaqs.some((item) => item.q.trim().toLowerCase() === faq.q.trim().toLowerCase())) {
        fail(`Pune FAQ repeats the services index: ${faq.q}`);
      }
    }

    if (!fs.existsSync(path.join(distDir, "sitemap.xml"))) {
      fail("dist/sitemap.xml is missing. Run the production build before this check.");
    } else {
      const sitemap = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8");
      for (const page of indexable) {
        const loc = canonicalFor(SITE_URL, page.path);
        if (!sitemap.includes(`<loc>${loc}</loc>`)) {
          fail(`Sitemap missing ${loc}`);
        }
      }
      if (sitemap.includes("/work<") || sitemap.includes("/projects<") || sitemap.includes("/404<")) {
        fail("Sitemap includes a redirected or noindex URL");
      }

      for (const page of indexable) {
        const file = outputFileFor(page.path);
        if (!fs.existsSync(file)) {
          fail(`Missing prerendered HTML for ${page.path}`);
          continue;
        }
        const html = fs.readFileSync(file, "utf8");
        if (!html.includes(`<title>${escapeForHtml(page.title)}</title>`) && !html.includes(`<title>${page.title}</title>`)) {
          fail(`Title mismatch in ${file}`);
        }
        if (!html.includes(`rel="canonical" href="${canonicalFor(SITE_URL, page.path)}"`)) {
          fail(`Canonical mismatch in ${file}`);
        }
        if (!html.includes(`<h1>${escapeForHtml(page.h1)}</h1>`) && !html.includes(`<h1>${page.h1}</h1>`)) {
          fail(`Shell H1 mismatch in ${file}`);
        }
        if (!html.includes("application/ld+json")) {
          fail(`JSON-LD missing in ${file}`);
        }
        const h1Count = html.match(/<h1[\s>]/g)?.length ?? 0;
        if (h1Count !== 1) fail(`${page.path} prerender HTML has ${h1Count} H1 tags`);
      }
    }

    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    const robots = fs.readFileSync(robotsPath, "utf8");
    if (!robots.includes("Sitemap: https://divinescode.com/sitemap.xml")) {
      fail("robots.txt is missing the sitemap URL");
    }
    if (/Disallow:\s*\/\s*$/m.test(robots)) {
      fail("robots.txt blocks the whole site");
    }
    const wildcard = agentBlock(robots, "*");
    if (!wildcard || !/Allow:\s*\//.test(wildcard)) {
      fail("robots.txt no longer allows all crawlers by default");
    }
    for (const agent of ["OAI-SearchBot", "Googlebot", "Bingbot"]) {
      const block = agentBlock(robots, agent);
      if (!block || !/Allow:\s*\//.test(block) || /Disallow:\s*\//.test(block)) {
        fail(`robots.txt does not allow ${agent} at /`);
      }
    }
    if (agentBlock(robots, "GPTBot")) {
      fail("robots.txt changed the GPTBot policy; leave GPTBot unset");
    }
    const distRobots = path.join(distDir, "robots.txt");
    if (fs.existsSync(distRobots) && fs.readFileSync(distRobots, "utf8") !== robots) {
      fail("dist/robots.txt does not match public/robots.txt");
    }

    if (sitemapIncludesVerification(fs.existsSync(path.join(distDir, "sitemap.xml"))
      ? fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8")
      : "")) {
      fail("Sitemap includes the Search Console verification file");
    }

    for (const query of AI_QUERIES) {
      if (!paths.has(query.target)) {
        fail(`AI query target is not indexable: ${query.query} -> ${query.target}`);
      }
    }
    const observationsPath = path.join(process.cwd(), "scripts", "seo", "ai-observations.json");
    const observations = JSON.parse(fs.readFileSync(observationsPath, "utf8")) as unknown;
    if (!Array.isArray(observations)) {
      fail("ai-observations.json must be an array");
    } else if (observations.length === 0) {
      console.log("AI visibility: No observations yet");
    }
  } finally {
    await vite.close();
  }

  if (failures.length > 0) {
    console.error(failures.map((item) => `- ${item}`).join("\n"));
    process.exit(1);
  }
  console.log(`SEO validation passed for ${KEYWORD_MAP.length} mapped keywords.`);
}

function agentBlock(robots: string, agent: string): string | null {
  const escaped = agent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = robots.match(
    new RegExp(
      `(?:^|\\n)User-agent:\\s*${escaped}\\s*\\n([\\s\\S]*?)(?=\\nUser-agent:|$)`,
      "i",
    ),
  );
  return match ? match[1] : null;
}

function sitemapIncludesVerification(sitemap: string): boolean {
  return sitemap.includes("googlee602dec2ce2f2354");
}

function escapeForHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
