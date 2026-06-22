-- AegeanRide · Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision
-- the table that backs the Contact form on the website.

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

-- Allow anyone (anon key, i.e. the public website) to INSERT a new
-- enquiry, but never read, update, or delete existing rows.
create policy "Public can submit enquiries"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Reading/managing submissions is restricted to authenticated staff
-- accounts (e.g. via the Supabase dashboard or an internal admin app).
create policy "Staff can read enquiries"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

create policy "Staff can update enquiries"
  on public.contact_submissions
  for update
  to authenticated
  using (true);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
