import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getApplications } from "@/lib/db";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const applications = await getApplications();
  return NextResponse.json(applications);
}
