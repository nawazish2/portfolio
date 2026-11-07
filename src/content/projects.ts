export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  metric?: string;
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
    slug: "arjuna-agri",
    title: "Arjuna Agri",
    oneLiner: "AI farming assistant for Indian farmers.",
    metric: "Team of 4 · Hack-N-Win 3.0 · 2 LLMs with auto-fallback",
    description:
      "Soil analysis, crop disease detection from photos, irrigation planning and yield prediction in one web app. Built with a team of 4 at the Hack-N-Win 3.0 hackathon.",
    highlights: [
      "Groq (Llama 3.3 70B) answers text questions and falls back to Gemini automatically when it hits a rate limit",
      "Gemini reads crop photos and soil reports; a 24-hour cache and API-key rotation keep it within free quotas",
    ],
    stack: ["Next.js", "TypeScript", "Gemini API", "Groq", "Supabase"],
    github: "https://github.com/nawazish2/arjunaAgri",
    live: "https://arjuna-agri.vercel.app",
    year: "2026",
    status: "Live",
    accent: "from-green-500 via-emerald-600 to-slate-950",
    badge: "AI · Full-stack",
    image: "/projects/arjuna-agri.jpg",
  },
  {
    slug: "campusforms",
    title: "CampusForms",
    oneLiner: "Campus forms without the spreadsheet sprawl.",
    metric: "10 question types · 14 templates · server-enforced anonymity",
    description:
      "One link per form, no student account. Anonymity is enforced on the server, not just hidden in the interface.",
    problem:
      "Campus forms live in Google Forms, get shared through a WhatsApp link half the hostel never sees, and land in a spreadsheet nobody owns.",
    built:
      "A public notice board of open forms, a builder with ten question types and fourteen campus templates, and results the hostel office can read in a morning.",
    highlights: [
      "Anonymous forms never store the name, email or IP of whoever answered, so there is nothing to leak",
      "Deadlines, a flood limit and answer types are checked on the server and covered by automated tests",
    ],
    stack: ["TypeScript", "Next.js", "Convex", "Tailwind CSS"],
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
    metric: "4 providers · MIT · local-only, no telemetry",
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
    badge: "macOS · Side project",
    image: "/projects/cuprim.jpg",
  },
  {
    slug: "chai-tailwind",
    title: "ChaiTailwind",
    oneLiner: "Utility CSS engine built from scratch.",
    metric: "chai-* parser · zero-dep DOM pipeline",
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
    badge: "From scratch",
    image: "/projects/chai-tailwind.jpg",
  },
  {
    slug: "parkit",
    title: "ParkIt",
    oneLiner: "Smart parking with realtime booking.",
    metric: "Socket.io live spots · JWT-secured booking",
    description:
      "A real-time parking platform with 3 role-based portals and 22 REST endpoints, from booking to payment.",
    problem:
      "Finding and reserving parking in busy areas wastes time when availability is unclear.",
    built:
      "A full-stack parking product with live spot updates, booking flow, and JWT-secured access.",
    highlights: [
      "Slot availability updates for every user in under a second over Socket.io, with no polling",
      "Razorpay payments verified with HMAC SHA-256 signatures and server-side amount checks",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "MySQL", "Razorpay"],
    github: "https://github.com/nawazish2/parkit",
    live: "https://parkit-kappa.vercel.app/",
    year: "2026",
    status: "Live",
    accent: "from-sky-400 via-blue-600 to-slate-950",
    badge: "Full-stack",
    image: "/projects/parkit.jpg",
  },
];
