"use client";

import { useState } from "react";
import { TokenTable } from "./TokenTable";
import { useTokenData } from "@/hooks/useTokenData";
import { DisplayPopover } from "@/components/molecules/DisplayPopover";
import { cn } from "@/lib/utils";

type ColumnKey = "newPairs" | "finalStretch" | "migrated";

const TAB_META: { key: ColumnKey; label: string }[] = [
  { key: "newPairs", label: "New Pairs" },
  { key: "finalStretch", label: "Final Stretch" },
  { key: "migrated", label: "Migrated" },
];

export function PulseShell() {
  const [activeTab, setActiveTab] = useState<ColumnKey>("newPairs");

  const newPairs = useTokenData("newPairs");
  const finalStretch = useTokenData("finalStretch");
  const migrated = useTokenData("migrated");

  const getTokens = (key: ColumnKey) => {
    switch (key) {
      case "newPairs":
        return { data: newPairs.data ?? [], loading: newPairs.isLoading };
      case "finalStretch":
        return { data: finalStretch.data ?? [], loading: finalStretch.isLoading };
      case "migrated":
        return { data: migrated.data ?? [], loading: migrated.isLoading };
    }
  };

  const active = getTokens(activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top header row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h1 className="text-lg font-semibold text-foreground">Pulse</h1>

        {/* Single Display control for layout / metrics */}
        <DisplayPopover />
      </div>

      {/* Mobile / tablet: tabbed single-column view */}
      <div className="px-3 pb-3 lg:hidden">
        {/* Tabs like Axiom (New Pairs / Final Stretch / Migrated) */}
        <div className="mb-2 flex items-center gap-2 overflow-x-auto">
          {TAB_META.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                "border border-border bg-background/40 hover:bg-background/70 transition-colors",
                activeTab === tab.key && "bg-primary/20 border-primary text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active column for current tab */}
        <TokenTable
          title={TAB_META.find((t) => t.key === activeTab)?.label ?? "New Pairs"}
          tokens={active.data}
          isLoading={active.loading}
        />
      </div>

      {/* Desktop: 3 fixed columns side-by-side */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-2 px-3 pb-3 h-[calc(100vh-80px)]">
        <TokenTable
          title="New Pairs"
          tokens={newPairs.data ?? []}
          isLoading={newPairs.isLoading}
        />
        <TokenTable
          title="Final Stretch"
          tokens={finalStretch.data ?? []}
          isLoading={finalStretch.isLoading}
        />
        <TokenTable
          title="Migrated"
          tokens={migrated.data ?? []}
          isLoading={migrated.isLoading}
        />
      </div>
    </div>
  );
}
