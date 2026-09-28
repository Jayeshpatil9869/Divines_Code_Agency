/**
 * Site SEO constants — canonical domain + entity cluster (Organization ↔ founders).
 * Keep descriptions aligned with live marketing copy in contact.ts / offerings.ts.
 */

export const SITE_URL = "https://divinescode.com";

export const SITE_NAME = "Divine's Code";
export const SITE_NAME_ALT = "Divines Code";

export const FOUNDER_JAYESH = {
  name: "Jayesh Patil",
  url: "https://jayeshbpatil.com/",
  jobTitle: "MERN Stack Developer & Founder at Divine's Code",
  sameAs: [
    "https://divinescode.com/",
    "https://mahendranagpure.com/",
    "https://github.com/Jayeshpatil9869",
    "https://dev.to/jayesh_patil",
    "https://www.linkedin.com/in/jayesh-patil01/",
  ],
} as const;

export const FOUNDER_MAHENDRA = {
  name: "Mahendra Nagpure",
  alternateName: "Mahendra Vinod Nagpure",
  url: "https://mahendranagpure.com/",
  jobTitle: "Full Stack Developer & Co-Creator at Divine's Code",
  sameAs: [
    "https://divinescode.com/",
    "https://jayeshbpatil.com/",
    "https://github.com/mahendra111111",
  ],
} as const;

export const OG_IMAGE = `${SITE_URL}/og-image.svg`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";

/** Visible homepage H1, split the way the hero renders it. */
export const HOME_H1_LINES = ["Divine's", "Code Agency"] as const;

export const HOME_H1 = HOME_H1_LINES.join(" ");

export const SEO_TITLE = "Web Development Agency in India | Divine's Code";

export const SEO_DESCRIPTION =
  "Divine's Code is a web development agency in India. Custom React websites, storefronts, and web applications, with packages from ₹9,999. Founded by Jayesh Patil and Mahendra Nagpure.";

export const HOME_INTRO =
  "We are a web development agency in India. We design and build the websites, storefronts, and web applications that close the gaps slowing a business down and give its sales a clearer path.";
