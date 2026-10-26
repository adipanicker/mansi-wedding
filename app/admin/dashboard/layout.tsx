import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import {
  LayoutDashboard,
  Users,
  CalendarHeart,
  LogOut,
  Menu,
  X,
  Heart,
  Sparkles,
} from "lucide-react";
import { logout } from "../login/actions";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} font-body bg-blush text-maroon min-h-screen flex flex-col md:flex-row antialiased selection:bg-rose-surface selection:text-rose-primary`}
    >
      {/* Mobile Nav Checkbox Toggle (Pure CSS, 0-JS for robustness) */}
      <input
        type="checkbox"
        id="admin-mobile-drawer-toggle"
        className="peer hidden"
      />

      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-blush-border shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-surface flex items-center justify-center text-rose-primary">
            <Heart className="w-4 h-4 fill-rose-primary" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-maroon block leading-tight">
              Mansi&apos;s Wedding
            </span>
            <span className="text-[10px] tracking-widest uppercase text-maroon-muted font-medium">
              Admin Portal
            </span>
          </div>
        </div>

        <label
          htmlFor="admin-mobile-drawer-toggle"
          className="p-2 text-maroon hover:text-rose-primary hover:bg-rose-surface rounded-xl transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </label>
      </header>

      {/* Mobile Drawer Backdrop */}
      <label
        htmlFor="admin-mobile-drawer-toggle"
        className="fixed inset-0 bg-maroon/20 backdrop-blur-xs z-40 hidden peer-checked:block md:hidden cursor-pointer transition-opacity"
        aria-label="Close menu"
      />

      {/* Mobile Slide-Over Drawer */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-blush-border p-6 shadow-2xl flex flex-col justify-between -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out md:hidden">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-blush-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-rose-surface flex items-center justify-center text-rose-primary">
                <Heart className="w-4 h-4 fill-rose-primary" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-maroon leading-tight">
                  Mansi&apos;s Wedding
                </h2>
                <p className="text-[10px] uppercase tracking-wider text-maroon-muted font-medium">
                  Admin Dashboard
                </p>
              </div>
            </div>
            <label
              htmlFor="admin-mobile-drawer-toggle"
              className="p-1.5 text-maroon-muted hover:text-rose-primary hover:bg-rose-surface rounded-lg cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </label>
          </div>

          <nav className="mt-6 flex flex-col gap-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-rose-primary" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/dashboard/guests"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-colors"
            >
              <Users className="w-4 h-4 text-rose-primary" />
              <span>Guests</span>
            </Link>
            <Link
              href="/admin/dashboard/events"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-colors"
            >
              <CalendarHeart className="w-4 h-4 text-rose-primary" />
              <span>Events</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-blush-border space-y-3">
          <div className="px-3 py-2 rounded-xl bg-blush border border-blush-border flex items-center gap-2 text-xs text-maroon-muted">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Wedding Management</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-maroon-muted hover:text-rose-primary hover:bg-rose-surface rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-primary" />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-blush-border p-6 justify-between shadow-xs z-20">
        <div>
          {/* Logo / Title */}
          <div className="pb-6 border-b border-blush-border relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-surface border border-blush-border flex items-center justify-center text-rose-primary shadow-xs">
                <Heart className="w-5 h-5 fill-rose-primary" />
              </div>
              <div>
                <h1 className="font-serif text-lg lg:text-xl font-bold text-maroon tracking-tight leading-tight">
                  Mansi&apos;s Wedding
                </h1>
                <p className="text-[11px] uppercase tracking-widest text-maroon-muted font-medium">
                  Admin Dashboard
                </p>
              </div>
            </div>
            {/* Subtle romantic gold accent line */}
            <div className="absolute -bottom-[1px] left-3 w-16 h-[2px] bg-gold/50 rounded-full" />
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col gap-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-all group"
            >
              <LayoutDashboard className="w-4 h-4 text-maroon-muted group-hover:text-rose-primary transition-colors" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/dashboard/guests"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-all group"
            >
              <Users className="w-4 h-4 text-maroon-muted group-hover:text-rose-primary transition-colors" />
              <span>Guests</span>
            </Link>
            <Link
              href="/admin/dashboard/events"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl text-maroon hover:text-rose-primary hover:bg-rose-surface transition-all group"
            >
              <CalendarHeart className="w-4 h-4 text-maroon-muted group-hover:text-rose-primary transition-colors" />
              <span>Events</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-blush-border space-y-3">
          <div className="px-3.5 py-2.5 rounded-xl bg-blush border border-blush-border flex items-center gap-2.5 text-xs text-maroon-muted">
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <span className="font-medium">Bride Admin Mode</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-maroon-muted hover:text-rose-primary hover:bg-rose-surface rounded-xl transition-all cursor-pointer group"
            >
              <LogOut className="w-4 h-4 text-maroon-muted group-hover:text-rose-primary transition-colors" />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
