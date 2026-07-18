type PrismaClientLike = {
  event: {
    findMany: (args?: unknown) => Promise<unknown[]>;
    count: (args?: unknown) => Promise<number>;
    findFirst: (args?: unknown) => Promise<unknown | null>;
  };
  user: {
    upsert: (args?: unknown) => Promise<unknown>;
  };
  $disconnect: () => Promise<void>;
};

const fallbackEvent = {
  id: "seed-public-event",
  slug: "nairobi-climate-sprint",
  title: "Nairobi Climate Sprint",
  problemStatement:
    "Build tools that help Kenyan communities track and reduce local emissions.",
  status: "PRIZE_VERIFIED",
  prizePoolKes: 500000,
  startsAt: new Date("2026-08-01T09:00:00.000Z"),
  endsAt: new Date("2026-08-03T17:00:00.000Z"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const fallbackPrisma: PrismaClientLike = {
  event: {
    async findMany() {
      return [fallbackEvent];
    },
    async count() {
      return 1;
    },
    async findFirst(args?: unknown) {
      const where = (args as { where?: { slug?: string } } | undefined)?.where;
      const slug = where?.slug;
      return slug === fallbackEvent.slug ? fallbackEvent : null;
    },
  },
  user: {
    async upsert() {
      return { id: "seed-user", email: "seed@example.com" };
    },
  },
  async $disconnect() {
    return undefined;
  },
};

let prismaClient: PrismaClientLike;

try {
  const prismaModule = require("@prisma/client") as { PrismaClient: new (options?: unknown) => PrismaClientLike };
  prismaClient = new prismaModule.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
} catch {
  prismaClient = fallbackPrisma;
}

export const prisma = prismaClient;
