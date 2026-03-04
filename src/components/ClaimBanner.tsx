"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "pcg-claim-banner-dismissed";
const DISMISS_TTL_DAYS = 14;

function isDismissedRecently(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    const ageMs = Date.now() - ts;
    return ageMs < DISMISS_TTL_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function ClaimBanner() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHidden(isDismissedRecently());
  }, []);

  // Do not render on claim pages
  const isClaimRoute = pathname?.startsWith("/claim");
  if (!mounted || hidden || isClaimRoute) return null;

  const onDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setHidden(true);
  };

  return (
    <div role="region" aria-label="Claim your court banner" className="w-full border-b border-emerald-200/60 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 text-emerald-900">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* Reserve height to avoid CLS */}
        <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-2.5 min-h-[44px]">
          <div className="hidden sm:block text-emerald-600">🏷️</div>
          <p className="flex-1 text-xs sm:text-sm leading-snug">
            <span className="font-semibold">Own or manage a pickleball court?</span>{" "}
            Claim your listing to update info, add photos, and reach more players.
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/claim"
              className="inline-flex items-center rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Claim your court
            </Link>
            <Link
              href="/claim"
              className="hidden sm:inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Learn more
            </Link>
            <button
              type="button"
              aria-label="Dismiss banner"
              onClick={onDismiss}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-emerald-700 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
