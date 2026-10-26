"use client";

import { useActionState } from "react";
import { Check, AlertCircle, Loader2, Save } from "lucide-react";
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
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={guest.id} />

      <div className="space-y-4">
        {/* Guest Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-guest-name"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Guest Name <span className="text-rose-primary">*</span>
          </label>
          <input
            id="edit-guest-name"
            name="name"
            defaultValue={guest.name}
            placeholder="Guest name"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Display Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-guest-display-name"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Invitation Card Title{" "}
            <span className="text-maroon-muted font-normal lowercase">
              (optional, e.g. &quot;Aditya &amp; Family&quot;)
            </span>
          </label>
          <input
            id="edit-guest-display-name"
            name="displayName"
            defaultValue={guest.display_name ?? ""}
            placeholder='Name on invitation (optional, e.g. "Aditya & Family")'
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-guest-phone"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Phone Number{" "}
            <span className="text-maroon-muted font-normal lowercase">
              (optional)
            </span>
          </label>
          <input
            id="edit-guest-phone"
            name="phone"
            defaultValue={guest.phone ?? ""}
            placeholder="Phone (optional)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Events Checkbox Fieldset */}
        <fieldset className="p-4 rounded-xl bg-blush/60 border border-blush-border space-y-2">
          <legend className="text-xs font-semibold uppercase tracking-wider text-maroon px-1">
            Invited Events
          </legend>
          <div className="flex flex-wrap gap-2 pt-1">
            {events.map((e) => (
              <label
                key={e.id}
                className="relative inline-flex items-center cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  name="eventIds"
                  value={e.id}
                  defaultChecked={selectedEventIds.includes(e.id)}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-blush-border bg-white text-maroon transition-all duration-200 peer-checked:bg-rose-primary peer-checked:border-rose-primary peer-checked:text-white peer-checked:shadow-xs hover:border-rose-primary/40 peer-focus-visible:ring-2 peer-focus-visible:ring-rose-primary">
                  <Check className="w-3.5 h-3.5 hidden peer-checked:inline-block stroke-[2.5]" />
                  <span>{e.title}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Error notification */}
      {state && !state.ok && (
        <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-sm text-rose-primary flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-primary" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-primary hover:bg-rose-hover text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-rose-primary/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
