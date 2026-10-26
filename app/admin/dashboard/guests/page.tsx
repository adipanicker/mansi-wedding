import Link from "next/link";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Edit2,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AddGuestForm from "./AddGuestForm";
import CopyLinkButton from "./CopyLinkButton";

export const dynamic = "force-dynamic";

type GuestEvent = {
  events: {
    title: string;
    display_order: number;
  } | null;
};

type GuestData = {
  id: string;
  name: string;
  display_name: string | null;
  slug: string;
  rsvp_status: string | null;
  responded_at: string | null;
  created_at: string;
  guest_events: GuestEvent[] | null;
};

type GuestRow = GuestData & {
  eventTitles: string;
};

export default async function GuestsPage() {
  await requireAdmin();

  const { data: events } = await supabaseAdmin
    .from("events")
    .select("id, title")
    .eq("is_active", true)
    .order("display_order");

  const { data: guests, error } = await supabaseAdmin
    .from("guests")
    .select(
      "id, name, display_name, slug, rsvp_status, responded_at, created_at, guest_events(events(title, display_order))",
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const rows: GuestRow[] = ((guests as unknown as GuestData[]) ?? []).map((g) => ({
    ...g,
    eventTitles: (g.guest_events ?? [])
      .map((ge) => ge.events)
      .filter((e): e is { title: string; display_order: number } => Boolean(e))
      .sort((a, b) => a.display_order - b.display_order)
      .map((e) => e.title)
      .join(", "),
  }));

  const attendingCount = rows.filter((g) => g.rsvp_status === "yes").length;
  const declinedCount = rows.filter((g) => g.rsvp_status === "no").length;
  const pendingCount = rows.filter(
    (g) => g.rsvp_status !== "yes" && g.rsvp_status !== "no",
  ).length;

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
            <span>Guest List</span>
            <span className="text-xs sm:text-sm font-sans font-semibold px-2.5 py-0.5 rounded-full bg-rose-surface text-rose-primary border border-blush-border">
              {rows.length} total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-maroon-muted mt-1">
            Manage invitations, wedding function access, and track RSVPs
          </p>
        </div>

        {/* Quick RSVP Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blush-border text-xs shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-maroon-muted">Attending:</span>
            <strong className="text-emerald-700 font-bold">{attendingCount}</strong>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blush-border text-xs shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-primary" />
            <span className="text-maroon-muted">Declined:</span>
            <strong className="text-rose-primary font-bold">{declinedCount}</strong>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blush-border text-xs shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-maroon-muted">Pending:</span>
            <strong className="text-amber-700 font-bold">{pendingCount}</strong>
          </div>
        </div>
      </div>

      {/* Add Guest Form in a Card */}
      <AddGuestForm events={events ?? []} />

      {/* Guests Table in a Card */}
      <div className="bg-white rounded-2xl border border-blush-border shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-blush-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-rose-primary" />
            <h2 className="font-serif text-lg font-bold text-maroon">
              All Invited Guests ({rows.length})
            </h2>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="p-12 text-center text-maroon-muted">
            <Users className="w-10 h-10 mx-auto text-maroon-muted/40 mb-3" />
            <p className="font-serif text-lg font-semibold text-maroon">
              No guests added yet
            </p>
            <p className="text-xs text-maroon-muted mt-1">
              Use the form above to create your first wedding invitation.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-blush/60 border-b border-blush-border text-[11px] font-semibold text-maroon-muted uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3.5">
                      Guest &amp; Card Name
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Invited Events
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      RSVP Status
                    </th>
                    <th scope="col" className="px-6 py-3.5 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush-border">
                  {rows.map((g) => (
                    <tr
                      key={g.id}
                      className="hover:bg-blush/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-maroon">{g.name}</div>
                        {g.display_name && (
                          <div className="text-xs text-maroon-muted flex items-center gap-1 mt-0.5">
                            <Tag className="w-3 h-3 text-rose-primary/60 shrink-0" />
                            <span>Card: {g.display_name}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {g.eventTitles ? (
                          <span className="text-xs text-maroon-muted font-medium bg-blush px-2.5 py-1 rounded-lg border border-blush-border/80 inline-block max-w-xs truncate">
                            {g.eventTitles}
                          </span>
                        ) : (
                          <span className="text-xs text-maroon-muted/60 italic">
                            No events assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {g.rsvp_status === "yes" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Attending</span>
                          </span>
                        ) : g.rsvp_status === "no" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-primary border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Declined</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <CopyLinkButton slug={g.slug} />
                          <a
                            href={`/i/${g.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-maroon hover:text-rose-primary hover:bg-rose-surface border border-blush-border transition-colors shadow-2xs"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            href={`/admin/dashboard/guests/${g.id}/edit`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-maroon hover:text-rose-primary hover:bg-rose-surface border border-blush-border transition-colors shadow-2xs"
                          >
                            <span>Edit</span>
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View */}
            <div className="md:hidden divide-y divide-blush-border">
              {rows.map((g) => (
                <div key={g.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-maroon">{g.name}</div>
                      {g.display_name && (
                        <div className="text-xs text-maroon-muted flex items-center gap-1 mt-0.5">
                          <Tag className="w-3 h-3 text-rose-primary/60 shrink-0" />
                          <span>Card: {g.display_name}</span>
                        </div>
                      )}
                    </div>
                    {/* RSVP pill badge */}
                    <div>
                      {g.rsvp_status === "yes" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Yes</span>
                        </span>
                      ) : g.rsvp_status === "no" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-primary border border-rose-200">
                          <XCircle className="w-3 h-3" />
                          <span>No</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {g.eventTitles && (
                    <div className="text-xs text-maroon-muted bg-blush px-2.5 py-1 rounded-lg border border-blush-border">
                      {g.eventTitles}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <CopyLinkButton slug={g.slug} />
                    <a
                      href={`/i/${g.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-maroon hover:text-rose-primary hover:bg-rose-surface border border-blush-border transition-colors shadow-2xs"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href={`/admin/dashboard/guests/${g.id}/edit`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-maroon hover:text-rose-primary hover:bg-rose-surface border border-blush-border transition-colors shadow-2xs ml-auto"
                    >
                      <span>Edit</span>
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
