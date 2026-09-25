import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PageHeader, Panel, StatCard } from "@/components/layout/PageSection";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/instrutor/dashboard")({
  component: DashboardInstrutor,
});

const PENDENCIAS = [
  { texto: "Corrigir avaliação prática — Turma Soldagem T03", quando: "vence hoje" },
  { texto: "Publicar conteúdo do módulo 4 — Pneumática T08", quando: "amanhã" },
  { texto: "Abrir ordem de serviço para a oficina 2", quando: "esta semana" },
];

function DashboardInstrutor() {
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
          titulo={`Olá, ${usuario?.nome?.split(" ")[0] ?? "instrutor"}`}
          descricao="Acompanhe suas turmas e as atividades desta semana."
        />
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard rotulo="Minhas turmas" valor="6" nota="2 iniciando" destaque />
        <StatCard rotulo="Total de alunos" valor="128" nota="+9 esta semana" />
        <StatCard rotulo="Conteúdos" valor="34" nota="4 rascunhos" />
        <StatCard rotulo="Atividades pendentes" valor="7" nota="3 vencem hoje" destaque />
      </div>

      <div className="mt-5">
        <Panel titulo="Atividades pendentes">
          <ul className="divide-y divide-border">
            {PENDENCIAS.map((item) => (
              <li key={item.texto} className="flex items-center gap-3 py-2.5">
                <span className="size-2 shrink-0 rounded-full bg-accent" />
                <p className="flex-1 truncate text-sm text-foreground/75">{item.texto}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.quando}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
