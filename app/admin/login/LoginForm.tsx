"use client";

import { useActionState } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Email input */}
      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor="admin-email"
          className="text-xs font-semibold uppercase tracking-wider text-maroon"
        >
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
        />
      </div>

      {/* Password input */}
      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor="admin-password"
          className="text-xs font-semibold uppercase tracking-wider text-maroon"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-blush-border bg-white text-maroon text-sm placeholder:text-maroon-muted/50 focus:outline-hidden focus:ring-2 focus:ring-rose-primary focus:border-rose-primary transition-all shadow-2xs"
        />
      </div>

      {/* Error Message in soft red box */}
      {state?.error && (
        <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-3 text-sm text-rose-primary flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-primary" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Primary red submit button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-rose-primary hover:bg-rose-hover text-white font-medium text-sm transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-rose-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign in</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
