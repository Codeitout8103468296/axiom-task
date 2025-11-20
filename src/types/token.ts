export type TokenCategory = "newPairs" | "finalStretch" | "migrated";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  address: string;

  price: number;
  priceChange24h: number;

  marketCap: number;
  volume24h: number;
  liquidity: number;

  holders: number;
  age: string;

  verified?: boolean;

  // optional extras for UI (fix your ds/launchAge errors)
  ds?: number;          // dev score %
  launchAge?: string;   // e.g. "6mo"
  migrationProgress?: number;
}
