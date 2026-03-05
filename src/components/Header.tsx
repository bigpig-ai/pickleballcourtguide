"use client";

import Link from "next/link";
import { MapPin, ShoppingBag, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-[var(--font-outfit)] font-extrabold text-xl tracking-tight text-emerald-950">
            Pickleball
            <span className="text-emerald-600">Guide</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <MapPin className="w-4 h-4" />
            Find Courts
          </Link>
          <Link
            href="/gear"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Gear
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Guides
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              <MapPin className="w-4 h-4" />
              Find Courts
            </Link>
            <Link
              href="/gear"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Gear
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Guides
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
