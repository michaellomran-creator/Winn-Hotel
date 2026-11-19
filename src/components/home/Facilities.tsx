import {
  Wifi,
  UtensilsCrossed,
  Plane,
  ConciergeBell,
  MapPin,
} from "lucide-react";
import { facilities } from "@/content/facilities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const icons = {
  wifi: Wifi,
  restaurant: UtensilsCrossed,
  transfer: Plane,
  reception: ConciergeBell,
  location: MapPin,
};

export function Facilities() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            label="Services"
            title="Thoughtful guest comforts."
            description="Services listed reflect commonly reported amenities and require hotel confirmation before launch."
            className="mb-14"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {facilities.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal key={f.id} delay={i * 0.05}>
                <div className="flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-sand/50 text-lake flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.5} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-lake">{f.title}</h3>
                    <p className="mt-2 text-charcoal/65 leading-relaxed text-sm md:text-base">
                      {f.description}
                    </p>
                    {!f.confirmed ? (
                      <p className="mt-2 text-xs text-sage">Pending confirmation</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
