import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { requireRole } from "@/lib/role-guard";

export const Route = createFileRoute("/_authenticated/gerente")({
  beforeLoad: () => requireRole("gerente"),
  component: () => (
    <AppShell role="gerente">
      <Outlet />
    </AppShell>
  ),
});
