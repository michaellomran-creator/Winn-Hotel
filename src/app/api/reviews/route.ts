import { NextResponse } from "next/server";
import {
  createReview,
  getApprovedReviews,
  CategoryRatings,
} from "@/lib/reviews-storage";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// In-memory rate limiting map: IP -> timestamp
const ipSubmissions = new Map<string, number>();

export async function GET() {
  try {
    const reviews = await getApprovedReviews();
    return NextResponse.json({ ok: true, reviews });
  } catch (error) {
    console.error("Failed to load reviews:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load reviews at this time." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    // Rate limiting: allow at most 1 submission per 15 seconds per IP
    const now = Date.now();
    const lastTime = ipSubmissions.get(ip);
    if (lastTime && now - lastTime < 15000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please wait a moment before submitting another review.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    // Honeypot spam check: field must be absent or empty
    if (body.website_url) {
      // Silently discard spam bot submission
      return NextResponse.json({
        ok: true,
        message: "Your review has been received for review.",
      });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const rating = Number(body.rating);
    const consent = Boolean(body.consent);
    const stayDate = body.stayDate ? String(body.stayDate).trim() : undefined;
    const categories: CategoryRatings = body.categories || {};

    // Field validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name (at least 2 characters)." },
        { status: 400 },
      );
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, error: "Please provide an overall rating between 1 and 5 stars." },
        { status: 400 },
      );
    }
    if (!title || title.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Please provide a review title (at least 3 characters)." },
        { status: 400 },
      );
    }
    if (!content || content.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please provide your review thoughts (at least 10 characters)." },
        { status: 400 },
      );
    }
    if (!consent) {
      return NextResponse.json(
        {
          ok: false,
          error: "You must consent to publishing your review on our website.",
        },
        { status: 400 },
      );
    }

    // Sanitize optional categories
    const sanitizedCategories: CategoryRatings = {};
    const validCategoryKeys: (keyof CategoryRatings)[] = [
      "cleanliness",
      "staff",
      "comfort",
      "location",
      "dining",
      "overall",
    ];

    for (const key of validCategoryKeys) {
      if (typeof categories[key] === "number") {
        const val = categories[key] as number;
        if (val >= 1 && val <= 5) {
          sanitizedCategories[key] = Math.round(val);
        }
      }
    }

    const review = await createReview({
      name,
      email,
      rating,
      title,
      content,
      stayDate,
      categories: sanitizedCategories,
      consent,
    });

    ipSubmissions.set(ip, now);

    // Dispatch webhook / admin notification if configured
    const webhook = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "new_guest_review_pending",
            reviewId: review.id,
            name: review.name,
            email: review.email,
            rating: review.rating,
            title: review.title,
            content: review.content,
            submittedAt: review.submittedAt,
            status: review.status,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook notification error:", webhookErr);
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thank you for sharing your feedback! Your review has been submitted to hotel management for moderation and will appear on the website once approved.",
      reviewId: review.id,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process your review. Please try again later." },
      { status: 500 },
    );
  }
}
