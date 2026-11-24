import { PROJECTS, type ProjectItem } from "@/data/portfolio";

const SUPABASE_URL = "https://mezafzsrxzgryefprblh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TDk-7FqEPphaWB30qkjMGw_BvHMr1vu";
const BUCKET_IMAGENS = "projetos-imagens";

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

function mapCategory(raw?: string | null): ProjectItem["category"] {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("commerce") || value.includes("loja")) return "E-commerce";
  if (value.includes("sistema") || value.includes("dashboard") || value.includes("app")) {
    return "Sistemas Web";
  }
  return "Sites Institucionais";
}

export async function fetchPortfolioProjects(): Promise<{
  projects: ProjectItem[];
  syncedCount: number;
}> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/projetos?select=*&publicado=eq.true&order=ordem.asc,criado_em.desc`,
      {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
      },
    );
    if (!response.ok) return { projects: PROJECTS, syncedCount: 0 };

    const rows = (await response.json()) as RawRemoteProject[];
    if (!Array.isArray(rows) || rows.length === 0) {
      return { projects: PROJECTS, syncedCount: 0 };
    }

    const fallbackImage = PROJECTS[2]?.image ?? PROJECTS[0]?.image ?? "";
    const mapped: ProjectItem[] = rows
      .filter((row) => row.titulo && !/^teste(\s*\d*)?$/i.test(row.titulo.trim()))
      .map((row) => {
        const imgUrl = row.imagem_path
          ? `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_IMAGENS}/${row.imagem_path}`
          : fallbackImage;
        const item: ProjectItem = {
          id: `db-${row.id}`,
          title: row.titulo?.trim() || "Projeto",
          category: mapCategory(row.categoria),
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

    const merged = [...mapped, ...PROJECTS];
    return { projects: merged, syncedCount: mapped.length };
  } catch {
    return { projects: PROJECTS, syncedCount: 0 };
  }
}