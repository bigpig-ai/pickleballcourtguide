import Link from "next/link";
import type { Metadata } from "next";
import { BadgeCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claim Submitted | Pickleball Court Guide",
  description: "Your court claim has been submitted. We'll verify your listing within 24 hours.",
};

export default function ClaimSuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 md:py-32 text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BadgeCheck className="w-8 h-8 text-emerald-600" />
      </div>

      <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black text-gray-900">
        Thank You!
      </h1>

      <p className="mt-4 text-gray-500 leading-relaxed max-w-md mx-auto">
        Your payment was successful. We&apos;ll verify your court ownership
        within 24 hours and activate your claimed listing. Check your email for
        a confirmation.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors"
      >
        Back to Homepage
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
