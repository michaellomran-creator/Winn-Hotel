import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/content/rooms";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Button } from "@/components/ui/Button";

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  const image = room.images[0];

  return (
    <article className="group flex flex-col">
      <Link
        href={`/rooms/${room.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-sand/40 focus-ring block"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover img-zoom"
          priority={index < 2}
        />
        {image.placeholder ? <PlaceholderBadge /> : null}
      </Link>

      <div className="pt-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl md:text-3xl text-lake">
            <Link href={`/rooms/${room.slug}`} className="focus-ring rounded-sm">
              {room.name}
            </Link>
          </h3>
          {!room.priceConfirmed ? (
            <span className="text-xs text-sage whitespace-nowrap">Rate on request</span>
          ) : (
            <span className="text-sm text-charcoal/70">
              {room.priceCurrency} {room.pricePerNight}
              <span className="text-charcoal/40"> / night</span>
            </span>
          )}
        </div>
        <p className="mt-3 text-charcoal/65 leading-relaxed flex-1">
          {room.shortDescription}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/55">
          <li>{room.bedConfiguration}</li>
          <li aria-hidden>·</li>
          <li>{room.occupancy}</li>
        </ul>
        <div className="mt-6">
          <Button href={`/rooms/${room.slug}`} variant="ghost" className="!px-0 !py-0 border-0 hover:bg-transparent text-terra hover:text-[#a56146]">
            View room →
          </Button>
        </div>
      </div>
    </article>
  );
}
