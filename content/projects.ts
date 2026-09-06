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
    slug: "campusforms",
    title: "CampusForms",
    oneLiner: "Campus forms without the spreadsheet sprawl.",
    description:
      "One link per form, no student account. Anonymity is enforced by a database trigger rather than by the interface.",
    problem:
      "Campus forms live in Google Forms, get shared through a WhatsApp link half the hostel never sees, and land in a spreadsheet nobody owns.",
    built:
      "A public notice board of open forms, a builder with nine question types and fourteen campus templates, and results the hostel office can read in a morning.",
    highlights: [
      "Anonymous responses cleared by a Postgres trigger on write — no submitted_by or IP column exists to leak",
      "Nine question types, fourteen campus templates, QR code for the notice board",
      "Public /browse board plus CSV export, on Supabase auth and row level security",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
    github: "https://github.com/nawazish2/campusforms",
    live: "https://campusforms.vercel.app",
    year: "2026",
    status: "Live",
    accent: "from-blue-500 via-indigo-600 to-slate-950",
    badge: "Full-stack",
    image: "/projects/campusforms.jpg",
  },
  {
    slug: "cuprim",
    title: "Cuprim",
    oneLiner: "AI quota tracker for your menu bar.",
    description:
      "Tracks Claude, Codex, Cursor and Grok quotas from the menu bar. Local-only, no backend, no telemetry.",
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
    live: "https://github.com/nawazish2/cuprim/releases/latest",
    year: "2026",
    status: "Shipped",
    accent: "from-violet-500 via-purple-600 to-slate-950",
    badge: "macOS",
    image: "/projects/cuprim.jpg",
  },
  {
    slug: "chai-tailwind",
    title: "ChaiTailwind",
    oneLiner: "Utility CSS engine built from scratch.",
    description:
      "A utility-first CSS engine written from scratch: parses `chai-*` classes and applies styles straight through the DOM APIs.",
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
      "Live spot availability over Socket.io, a booking flow, and JWT-secured access.",
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
    image: "/projects/parkit.jpg",
  },
];
