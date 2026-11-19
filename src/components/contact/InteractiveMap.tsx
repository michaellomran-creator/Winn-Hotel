import Link from "next/link";
import { MapPin, Navigation, ExternalLink, AlertCircle } from "lucide-react";
import { site } from "@/content/site";

interface InteractiveMapProps {
  className?: string;
}

export function InteractiveMap({ className = "" }: InteractiveMapProps) {
  // Known address confirmed by user specification
  const destinationQuery = encodeURIComponent(
    "Winn Hotel, Giorgis Road, near Flavor Juice & Pizzeria, Bahir Dar, Ethiopia",
  );
  const embedUrl = `https://maps.google.com/maps?q=${destinationQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${destinationQuery}`;

  return (
    <div
      className={`border border-charcoal/10 bg-white overflow-hidden shadow-sm ${className}`}
    >
      {/* Header bar with visible hotel marker & location identity */}
      <div className="p-4 bg-sand/15 border-b border-charcoal/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-sm bg-terra text-white mt-0.5 shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-lg font-medium text-lake leading-tight">
                {site.name}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-medium bg-ivory text-lake border border-lake/15 rounded-sm">
                Bahir Dar, Ethiopia
              </span>
            </div>
            <p className="text-xs text-charcoal/70 mt-0.5">
              {site.location.addressLine}
            </p>
          </div>
        </div>

        {/* Temporary Search Notice Badge */}
        <div className="flex items-center gap-1.5 text-[0.72rem] text-charcoal/65 bg-white/80 px-2.5 py-1 rounded-sm border border-charcoal/10 shrink-0">
          <AlertCircle size={13} className="text-terra shrink-0" />
          <span>Address-based map · GPS pending confirmation</span>
        </div>
      </div>

      {/* Interactive Responsive Google Maps Embed */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[300px] md:min-h-[380px] bg-sand/20">
        <iframe
          src={embedUrl}
          title="Interactive Google Map showing Winn Hotel in Bahir Dar, Ethiopia"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Action Footer with 'Get Directions' and Google Maps Link */}
      <div className="p-4 bg-ivory-soft/60 border-t border-charcoal/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xs text-charcoal/65">
          <span className="font-medium text-charcoal">Landmark:</span>{" "}
          {site.location.landmark}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-terra text-white hover:bg-[#a66244] transition-colors rounded-sm focus-ring"
            aria-label="Get Directions to Winn Hotel on Google Maps"
          >
            <Navigation size={13} />
            <span>Get Directions</span>
          </Link>

          <Link
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-lake hover:text-terra border border-charcoal/15 bg-white hover:border-terra/40 transition-colors rounded-sm focus-ring"
          >
            <span>Open in Google Maps</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
