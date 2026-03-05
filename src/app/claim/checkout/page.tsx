"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Loader2 } from "lucide-react";

const planDetails: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic", price: 29 },
  pro: { name: "Pro", price: 99 },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "basic";
  const plan = planDetails[planParam] || planDetails.basic;

  const [form, setForm] = useState({
    courtName: "",
    courtCity: "",
    ownerName: "",
    ownerEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/claim/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: planParam }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
      <Link
        href="/claim"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to plans
      </Link>

      {/* Plan summary */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BadgeCheck className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="font-[var(--font-outfit)] font-bold text-gray-900">
              {plan.name} Plan
            </p>
            <p className="text-sm text-gray-500">Claim your court listing</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-[var(--font-outfit)] font-black text-gray-900">
            ${plan.price}
          </span>
          <span className="text-gray-400 text-sm">/mo</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-gray-900">
          Claim Your Court
        </h1>
        <p className="text-sm text-gray-500">
          Enter your court and contact details below.
        </p>

        <div>
          <label
            htmlFor="courtName"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Court Name
          </label>
          <input
            id="courtName"
            name="courtName"
            type="text"
            required
            value={form.courtName}
            onChange={handleChange}
            placeholder="e.g. Sunset Pickleball Club"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="courtCity"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Court City
          </label>
          <input
            id="courtCity"
            name="courtCity"
            type="text"
            required
            value={form.courtCity}
            onChange={handleChange}
            placeholder="e.g. Austin, TX"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="ownerName"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Your Name
          </label>
          <input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            value={form.ownerName}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="ownerEmail"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Your Email
          </label>
          <input
            id="ownerEmail"
            name="ownerEmail"
            type="email"
            required
            value={form.ownerEmail}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting to payment…
            </>
          ) : (
            "Proceed to Payment"
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          You&apos;ll be redirected to Stripe for secure payment processing.
        </p>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
