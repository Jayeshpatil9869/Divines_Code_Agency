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

export const OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;

export const SEO_TITLE =
  "Divine's Code Agency — Website Design & Development";

export const SEO_DESCRIPTION =
  "Website design and development with clear packages from ₹9,999. Modern UI, frontend builds, and optional Website Care. Founded by Jayesh Patil & Mahendra Nagpure.";
