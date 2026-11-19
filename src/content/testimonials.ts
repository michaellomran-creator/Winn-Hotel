/**
 * Verified guest testimonials only.
 * Do not invent reviews, scores, or ratings.
 * Populate after management supplies permitted quotes with attribution.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  source: string;
  verified: true;
};

export const testimonials: Testimonial[] = [];

export const testimonialsSectionNote =
  "Guest stories will appear here once verified reviews are supplied by hotel management.";
