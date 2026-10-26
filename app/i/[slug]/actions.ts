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
