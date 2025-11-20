"use client";

import { Button } from "@/components/ui/button";
import { usePulseUI, MetricsSize, QuickBuySize } from "@/store/pulseUI";
import { LayoutGrid, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DisplayPopover() {
  const {
    metricsSize, quickBuySize, showSearchBar, noDecimals,
    setMetricsSize, setQuickBuySize, toggleSearchBar, toggleNoDecimals
  } = usePulseUI();

  const [open, setOpen] = useState(false);

  const metricBtn = (s: MetricsSize) =>
    cn(
      "flex-1 justify-center",
      metricsSize === s ? "bg-muted text-foreground border-border" : "text-muted-foreground"
    );

  const qbBtn = (s: QuickBuySize) =>
    cn(
      "justify-center",
      quickBuySize === s ? "bg-muted text-foreground border-border" : "text-muted-foreground"
    );

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="gap-2" onClick={() => setOpen(v => !v)}>
        <LayoutGrid className="h-4 w-4" />
        Display
        <ChevronDown className="h-3 w-3" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-soft z-50">
          <div className="p-3 space-y-3">
            {/* Metrics */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <Zap className="h-3 w-3" /> Metrics
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className={metricBtn("small")} onClick={() => setMetricsSize("small")}>
                  MC Small
                </Button>
                <Button variant="outline" size="sm" className={metricBtn("large")} onClick={() => setMetricsSize("large")}>
                  MC Large
                </Button>
              </div>
            </div>

            {/* Quick buy */}
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground font-medium">Quick Buy</div>
              <div className="grid grid-cols-4 gap-2">
                {(["small","large","mega","ultra"] as QuickBuySize[]).map(s => (
                  <Button key={s} variant="outline" size="sm" className={qbBtn(s)} onClick={() => setQuickBuySize(s)}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="flex items-center justify-between text-xs cursor-pointer hover:bg-muted/60 p-2 rounded-md">
                <span>Show Search Bar</span>
                <input type="checkbox" checked={showSearchBar} onChange={toggleSearchBar} />
              </label>
              <label className="flex items-center justify-between text-xs cursor-pointer hover:bg-muted/60 p-2 rounded-md">
                <span>No Decimals</span>
                <input type="checkbox" checked={noDecimals} onChange={toggleNoDecimals} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
