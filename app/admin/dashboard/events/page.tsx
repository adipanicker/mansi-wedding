import Link from "next/link";
import {
  CalendarHeart,
  Calendar,
  Clock,
  MapPin,
  Edit3,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1 text-xs text-maroon-muted hover:text-rose-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon tracking-tight flex items-center gap-3">
            <span>Wedding Events</span>
            <span className="text-xs sm:text-sm font-sans font-semibold px-2.5 py-0.5 rounded-full bg-rose-surface text-rose-primary border border-blush-border">
              {events?.length ?? 0} events
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-maroon-muted mt-1">
            Manage ceremonies, venues, timings, and invitation visibility
          </p>
        </div>
      </div>

      {/* Grid of Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(events ?? []).map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-2xl border border-blush-border p-6 shadow-xs hover:border-rose-primary/40 hover:shadow-md hover:shadow-rose-primary/5 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Card Header & Status Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <CalendarHeart className="w-5 h-5" />
                </div>
                {e.is_active ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Eye className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-primary border border-rose-200">
                    <EyeOff className="w-3 h-3" />
                    <span>Hidden</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl font-bold text-maroon group-hover:text-rose-primary transition-colors mb-3">
                {e.title}
              </h2>

              {/* Event Details */}
              <div className="space-y-2 text-xs text-maroon-muted">
                {/* Date & Time */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-rose-primary shrink-0" />
                  <span className="font-medium text-maroon">
                    {e.event_date ?? "Date not set"}
                  </span>
                  {e.start_time && (
                    <span className="inline-flex items-center gap-1 text-maroon-muted">
                      <Clock className="w-3 h-3 ml-1" />
                      {e.start_time.slice(0, 5)}
                    </span>
                  )}
                </div>

                {/* Venue */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {e.venue ?? "Venue to be announced"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-5 mt-5 border-t border-blush-border">
              <Link
                href={`/admin/dashboard/events/${e.id}/edit`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-blush-border bg-white text-maroon hover:text-rose-primary hover:bg-rose-surface hover:border-rose-primary/30 text-xs font-semibold transition-all shadow-2xs group-hover:bg-rose-surface group-hover:border-rose-primary/30"
              >
                <span>Edit details</span>
                <Edit3 className="w-3.5 h-3.5 text-rose-primary" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
