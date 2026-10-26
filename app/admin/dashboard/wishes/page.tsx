import { MessageSquareHeart, Eye, EyeOff, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { setWishVisibility, deleteWish } from "./actions";

export const dynamic = "force-dynamic";

type WishRow = {
  id: string;
  message: string;
  is_visible: boolean;
  created_at: string;
  guests:
    | {
        name: string;
        display_name: string | null;
      }
    | {
        name: string;
        display_name: string | null;
      }[]
    | null;
};

export default async function WishesAdminPage() {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("wishes")
    .select("id, message, is_visible, created_at, guests(name, display_name)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const wishes = (data as unknown as WishRow[]) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon tracking-tight flex items-center gap-3">
          <span>Wishes</span>
          <span className="text-xs sm:text-sm font-sans font-semibold px-2.5 py-0.5 rounded-full bg-rose-surface text-rose-primary border border-blush-border">
            {wishes.length} total
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-maroon-muted mt-1">
          Moderate guest wishes and congratulations for the couple
        </p>
      </div>

      {wishes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-blush-border p-12 text-center text-maroon-muted shadow-xs">
          <MessageSquareHeart className="w-10 h-10 mx-auto text-maroon-muted/40 mb-3" />
          <p className="font-serif text-lg font-semibold text-maroon">
            No wishes yet
          </p>
          <p className="text-xs text-maroon-muted mt-1">
            Wishes left by guests on their invitation page will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 max-w-2xl">
          {wishes.map((w) => {
            const g = Array.isArray(w.guests) ? w.guests[0] : w.guests;
            const author = g?.display_name || g?.name || "Guest";

            return (
              <div
                key={w.id}
                className="bg-white rounded-2xl border border-blush-border p-5 shadow-xs flex flex-col justify-between gap-3 hover:border-rose-primary/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-maroon text-base">
                      {author}
                    </p>
                    {!w.is_visible ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-primary border border-rose-200">
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Eye className="w-3 h-3" />
                        <span>Visible</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-maroon-muted whitespace-pre-wrap leading-relaxed">
                    {w.message}
                  </p>
                </div>

                <div className="pt-3 border-t border-blush-border flex items-center gap-2">
                  <form action={setWishVisibility}>
                    <input type="hidden" name="id" value={w.id} />
                    <input
                      type="hidden"
                      name="visible"
                      value={w.is_visible ? "false" : "true"}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blush-border text-xs font-medium text-maroon hover:text-rose-primary hover:bg-rose-surface hover:border-rose-primary/30 transition-colors cursor-pointer shadow-2xs"
                    >
                      {w.is_visible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show</span>
                        </>
                      )}
                    </button>
                  </form>

                  <form action={deleteWish}>
                    <input type="hidden" name="id" value={w.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-medium text-rose-primary hover:bg-rose-50 hover:border-rose-primary transition-colors cursor-pointer shadow-2xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
