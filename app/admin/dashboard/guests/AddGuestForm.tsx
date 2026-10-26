"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  UserPlus,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
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
    <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blush-border">
        <div className="w-10 h-10 rounded-xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary shadow-xs">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-maroon leading-tight">
            Add New Guest
          </h2>
          <p className="text-xs text-maroon-muted mt-0.5">
            Create a custom invite link and select wedding events
          </p>
        </div>
      </div>

      <form ref={formRef} action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Guest Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="add-guest-name"
              className="text-xs font-semibold uppercase tracking-wider text-maroon"
            >
              Guest Name <span className="text-rose-primary">*</span>
            </label>
            <input
              id="add-guest-name"
              name="name"
              placeholder="e.g. Rohan Mehra"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
            />
          </div>

          {/* Display Name on Invitation */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="add-guest-display-name"
              className="text-xs font-semibold uppercase tracking-wider text-maroon"
            >
              Card Name{" "}
              <span className="text-maroon-muted font-normal lowercase">
                (optional)
              </span>
            </label>
            <input
              id="add-guest-display-name"
              name="displayName"
              placeholder='e.g. "Rohan Mehra & Family"'
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="add-guest-phone"
              className="text-xs font-semibold uppercase tracking-wider text-maroon"
            >
              Phone{" "}
              <span className="text-maroon-muted font-normal lowercase">
                (optional)
              </span>
            </label>
            <input
              id="add-guest-phone"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Event Checkboxes styled as selectable pills/chips */}
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
                  defaultChecked
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

        {/* Error notification */}
        {state && !state.ok && (
          <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-sm text-rose-primary flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-primary" />
            <span>{state.error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-primary hover:bg-rose-hover text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-rose-primary/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Invitation...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Invitation</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Notification Box */}
      {state?.ok && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-900">
                Invitation created for {state.name}
              </p>
              <code className="text-xs text-emerald-800 font-mono">
                /i/{state.slug}
              </code>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CopyLinkButton slug={state.slug} />
            <a
              href={`/i/${state.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-maroon hover:text-rose-primary hover:bg-rose-surface border border-blush-border transition-colors shadow-2xs"
            >
              <span>Open invite</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
