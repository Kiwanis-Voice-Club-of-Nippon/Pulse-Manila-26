import Link from "next/link";
import { getVenueDetails } from "@/lib/pulse-data";

export default function VenuesPage() {
  const venues = getVenueDetails();

  return (
    <div className="page-grid">
      <section className="content-card p-6">
        <p className="eyebrow">Venues</p>
        <h1 className="section-title">Room and venue lookup built for quick movement between sessions</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 muted-copy">
          Each venue page keeps room notes, map links, and the sessions happening there so delegates can move with less
          friction.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {venues.map((venue) => (
          <article key={venue.id} className="content-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">{venue.name}</h2>
                <p className="mt-2 text-sm muted-copy">{venue.address}</p>
              </div>
              <div className="pill">{venue.rooms.length} rooms</div>
            </div>
            <p className="mt-4 text-sm leading-6 muted-copy">{venue.notes}</p>
            <div className="mt-5 space-y-3">
              {venue.rooms.map((room) => (
                <div key={room.id} className="rounded-[20px] border border-[var(--line)] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--foreground)]">{room.name}</p>
                    <p className="text-sm muted-copy">{room.floor}</p>
                  </div>
                  <p className="mt-1 text-sm muted-copy">{room.sessions.length} sessions published</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/venues/${venue.slug}`} className="accent-button !min-h-0 !px-4 !py-2 text-sm">
                Open venue page
              </Link>
              {venue.mapUrl ? (
                <Link
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button !min-h-0 !px-4 !py-2 text-sm"
                >
                  Map
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
