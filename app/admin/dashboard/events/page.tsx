import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  await requireAdmin();

  const { data: events, error } = await supabaseAdmin
    .from("events")
    .select("id, title, event_date, start_time, venue, is_active")
    .order("display_order");

  if (error) throw new Error(error.message);

  return (
    <main style={{ padding: 24 }}>
      <p>
        <Link href="/admin/dashboard">← Dashboard</Link>
      </p>
      <h1>Events</h1>

      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        {(events ?? []).map((e) => (
          <div
            key={e.id}
            style={{ border: "1px solid #666", padding: 12, borderRadius: 8 }}
          >
            <h2>
              {e.title} {!e.is_active && <small>(hidden)</small>}
            </h2>
            <p>
              {e.event_date ?? "No date"} {e.start_time?.slice(0, 5) ?? ""}
            </p>
            <p>{e.venue ?? "No venue"}</p>
            <Link href={`/admin/dashboard/events/${e.id}/edit`}>Edit</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
