import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { wedding } from "@/data/wedding";
import InvitationFlow from "@/components/invite/InvitationFlow";
import type { EventRow, RsvpStatus, Wish } from "@/components/invite/types";

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

  const { data: wishRows } = await supabaseAdmin
    .from("wishes")
    .select("id, message, guests(name, display_name)")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(100);

  const wishes: Wish[] = (wishRows ?? []).map((w: any) => {
    const g = Array.isArray(w.guests) ? w.guests[0] : w.guests;
    return {
      id: w.id,
      author: g?.display_name || g?.name || "A guest",
      message: w.message,
    };
  });

  const { data: mine } = await supabaseAdmin
    .from("wishes")
    .select("message")
    .eq("guest_id", guest.id)
    .maybeSingle();

  return (
    <InvitationFlow
      slug={slug}
      guestName={guest.display_name || guest.name}
      rsvpStatus={guest.rsvp_status as RsvpStatus}
      events={events}
      wishes={wishes}
      myWish={mine?.message ?? null}
    />
  );
}