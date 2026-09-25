import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PageHeader, Panel, StatCard } from "@/components/layout/PageSection";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/aluno/dashboard")({
  component: DashboardAluno,
});

const PROXIMAS = [
  { texto: "Entrega da ordem de serviço OS-1147", quando: "hoje, 18h" },
  { texto: "Avaliação prática — Pneumática módulo 3", quando: "quinta-feira" },
  { texto: "Leitura: segurança em oficina", quando: "próxima semana" },
];

const NOTAS = [
  { texto: "Manutenção preventiva — atividade 2", nota: "9,4" },
  { texto: "Segurança operacional — prova 1", nota: "8,7" },
  { texto: "Pneumática — atividade prática", nota: "9,0" },
];

function DashboardAluno() {
  const { data: usuario, isLoading } = useCurrentUser();

  return (
    <>
      {isLoading ? (
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
      ) : (
        <PageHeader
          titulo={`Olá, ${usuario?.nome?.split(" ")[0] ?? "aluno"}`}
          descricao="Suas demandas, ordens de serviço e avaliações em um só lugar."
        />
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard rotulo="Meus cursos" valor="4" nota="2 em andamento" destaque />
        <StatCard rotulo="Meu progresso" valor="72%" nota="meta: 80% no mês" />
        <StatCard rotulo="Próximas atividades" valor="3" nota="1 vence hoje" destaque />
        <StatCard rotulo="Média geral" valor="9,0" nota="últimas 3 avaliações" />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <Panel titulo="Próximas atividades">
          <ul className="divide-y divide-border">
            {PROXIMAS.map((item) => (
              <li key={item.texto} className="flex items-center gap-3 py-2.5">
                <span className="size-2 shrink-0 rounded-full bg-accent" />
                <p className="flex-1 truncate text-sm text-foreground/75">{item.texto}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.quando}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel titulo="Últimas notas">
          <ul className="divide-y divide-border">
            {NOTAS.map((item) => (
              <li key={item.texto} className="flex items-center gap-3 py-2.5">
                <p className="flex-1 truncate text-sm text-foreground/75">{item.texto}</p>
                <span className="shrink-0 font-display text-sm font-semibold text-primary">
                  {item.nota}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
