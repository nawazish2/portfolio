"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/content/site";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "h-11 rounded-md border border-dashed border-border bg-background px-4 text-sm outline-none transition focus:border-border-strong";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Message could not be sent.");
      }

      form.reset();
      setState("success");
      setMessage("Message sent. I'll get back to you soon.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="hidden">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          Name
          <input
            name="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-muted">
        Subject
        <select
          name="subject"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choose a subject
          </option>
          <option>Internship or role</option>
          <option>Product collaboration</option>
          <option>Project feedback</option>
          <option>Other</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm text-muted">
        Message
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me what you're building or what you need."
          className="resize-none rounded-md border border-dashed border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-border-strong"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
        >
          {state === "loading" ? "Sending..." : "Send message"}
          <Send size={15} />
        </button>
        <a
          href={siteConfig.links.email}
          className="text-sm text-muted transition hover:text-foreground"
        >
          or email directly
        </a>
      </div>

      {message ? (
        <p
          className={`text-sm ${
            state === "success" ? "text-emerald-500" : "text-red-400"
          }`}
          role={state === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
