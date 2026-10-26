import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import EditEventForm from "../../EditEventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const { data: event, error } = await supabaseAdmin
    .from("events")
    .select(
      "id, title, description, event_date, start_time, venue, display_order, is_active",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !event) notFound();

  return (
    <main style={{ padding: 24 }}>
      <p>
        <Link href="/admin/dashboard/events">← Back to events</Link>
      </p>
      <h1>Edit event</h1>
      <EditEventForm event={event} />
    </main>
  );
}
