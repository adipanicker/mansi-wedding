import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AddGuestForm from "./AddGuestForm";
import CopyLinkButton from "./CopyLinkButton";

export const dynamic = "force-dynamic";

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

  const rows = (guests ?? []).map((g: any) => ({
    ...g,
    eventTitles: (g.guest_events ?? [])
      .map((ge: any) => ge.events)
      .filter(Boolean)
      .sort((a: any, b: any) => a.display_order - b.display_order)
      .map((e: any) => e.title)
      .join(", "),
  }));

  return (
    <main style={{ padding: 24 }}>
      <h1>Guests ({rows.length})</h1>
      <AddGuestForm events={events ?? []} />

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Name</th>
            <th>Events</th>
            <th>RSVP</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((g: any) => (
            <tr key={g.id} style={{ borderTop: "1px solid #444" }}>
              <td>
                {g.name}
                {g.display_name ? ` → ${g.display_name}` : ""}
              </td>
              <td>{g.eventTitles}</td>
              <td>
                {g.rsvp_status === "yes"
                  ? "Yes"
                  : g.rsvp_status === "no"
                    ? "No"
                    : "Pending"}
              </td>
              <td>
                <CopyLinkButton slug={g.slug} />{" "}
                <a href={`/i/${g.slug}`} target="_blank">
                  Open
                </a>
                <Link href={`/admin/dashboard/guests/${g.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
