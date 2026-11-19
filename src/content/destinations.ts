/**
 * Destination attractions near Bahir Dar — not hotel-owned facilities.
 * Imagery depicts the destination region, not the hotel property.
 */

export type Destination = {
  slug: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
};

export const destinations: Destination[] = [
  {
    slug: "lake-tana",
    name: "Lake Tana",
    description:
      "Ethiopia’s largest lake — a serene expanse of water, islands, and monastery traditions just beyond the city.",
    image: {
      src: "/images/hotel/view-lake.jpg",
      alt: "Lake Tana visible beyond palm-lined streets from Winn Hotel",
    },
  },
  {
    slug: "blue-nile-falls",
    name: "Blue Nile Falls",
    description:
      "A celebrated day trip from Bahir Dar — powerful falls and dramatic highland scenery.",
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
      alt: "Waterfall landscape representing Blue Nile Falls near Bahir Dar",
    },
  },
  {
    slug: "waterfront",
    name: "Waterfront & Boat Jetty",
    description:
      "Bahir Dar’s lakeside edge — boat trips, evening walks, and views across the water.",
    image: {
      src: "/images/hotel/view-lake.jpg",
      alt: "Palm trees and lake horizon from a Bahir Dar balcony",
    },
  },
  {
    slug: "markets-culture",
    name: "Markets & Local Culture",
    description:
      "Markets, cafés, and everyday city life — a warm introduction to Bahir Dar’s character.",
    image: {
      src: "/images/hotel/view-city.jpg",
      alt: "Bahir Dar city streets and skyline from Winn Hotel",
    },
  },
];
