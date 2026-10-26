"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type UpdateEventState = { ok: false; error: string } | null;

export async function updateEvent(
  _prev: UpdateEventState,
  formData: FormData,
): Promise<UpdateEventState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const eventDate = String(formData.get("eventDate") ?? "").trim() || null;
  const startTime = String(formData.get("startTime") ?? "").trim() || null;
  const venue = String(formData.get("venue") ?? "").trim() || null;
  const displayOrder = Number.parseInt(
    String(formData.get("displayOrder") ?? "0"),
    10,
  );
  const isActive = formData.get("isActive") === "on";

  if (!id) return { ok: false, error: "Missing event id" };
  if (!title) return { ok: false, error: "Title is required" };
  if (!Number.isFinite(displayOrder))
    return { ok: false, error: "Display order must be a number" };

  const { data, error } = await supabaseAdmin
    .from("events")
    .update({
      title,
      description,
      event_date: eventDate,
      start_time: startTime,
      venue,
      display_order: displayOrder,
      is_active: isActive,
    })
    .eq("id", id)
    .select("id");

  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "Event not found" };

  revalidatePath("/admin/dashboard/events");
  redirect("/admin/dashboard/events");
}
