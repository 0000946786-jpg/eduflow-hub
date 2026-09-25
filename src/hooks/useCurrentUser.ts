import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isAppRole, type AppRole } from "@/lib/roles";

export interface CurrentUser {
  id: string;
  email: string;
  nome: string;
  telefone: string | null;
  role: AppRole | null;
}

export async function fetchUserRole(userId: string): Promise<AppRole | null> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  return isAppRole(data?.role) ? data.role : null;
}

export function useCurrentUser() {
  return useQuery<CurrentUser | null>({
    queryKey: ["current-user"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;

      const [{ data: profile }, role] = await Promise.all([
        supabase
          .from("profiles")
          .select("nome, email, telefone")
          .eq("id", user.id)
          .maybeSingle(),
        fetchUserRole(user.id),
      ]);

      return {
        id: user.id,
        email: profile?.email ?? user.email ?? "",
        nome: profile?.nome ?? user.email?.split("@")[0] ?? "Usuário",
        telefone: profile?.telefone ?? null,
        role,
      };
    },
  });
}
