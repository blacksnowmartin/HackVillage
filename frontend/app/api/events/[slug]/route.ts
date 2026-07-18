import { NextResponse } from "next/server";
import { getPublicEventBySlug } from "@backend/services/events";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const event = await getPublicEventBySlug(params.slug);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}
