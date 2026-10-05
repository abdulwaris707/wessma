import { NextResponse } from "next/server";
import { getPublishedJobs } from "@/lib/db";

/** Public API: only published opportunities are ever exposed. */
export async function GET() {
  try { return NextResponse.json(await getPublishedJobs()); }
  catch { return NextResponse.json({ error: "Jobs are temporarily unavailable." }, { status: 503 }); }
}
