// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import pulseUI from "./pulseSlice";

export const store = configureStore({
  reducer: { pulseUI },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
