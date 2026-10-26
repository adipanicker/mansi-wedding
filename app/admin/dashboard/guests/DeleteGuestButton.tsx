"use client";

import { Trash2 } from "lucide-react";
import { deleteGuest } from "./actions";

export default function DeleteGuestButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form
      action={deleteGuest}
      onSubmit={(e) => {
        if (
          !confirm(
            `Delete ${name}? Their invite link will stop working and their RSVP will be lost.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-300 text-rose-primary hover:bg-rose-50 hover:border-rose-primary text-sm font-medium transition-all duration-200 cursor-pointer shadow-2xs"
      >
        <Trash2 className="w-4 h-4 shrink-0" />
        <span>Delete guest</span>
      </button>
    </form>
  );
}
