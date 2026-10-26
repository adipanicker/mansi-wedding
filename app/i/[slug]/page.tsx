import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import RsvpForm from "./RsvpForm";

// Always fetch fresh: RSVP and event details can change anytime
export const dynamic = "force-dynamic";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  start_time: string | null;
  venue: string | null;
  display_order: number;
  is_active: boolean;
};

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: guest, error } = await supabaseAdmin
    .from("guests")
    .select(
      `id, name, display_name, rsvp_status,
       guest_events (
         events ( id, title, description, event_date, start_time, venue, display_order, is_active )
       )`,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!guest) notFound();

  const events: EventRow[] = (guest.guest_events ?? [])
    .map((ge: any) => ge.events as EventRow | null)
    .filter((e: EventRow | null): e is EventRow => !!e && e.is_active)
    .sort((a: EventRow, b: EventRow) => a.display_order - b.display_order);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>You&apos;re Invited, {guest.display_name || guest.name}!</h1>
      <RsvpForm
        slug={slug}
        initialStatus={guest.rsvp_status as "yes" | "no" | null}
      />

      <section style={{ display: "grid", gap: 16, marginTop: 24 }}>
        {events.map((event) => (
          <article
            key={event.id}
            style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}
          >
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              {event.event_date} {event.start_time}
            </p>
            <p>{event.venue}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
