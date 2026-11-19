"use client";

import { useState } from "react";
import { Star, CheckCircle2, Shield, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { reviewCategories } from "@/content/reviews";

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [overallRating, setOverallRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({});
  const [showCategoryRatings, setShowCategoryRatings] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const ratingLabels: Record<number, string> = {
    1: "1 - Poor",
    2: "2 - Fair",
    3: "3 - Good",
    4: "4 - Very Good",
    5: "5 - Exceptional",
  };

  const handleCategoryRatingChange = (categoryId: string, star: number) => {
    setCategoryRatings((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === star ? 0 : star,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (overallRating === 0) {
      setStatus("error");
      setMessage("Please select an overall star rating (1 to 5 stars).");
      return;
    }

    if (!consent) {
      setStatus("error");
      setMessage("Please check the consent box to submit your review.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      rating: overallRating,
      title: String(fd.get("title") || "").trim(),
      content: String(fd.get("content") || "").trim(),
      stayDate: String(fd.get("stayDate") || "").trim() || undefined,
      categories: categoryRatings,
      consent,
      website_url: String(fd.get("website_url") || ""), // Honeypot field
    };

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setStatus("success");
      setMessage(
        data.message ||
          "Thank you for sharing your feedback! Your review has been submitted to hotel management for moderation and will appear on the website once approved.",
      );
      form.reset();
      setOverallRating(0);
      setCategoryRatings({});
      setConsent(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputStyle =
    "w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra/40 rounded-sm";

  if (status === "success") {
    return (
      <div
        className="bg-white border border-sage/40 p-8 md:p-12 text-center shadow-sm"
        role="status"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sage/15 text-sage flex items-center justify-center">
          <CheckCircle2 size={32} className="text-sage" />
        </div>
        <h3 className="font-serif text-3xl text-lake">Thank You for Your Feedback</h3>
        <p className="mt-3 text-charcoal/75 max-w-lg mx-auto leading-relaxed text-sm">
          {message}
        </p>
        <p className="mt-2 text-xs text-sage italic">
          All reviews undergo moderation by hotel administration to prevent spam and verify authenticity.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-8"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Submit Another Review
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-charcoal/10 p-6 md:p-10 shadow-sm space-y-6"
    >
      <div>
        <p className="label-caps text-sage mb-1">Your stay experience</p>
        <h2 className="font-serif text-3xl text-lake">Write a Review</h2>
        <p className="text-xs text-charcoal/60 mt-1">
          Share your candid impressions with future guests and hotel management.
        </p>
      </div>

      {/* Honeypot field for spam bots (hidden from human visitors) */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="website_url">Leave this empty</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Overall Star Rating */}
      <div>
        <label className="text-xs font-medium text-charcoal block mb-2">
          Overall Rating <span className="text-terra">*</span>
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Overall Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setOverallRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none focus-ring rounded-sm transition-transform hover:scale-110"
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                role="radio"
                aria-checked={overallRating === star}
              >
                <Star
                  size={28}
                  className={
                    star <= (hoverRating || overallRating)
                      ? "fill-terra text-terra"
                      : "text-charcoal/20"
                  }
                />
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-charcoal/70">
            {ratingLabels[hoverRating || overallRating] || "Select rating"}
          </span>
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="title" className="text-xs font-medium text-charcoal block mb-1.5">
          Review Title <span className="text-terra">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="e.g., Comfortable stay and friendly team in Bahir Dar"
          className={inputStyle}
        />
      </div>

      {/* Written Review */}
      <div>
        <label htmlFor="content" className="text-xs font-medium text-charcoal block mb-1.5">
          Written Review <span className="text-terra">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          required
          placeholder="Tell us about the room, hospitality, dining, or your visits around Lake Tana…"
          className={inputStyle}
        />
      </div>

      {/* Guest Name & Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-xs font-medium text-charcoal block mb-1.5">
            Your Name or Display Name <span className="text-terra">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="e.g., Helen T. or Michael B."
            className={inputStyle}
          />
          <p className="text-[0.6875rem] text-charcoal/50 mt-1">
            This name will appear publicly alongside your review.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-medium text-charcoal block mb-1.5">
            Email Address <span className="text-terra">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputStyle}
          />
          <div className="flex items-center gap-1 text-[0.6875rem] text-sage mt-1">
            <Shield size={11} className="text-sage shrink-0" />
            <span>Strictly private — will never be published or shared.</span>
          </div>
        </div>
      </div>

      {/* Date of stay */}
      <div>
        <label htmlFor="stayDate" className="text-xs font-medium text-charcoal block mb-1.5">
          Date of Stay <span className="text-charcoal/40 font-normal">(optional)</span>
        </label>
        <input
          id="stayDate"
          name="stayDate"
          type="month"
          className={`${inputStyle} max-w-xs`}
        />
        <p className="text-[0.6875rem] text-charcoal/50 mt-1">
          Helps management identify when you visited.
        </p>
      </div>

      {/* Optional Category Ratings Toggle */}
      <div className="pt-2 border-t border-charcoal/8">
        <button
          type="button"
          onClick={() => setShowCategoryRatings(!showCategoryRatings)}
          className="text-xs font-medium text-lake hover:text-terra flex items-center gap-1.5 transition-colors focus-ring py-1 rounded-sm"
        >
          <span>{showCategoryRatings ? "− Hide" : "+ Rate specific categories"}</span>
          <span className="text-charcoal/45 font-normal">(optional: cleanliness, staff, comfort, etc.)</span>
        </button>

        {showCategoryRatings && (
          <div className="mt-4 p-5 bg-sand/10 border border-charcoal/10 rounded-sm space-y-4">
            <p className="text-xs text-charcoal/70">
              Rate individual aspects of your stay (1 to 5 stars each):
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {reviewCategories.map((cat) => {
                const currentVal = categoryRatings[cat.id] || 0;
                return (
                  <div key={cat.id} className="bg-white p-3 border border-charcoal/8 rounded-sm">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-medium text-charcoal">{cat.label}</span>
                      <span className="text-[0.6875rem] text-charcoal/50">
                        {currentVal > 0 ? `${currentVal}★` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleCategoryRatingChange(cat.id, star)}
                          className="p-0.5 focus:outline-none focus-ring rounded-sm"
                          aria-label={`${cat.label} ${star} star`}
                        >
                          <Star
                            size={18}
                            className={
                              star <= currentVal
                                ? "fill-terra text-terra"
                                : "text-charcoal/20"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 h-4 w-4 rounded-sm border-charcoal/20 text-terra focus:ring-terra"
          />
          <span className="text-xs text-charcoal/75 leading-relaxed">
            I confirm that this review represents my own genuine experience at Winn Hotel.
            I consent to my review and display name being published on the Winn Hotel website.
            I understand that my email address will remain strictly confidential and will never be published.{" "}
            <span className="text-terra">*</span>
          </span>
        </label>
      </div>

      {/* Moderation note */}
      <div className="p-3 bg-ivory text-[0.72rem] text-charcoal/65 flex items-start gap-2 border border-charcoal/8 rounded-sm">
        <Info size={14} className="text-sage shrink-0 mt-0.5" />
        <span>
          <strong>Fair & Transparent Review Policy:</strong> All submissions are reviewed by
          our hotel administrator to screen for spam and inappropriate content before being published.
          We welcome both praise and constructive feedback from all guests.
        </span>
      </div>

      {/* Error message */}
      {status === "error" && (
        <div
          className="p-3 bg-terra/10 border border-terra/30 text-xs text-terra flex items-center gap-2 rounded-sm"
          role="alert"
        >
          <AlertCircle size={15} className="shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Submitting Review…" : "Submit Review"}
      </Button>
    </form>
  );
}
