import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  BarChart3,
  Settings,
  ClipboardList,
  FileCheck2,
  UserRound,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type AppRole = "gerente" | "instrutor" | "aluno";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export interface RoleConfig {
  value: AppRole;
  label: string;
  emoji: string;
  description: string;
  shortDescription: string;
  dashboard: string;
  nav: NavItem[];
}

export const ROLES: Record<AppRole, RoleConfig> = {
  gerente: {
    value: "gerente",
    label: "Gerente",
    emoji: "👔",
    description: "Gerencie a plataforma, usuários e atividades.",
    shortDescription: "Plataforma, usuários e atividades.",
    dashboard: "/gerente/dashboard",
    nav: [
      { label: "Dashboard", to: "/gerente/dashboard", icon: LayoutDashboard },
      { label: "Usuários", to: "/gerente/usuarios", icon: Users },
      { label: "Instrutores", to: "/gerente/instrutores", icon: GraduationCap },
      { label: "Alunos", to: "/gerente/alunos", icon: UserRound },
      { label: "Cursos", to: "/gerente/cursos", icon: BookOpen },
      { label: "Turmas", to: "/gerente/turmas", icon: Layers },
      { label: "Relatórios", to: "/gerente/relatorios", icon: BarChart3 },
      { label: "Configurações", to: "/gerente/configuracoes", icon: Settings },
    ],
  },
  instrutor: {
    value: "instrutor",
    label: "Instrutor",
    emoji: "🎓",
    description:
      "Gerencie suas turmas, alunos, atividades práticas e crie ordens de serviço.",
    shortDescription: "Turmas, alunos e ordens de serviço.",
    dashboard: "/instrutor/dashboard",
    nav: [
      { label: "Dashboard", to: "/instrutor/dashboard", icon: LayoutDashboard },
      { label: "Minhas Turmas", to: "/instrutor/turmas", icon: Layers },
      { label: "Meus Alunos", to: "/instrutor/alunos", icon: UserRound },
      { label: "Conteúdos", to: "/instrutor/conteudos", icon: BookOpen },
      { label: "Atividades", to: "/instrutor/atividades", icon: ClipboardList },
      { label: "Avaliações", to: "/instrutor/avaliacoes", icon: FileCheck2 },
      { label: "Relatórios", to: "/instrutor/relatorios", icon: BarChart3 },
      { label: "Meu Perfil", to: "/instrutor/perfil", icon: UserRound },
    ],
  },
  aluno: {
    value: "aluno",
    label: "Aluno",
    emoji: "📚",
    description:
      "Acesse suas demandas, ordens de serviço e histórico de demandas concluídas.",
    shortDescription: "Demandas e histórico concluído.",
    dashboard: "/aluno/dashboard",
    nav: [
      { label: "Dashboard", to: "/aluno/dashboard", icon: LayoutDashboard },
      { label: "Meus Cursos", to: "/aluno/cursos", icon: BookOpen },
      { label: "Atividades", to: "/aluno/atividades", icon: ClipboardList },
      { label: "Avaliações", to: "/aluno/avaliacoes", icon: FileCheck2 },
      { label: "Meu Progresso", to: "/aluno/progresso", icon: TrendingUp },
      { label: "Meu Perfil", to: "/aluno/perfil", icon: UserRound },
    ],
  },
};

export const ROLE_LIST: RoleConfig[] = [ROLES.gerente, ROLES.instrutor, ROLES.aluno];

export function isAppRole(value: unknown): value is AppRole {
  return value === "gerente" || value === "instrutor" || value === "aluno";
}
