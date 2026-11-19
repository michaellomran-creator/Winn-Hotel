import type { Metadata } from "next";
import Image from "next/image";
import { dining } from "@/content/dining";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Restaurant and breakfast at Winn Hotel, Bahir Dar — good food and good moments.",
};

export default function DiningPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-lake text-ivory">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="label-caps text-sand/70 mb-4">Dining</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
            {dining.heading}
          </h1>
          <p className="mt-6 text-lg text-ivory/75 leading-relaxed">
            {dining.intro}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-sand/30">
            <Image
              src={dining.images[0].src}
              alt={dining.images[0].alt}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            {dining.images[0].placeholder ? <PlaceholderBadge /> : null}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl text-lake">Breakfast & beyond</h2>
            <p className="mt-5 text-charcoal/70 text-lg leading-relaxed">
              {dining.breakfast}
            </p>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              {dining.atmosphere}
            </p>
            <div className="mt-8 border-t border-charcoal/10 pt-6 space-y-3 text-sm">
              <p>
                <span className="label-caps text-sage block mb-1">
                  Restaurant name
                </span>
                {dining.restaurantName || "To be confirmed with management"}
              </p>
              <p>
                <span className="label-caps text-sage block mb-1">
                  Opening hours
                </span>
                {dining.openingHoursConfirmed && dining.openingHours
                  ? dining.openingHours
                  : "Hours pending confirmation"}
              </p>
            </div>
            <Button href="/contact" className="mt-8" variant="secondary">
              Enquire about dining
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid sm:grid-cols-2 gap-4">
          {dining.images.slice(1).map((img, i) => (
            <Reveal key={img.src} delay={i * 0.08} className="relative aspect-[16/11] overflow-hidden bg-sand/30">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
