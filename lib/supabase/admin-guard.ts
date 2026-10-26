import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin =
    !!user &&
    user.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

  if (!isAdmin) redirect("/admin/login");
  return user;
}
