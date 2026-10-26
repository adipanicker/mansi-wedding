"use client";

import { useActionState } from "react";
import { updateGuest } from "./actions";

type EventOption = { id: string; title: string };

export default function EditGuestForm({
  guest,
  events,
  selectedEventIds,
}: {
  guest: {
    id: string;
    name: string;
    display_name: string | null;
    phone: string | null;
  };
  events: EventOption[];
  selectedEventIds: string[];
}) {
  const [state, formAction, pending] = useActionState(updateGuest, null);

  return (
    <form
      action={formAction}
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
    >
      <input type="hidden" name="id" value={guest.id} />

      <input
        name="name"
        defaultValue={guest.name}
        placeholder="Guest name"
        required
      />
      <input
        name="displayName"
        defaultValue={guest.display_name ?? ""}
        placeholder='Name on invitation (optional, e.g. "Aditya & Family")'
      />
      <input
        name="phone"
        defaultValue={guest.phone ?? ""}
        placeholder="Phone (optional)"
      />

      <fieldset style={{ border: "1px solid #666", padding: 12 }}>
        <legend>Invited to</legend>
        {events.map((e) => (
          <label key={e.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              name="eventIds"
              value={e.id}
              defaultChecked={selectedEventIds.includes(e.id)}
            />{" "}
            {e.title}
          </label>
        ))}
      </fieldset>

      <button disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </button>
      {state && !state.ok && <p style={{ color: "tomato" }}>{state.error}</p>}
    </form>
  );
}
