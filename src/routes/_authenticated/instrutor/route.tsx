import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { requireRole } from "@/lib/role-guard";

export const Route = createFileRoute("/_authenticated/instrutor")({
  beforeLoad: () => requireRole("instrutor"),
  component: () => (
    <AppShell role="instrutor">
      <Outlet />
    </AppShell>
  ),
});
