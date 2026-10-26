import Link from "next/link";
import {
  Users,
  CalendarHeart,
  ArrowRight,
  Sparkles,
  LogOut,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { logout } from "../login/actions";

export default async function DashboardPage() {
  const user = await requireAdmin();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-surface/60 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-surface border border-blush-border text-xs font-medium text-rose-primary mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Bride &amp; Groom Wedding Suite</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-maroon-muted mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Logged in as</span>
              <strong className="text-maroon font-semibold">{user.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard/guests"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-primary hover:bg-rose-hover text-white text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-rose-primary/20 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Manage Guests</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Action Hub Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Guests Card */}
        <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-7 shadow-xs hover:border-rose-primary/30 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary mb-5 group-hover:scale-105 transition-transform duration-200 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-bold text-maroon mb-2">
              Guest List &amp; RSVPs
            </h2>
            <p className="text-sm text-maroon-muted leading-relaxed">
              Create guest invitation links, customize card display names, assign
              wedding functions, and monitor live RSVP responses.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-blush-border flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-primary uppercase tracking-wider">
              Invitations Directory
            </span>
            <Link
              href="/admin/dashboard/guests"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-primary hover:text-rose-hover group-hover:translate-x-0.5 transition-all"
            >
              <span>Manage guests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Manage Events Card */}
        <div className="bg-white rounded-2xl border border-blush-border p-6 sm:p-7 shadow-xs hover:border-rose-primary/30 transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary mb-5 group-hover:scale-105 transition-transform duration-200 shadow-xs">
              <CalendarHeart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-bold text-maroon mb-2">
              Wedding Events
            </h2>
            <p className="text-sm text-maroon-muted leading-relaxed">
              Configure event dates, schedules, venues, and descriptions for
              the Mehendi, Sangeet, Wedding, and Reception celebrations.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-blush-border flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-primary uppercase tracking-wider">
              Schedule &amp; Venues
            </span>
            <Link
              href="/admin/dashboard/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-primary hover:text-rose-hover group-hover:translate-x-0.5 transition-all"
            >
              <span>Manage events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Account & Quick Session Box */}
      <div className="bg-white rounded-2xl border border-blush-border p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blush border border-blush-border flex items-center justify-center text-maroon-muted">
            <HeartHandshake className="w-5 h-5 text-rose-primary" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-maroon">
              Admin Session
            </h3>
            <p className="text-xs text-maroon-muted">
              Signed in as {user.email}
            </p>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-blush-border text-maroon-muted hover:text-rose-primary hover:bg-rose-surface hover:border-rose-primary/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-primary" />
            <span>Log out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
