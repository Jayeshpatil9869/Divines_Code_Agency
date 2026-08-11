import { CONTACT_EMAIL, CONTACT_LINKEDIN, COMPANY_BLURB } from "@/data/contact";
import {
  FOUNDER_JAYESH,
  FOUNDER_MAHENDRA,
  OG_IMAGE,
  SITE_NAME,
  SITE_NAME_ALT,
  SITE_URL,
} from "@/data/seo";

/** Organization + WebSite + Person entities for JSON-LD (3-way cluster). */
export function buildOrganizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_NAME_ALT,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/android-chrome-512x512.png`,
        image: OG_IMAGE,
        description: COMPANY_BLURB,
        email: CONTACT_EMAIL,
        founder: [
          { "@id": `${FOUNDER_JAYESH.url}#person` },
          { "@id": `${FOUNDER_MAHENDRA.url}#person` },
        ],
        member: [
          { "@id": `${FOUNDER_JAYESH.url}#person` },
          { "@id": `${FOUNDER_MAHENDRA.url}#person` },
        ],
        sameAs: [
          CONTACT_LINKEDIN,
          "https://github.com/Jayeshpatil9869/divines_code_website",
          FOUNDER_JAYESH.url,
          FOUNDER_MAHENDRA.url,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: COMPANY_BLURB,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${FOUNDER_JAYESH.url}#person`,
        name: FOUNDER_JAYESH.name,
        url: FOUNDER_JAYESH.url,
        jobTitle: FOUNDER_JAYESH.jobTitle,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        colleague: { "@id": `${FOUNDER_MAHENDRA.url}#person` },
        sameAs: [...FOUNDER_JAYESH.sameAs],
      },
      {
        "@type": "Person",
        "@id": `${FOUNDER_MAHENDRA.url}#person`,
        name: FOUNDER_MAHENDRA.name,
        alternateName: FOUNDER_MAHENDRA.alternateName,
        url: FOUNDER_MAHENDRA.url,
        jobTitle: FOUNDER_MAHENDRA.jobTitle,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        colleague: { "@id": `${FOUNDER_JAYESH.url}#person` },
        sameAs: [...FOUNDER_MAHENDRA.sameAs],
      },
    ],
  };
}
