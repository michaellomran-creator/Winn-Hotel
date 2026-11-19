import {
  testimonials,
  testimonialsSectionNote,
} from "@/content/testimonials";
import { Reveal } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section className="py-24 md:py-28 bg-sand/20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="label-caps text-sage mb-4">Guest voices</p>
          <h2 className="font-serif text-4xl md:text-5xl text-lake">
            Words from our guests.
          </h2>
        </Reveal>

        {testimonials.length === 0 ? (
          <Reveal delay={0.08}>
            <div className="mt-12 border border-dashed border-charcoal/20 bg-ivory/60 px-8 py-14 text-center max-w-2xl">
              <p className="text-charcoal/60 leading-relaxed">
                {testimonialsSectionNote}
              </p>
              <p className="mt-3 text-xs text-sage">
                No fictional reviews are displayed.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <blockquote className="bg-white p-8 border border-charcoal/8">
                  <p className="font-serif text-2xl text-lake leading-snug">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-charcoal/60">
                    <cite className="not-italic font-medium text-charcoal">
                      {t.name}
                    </cite>
                    <span className="mx-2">·</span>
                    <span>{t.source}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
