create table if not exists events (
  id text primary key,
  slug text unique not null,
  name text not null,
  city text not null,
  country text not null,
  start_date date not null,
  end_date date not null,
  timezone text not null,
  published boolean not null default false
);

create table if not exists venues (
  id text primary key,
  slug text unique not null,
  name text not null,
  address text not null,
  notes text not null default '',
  map_url text,
  published boolean not null default false
);

create table if not exists rooms (
  id text primary key,
  venue_id text not null references venues(id) on delete cascade,
  slug text unique not null,
  name text not null,
  floor text not null default '',
  notes text not null default '',
  map_label text not null default '',
  published boolean not null default false
);

create table if not exists segments (
  id text primary key,
  slug text unique not null,
  name text not null,
  description text not null default '',
  color text not null default '#172033'
);

create table if not exists tracks (
  id text primary key,
  slug text unique not null,
  name text not null,
  description text not null default '',
  color text not null default '#172033'
);

create table if not exists sessions (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text not null default '',
  speaker_names text[] not null default '{}',
  start_at timestamptz not null,
  end_at timestamptz not null,
  room_id text not null references rooms(id),
  venue_id text not null references venues(id),
  track_id text not null references tracks(id),
  published boolean not null default false,
  featured boolean not null default false,
  source_type text not null check (source_type in ('official_program', 'aspac_highlight', 'manual')),
  external_url text,
  notes text
);

create table if not exists session_segments (
  session_id text not null references sessions(id) on delete cascade,
  segment_id text not null references segments(id) on delete cascade,
  primary key (session_id, segment_id)
);

create table if not exists announcements (
  id text primary key,
  title text not null,
  body text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  priority text not null check (priority in ('critical', 'high', 'standard')),
  pinned boolean not null default false,
  segment_id text references segments(id),
  published boolean not null default false,
  created_by text not null
);

create table if not exists resources (
  id text primary key,
  title text not null,
  description text not null default '',
  type text not null,
  url text,
  file_path text,
  segment_id text references segments(id),
  published boolean not null default false
);

create table if not exists admin_users (
  id text primary key,
  email text unique not null,
  role text not null,
  full_name text not null,
  active boolean not null default true
);

create table if not exists audit_logs (
  id bigint generated always as identity primary key,
  actor_id text references admin_users(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists sessions_start_at_idx on sessions (start_at);
create index if not exists sessions_track_id_idx on sessions (track_id);
create index if not exists announcements_starts_at_idx on announcements (starts_at);
