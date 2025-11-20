"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...p }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List className={cn("bg-muted/40 rounded-md p-1", className)} {...p} />
);
export const TabsTrigger = ({ className, ...p }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "text-xs px-2 py-1 rounded data-[state=active]:bg-accent/70",
      className
    )}
    {...p}
  />
);
