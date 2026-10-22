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
      "Architecting scalable backend systems, robust APIs, and cloud databases.",
    category: "Backend",
    image: "/images/team/member-1.png",
    imagePosition: "center 18%",
    profileUrl: "https://mahendranagpure.com/",
    linkedinUrl: "https://www.linkedin.com/in/mahendra-nagpure/",
    githubUrl: "https://github.com/Mahendra111111",
  },
  {
    id: "apurv-ahire",
    name: "Apurv Ahire",
    role: "Full Stack Developer",
    description:
      "Engineering scalable full-stack applications and cloud solutions.",
    category: "Full Stack",
    image: "/images/team/member-4.png",
    imagePosition: "center 20%",
    profileUrl: "https://www.linkedin.com/in/apurv-ahire2003/",
    linkedinUrl: "https://www.linkedin.com/in/apurv-ahire2003/",
    githubUrl: "https://github.com/ApurvAhire03",
  },
  {
    id: "jayesh-patil",
    name: "Jayesh Patil",
    role: "Full Stack Developer (Frontend UI/UX)",
    description:
      "Crafting modern frontend interfaces, smooth motion, and UX craft.",
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
