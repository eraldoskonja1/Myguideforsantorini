import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Services from "@/components/sections/services";
import WhyUs from "@/components/sections/why-us";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Airport transfers, private taxi, island tours, cruise port transfers, wedding transportation and personal tour guides in Santorini.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <div className="bg-santorini-500 px-[5%] py-20 text-center">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-white/70">
            What We Offer
          </span>
          <h1 className="font-serif text-[40px] font-bold text-white sm:text-[56px]">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.8] text-white/75">
            Every service tailored to your schedule, your preferences,
            and your comfort — from arrival to departure.
          </p>
        </div>
        <Services />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
