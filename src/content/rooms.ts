/**
 * Room inventory is illustrative structure only.
 * Do NOT publish rates, sizes, or category names until hotel management confirms.
 */

export type Room = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  bedConfiguration: string;
  occupancy: string;
  size?: string;
  sizeConfirmed: boolean;
  amenities: string[];
  pricePerNight?: number;
  priceCurrency?: string;
  priceConfirmed: boolean;
  images: { src: string; alt: string; placeholder: boolean }[];
  featured?: boolean;
};

export const rooms: Room[] = [
  {
    slug: "standard-room",
    name: "Standard Room",
    shortDescription:
      "A calm, practical room designed for rest after a day in the city.",
    fullDescription:
      "Our Standard Room offers a comfortable place to settle in — thoughtfully arranged for guests visiting Bahir Dar for business or leisure. Exact furnishings and layouts will be confirmed with hotel photography and management review.",
    bedConfiguration: "Double or twin (subject to availability)",
    occupancy: "Up to 2 guests",
    sizeConfirmed: false,
    amenities: [
      "Private bathroom",
      "Complimentary Wi-Fi",
      "Work-friendly desk space",
      "Daily housekeeping",
    ],
    priceConfirmed: false,
    featured: true,
    images: [
      {
        src: "/images/hotel/room-twin.jpg",
        alt: "Twin beds with white linens at Winn Hotel, Bahir Dar",
        placeholder: false,
      },
      {
        src: "/images/hotel/room-interior.jpg",
        alt: "Room desk, wardrobe, and seating area at Winn Hotel",
        placeholder: false,
      },
    ],
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    shortDescription:
      "Extra space and a more considered atmosphere for longer stays.",
    fullDescription:
      "The Deluxe Room is drafted as a more spacious option for couples and guests who value room to unwind. Final naming, features, and imagery require management confirmation.",
    bedConfiguration: "King or queen (subject to confirmation)",
    occupancy: "Up to 2 guests",
    sizeConfirmed: false,
    amenities: [
      "Private bathroom",
      "Complimentary Wi-Fi",
      "Seating area",
      "Daily housekeeping",
      "Enhanced room amenities",
    ],
    priceConfirmed: false,
    featured: true,
    images: [
      {
        src: "/images/hotel/room-deluxe.jpg",
        alt: "Deluxe room with mosquito net and seating area at Winn Hotel",
        placeholder: false,
      },
      {
        src: "/images/hotel/view-lake.jpg",
        alt: "Lake and city view from a Winn Hotel balcony",
        placeholder: false,
      },
    ],
  },
  {
    slug: "family-room",
    name: "Family Room",
    shortDescription:
      "Practical comfort for families exploring Bahir Dar together.",
    fullDescription:
      "A family-friendly option structured for shared stays. Bed configuration, capacity, and photography must be verified before publication.",
    bedConfiguration: "Multiple beds (configuration to be confirmed)",
    occupancy: "Family occupancy (confirm with hotel)",
    sizeConfirmed: false,
    amenities: [
      "Private bathroom",
      "Complimentary Wi-Fi",
      "Space for families",
      "Daily housekeeping",
    ],
    priceConfirmed: false,
    images: [
      {
        src: "/images/hotel/room-twin.jpg",
        alt: "Spacious twin-bed room suitable for family stays at Winn Hotel",
        placeholder: false,
      },
      {
        src: "/images/hotel/room-interior.jpg",
        alt: "Family room wardrobe and bathroom entry at Winn Hotel",
        placeholder: false,
      },
    ],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}
