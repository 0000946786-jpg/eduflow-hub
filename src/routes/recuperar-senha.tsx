import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrandMark } from "@/components/layout/BrandMark";
import { Field } from "@/components/forms/Field";
import { BrandButton } from "@/components/ui/brand-button";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha · Vetor" },
      {
        name: "description",
        content: "Receba um link por e-mail para redefinir a senha da sua conta Vetor.",
      },
      { property: "og:title", content: "Recuperar senha · Vetor" },
      {
        property: "og:description",
        content: "Receba um link por e-mail para redefinir a senha da sua conta Vetor.",
      },
    ],
  }),
  component: RecuperarSenha,
});

const emailSchema = z.string().trim().email({ message: "Informe um e-mail válido." });

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState<string>();
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setErro(parsed.error.issues[0]?.message);
      return;
    }
    setErro(undefined);
    setCarregando(true);
    await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    setCarregando(false);
    setEnviado(true);
    toast.success("Se este e-mail estiver cadastrado, enviamos um link de redefinição.");
  }

  return (
    <AuthLayout>
      <div className="anim-rise glass-panel w-full max-w-md rounded-xl p-6 sm:p-8">
        <BrandMark className="mb-6 lg:hidden" />
        <h2 className="font-display text-2xl leading-tight text-primary">Esqueci minha senha</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Informe seu e-mail e enviaremos um link para criar uma nova senha.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <Field
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@instituicao.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={erro}
            disabled={carregando || enviado}
          />
          <BrandButton type="submit" loading={carregando} disabled={enviado}>
            {enviado ? "Link enviado" : "Enviar link de redefinição"}
          </BrandButton>
        </form>

        <div className="mt-5">
          <Link to="/login" className="block">
            <BrandButton type="button" variant="outline">
              Voltar para o login
            </BrandButton>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
