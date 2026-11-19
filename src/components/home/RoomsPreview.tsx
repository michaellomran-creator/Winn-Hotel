import { rooms } from "@/content/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function RoomsPreview() {
  const featured = rooms.filter((r) => r.featured).slice(0, 2);
  const list = featured.length ? featured : rooms.slice(0, 2);

  return (
    <section className="py-24 md:py-28 bg-sand/25 texture-grain">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <Reveal>
            <SectionHeading
              label="Accommodation"
              title="Rooms made for rest."
              description="Comfortable spaces for travelers, families, and guests exploring Bahir Dar. Room details and rates require management confirmation before publication."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/rooms" variant="ghost">
              View all rooms
            </Button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {list.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.08}>
              <RoomCard room={room} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
