import type { Metadata } from "next";
import { rooms } from "@/content/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Explore comfortable rooms at Winn Hotel, Bahir Dar. Enquire about availability for your stay.",
};

export default function RoomsPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sage mb-4">Accommodation</p>
          <h1 className="font-serif text-5xl md:text-6xl text-lake max-w-2xl leading-[1.05]">
            Rooms for every kind of stay.
          </h1>
          <p className="mt-6 max-w-xl text-charcoal/65 text-lg leading-relaxed">
            Comfortable accommodation for business, leisure, couples, and
            families. Room categories, rates, and sizes shown here are structural
            drafts pending hotel confirmation.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.06}>
              <RoomCard room={room} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-16 text-center">
          <p className="text-charcoal/60 mb-6">
            Ready to plan your visit? Send a reservation enquiry.
          </p>
          <Button href="/booking">Enquire about a room</Button>
        </div>
      </section>
    </>
  );
}
