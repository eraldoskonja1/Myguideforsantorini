import Image from "next/image";
import { Compass, MessageCircle } from "lucide-react";
import { heroStats } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=85"
        alt="Iconic Santorini caldera view with white buildings and blue-domed church"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,40,80,0.82)] via-[rgba(0,80,150,0.55)] to-[rgba(0,40,80,0.4)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-[5%] pt-24">
        <div className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-[18px] py-2 text-xs font-semibold uppercase tracking-[1.5px] text-white/90 backdrop-blur-md">
          <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-[#4FC3F7]" />
          Santorini&apos;s #1 Rated Transport &amp; Tour Company
        </div>

        <h1
          className="animate-fade-up mb-6 max-w-[780px] font-serif text-[42px] font-bold leading-[1.1] text-white sm:text-[56px] lg:text-[82px]"
          style={{ animationDelay: "0.15s" }}
        >
          Discover Santorini
          <br />
          with <em className="italic text-[#90D0FF]">Local Experts</em>
        </h1>

        <p
          className="animate-fade-up mb-11 max-w-[560px] text-base font-light leading-[1.7] text-white/85 sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Private Tours, Airport Transfers, Taxi Services and Personalized
          Experiences crafted exclusively for you.
        </p>

        <div
          className="animate-fade-up flex flex-wrap gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2.5 rounded-full bg-santorini-500 px-9 py-4 text-[15px] font-semibold text-white shadow-[0_4px_24px_rgba(0,119,204,0.5)] transition-all hover:-translate-y-0.5 hover:bg-santorini-700 hover:shadow-[0_8px_32px_rgba(0,119,204,0.6)]"
          >
            <Compass size={18} strokeWidth={2.5} />
            Book a Tour
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/40 bg-white/10 px-9 py-4 text-[15px] font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            Contact Us
          </a>
        </div>
      </div>

      <div
        className="animate-fade-up absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/10 bg-white/5 backdrop-blur-xl sm:flex"
        style={{ animationDelay: "0.6s" }}
      >
        {heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex-1 px-5 py-7 text-center ${
              i !== heroStats.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="font-serif text-[36px] font-bold leading-none text-white">
              {stat.value}
            </div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-white/65">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
