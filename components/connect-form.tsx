"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full border-0 border-b border-neutral-200 bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-soft focus:border-foreground dark:border-neutral-700 dark:focus:border-neutral-300 sm:py-3.5 sm:text-lg";

const labelClass =
  "text-[11px] font-medium tracking-[0.2em] text-muted-soft uppercase";

export function ConnectForm() {
  const [state, setState] = useState<FormState>("idle");
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("loading");
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: "Let's Connect",
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
      setStatus("Message sent. I'll get back to you soon.");
    } catch (error) {
      setState("error");
      setStatus(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-3xl flex-col gap-6 sm:gap-10"
    >
      <label className="hidden">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="grid gap-2 sm:gap-3">
        <span className={labelClass}>Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="What should I call you?"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2 sm:gap-3">
        <span className={labelClass}>Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="How can I contact you?"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2 sm:gap-3">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          required
          rows={2}
          placeholder="Tell me about your project..."
          className={`${fieldClass} min-h-[72px] resize-none pb-5 sm:min-h-[100px] sm:pb-8`}
        />
      </label>

      <div className="flex flex-col gap-3 pt-2 sm:pt-4">
        {/* Sam-style full-width pill CTA on mobile */}
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background shadow-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 sm:h-[3.25rem] sm:w-auto sm:justify-start sm:px-9 sm:text-[15px]"
        >
          {state === "loading" ? "Sending..." : "Send Message"}
          <ArrowRight size={16} strokeWidth={2.25} />
        </button>

        {status ? (
          <p
            className={`text-sm ${
              state === "success" ? "text-emerald-500" : "text-red-400"
            }`}
            role={state === "error" ? "alert" : "status"}
          >
            {status}
          </p>
        ) : null}
      </div>
    </form>
  );
}
