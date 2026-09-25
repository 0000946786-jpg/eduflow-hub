import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrandMark } from "@/components/layout/BrandMark";
import { Field } from "@/components/forms/Field";
import { BrandButton } from "@/components/ui/brand-button";

export const Route = createFileRoute("/redefinir-senha")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Criar nova senha · Vetor" },
      {
        name: "description",
        content: "Defina uma nova senha para acessar sua conta na plataforma Vetor.",
      },
      { property: "og:title", content: "Criar nova senha · Vetor" },
      {
        property: "og:description",
        content: "Defina uma nova senha para acessar sua conta na plataforma Vetor.",
      },
    ],
  }),
  component: RedefinirSenha,
});

function RedefinirSenha() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (senha.length < 8) next.senha = "A senha deve ter pelo menos 8 caracteres.";
    if (senha !== confirmar) next.confirmar = "As senhas não conferem.";
    setErros(next);
    if (Object.keys(next).length > 0) return;

    setCarregando(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    setCarregando(false);

    if (error) {
      toast.error("Não foi possível atualizar a senha. Solicite um novo link de redefinição.");
      return;
    }

    await supabase.auth.signOut();
    toast.success("Senha atualizada com sucesso! Entre com sua nova senha.");
    navigate({ to: "/login" });
  }

  return (
    <AuthLayout>
      <div className="anim-rise glass-panel w-full max-w-md rounded-xl p-6 sm:p-8">
        <BrandMark className="mb-6 lg:hidden" />
        <h2 className="font-display text-2xl leading-tight text-primary">Criar nova senha</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha uma nova senha com pelo menos 8 caracteres.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <Field
            label="Nova senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={erros.senha}
            disabled={carregando}
          />
          <Field
            label="Confirmar nova senha"
            name="confirmar"
            type="password"
            autoComplete="new-password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            error={erros.confirmar}
            disabled={carregando}
          />
          <BrandButton type="submit" loading={carregando}>
            Salvar nova senha
          </BrandButton>
        </form>
      </div>
    </AuthLayout>
  );
}
