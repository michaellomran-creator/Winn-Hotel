import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photography of Winn Hotel and Bahir Dar — rooms, dining, interiors, and destination views.",
};

export default function GalleryPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="label-caps text-sage mb-4">Gallery</p>
        <h1 className="font-serif text-5xl md:text-6xl text-lake max-w-2xl leading-[1.05]">
          See Winn Hotel.
        </h1>
        <p className="mt-5 max-w-xl text-charcoal/65 text-lg leading-relaxed mb-12">
          Immersive photography of the property and destination — rooms,
          interiors, balcony views, and the hotel entrance in Bahir Dar.
        </p>
        <GalleryGrid />
      </div>
    </section>
  );
}
