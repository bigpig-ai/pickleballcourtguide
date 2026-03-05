"use client";

export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <div className={`bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-300 text-xs ${className}`}>
      <span>Ad</span>
    </div>
  );
}
