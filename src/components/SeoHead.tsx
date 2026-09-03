import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildJsonLdForPath } from "@/data/schema";
import {
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from "@/data/seo";
import { getPageSeo, normalizePath } from "@/data/seo-pages";

const JSON_LD_ID = "seo-json-ld";

function canonicalFor(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

/**
 * Keeps document head meta + JSON-LD aligned with the active route.
 * Build prerender writes the same tags into each static HTML file.
 */
export function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePath(location.pathname);
    const seo = getPageSeo(path);
    const canonical = canonicalFor(path);

    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("robots", seo.robots);
    setLink("canonical", canonical);

    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:title", seo.title);
    setMetaProperty("og:description", seo.description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", OG_IMAGE);
    setMetaProperty("og:image:width", OG_IMAGE_WIDTH);
    setMetaProperty("og:image:height", OG_IMAGE_HEIGHT);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", seo.title);
    setMetaName("twitter:description", seo.description);
    setMetaName("twitter:image", OG_IMAGE);

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = JSON_LD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildJsonLdForPath(path));
  }, [location.pathname]);

  return null;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaName(name: string, content: string) {
  setMeta(name, content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
