import { Playfair_Display, Inter } from "next/font/google";
import { Heart } from "lucide-react";
import LoginForm from "./LoginForm";

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

export default function LoginPage() {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} font-body bg-blush text-maroon min-h-screen flex items-center justify-center p-4 sm:p-6 antialiased selection:bg-rose-surface selection:text-rose-primary`}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-blush-border shadow-[0_8px_30px_rgb(179,25,58,0.06)] p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle gold accent divider line at top */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* Decorative Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-surface border border-blush-border text-rose-primary mb-4 shadow-xs">
              <Heart className="w-6 h-6 fill-rose-primary" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon tracking-tight">
              Wedding Admin
            </h1>
            <p className="text-xs sm:text-sm text-maroon-muted mt-2">
              Sign in to manage Mansi&apos;s wedding invitations &amp; events
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="text-center text-xs text-maroon-muted mt-6">
          Protected wedding administrator portal
        </p>
      </div>
    </div>
  );
}
