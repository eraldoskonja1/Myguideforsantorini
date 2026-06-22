import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/content";
import Logo from "@/components/ui/logo";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Santorini", href: "#santorini" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Airport Transfers",
  "Private Taxi",
  "Island Tours",
  "Cruise Transfers",
  "Wedding Transport",
  "Tour Guides",
];

export default function Footer() {
  return (
    <footer className="bg-ink px-[5%] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-14">
          <div>
            <Logo light />
            <p className="mt-4 max-w-[280px] text-sm leading-[1.8] text-white/55">
              Santorini&apos;s most trusted private transport and tour
              company. Born on the island, dedicated to your perfect
              experience since 2012.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] transition-colors hover:bg-santorini-500"
              >
                <InstagramIcon size={18} className="text-white/70 transition-colors hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] transition-colors hover:bg-santorini-500"
              >
                <FacebookIcon size={18} className="text-white/70 transition-colors hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-bold uppercase tracking-wide text-white/40">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-bold uppercase tracking-wide text-white/40">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href="#services" className="text-sm text-white/65 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-bold uppercase tracking-wide text-white/40">
              Contact
            </h4>
            <div className="mb-3.5 flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-santorini-300" strokeWidth={2} />
              <p className="text-[13px] leading-[1.6] text-white/60">{siteConfig.address}</p>
            </div>
            <div className="mb-3.5 flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-santorini-300" strokeWidth={2} />
              <p className="text-[13px] leading-[1.6] text-white/60">{siteConfig.phone}</p>
            </div>
            <div className="mb-3.5 flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-santorini-300" strokeWidth={2} />
              <p className="text-[13px] leading-[1.6] text-white/60">{siteConfig.email}</p>
            </div>
            <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.05] p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/40">
                Working Hours
              </p>
              <p className="text-[13px] leading-[1.8] text-white/60">
                Mon – Sun: Open 24 hours
                <br />
                Airport pickups: Always
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[13px] text-white/35">
            © {new Date().getFullYear()} MyGuide for Santorini. All rights reserved.
            Santorini, Greece.
          </p>
          <p className="text-[13px] text-white/35">
            Privacy Policy · Terms of Service · Sitemap
          </p>
        </div>
      </div>
    </footer>
  );
}
