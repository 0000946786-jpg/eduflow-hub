import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";
import { BrandMark } from "@/components/layout/BrandMark";

export const Route = createFileRoute("/acesso-negado")({
  head: () => ({
    meta: [
      { title: "Acesso negado · Vetor" },
      {
        name: "description",
        content: "Esta página é restrita ao perfil correspondente dentro da plataforma Vetor.",
      },
      { property: "og:title", content: "Acesso negado · Vetor" },
      {
        property: "og:description",
        content: "Esta página é restrita ao perfil correspondente dentro da plataforma Vetor.",
      },
    ],
  }),
  component: AcessoNegado,
});

function AcessoNegado() {
  return (
    <div className="app-gradient flex min-h-screen items-center justify-center p-6">
      <div className="anim-rise glass-panel w-full max-w-md rounded-xl p-8 text-center">
        <BrandMark className="mb-8 justify-center" />
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/10">
          <ShieldAlert className="size-6 text-destructive" aria-hidden />
        </div>
        <h1 className="mt-5 font-display text-xl text-primary">
          Você não possui permissão para acessar esta página.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada perfil tem acesso apenas às áreas correspondentes à sua função.
        </p>
        <div className="mt-6">
          <Link to="/login" className="block">
            <BrandButton type="button">Voltar para o início</BrandButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
