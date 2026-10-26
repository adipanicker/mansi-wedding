"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createGuestSlug } from "@/lib/slug";

export type CreateGuestState =
  | { ok: true; name: string; slug: string }
  | { ok: false; error: string }
  | null;

export async function createGuest(
  _prev: CreateGuestState,
  formData: FormData,
): Promise<CreateGuestState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const displayName = String(formData.get("displayName") ?? "").trim() || null;
  const eventIds = formData.getAll("eventIds").map(String);

  if (!name) return { ok: false, error: "Guest name is required" };
  if (eventIds.length === 0)
    return { ok: false, error: "Select at least one event" };

  // retry if the random suffix ever collides (unique violation = 23505)
  for (let attempt = 0; attempt < 3; attempt++) {
    const slug = createGuestSlug(name);
    const { error } = await supabaseAdmin.rpc("create_guest", {
      p_name: name,
      p_display_name: displayName,
      p_phone: phone,
      p_slug: slug,
      p_event_ids: eventIds,
    });

    if (!error) {
      revalidatePath("/admin/dashboard/guests");
      return { ok: true, name, slug };
    }
    if (error.code !== "23505") return { ok: false, error: error.message };
  }

  return { ok: false, error: "Could not generate a unique link, try again" };
}

export type UpdateGuestState = { ok: false; error: string } | null;

export async function updateGuest(
  _prev: UpdateGuestState,
  formData: FormData,
): Promise<UpdateGuestState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const eventIds = formData.getAll("eventIds").map(String);

  if (!id) return { ok: false, error: "Missing guest id" };
  if (!name) return { ok: false, error: "Guest name is required" };
  if (eventIds.length === 0)
    return { ok: false, error: "Select at least one event" };

  const { error } = await supabaseAdmin.rpc("update_guest", {
    p_id: id,
    p_name: name,
    p_display_name: displayName,
    p_phone: phone,
    p_event_ids: eventIds,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/dashboard/guests");
  redirect("/admin/dashboard/guests");
}

export async function deleteGuest(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabaseAdmin.from("guests").delete().eq("id", id);

  revalidatePath("/admin/dashboard/guests");
  redirect("/admin/dashboard/guests");
}
