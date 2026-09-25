import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { requireRole } from "@/lib/role-guard";

export const Route = createFileRoute("/_authenticated/aluno")({
  beforeLoad: () => requireRole("aluno"),
  component: () => (
    <AppShell role="aluno">
      <Outlet />
    </AppShell>
  ),
});
