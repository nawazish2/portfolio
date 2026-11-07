import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";
import { Resend } from "resend";
import { contactEmailHtml, contactEmailText } from "@/lib/contact-email";

// The one route that runs on the Worker; everything else is static HTML.
export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asTrimmedString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Message could not be sent right now.";
};

/** Accepts JSON from the page script, or a plain form post when JS is off. */
async function readPayload(request: Request): Promise<Record<string, unknown> | null> {
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) return (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(await request.formData());
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Read per request: on Cloudflare these come from the Worker's secrets/vars.
  const RESEND_API_KEY = getSecret("RESEND_API_KEY");
  const CONTACT_TO_EMAIL = getSecret("CONTACT_TO_EMAIL");
  const RESEND_FROM_EMAIL = getSecret("RESEND_FROM_EMAIL");

  if (!RESEND_API_KEY) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const payload = await readPayload(request);
  if (!payload) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asTrimmedString(payload.name).slice(0, 120);
  const email = asTrimmedString(payload.email).slice(0, 160);
  const subject = asTrimmedString(payload.subject).slice(0, 160);
  const message = asTrimmedString(payload.message).slice(0, 3000);

  // Honeypot: bots fill the hidden field; pretend it worked.
  if (asTrimmedString(payload.website)) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "Please fill out every field." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL ?? "knawazish153@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: contactEmailHtml({ name, email, subject, message }),
      text: contactEmailText({ name, email, subject, message }),
    });

    if (error) {
      console.error("Resend contact email error:", error);
      return Response.json({ error: getErrorMessage(error) }, { status: 500 });
    }
  } catch (error) {
    console.error("Contact email route error:", error);
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }

  return Response.json({ ok: true });
};
