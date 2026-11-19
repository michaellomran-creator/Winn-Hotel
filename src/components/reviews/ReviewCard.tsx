import { Star, CheckCircle, Calendar } from "lucide-react";
import { PublicGuestReview } from "@/lib/reviews-storage";
import { reviewCategories } from "@/content/reviews";

interface ReviewCardProps {
  review: PublicGuestReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.submittedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const categoriesEntries = review.categories
    ? Object.entries(review.categories).filter(([, val]) => typeof val === "number" && val > 0)
    : [];

  return (
    <article className="bg-white border border-charcoal/10 p-6 md:p-8 flex flex-col justify-between shadow-sm">
      <div>
        {/* Top bar: Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={
                  star <= review.rating
                    ? "fill-terra text-terra"
                    : "text-charcoal/15"
                }
              />
            ))}
            <span className="text-xs font-semibold text-lake ml-1.5">
              {review.rating}.0
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium bg-ivory text-lake border border-lake/15 px-2 py-0.5 rounded-sm">
            <CheckCircle size={10} className="text-terra" />
            Website Guest Review
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-lake mb-2 leading-snug">
          {review.title}
        </h3>

        {/* Written Review */}
        <p className="text-charcoal/80 text-sm leading-relaxed whitespace-pre-line mb-6">
          &ldquo;{review.content}&rdquo;
        </p>

        {/* Category ratings breakdown if available */}
        {categoriesEntries.length > 0 && (
          <div className="pt-4 border-t border-charcoal/8 mb-6">
            <p className="text-[0.6875rem] uppercase tracking-wider text-sage font-medium mb-2">
              Category ratings
            </p>
            <div className="flex flex-wrap gap-2">
              {categoriesEntries.map(([catKey, val]) => {
                const catDef = reviewCategories.find((c) => c.id === catKey);
                return (
                  <span
                    key={catKey}
                    className="inline-flex items-center gap-1 text-xs bg-sand/15 text-charcoal/80 px-2.5 py-1 rounded-sm border border-charcoal/5"
                  >
                    <span>{catDef ? catDef.label : catKey}:</span>
                    <span className="font-semibold text-lake">{val}★</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Author and Date footer */}
      <footer className="pt-4 border-t border-charcoal/8 flex items-center justify-between text-xs text-charcoal/60 flex-wrap gap-2">
        <div className="font-medium text-charcoal">
          {review.name}
          {review.stayDate && (
            <span className="font-normal text-charcoal/60 ml-1.5">
              (Stayed: {review.stayDate})
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-charcoal/50">
          <Calendar size={12} />
          <span>{formattedDate}</span>
        </div>
      </footer>
    </article>
  );
}
