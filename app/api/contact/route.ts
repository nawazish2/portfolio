import * as React from "react";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-email";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const toEmail = process.env.CONTACT_TO_EMAIL ?? "mr.samarthchawla@gmail.com";
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }

  return "Message could not be sent right now.";
};

export async function POST(request: Request) {
  if (!resend) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asTrimmedString(payload.name).slice(0, 120);
  const email = asTrimmedString(payload.email).slice(0, 160);
  const subject = asTrimmedString(payload.subject).slice(0, 160);
  const message = asTrimmedString(payload.message).slice(0, 3000);
  const website = asTrimmedString(payload.website);

  if (website) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: "Please fill out every field." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      react: React.createElement(ContactEmail, {
        name,
        email,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend contact email error:", error);

      return Response.json(
        { error: getErrorMessage(error) },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Contact email route error:", error);

    return Response.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
