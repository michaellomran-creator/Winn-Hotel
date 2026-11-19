import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/content/destinations";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function Destination() {
  return (
    <section className="py-24 md:py-32 bg-ivory-soft overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 mb-12">
        <Reveal>
          <p className="label-caps text-sage mb-4">The destination</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl text-lake max-w-xl leading-[1.08]">
              Discover the Beauty of Bahir Dar.
            </h2>
            <p className="max-w-md text-charcoal/65 leading-relaxed">
              Lake Tana, the Blue Nile Falls, and local markets — nearby
              experiences for guests exploring from the city. These are local
              destinations, not hotel-owned facilities.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex gap-4 md:gap-5 overflow-x-auto px-5 md:px-8 pb-4 snap-x snap-mandatory scrollbar-thin">
        {destinations.map((d, i) => (
          <Reveal
            key={d.slug}
            delay={i * 0.06}
            className="snap-start shrink-0 w-[78vw] sm:w-[340px] md:w-[380px]"
          >
            <article className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand/40">
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  className="object-cover img-zoom"
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lake-deep/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <h3 className="font-serif text-2xl">{d.name}</h3>
                  <p className="mt-2 text-sm text-ivory/75 line-clamp-3">
                    {d.description}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 mt-10">
        <Button href="/explore" variant="secondary">
          Explore Bahir Dar
        </Button>
        <Link href="/explore" className="sr-only">
          Full destination guide
        </Link>
      </div>
    </section>
  );
}
