import { Heart, Clock, Tag, Car, Languages, Award, type LucideIcon } from "lucide-react";
import { whyUsItems, type WhyUsItem } from "@/lib/content";
import Reveal from "@/components/ui/reveal";

const iconMap: Record<WhyUsItem["icon"], LucideIcon> = {
  heart: Heart,
  clock: Clock,
  tag: Tag,
  car: Car,
  language: Languages,
  award: Award,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-santorini-500 px-[5%] py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-white/70">
            Why MyGuide for Santorini
          </span>
          <h2 className="font-serif text-[32px] font-bold leading-[1.15] text-white sm:text-[44px] lg:text-[52px]">
            The Standard Every Journey Deserves
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsItems.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.num} delay={(i % 3) * 100}>
                <div className="flex h-full flex-col gap-4 bg-[rgba(0,40,80,0.3)] p-9 transition-colors duration-300 hover:bg-[rgba(0,40,80,0.5)]">
                  <span className="font-serif text-5xl font-bold leading-none text-white/15">
                    {item.num}
                  </span>
                  <span className="grid h-[50px] w-[50px] place-items-center rounded-xl bg-white/10">
                    <Icon className="text-white" size={24} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-[1.7] text-white/65">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
