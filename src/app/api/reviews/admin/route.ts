import { NextResponse } from "next/server";
import {
  getAllReviewsAdmin,
  moderateReview,
  deleteReview,
} from "@/lib/reviews-storage";

function checkAdminAuth(request: Request): boolean {
  const adminKey =
    process.env.ADMIN_MODERATION_KEY || "winn-hotel-admin";

  const headerKey = request.headers.get("x-admin-key");
  const authHeader = request.headers.get("authorization");
  const bearerKey = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key");

  const suppliedKey = headerKey || bearerKey || queryKey;
  return Boolean(suppliedKey && suppliedKey === adminKey);
}

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: Invalid or missing administrator key." },
      { status: 401 },
    );
  }

  try {
    const reviews = await getAllReviewsAdmin();
    return NextResponse.json({ ok: true, reviews });
  } catch (error) {
    console.error("Admin fetch reviews error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to retrieve reviews." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: Invalid or missing administrator key." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const status = body.status as "approved" | "rejected";
    const note = body.note ? String(body.note).trim() : undefined;

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing review ID." },
        { status: 400 },
      );
    }

    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json(
        { ok: false, error: "Status must be either 'approved' or 'rejected'." },
        { status: 400 },
      );
    }

    const updated = await moderateReview(id, status, note);
    if (!updated) {
      return NextResponse.json(
        { ok: false, error: "Review not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, review: updated });
  } catch (error) {
    console.error("Admin moderate review error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update review status." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: Invalid or missing administrator key." },
      { status: 401 },
    );
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing review ID." },
        { status: 400 },
      );
    }

    const deleted = await deleteReview(id);
    if (!deleted) {
      return NextResponse.json(
        { ok: false, error: "Review not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, message: "Review deleted successfully." });
  } catch (error) {
    console.error("Admin delete review error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete review." },
      { status: 500 },
    );
  }
}
