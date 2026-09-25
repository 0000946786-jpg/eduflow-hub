import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrandMark } from "@/components/layout/BrandMark";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Field } from "@/components/forms/Field";
import { BrandButton } from "@/components/ui/brand-button";
import { loginSchema } from "@/lib/validation";
import { ROLES, type AppRole } from "@/lib/roles";
import { fetchUserRole } from "@/hooks/useCurrentUser";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar · Vetor" },
      {
        name: "description",
        content:
          "Acesse a plataforma Vetor como gerente, instrutor ou aluno e gerencie turmas, atividades e ordens de serviço.",
      },
      { property: "og:title", content: "Entrar · Vetor" },
      {
        property: "og:description",
        content: "Acesse a plataforma Vetor como gerente, instrutor ou aluno.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<AppRole>("gerente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = loginSchema.safeParse({ email, senha });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErros(next);
      return;
    }
    setErros({});
    setCarregando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.senha,
    });

    if (error || !data.user) {
      setCarregando(false);
      toast.error("E-mail ou senha incorretos. Verifique seus dados e tente novamente.");
      return;
    }

    const roleDoUsuario = await fetchUserRole(data.user.id);

    if (!roleDoUsuario) {
      await supabase.auth.signOut();
      setCarregando(false);
      toast.error("Sua conta ainda não possui um perfil definido. Fale com o gerente da plataforma.");
      return;
    }

    if (roleDoUsuario !== role) {
      await supabase.auth.signOut();
      setCarregando(false);
      toast.error(
        `Esta conta está cadastrada como ${ROLES[roleDoUsuario].label}. Selecione esse perfil para entrar.`,
      );
      return;
    }

    toast.success(`Bem-vindo de volta! Acessando o painel de ${ROLES[roleDoUsuario].label}.`);
    navigate({ to: ROLES[roleDoUsuario].dashboard });
  }

  return (
    <AuthLayout>
      <div className="anim-rise glass-panel w-full max-w-md rounded-xl p-6 sm:p-8">
        <BrandMark className="mb-6 lg:hidden" />

        <h2 className="text-balance font-display text-2xl leading-tight text-primary">
          Bem-vindo à plataforma
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Acesse sua conta para continuar</p>

        <div className="mt-6">
          <RoleSelector value={role} onChange={setRole} />
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <Field
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@instituicao.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={erros.email}
            disabled={carregando}
          />
          <Field
            label="Senha"
            name="senha"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={erros.senha}
            disabled={carregando}
          />
          <div className="flex items-center justify-end">
            <Link
              to="/recuperar-senha"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/70"
            >
              Esqueci minha senha
            </Link>
          </div>
          <BrandButton type="submit" loading={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </BrandButton>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Link to="/cadastro" className="block">
          <BrandButton type="button" variant="outline">
            Criar uma conta
          </BrandButton>
        </Link>
      </div>
    </AuthLayout>
  );
}
