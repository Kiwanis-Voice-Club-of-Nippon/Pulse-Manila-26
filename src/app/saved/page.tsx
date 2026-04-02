import { SavedSessionList } from "@/components/pulse/saved-session-list";
import { getPublishedSessions } from "@/lib/pulse-data";

export default function SavedPage() {
  const sessions = getPublishedSessions();

  return (
    <div className="page-grid">
      <section className="content-card p-6">
        <p className="eyebrow">Saved sessions</p>
        <h1 className="section-title">A lightweight personal shortlist stored on this device</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 muted-copy">
          Saved sessions stay in local storage so attendees do not need accounts or onboarding. This is meant to be
          simple and reliable, not a full itinerary system.
        </p>
      </section>
      <SavedSessionList sessions={sessions} />
    </div>
  );
}
