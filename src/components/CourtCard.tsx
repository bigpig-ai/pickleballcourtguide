import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone } from "lucide-react";
import type { Court } from "@/lib/google-places";

export function CourtCard({ court }: { court: Court }) {
  return (
    <Link href={`/courts/${court.slug}`}>
      <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
        {court.photos?.[0] ? (
          <div className="h-48 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={court.photos[0]}
              alt={court.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-48 bg-emerald-50 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-emerald-200" />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {court.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{court.address}</span>
          </p>
          <div className="flex items-center gap-3 mt-3">
            {court.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{court.rating}</span>
                {court.reviewCount && (
                  <span className="text-sm text-gray-400">({court.reviewCount})</span>
                )}
              </div>
            )}
            {court.businessStatus === "OPERATIONAL" && (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">Open</Badge>
            )}
          </div>
          {court.phone && (
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {court.phone}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
