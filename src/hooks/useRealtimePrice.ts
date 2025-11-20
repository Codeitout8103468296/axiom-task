"use client";

import { useEffect, useMemo, useState } from "react";
import { Token } from "@/types/token";

export type FlashDir = "up" | "down";

export function useRealtimePrice(tokens: Token[]) {
  const [map, setMap] = useState<Map<string, { price: number; direction: FlashDir }>>(new Map());

  const ids = useMemo(() => tokens.map(t => t.id), [tokens]);

  useEffect(() => {
    if (!ids.length) return;

    const interval = setInterval(() => {
      setMap(prev => {
        const next = new Map(prev);
        for (const t of tokens) {
          const jitter = (Math.random() - 0.5) * t.price * 0.01;
          const newPrice = Math.max(0, t.price + jitter);
          const dir: FlashDir = newPrice >= t.price ? "up" : "down";
          next.set(t.id, { price: newPrice, direction: dir });
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [ids.join("|")]);

  return map;
}
