import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoom, rooms } from "@/content/rooms";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room" };
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  return (
    <>
      <section className="pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sage mb-3">
            <Link href="/rooms" className="hover:text-lake focus-ring rounded-sm">
              Rooms
            </Link>
            <span className="mx-2">/</span>
            {room.name}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-lake">{room.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal/65">
            {room.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-12 gap-3 md:gap-4">
          {room.images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden bg-sand/30 ${
                i === 0
                  ? "md:col-span-8 aspect-[16/11]"
                  : "md:col-span-4 aspect-[4/5] md:aspect-auto"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes={i === 0 ? "70vw" : "30vw"}
                priority={i === 0}
              />
              {img.placeholder && i === 0 ? <PlaceholderBadge /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-3xl text-lake">About this room</h2>
            <p className="mt-5 text-charcoal/70 text-lg leading-relaxed">
              {room.fullDescription}
            </p>
            <dl className="mt-10 grid sm:grid-cols-2 gap-6">
              <div>
                <dt className="label-caps text-sage">Bed</dt>
                <dd className="mt-2 text-charcoal">{room.bedConfiguration}</dd>
              </div>
              <div>
                <dt className="label-caps text-sage">Occupancy</dt>
                <dd className="mt-2 text-charcoal">{room.occupancy}</dd>
              </div>
              <div>
                <dt className="label-caps text-sage">Size</dt>
                <dd className="mt-2 text-charcoal">
                  {room.sizeConfirmed && room.size
                    ? room.size
                    : "To be confirmed"}
                </dd>
              </div>
              <div>
                <dt className="label-caps text-sage">Rate</dt>
                <dd className="mt-2 text-charcoal">
                  {room.priceConfirmed
                    ? `${room.priceCurrency} ${room.pricePerNight} / night`
                    : "Available on request"}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="bg-sand/25 border border-charcoal/8 p-8">
              <h3 className="font-serif text-2xl text-lake">Room features</h3>
              <ul className="mt-6 space-y-3">
                {room.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex gap-3 text-charcoal/75 text-sm md:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-terra shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-sage">
                Check-in / check-out times pending hotel confirmation.
              </p>
              <Button href="/booking" className="mt-8 w-full">
                Enquire about this room
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
