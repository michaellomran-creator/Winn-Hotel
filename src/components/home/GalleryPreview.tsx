import Image from "next/image";
import { galleryItems } from "@/content/gallery";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreview() {
  const items = galleryItems.filter((item) => !item.placeholder).slice(0, 6);

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <Reveal>
            <SectionHeading
              label="Gallery"
              title="Moments at Winn."
              description="Rooms, interiors, and views from Winn Hotel in the heart of Bahir Dar."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Button href="/gallery" variant="ghost">
              Open gallery
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {items.map((item, i) => {
            const spans = [
              "md:col-span-5 md:row-span-2",
              "md:col-span-4 md:row-span-1",
              "md:col-span-3 md:row-span-1",
              "md:col-span-4 md:row-span-2",
              "md:col-span-3 md:row-span-1",
              "md:col-span-5 md:row-span-1",
            ];
            return (
              <Reveal
                key={item.id}
                delay={i * 0.04}
                className={`relative overflow-hidden bg-sand/30 group col-span-1 row-span-1 ${spans[i]}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 768px) 50vw, 40vw"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
