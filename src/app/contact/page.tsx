import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MyGuide for Santorini. Book a tour, arrange a transfer or ask any question — we reply within 2 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <div className="bg-santorini-500 px-[5%] py-20 text-center">
          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-white/70">
            Get in Touch
          </span>
          <h1 className="font-serif text-[40px] font-bold text-white sm:text-[56px]">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.8] text-white/75">
            Ready to book? Have a question? We respond to every enquiry
            within 2 hours — often much sooner.
          </p>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
