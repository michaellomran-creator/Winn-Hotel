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
    /** Verify exact street address with management */
    addressLine: "Giorgis Road, Bahir Dar, Ethiopia",
    addressNeedsConfirmation: true,
    near: "Central city area · Convenient reach of Lake Tana",
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
  { href: "/explore", label: "Explore Bahir Dar" },
  { href: "/contact", label: "Contact" },
] as const;
