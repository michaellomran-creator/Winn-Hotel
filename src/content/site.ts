/**
 * Central site content — update here without redesigning the UI.
 * Fields marked needsConfirmation must be verified with hotel management before launch.
 */

export const site = {
  name: "Winn Hotel",
  tagline: "A Comfortable Stay. A Warm Welcome. The Heart of Bahir Dar.",
  /** Proposed creative direction — subject to management approval */
  creativeDirectionProposed: true,
  location: {
    city: "Bahir Dar",
    country: "Ethiopia",
    /** Address: Giorgis Road, near Flavor Juice & Pizzeria */
    addressLine: "Giorgis Road, near Flavor Juice & Pizzeria, Bahir Dar, Ethiopia",
    addressNeedsConfirmation: true,
    landmark: "Near Flavor Juice & Pizzeria",
    coordinatesVerified: false,
    near: "Central city area · Convenient reach of Lake Tana",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Winn+Hotel,+Giorgis+Road,+near+Flavor+Juice+%26+Pizzeria,+Bahir+Dar,+Ethiopia",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Winn+Hotel,+Giorgis+Road,+near+Flavor+Juice+%26+Pizzeria,+Bahir+Dar,+Ethiopia",
  },
  contact: {
    phone: "+251 93 041 5765",
    phoneNeedsConfirmation: false,
    email: "",
    emailNeedsConfirmation: true,
    whatsapp: "",
    whatsappNeedsConfirmation: true,
  },
  hours: {
    reception: "24 hours",
    receptionNeedsConfirmation: true,
  },
  social: {
    /** Add verified profiles when available */
    facebook: "",
    instagram: "",
    tripadvisor:
      "https://www.tripadvisor.com/Hotel_Review-g480192-d16805637-Reviews-Wynn_Hotel_Bahir_Dar-Bahir_Dar_Amhara_Region.html",
  },
  booking: {
    mode: "enquiry" as const,
    note: "Your request will be reviewed by our team. You will receive confirmation separately — this is not an instant booking.",
  },
  seo: {
    title: "Winn Hotel | Comfortable Stay in the Heart of Bahir Dar",
    description:
      "Winn Hotel offers warm hospitality and comfortable accommodation on Giorgis Road in Bahir Dar — a convenient base for Lake Tana and the city.",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/gallery", label: "Gallery" },
  { href: "/explore", label: "Explore" },
  { href: "/reviews", label: "Guest Reviews" },
  { href: "/contact", label: "Contact" },
] as const;
