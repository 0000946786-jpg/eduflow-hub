import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PageHeader, Panel, StatCard } from "@/components/layout/PageSection";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/gerente/dashboard")({
  component: DashboardGerente,
});

const ATIVIDADES = [
  {
    texto: "Turma Pneumática — T08 teve 5 matrículas novas",
    quando: "há 12 min",
    cor: "bg-accent",
  },
  {
    texto: 'Instrutor Rafael Menezes publicou a atividade "Manutenção preventiva"',
    quando: "há 1 h",
    cor: "bg-primary",
  },
  {
    texto: "Aluno Camila Rocha concluiu a ordem de serviço OS-1147",
    quando: "há 3 h",
    cor: "bg-chart-3",
  },
];

function DashboardGerente() {
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
          titulo={`Olá, ${usuario?.nome?.split(" ")[0] ?? "gerente"}`}
          descricao="Aqui está o panorama da sua operação hoje."
        />
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard rotulo="Alunos" valor="1.284" nota="+38 este mês" destaque />
        <StatCard rotulo="Instrutores" valor="63" nota="2 em onboarding" />
        <StatCard rotulo="Cursos e turmas" valor="212" nota="98% ocupação" destaque />
        <StatCard rotulo="Ordens de serviço" valor="47" nota="12 pendentes" />
      </div>

      <div className="mt-5">
        <Panel titulo="Atividade recente">
          <ul className="divide-y divide-border">
            {ATIVIDADES.map((item) => (
              <li key={item.texto} className="flex items-center gap-3 py-2.5">
                <span className={`size-2 shrink-0 rounded-full ${item.cor}`} />
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
