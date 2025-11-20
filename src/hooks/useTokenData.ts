"use client";

import { useQuery } from "@tanstack/react-query";
import { Token, TokenCategory } from "@/types/token";

// replace with your real API later
async function fetchTokens(category: TokenCategory): Promise<Token[]> {
  const res = await fetch(`/api/tokens?category=${category}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load tokens");
  return res.json();
}

export function useTokenData(category: TokenCategory) {
  return useQuery({
    queryKey: ["tokens", category],
    queryFn: () => fetchTokens(category),
  });
}
