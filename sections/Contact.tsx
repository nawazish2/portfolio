"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import {
  ArrowUpRight,
  CalendarClock,
  Mail,
  MapPin,
  MessageSquareText,
  Send,
  Terminal,
} from "lucide-react";
import { GitHub, LinkedIn } from "@deemlol/next-icons";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const contactLinks = [
  {
    label: "Email",
    value: "Knawazish153@gmail.com",
    href: "mailto:Knawazish153@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "nawazishkhan8",
    href: "https://www.linkedin.com/in/nawazishkhan8/",
    icon: LinkedIn,
  },
  {
    label: "GitHub",
    value: "nawazish2",
    href: "https://github.com/nawazish2",
    icon: GitHub,
  },
];

const terminalLines = [
  { prompt: "nawazish@portfolio", command: "npm run connect" },
  {
    prompt: "status",
    command: "targeting SDE roles at product companies",
  },
  { prompt: "focus", command: "full-stack apps, real-time systems, clean UI" },
  { prompt: "response", command: "usually within 24 hours" },
];

const Contact = () => {
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 4500);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("loading");
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Message could not be sent.");
      }

      form.reset();
      setFormState("success");
      setToast({
        id: Date.now(),
        message: "Message sent. I will get back to you soon.",
        type: "success",
      });
    } catch (error) {
      setFormState("error");
      setToast({
        id: Date.now(),
        message:
          error instanceof Error
            ? error.message
            : "Message could not be sent right now.",
        type: "error",
      });
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen bg-slate-100 px-4 py-14 text-neutral-950 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-12 md:py-16 lg:h-screen lg:overflow-hidden lg:px-20 lg:py-8 ${spaceGrotesk.className}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col justify-center lg:h-[calc(100vh-4rem)] lg:min-h-0"
      >
        <motion.header
          variants={itemVariants}
          className="mb-6 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end lg:mb-5"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-neutral-500 dark:text-neutral-400">
              Open Channel
            </p>
            <h1
              className={`mt-2 text-5xl font-medium leading-none sm:text-6xl lg:text-7xl ${bebasNeue.className}`}
            >
              CONTACT
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:ml-auto md:text-base">
            Have a product idea, internship opportunity, collaboration, or a bug
            that needs a calm debugger? Send the signal and I will pick it up.
          </p>
        </motion.header>

        <div className="grid gap-5 lg:min-h-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div variants={itemVariants} className="grid gap-3">
            <div className="overflow-hidden rounded-xl border border-neutral-300/80 bg-neutral-950 text-neutral-100 shadow-xl shadow-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/4 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-auto flex items-center gap-2 text-xs text-neutral-400">
                  <Terminal size={14} />
                  contact.sh
                </span>
              </div>

              <div className="space-y-3 p-4 font-mono text-xs leading-6 sm:p-6 sm:text-sm lg:p-5">
                {terminalLines.map((line) => (
                  <div
                    key={`${line.prompt}-${line.command}`}
                    className="wrap-break-word"
                  >
                    <span className="text-emerald-300">{line.prompt}</span>
                    <span className="text-neutral-500"> $ </span>
                    <span className="text-neutral-100">{line.command}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 text-cyan-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                  waiting for your message
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-neutral-300/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/4">
                <CalendarClock className="mb-3 h-5 w-5 text-emerald-500" />
                <p className="text-sm font-semibold">Availability</p>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  Open to meaningful work and project discussions.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-300/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/4">
                <MapPin className="mb-3 h-5 w-5 text-sky-500" />
                <p className="text-sm font-semibold">Location</p>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  New Delhi, India. Remote-friendly.
                </p>
              </div>
              <div className="rounded-lg border border-neutral-300/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/4">
                <MessageSquareText className="mb-3 h-5 w-5 text-violet-500" />
                <p className="text-sm font-semibold">Best For</p>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  Web apps, dashboards, UI builds, and APIs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 min-[390px]:gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex min-w-0 items-center justify-center gap-2 rounded-lg border border-neutral-300/80 bg-white/70 px-2 py-3 transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/4 dark:hover:border-white/30 dark:hover:bg-white/7 min-[390px]:px-3 sm:justify-between"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="hidden text-sm font-semibold min-[390px]:block">
                          {link.label}
                        </span>
                        <span className="hidden truncate text-xs text-neutral-600 dark:text-neutral-400 sm:block">
                          {link.value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="hidden shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white sm:block"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-neutral-300/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/4 sm:p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                  Compose
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Start a conversation
                </h2>
              </div>
              <div className="hidden rounded-lg border border-neutral-300 bg-slate-50 px-3 py-2 text-xs text-neutral-600 dark:border-white/10 dark:bg-black/20 dark:text-neutral-300 sm:block">
                mailto://ready
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3.5">
              <label className="hidden">
                Website
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-normal outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/10 dark:bg-black/20 dark:focus:border-white"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-normal outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/10 dark:bg-black/20 dark:focus:border-white"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Subject
                <select
                  name="subject"
                  defaultValue=""
                  required
                  className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-normal text-neutral-950 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/10 dark:bg-black/20 dark:text-neutral-100 dark:focus:border-white"
                >
                  <option
                    className="bg-white text-neutral-950"
                    value=""
                    disabled
                  >
                    Choose a subject
                  </option>
                  <option className="bg-white text-neutral-950">
                    Internship or role
                  </option>
                  <option className="bg-white text-neutral-950">
                    Freelance project
                  </option>
                  <option className="bg-white text-neutral-950">
                    Collaboration
                  </option>
                  <option className="bg-white text-neutral-950">
                    Code review or debugging
                  </option>
                  <option className="bg-white text-neutral-950">Other</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Message
                <textarea
                  name="message"
                  required
                  placeholder="Tell me what you are building, what is broken, or what you want to explore."
                  rows={3}
                  className="resize-none rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-white/10 dark:bg-black/20 dark:focus:border-white"
                />
              </label>

              <button
                type="submit"
                disabled={formState === "loading"}
                className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:w-fit"
              >
                {formState === "loading" ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role={toast.type === "error" ? "alert" : "status"}
            aria-live={toast.type === "error" ? "assertive" : "polite"}
            className={`fixed bottom-5 left-4 right-4 z-80 mx-auto max-w-sm rounded-lg border px-4 py-3 text-sm shadow-xl backdrop-blur-xl sm:left-auto sm:right-6 sm:mx-0 ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100"
                : "border-red-500/30 bg-red-50 text-red-900 dark:bg-red-500/15 dark:text-red-100"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <p className="leading-6">{toast.message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
