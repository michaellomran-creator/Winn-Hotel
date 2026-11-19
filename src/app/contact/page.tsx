import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { InteractiveMap } from "@/components/contact/InteractiveMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Winn Hotel in Bahir Dar — address, phone, directions, and enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="label-caps text-sage mb-4">Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl text-lake max-w-2xl leading-[1.05]">
            We&apos;re here to help.
          </h1>
          <p className="mt-5 max-w-xl text-charcoal/65 text-lg">
            Reach the hotel for reservations, directions, or questions about your
            stay in Bahir Dar.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="label-caps text-sage mb-2">Address</p>
              <p className="text-lg text-charcoal">{site.location.addressLine}</p>
              <p className="text-xs text-charcoal/60 mt-1">
                Landmark: {site.location.landmark}
              </p>
              {site.location.addressNeedsConfirmation ? (
                <p className="text-xs text-sage mt-1">
                  Exact GPS coordinates pending management confirmation
                </p>
              ) : null}
            </div>
            <div>
              <p className="label-caps text-sage mb-2">Phone</p>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="text-lg text-terra hover:underline focus-ring rounded-sm"
              >
                {site.contact.phone}
              </a>
            </div>
            <div>
              <p className="label-caps text-sage mb-3">Interactive Location & Directions</p>
              <InteractiveMap />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
