import { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory } from "@/data/affiliate-products";
import { ProductGrid } from "@/components/ProductCard";
import { ArrowRight, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Pickleball Gear 2026 | Paddles, Balls, Shoes & Equipment",
  description:
    "Expert picks for the best pickleball paddles, balls, shoes, and equipment in 2026. Reviewed and recommended by players.",
  openGraph: {
    title: "Best Pickleball Gear 2026",
    description: "Top-rated pickleball paddles, balls, shoes, and court equipment.",
  },
};

export default function GearPage() {
  const paddles = getProductsByCategory("paddle");
  const balls = getProductsByCategory("ball");
  const shoes = getProductsByCategory("shoe");
  const equipment = getProductsByCategory("equipment");

  const categories = [
    { id: "paddles", emoji: "🏓", title: "Best Paddles", subtitle: "The most important piece of gear. Top-rated paddles used by pro and recreational players in 2026.", products: paddles },
    { id: "balls", emoji: "⚪", title: "Best Balls", subtitle: "Using the right ball matters for consistent play. The most popular outdoor pickleballs for tournaments and recreation.", products: balls },
    { id: "shoes", emoji: "👟", title: "Best Shoes", subtitle: "Proper court shoes prevent injuries and improve your game. Look for lateral support, cushioning, and non-marking soles.", products: shoes },
    { id: "equipment", emoji: "🎒", title: "Court Equipment", subtitle: "Everything else you need to play anywhere.", products: equipment },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-100">Gear</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black">
              Best Pickleball Gear 2026
            </h1>
          </div>

          <p className="text-emerald-100/80 text-sm md:text-base max-w-lg">
            Our top picks for paddles, balls, shoes, and court equipment. Every product is
            researched and recommended based on player reviews, tournament use, and value.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Category Quick Jump */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all card-hover"
            >
              <span>{cat.emoji}</span>
              {cat.title}
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-8">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>

        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="mb-14 scroll-mt-20">
            <h2 className="text-2xl font-[var(--font-outfit)] font-black text-gray-900 mb-2">
              {cat.emoji} {cat.title}
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-2xl">
              {cat.subtitle}
            </p>
            <ProductGrid products={cat.products} />
          </section>
        ))}

        {/* CTA */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-2xl p-8 text-center">
          <h3 className="font-[var(--font-outfit)] font-bold text-xl text-gray-900">
            Looking for courts to play on?
          </h3>
          <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
            Find pickleball courts near you with our nationwide court finder. {" "}
            {cities.length}+ cities covered.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-md shadow-emerald-600/15"
          >
            Find Courts Near You
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

// Need cities import for count
import { cities } from "@/data/cities";
