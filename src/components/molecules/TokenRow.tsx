import { Token } from '@/types/token';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { PercentageChange } from '@/components/atoms/PercentageChange';
import { TokenBadge } from '@/components/atoms/TokenBadge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TokenRowProps {
  token: Token;
  priceFlash?: 'up' | 'down';
  onViewDetails: (token: Token) => void;
}

export const TokenRow = ({ token, priceFlash, onViewDetails }: TokenRowProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-4 p-4 border-b border-border/50',
        'hover:bg-muted/30 transition-colors cursor-pointer'
      )}
      onClick={() => onViewDetails(token)}
    >
      {/* Token Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-sm font-bold">
          {token.symbol.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground truncate">{token.symbol}</span>
            {token.verified && <TokenBadge type="verified" />}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground truncate block hover:text-primary transition-colors">
                  {token.address}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{token.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Click to copy address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Price */}
      <div className="w-28 text-right">
        <PriceDisplay price={token.price} flash={priceFlash} />
      </div>

      {/* Change */}
      <div className="w-24 flex justify-end">
        <PercentageChange value={token.priceChange24h} />
      </div>

      {/* Volume */}
      <div className="hidden md:block w-28 text-right">
        <span className="text-sm text-muted-foreground">{formatNumber(token.volume24h)}</span>
      </div>

      {/* Market Cap */}
      <div className="hidden lg:block w-28 text-right">
        <span className="text-sm text-muted-foreground">{formatNumber(token.marketCap)}</span>
      </div>

      {/* Migration Progress (for trending) */}
      {token.migrationProgress !== undefined && (
        <div className="hidden xl:flex items-center gap-2 w-32">
          <Progress value={token.migrationProgress} className="h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {token.migrationProgress}%
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View on Explorer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
