import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Winn Hotel in Bahir Dar — address, phone, and enquiry form.",
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
            stay.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="label-caps text-sage mb-2">Address</p>
              <p className="text-lg text-charcoal">{site.location.addressLine}</p>
              {site.location.addressNeedsConfirmation ? (
                <p className="text-xs text-sage mt-1">Pending confirmation</p>
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
              <p className="label-caps text-sage mb-2">Map</p>
              <div className="mt-3 aspect-[4/3] bg-sand/40 border border-charcoal/10 flex items-center justify-center text-sm text-charcoal/50 p-6 text-center">
                Google Maps embed — add verified coordinates after address
                confirmation.
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  site.location.addressLine,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-terra hover:underline focus-ring rounded-sm"
              >
                Open in Google Maps →
              </a>
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
