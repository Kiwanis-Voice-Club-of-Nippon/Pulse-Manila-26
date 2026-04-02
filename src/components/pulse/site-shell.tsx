import Link from "next/link";
import { pulseEvent } from "@/lib/pulse-data";
import { InstallPrompt } from "./install-prompt";
import { RegisterServiceWorker } from "./register-service-worker";
import { TopNav } from "./top-nav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pulse-shell safe-bottom">
      <RegisterServiceWorker />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="glass-panel sticky top-4 z-20 rounded-[32px] px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="pill w-fit !bg-[var(--accent-soft)] !text-[var(--accent-strong)]">
                  Convention companion
                </div>
                <div>
                  <Link href="/" className="font-[var(--font-display)] text-3xl font-bold tracking-[-0.05em]">
                    Pulse Manila 2026
                  </Link>
                  <p className="mt-2 max-w-2xl text-sm sm:text-base muted-copy">
                    A public access layer for schedules, updates, rooms, and ASPAC highlights. Pulse complements
                    official Kiwanis communication and is designed for fast use on the convention floor.
                  </p>
                </div>
              </div>
              <div className="content-card flex flex-col gap-2 p-4 sm:max-w-xs">
                <p className="text-sm font-semibold text-[var(--foreground)]">{pulseEvent.name}</p>
                <p className="text-sm muted-copy">
                  {pulseEvent.city}, {pulseEvent.country}
                </p>
                <p className="text-sm muted-copy">June 25 to 27, 2026</p>
                <Link href="/about" className="text-sm font-semibold text-[var(--accent)]">
                  Companion disclaimer
                </Link>
              </div>
            </div>
            <TopNav />
            <InstallPrompt />
          </div>
        </header>
        <main className="flex-1 py-6">{children}</main>
        <footer className="mt-8 rounded-[28px] border border-[var(--line)] bg-white/80 px-5 py-5 text-sm muted-copy">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Pulse is a lightweight convention companion. For authoritative changes, defer to official Kiwanis
              notices, stage announcements, and event staff guidance.
            </p>
            <div className="flex gap-4">
              <Link href="/updates" className="font-semibold text-[var(--accent)]">
                Latest updates
              </Link>
              <Link href="/venues" className="font-semibold text-[var(--accent)]">
                Room lookup
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
