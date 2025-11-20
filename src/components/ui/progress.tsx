import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
  const v = Math.min(100, Math.max(0, value ?? 0));
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
