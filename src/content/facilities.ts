/**
 * Only include facilities repeatedly mentioned online or confirmed by management.
 * Do not advertise pool, spa, gym, etc. without verification.
 */

export type Facility = {
  id: string;
  title: string;
  description: string;
  confirmed: boolean;
  icon: "wifi" | "restaurant" | "transfer" | "reception" | "location";
};

export const facilities: Facility[] = [
  {
    id: "wifi",
    title: "Complimentary Wi-Fi",
    description:
      "Stay connected for work and travel planning throughout your stay.",
    confirmed: false,
    icon: "wifi",
  },
  {
    id: "restaurant",
    title: "Restaurant & Breakfast",
    description:
      "On-site dining with breakfast service for a convenient start to the day.",
    confirmed: false,
    icon: "restaurant",
  },
  {
    id: "transfer",
    title: "Airport Transfer",
    description:
      "Transfer arrangements may be available on request — confirm with reception.",
    confirmed: false,
    icon: "transfer",
  },
  {
    id: "reception",
    title: "Welcoming Reception",
    description:
      "A warm welcome and practical assistance for your stay in Bahir Dar.",
    confirmed: false,
    icon: "reception",
  },
  {
    id: "location",
    title: "Central Location",
    description:
      "On Giorgis Road — well placed for the city centre and Lake Tana excursions.",
    confirmed: false,
    icon: "location",
  },
];
