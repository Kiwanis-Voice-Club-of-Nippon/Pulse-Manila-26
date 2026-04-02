"use client";

import { useEffect, useMemo, useState } from "react";
import type { HydratedSession } from "@/lib/pulse-data";
import { SessionCard } from "./session-card";
import { savedSessionsStorageKey } from "./bookmark-toggle";

function readSavedSessionIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(savedSessionsStorageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === "string") : [];
  } catch {
    return [];
  }
}

export function SavedSessionList({ sessions }: { sessions: HydratedSession[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSavedIds(readSavedSessionIds());
    refresh();
    window.addEventListener("pulse:saved-sessions-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("pulse:saved-sessions-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const savedSessions = useMemo(() => {
    const ids = new Set(savedIds);
    return sessions.filter((session) => ids.has(session.id));
  }, [savedIds, sessions]);

  if (savedSessions.length === 0) {
    return (
      <div className="content-card p-6">
        <p className="text-lg font-semibold text-[var(--foreground)]">No saved sessions yet</p>
        <p className="mt-2 text-sm muted-copy">
          Tap Save on any session card to keep it on this device. No attendee account is required.
        </p>
      </div>
    );
  }

  return (
    <div className="page-grid">
      {savedSessions.map((session) => (
        <SessionCard key={session.id} session={session} showDate />
      ))}
    </div>
  );
}
