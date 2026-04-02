import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionCard } from "@/components/pulse/session-card";
import { getVenueBySlug, getVenueDetails } from "@/lib/pulse-data";

type VenueDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getVenueDetails().map((venue) => ({ slug: venue.slug }));
}

export default async function VenueDetailPage({ params }: VenueDetailPageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  return (
    <div className="page-grid">
      <section className="glass-panel rounded-[32px] p-6 sm:p-8">
        <p className="eyebrow">Venue detail</p>
        <h1 className="section-title">{venue.name}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 muted-copy">{venue.address}</p>
        <p className="mt-4 max-w-3xl text-base leading-7 muted-copy">{venue.notes}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {venue.mapUrl ? (
            <Link href={venue.mapUrl} target="_blank" rel="noreferrer" className="accent-button">
              Open map
            </Link>
          ) : null}
          <Link href="/venues" className="secondary-button">
            All venues
          </Link>
        </div>
      </section>

      <section className="content-card p-6">
        <p className="eyebrow">Rooms</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {venue.rooms.map((room) => (
            <div key={room.id} id={room.slug} className="rounded-[22px] border border-[var(--line)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{room.name}</h2>
                  <p className="mt-1 text-sm muted-copy">{room.floor}</p>
                </div>
                <div className="pill">{room.sessions.length} sessions</div>
              </div>
              <p className="mt-4 text-sm leading-6 muted-copy">{room.notes}</p>
              <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">Map label: {room.mapLabel}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-grid">
        <div>
          <p className="eyebrow">Sessions here</p>
          <h2 className="section-title">Published schedule for this venue</h2>
        </div>
        {venue.sessions.map((session) => (
          <SessionCard key={session.id} session={session} showDate />
        ))}
      </section>
    </div>
  );
}
