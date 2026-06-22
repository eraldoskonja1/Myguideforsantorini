"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/content";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header>
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-[5%] transition-all duration-300 ${
          scrolled
            ? "h-[66px] bg-white/97 backdrop-blur-xl border-b border-santorini-500/10 shadow-[0_2px_12px_rgba(0,119,204,0.08)]"
            : "h-[76px] bg-transparent"
        }`}
      >
        <Logo light={!scrolled} />

        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-santorini-300 after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  scrolled
                    ? "text-ink-soft hover:text-santorini-500"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={`inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                scrolled
                  ? "bg-santorini-500 text-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-santorini-700"
                  : "bg-white text-santorini-500 shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-santorini-50"
              }`}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="md:hidden p-1.5"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className={scrolled ? "text-santorini-700" : "text-white"} size={26} />
          ) : (
            <Menu className={scrolled ? "text-santorini-700" : "text-white"} size={26} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-[66px] inset-x-0 z-40 bg-white border-b border-santorini-500/10 shadow-[0_8px_32px_rgba(0,119,204,0.12)] px-[5%] flex flex-col transition-[max-height,opacity] duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[420px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={`py-3.5 text-[15px] font-medium text-ink-soft border-b border-santorini-500/10 ${
              i === navLinks.length - 1 ? "" : ""
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="py-3.5 text-[15px] font-medium text-ink-soft"
        >
          Contact Us
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-santorini-500 text-white py-3 text-sm font-semibold"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
