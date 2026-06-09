create table if not exists clients (
  id text primary key,
  display_name text,
  coach_name text,
  stage_label text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references clients(id) on delete cascade,
  visitor_id text not null,
  page_started text,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id bigint generated always as identity primary key,
  client_id text not null references clients(id) on delete cascade,
  session_id text not null,
  visitor_id text not null,
  event_type text not null,
  page text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists checkins (
  id bigint generated always as identity primary key,
  client_id text not null references clients(id) on delete cascade,
  visitor_id text not null,
  body_state text,
  emotion_state text,
  cognition_state text,
  blocker text,
  win text,
  created_at timestamptz not null default now()
);

alter table sessions enable row level security;
alter table events enable row level security;
alter table checkins enable row level security;

drop policy if exists "anon insert sessions" on sessions;
create policy "anon insert sessions"
on sessions
for insert
to anon
with check (true);

drop policy if exists "anon insert events" on events;
create policy "anon insert events"
on events
for insert
to anon
with check (true);

drop policy if exists "anon insert checkins" on checkins;
create policy "anon insert checkins"
on checkins
for insert
to anon
with check (true);

insert into clients (id, display_name, coach_name, stage_label)
values ('test_mom_001', '测试妈妈 001', '营养师', '哺乳期 · 新手妈妈')
on conflict (id) do nothing;
