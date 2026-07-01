import Link from "next/link";
import { siteConfig } from "@/lib/content";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      {/* SVG Logo Icon — Santorini scene: road, car, church domes, sun, sea */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Circular arc background */}
        <circle cx="24" cy="22" r="20" stroke="#0077CC" strokeWidth="1.5" fill="none" strokeDasharray="100 20" />

        {/* Sea / caldera background */}
        <ellipse cx="14" cy="26" rx="10" ry="7" fill="#0077CC" opacity="0.85" />

        {/* Sun */}
        <circle cx="10" cy="20" r="4" fill="#F5A623" />

        {/* Sailboat */}
        <polygon points="14,25 16,20 18,25" fill="white" opacity="0.9" />
        <line x1="16" y1="20" x2="16" y2="26" stroke="white" strokeWidth="0.8" />

        {/* Small church / bell tower (left) */}
        <rect x="19" y="18" width="4" height="8" fill="white" rx="0.5" />
        <path d="M19 18 Q21 14 23 18" fill="#0077CC" />
        <line x1="20.5" y1="15" x2="21.5" y2="15" stroke="white" strokeWidth="0.7" />
        <line x1="21" y1="14.5" x2="21" y2="15.5" stroke="white" strokeWidth="0.7" />

        {/* Large church dome (right) */}
        <rect x="26" y="16" width="8" height="10" fill="white" rx="0.5" />
        <path d="M26 16 Q30 10 34 16" fill="#0077CC" />
        <line x1="29.5" y1="11.5" x2="30.5" y2="11.5" stroke="white" strokeWidth="0.8" />
        <line x1="30" y1="11" x2="30" y2="12" stroke="white" strokeWidth="0.8" />
        {/* Arch windows */}
        <path d="M28 20 Q29 18 30 20" fill="#0077CC" opacity="0.6" />
        <path d="M31 20 Q32 18 33 20" fill="#0077CC" opacity="0.6" />

        {/* Road leading forward */}
        <path d="M10 36 Q24 28 38 36" stroke="#0055AA" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M14 35 Q24 29 34 35" stroke="white" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />

        {/* Car (dark navy, side silhouette) */}
        <g transform="translate(22, 29)">
          {/* Car body */}
          <rect x="0" y="3" width="12" height="5" rx="1.5" fill="#003E6B" />
          {/* Car roof */}
          <path d="M2 3 Q3 0 10 0 Q12 0 12 3" fill="#003E6B" />
          {/* Windows */}
          <path d="M3 3 Q4 1 7 1 Q8 1 8 3" fill="#6BA4D0" opacity="0.7" />
          <path d="M8.5 3 Q9 1 11 1 Q12 1 12 3" fill="#6BA4D0" opacity="0.7" />
          {/* Wheels */}
          <circle cx="3" cy="8" r="2" fill="#001A33" />
          <circle cx="3" cy="8" r="0.8" fill="#6BA4D0" />
          <circle cx="9" cy="8" r="2" fill="#001A33" />
          <circle cx="9" cy="8" r="0.8" fill="#6BA4D0" />
        </g>
      </svg>

      {/* Text lockup matching the logo: My + Guide stacked look */}
      <span className="flex flex-col leading-[1.05]">
        <span className="flex items-baseline gap-0">
          <span
            className={`font-serif text-[22px] font-bold italic transition-colors ${
              light ? "text-white" : "text-santorini-900"
            }`}
          >
            My
          </span>
          <span
            className={`font-serif text-[22px] font-bold transition-colors ${
              light ? "text-blue-300" : "text-santorini-500"
            }`}
          >
            Guide
          </span>
        </span>
        <span
          className={`text-[8px] font-bold uppercase tracking-[3px] border-t transition-colors ${
            light
              ? "text-white/80 border-white/30"
              : "text-santorini-700 border-santorini-300"
          }`}
        >
          for Santorini
        </span>
        <span
          className={`text-[7px] font-medium uppercase tracking-[1.5px] transition-colors ${
            light ? "text-white/55" : "text-ink-muted"
          }`}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
