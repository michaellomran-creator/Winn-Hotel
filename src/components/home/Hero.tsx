"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_IMAGE = "/images/hotel/entrance.jpg";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-lake-deep">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 scale-105"
          initial={reduce ? false : { scale: 1.12 }}
          animate={reduce ? undefined : { scale: 1.05 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Winn Hotel entrance on Giorgis Road, Bahir Dar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </motion.div>
        <div className="absolute inset-0 hero-scrim" />
        <div className="absolute inset-0 texture-grain opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 pb-28 md:pb-32 pt-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="max-w-2xl"
        >
          <p className="label-caps text-sand/90 mb-5">Welcome to Bahir Dar</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-ivory leading-[0.95] tracking-tight">
            Your Stay,
            <br />
            Your Welcome.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ivory/80 leading-relaxed">
            Discover comfortable accommodation and warm hospitality in the heart
            of Bahir Dar.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/rooms" variant="onDark">
              Explore Our Rooms
            </Button>
            <Button href="/contact" variant="onDarkOutline">
              Contact the Hotel
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
