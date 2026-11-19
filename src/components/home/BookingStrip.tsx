import { BookingForm } from "@/components/booking/BookingForm";

export function BookingStrip() {
  return (
    <section className="relative z-20 -mt-16 md:-mt-20 px-5 md:px-8">
      <div className="mx-auto max-w-7xl shadow-[0_20px_50px_-24px_rgba(23,59,74,0.35)]">
        <BookingForm compact />
      </div>
    </section>
  );
}
