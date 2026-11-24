import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/MotionPrimitives";
import { PROJECTS, whatsappHref, type ProjectItem } from "@/data/portfolio";
import { fetchPortfolioProjects } from "@/lib/remoteProjects";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos & Portfólio | Anne Vitória — Desenvolvedora Full Stack" },
      {
        name: "description",
        content:
          "Explore sistemas web, dashboards administrativos, lojas virtuais e sites profissionais desenvolvidos por Anne Vitória.",
      },
      { property: "og:title", content: "Projetos & Portfólio | Anne Vitória" },
      {
        property: "og:description",
        content:
          "Projetos reais em visão de negócio e visão técnica, com filtros por categoria e detalhes completos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjetosPage,
});

const CATEGORIES = ["Todos", "Sistemas Web", "E-commerce", "Sites Institucionais"] as const;

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function ProjetosPage() {
  const [viewMode, setViewMode] = useState<"client" | "technical">("client");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [search, setSearch] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const { data } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: fetchPortfolioProjects,
    initialData: { projects: PROJECTS, syncedCount: 0 },
    staleTime: 1000 * 60 * 5,
  });

  const filtered = useMemo(() => {
    const q = normalizeText(search.trim());
    return data.projects.filter((project) => {
      const matchesCategory = category === "Todos" || project.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        normalizeText(project.title).includes(q) ||
        normalizeText(project.summary).includes(q) ||
        normalizeText(project.category).includes(q) ||
        project.stack.some((t) => normalizeText(t).includes(q))
      );
    });
  }, [data.projects, category, search]);

  const repoCount = data.projects.filter((p) => p.repoUrl).length;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:pt-18">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-xs text-primary">~/projetos</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Ideias que viram <span className="text-primary">produtos reais</span>.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Alterne entre a visão de resultado para clientes e os detalhes técnicos de engenharia.
          Projetos publicados no painel administrativo aparecem automaticamente aqui.
        </p>
      </Reveal>

      {/* Overview Stats */}
      <Reveal className="mt-10 grid grid-cols-3 gap-4 sm:max-w-xl">
        <div className="card-surface rounded-2xl p-4">
          <p className="font-display text-2xl font-bold text-foreground">{data.projects.length}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">projetos no portfólio</p>
        </div>
        <div className="card-surface rounded-2xl p-4">
          <p className="font-display text-2xl font-bold text-primary">{CATEGORIES.length - 1}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">áreas atendidas</p>
        </div>
        <div className="card-surface rounded-2xl p-4">
          <p className="font-display text-2xl font-bold text-accent">{repoCount}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">códigos disponíveis</p>
        </div>
      </Reveal>

      {/* Controls: View Mode + Search + Categories */}
      <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-border bg-surface/60 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div
            className="inline-flex w-fit rounded-full border border-border bg-background/70 p-1"
            role="group"
            aria-label="Modo de exibição dos projetos"
          >
            <button
              type="button"
              onClick={() => setViewMode("client")}
              aria-pressed={viewMode === "client"}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                viewMode === "client" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {viewMode === "client" && (
                <motion.span
                  layoutId="project-mode-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <Briefcase className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Visão de Negócio</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("technical")}
              aria-pressed={viewMode === "technical"}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                viewMode === "technical" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {viewMode === "technical" && (
                <motion.span
                  layoutId="project-mode-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <Code2 className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Visão Técnica</span>
            </button>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou tecnologia..."
              aria-label="Pesquisar projetos"
              className="w-full rounded-full border border-border bg-background/80 py-2.5 pr-4 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-secondary text-primary ring-1 ring-primary/40"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "projeto exibido" : "projetos exibidos"}
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="card-surface group flex flex-col overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-surface text-left"
                >
                  <img
                    src={project.image}
                    alt={`Prévia do projeto ${project.title}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="glass-pill absolute top-3 left-3 rounded-full px-3 py-1 font-mono text-[11px] text-primary">
                    {project.category}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {project.title}
                    </h2>
                    <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {viewMode === "client" ? project.clientOutcome : project.solution}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                    >
                      Ver detalhes
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Acessar
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="card-surface mt-10 rounded-3xl p-10 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            Nenhum projeto encontrado
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente outro termo ou volte para todas as categorias.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("Todos");
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              className="card-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Fechar detalhes do projeto"
                className="glass-pill absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-primary">
                  {activeProject.category} · {activeProject.year}
                </span>
                <h2 id="modal-project-title" className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {activeProject.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {activeProject.summary}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background/60 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      Desafio
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{activeProject.challenge}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/60 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      Solução
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{activeProject.solution}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Destaques entregues
                  </p>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-foreground">
                    {activeProject.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6">
                  <a
                    href={whatsappHref(`Olá Anne! Vi o projeto "${activeProject.title}" no seu portfólio e quero algo nesse nível.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Quero um projeto assim
                  </a>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/50"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver online
                    </a>
                  )}
                  {activeProject.repoUrl && (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}