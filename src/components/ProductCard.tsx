import { AffiliateProduct } from "@/data/affiliate-products";
import { ExternalLink, Star } from "lucide-react";

export function ProductCard({ product }: { product: AffiliateProduct }) {
  const categoryColors: Record<string, string> = {
    paddle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ball: "bg-amber-50 text-amber-700 border-amber-200",
    shoe: "bg-blue-50 text-blue-700 border-blue-200",
    equipment: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const categoryEmoji: Record<string, string> = {
    paddle: "🏓",
    ball: "⚪",
    shoe: "👟",
    equipment: "🎒",
  };

  return (
    <div className="card-hover bg-white border border-gray-100 rounded-2xl p-5 flex flex-col">
      {/* Category Tag */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[product.category] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
          {categoryEmoji[product.category]} {product.category}
        </span>
      </div>

      {/* Product Info */}
      <h3 className="font-[var(--font-outfit)] font-bold text-gray-900 text-base leading-tight">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed flex-1">
        {product.description}
      </p>

      {/* Price + Rating */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <span className="text-lg font-extrabold text-emerald-700 font-[var(--font-outfit)]">
          {product.priceRange}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-gray-700">{product.rating}</span>
        </span>
      </div>

      {/* CTA Button */}
      <a
        href={product.amazonUrl}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 font-bold px-5 py-3 rounded-xl text-sm hover:from-amber-400 hover:to-amber-300 transition-all shadow-md shadow-amber-500/15 hover:shadow-amber-400/25"
      >
        Check Price on Amazon
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function ProductGrid({ products }: { products: AffiliateProduct[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product, i) => (
        <div key={product.name} className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
