import { Token } from "@/types/token";

type PriceCb = (id: string, price: number) => void;

export function connectMockPriceSocket(tokens: Token[], cb: PriceCb) {
  const prices = new Map(tokens.map(t => [t.id, t.price]));

  const interval = setInterval(() => {
    if (!tokens.length) return;
    const t = tokens[Math.floor(Math.random() * tokens.length)];
    const old = prices.get(t.id) ?? t.price;
    const delta = old * (Math.random() * 0.02 - 0.01); // ±1%
    const next = Math.max(0, old + delta);
    prices.set(t.id, next);
    cb(t.id, next);
  }, 700);

  return () => clearInterval(interval);
}
