import Image from "next/image";
import { attractions } from "@/lib/content";
import Reveal from "@/components/ui/reveal";

export default function Santorini() {
  return (
    <section id="santorini" className="bg-ink px-[5%] py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-[#90D0FF]">
            Top Destinations
          </span>
          <h2 className="mb-5 font-serif text-[32px] font-bold leading-[1.15] text-white sm:text-[44px] lg:text-[52px]">
            Explore the Island
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.8] text-white/60">
            Five iconic destinations, each with their own personality. We
            take you there — and tell you the stories only locals know.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((spot, i) => (
            <Reveal key={spot.id} delay={(i % 3) * 100}>
              <div className="group relative h-[340px] overflow-hidden rounded-2xl">
                <Image
                  src={spot.image}
                  alt={`${spot.name}, Santorini`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(0,20,50,0.92)] via-[rgba(0,20,50,0.3)] to-transparent p-7">
                  <span className="mb-2.5 w-fit rounded-full bg-santorini-500/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-white backdrop-blur-sm">
                    {spot.tag}
                  </span>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-white">
                    {spot.name}
                  </h3>
                  <p className="translate-y-2.5 text-[13px] leading-[1.6] text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {spot.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <div className="flex h-[340px] flex-col items-start justify-center rounded-2xl bg-gradient-to-br from-santorini-500 to-santorini-900 p-10">
              <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-white">
                All Islands
              </span>
              <h3 className="my-4 font-serif text-[28px] font-bold leading-tight text-white">
                Want a Custom Route?
              </h3>
              <p className="mb-7 text-[15px] leading-[1.7] text-white/70">
                Tell us what you love and we&apos;ll build a private
                itinerary around you.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-santorini-500 transition-all hover:-translate-y-0.5 hover:bg-santorini-50"
              >
                Plan My Tour
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
