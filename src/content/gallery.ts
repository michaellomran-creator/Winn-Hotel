export type GalleryItem = {
  id: string;
  category: "Rooms" | "Dining" | "Interiors" | "Exterior" | "Destination";
  src: string;
  alt: string;
  placeholder: boolean;
};

/**
 * Property photography from Winn Hotel, Bahir Dar.
 * Dining images remain placeholders until restaurant photography is supplied.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    category: "Rooms",
    src: "/images/hotel/room-twin.jpg",
    alt: "Twin guest room with rose petal welcome at Winn Hotel",
    placeholder: false,
  },
  {
    id: "2",
    category: "Rooms",
    src: "/images/hotel/room-deluxe.jpg",
    alt: "Deluxe bedroom with mosquito net at Winn Hotel",
    placeholder: false,
  },
  {
    id: "3",
    category: "Dining",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    alt: "Placeholder — dining (replace with Winn Hotel)",
    placeholder: true,
  },
  {
    id: "4",
    category: "Dining",
    src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1600&q=80",
    alt: "Placeholder — breakfast (replace with Winn Hotel)",
    placeholder: true,
  },
  {
    id: "5",
    category: "Interiors",
    src: "/images/hotel/room-interior.jpg",
    alt: "Guest room desk, wardrobe, and seating at Winn Hotel",
    placeholder: false,
  },
  {
    id: "6",
    category: "Exterior",
    src: "/images/hotel/entrance.jpg",
    alt: "Winn Hotel entrance on Giorgis Road, Bahir Dar",
    placeholder: false,
  },
  {
    id: "7",
    category: "Destination",
    src: "/images/hotel/view-lake.jpg",
    alt: "Palm-lined street and Lake Tana view from a Winn Hotel balcony",
    placeholder: false,
  },
  {
    id: "8",
    category: "Destination",
    src: "/images/hotel/view-city.jpg",
    alt: "Bahir Dar cityscape from a Winn Hotel balcony",
    placeholder: false,
  },
];

export const galleryCategories = [
  "All",
  "Rooms",
  "Dining",
  "Interiors",
  "Exterior",
  "Destination",
] as const;
