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
  /** Handwritten line under the name in the hero */
  heroKicker: "CS undergrad · Delhi · Swift + TypeScript",
  /** Sticky-note bullets in the hero. `parts` mirrors AboutLine. */
  heroNote: [
    {
      parts: [
        { text: "I'm a " },
        { text: "Computer Science undergrad", highlight: true },
        { text: " at IKGPTU (Punjab), graduating in 2027 and aiming at SDE roles." },
      ],
    },
    {
      parts: [
        { text: "I shipped " },
        {
          text: "Cuprim",
          highlight: true,
          href: "https://github.com/nawazish2/cuprim",
        },
        {
          text: " — a local-only macOS menu bar app that tracks Claude, Codex, Cursor and Grok quotas. No backend, no telemetry.",
        },
      ],
    },
    {
      parts: [
        { text: "I like building things twice: once with the framework, once from scratch. That's where " },
        {
          text: "ChaiTailwind",
          highlight: true,
          href: "https://github.com/nawazish2/chai-tailwind",
        },
        { text: " and " },
        {
          text: "AlgoViz",
          highlight: true,
          href: "https://algoviz-ashen.vercel.app",
        },
        { text: " came from." },
      ],
    },
    {
      parts: [
        { text: "On the web side: role-based JWT auth, Socket.io realtime, Razorpay payments, Playwright E2E — mostly " },
        { text: "React, Next.js and Node", highlight: true },
        { text: "." },
      ],
    },
    {
      parts: [
        { text: "100+ DSA problems solved, and I write the lessons down on " },
        {
          text: "Hashnode",
          highlight: true,
          href: "https://nawazish.hashnode.dev",
        },
        { text: " before I forget them." },
      ],
    },
  ] satisfies AboutLine[],
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
      name: "Figma",
      category: "Tools",
      href: "https://figma.com",
      color: "#F24E1E",
    },
  ] as const,
  /**
   * The paper sheet in the "Work" section. No job history yet, so this is
   * education plus the things that actually took months of work.
   */
  timeline: {
    education: [
      {
        org: "I. K. Gujral Punjab Technical University",
        meta: "2023 — 2027 (expected)",
        role: "B.Tech, Computer Science & Engineering",
        detail:
          "CGPA 8.50 / 10. Coursework in DBMS, operating systems and computer networks.",
      },
    ],
    building: [
      {
        org: "Cuprim",
        meta: "2026 · shipped, public",
        role: "Solo — Swift, SwiftUI, AppKit",
        detail:
          "A macOS menu bar app for AI quota tracking. Released publicly under MIT, Apple Silicon + macOS 26, local-only by design. My first native app taken all the way to a release build.",
        href: "https://github.com/nawazish2/cuprim",
      },
      {
        org: "Full-stack web",
        meta: "2024 — present",
        role: "React · Next.js · Node · MongoDB / MySQL",
        detail:
          "Multi-role platforms built solo: 50+ REST endpoints, role-based JWT auth, Socket.io realtime, Razorpay payments with HMAC signature verification, Playwright E2E coverage.",
      },
      {
        org: "Learning by rebuilding",
        meta: "ongoing",
        role: "TypeScript, from scratch",
        detail:
          "Gradient descent, attention, k-means and random forests implemented from first principles, then made interactive in AlgoViz. A utility CSS engine written from scratch in ChaiTailwind.",
        href: "https://algoviz-ashen.vercel.app",
      },
      {
        org: "DSA & writing",
        meta: "ongoing",
        role: "takeUforward · Hashnode",
        detail:
          "100+ problems solved, and technical articles on frontend architecture, backend design and auth systems.",
        href: "https://nawazish.hashnode.dev",
      },
    ],
  },
  /** Draggable stickers scattered over the mat. */
  stickers: [
    { emoji: "🛠️", label: "build it twice" },
    { emoji: "☕", label: "chai, not coffee" },
    { emoji: "🍎", label: "swift is fun, actually" },
    { emoji: "🧩", label: "100+ problems in" },
    { emoji: "🌙", label: "night shift dev" },
  ],
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
