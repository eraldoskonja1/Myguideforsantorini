import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.myguideforsantorini.gr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyGuide for Santorini | Premium Santorini Taxi & Private Tour Guides",
    template: "%s | MyGuide for Santorini",
  },
  description:
    "MyGuide for Santorini offers premium private taxi services, airport transfers, cruise port transfers, and personal Santorini tour guides. Local experts, fixed prices, 24/7 availability.",
  keywords: [
    "Santorini taxi",
    "Santorini private tours",
    "Santorini airport transfer",
    "Santorini tour guide",
    "cruise port transfer Santorini",
    "Santorini wedding transportation",
  ],
  authors: [{ name: "MyGuide for Santorini" }],
  creator: "MyGuide for Santorini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MyGuide for Santorini",
    title: "MyGuide for Santorini | Premium Santorini Taxi & Private Tour Guides",
    description:
      "Discover Santorini with local experts. Private tours, airport transfers, and personalized island experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyGuide for Santorini | Premium Santorini Taxi & Private Tour Guides",
    description:
      "Discover Santorini with local experts. Private tours, airport transfers, and personalized island experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "MyGuide for Santorini",
  image: `${siteUrl}/opengraph-image`,
  "@id": siteUrl,
  url: siteUrl,
  telephone: "+302281060000",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fira",
    addressLocality: "Santorini",
    postalCode: "84700",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.4167,
    longitude: 25.4318,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "https://www.tripadvisor.com/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-ink">{children}</body>
    </html>
  );
}
