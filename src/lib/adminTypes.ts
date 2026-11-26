export interface DbProject {
  id: number;
  titulo: string;
  descricao: string | null;
  link: string;
  categoria: string | null;
  github_url: string | null;
  destaque: boolean | null;
  publicado?: boolean | null;
  imagem_path: string | null;
  atualizado_em: string | null;
}

export interface DbLead {
  id: number;
  nome: string;
  email: string;
  zap: string | null;
  descricao: string;
  status: string;
  criado_em: string | null;
}

export type DashboardTab = "visao-geral" | "projetos" | "mensagens" | "organizacao";

export type TaskPriority = "Alta" | "Média" | "Baixa";

export interface WorkTask {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  leadId: number | null;
  done: boolean;
  createdAt: string;
}
