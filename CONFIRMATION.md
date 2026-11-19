# Pre-launch confirmation checklist — Winn Hotel

All items below must be verified with hotel management before public launch.

## Brand & copy
- [ ] Approve or replace proposed creative direction: “A Comfortable Stay. A Warm Welcome. The Heart of Bahir Dar.”
- [ ] Approve homepage / about / dining website copy
- [ ] Confirm three-star positioning language

## Contact & location
- [x] Address set to known location: Giorgis Road, near Flavor Juice & Pizzeria, Bahir Dar, Ethiopia
- [x] Interactive Google Maps embed and "Get Directions" link implemented
- [ ] Confirm exact GPS latitude & longitude coordinates with management to replace temporary address search query
- [ ] Official reservations email
- [ ] WhatsApp number (if offered)
- [ ] Reception hours

## Rooms & rates
- [ ] Official room category names
- [ ] Bed configurations per room
- [ ] Occupancy limits
- [ ] Room sizes (m²)
- [ ] Nightly rates and currency
- [ ] Check-in / check-out times
- [ ] Amenity list per room

## Facilities
- [ ] Confirm Wi-Fi
- [ ] Confirm restaurant & breakfast
- [ ] Confirm airport transfer (and terms)
- [ ] Do **not** publish pool / spa / gym / etc. unless verified

## Dining
- [ ] Restaurant name (if any)
- [ ] Opening hours
- [ ] Breakfast inclusions
- [ ] Menu / cuisine notes (only if approved)

## Photography
- [ ] Replace all temporary Unsplash placeholders with real Winn Hotel photos:
  - Exterior / entrance
  - Lobby & reception
  - Each room type
  - Bathrooms
  - Restaurant / breakfast
  - Shared spaces
- [ ] Destination imagery may remain regional (Lake Tana, etc.) with clear labeling

## Booking & Enquiries
- [ ] Confirm enquiry email / webhook (`ENQUIRY_WEBHOOK_URL`)
- [ ] Or integrate verified booking engine if one exists
- [ ] Keep “awaiting confirmation” messaging if no live booking API

## Reviews & Testimonials
- [x] Tripadvisor listing linked: `https://www.tripadvisor.com/Hotel_Review-g480192-d16805637-Reviews-Wynn_Hotel_Bahir_Dar-Bahir_Dar_Amhara_Region.html`
- [ ] Supply official Tripadvisor widget embed code or Partner API access token if automatic rating & review count synchronization is desired
- [ ] Confirm Google Business Profile claim for Google Maps reviews integration
- [x] Dedicated Guest Reviews page (`/reviews`) and submission form implemented
- [x] Review moderation portal (`/admin/reviews`) configured — set `ADMIN_MODERATION_KEY` in production (.env)
- [ ] Never manufacture or fabricate reviews; publish only verified, approved guest submissions

## Technical
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Set `ADMIN_MODERATION_KEY` (secret key for `/admin/reviews` moderation portal)
- [ ] Configure production enquiry & review notification webhook (`ENQUIRY_WEBHOOK_URL`)
- [ ] Final accessibility / performance pass
