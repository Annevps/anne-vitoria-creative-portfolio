import projectFallback from "@/assets/project-techempire.png";
import { type ProjectItem } from "@/data/portfolio";
import { ANNE_BUCKET_IMAGENS, ANNE_SUPABASE_KEY, ANNE_SUPABASE_URL } from "@/lib/anneSupabase";

interface RawRemoteProject {
  id: number;
  titulo?: string | null;
  imagem_path?: string | null;
  descricao?: string | null;
  link?: string | null;
  categoria?: string | null;
  ano?: string | number | null;
  contexto?: string | null;
  desafio?: string | null;
  solucao?: string | null;
  funcionalidades?: string[] | null;
  tecnologias?: string[] | null;
  repo_url?: string | null;
  github_url?: string | null;
  publicado?: boolean | null;
  destaque?: boolean | null;
}

export async function fetchPortfolioProjects(): Promise<{
  projects: ProjectItem[];
  syncedCount: number;
}> {
  try {
    const response = await fetch(
      `${ANNE_SUPABASE_URL}/rest/v1/projetos?select=*&publicado=eq.true&order=ordem.asc,criado_em.desc`,
      {
        headers: {
          apikey: ANNE_SUPABASE_KEY,
        },
      },
    );
    if (!response.ok) return { projects: [], syncedCount: 0 };

    const rows = (await response.json()) as RawRemoteProject[];
    if (!Array.isArray(rows) || rows.length === 0) {
      return { projects: [], syncedCount: 0 };
    }

    const mapped: ProjectItem[] = rows
      .filter((row) => row.titulo && !/^teste(\s*\d*)?$/i.test(row.titulo.trim()))
      .map((row) => {
        const imgUrl = row.imagem_path
          ? `${ANNE_SUPABASE_URL}/storage/v1/object/public/${ANNE_BUCKET_IMAGENS}/${row.imagem_path}`
          : projectFallback;
        const item: ProjectItem = {
          id: `db-${row.id}`,
          title: row.titulo?.trim() || "Projeto",
          category: row.categoria?.trim() || "Desenvolvimento Web",
          year: row.ano ? String(row.ano) : "2026",
          featured: Boolean(row.destaque),
          image: imgUrl,
          summary: row.descricao?.trim() || "Projeto desenvolvido sob medida com foco em performance e design.",
          clientOutcome:
            row.contexto?.trim() ||
            row.descricao?.trim() ||
            "Solução publicada e integrada diretamente ao painel de projetos.",
          challenge:
            row.desafio?.trim() ||
            "Criar uma experiência digital profissional, rápida e responsiva para qualquer dispositivo.",
          solution:
            row.solucao?.trim() ||
            "Desenvolvimento completo com código limpo, SEO técnico e interface moderna.",
          stack:
            Array.isArray(row.tecnologias) && row.tecnologias.length > 0
              ? row.tecnologias
              : ["HTML5", "CSS3", "JavaScript", "Design Responsivo"],
          highlights:
            Array.isArray(row.funcionalidades) && row.funcionalidades.length > 0
              ? row.funcionalidades
              : ["Publicado via painel administrativo", "Interface responsiva", "SEO otimizado"],
        };
        if (row.link) item.liveUrl = row.link;
        const repo = row.github_url || row.repo_url;
        if (repo) item.repoUrl = repo;
        return item;
      });

    return { projects: mapped, syncedCount: mapped.length };
  } catch {
    return { projects: [], syncedCount: 0 };
  }
}