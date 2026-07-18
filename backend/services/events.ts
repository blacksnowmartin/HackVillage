import { prisma } from "@backend/lib/db";

export type PublicEventStatus = "PRIZE_VERIFIED" | "LIVE";

export interface PublicEvent {
  id: string;
  slug: string;
  title: string;
  problemStatement: string;
  status: PublicEventStatus;
  prizePoolKes: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ListPublicEventsInput {
  page?: number;
  limit?: number;
}

interface ListPublicEventsResult {
  page: number;
  limit: number;
  total: number;
  events: PublicEvent[];
}

const PUBLIC_STATUSES: PublicEventStatus[] = ["PRIZE_VERIFIED", "LIVE"];

function serializeEvent(event: unknown): PublicEvent {
  const record = event as {
    id?: string;
    slug?: string;
    title?: string;
    problemStatement?: string;
    status?: string;
    prizePoolKes?: { toString(): string } | number | null;
    startsAt?: Date | string | null;
    endsAt?: Date | string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  const startsAt = record.startsAt ? new Date(record.startsAt) : null;
  const endsAt = record.endsAt ? new Date(record.endsAt) : null;
  const createdAt = record.createdAt ? new Date(record.createdAt) : new Date();
  const updatedAt = record.updatedAt ? new Date(record.updatedAt) : new Date();
  const status = PUBLIC_STATUSES.includes(record.status as PublicEventStatus)
    ? (record.status as PublicEventStatus)
    : "PRIZE_VERIFIED";

  return {
    id: record.id ?? "unknown",
    slug: record.slug ?? "",
    title: record.title ?? "",
    problemStatement: record.problemStatement ?? "",
    status,
    prizePoolKes: Number(record.prizePoolKes ?? 0),
    startsAt: startsAt ? startsAt.toISOString() : null,
    endsAt: endsAt ? endsAt.toISOString() : null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

function getFallbackEvents(): PublicEvent[] {
  return [
    {
      id: "seed-public-event",
      slug: "nairobi-climate-sprint",
      title: "Nairobi Climate Sprint",
      problemStatement:
        "Build tools that help Kenyan communities track and reduce local emissions.",
      status: "PRIZE_VERIFIED",
      prizePoolKes: 500000,
      startsAt: "2026-08-01T09:00:00.000Z",
      endsAt: "2026-08-03T17:00:00.000Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export async function listPublicEvents({ page = 1, limit = 6 }: ListPublicEventsInput = {}): Promise<ListPublicEventsResult> {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(12, Math.max(1, Number(limit) || 6));

  try {
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: {
          status: {
            in: PUBLIC_STATUSES,
          },
        },
        orderBy: {
          startsAt: "asc",
        },
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        select: {
          id: true,
          slug: true,
          title: true,
          problemStatement: true,
          status: true,
          prizePoolKes: true,
          startsAt: true,
          endsAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.event.count({
        where: {
          status: {
            in: PUBLIC_STATUSES,
          },
        },
      }),
    ]);

    return {
      page: safePage,
      limit: safeLimit,
      total,
      events: events.map((event) => serializeEvent(event)),
    };
  } catch (error) {
    const fallbackEvents = getFallbackEvents();
    return {
      page: safePage,
      limit: safeLimit,
      total: fallbackEvents.length,
      events: fallbackEvents.slice((safePage - 1) * safeLimit, safePage * safeLimit),
    };
  }
}

export async function getPublicEventBySlug(slug: string): Promise<PublicEvent | null> {
  try {
    const event = await prisma.event.findFirst({
      where: {
        slug,
        status: {
          in: PUBLIC_STATUSES,
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        problemStatement: true,
        status: true,
        prizePoolKes: true,
        startsAt: true,
        endsAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!event) {
      return getFallbackEvents().find((candidate) => candidate.slug === slug) ?? null;
    }

    return serializeEvent(event);
  } catch (error) {
    return getFallbackEvents().find((candidate) => candidate.slug === slug) ?? null;
  }
}
