import { ROLE_LIST, type AppRole } from "@/lib/roles";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  value: AppRole | null;
  onChange: (role: AppRole) => void;
  variant?: "compact" | "detailed";
  label?: string;
}

export function RoleSelector({
  value,
  onChange,
  variant = "compact",
  label = "Como você deseja acessar?",
}: RoleSelectorProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className={cn("grid gap-2", variant === "compact" ? "grid-cols-3" : "grid-cols-1")}>
        {ROLE_LIST.map((role) => {
          const selected = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(role.value)}
              className={cn(
                "rounded-lg p-3 text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "bg-primary/[0.07] ring-1 ring-primary"
                  : "glass-subtle ring-1 ring-border",
              )}
            >
              <span aria-hidden className="text-base">
                {role.emoji}
              </span>
              <p
                className={cn(
                  "mt-1 font-display text-xs font-semibold",
                  selected ? "text-primary" : "text-foreground/75",
                )}
              >
                {role.label}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {variant === "compact" ? role.shortDescription : role.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
