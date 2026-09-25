import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserRole } from "@/hooks/useCurrentUser";
import type { AppRole } from "@/lib/roles";

/**
 * Garante que o usuário autenticado possui a função exigida pela área.
 * Executa apenas no cliente (as áreas ficam sob o layout `_authenticated`, que usa ssr: false).
 */
export async function requireRole(role: AppRole) {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) throw redirect({ to: "/login" });

  const roleDoUsuario = await fetchUserRole(user.id);
  if (roleDoUsuario !== role) throw redirect({ to: "/acesso-negado" });

  return { role: roleDoUsuario };
}
