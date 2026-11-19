import Link from "next/link";
import { navLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-lake-deep text-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl tracking-tight">{site.name}</p>
            <p className="mt-4 max-w-sm text-ivory/70 leading-relaxed">
              {site.tagline}
            </p>
            {site.creativeDirectionProposed ? (
              <p className="mt-3 text-xs text-sand/60 max-w-sm">
                Creative direction proposed for management review.
              </p>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <p className="label-caps text-sand/70 mb-4">Explore</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/80 hover:text-ivory transition-colors focus-ring rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="text-terra hover:text-[#d08a6a] transition-colors focus-ring rounded-sm"
                >
                  Book Your Stay
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label-caps text-sand/70 mb-4">Visit</p>
            <address className="not-italic text-ivory/80 leading-relaxed space-y-2">
              <p>{site.location.addressLine}</p>
              {site.location.addressNeedsConfirmation ? (
                <p className="text-xs text-sand/50">Address pending confirmation</p>
              ) : null}
              <p className="pt-2">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-ivory underline-offset-4 hover:underline focus-ring rounded-sm"
                >
                  {site.contact.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ivory/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-ivory/45">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Bahir Dar, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}
