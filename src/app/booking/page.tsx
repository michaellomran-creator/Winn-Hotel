import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Booking Enquiry",
  description:
    "Request a stay at Winn Hotel, Bahir Dar. Enquiries are reviewed by our team before confirmation.",
};

export default function BookingPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="label-caps text-sage mb-4">Reservations</p>
        <h1 className="font-serif text-5xl md:text-6xl text-lake leading-[1.05]">
          Book Your Stay
        </h1>
        <p className="mt-5 text-lg text-charcoal/65 leading-relaxed">
          {site.booking.note}
        </p>
        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
