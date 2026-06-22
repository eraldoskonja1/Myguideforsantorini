# AegeanRide — Santorini Taxi & Private Tour Guides

An enterprise-grade marketing website for a Santorini taxi and private tour
company, built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (Postgres + Row Level Security) for contact form submissions
- **Icons:** lucide-react
- **Images:** `next/image` with remote Unsplash sources, fully responsive and lazy-loaded

## Project Structure

```
src/
  app/
    layout.tsx        Root layout, SEO metadata, JSON-LD structured data
    page.tsx           Homepage assembling all sections
    globals.css         Design tokens (colors, fonts, animations)
    icon.tsx             Generated favicon
    opengraph-image.tsx  Generated OG/share image
    robots.ts            robots.txt
    sitemap.ts            sitemap.xml
  components/
    layout/             Navbar, Footer
    sections/            Hero, About, Services, Santorini, WhyUs, Testimonials, Contact
    ui/                   Reusable bits: Logo, Reveal (scroll animation), social icons
  lib/
    content.ts            Single source of truth for nav links, services, attractions,
                            testimonials, etc.
    actions/contact.ts     Server Action that validates and inserts enquiries into Supabase
    supabase/
      client.ts             Browser Supabase client
      server.ts              Server Component / Server Action Supabase client
  types/
    database.ts            TypeScript types matching the Supabase schema
supabase/
  schema.sql                SQL to provision the contact_submissions table + RLS policies
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the contents of `supabase/schema.sql`. This creates
   the `contact_submissions` table with Row Level Security so that:
   - Anyone (the public website) can **insert** a new enquiry.
   - Only authenticated staff can **read or update** existing enquiries.
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Project Settings → API):

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm run start
```

## Customizing Content

Almost all copy (services, attractions, testimonials, contact details, nav
links) lives in `src/lib/content.ts`. Edit that file to update the site
without touching component markup.

Brand color (`Santorini Blue #0077CC`) and typography are defined as design
tokens in `src/app/globals.css` under `@theme inline`, and exposed as
Tailwind utilities: `bg-santorini-500`, `text-santorini-700`, `font-serif`,
etc.

## Viewing Contact Form Submissions

Submissions land in the `contact_submissions` table in Supabase. You can:

- View them directly in the Supabase Table Editor (sign in to the dashboard).
- Build a small internal admin page that signs in with a staff Supabase Auth
  account (the RLS policies already allow authenticated reads/updates).

## Deployment

This app deploys cleanly to [Vercel](https://vercel.com/new) (recommended for
Next.js) or any Node.js host. Set the two `NEXT_PUBLIC_SUPABASE_*` environment
variables in your hosting provider's dashboard before building.

## Accessibility & SEO Notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`) throughout.
- All images have descriptive `alt` text.
- Focus-visible outlines on interactive elements.
- `prefers-reduced-motion` respected for scroll-reveal and pulse animations.
- JSON-LD `TouristInformationCenter` structured data in the document head.
- Dynamic `sitemap.xml` and `robots.txt`.
