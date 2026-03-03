import { Metadata } from "next";
import Link from "next/link";
import { affiliateProducts, getProductsByCategory } from "@/data/affiliate-products";
import { ProductGrid } from "@/components/ProductCard";

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-emerald-600">
        ← Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4">
        Best Pickleball Gear 2026
      </h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        Our top picks for paddles, balls, shoes, and court equipment. Every product is
        researched and recommended based on player reviews, tournament use, and value.
      </p>
      <p className="text-xs text-gray-400 mt-1">
        As an Amazon Associate, we earn from qualifying purchases.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🏓 Best Paddles</h2>
        <p className="text-gray-600 mb-4">
          The paddle is the most important piece of gear. These are the top-rated paddles
          used by pro and recreational players in 2026.
        </p>
        <ProductGrid products={paddles} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">⚪ Best Balls</h2>
        <p className="text-gray-600 mb-4">
          Using the right ball matters for consistent play. These are the most popular
          outdoor pickleballs used in tournaments and recreation.
        </p>
        <ProductGrid products={balls} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">👟 Best Shoes</h2>
        <p className="text-gray-600 mb-4">
          Proper court shoes prevent injuries and improve your game. Look for lateral
          support, cushioning, and non-marking soles.
        </p>
        <ProductGrid products={shoes} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">🎒 Court Equipment</h2>
        <p className="text-gray-600 mb-4">
          Everything else you need to play anywhere.
        </p>
        <ProductGrid products={equipment} />
      </section>

      <div className="mt-12 p-6 bg-emerald-50 rounded-lg">
        <h3 className="font-bold text-lg">Looking for courts to play on?</h3>
        <p className="text-gray-600 mt-1">
          Find pickleball courts near you with our{" "}
          <Link href="/" className="text-emerald-600 hover:underline font-medium">
            nationwide court finder
          </Link>
          . 300+ cities covered.
        </p>
      </div>
    </div>
  );
}
