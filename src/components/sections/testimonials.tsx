import { Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import Reveal from "@/components/ui/reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-off-white px-[5%] py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto mb-14 max-w-[600px] text-center">
          <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-santorini-500">
            Guest Reviews
          </span>
          <h2 className="font-serif text-[32px] font-bold leading-[1.15] text-ink sm:text-[44px] lg:text-[52px]">
            Words from Our Travellers
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 100}>
              <div className="relative h-full rounded-2xl border border-santorini-500/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,119,204,0.12)]">
                <span
                  aria-hidden
                  className="absolute right-6 top-5 font-serif text-[64px] leading-none text-santorini-50"
                >
                  &rdquo;
                </span>
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="mb-6 text-[15px] italic leading-[1.8] text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-santorini-500 text-base font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{t.name}</div>
                    <div className="mt-0.5 text-xs text-ink-muted">{t.origin}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-santorini-50 px-2 py-1 text-[10px] font-bold tracking-wide text-santorini-500">
                    Verified
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
