import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Winn Hotel — warm Ethiopian hospitality and contemporary urban comfort in Bahir Dar.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-lake text-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sand/70 mb-4">About Winn Hotel</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.02]">
            Warm welcome.
            <br />
            City comfort.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/75 leading-relaxed">
            {site.tagline}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-6 relative aspect-[4/5] overflow-hidden bg-sand/30">
            <Image
              src="/images/hotel/entrance.jpg"
              alt="Winn Hotel entrance and lobby on Giorgis Road, Bahir Dar"
              fill
              className="object-cover object-[center_30%]"
              sizes="50vw"
              priority
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:pl-6" delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl text-lake">
              Hospitality with a sense of place.
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/70 text-lg leading-relaxed">
              <p>
                Winn Hotel is a three-star city hotel on Giorgis Road in Bahir
                Dar — positioned for guests who want comfort, practicality, and
                a genuine welcome close to the city&apos;s everyday rhythm.
              </p>
              <p>
                We welcome domestic travelers, international visitors exploring
                Lake Tana and the Blue Nile Falls, business guests who need
                reliable connectivity, and families looking for an accessible
                base in the heart of Bahir Dar.
              </p>
              <p>
                Our philosophy is simple: make every stay feel at ease —
                approachable, carefully kept, and connected to the city around
                us.
              </p>
            </div>
            <p className="mt-4 text-sm text-sage">
              Brand story draft — subject to hotel management approval.
            </p>
            <Button href="/rooms" className="mt-8" variant="secondary">
              Explore rooms
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-sand/25">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-3 gap-10">
          {[
            {
              t: "Warm hospitality",
              d: "A sincere welcome for Ethiopian and international guests alike.",
            },
            {
              t: "Practical comfort",
              d: "Rooms and services designed for real travel — rest, work, and explore.",
            },
            {
              t: "City location",
              d: "On Giorgis Road, with convenient access to Bahir Dar and Lake Tana.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 0.08}>
              <p className="label-caps text-sage mb-3">0{i + 1}</p>
              <h3 className="font-serif text-2xl text-lake">{item.t}</h3>
              <p className="mt-3 text-charcoal/65 leading-relaxed">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
