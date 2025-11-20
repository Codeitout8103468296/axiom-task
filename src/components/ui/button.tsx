import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "ghost" | "outline";
type Size = "sm" | "md" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const v =
      variant === "default"
        ? "bg-primary text-black hover:opacity-90"
        : variant === "outline"
        ? "border border-border bg-transparent hover:bg-muted/60"
        : "bg-transparent hover:bg-muted/60";

    const s =
      size === "icon"
        ? "h-8 w-8 p-0"
        : size === "sm"
        ? "h-7 px-2 text-xs"
        : "h-9 px-3 text-sm";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          v,
          s,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
