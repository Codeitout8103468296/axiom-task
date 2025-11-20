"use client";

import { Zap } from "lucide-react";

interface ColumnHeaderProps {
  title: string;
  count?: number;
}

export function ColumnHeader({ title, count = 0 }: ColumnHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
}
