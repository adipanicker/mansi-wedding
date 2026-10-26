import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserCheck, AlertTriangle } from "lucide-react";
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
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/admin/dashboard/guests"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-maroon-muted hover:text-rose-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to guests list</span>
        </Link>
      </div>

      {/* Main Edit Card */}
      <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-blush-border">
          <div className="w-10 h-10 rounded-xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-maroon">
              Edit Guest: {guest.name}
            </h1>
            <p className="text-xs text-maroon-muted mt-0.5">
              Update attendee information, card title, and event access
            </p>
          </div>
        </div>

        <EditGuestForm
          guest={guest}
          events={events ?? []}
          selectedEventIds={selectedEventIds}
        />

        {/* Divider with subtle gold accent */}
        <div className="my-8 border-t border-blush-border relative">
          <div className="absolute -top-[1px] left-6 w-16 h-[2px] bg-gold/40 rounded-full" />
        </div>

        {/* Danger zone for deleting guest */}
        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-rose-primary">
                Delete Guest Invitation
              </h3>
              <p className="text-xs text-maroon-muted mt-0.5">
                Revokes their personalized link and clears their RSVP response.
              </p>
            </div>
          </div>
          <DeleteGuestButton id={guest.id} name={guest.name} />
        </div>
      </div>
    </div>
  );
}
