import { Hero } from "@/components/home/Hero";
import { BookingStrip } from "@/components/home/BookingStrip";
import { Intro } from "@/components/home/Intro";
import { RoomsPreview } from "@/components/home/RoomsPreview";
import { DiningPreview } from "@/components/home/DiningPreview";
import { Facilities } from "@/components/home/Facilities";
import { Destination } from "@/components/home/Destination";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingStrip />
      <Intro />
      <RoomsPreview />
      <DiningPreview />
      <Facilities />
      <Destination />
      <GalleryPreview />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
