import Link from "next/link";
import type { HydratedSession } from "@/lib/pulse-data";
import { BookmarkToggle } from "./bookmark-toggle";

function badgeStyle(color: string) {
  return {
    backgroundColor: `${color}18`,
    color,
  };
}

export function SessionCard({
  session,
  showDate = false,
  compact = false,
}: {
  session: HydratedSession;
  showDate?: boolean;
  compact?: boolean;
}) {
  return (
    <article className="content-card flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--accent)]">
            <span>{session.timeLabel}</span>
            {showDate ? <span className="muted-copy">• {session.dateLabel}</span> : null}
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">{session.title}</h3>
            <p className="mt-2 text-sm muted-copy">
              {session.room.name}, {session.venue.name}
            </p>
          </div>
        </div>
        <BookmarkToggle sessionId={session.id} />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="badge" style={badgeStyle(session.track.color)}>
          {session.track.name}
        </span>
        {session.segments.map((segment) => (
          <span key={segment.id} className="badge" style={badgeStyle(segment.color)}>
            {segment.name}
          </span>
        ))}
        {session.sourceType === "aspac_highlight" ? (
          <span className="badge !bg-[var(--warm-soft)] !text-[#8a4d00]">ASPAC highlight</span>
        ) : null}
      </div>

      {!compact ? <p className="text-sm leading-6 muted-copy">{session.description}</p> : null}

      <div className="divider pt-4 text-sm text-[var(--foreground)]">
        <p className="font-semibold">Speakers</p>
        <p className="mt-1 muted-copy">{session.speakerNames.join(", ")}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/schedule/${session.slug}`} className="accent-button !min-h-0 !px-4 !py-2 text-sm">
          Session details
        </Link>
        <Link
          href={`/venues/${session.venue.slug}#${session.room.slug}`}
          className="secondary-button !min-h-0 !px-4 !py-2 text-sm"
        >
          Room info
        </Link>
      </div>
    </article>
  );
}
