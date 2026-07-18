import { NextResponse } from "next/server";
import { listPublicEvents } from "@backend/services/events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const payload = await listPublicEvents({ page, limit });

  return NextResponse.json(payload);
}
