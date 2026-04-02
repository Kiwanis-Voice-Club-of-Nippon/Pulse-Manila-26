# Admin Onboarding

## Intended admin roles

- Owner: environment, deployment, and publishing control
- Editor: session, announcement, venue, and segment updates
- Event-week operator: announcement and publish-only workflow

## Minimum onboarding checklist

1. Confirm the person should have admin access.
2. Add the admin user in Supabase Auth and `admin_users`.
3. Assign the smallest role needed.
4. Walk through the content operations guide.
5. Test a draft announcement in preview before event week.

## Guardrails

- Admin access is for staff and approved editors only.
- Attendees should never need accounts.
- Every content mutation should land in the audit log.
- Editors should publish only after cross-checking with official convention sources.

## Event-week expectations

- Keep announcements short and operational.
- Update room or time changes immediately.
- Use pinned announcements sparingly.
- If there is uncertainty, link or defer to the official source rather than inventing interpretation.
