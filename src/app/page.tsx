import Link from "next/link";
import { SessionCard } from "@/components/pulse/session-card";
import { getHomeSummary, getVenueDetails } from "@/lib/pulse-data";

export default function HomePage() {
  const summary = getHomeSummary();
  const venues = getVenueDetails();

  return (
    <div className="page-grid">
      <section className="grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="glass-panel rounded-[32px] p-6 sm:p-8">
          <div className="space-y-4">
            <p className="eyebrow">Fast convention access</p>
            <h1 className="section-title max-w-3xl">
              The mobile-first companion for finding sessions, rooms, and real-time updates in seconds.
            </h1>
            <p className="max-w-2xl text-base leading-7 muted-copy sm:text-lg">
              Pulse keeps the convention floor simple: today&apos;s schedule, room details, announcements, and ASPAC
              highlights without attendee login friction or heavy menus.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="content-card p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Today view</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{summary.activeDayLabel}</p>
            </div>
            <div className="content-card p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Published sessions</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{summary.sessionCount}</p>
            </div>
            <div className="content-card p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Rooms live in app</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{summary.roomCount}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/schedule?day=${summary.activeDay}`} className="accent-button">
              Open today&apos;s schedule
            </Link>
            <Link href="/updates" className="secondary-button">
              Latest updates
            </Link>
            <Link href="/aspac" className="secondary-button">
              ASPAC highlights
            </Link>
          </div>
        </div>

        <aside className="content-card p-6">
          <p className="eyebrow">Use it this way</p>
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em]">What Pulse is</h2>
              <p className="mt-2 text-sm leading-6 muted-copy">
                A calm public information layer for schedules, room lookup, and updates when attendees need answers
                fast.
              </p>
            </div>
            <div className="divider pt-4">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">What Pulse is not</h2>
              <p className="mt-2 text-sm leading-6 muted-copy">
                Not a social feed, ticketing system, or replacement for official convention communication.
              </p>
            </div>
            <div className="divider pt-4">
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Best floor workflow</h2>
              <p className="mt-2 text-sm leading-6 muted-copy">
                Scan QR. Open today. Save the sessions you care about. Use room links when moving between venues.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="page-grid">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Today</p>
              <h2 className="section-title">Priority sessions</h2>
            </div>
            <Link href={`/schedule?day=${summary.activeDay}`} className="font-semibold text-[var(--accent)]">
              Full day view
            </Link>
          </div>
          {summary.todaySessions.slice(0, 4).map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>

        <div className="page-grid">
          <div className="content-card p-5">
            <p className="eyebrow">Pinned updates</p>
            <div className="mt-4 space-y-4">
              {summary.pinnedAnnouncements.map((announcement) => (
                <div key={announcement.id} className="rounded-[20px] bg-[var(--warm-soft)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8a4d00]">
                    {announcement.priority}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">{announcement.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6f4b11]">{announcement.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card p-5">
            <p className="eyebrow">ASPAC</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">Highlighted moments</h2>
            <div className="mt-4 space-y-3">
              {summary.highlights.map((session) => (
                <Link
                  key={session.id}
                  href={`/schedule/${session.slug}`}
                  className="block rounded-[20px] bg-[var(--accent-soft)] p-4"
                >
                  <p className="text-sm font-semibold text-[var(--accent-strong)]">{session.timeLabel}</p>
                  <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    {session.title}
                  </p>
                  <p className="mt-1 text-sm muted-copy">{session.room.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="content-card p-6">
          <p className="eyebrow">Venue lookup</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">Room access without guesswork</h2>
          <div className="mt-5 space-y-4">
            {venues.map((venue) => (
              <Link key={venue.id} href={`/venues/${venue.slug}`} className="block rounded-[22px] border border-[var(--line)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em]">{venue.name}</p>
                    <p className="mt-1 text-sm muted-copy">{venue.address}</p>
                  </div>
                  <div className="pill">{venue.rooms.length} rooms</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="content-card p-6">
          <p className="eyebrow">Operating note</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">Designed for low-friction use</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">No attendee login</p>
              <p className="mt-2 text-sm leading-6 muted-copy">
                People open the app instantly from a QR code and start browsing.
              </p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Save locally</p>
              <p className="mt-2 text-sm leading-6 muted-copy">
                Bookmarks stay on-device, which keeps onboarding lightweight and fast.
              </p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Offline-ready shell</p>
              <p className="mt-2 text-sm leading-6 muted-copy">
                Recently viewed pages stay cached so the app remains useful on weaker venue internet.
              </p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--accent)]">Companion messaging</p>
              <p className="mt-2 text-sm leading-6 muted-copy">
                The product language stays aligned with the role Michelle outlined: access over complexity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
