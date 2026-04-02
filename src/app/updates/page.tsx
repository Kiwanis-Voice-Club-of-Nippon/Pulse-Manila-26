import { getPublishedAnnouncements } from "@/lib/pulse-data";

const priorityTone = {
  critical: "bg-[#ffe1e1] text-[#9a1e1e]",
  high: "bg-[var(--warm-soft)] text-[#8a4d00]",
  standard: "bg-[var(--accent-soft)] text-[var(--accent-strong)]",
};

export default function UpdatesPage() {
  const announcements = getPublishedAnnouncements();

  return (
    <div className="page-grid">
      <section className="content-card p-6">
        <p className="eyebrow">Updates</p>
        <h1 className="section-title">Announcements that are faster to access than a printed panel</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 muted-copy">
          Pulse surfaces pinned and recent updates quickly. This feed should stay short, scannable, and tightly tied to
          convention operations.
        </p>
      </section>

      <div className="page-grid">
        {announcements.map((announcement) => (
          <article key={announcement.id} className="content-card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`badge ${priorityTone[announcement.priority]}`}>{announcement.priority}</span>
              {announcement.segment ? (
                <span className="badge !bg-white !text-[var(--foreground)]">{announcement.segment.name}</span>
              ) : null}
              {announcement.pinned ? <span className="badge !bg-[#172033] !text-white">Pinned</span> : null}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{announcement.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 muted-copy">{announcement.body}</p>
            <p className="mt-4 text-sm muted-copy">Active window: {announcement.activeWindow}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
