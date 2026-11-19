"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  galleryCategories,
  galleryItems,
  type GalleryItem,
} from "@/content/gallery";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [filter, setFilter] =
    useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === filter);

  function step(dir: number) {
    if (!active) return;
    const idx = filtered.findIndex((i) => i.id === active.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setActive(next);
  }

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, filtered]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 text-sm rounded-sm border transition-colors focus-ring",
              filter === cat
                ? "bg-lake text-ivory border-lake"
                : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/35",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="relative break-inside-avoid w-full overflow-hidden bg-sand/30 group focus-ring block text-left"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover img-zoom"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {item.placeholder ? <PlaceholderBadge /> : null}
              <span className="absolute top-3 right-3 label-caps bg-ivory/90 text-lake px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] bg-lake-deep/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-ivory p-2 focus-ring rounded-sm"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X size={24} />
          </button>
          <button
            type="button"
            className="absolute left-3 md:left-8 text-ivory p-2 focus-ring rounded-sm"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft size={32} />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[16/11]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            type="button"
            className="absolute right-3 md:right-8 text-ivory p-2 focus-ring rounded-sm"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      ) : null}
    </>
  );
}
