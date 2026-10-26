"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function setWishVisibility(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const visible = formData.get("visible") === "true";
  if (!id) return;

  await supabaseAdmin.from("wishes").update({ is_visible: visible }).eq("id", id);
  revalidatePath("/admin/dashboard/wishes");
}

export async function deleteWish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabaseAdmin.from("wishes").delete().eq("id", id);
  revalidatePath("/admin/dashboard/wishes");
}
