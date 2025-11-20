"use client";

import { Token } from "@/types/token";
import { TokenCard } from "@/components/molecules/TokenCard";
import { TokenDetailsModal } from "@/components/molecules/TokenDetailsModal";
import { ColumnHeader } from "@/components/molecules/ColumnHeader";
import { SkeletonRow } from "@/components/atoms/SkeletonRow";
import { useRealtimePrice } from "@/hooks/useRealtimePrice";
import { useState } from "react";

export function TokenTable({
  title,
  tokens,
  isLoading,
}: {
  title: string;
  tokens: Token[];
  isLoading?: boolean;
}) {
  const [selected, setSelected] = useState<Token | null>(null);
  const [open, setOpen] = useState(false);

  const priceUpdates = useRealtimePrice(tokens);

  const onView = (t: Token) => {
    setSelected(t);
    setOpen(true);
  };

  return (
    <div className="flex flex-col h-full rounded-md border border-border bg-card/40 overflow-hidden">
      <ColumnHeader title={title} count={tokens.length} />

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
          : tokens.map((t) => {
              const u = priceUpdates.get(t.id);
              return (
                <TokenCard
                  key={t.id}
                  token={{ ...t, price: u?.price ?? t.price }}
                  priceFlash={u?.direction}
                  onViewDetails={onView}
                />
              );
            })}
      </div>

      <TokenDetailsModal token={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
