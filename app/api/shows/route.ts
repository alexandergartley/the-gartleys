import { NextResponse } from "next/server";
import { Resend } from "resend";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organizationOrChurch = String(formData.get("organizationOrChurch") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return errorResponse("Please fill in your name, email, and message.");
  }

  if (!email.includes("@")) {
    return errorResponse("Please use a valid email address.");
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.BOOKING_FROM_EMAIL?.trim();
  const to = process.env.BOOKING_TO_EMAIL?.trim() || process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return errorResponse("Booking inquiries are not configured yet. Please email us instead.", 503);
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New booking inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Church / Organization: ${organizationOrChurch || "Not provided"}`,
      `Event Date: ${eventDate || "Not provided"}`,
      "",
      "Message:",
      message
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2f2a25;">
        <h2 style="margin-bottom: 16px;">New booking inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Church / Organization:</strong> ${escapeHtml(organizationOrChurch || "Not provided")}</p>
        <p><strong>Event Date:</strong> ${escapeHtml(eventDate || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${escapeHtml(message)}</p>
      </div>
    `
  });

  if (error) {
    return errorResponse("We couldn't send your message right now. Please email us instead.", 502);
  }

  return NextResponse.json({
    message: "Inquiry received. We'll respond personally as soon as we can."
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
