-- MyGuide for Santorini · Supabase schema
-- Run this in the Supabase SQL editor to provision all tables.

-- ─────────────────────────────────────────
-- 1. CONTACT SUBMISSIONS (public enquiries)
-- ─────────────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

alter table public.contact_submissions enable row level security;

create policy "Public can submit enquiries"
  on public.contact_submissions for insert to anon with check (true);

create policy "Staff can read enquiries"
  on public.contact_submissions for select to authenticated using (true);

create policy "Staff can update enquiries"
  on public.contact_submissions for update to authenticated using (true);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);


-- ─────────────────────────────────────────
-- 2. RESERVATIONS (admin-managed bookings)
-- ─────────────────────────────────────────
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Guest info
  full_name text not null,
  email text not null,
  phone text,

  -- Booking details
  service text not null,
  booking_date date not null,
  booking_time time,
  num_guests integer not null default 1,

  -- Locations
  pickup_location text,
  dropoff_location text,

  -- Extra
  notes text,
  source text not null default 'manual' check (source in ('manual', 'contact_form', 'whatsapp', 'phone')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

alter table public.reservations enable row level security;

-- Only authenticated staff can read/write reservations
create policy "Staff can manage reservations"
  on public.reservations for all to authenticated using (true) with check (true);

-- Allow anon inserts so the contact form can auto-create reservations
create policy "Public can create reservations"
  on public.reservations for insert to anon with check (true);

create index if not exists reservations_booking_date_idx
  on public.reservations (booking_date asc);

create index if not exists reservations_status_idx
  on public.reservations (status);
