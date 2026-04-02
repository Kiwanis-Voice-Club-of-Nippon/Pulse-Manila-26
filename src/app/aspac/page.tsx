import { SessionCard } from "@/components/pulse/session-card";
import { getAspacHighlights } from "@/lib/pulse-data";

export default function AspacPage() {
  const highlights = getAspacHighlights();

  return (
    <div className="page-grid">
      <section className="content-card p-6">
        <p className="eyebrow">ASPAC</p>
        <h1 className="section-title">ASPAC-focused highlights without the noise of the full program</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 muted-copy">
          This filter exists because delegation leaders and ASPAC attendees often need a shorter, high-confidence view
          during the day. Keep it tight and practical.
        </p>
      </section>

      {highlights.map((session) => (
        <SessionCard key={session.id} session={session} showDate />
      ))}
    </div>
  );
}
