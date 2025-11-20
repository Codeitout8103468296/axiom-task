import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  flash,
  className,
}: {
  price: number;
  flash?: "up" | "down";
  className?: string;
}) {
  return (
    <span
      className={cn(
        flash === "up" && "text-success",
        flash === "down" && "text-danger",
        className
      )}
    >
      ${price.toFixed(6)}
    </span>
  );
}
