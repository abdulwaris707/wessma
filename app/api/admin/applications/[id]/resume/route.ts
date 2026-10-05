import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getApplication } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const application = await getApplication(id, true);

  if (!application || !application.resumeFileData) {
    return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
  }

  try {
    // Strip possible data URI header e.g. "data:application/pdf;base64,"
    const base64Data = application.resumeFileData.includes(";base64,")
      ? application.resumeFileData.split(";base64,")[1]
      : application.resumeFileData;

    const fileBuffer = Buffer.from(base64Data, "base64");
    const safeFilename = application.resumeFileName.replace(/[^a-zA-Z0-9_.-]/g, "_");

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": application.resumeFileType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[RESUME DOWNLOAD ERROR]", err);
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 });
  }
}
