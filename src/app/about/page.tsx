import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/sections/about";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MyGuide for Santorini — a family-owned transport and tour company with 12+ years of local expertise on the island.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        {/* Page header */}
        <div className="bg-santorini-500 px-[5%] py-20 text-center">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-white/70">
            Our Story
          </span>
          <h1 className="font-serif text-[40px] font-bold text-white sm:text-[56px]">
            About Us
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.8] text-white/75">
            Born in Santorini, built for you — a team of local experts
            dedicated to making your island experience unforgettable.
          </p>
        </div>
        <About />
        <WhyUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
