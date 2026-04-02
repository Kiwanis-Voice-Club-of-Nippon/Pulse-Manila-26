insert into events (id, slug, name, city, country, start_date, end_date, timezone, published)
values (
  'event-kiwanis-manila-2026',
  'kiwanis-international-convention-manila-2026',
  'Kiwanis International Convention',
  'Manila',
  'Philippines',
  '2026-06-25',
  '2026-06-27',
  'Asia/Manila',
  true
)
on conflict (id) do nothing;

insert into segments (id, slug, name, description, color)
values
  ('segment-aspac', 'aspac', 'ASPAC', 'Asia-Pacific delegates and highlights.', '#0c7a60'),
  ('segment-general', 'general', 'General', 'Core convention programming.', '#2f3f63'),
  ('segment-slp', 'slp', 'SLP / Youth', 'Student leadership programming.', '#a34f12'),
  ('segment-governance', 'governance', 'Governance', 'Governance and business sessions.', '#7440a8'),
  ('segment-leadership', 'leadership', 'Leadership', 'Leadership development and training.', '#1e6aa6')
on conflict (id) do nothing;

insert into tracks (id, slug, name, description, color)
values
  ('track-plenary', 'plenary', 'Plenary', 'Main-stage sessions.', '#2f3f63'),
  ('track-service-impact', 'service-impact', 'Service Impact', 'Programs and community outcomes.', '#0c7a60'),
  ('track-leadership-labs', 'leadership-labs', 'Leadership Labs', 'Practical club and district workshops.', '#1e6aa6'),
  ('track-governance', 'governance', 'Governance', 'Formal business sessions.', '#7440a8'),
  ('track-fellowship', 'fellowship', 'Fellowship', 'Delegation gatherings and receptions.', '#a34f12')
on conflict (id) do nothing;
