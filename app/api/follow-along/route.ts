import { NextResponse } from "next/server";

function redirectError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();

  if (!email) {
    return redirectError("Please enter an email address.");
  }

  if (!email.includes("@")) {
    return redirectError("Please use a valid email address.");
  }

  const actionUrl = process.env.CONVERTKIT_FORM_ACTION?.trim();

  if (!actionUrl) {
    return redirectError("Follow Along signup is not configured yet. Please email us instead.", 503);
  }

  const body = new URLSearchParams();
  body.set("email_address", email);

  if (firstName) {
    body.set("fields[first_name]", firstName);
  }

  const response = await fetch(actionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });

  if (!response.ok) {
    return redirectError("We couldn't complete that signup right now. Please email us instead.", 502);
  }

  return NextResponse.json({
    message: "You're in. We'll send new songs and stories as they come."
  });
}
