import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function Intro() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          <Reveal className="md:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-sand/30">
              <Image
                src="/images/hotel/room-deluxe.jpg"
                alt="Guest room at Winn Hotel with soft natural light"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 md:-right-6 md:bottom-8 w-[45%] aspect-square border border-sand bg-ivory p-1 hidden sm:block">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/hotel/view-city.jpg"
                  alt="Bahir Dar city view from Winn Hotel"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 md:pl-2" delay={0.12}>
            <p className="label-caps text-sage mb-4">Winn Hotel</p>
            <h2 className="font-serif text-4xl md:text-5xl text-lake leading-[1.08]">
              A Place to Feel at Ease.
            </h2>
            <p className="mt-6 text-charcoal/70 text-lg leading-relaxed">
              Whether you&apos;re visiting Bahir Dar for business, relaxation, or
              exploration, Winn Hotel offers a welcoming place to settle in. Enjoy
              a comfortable stay and discover the city from a convenient location.
            </p>
            <p className="mt-4 text-sm text-sage">
              Proposed website copy — subject to hotel approval.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Our story
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
