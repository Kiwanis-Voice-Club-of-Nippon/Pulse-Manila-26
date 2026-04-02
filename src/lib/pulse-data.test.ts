import { describe, expect, it } from "vitest";
import { filterSessions, getAspacHighlights, getConventionActiveDay, getVenueDetails } from "./pulse-data";

describe("pulse data helpers", () => {
  it("returns the first event day before the convention starts", () => {
    expect(getConventionActiveDay(new Date("2026-03-26T09:00:00+09:00"))).toBe("2026-06-25");
  });

  it("filters sessions by segment and search query", () => {
    const results = filterSessions({
      segment: "aspac",
      q: "briefing",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("aspac-delegation-briefing");
  });

  it("keeps venue relationships hydrated", () => {
    const venues = getVenueDetails();
    expect(venues[0]?.rooms[0]?.sessions.length).toBeGreaterThan(0);
  });

  it("exposes ASPAC highlights separately from the full schedule", () => {
    const highlights = getAspacHighlights();
    expect(highlights.every((session) => session.segments.some((segment) => segment.slug === "aspac"))).toBe(true);
  });
});
