import { NextRequest, NextResponse } from "next/server";
import type { Token, TokenCategory } from "@/types/token";

function makeToken(i: number, category: TokenCategory): Token {
  const base = category === "newPairs" ? 5_000 : category === "finalStretch" ? 50_000 : 150_000;

  const pct = (Math.sin(i * 1.7 + category.length) * 80); // roughly -80..80
  const mc = base * (i + 1) * (1 + Math.abs(pct) / 120);

  return {
    id: `${category}-${i}`,
    symbol: `TKN${i}`,
    name: `${category.toUpperCase()} #${i}`,
    address: `So1aNaMockAddr${i.toString().padStart(4, "0")}`,

    price: Number((0.00005 + i * 0.00002 + Math.random() * 0.00003).toFixed(6)),
    priceChange24h: Number(pct.toFixed(2)),

    marketCap: mc,
    volume24h: mc * (0.15 + (i % 5) * 0.05),
    liquidity: mc * (0.05 + (i % 3) * 0.03),

    holders: Math.max(5, Math.floor(30 + i * 11 + Math.random() * 120)),
    age: `${(i % 24) + 1}h`,
    verified: i % 4 === 0,

    ds: Math.max(0, Math.min(100, Math.floor(10 + (i * 7) % 90))),
    launchAge: "6mo",
    migrationProgress: category === "finalStretch" ? Math.min(100, 10 + i * 7) : undefined,
  };
}

function buildList(category: TokenCategory, count = 25): Token[] {
  return Array.from({ length: count }, (_, i) => makeToken(i, category));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = (searchParams.get("category") || "newPairs") as TokenCategory;

  if (!["newPairs", "finalStretch", "migrated"].includes(category)) {
    return NextResponse.json(
      { error: "Invalid category" },
      { status: 400 }
    );
  }

  // mock-ish data per column
  const data = buildList(category, 30);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
