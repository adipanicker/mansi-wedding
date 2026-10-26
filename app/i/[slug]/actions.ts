"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function submitRsvp(slug: string, status: "yes" | "no") {
  // Server actions are public endpoints, so always validate on the server
  if (status !== "yes" && status !== "no") return { ok: false };

  const { data, error } = await supabaseAdmin
    .from("guests")
    .update({ rsvp_status: status, responded_at: new Date().toISOString() })
    .eq("slug", slug)
    .select("id");

  if (error || !data?.length) return { ok: false };

  revalidatePath(`/i/${slug}`);
  return { ok: true };
}

export async function postWish(slug: string, message: string) {
  const text = message.trim();
  if (text.length < 1) return { ok: false, error: "Please write a message." };
  if (text.length > 400)
    return { ok: false, error: "Please keep it under 400 characters." };

  const { data: guest } = await supabaseAdmin
    .from("guests")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (!guest) return { ok: false, error: "Invitation not found." };

  const { error } = await supabaseAdmin.from("wishes").upsert(
    {
      guest_id: guest.id,
      message: text,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "guest_id" }
  );

  if (error) return { ok: false, error: "Could not save your wish. Please try again." };
  return { ok: true };
}

