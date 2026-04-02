import Link from "next/link";
import { notFound } from "next/navigation";
import { BookmarkToggle } from "@/components/pulse/bookmark-toggle";
import { SessionCard } from "@/components/pulse/session-card";
import { getPublishedSessions, getRelatedSessions, getSessionBySlug } from "@/lib/pulse-data";

type SessionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedSessions().map((session) => ({ slug: session.slug }));
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  const { slug } = await params;
  const session = getSessionBySlug(slug);

  if (!session) {
    notFound();
  }

  const relatedSessions = getRelatedSessions(session).slice(0, 3);

  return (
    <div className="page-grid">
      <section className="glass-panel rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Session detail</p>
            <h1 className="section-title">{session.title}</h1>
            <p className="max-w-2xl text-base leading-7 muted-copy">{session.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="pill !bg-[var(--accent-soft)] !text-[var(--accent-strong)]">{session.timeLabel}</span>
              <span className="pill">{session.dateLabel}</span>
              <span className="pill">{session.track.name}</span>
              <span className="pill">{session.room.name}</span>
              {session.sourceType === "aspac_highlight" ? (
                <span className="pill !bg-[var(--warm-soft)] !text-[#8a4d00]">ASPAC highlight</span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <BookmarkToggle sessionId={session.id} />
            <Link href={`/venues/${session.venue.slug}#${session.room.slug}`} className="secondary-button">
              Room details
            </Link>
            {session.externalUrl ? (
              <Link href={session.externalUrl} target="_blank" rel="noreferrer" className="accent-button">
                Official source
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="content-card p-6">
          <p className="eyebrow">Session notes</p>
          <div className="mt-4 space-y-4 text-sm leading-7 muted-copy">
            <p>
              <span className="font-semibold text-[var(--foreground)]">Speakers:</span> {session.speakerNames.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-[var(--foreground)]">Venue:</span> {session.venue.name}
            </p>
            <p>
              <span className="font-semibold text-[var(--foreground)]">Room:</span> {session.room.name} on{" "}
              {session.room.floor}
            </p>
            <p>
              <span className="font-semibold text-[var(--foreground)]">Segments:</span>{" "}
              {session.segments.map((segment) => segment.name).join(", ")}
            </p>
            {session.notes ? (
              <p>
                <span className="font-semibold text-[var(--foreground)]">Additional note:</span> {session.notes}
              </p>
            ) : null}
          </div>
        </div>

        <div className="content-card p-6">
          <p className="eyebrow">Room wayfinding</p>
          <div className="mt-4 space-y-3 text-sm leading-7 muted-copy">
            <p>{session.room.notes}</p>
            <p>
              <span className="font-semibold text-[var(--foreground)]">Map label:</span> {session.room.mapLabel}
            </p>
            <p>{session.venue.notes}</p>
            {session.venue.mapUrl ? (
              <Link href={session.venue.mapUrl} target="_blank" rel="noreferrer" className="font-semibold text-[var(--accent)]">
                Open venue map
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="page-grid">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Keep moving</p>
            <h2 className="section-title">Related sessions</h2>
          </div>
          <Link href="/schedule" className="font-semibold text-[var(--accent)]">
            Back to full schedule
          </Link>
        </div>
        {relatedSessions.map((relatedSession) => (
          <SessionCard key={relatedSession.id} session={relatedSession} showDate />
        ))}
      </section>
    </div>
  );
}
