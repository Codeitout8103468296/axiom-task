"use client";

import { Token } from "@/types/token";
import { PriceDisplay } from "@/components/atoms/PriceDisplay";
import { PercentageChange } from "@/components/atoms/PercentageChange";
import { Button } from "@/components/ui/button";

export function TokenDetailsModal({
  token,
  open,
  onOpenChange,
}: {
  token: Token | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!token || !open) return null;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => onOpenChange(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-lg border border-border bg-card p-5 shadow-soft"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-md bg-gradient-to-br from-primary/25 to-primary-glow/10 flex items-center justify-center text-lg font-bold border border-border">
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="text-xl font-semibold">{token.symbol}</div>
            <div className="text-sm text-muted-foreground">{token.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <div className="text-sm text-muted-foreground">Current Price</div>
            <PriceDisplay price={token.price} className="text-2xl font-bold" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">24h Change</div>
            <PercentageChange value={token.priceChange24h} className="text-xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 mt-5 bg-muted/40 rounded-md border border-border">
          <div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-lg font-semibold">{fmt(token.marketCap)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Liquidity</div>
            <div className="text-lg font-semibold">{fmt(token.liquidity)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Holders</div>
            <div className="text-lg font-semibold">{token.holders.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div className="text-lg font-semibold">{fmt(token.volume24h)}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button className="flex-1">Trade Now</Button>
          <Button variant="outline" className="flex-1">Explorer</Button>
        </div>
      </div>
    </div>
  );
}
