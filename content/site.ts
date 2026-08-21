export type AboutPart = {
  text: string;
  highlight?: boolean;
  href?: string;
};

export type AboutLine = {
  parts: AboutPart[];
};

export const siteConfig = {
  name: "Nawazish Khan",
  shortName: "Nawazish",
  title: "Nawazish Khan — Portfolio",
  description:
    "Software engineer in Delhi building useful tools with Swift and TypeScript. Selected work includes Cuprim, AlgoViz, ChaiTailwind, and ParkIt.",
  url: "https://nawazish.site",
  locale: "en_IN",
  location: "Delhi, IND",
  role: "Software Engineer",
  /** Rotating hero titles */
  roles: ["Software Engineer", "Full Stack Developer"] as const,
  /** Sam-style meta under role: age/city/country */
  heroMeta: "22, Delhi, IND",
  tagline: "I build useful software and learn systems by taking them apart.",
  summary:
    "Software engineer based in Delhi. I work mostly with Swift and TypeScript, and I like small tools, clear interfaces, and backends that do not surprise you.",
  availability: "Open to SDE roles and interesting product work",
  availabilityShort: "Open to roles & remote",
  education: "Computer Science student at IKGPTU",
  email: "knawazish153@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/18oBtva6I1yADfVEruERkpnRMAfEbv5l6/view?usp=drive_link",
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
    { href: "#projects", label: "Projects" },
  ],
  about: [
    {
      parts: [
        { text: "I'm a " },
        { text: "Software Engineer", highlight: true },
        {
          text: " passionate about building useful tools where clean code meets clear interfaces.",
        },
      ],
    },
    {
      parts: [
        { text: "I design and develop products with " },
        { text: "Swift", highlight: true },
        { text: ", " },
        { text: "TypeScript", highlight: true },
        { text: ", and " },
        { text: "React", highlight: true },
        {
          text: " — focusing on usability, performance, and maintainable architecture.",
        },
      ],
    },
    {
      parts: [
        {
          text: "Currently a Computer Science student at IKGPTU, I enjoy turning ideas into polished software, exploring systems, and writing down what I learn.",
        },
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
      name: "JavaScript",
      category: "Frontend",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      color: "#F7DF1E",
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
      name: "Framer Motion",
      category: "Frontend",
      href: "https://motion.dev",
      color: "#FF0055",
    },
    {
      name: "Swift",
      category: "Frontend",
      href: "https://www.swift.org",
      color: "#F05138",
    },
    {
      name: "SwiftUI",
      category: "Frontend",
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
      name: "JWT",
      category: "Backend",
      href: "https://jwt.io",
      color: "#000000",
    },
    {
      name: "Git",
      category: "Tools",
      href: "https://git-scm.com",
      color: "#F05032",
    },
    {
      name: "GitHub",
      category: "Tools",
      href: "https://github.com",
      color: "#181717",
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
      name: "Cursor",
      category: "Tools",
      href: "https://cursor.com",
      color: "#000000",
    },
    {
      name: "Claude Code",
      category: "Tools",
      href: "https://docs.anthropic.com/en/docs/claude-code",
      color: "#D97757",
    },
    {
      name: "Codex",
      category: "Tools",
      href: "https://openai.com/codex",
      color: "#10A37F",
    },
    {
      name: "Grok",
      category: "Tools",
      href: "https://x.ai",
      color: "#000000",
    },
    {
      name: "VS Code",
      category: "Tools",
      href: "https://code.visualstudio.com",
      color: "#007ACC",
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
      "Sometimes I write the lesson down before I forget it — mostly JavaScript, backend engineering, and notes from whatever I am building.",
    href: "https://nawazish.hashnode.dev",
    cta: "Read my writing",
  },
  quote: {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  cta: {
    title: "Scrolled Too Far",
    description:
      "If you've read this far, you might be interested in what I do.",
    button: "Let's Talk",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type StackItem = (typeof siteConfig.stack)[number];
export type StackCategory = StackItem["category"] | "All";
