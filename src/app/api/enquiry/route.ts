import { NextResponse } from "next/server";

type EnquiryBody = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomPreference?: string;
  name?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryBody;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const checkIn = body.checkIn || "";
    const checkOut = body.checkOut || "";
    const guests = body.guests || "";

    if (!name || !email || !phone || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      return NextResponse.json(
        { error: "Check-out must be after check-in." },
        { status: 400 },
      );
    }

    /**
     * Enquiry workflow (no fake live booking).
     * Wire ENQUIRY_WEBHOOK_URL or email service in production.
     * Never expose secrets in the frontend.
     */
    const payload = {
      ...body,
      name,
      email,
      phone,
      receivedAt: new Date().toISOString(),
      status: "awaiting_confirmation",
    };

    const webhook = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else if (process.env.NODE_ENV === "development") {
      console.info("[Winn Hotel enquiry]", payload);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Your reservation enquiry has been received. Our team will review availability and contact you to confirm — this is not an instant booking.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process enquiry. Please try again." },
      { status: 500 },
    );
  }
}
