import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, MessageSquare, Lock } from "lucide-react";
import { getApprovedReviews, type PublicGuestReview } from "@/lib/reviews-storage";
import { TripadvisorCard } from "@/components/reviews/TripadvisorCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Read genuine guest reviews and Tripadvisor feedback for Winn Hotel in Bahir Dar, or submit your own stay experience.",
};

export default async function ReviewsPage() {
  let approvedReviews: PublicGuestReview[] = [];
  try {
    approvedReviews = await getApprovedReviews();
  } catch {
    approvedReviews = [];
  }

  return (
    <>
      {/* Hero Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sage mb-4">Guest Feedback</p>
          <h1 className="font-serif text-5xl md:text-6xl text-lake max-w-3xl leading-[1.05]">
            Guest Reviews & Reflections
          </h1>
          <p className="mt-5 max-w-2xl text-charcoal/70 text-lg leading-relaxed">
            We hold our hospitality to high standards and cherish candid feedback.
            Explore verified external reviews on Tripadvisor and Google, or share your own thoughts below.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#external-reviews"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-lake text-white hover:bg-lake-deep transition-colors rounded-sm focus-ring"
            >
              Tripadvisor & External Reviews
            </a>
            <a
              href="#write-review"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-terra text-white hover:bg-[#a66244] transition-colors rounded-sm focus-ring"
            >
              Write a Review
            </a>
          </div>
        </div>
      </section>

      {/* Section A: Existing Guest Feedback */}
      <section id="external-reviews" className="py-16 md:py-24 bg-sand/15 border-t border-charcoal/8">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <p className="label-caps text-sage mb-2">Verified platforms</p>
            <h2 className="font-serif text-3xl md:text-4xl text-lake">
              Third-Party Traveler Feedback
            </h2>
            <p className="mt-2 text-sm text-charcoal/70 max-w-xl">
              Externally hosted ratings from independent travelers. All reviews on Tripadvisor
              and Google are managed directly on their respective platforms.
            </p>
          </div>

          <TripadvisorCard className="mb-16" />

          {/* Website-submitted and approved reviews */}
          <div className="pt-8 border-t border-charcoal/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="label-caps text-sage mb-1">Direct guest submissions</p>
                <h3 className="font-serif text-2xl md:text-3xl text-lake">
                  Reviews Submitted to Winn Hotel
                </h3>
                <p className="text-xs text-charcoal/60 mt-1">
                  Reviews submitted directly through our website. Moderated before publication for authenticity.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-charcoal/65 bg-white px-3 py-1.5 border border-charcoal/10 rounded-sm">
                <ShieldCheck size={14} className="text-sage" />
                <span>
                  {approvedReviews.length} {approvedReviews.length === 1 ? "review" : "reviews"} published
                </span>
              </div>
            </div>

            {approvedReviews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {approvedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-charcoal/20 p-8 md:p-12 text-center rounded-sm max-w-2xl mx-auto">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sand/30 text-lake flex items-center justify-center">
                  <MessageSquare size={22} />
                </div>
                <h4 className="font-serif text-xl text-lake">
                  No direct website reviews published yet
                </h4>
                <p className="text-sm text-charcoal/65 mt-2 leading-relaxed max-w-md mx-auto">
                  Be the first guest to share your review! All submitted feedback is reviewed
                  by our administration team and will appear here upon approval.
                </p>
                <a
                  href="#write-review"
                  className="inline-block mt-6 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-terra text-white hover:bg-[#a66244] transition-colors rounded-sm focus-ring"
                >
                  Submit the First Review ↓
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section B: Submit a Review Form */}
      <section id="write-review" className="py-20 md:py-28 bg-white border-t border-charcoal/8">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ReviewForm />

          {/* Admin link note */}
          <div className="mt-12 text-center">
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal/40 hover:text-charcoal/70 transition-colors focus-ring rounded-sm py-1"
            >
              <Lock size={12} />
              <span>Hotel staff & administration portal</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
