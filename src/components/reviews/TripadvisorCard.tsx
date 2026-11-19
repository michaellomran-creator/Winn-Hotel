import Link from "next/link";
import { ExternalLink, Award, CheckCircle2, Star, MessageSquare } from "lucide-react";
import { externalReviewPlatforms } from "@/content/reviews";

interface TripadvisorCardProps {
  className?: string;
  compact?: boolean;
}

export function TripadvisorCard({
  className = "",
  compact = false,
}: TripadvisorCardProps) {
  const tripadvisor = externalReviewPlatforms.find((p) => p.id === "tripadvisor");
  const google = externalReviewPlatforms.find((p) => p.id === "google");

  if (!tripadvisor) return null;

  return (
    <div
      className={`bg-white border border-charcoal/10 overflow-hidden shadow-sm ${className}`}
    >
      {/* Platform Banner */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            {/* Tripadvisor Emblem */}
            <div className="w-10 h-10 rounded-full bg-[#00aa6c]/10 text-[#00aa6c] flex items-center justify-center font-bold text-lg border border-[#00aa6c]/20">
              <Award size={20} className="text-[#00aa6c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl text-lake leading-tight">
                  {tripadvisor.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium bg-[#00aa6c]/10 text-[#00875a] px-2 py-0.5 rounded-sm">
                  <CheckCircle2 size={11} />
                  {tripadvisor.badge}
                </span>
              </div>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Listing: {tripadvisor.listingName}
              </p>
            </div>
          </div>

          <Link
            href={tripadvisor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#00aa6c] text-white hover:bg-[#008f5b] transition-colors rounded-sm focus-ring"
            aria-label="Read All Reviews on Tripadvisor"
          >
            <span>Read All Reviews on Tripadvisor</span>
            <ExternalLink size={13} />
          </Link>
        </div>

        <p className="text-sm text-charcoal/75 leading-relaxed max-w-2xl">
          {tripadvisor.description}
        </p>

        {/* Dynamic metrics if certified by authorized management, else honest status */}
        {tripadvisor.metrics ? (
          <div className="mt-5 pt-5 border-t border-charcoal/8 flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-medium text-lake">
                {tripadvisor.metrics.rating.toFixed(1)}
              </span>
              <span className="text-xs text-charcoal/50">
                / {tripadvisor.metrics.scale}
              </span>
            </div>
            <div className="flex gap-1 text-terra">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(tripadvisor.metrics!.rating)
                      ? "fill-terra text-terra"
                      : "text-charcoal/20"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-charcoal/60">
              ({tripadvisor.metrics.reviewCount} traveler reviews)
            </span>
          </div>
        ) : (
          <div className="mt-5 pt-4 border-t border-charcoal/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-charcoal/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sage inline-block" />
              <span>
                Independent ratings and traveler feedback are hosted directly on Tripadvisor.
              </span>
            </div>
            <span className="text-sage italic">
              Verified external profile
            </span>
          </div>
        )}
      </div>

      {/* Attribution footer */}
      <div className="px-6 py-3.5 bg-ivory-soft/80 border-t border-charcoal/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-charcoal/60">
        <p className="italic">
          {tripadvisor.attribution}
        </p>
        <Link
          href={tripadvisor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terra hover:underline inline-flex items-center gap-1 font-medium"
        >
          <span>Open Tripadvisor Profile</span>
          <ExternalLink size={11} />
        </Link>
      </div>

      {/* Secondary verified platform: Google Reviews */}
      {google && !compact ? (
        <div className="px-6 py-4 bg-sand/10 border-t border-charcoal/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white border border-charcoal/10 flex items-center justify-center text-charcoal/70">
              <MessageSquare size={14} />
            </div>
            <div>
              <p className="text-xs font-medium text-charcoal">
                Also find us on {google.name}
              </p>
              <p className="text-[0.72rem] text-charcoal/60">
                {google.attribution}
              </p>
            </div>
          </div>

          <Link
            href={google.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-lake hover:text-terra font-medium focus-ring rounded-sm py-1"
          >
            <span>View Google Maps Reviews</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
