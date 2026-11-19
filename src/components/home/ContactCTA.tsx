import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="py-24 md:py-32 bg-lake-deep text-ivory relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(185,111,80,0.25), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(137,148,135,0.2), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <p className="label-caps text-sand/70 mb-4">Location & contact</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.08]">
              Find us in the heart of Bahir Dar.
            </h2>
            <p className="mt-6 text-ivory/70 text-lg leading-relaxed max-w-md">
              {site.location.near}. We look forward to welcoming you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/booking" variant="onDark">
                Book Your Stay
              </Button>
              <Button href="/contact" variant="onDarkOutline">
                Contact details
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <address className="not-italic space-y-6 border border-ivory/15 bg-lake/40 p-8 md:p-10 backdrop-blur-sm">
              <div>
                <p className="label-caps text-sand/60 mb-2">Address</p>
                <p className="text-lg">{site.location.addressLine}</p>
                {site.location.addressNeedsConfirmation ? (
                  <p className="mt-1 text-xs text-sand/50">
                    Exact address pending confirmation
                  </p>
                ) : null}
              </div>
              <div>
                <p className="label-caps text-sand/60 mb-2">Phone</p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="text-lg hover:text-sand transition-colors focus-ring rounded-sm"
                >
                  {site.contact.phone}
                </a>
              </div>
            </address>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
