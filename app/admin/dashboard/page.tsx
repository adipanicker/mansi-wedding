import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { logout } from "../login/actions";

export default async function DashboardPage() {
  const user = await requireAdmin();

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Logged in as {user.email}</p>
      <p>
        <Link href="/admin/dashboard/guests">Manage guests</Link>
      </p>
      <p>
        <Link href="/admin/dashboard/events">Manage events</Link>
      </p>

      <form action={logout}>
        <button>Log out</button>
      </form>
    </main>
  );
}
