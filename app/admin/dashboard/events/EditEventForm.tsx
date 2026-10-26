"use client";

import { useActionState } from "react";
import { updateEvent } from "./action";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  start_time: string | null;
  venue: string | null;
  display_order: number;
  is_active: boolean;
};

export default function EditEventForm({ event }: { event: EventRow }) {
  const [state, formAction, pending] = useActionState(updateEvent, null);

  return (
    <form
      action={formAction}
      style={{ display: "grid", gap: 12, maxWidth: 420 }}
    >
      <input type="hidden" name="id" value={event.id} />

      <label>
        Title
        <input
          name="title"
          defaultValue={event.title}
          required
          style={{ display: "block", width: "100%" }}
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          defaultValue={event.description ?? ""}
          rows={4}
          style={{ display: "block", width: "100%" }}
        />
      </label>

      <label>
        Date
        <input
          type="date"
          name="eventDate"
          defaultValue={event.event_date ?? ""}
          style={{ display: "block" }}
        />
      </label>

      <label>
        Start time
        <input
          type="time"
          name="startTime"
          defaultValue={event.start_time?.slice(0, 5) ?? ""}
          style={{ display: "block" }}
        />
      </label>

      <label>
        Venue
        <input
          name="venue"
          defaultValue={event.venue ?? ""}
          style={{ display: "block", width: "100%" }}
        />
      </label>

      <label>
        Display order
        <input
          type="number"
          name="displayOrder"
          defaultValue={event.display_order}
          style={{ display: "block" }}
        />
      </label>

      <label>
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={event.is_active}
        />{" "}
        Show on invitations
      </label>

      <button disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </button>
      {state && !state.ok && <p style={{ color: "tomato" }}>{state.error}</p>}
    </form>
  );
}
