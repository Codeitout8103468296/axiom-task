// src/store/pulseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MetricsSize = "small" | "large";
type QuickBuySize = "small" | "large" | "mega" | "ultra";

interface PulseUIState {
  metricsSize: MetricsSize;
  quickBuySize: QuickBuySize;
  showSearch: boolean;
  noDecimals: boolean;
  priority: "P1" | "P2" | "P3";
}

const initialState: PulseUIState = {
  metricsSize: "small",
  quickBuySize: "small",
  showSearch: false,
  noDecimals: false,
  priority: "P1",
};

const pulseSlice = createSlice({
  name: "pulseUI",
  initialState,
  reducers: {
    setMetricsSize: (s, a: PayloadAction<MetricsSize>) => { s.metricsSize = a.payload; },
    setQuickBuySize: (s, a: PayloadAction<QuickBuySize>) => { s.quickBuySize = a.payload; },
    toggleSearch: (s) => { s.showSearch = !s.showSearch; },
    toggleNoDecimals: (s) => { s.noDecimals = !s.noDecimals; },
    setPriority: (s, a: PayloadAction<"P1"|"P2"|"P3">) => { s.priority = a.payload; },
  },
});

export const {
  setMetricsSize, setQuickBuySize, toggleSearch, toggleNoDecimals, setPriority
} = pulseSlice.actions;

export default pulseSlice.reducer;
