"use client";

export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <div className={`bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground/40 text-sm ${className}`}>
      <span>Ad Slot: {slot}</span>
    </div>
  );
}
