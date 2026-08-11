import { useEffect } from "react";
import { buildOrganizationGraph } from "@/data/schema";
import {
  OG_IMAGE,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/data/seo";

const JSON_LD_ID = "seo-json-ld";

/**
 * Ensures document head meta + JSON-LD stay correct after client boot.
 * Critical crawl tags also live in index.html for the pre-JS HTML shell.
 */
export function SeoHead() {
  useEffect(() => {
    document.title = SEO_TITLE;

    setMeta("description", SEO_DESCRIPTION);
    setLink("canonical", `${SITE_URL}/`);

    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:title", SEO_TITLE);
    setMetaProperty("og:description", SEO_DESCRIPTION);
    setMetaProperty("og:url", `${SITE_URL}/`);
    setMetaProperty("og:image", OG_IMAGE);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", SEO_TITLE);
    setMetaName("twitter:description", SEO_DESCRIPTION);
    setMetaName("twitter:image", OG_IMAGE);

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = JSON_LD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildOrganizationGraph());
  }, []);

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
