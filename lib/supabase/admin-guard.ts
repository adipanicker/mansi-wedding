import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function requireAdmin() {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase();

  if (!user || !email || !adminEmails.includes(email)) {
    redirect("/admin/login");
  }

  return user;
}