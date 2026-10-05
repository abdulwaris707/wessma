import { requireAdmin, getAdminSession } from "@/lib/auth";
import { getDashboardData } from "@/lib/db";
import { AdminDashboard } from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";
export default async function AdminPage() { await requireAdmin(); const [data, session] = await Promise.all([getDashboardData(), getAdminSession()]); return <AdminDashboard initialJobs={data.jobs} initialEnquiries={data.enquiries} email={session!.email} />; }
