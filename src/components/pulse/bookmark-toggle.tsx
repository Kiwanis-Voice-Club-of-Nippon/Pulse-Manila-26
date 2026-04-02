"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pulse:saved-sessions";

function readSaved() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === "string") : [];
  } catch {
    return [];
  }
}

export function BookmarkToggle({ sessionId }: { sessionId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(sessionId));
  }, [sessionId]);

  function toggleSaved() {
    const existing = readSaved();
    const next = existing.includes(sessionId)
      ? existing.filter((id) => id !== sessionId)
      : [...existing, sessionId];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(sessionId));
    window.dispatchEvent(new CustomEvent("pulse:saved-sessions-updated"));
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      className="secondary-button !min-h-0 !px-3 !py-2 text-sm"
      aria-pressed={saved}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}

export { STORAGE_KEY as savedSessionsStorageKey };
