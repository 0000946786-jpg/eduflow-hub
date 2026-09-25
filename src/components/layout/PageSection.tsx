import type { ReactNode } from "react";

export function PageHeader({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-balance font-display text-2xl leading-tight text-primary">{titulo}</h1>
        {descricao ? <p className="mt-1 text-sm text-muted-foreground">{descricao}</p> : null}
      </div>
      {acao}
    </div>
  );
}

export function StatCard({
  rotulo,
  valor,
  nota,
  destaque,
}: {
  rotulo: string;
  valor: string;
  nota?: string;
  destaque?: boolean;
}) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <p className="text-xs text-muted-foreground">{rotulo}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-primary">{valor}</p>
      {nota ? (
        <p
          className={
            destaque
              ? "mt-1 text-xs font-medium text-accent"
              : "mt-1 text-xs font-medium text-muted-foreground"
          }
        >
          {nota}
        </p>
      ) : null}
    </div>
  );
}

export function Panel({
  titulo,
  children,
  acao,
}: {
  titulo: string;
  children: ReactNode;
  acao?: ReactNode;
}) {
  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-primary">{titulo}</h2>
        {acao}
      </div>
      {children}
    </div>
  );
}

export function EmptyState({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="glass-panel rounded-xl p-10 text-center">
      <h2 className="font-display text-base text-primary">{titulo}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{descricao}</p>
    </div>
  );
}
