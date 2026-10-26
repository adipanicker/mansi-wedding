"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Check, AlertCircle, Loader2, Save, ArrowLeft } from "lucide-react";
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
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={event.id} />

      <div className="space-y-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-title"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Event Title <span className="text-rose-primary">*</span>
          </label>
          <input
            id="event-title"
            name="title"
            defaultValue={event.title}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-description"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Description / Dress Code{" "}
            <span className="text-maroon-muted font-normal lowercase">
              (optional)
            </span>
          </label>
          <textarea
            id="event-description"
            name="description"
            defaultValue={event.description ?? ""}
            rows={3}
            placeholder="e.g. Traditional Indian attire. Dinner and dancing to follow."
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs resize-y"
          />
        </div>

        {/* Date and Start Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="event-date"
              className="text-xs font-semibold uppercase tracking-wider text-maroon"
            >
              Event Date
            </label>
            <input
              id="event-date"
              type="date"
              name="eventDate"
              defaultValue={event.event_date ?? ""}
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="event-start-time"
              className="text-xs font-semibold uppercase tracking-wider text-maroon"
            >
              Start Time
            </label>
            <input
              id="event-start-time"
              type="time"
              name="startTime"
              defaultValue={event.start_time?.slice(0, 5) ?? ""}
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Venue */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-venue"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Venue &amp; Location
          </label>
          <input
            id="event-venue"
            name="venue"
            defaultValue={event.venue ?? ""}
            placeholder="e.g. Grand Ballroom, The Taj Mahal Palace, Mumbai"
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Display Order */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-display-order"
            className="text-xs font-semibold uppercase tracking-wider text-maroon"
          >
            Display Order
          </label>
          <input
            id="event-display-order"
            type="number"
            name="displayOrder"
            defaultValue={event.display_order}
            className="w-full sm:w-36 px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
          />
        </div>

        {/* Active Pill Checkbox */}
        <div className="pt-2">
          <label className="relative inline-flex items-center cursor-pointer select-none group">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={event.is_active}
              className="peer sr-only"
            />
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-blush-border bg-white text-maroon transition-all duration-200 peer-checked:bg-rose-primary peer-checked:border-rose-primary peer-checked:text-white peer-checked:shadow-xs hover:border-rose-primary/40 peer-focus-visible:ring-2 peer-focus-visible:ring-rose-primary">
              <Check className="w-4 h-4 hidden peer-checked:inline-block stroke-[2.5]" />
              <span>Show on guest invitations</span>
            </span>
          </label>
        </div>
      </div>

      {/* Error notification */}
      {state && !state.ok && (
        <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-sm text-rose-primary flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-primary" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Action Buttons: Primary submit + outline secondary */}
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

        <Link
          href="/admin/dashboard/events"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-blush-border text-maroon hover:text-rose-primary hover:bg-rose-surface hover:border-rose-primary/30 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </Link>
      </div>
    </form>
  );
}
