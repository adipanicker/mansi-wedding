"use client";

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
      <button style={{ color: "tomato" }}>Delete guest</button>
    </form>
  );
}
