import type { Metadata } from "next";
import Image from "next/image";
import { destinations } from "@/content/destinations";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Explore Bahir Dar",
  description:
    "Discover Lake Tana, Blue Nile Falls, and local markets from Winn Hotel in Bahir Dar.",
};

export default function ExplorePage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-lake text-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sand/70 mb-4">Destination</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.02]">
            Discover the Beauty of Bahir Dar.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/75 leading-relaxed">
            Winn Hotel is a convenient base for experiencing the city and its
            surroundings. Attractions below are local destinations — not
            hotel-owned facilities or tours unless confirmed by management.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-20 md:space-y-28">
          {destinations.map((d, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={d.slug}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                <Reveal
                  className={`md:col-span-7 relative aspect-[16/11] overflow-hidden bg-sand/30 ${
                    reverse ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    className="object-cover"
                    sizes="60vw"
                    priority={i === 0}
                  />
                </Reveal>
                <Reveal
                  className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}
                  delay={0.1}
                >
                  <p className="label-caps text-sage mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-serif text-4xl text-lake">{d.name}</h2>
                  <p className="mt-5 text-charcoal/70 text-lg leading-relaxed">
                    {d.description}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-24 text-center px-5">
        <p className="text-charcoal/65 mb-6 max-w-md mx-auto">
          Ready to experience Bahir Dar? Enquire about your stay at Winn Hotel.
        </p>
        <Button href="/booking">Book Your Stay</Button>
      </section>
    </>
  );
}
