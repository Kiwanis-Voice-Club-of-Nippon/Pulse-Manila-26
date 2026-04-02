import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="page-grid">
      <section className="glass-panel rounded-[32px] p-6 sm:p-8">
        <p className="eyebrow">About Pulse</p>
        <h1 className="section-title">Pulse is a support layer for convention information access</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 muted-copy">
          The goal is simple: make schedules, updates, and room details easier to reach on mobile. Pulse complements
          official convention communication and should stay lightweight, trustworthy, and easy to operate during event
          week.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="content-card p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Core principles</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 muted-copy">
            <li>Access beats complexity.</li>
            <li>No attendee login required for core use.</li>
            <li>Updates should be clearer than static signage.</li>
            <li>Everything critical should be reachable in two taps.</li>
            <li>The product language stays companion-first, not command-center-first.</li>
          </ul>
        </div>
        <div className="content-card p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Important disclaimer</h2>
          <p className="mt-4 text-sm leading-6 muted-copy">
            Pulse is not an official replacement for Kiwanis communication infrastructure. When there is any conflict
            between Pulse and official notices, defer to the official notice.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/updates" className="accent-button !min-h-0 !px-4 !py-2 text-sm">
              Open updates
            </Link>
            <Link
              href="https://www.kiwanis.org/"
              target="_blank"
              rel="noreferrer"
              className="secondary-button !min-h-0 !px-4 !py-2 text-sm"
            >
              Official Kiwanis site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
