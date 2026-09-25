import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ROLES, type AppRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { Skeleton } from "@/components/ui/skeleton";

export function AppShell({ role, children }: { role: AppRole; children: ReactNode }) {
  const config = ROLES[role];
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: usuario, isLoading } = useCurrentUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuAberto, setMenuAberto] = useState(false);

  const secaoAtual = config.nav.find((item) => item.to === pathname)?.label ?? "Dashboard";

  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Sessão encerrada.");
    navigate({ to: "/login", replace: true });
  }

  const navegacao = (
    <nav className="space-y-0.5">
      {config.nav.map((item) => {
        const ativo = pathname === item.to;
        const Icone = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMenuAberto(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              ativo
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <Icone className="size-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const rodapeUsuario = (
    <div className="mt-auto rounded-lg glass-subtle p-2">
      {isLoading ? (
        <div className="flex items-center gap-2.5 p-1">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-14" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {usuario?.nome?.slice(0, 2).toUpperCase() ?? "--"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{usuario?.nome}</p>
            <p className="text-xs text-muted-foreground">{config.label}</p>
          </div>
          <button
            type="button"
            onClick={sair}
            aria-label="Sair"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <LogOut className="size-3.5" aria-hidden />
            Sair
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="app-gradient min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-1 p-4 md:flex">
          <div className="glass-panel flex h-full flex-col gap-1 rounded-xl p-4">
            <div className="mb-2 px-1 py-2">
              <BrandMark subtitle={`Painel do ${config.label}`} />
            </div>
            {navegacao}
            {rodapeUsuario}
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topo mobile */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <BrandMark subtitle={`Painel do ${config.label}`} />
            <button
              type="button"
              onClick={() => setMenuAberto((v) => !v)}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              className="grid size-10 place-items-center rounded-lg glass-subtle text-primary"
            >
              {menuAberto ? <Menu className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {menuAberto ? (
            <div className="px-4 pb-2 md:hidden">
              <div className="glass-panel flex flex-col gap-2 rounded-xl p-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Navegação
                  </span>
                  <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={() => setMenuAberto(false)}
                    className="text-muted-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {navegacao}
                {rodapeUsuario}
              </div>
            </div>
          ) : null}

          <header className="flex items-center justify-between gap-4 px-4 pt-2 md:px-8 md:pt-8">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {config.label} · {secaoAtual}
            </p>
            <Link
              to={config.dashboard}
              className="hidden text-sm font-medium text-primary hover:underline md:inline"
            >
              Voltar ao dashboard
            </Link>
          </header>

          <main className="anim-rise flex-1 p-4 md:p-8 md:pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
