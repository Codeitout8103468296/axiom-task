"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({ className, ...props }: TooltipPrimitive.TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      sideOffset={6}
      className={cn(
        "z-50 rounded-md bg-black px-2 py-1 text-xs text-white shadow",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
);
