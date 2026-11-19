import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TripadvisorCard } from "@/components/reviews/TripadvisorCard";
import { getApprovedReviews, type PublicGuestReview } from "@/lib/reviews-storage";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { MessageSquarePlus } from "lucide-react";

export async function Testimonials() {
  // Load only approved website reviews
  let approvedReviews: PublicGuestReview[] = [];
  try {
    approvedReviews = await getApprovedReviews();
  } catch {
    approvedReviews = [];
  }

  return (
    <section className="py-24 md:py-28 bg-sand/20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal>
            <p className="label-caps text-sage mb-3">Guest voices</p>
            <h2 className="font-serif text-4xl md:text-5xl text-lake leading-tight">
              What Our Guests Say
            </h2>
            <p className="mt-3 text-charcoal/70 text-base max-w-xl">
              Authentic traveler impressions. Explore verified third-party reviews on
              Tripadvisor and Google, or read thoughts submitted directly by our guests.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <Button href="/reviews" variant="ghost" className="text-xs">
                <span>View All Reviews & Submit</span>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Third-Party Verified Listing Card (Tripadvisor & Google) */}
        <Reveal delay={0.1}>
          <div className="mb-12">
            <TripadvisorCard />
          </div>
        </Reveal>

        {/* Website Submitted Reviews (if any are approved) */}
        {approvedReviews.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-lake">
                Recent Website Guest Reviews
              </h3>
              <Link
                href="/reviews"
                className="text-xs text-terra hover:underline font-medium focus-ring rounded-sm py-1"
              >
                See all {approvedReviews.length} website reviews →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {approvedReviews.slice(0, 2).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        ) : (
          <Reveal delay={0.15}>
            <div className="border border-dashed border-charcoal/20 bg-ivory/60 p-8 md:p-10 text-center max-w-3xl mx-auto rounded-sm">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-sand/40 text-lake flex items-center justify-center">
                <MessageSquarePlus size={20} />
              </div>
              <h3 className="font-serif text-2xl text-lake">
                Have you stayed at Winn Hotel?
              </h3>
              <p className="text-charcoal/70 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                We invite all guests to share their experience. Submissions are reviewed
                by our team to maintain genuine, verified feedback.
              </p>
              <div className="mt-6">
                <Button href="/reviews#write-review">
                  Write a Guest Review
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
