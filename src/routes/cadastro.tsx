import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { BrandMark } from "@/components/layout/BrandMark";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Field } from "@/components/forms/Field";
import { BrandButton } from "@/components/ui/brand-button";
import { alunoSchema, gerenteSchema, instrutorSchema } from "@/lib/validation";
import { ROLES, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta · Vetor" },
      {
        name: "description",
        content:
          "Crie sua conta de gerente, instrutor ou aluno na plataforma Vetor de gestão de treinamento.",
      },
      { property: "og:title", content: "Criar conta · Vetor" },
      {
        property: "og:description",
        content: "Crie sua conta de gerente, instrutor ou aluno na plataforma Vetor.",
      },
    ],
  }),
  component: CadastroPage,
});

interface CampoDef {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
}

const CAMPOS_BASE: CampoDef[] = [
  { name: "nome", label: "Nome completo", placeholder: "Maria Souza", autoComplete: "name" },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "voce@instituicao.com",
    autoComplete: "email",
  },
  {
    name: "senha",
    label: "Senha",
    type: "password",
    placeholder: "Mínimo de 8 caracteres",
    autoComplete: "new-password",
  },
  {
    name: "confirmarSenha",
    label: "Confirmar senha",
    type: "password",
    placeholder: "Repita a senha",
    autoComplete: "new-password",
  },
];

const TELEFONE: CampoDef = {
  name: "telefone",
  label: "Telefone",
  placeholder: "(11) 99999-0000",
  autoComplete: "tel",
};

const CONFIG: Record<
  AppRole,
  { schema: z.ZodTypeAny; campos: CampoDef[]; botao: string }
> = {
  gerente: {
    schema: gerenteSchema,
    botao: "Criar conta de Gerente",
    campos: [
      ...CAMPOS_BASE,
      TELEFONE,
      { name: "empresa", label: "Empresa/Instituição", placeholder: "Vetor Treinamentos" },
    ],
  },
  instrutor: {
    schema: instrutorSchema,
    botao: "Criar conta de Instrutor",
    campos: [
      ...CAMPOS_BASE,
      TELEFONE,
      { name: "areaAtuacao", label: "Área de atuação", placeholder: "Manutenção industrial" },
      { name: "especialidade", label: "Especialidade", placeholder: "Pneumática e hidráulica" },
      {
        name: "registroProfissional",
        label: "Registro/identificação profissional",
        placeholder: "CREA, CRM, matrícula...",
        hint: "Opcional, se aplicável.",
      },
    ],
  },
  aluno: {
    schema: alunoSchema,
    botao: "Criar conta de Aluno",
    campos: [
      ...CAMPOS_BASE,
      { name: "documento", label: "CPF ou matrícula", placeholder: "000.000.000-00" },
      { name: "dataNascimento", label: "Data de nascimento", type: "date" },
      TELEFONE,
    ],
  },
};

function CadastroPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<AppRole | null>(null);
  const [valores, setValores] = useState<Record<string, string>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);

  function selecionarRole(novo: AppRole) {
    setRole(novo);
    setValores({});
    setErros({});
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!role) return;

    const parsed = CONFIG[role].schema.safeParse(valores);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErros(next);
      return;
    }
    setErros({});
    setCarregando(true);

    const dados = parsed.data as Record<string, string>;

    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { nome: dados.nome, role },
      },
    });

    if (error) {
      setCarregando(false);
      const mensagem = /already|registered|exists/i.test(error.message)
        ? "Este e-mail já está cadastrado. Faça login ou use outro e-mail."
        : error.message;
      toast.error(mensagem);
      return;
    }

    const user = data.user;
    if (!user || !data.session) {
      setCarregando(false);
      toast.success("Cadastro realizado! Confirme seu e-mail para acessar a conta.");
      navigate({ to: "/login" });
      return;
    }

    const { error: erroPerfil } = await supabase.from("profiles").insert({
      id: user.id,
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone ?? null,
      empresa: dados.empresa ?? null,
      area_atuacao: dados.areaAtuacao ?? null,
      especialidade: dados.especialidade ?? null,
      registro_profissional: dados.registroProfissional || null,
      documento: dados.documento ?? null,
      data_nascimento: dados.dataNascimento || null,
    });

    const { error: erroRole } = await supabase
      .from("user_roles")
      .insert({ user_id: user.id, role });

    await supabase.auth.signOut();
    setCarregando(false);

    if (erroPerfil || erroRole) {
      toast.error("Não foi possível concluir seu cadastro. Tente novamente em instantes.");
      return;
    }

    toast.success("Cadastro realizado com sucesso! Agora você pode acessar sua conta.");
    navigate({ to: "/login" });
  }

  return (
    <AuthLayout>
      <div className="anim-rise glass-panel w-full max-w-md rounded-xl p-6 sm:p-8">
        <BrandMark className="mb-6 lg:hidden" />

        {!role ? (
          <>
            <h2 className="text-balance font-display text-2xl leading-tight text-primary">
              Qual tipo de conta você deseja criar?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha o perfil que corresponde ao seu papel na plataforma.
            </p>
            <div className="mt-6">
              <RoleSelector
                value={null}
                onChange={selecionarRole}
                variant="detailed"
                label="Tipos de conta"
              />
            </div>
            <div className="mt-6">
              <Link to="/login" className="block">
                <BrandButton type="button" variant="outline">
                  Já tenho conta · Entrar
                </BrandButton>
              </Link>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setRole(null)}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden /> Trocar tipo de conta
            </button>
            <h2 className="text-balance font-display text-2xl leading-tight text-primary">
              Cadastro de {ROLES[role].label}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{ROLES[role].description}</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              {CONFIG[role].campos.map((campo) => (
                <Field
                  key={campo.name}
                  label={campo.label}
                  name={campo.name}
                  type={campo.type}
                  placeholder={campo.placeholder}
                  hint={campo.hint}
                  autoComplete={campo.autoComplete}
                  value={valores[campo.name] ?? ""}
                  onChange={(e) =>
                    setValores((atual) => ({ ...atual, [campo.name]: e.target.value }))
                  }
                  error={erros[campo.name]}
                  disabled={carregando}
                />
              ))}
              <BrandButton type="submit" loading={carregando}>
                {carregando ? "Criando conta..." : CONFIG[role].botao}
              </BrandButton>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              Já possui uma conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
