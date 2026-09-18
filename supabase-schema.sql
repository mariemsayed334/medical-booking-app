create table if not exists public.appointments (
  id text primary key,
  doctor_id text not null,
  doctor_name text not null,
  specialty text not null,
  status text not null default 'upcoming',
  patient_name text not null,
  phone text not null,
  date text not null,
  time text not null,
  notes text default '',
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

create index if not exists appointments_date_idx on public.appointments (date);
