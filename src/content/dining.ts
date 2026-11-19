export const dining = {
  heading: "Good Food. Good Moments.",
  intro:
    "Enjoy a welcoming dining experience at Winn Hotel — from a thoughtful breakfast to meals that bring guests together after a day in Bahir Dar.",
  breakfast:
    "Breakfast service is available for hotel guests. Exact hours, menu, and inclusions will be confirmed by hotel management.",
  atmosphere:
    "A comfortable setting for morning coffee, shared meals, and quiet moments between explorations.",
  /** Do not invent restaurant name, cuisine specialties, or hours */
  restaurantName: null as string | null,
  openingHours: null as string | null,
  openingHoursConfirmed: false,
  images: [
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
      alt: "Temporary placeholder — restaurant dining (replace with Winn Hotel photography)",
      placeholder: true,
    },
    {
      src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1600&q=80",
      alt: "Temporary placeholder — breakfast spread (replace with Winn Hotel photography)",
      placeholder: true,
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80",
      alt: "Temporary placeholder — dining atmosphere (replace with Winn Hotel photography)",
      placeholder: true,
    },
  ],
} as const;
