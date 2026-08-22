-- Portfolio CMS: Supabase setup
-- Run this in Supabase Dashboard -> SQL Editor.
-- Then create ONE admin user in Authentication -> Users.
-- Disable public sign-ups after creating your admin user.

create table if not exists public.portfolio_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_data enable row level security;

drop policy if exists "Public can read portfolio data" on public.portfolio_data;
create policy "Public can read portfolio data"
on public.portfolio_data
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated admins can insert portfolio data" on public.portfolio_data;
create policy "Authenticated admins can insert portfolio data"
on public.portfolio_data
for insert
to authenticated
with check (auth.uid() is not null);

drop policy if exists "Authenticated admins can update portfolio data" on public.portfolio_data;
create policy "Authenticated admins can update portfolio data"
on public.portfolio_data
for update
to authenticated
using (auth.uid() is not null)
with check (auth.uid() is not null);

drop policy if exists "Authenticated admins can delete portfolio data" on public.portfolio_data;
create policy "Authenticated admins can delete portfolio data"
on public.portfolio_data
for delete
to authenticated
using (auth.uid() is not null);

-- Enable realtime updates for the table.
do $$
begin
  alter publication supabase_realtime add table public.portfolio_data;
exception
  when duplicate_object then null;
end $$;
