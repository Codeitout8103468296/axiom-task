"use client";

import { Token } from "@/types/token";
import { PriceDisplay } from "@/components/atoms/PriceDisplay";
import { PercentageChange } from "@/components/atoms/PercentageChange";
import { TokenBadge } from "@/components/atoms/TokenBadge";
import { cn } from "@/lib/utils";
import { usePulseUI } from "@/store/pulseUI";
import { Globe, Search, Users, TrendingUp, Flame, Droplet, Pencil } from "lucide-react";

const getTokenImageUrl = (token: Token) =>
  `https://picsum.photos/seed/${encodeURIComponent(token.symbol)}-dp/400/400`;

export function TokenCard({
  token,
  priceFlash,
  onViewDetails,
}: {
  token: Token;
  priceFlash?: "up" | "down";
  onViewDetails: (t: Token) => void;
}) {
  const { metricsSize, noDecimals } = usePulseUI();

  const formatNumber = (num: number) => {
    const n = noDecimals ? Math.round(num) : num;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  const borderClass =
    token.priceChange24h > 50
      ? "border-success/70"
      : token.priceChange24h < -50
      ? "border-danger/70"
      : token.verified
      ? "border-primary/70"
      : "border-border";

  const statusDot =
    token.priceChange24h > 50
      ? "bg-success"
      : token.priceChange24h < -50
      ? "bg-danger"
      : "bg-warning";

  const compact = metricsSize === "small";
  const imgUrl = getTokenImageUrl(token);

  return (
    <div
      onClick={() => onViewDetails(token)}
      className={cn(
        "group relative rounded-md border cursor-pointer transition-all",
        "bg-card hover:bg-card/80",
        "hover:shadow-soft",
        borderClass
      )}
    >
      <div className={cn("px-3 py-2.5", compact ? "space-y-1.5" : "space-y-2")}>
        {/* top row */}
        <div className="flex items-start gap-2.5">
          {/* avatar + hover preview */}
          <div className="relative">
            {/* small DP (trigger) */}
            <div
              className={cn(
                "h-11 w-11 rounded-md border-2 overflow-hidden",
                "peer",
                borderClass
              )}
            >
              <img
                src={imgUrl}
                alt={token.symbol}
                className="h-full w-full object-cover"
              />
            </div>

            {/* status dot */}
            <div
              className={cn(
                "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-card",
                statusDot
              )}
            />

            {/* hover popout – full opacity when visible */}
            <div
              className={cn(
                "pointer-events-none",
                "absolute left-0 top-0 -translate-x-4 translate-y-10",
                "opacity-0 scale-75",
                "peer-hover:opacity-100 peer-hover:scale-100",
                "transition-all duration-200 ease-out",
                "z-40"
              )}
            >
              <div className="w-64 h-64 rounded-xl border border-border/60 shadow-xl overflow-hidden bg-card">
                <img
                  src={imgUrl}
                  alt={token.symbol}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* name + actions */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm truncate">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground truncate">{token.name}</span>
                  {token.verified && <TokenBadge type="verified" />}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-success font-medium">{token.age}</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Pencil className="h-3 w-3 hover:text-foreground" />
                    <Globe className="h-3 w-3 hover:text-foreground" />
                    <Search className="h-3 w-3 hover:text-foreground" />
                    <Users className="h-3 w-3 hover:text-foreground" />
                  </div>
                </div>
              </div>

              {/* MC */}
              <div className="text-right shrink-0">
                <div className="text-[10px] text-muted-foreground">MC</div>
                <div className="text-sm font-semibold">{formatNumber(token.marketCap)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom metrics row */}
        <div className={cn("flex items-center text-xs", compact ? "gap-2" : "gap-3")}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <PercentageChange value={token.priceChange24h} />
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Droplet className="h-3 w-3" />
              <span>{token.ds ?? 0}%</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Flame className="h-3 w-3" />
              <span>{token.launchAge ?? "6mo"}</span>
            </div>

            {!compact && (
              <>
                <div className="text-muted-foreground">V {formatNumber(token.volume24h)}</div>
                <div className="text-muted-foreground">L {formatNumber(token.liquidity)}</div>
              </>
            )}
          </div>

          <div className="ml-auto font-semibold">
            <PriceDisplay price={token.price} flash={priceFlash} />
          </div>
        </div>
      </div>
    </div>
  );
}
