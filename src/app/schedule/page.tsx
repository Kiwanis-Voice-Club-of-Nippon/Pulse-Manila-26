import Link from "next/link";
import { FilterForm } from "@/components/pulse/filter-form";
import { SessionCard } from "@/components/pulse/session-card";
import { filterSessions, listScheduleDays, type ScheduleFilters } from "@/lib/pulse-data";

type SchedulePageProps = {
  searchParams: Promise<{
    day?: string;
    q?: string;
    segment?: string;
    track?: string;
    room?: string;
  }>;
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const resolved = await searchParams;
  const filters: ScheduleFilters = {
    day: resolved.day || undefined,
    q: resolved.q || undefined,
    segment: resolved.segment || undefined,
    track: resolved.track || undefined,
    room: resolved.room || undefined,
  };

  const sessions = filterSessions(filters);
  const days = listScheduleDays();

  return (
    <div className="page-grid">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="content-card p-6">
          <p className="eyebrow">Schedule</p>
          <h1 className="section-title">Browse by day, track, room, or audience segment</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 muted-copy">
            This view is optimized for fast scanning on mobile. Apply one or two filters when you need speed and leave
            everything open when you just want the full program.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {days.map((day) => (
              <Link
                key={day.value}
                href={`/schedule?day=${day.value}`}
                className="chip-link"
                data-active={filters.day === day.value}
              >
                {day.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="content-card p-6">
          <p className="eyebrow">Results</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{sessions.length}</h2>
          <p className="mt-2 text-sm muted-copy">
            Published sessions match the current filter set. Clear filters when you need the full convention view.
          </p>
        </div>
      </section>

      <FilterForm filters={filters} />

      {sessions.length === 0 ? (
        <div className="content-card p-6">
          <h2 className="text-xl font-semibold tracking-[-0.03em]">No sessions match this filter set</h2>
          <p className="mt-2 text-sm muted-copy">
            Try a broader search or clear one of the segment, track, or room filters.
          </p>
        </div>
      ) : (
        <div className="page-grid">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} showDate />
          ))}
        </div>
      )}
    </div>
  );
}
