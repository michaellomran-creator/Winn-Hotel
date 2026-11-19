# Winn Hotel — Bahir Dar

Premium hospitality website for **Winn Hotel**, Bahir Dar, Ethiopia.

**Creative direction (proposed):** *A Comfortable Stay. A Warm Welcome. The Heart of Bahir Dar.*

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (respects `prefers-reduced-motion`)
- Content modules in `src/content/` for easy updates

## Getting started

```bash
cd winn-hotel
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage narrative + booking strip |
| `/about` | Hotel story |
| `/rooms` | Room categories |
| `/rooms/[slug]` | Room detail + enquiry CTA |
| `/dining` | Restaurant / breakfast |
| `/gallery` | Immersive gallery + lightbox |
| `/explore` | Bahir Dar destinations |
| `/contact` | Location + contact form |
| `/booking` | Full reservation enquiry |

## Content updates

Edit TypeScript modules under `src/content/`:

- `site.ts` — brand, contact, SEO
- `rooms.ts` — inventory (confirm before publish)
- `facilities.ts` — services
- `dining.ts` — F&B copy
- `destinations.ts` — Explore Bahir Dar
- `gallery.ts` — gallery images
- `testimonials.ts` — verified reviews only

## Booking enquiry

`POST /api/enquiry` validates and accepts reservation requests.

- Does **not** claim instant booking
- Optional: set `ENQUIRY_WEBHOOK_URL` to forward payloads
- In development, enquiries log to the server console

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ENQUIRY_WEBHOOK_URL=
```

## Before launch

See [CONFIRMATION.md](./CONFIRMATION.md) for management verification items (rates, facilities, contacts, photography).

Mood / composition references used during design live in `public/references/`.
