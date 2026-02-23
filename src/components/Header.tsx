"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-emerald-900">Pickleball<span className="text-emerald-600">Courts</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Find Courts</Link>
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">Guides</Link>
        </nav>
      </div>
    </header>
  );
}
