/**
 * The contact notification email, as plain HTML + text. Same layout as the old
 * React Email template, without shipping React to the Worker to render it.
 */
type ContactEmail = { name: string; email: string; subject: string; message: string };

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const label =
  "margin:0 0 4px;color:#71717a;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;";
const value = "margin:0;color:#18181b;font-size:15px;line-height:1.6;";

export function contactEmailHtml({ name, email, subject, message }: ContactEmail): string {
  const n = escape(name);
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
  <body style="margin:0;background-color:#f4f4f5;color:#18181b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">New portfolio message from ${n}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;padding:36px 20px;">
      <tr><td style="background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;padding:32px;">
        <p style="margin:0 0 10px;color:#71717a;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Portfolio Contact</p>
        <h1 style="margin:0;color:#111827;font-size:28px;line-height:1.2;">New message from ${n}</h1>
        <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0;" />
        <p style="${label}">From</p>
        <p style="${value}">${n} · ${escape(email)}</p>
        <p style="${label}margin-top:16px;">Subject</p>
        <p style="${value}">${escape(subject)}</p>
        <div style="margin-top:18px;padding:18px;background-color:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;">
          <p style="${label}">Message</p>
          <p style="${value}white-space:pre-wrap;">${escape(message)}</p>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function contactEmailText({ name, email, subject, message }: ContactEmail): string {
  return `New portfolio message from ${name}\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}\n`;
}
