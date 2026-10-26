import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarHeart } from "lucide-react";
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
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/admin/dashboard/events"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-maroon-muted hover:text-rose-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to events list</span>
        </Link>
      </div>

      {/* Main Edit Card */}
      <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-blush-border">
          <div className="w-10 h-10 rounded-xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary shadow-xs">
            <CalendarHeart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-maroon">
              Edit Event: {event.title}
            </h1>
            <p className="text-xs text-maroon-muted mt-0.5">
              Update ceremony schedule, venue address, and guest visibility
            </p>
          </div>
        </div>

        <EditEventForm event={event} />
      </div>
    </div>
  );
}
