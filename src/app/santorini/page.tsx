import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Santorini from "@/components/sections/santorini";

export const metadata: Metadata = {
  title: "Explore Santorini",
  description:
    "Discover the top destinations in Santorini — Oia, Fira, Red Beach, Akrotiri, Black Beach and more. Let our local guides take you there.",
};

export default function SantoriniPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <div className="bg-ink px-[5%] py-20 text-center">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-[#90D0FF]">
            Top Destinations
          </span>
          <h1 className="font-serif text-[40px] font-bold text-white sm:text-[56px]">
            Explore Santorini
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.8] text-white/65">
            Five iconic destinations, each with their own personality.
            We take you there — and tell you the stories only locals know.
          </p>
        </div>
        <Santorini />
      </main>
      <Footer />
    </>
  );
}
