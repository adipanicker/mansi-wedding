"use client";

import { useActionState, useEffect, useRef } from "react";
import { createGuest } from "./actions";
import CopyLinkButton from "./CopyLinkButton";

type EventOption = { id: string; title: string };

export default function AddGuestForm({ events }: { events: EventOption[] }) {
  const [state, formAction, pending] = useActionState(createGuest, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <div style={{ marginBottom: 32 }}>
      <form
        ref={formRef}
        action={formAction}
        style={{ display: "grid", gap: 12, maxWidth: 360 }}
      >
        <h2>Add Guest</h2>
        <input name="name" placeholder="Guest name" required />
        <input
          name="displayName"
          placeholder='Name on invitation (optional, e.g. "Mansi & Family")'
        />
        <input name="phone" placeholder="Phone (optional)" />

        <fieldset style={{ border: "1px solid #666", padding: 12 }}>
          <legend>Invited to</legend>
          {events.map((e) => (
            <label key={e.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                name="eventIds"
                value={e.id}
                defaultChecked
              />{" "}
              {e.title}
            </label>
          ))}
        </fieldset>

        <button disabled={pending}>
          {pending ? "Creating..." : "Create Invitation"}
        </button>

        {state && !state.ok && <p style={{ color: "tomato" }}>{state.error}</p>}
      </form>

      {state?.ok && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #666" }}>
          <p>Invitation created for {state.name}</p>
          <code>/i/{state.slug}</code> <CopyLinkButton slug={state.slug} />
        </div>
      )}
    </div>
  );
}
