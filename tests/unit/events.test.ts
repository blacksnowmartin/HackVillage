import { describe, expect, it } from "vitest";
import { getPublicEventBySlug, listPublicEvents } from "@backend/services/events";

describe("public event discovery", () => {
  it("filters out drafts and supports pagination", async () => {
    const result = await listPublicEvents({ page: 1, limit: 1 });

    expect(result.page).toBe(1);
    expect(result.limit).toBe(1);
    expect(result.events.length).toBeLessThanOrEqual(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.events.every((event) => ["PRIZE_VERIFIED", "LIVE"].includes(event.status))).toBe(true);
  });

  it("returns public event details for a public slug", async () => {
    const event = await getPublicEventBySlug("nairobi-climate-sprint");

    expect(event).not.toBeNull();
    expect(event?.status).toBe("PRIZE_VERIFIED");
    expect(event?.problemStatement).toContain("Kenyan");
    expect(event?.prizePoolKes).toBeGreaterThan(0);
  });
});
