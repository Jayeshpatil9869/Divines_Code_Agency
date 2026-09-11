export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  image: string;
  /** CSS object-position, e.g. "center top" */
  imagePosition?: string;
  profileUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "mahendra-nagpure",
    name: "Mahendra Nagpure",
    role: "Full Stack Developer (Backend)",
    description:
      "Full Stack Developer (Backend) — APIs, databases, and production systems.",
    category: "Backend",
    image: "/images/team/member-1.png",
    imagePosition: "center 18%",
    profileUrl: "https://mahendranagpure.com/",
    linkedinUrl: "https://www.linkedin.com/in/mahendra-nagpure/",
    githubUrl: "https://github.com/Mahendra111111",
  },
  {
    id: "jayesh-patil",
    name: "Jayesh Patil",
    role: "Full Stack Developer (Frontend UI/UX)",
    description:
      "Full Stack Developer (Frontend UI/UX) — interfaces, motion, and product craft.",
    category: "Frontend",
    image: "/images/team/member-2.png",
    imagePosition: "center 10%",
    profileUrl: "https://jayeshbpatil.com/",
    linkedinUrl: "https://www.linkedin.com/in/jayeshpatilfs",
    githubUrl: "https://github.com/Jayeshpatil9869",
  },
  {
    id: "sanket-gangurde",
    name: "Sanket Gangurde",
    role: "Influencer",
    description:
      "Influencer connecting Divine's Code with the people who need the work.",
    category: "Influencer",
    image: "/images/team/member-3.png",
    imagePosition: "center 4%",
    profileUrl: "https://www.instagram.com/malegaon_travelling",
    instagramUrl: "https://www.instagram.com/malegaon_travelling",
  },
];
