import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/content";
import Reveal from "@/components/ui/reveal";
import ContactForm from "@/components/sections/contact-form";
import { WhatsAppIcon } from "@/components/ui/social-icons";

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-[5%] py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-santorini-500">
            Get in Touch
          </span>
          <h2 className="mb-5 font-serif text-[32px] font-bold leading-[1.15] text-ink sm:text-[44px] lg:text-[52px]">
            Start Your Santorini Journey
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.8] text-ink-muted">
            Ready to book? Have a question? We respond to every enquiry
            within 2 hours — often much sooner.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-santorini-50">
                <Phone className="text-santorini-500" size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="mb-1 text-sm font-bold text-ink">Phone &amp; WhatsApp</h4>
                <p className="text-sm text-ink-muted">{siteConfig.phone}</p>
                <p className="text-sm text-ink-muted">Available 24 hours, 7 days</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-santorini-50">
                <Mail className="text-santorini-500" size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="mb-1 text-sm font-bold text-ink">Email</h4>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-muted hover:text-santorini-500">
                  {siteConfig.email}
                </a>
                <p className="text-sm text-ink-muted">Response within 2 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-santorini-50">
                <MapPin className="text-santorini-500" size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h4 className="mb-1 text-sm font-bold text-ink">Location</h4>
                <p className="text-sm text-ink-muted">Fira, Santorini 847 00</p>
                <p className="text-sm text-ink-muted">Cyclades, Greece</p>
              </div>
            </div>
          </div>

          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#1EBF5A] hover:shadow-[0_8px_28px_rgba(37,211,102,0.4)]"
          >
            <WhatsAppIcon size={20} className="text-white" />
            Chat on WhatsApp
          </a>

          <div className="mt-8 overflow-hidden rounded-2xl border border-santorini-500/10">
            <iframe
              title="MyGuide for Santorini location in Fira, Santorini"
              src="https://www.google.com/maps?q=Fira,Santorini,Greece&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl border border-santorini-500/10 bg-off-white p-7 sm:p-10">
            <h3 className="mb-7 font-serif text-2xl font-bold text-ink">
              Send an Enquiry
            </h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
