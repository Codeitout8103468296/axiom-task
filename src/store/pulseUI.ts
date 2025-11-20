import { create } from "zustand";

export type MetricsSize = "small" | "large";
export type QuickBuySize = "small" | "large" | "mega" | "ultra";

interface PulseUIState {
  metricsSize: MetricsSize;
  quickBuySize: QuickBuySize;
  showSearchBar: boolean;
  noDecimals: boolean;

  setMetricsSize: (s: MetricsSize) => void;
  setQuickBuySize: (s: QuickBuySize) => void;
  toggleSearchBar: () => void;
  toggleNoDecimals: () => void;
}

export const usePulseUI = create<PulseUIState>((set) => ({
  metricsSize: "large",
  quickBuySize: "small",
  showSearchBar: true,
  noDecimals: false,

  setMetricsSize: (metricsSize) => set({ metricsSize }),
  setQuickBuySize: (quickBuySize) => set({ quickBuySize }),
  toggleSearchBar: () => set((s) => ({ showSearchBar: !s.showSearchBar })),
  toggleNoDecimals: () => set((s) => ({ noDecimals: !s.noDecimals })),
}));
