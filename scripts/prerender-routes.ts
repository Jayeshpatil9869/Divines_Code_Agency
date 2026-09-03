import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import type { PageSeo } from "../src/data/seo-pages.ts";

const distDir = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDir, "index.html");

async function main(): Promise<void> {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing ${templatePath}. Run vite build first.`);
  }

  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });

  try {
    const seoMod = await vite.ssrLoadModule("/src/data/seo.ts");
    const pagesMod = await vite.ssrLoadModule("/src/data/seo-pages.ts");
    const schemaMod = await vite.ssrLoadModule("/src/data/schema.ts");

    const { OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL } = seoMod as {
      OG_IMAGE: string;
      OG_IMAGE_HEIGHT: string;
      OG_IMAGE_WIDTH: string;
      SITE_URL: string;
    };
    const { PAGE_SEO_LIST, NOT_FOUND_SEO } = pagesMod as {
      PAGE_SEO_LIST: PageSeo[];
      NOT_FOUND_SEO: PageSeo;
    };
    const { buildJsonLdForPath, crawlNavHtml, escapeHtml } = schemaMod as {
      buildJsonLdForPath: (pathname: string) => unknown;
      crawlNavHtml: () => string;
      escapeHtml: (value: string) => string;
    };

    const template = fs.readFileSync(templatePath, "utf8");

    const canonicalFor = (pagePath: string): string => {
      if (pagePath === "/") return `${SITE_URL}/`;
      return `${SITE_URL}${pagePath}`;
    };

    const replaceTag = (
      html: string,
      pattern: RegExp,
      replacement: string,
    ): string => {
      if (pattern.test(html)) return html.replace(pattern, replacement);
      return html.replace("</head>", `    ${replacement}\n  </head>`);
    };

    const applySeo = (html: string, seo: PageSeo): string => {
      const canonical = canonicalFor(seo.path);
      const jsonLd = JSON.stringify(buildJsonLdForPath(seo.path)).replaceAll(
        "<",
        "\\u003c",
      );
      const shell = [
        `<h1>${escapeHtml(seo.h1)}</h1>`,
        `<p>${escapeHtml(seo.intro)}</p>`,
        `<p>Crafted by <a href="https://jayeshbpatil.com/">Jayesh Patil</a> and <a href="https://mahendranagpure.com/">Mahendra Nagpure</a> — Founders of Divine's Code.</p>`,
        crawlNavHtml(),
      ].join("\n        ");

      let next = html;
      next = replaceTag(
        next,
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(seo.title)}</title>`,
      );
      next = replaceTag(
        next,
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`,
      );
      next = replaceTag(
        next,
        /<meta name="robots" content="[^"]*"\s*\/?>/,
        `<meta name="robots" content="${seo.robots}" />`,
      );
      next = replaceTag(
        next,
        /<link rel="canonical" href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${canonical}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:title" content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:description" content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:url" content="[^"]*"\s*\/?>/,
        `<meta property="og:url" content="${canonical}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:image" content="[^"]*"\s*\/?>/,
        `<meta property="og:image" content="${OG_IMAGE}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:image:width" content="[^"]*"\s*\/?>/,
        `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
      );
      next = replaceTag(
        next,
        /<meta property="og:image:height" content="[^"]*"\s*\/?>/,
        `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
      );
      next = replaceTag(
        next,
        /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
      );
      next = replaceTag(
        next,
        /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
      );
      next = replaceTag(
        next,
        /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
        `<meta name="twitter:image" content="${OG_IMAGE}" />`,
      );
      next = next.replace(
        /<script(?: id="seo-json-ld")? type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script id="seo-json-ld" type="application/ld+json">${jsonLd}</script>`,
      );
      next = next.replace(
        /<div class="seo-shell">[\s\S]*?<\/div>/,
        `<div class="seo-shell">\n        ${shell}\n      </div>`,
      );
      return next;
    };

    const outputFileFor = (pagePath: string): string => {
      if (pagePath === "/") return path.join(distDir, "index.html");
      if (pagePath === "/404") return path.join(distDir, "404.html");
      return path.join(distDir, pagePath.replace(/^\//, ""), "index.html");
    };

    for (const seo of PAGE_SEO_LIST) {
      const file = outputFileFor(seo.path);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, applySeo(template, seo));
    }
    fs.writeFileSync(outputFileFor("/404"), applySeo(template, NOT_FOUND_SEO));

    const lastmod = new Date().toISOString().slice(0, 10);
    const urls = PAGE_SEO_LIST.map((page) => {
      const loc = canonicalFor(page.path);
      const priority = page.path === "/" ? "1.0" : "0.8";
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
    fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);

    console.log(
      `Prerendered ${PAGE_SEO_LIST.length} routes + 404.html and sitemap.xml`,
    );
  } finally {
    await vite.close();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
