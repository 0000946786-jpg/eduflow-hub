import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Field({ label, error, hint, className, id, ...props }: FieldProps) {
  const inputId = id ?? props.name;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground/75">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-lg bg-card/70 px-3.5 py-2.5 text-sm text-foreground ring-1 ring-border transition-shadow placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
          error && "ring-destructive focus:ring-destructive",
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
