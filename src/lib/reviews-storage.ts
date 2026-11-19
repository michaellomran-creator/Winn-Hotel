import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export interface CategoryRatings {
  cleanliness?: number;
  staff?: number;
  comfort?: number;
  location?: number;
  dining?: number;
  overall?: number;
}

export interface GuestReview {
  id: string;
  name: string;
  /** Private — stored for verification & management contact only; NEVER returned in public APIs */
  email: string;
  rating: number; // 1-5
  title: string;
  content: string;
  stayDate?: string;
  categories?: CategoryRatings;
  consent: boolean;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  moderatedAt?: string;
  moderatorNote?: string;
}

export type PublicGuestReview = Omit<GuestReview, "email" | "moderatorNote">;

const DATA_DIR = path.join(process.cwd(), "data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(REVIEWS_FILE);
  } catch {
    await fs.writeFile(REVIEWS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

async function readAllRaw(): Promise<GuestReview[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(REVIEWS_FILE, "utf8");
    return JSON.parse(raw || "[]") as GuestReview[];
  } catch {
    return [];
  }
}

async function writeAllAtomic(reviews: GuestReview[]): Promise<void> {
  await ensureDataFile();
  const tmpFile = `${REVIEWS_FILE}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(reviews, null, 2), "utf8");
  await fs.rename(tmpFile, REVIEWS_FILE);
}

/**
 * Returns all reviews for administrative moderation.
 * Includes email addresses and moderation metadata.
 */
export async function getAllReviewsAdmin(): Promise<GuestReview[]> {
  const reviews = await readAllRaw();
  return reviews.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

/**
 * Returns ONLY approved reviews for public display.
 * Private emails and internal moderation notes are strictly omitted.
 */
export async function getApprovedReviews(): Promise<PublicGuestReview[]> {
  const reviews = await readAllRaw();
  return reviews
    .filter((r) => r.status === "approved")
    .map(
      (r): PublicGuestReview => ({
        id: r.id,
        name: r.name,
        rating: r.rating,
        title: r.title,
        content: r.content,
        stayDate: r.stayDate,
        categories: r.categories,
        consent: r.consent,
        status: r.status,
        submittedAt: r.submittedAt,
        moderatedAt: r.moderatedAt,
      }),
    )
    .sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );
}

/**
 * Creates a new submitted review. Always initialized with status 'pending'
 * until reviewed by an administrator.
 */
export async function createReview(input: {
  name: string;
  email: string;
  rating: number;
  title: string;
  content: string;
  stayDate?: string;
  categories?: CategoryRatings;
  consent: boolean;
}): Promise<GuestReview> {
  const reviews = await readAllRaw();

  const newReview: GuestReview = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    title: input.title.trim(),
    content: input.content.trim(),
    stayDate: input.stayDate ? input.stayDate.trim() : undefined,
    categories: input.categories,
    consent: Boolean(input.consent),
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  reviews.unshift(newReview);
  await writeAllAtomic(reviews);
  return newReview;
}

/**
 * Moderates a review by setting status to approved or rejected.
 */
export async function moderateReview(
  id: string,
  status: "approved" | "rejected",
  moderatorNote?: string,
): Promise<GuestReview | null> {
  const reviews = await readAllRaw();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;

  reviews[index] = {
    ...reviews[index],
    status,
    moderatedAt: new Date().toISOString(),
    moderatorNote: moderatorNote ? moderatorNote.trim() : reviews[index].moderatorNote,
  };

  await writeAllAtomic(reviews);
  return reviews[index];
}

/**
 * Deletes a review by id.
 */
export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await readAllRaw();
  const filtered = reviews.filter((r) => r.id !== id);
  if (filtered.length === reviews.length) return false;
  await writeAllAtomic(filtered);
  return true;
}
