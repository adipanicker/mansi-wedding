import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { wedding } from "@/data/wedding";
import InvitationFlow from "@/components/invite/InvitationFlow";
import type { EventRow, RsvpStatus } from "@/components/invite/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${wedding.couple.short} | Wedding Invitation`,
  description: "You are warmly invited to celebrate with us.",
  robots: { index: false, follow: false },
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
       )`
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
    <InvitationFlow
      slug={slug}
      guestName={guest.display_name || guest.name}
      rsvpStatus={guest.rsvp_status as RsvpStatus}
      events={events}
    />
  );
}