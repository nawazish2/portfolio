export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  problem?: string;
  built?: string;
  highlights?: string[];
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
      "AI tool quotas are scattered across dashboards, so it is easy to hit limits without noticing.",
    built:
      "A native macOS menu bar utility that keeps quota status visible without leaving your workflow.",
    highlights: [
      "Native SwiftUI + AppKit menu bar experience",
      "Tracks multiple AI provider quotas in one place",
      "Local-only design with a calm, glanceable interface",
    ],
    stack: ["Swift", "SwiftUI", "AppKit"],
    github: "https://github.com/nawazish2/cuprim",
    year: "2026",
    status: "Shipped",
    accent: "from-violet-500 via-purple-600 to-slate-950",
    badge: "macOS",
  },
  {
    slug: "algoviz",
    title: "AlgoViz",
    oneLiner: "ML algorithms you can actually explore.",
    description:
      "Makes gradient descent, attention, random forests, and K-means explorable in the browser — change inputs and watch results update live.",
    problem:
      "Core ML ideas are often taught as static diagrams, which hides how the algorithms actually move.",
    built:
      "An interactive TypeScript visualizer for learning ML algorithms by changing inputs and watching results update.",
    highlights: [
      "Interactive visualizations for core ML algorithms",
      "Browser-first exploration without setup friction",
      "Built to make abstract systems feel concrete",
    ],
    stack: ["TypeScript", "React"],
    github: "https://github.com/nawazish2/algoviz",
    year: "2026",
    status: "Live",
    accent: "from-emerald-400 via-teal-500 to-slate-950",
    badge: "ML",
  },
  {
    slug: "chai-tailwind",
    title: "ChaiTailwind",
    oneLiner: "Utility CSS engine built from scratch.",
    description:
      "A tiny utility-first CSS engine around `chai-*` classes — parse utilities and apply styles through the DOM APIs.",
    problem:
      "Utility CSS can feel like magic until you build the matching and composition model yourself.",
    built:
      "A small engine that parses utility classes and applies styles through the DOM APIs.",
    highlights: [
      "Utility-first class system designed from scratch",
      "Direct DOM styling pipeline for learning and experimentation",
      "Focused on clarity over framework weight",
    ],
    stack: ["JavaScript", "DOM APIs"],
    github: "https://github.com/nawazish2/chai-tailwind",
    year: "2026",
    status: "Shipped",
    accent: "from-amber-400 via-orange-500 to-slate-950",
    badge: "CSS",
  },
  {
    slug: "parkit",
    title: "ParkIt",
    oneLiner: "Smart parking with realtime booking.",
    description:
      "A full-stack parking product with live spot updates, booking flow, and JWT-secured access for busy urban areas.",
    problem:
      "Finding and reserving parking in busy areas wastes time when availability is unclear.",
    built:
      "A full-stack parking product with live spot updates, booking flow, and JWT-secured access.",
    highlights: [
      "Realtime availability with Socket.io",
      "Booking-oriented full-stack architecture",
      "JWT auth and a modern React frontend",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "JWT"],
    github: "https://github.com/nawazish2/parkit",
    live: "https://parkit-kappa.vercel.app/",
    year: "2026",
    status: "Live",
    accent: "from-sky-400 via-blue-600 to-slate-950",
    badge: "Full-stack",
  },
];
