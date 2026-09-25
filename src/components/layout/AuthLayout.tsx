import type { ReactNode } from "react";
import painel from "@/assets/painel-institucional.jpg";
import { BrandMark } from "./BrandMark";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-gradient min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Painel institucional */}
        <div className="hidden flex-col justify-between p-12 lg:flex lg:w-[46%] xl:p-16">
          <BrandMark />

          <div className="anim-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-subtle px-3 py-1">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground/70">
                Plataforma de gestão educacional
              </span>
            </div>
            <h1 className="max-w-[16ch] text-balance font-display text-5xl leading-none text-primary">
              Gestão de treinamento, com clareza institucional
            </h1>
            <p className="mt-5 max-w-[42ch] text-pretty text-base text-muted-foreground">
              Coordene turmas, instrutores, atividades e ordens de serviço em um único centro de
              comando — do planejamento ao relatório final.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-3">
              {[
                { valor: "1.284", rotulo: "Alunos ativos" },
                { valor: "63", rotulo: "Instrutores" },
                { valor: "212", rotulo: "Turmas abertas" },
              ].map((item) => (
                <div key={item.rotulo} className="glass-subtle rounded-lg p-4">
                  <p className="font-display text-2xl font-semibold text-primary">{item.valor}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.rotulo}</p>
                </div>
              ))}
            </div>

            <img
              src={painel}
              alt="Painéis de gestão educacional"
              width={1024}
              height={640}
              className="mt-9 w-full rounded-xl object-cover ring-1 ring-border"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Vetor. Gestão educacional séria, do início ao relatório.
          </p>
        </div>

        {/* Área de formulário */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
