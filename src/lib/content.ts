export const siteConfig = {
  name: "MyGuide for Santorini",
  tagline: "Your Journey, Our Passion",
  phone: "+30 228 106 0000",
  phoneHref: "+302281060000",
  whatsappHref: "https://wa.me/302281060000",
  email: "info@myguideforsantorini.gr",
  address: "Fira, Santorini 847 00, Cyclades, Greece",
  mapsUrl: "https://maps.google.com/?q=Fira+Santorini",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Santorini", href: "#santorini" },
];

export const heroStats = [
  { value: "5,000+", label: "Happy Clients" },
  { value: "12+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24/7", label: "Available" },
];

export const aboutFeatures = [
  { title: "Licensed & Insured", desc: "Fully certified drivers" },
  { title: "Local Knowledge", desc: "12+ years on the island" },
  { title: "Fixed Pricing", desc: "No hidden surprises" },
  { title: "Luxury Vehicles", desc: "Air-conditioned fleet" },
];

export type Service = {
  id: string;
  icon: "plane" | "car" | "compass" | "ship" | "heart" | "users";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "airport-transfers",
    icon: "plane",
    title: "Airport Transfers",
    description:
      "Door-to-door service from Santorini Airport to your hotel. We track your flight and wait for you — guaranteed punctuality.",
  },
  {
    id: "private-taxi",
    icon: "car",
    title: "Private Taxi Service",
    description:
      "Reliable, comfortable taxis across the entire island on-demand. Fixed rates, no meters, no stress — just your journey, your way.",
  },
  {
    id: "island-tours",
    icon: "compass",
    title: "Santorini Island Tours",
    description:
      "Full-day and half-day custom tours. Oia at sunset, Fira by day, hidden villages — designed around what you actually want to see.",
  },
  {
    id: "cruise-transfers",
    icon: "ship",
    title: "Cruise Port Transfers",
    description:
      "Hassle-free pick-up and drop-off at Athinios and Old Port. We coordinate with your cruise schedule so you never miss your ship.",
  },
  {
    id: "wedding-transport",
    icon: "heart",
    title: "Wedding Transportation",
    description:
      "Make your special day seamless. Elegant fleet transfers for the couple and guests, decorated vehicles, professional coordination.",
  },
  {
    id: "tour-guide",
    icon: "users",
    title: "Personal Tour Guide",
    description:
      "A dedicated English-speaking Santorini expert who knows every hidden gem, story, and local secret the island holds.",
  },
];

export type Attraction = {
  id: string;
  tag: string;
  name: string;
  description: string;
  image: string;
};

export const attractions: Attraction[] = [
  {
    id: "oia",
    tag: "Village",
    name: "Oia",
    description:
      "The world-famous sunset village. Blue-domed churches, art galleries, and the finest caldera views — arrive early to claim your spot.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=80",
  },
  {
    id: "fira",
    tag: "Capital",
    name: "Fira",
    description:
      "The vibrant heart of Santorini. Cliffside restaurants, museums, cable cars to the old port, and nightlife that lasts till sunrise.",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&q=80",
  },
  {
    id: "red-beach",
    tag: "Beach",
    name: "Red Beach",
    description:
      "Dramatic crimson volcanic cliffs cascade into turquoise Aegean waters. One of Europe's most visually striking beaches.",
    image:
      "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?w=900&q=80",
  },
  {
    id: "akrotiri",
    tag: "Archaeology",
    name: "Akrotiri",
    description:
      'A Minoan Bronze Age city preserved under volcanic ash — the "Pompeii of the Aegean." Two storeys of frescoes, pottery, and wonder.',
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=900&q=80",
  },
  {
    id: "black-beach",
    tag: "Beach",
    name: "Black Beach (Perissa)",
    description:
      "Jet-black volcanic sand, warm crystal waters, and a relaxed taverna scene. A favourite among visitors who want to linger.",
    image:
      "https://images.unsplash.com/photo-1508669232496-137b159c1cdb?w=900&q=80",
  },
];

export type WhyUsItem = {
  num: string;
  icon: "heart" | "clock" | "tag" | "car" | "language" | "award";
  title: string;
  description: string;
};

export const whyUsItems: WhyUsItem[] = [
  {
    num: "01",
    icon: "heart",
    title: "Local Experts",
    description:
      "Our team was born and raised on Santorini. We don't read from a script — we share the island we call home.",
  },
  {
    num: "02",
    icon: "clock",
    title: "24/7 Availability",
    description:
      "Late flight? Early cruise? Night pickup? We are always on. No automated messages — a real person answers every time.",
  },
  {
    num: "03",
    icon: "tag",
    title: "Fixed Prices",
    description:
      "All prices are agreed before you travel. No meter, no surge, no surprises. What you're quoted is exactly what you pay.",
  },
  {
    num: "04",
    icon: "car",
    title: "Comfortable Vehicles",
    description:
      "Modern, air-conditioned, immaculately clean vehicles. From sleek sedans to spacious minivans for larger groups.",
  },
  {
    num: "05",
    icon: "language",
    title: "English-Speaking Drivers",
    description:
      "Every driver speaks fluent English. Communicate easily, ask questions, get genuine local recommendations.",
  },
  {
    num: "06",
    icon: "award",
    title: "Trusted by Tourists",
    description:
      "Over 5,000 five-star reviews across Google, TripAdvisor, and Booking.com. Our reputation speaks for itself.",
  },
];

export type Testimonial = {
  id: string;
  initials: string;
  name: string;
  origin: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    initials: "SC",
    name: "Sarah & Chris",
    origin: "London, United Kingdom",
    rating: 5,
    quote:
      "Our driver Nikos was phenomenal — he drove us to every major site and suggested a tiny taverna in Pyrgos that became the highlight of our entire trip.",
  },
  {
    id: "t2",
    initials: "MR",
    name: "Marcus & Rebecca",
    origin: "New York, USA",
    rating: 5,
    quote:
      "MyGuide for Santorini handled our entire wedding transportation. 14 guests, 3 vehicles, perfectly coordinated. They made a stressful day effortlessly beautiful.",
  },
  {
    id: "t3",
    initials: "YT",
    name: "Yuki Tanaka",
    origin: "Tokyo, Japan",
    rating: 5,
    quote:
      "I arrived at 2 AM on a delayed flight. My driver was there with a sign and genuine warmth. The best first impression any island could give a solo traveller.",
  },
  {
    id: "t4",
    initials: "AP",
    name: "Anna & Pierre",
    origin: "Paris, France",
    rating: 5,
    quote:
      "The full-day island tour was exceptional. Our guide explained the geology, mythology, and history of every site without making it feel like a lecture.",
  },
  {
    id: "t5",
    initials: "JW",
    name: "James Wilson",
    origin: "Sydney, Australia",
    rating: 5,
    quote:
      "We were a group of 8 and booked the full Santorini package. Three days, every transfer, all tours — flawlessly organised. The gold standard for island transport.",
  },
  {
    id: "t6",
    initials: "LM",
    name: "Laura Martinez",
    origin: "Barcelona, Spain",
    rating: 5,
    quote:
      "From cruise ship to Oia and back in one perfect afternoon. Our guide even waited an extra 20 minutes at sunset so we could watch it fully.",
  },
];

export const serviceOptions = [
  "Airport Transfer",
  "Private Taxi",
  "Island Tour",
  "Cruise Port Transfer",
  "Wedding Transportation",
  "Personal Tour Guide",
  "Other",
] as const;
