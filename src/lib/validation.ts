import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(1, { message: "Informe seu e-mail." })
  .email({ message: "Informe um e-mail válido." })
  .max(255, { message: "E-mail muito longo." });

const senha = z
  .string()
  .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
  .max(72, { message: "A senha deve ter no máximo 72 caracteres." });

const nome = z
  .string()
  .trim()
  .min(3, { message: "Informe seu nome completo." })
  .max(120, { message: "Nome muito longo." });

const telefone = z
  .string()
  .trim()
  .min(10, { message: "Informe um telefone válido com DDD." })
  .max(20, { message: "Telefone muito longo." });

const texto = (label: string, max = 120) =>
  z
    .string()
    .trim()
    .min(2, { message: `Informe ${label}.` })
    .max(max, { message: "Texto muito longo." });

export const loginSchema = z.object({
  email,
  senha: z.string().min(1, { message: "Informe sua senha." }),
});

const confirmacao = { confirmarSenha: z.string() };

const senhasIguais = <T extends { senha: string; confirmarSenha: string }>(data: T) =>
  data.senha === data.confirmarSenha;

const erroConfirmacao = {
  message: "As senhas não conferem.",
  path: ["confirmarSenha"] as const,
};

export const gerenteSchema = z
  .object({
    nome,
    email,
    senha,
    ...confirmacao,
    telefone,
    empresa: texto("a empresa ou instituição"),
  })
  .refine(senhasIguais, erroConfirmacao);

export const instrutorSchema = z
  .object({
    nome,
    email,
    senha,
    ...confirmacao,
    telefone,
    areaAtuacao: texto("sua área de atuação"),
    especialidade: texto("sua especialidade"),
    registroProfissional: z.string().trim().max(60).optional(),
  })
  .refine(senhasIguais, erroConfirmacao);

export const alunoSchema = z
  .object({
    nome,
    email,
    senha,
    ...confirmacao,
    documento: texto("seu CPF ou matrícula", 40),
    dataNascimento: z
      .string()
      .min(1, { message: "Informe sua data de nascimento." })
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: "Data de nascimento inválida.",
      }),
    telefone,
  })
  .refine(senhasIguais, erroConfirmacao);

export type LoginValues = z.infer<typeof loginSchema>;
export type GerenteValues = z.infer<typeof gerenteSchema>;
export type InstrutorValues = z.infer<typeof instrutorSchema>;
export type AlunoValues = z.infer<typeof alunoSchema>;
