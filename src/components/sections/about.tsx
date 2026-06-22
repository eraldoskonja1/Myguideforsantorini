import Image from "next/image";
import { Award, Check } from "lucide-react";
import { aboutFeatures } from "@/lib/content";
import Reveal from "@/components/ui/reveal";

export default function About() {
  return (
    <section id="about" className="bg-off-white px-[5%] py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80"
              alt="Santorini white buildings and blue domes overlooking the caldera"
              width={800}
              height={440}
              className="h-[320px] w-full rounded-3xl object-cover shadow-[0_20px_60px_rgba(0,119,204,0.16)] sm:h-[440px]"
            />
            <Image
              src="https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80"
              alt="Local Santorini guide welcoming guests"
              width={220}
              height={160}
              className="absolute -bottom-8 -right-8 hidden h-[160px] w-[220px] rounded-2xl border-[5px] border-white object-cover shadow-[0_8px_32px_rgba(0,119,204,0.12)] sm:block"
            />
            <div className="absolute -left-5 top-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_8px_32px_rgba(0,119,204,0.12)] sm:-left-5">
              <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[10px] bg-santorini-50">
                <Award className="text-santorini-500" size={22} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-serif text-[22px] font-bold leading-none text-santorini-500">
                  Award
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-muted">
                  Best Tour Operator 2024
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-santorini-500">
            About MyGuide for Santorini
          </span>
          <h2 className="mb-5 font-serif text-[32px] font-bold leading-[1.15] text-ink sm:text-[44px] lg:text-[52px]">
            Born in Santorini,
            <br />
            Built for You
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.8] text-ink-muted">
            We are a family-owned Santorini transport and tour company with
            over 12 years of deep island knowledge. Our mission is simple:
            give every visitor a genuine, stress-free, and unforgettable
            Greek island experience.
          </p>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.8] text-ink-muted">
            From the moment your plane lands to the evening you watch the
            sun sink into the Aegean, we are with you — fluent in English,
            steeped in local culture, and committed to service that feels
            personal, never transactional.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-xl border border-santorini-500/10 bg-white p-4"
              >
                <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-santorini-50">
                  <Check className="text-santorini-500" size={14} strokeWidth={2.8} />
                </span>
                <span>
                  <p className="text-sm font-semibold text-ink">{feature.title}</p>
                  <span className="text-xs text-ink-muted">{feature.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
