import Link from "next/link";
import { Star, MapPin, Phone, Clock, BadgeCheck } from "lucide-react";
import type { Court } from "@/lib/google-places";

export function CourtCard({ court }: { court: Court }) {
  return (
    <div className="card-hover bg-white border border-gray-100 rounded-2xl overflow-hidden group">
      <Link href={`/courts/${court.slug}`} className="block">
        {court.photos?.[0] ? (
          <div className="h-44 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={court.photos[0]}
              alt={court.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {court.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-gray-900">{court.rating}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center relative">
            <div className="w-16 h-16 rounded-full bg-emerald-200/50 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-emerald-400" />
            </div>
            {court.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-gray-900">{court.rating}</span>
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <h3 className="font-[var(--font-outfit)] font-bold text-base leading-tight line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {court.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
            <span className="line-clamp-1">{court.address}</span>
          </p>

          <div className="flex items-center gap-3 mt-3">
            {court.rating && court.reviewCount && (
              <span className="text-xs text-gray-400 font-medium">
                {court.reviewCount} reviews
              </span>
            )}
            {court.businessStatus === "OPERATIONAL" && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full badge-glow">
                Open
              </span>
            )}
          </div>

          {court.phone && (
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {court.phone}
            </p>
          )}
        </div>
      </Link>

      <div className="px-4 pb-3">
        <Link
          href="/claim"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors"
        >
          <BadgeCheck className="w-3 h-3" />
          Own this court? Claim it
        </Link>
      </div>
    </div>
  );
}
