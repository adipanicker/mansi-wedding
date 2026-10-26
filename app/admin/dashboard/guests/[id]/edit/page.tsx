import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import EditGuestForm from "../../EditGuestForm";
import DeleteGuestButton from "../../DeleteGuestButton";

export const dynamic = "force-dynamic";

export default async function EditGuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const { data: guest, error } = await supabaseAdmin
    .from("guests")
    .select("id, name, display_name, phone, guest_events(event_id)")
    .eq("id", id)
    .maybeSingle();

  if (error || !guest) notFound();

  const { data: events } = await supabaseAdmin
    .from("events")
    .select("id, title")
    .eq("is_active", true)
    .order("display_order");

  const selectedEventIds = (guest.guest_events ?? []).map(
    (ge: { event_id: string }) => ge.event_id,
  );

  return (
    <main style={{ padding: 24 }}>
      <p>
        <Link href="/admin/dashboard/guests">← Back to guests</Link>
      </p>
      <h1>Edit guest</h1>

      <EditGuestForm
        guest={guest}
        events={events ?? []}
        selectedEventIds={selectedEventIds}
      />

      <hr style={{ margin: "32px 0", borderColor: "#444" }} />
      <DeleteGuestButton id={guest.id} name={guest.name} />
    </main>
  );
}
