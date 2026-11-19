export interface ExternalPlatform {
  id: "tripadvisor" | "google";
  name: string;
  badge: string;
  url: string;
  listingName: string;
  attribution: string;
  description: string;
  note: string;
  verifiedListing: boolean;
  /**
   * Only populated when management provides verified API credentials
   * or official embed widget. Do NOT fabricate numbers.
   */
  metrics?: {
    rating: number;
    scale: number;
    reviewCount: number;
    lastUpdated: string;
  };
}

export const externalReviewPlatforms: ExternalPlatform[] = [
  {
    id: "tripadvisor",
    name: "Tripadvisor",
    badge: "Official Listing",
    url: "https://www.tripadvisor.com/Hotel_Review-g480192-d16805637-Reviews-Wynn_Hotel_Bahir_Dar-Bahir_Dar_Amhara_Region.html",
    listingName: "Wynn Hotel Bahir Dar",
    attribution: "Reviews & ratings on Tripadvisor are submitted and verified independently by travelers.",
    description:
      "Explore independent traveler reviews, room feedback, and hospitality scores directly on our official Tripadvisor listing.",
    note: "Official listing confirmed. Live widget embed code or Partner API access can be connected upon management supply.",
    verifiedListing: true,
  },
  {
    id: "google",
    name: "Google Reviews",
    badge: "Verified Location",
    url: "https://www.google.com/maps/search/?api=1&query=Winn+Hotel,+Giorgis+Road,+near+Flavor+Juice+%26+Pizzeria,+Bahir+Dar,+Ethiopia",
    listingName: "Winn Hotel Bahir Dar",
    attribution: "Local reviews and check-ins hosted on Google Maps.",
    description:
      "Read real-world visitor impressions, ratings, and location check-ins on Google Maps.",
    note: "Direct profile link. Official Google Business profile synchronization available upon business account authorization.",
    verifiedListing: true,
  },
];

export const reviewCategories = [
  { id: "cleanliness", label: "Cleanliness", hint: "Room and shared space hygiene" },
  { id: "staff", label: "Staff & Service", hint: "Reception, friendliness, and attentiveness" },
  { id: "comfort", label: "Room Comfort", hint: "Bed quality, quietness, and atmosphere" },
  { id: "location", label: "Location", hint: "Access to city, Lake Tana, and transport" },
  { id: "dining", label: "Dining", hint: "Breakfast, restaurant, and beverage experience" },
  { id: "overall", label: "Overall Experience", hint: "Overall value and stay satisfaction" },
] as const;

export type ReviewCategoryId = (typeof reviewCategories)[number]["id"];
