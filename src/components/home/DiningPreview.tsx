import Image from "next/image";
import { dining } from "@/content/dining";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

export function DiningPreview() {
  return (
    <section className="py-24 md:py-32 bg-lake text-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <p className="label-caps text-sand/80 mb-4">Dining</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.08]">
              {dining.heading}
            </h2>
            <p className="mt-6 text-ivory/75 text-lg leading-relaxed">
              {dining.intro}
            </p>
            <p className="mt-4 text-ivory/60 leading-relaxed">{dining.breakfast}</p>
            <Button href="/dining" variant="onDark" className="mt-8">
              Dining at Winn
            </Button>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="grid grid-cols-12 gap-3 md:gap-4">
              <div className="col-span-7 relative aspect-[3/4] overflow-hidden bg-lake-deep">
                <Image
                  src={dining.images[0].src}
                  alt={dining.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                {dining.images[0].placeholder ? <PlaceholderBadge /> : null}
              </div>
              <div className="col-span-5 flex flex-col gap-3 md:gap-4">
                <div className="relative flex-1 min-h-[140px] overflow-hidden bg-lake-deep">
                  <Image
                    src={dining.images[1].src}
                    alt={dining.images[1].alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative flex-1 min-h-[140px] overflow-hidden bg-lake-deep">
                  <Image
                    src={dining.images[2].src}
                    alt={dining.images[2].alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
