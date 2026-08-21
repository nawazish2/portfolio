export type AboutPart = {
  text: string;
  highlight?: boolean;
};

export type AboutLine = {
  parts: AboutPart[];
};

export const siteConfig = {
  name: "Nawazish Khan",
  shortName: "Nawazish",
  title: "Nawazish Khan — Portfolio",
  description:
    "Software engineer in Delhi. I build tools in Swift and TypeScript — Cuprim, AlgoViz, ChaiTailwind, and ParkIt.",
  url: "https://nawazish.site",
  locale: "en_IN",
  location: "Delhi, India",
  role: "Software Engineer",
  heroMeta: "Delhi · CS, IKGPTU",
  tagline: "I build useful software and learn systems by taking them apart.",
  summary:
    "Software engineer in Delhi. I work mostly in Swift and TypeScript on small tools, clear interfaces, and backends that behave.",
  availability: "Open to SDE roles and interesting product work",
  availabilityShort: "Open to roles & remote",
  education: "Computer Science student at IKGPTU",
  email: "knawazish153@gmail.com",
  resumeUrl: "/nawazishResume.pdf",
  ogImage: "/og-image.jpg",
  profileImage: "/profile.jpg",
  bannerImage: "/banner.gif",
  githubUsername: "nawazish2",
  links: {
    github: "https://github.com/nawazish2",
    linkedin: "https://www.linkedin.com/in/nawazishkhan8/",
    x: "https://x.com/nawazish_khan1",
    blog: "https://nawazish.hashnode.dev",
    email: "mailto:knawazish153@gmail.com",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/#projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ],
  about: [
    {
      parts: [
        { text: "I build small tools in " },
        { text: "Swift", highlight: true },
        { text: " and " },
        { text: "TypeScript", highlight: true },
        { text: ", usually by taking a system apart until I can see the moving pieces." },
      ],
    },
    {
      parts: [
        {
          text: "Lately that is a macOS menu bar app for AI quotas, a browser visualizer for ML algorithms, a tiny CSS engine, and a parking product with live booking.",
        },
      ],
    },
    {
      parts: [
        { text: "I am a CS student in Delhi, looking for " },
        { text: "SDE roles", highlight: true },
        { text: " and product work." },
      ],
    },
  ] satisfies AboutLine[],
  stack: [
    {
      name: "TypeScript",
      category: "Frontend",
      href: "https://www.typescriptlang.org",
      color: "#3178C6",
    },
    {
      name: "React",
      category: "Frontend",
      href: "https://react.dev",
      color: "#61DAFB",
    },
    {
      name: "Next.js",
      category: "Frontend",
      href: "https://nextjs.org",
      color: "#000000",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      href: "https://tailwindcss.com",
      color: "#06B6D4",
    },
    {
      name: "Swift",
      category: "Native",
      href: "https://www.swift.org",
      color: "#F05138",
    },
    {
      name: "SwiftUI",
      category: "Native",
      href: "https://developer.apple.com/xcode/swiftui/",
      color: "#0A84FF",
    },
    {
      name: "Node.js",
      category: "Backend",
      href: "https://nodejs.org",
      color: "#339933",
    },
    {
      name: "Express",
      category: "Backend",
      href: "https://expressjs.com",
      color: "#000000",
    },
    {
      name: "PostgreSQL",
      category: "Backend",
      href: "https://www.postgresql.org",
      color: "#4169E1",
    },
    {
      name: "MongoDB",
      category: "Backend",
      href: "https://www.mongodb.com",
      color: "#47A248",
    },
    {
      name: "Redis",
      category: "Backend",
      href: "https://redis.io",
      color: "#DC382D",
    },
    {
      name: "Git",
      category: "Tools",
      href: "https://git-scm.com",
      color: "#F05032",
    },
    {
      name: "Docker",
      category: "Tools",
      href: "https://www.docker.com",
      color: "#2496ED",
    },
    {
      name: "Vercel",
      category: "Tools",
      href: "https://vercel.com",
      color: "#000000",
    },
    {
      name: "Figma",
      category: "Design",
      href: "https://figma.com",
      color: "#F24E1E",
    },
  ] as const,
  writing: {
    title: "Notes",
    description:
      "Notes on JavaScript, backend engineering, and whatever I am building.",
    href: "https://nawazish.hashnode.dev",
    cta: "Read my writing",
  },
  quote: {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  cta: {
    title: "Want to work together?",
    description:
      "I am looking for SDE roles and product work. If something here is useful, write to me.",
    button: "Get in touch",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type StackItem = (typeof siteConfig.stack)[number];
export type StackCategory = StackItem["category"] | "All";
