import { cn } from "@/lib/utils";

export function PercentageChange({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span className={cn(up ? "text-success" : "text-danger", "text-sm font-medium", className)}>
      {up ? "↗" : "↘"} {Math.abs(value).toFixed(0)}%
    </span>
  );
}
