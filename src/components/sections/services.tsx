import { Plane, Car, Compass, Ship, Heart, Users, ArrowRight, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/lib/content";
import Reveal from "@/components/ui/reveal";

const iconMap: Record<Service["icon"], LucideIcon> = {
  plane: Plane,
  car: Car,
  compass: Compass,
  ship: Ship,
  heart: Heart,
  users: Users,
};

export default function Services() {
  return (
    <section id="services" className="bg-white px-[5%] py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-santorini-500">
              What We Offer
            </span>
            <h2 className="font-serif text-[32px] font-bold leading-[1.15] text-ink sm:text-[44px] lg:text-[52px]">
              Our Premium Services
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-[340px] text-[17px] leading-[1.8] text-ink-muted">
              Every service is tailored to your schedule, your preferences,
              and your comfort.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.id} delay={(i % 3) * 100}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-santorini-500/10 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_60px_rgba(0,119,204,0.16)]">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-santorini-500 to-[#00AAFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-6 grid h-[60px] w-[60px] place-items-center rounded-[14px] bg-santorini-50 transition-colors duration-300 group-hover:bg-white/20">
                    <Icon
                      className="text-santorini-500 transition-colors duration-300 group-hover:text-white"
                      size={28}
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-ink transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-ink-muted transition-colors duration-300 group-hover:text-white/90">
                    {service.description}
                  </p>
                  <a
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-santorini-500 transition-colors duration-300 group-hover:text-white/90"
                  >
                    Book Now
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
