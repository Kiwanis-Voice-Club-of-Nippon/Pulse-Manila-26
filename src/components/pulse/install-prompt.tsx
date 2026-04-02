"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  if (!installPrompt || dismissed) {
    return null;
  }

  return (
    <div className="content-card flex items-center justify-between gap-3 p-4">
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">Install Pulse for faster floor access</p>
        <p className="text-sm muted-copy">Keep schedule pages and saved sessions one tap away.</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={installApp} className="accent-button !min-h-0 !px-3 !py-2 text-sm">
          Install
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="secondary-button !min-h-0 !px-3 !py-2 text-sm"
        >
          Later
        </button>
      </div>
    </div>
  );
}
