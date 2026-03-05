import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import {
  BadgeCheck,
  TrendingUp,
  ImagePlus,
  MessageSquare,
  BarChart3,
  Star,
  Check,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Claim Your Court Listing | Pickleball Court Guide",
  description:
    "Own a pickleball court? Claim your listing to manage hours, photos, and description. Get a verified badge and appear higher in search results.",
};

const benefits = [
  {
    icon: ImagePlus,
    title: "Manage Your Listing",
    desc: "Update hours, photos, description, and contact info anytime.",
    accent: "from-emerald-50 to-emerald-100 text-emerald-600",
  },
  {
    icon: BadgeCheck,
    title: "Verified Badge",
    desc: "Stand out with a trusted verified badge on your listing.",
    accent: "from-amber-50 to-amber-100 text-amber-600",
  },
  {
    icon: TrendingUp,
    title: "Higher Placement",
    desc: "Claimed courts appear higher in city search results.",
    accent: "from-blue-50 to-blue-100 text-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Lead Capture",
    desc: "Get direct contact form leads from players in your area.",
    accent: "from-purple-50 to-purple-100 text-purple-600",
  },
];

const plans = [
  {
    name: "Basic",
    price: 29,
    param: "basic",
    popular: false,
    features: [
      "Claim your listing",
      "Update hours, photos & info",
      "Verified badge on listing",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: 99,
    param: "pro",
    popular: true,
    features: [
      "Everything in Basic",
      "Featured placement in results",
      "Lead capture contact form",
      "Analytics dashboard",
      "Highlighted listing card",
    ],
  },
];

const faqs = [
  {
    q: "How do I prove I own the court?",
    a: "After checkout, our team will verify ownership within 24 hours. We may ask for a business license, utility bill, or other proof of ownership.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Both plans are month-to-month with no long-term contract. Cancel anytime from your Stripe billing portal.",
  },
  {
    q: "What happens after I claim?",
    a: "Once verified, you'll receive an email with a link to your listing management dashboard where you can update all your court details.",
  },
  {
    q: "Do I need a Pro plan for the verified badge?",
    a: "No. Both Basic and Pro plans include the verified badge on your listing.",
  },
];

export default function ClaimPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-[15%] w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <BadgeCheck className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-emerald-100">
              For Court Owners & Managers
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[var(--font-outfit)] font-black tracking-tight leading-[0.95]">
            Own a Pickleball Court?
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              Claim Your Listing
            </span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-emerald-100/80 max-w-xl leading-relaxed">
            Take control of your court&apos;s presence. Update info, earn a
            verified badge, and connect with thousands of local players.
          </p>

          <Link
            href="#pricing"
            className="mt-8 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            See Plans & Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <AdSlot slot="claim-top" className="max-w-7xl mx-auto px-4 mt-6 h-24" />

      {/* ===== BENEFITS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-center text-gray-900 mb-3">
          Why Claim Your Court?
        </h2>
        <p className="text-gray-500 text-center text-sm max-w-md mx-auto mb-10">
          Everything you need to attract more players and manage your listing.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, title, desc, accent }, i) => (
            <div
              key={title}
              className={`animate-fade-in-up stagger-${i + 1} card-hover bg-white border border-gray-100 rounded-2xl p-6`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-[var(--font-outfit)] font-bold text-lg text-gray-900 mt-4">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mt-2">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="bg-gradient-to-b from-gray-50/80 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-center text-gray-900 mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 text-center text-sm max-w-md mx-auto mb-10">
            No hidden fees. Cancel anytime. Start growing your court today.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`animate-fade-in-up stagger-${i + 1} relative bg-white border rounded-2xl p-8 ${
                  plan.popular
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="font-[var(--font-outfit)] font-bold text-xl text-gray-900">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-[var(--font-outfit)] font-black text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/claim/checkout?plan=${plan.param}`}
                  className={`mt-8 block text-center font-bold text-sm py-3.5 rounded-xl transition-colors ${
                    plan.popular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Claim Now
                  <ArrowRight className="w-4 h-4 inline ml-1.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-center text-gray-900 mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Choose a Plan", desc: "Pick Basic or Pro based on your needs." },
            { step: "2", title: "Submit Your Info", desc: "Tell us your court name, city, and contact details." },
            { step: "3", title: "Get Verified", desc: "We verify ownership within 24 hours and activate your listing." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-10 h-10 bg-emerald-600 text-white font-[var(--font-outfit)] font-black text-lg rounded-full flex items-center justify-center mx-auto">
                {step}
              </div>
              <h3 className="font-[var(--font-outfit)] font-bold text-gray-900 mt-3">
                {title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gradient-to-b from-gray-50/80 to-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white border border-gray-100 rounded-2xl">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-semibold text-gray-900">
                  {q}
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AdSlot slot="claim-bottom" className="max-w-7xl mx-auto px-4 my-8 h-24" />
    </>
  );
}
