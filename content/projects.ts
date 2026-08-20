export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  problem: string;
  built: string;
  next: string;
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  year: string;
  status: "Live" | "Shipped" | "WIP";
  accent: string;
  badge?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "cuprim",
    title: "Cuprim",
    oneLiner: "AI quota tracker for your menu bar.",
    description:
      "A local-only macOS menu bar app for tracking Claude, Codex, Cursor, and Grok quotas — status at a glance without leaving your workflow.",
    problem:
      "AI tool quotas live in separate dashboards, so it is easy to hit a limit mid-task and only notice after the tool stops.",
    built:
      "A native SwiftUI + AppKit menu bar utility that keeps quota status visible locally, without an account or a web round-trip.",
    next: "Usage forecasts so a limit is visible before you hit it, not after.",
    highlights: [
      "Native SwiftUI + AppKit menu bar experience",
      "Tracks several AI provider quotas in one place",
      "Local-only: no account, no cloud sync",
    ],
    stack: ["Swift", "SwiftUI", "AppKit"],
    github: "https://github.com/nawazish2/cuprim",
    live: "https://github.com/nawazish2/cuprim/releases/latest",
    year: "2026",
    status: "Shipped",
    accent: "from-violet-500 via-purple-600 to-slate-950",
    badge: "macOS",
    image: "/projects/cuprim.jpg",
  },
  {
    slug: "algoviz",
    title: "AlgoViz",
    oneLiner: "ML algorithms you can actually explore.",
    description:
      "Makes gradient descent, attention, random forests, and K-means explorable in the browser — change inputs and watch results update live.",
    problem:
      "Core ML ideas are often taught as static diagrams, which hides how the algorithms actually move when an input changes.",
    built:
      "A TypeScript visualizer that reruns the algorithm as you edit inputs, so the geometry of the update is visible, not implied.",
    next: "A step-through mode for a single iteration, not only the full run.",
    highlights: [
      "Interactive visualizations for core ML algorithms",
      "Runs in the browser with no setup",
      "Built to make abstract systems feel concrete",
    ],
    stack: ["TypeScript", "React"],
    github: "https://github.com/nawazish2/algoviz",
    live: "https://algoviz-ashen.vercel.app",
    year: "2026",
    status: "Live",
    accent: "from-emerald-400 via-teal-500 to-slate-950",
    badge: "ML",
    image: "/projects/algoviz.jpg",
  },
  {
    slug: "chai-tailwind",
    title: "ChaiTailwind",
    oneLiner: "Utility CSS engine built from scratch.",
    description:
      "A tiny utility-first CSS engine around `chai-*` classes — parse utilities and apply styles through the DOM APIs.",
    problem:
      "Utility CSS is easy to use and hard to explain until you own the matching, the scale, and how classes compose.",
    built:
      "A small runtime that scans the DOM, parses `chai-*` classes, and writes inline styles — no build step.",
    next: "A tight grammar for the class language, plus tests so new utilities cannot break old ones.",
    highlights: [
      "Utility-first class system designed from scratch",
      "Direct DOM styling pipeline, no compiler",
      "Focused on the matching model, not framework weight",
    ],
    stack: ["JavaScript", "DOM APIs"],
    github: "https://github.com/nawazish2/chai-tailwind",
    live: "https://nawazish2.github.io/chai-tailwind",
    year: "2026",
    status: "Shipped",
    accent: "from-amber-400 via-orange-500 to-slate-950",
    badge: "CSS",
    image: "/projects/chai-tailwind.jpg",
  },
  {
    slug: "parkit",
    title: "ParkIt",
    oneLiner: "Smart parking with realtime booking.",
    description:
      "A full-stack parking product with live spot updates, booking flow, and JWT-secured access for busy urban areas.",
    problem:
      "Finding a space in a busy lot is guesswork when availability is a spreadsheet, a phone call, or a stale web page.",
    built:
      "A booking flow with live spot updates over Socket.io, JWT auth, and a React client for drivers and lot owners.",
    next: "Owner tools that are as fast as the booking flow — occupancy, exceptions, and a lot that can be added without a deploy.",
    highlights: [
      "Realtime availability with Socket.io",
      "Booking-oriented full-stack architecture",
      "JWT auth and a React frontend",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Socket.io"],
    github: "https://github.com/nawazish2/parkit",
    live: "https://parkit-kappa.vercel.app/",
    year: "2026",
    status: "Live",
    accent: "from-sky-400 via-blue-600 to-slate-950",
    badge: "Full-stack",
    image: "/projects/parkit.jpg",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
