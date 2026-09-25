import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  subtitle,
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="grid size-9 place-items-center rounded-lg bg-primary ring-1 ring-border">
        <span className="font-display text-base font-semibold text-primary-foreground">V</span>
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-semibold tracking-tight text-primary">Vetor</p>
        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}
