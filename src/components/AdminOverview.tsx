import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FilePlus2,
  FolderKanban,
  Inbox,
  Mail,
  MessagesSquare,
} from "lucide-react";
import type { DashboardTab, DbLead, DbProject } from "@/lib/adminTypes";
import { urlImagemProjeto } from "@/lib/anneSupabase";

interface AdminOverviewProps {
  projects: DbProject[];
  leads: DbLead[];
  onNavigate: (tab: DashboardTab) => void;
}

export function AdminOverview({ projects, leads, onNavigate }: AdminOverviewProps) {
  const published = projects.filter((project) => project.publicado).length;
  const drafts = projects.length - published;
  const newLeads = leads.filter((lead) => lead.status === "Novo").length;
  const inProgress = leads.filter((lead) => lead.status === "Em andamento").length;

  const stats = [
    { label: "Projetos publicados", value: published, detail: `${projects.length} no total`, icon: FolderKanban },
    { label: "Rascunhos", value: drafts, detail: "Aguardando publicação", icon: FilePlus2 },
    { label: "Contatos novos", value: newLeads, detail: "Pedem seu retorno", icon: Inbox },
    { label: "Em atendimento", value: inProgress, detail: "Conversas em andamento", icon: MessagesSquare },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do portfólio">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="editorial-card rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-12">
        <section className="editorial-card rounded-3xl p-6 xl:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Relacionamento</p>
              <h2 className="mt-1 font-display text-xl font-bold text-foreground">Contatos recentes</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("mensagens")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-foreground"
            >
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/60 px-5 py-8 text-center">
              <Mail className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">Nenhuma mensagem recebida ainda</p>
              <p className="mt-1 text-xs text-muted-foreground">Os novos contatos do formulário aparecerão aqui.</p>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-border">
              {leads.slice(0, 4).map((lead) => (
                <li key={lead.id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-primary">
                    {lead.nome.trim().charAt(0).toUpperCase() || "C"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{lead.nome}</p>
                    <p className="truncate text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${lead.status === "Novo" ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"}`}>
                    {lead.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="featured-petrol-card rounded-3xl p-6 xl:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-glow">Ações rápidas</p>
          <h2 className="mt-1 font-display text-xl font-bold text-hero-foreground">O que você quer fazer agora?</h2>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => onNavigate("projetos")}
              className="flex w-full items-center gap-3 rounded-2xl border border-cyan-glow/20 bg-hero/40 p-4 text-left transition-colors hover:border-cyan-glow/50"
            >
              <FilePlus2 className="h-5 w-5 text-cyan-glow" />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-hero-foreground">Cadastrar um projeto</span>
                <span className="mt-0.5 block text-xs text-hero-muted">Adicione imagem, links e descrição</span>
              </span>
              <ArrowRight className="h-4 w-4 text-cyan-glow" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("organizacao")}
              className="flex w-full items-center gap-3 rounded-2xl border border-cyan-glow/20 bg-hero/40 p-4 text-left transition-colors hover:border-cyan-glow/50"
            >
              <CheckCircle2 className="h-5 w-5 text-cyan-glow" />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-hero-foreground">Organizar meu trabalho</span>
                <span className="mt-0.5 block text-xs text-hero-muted">Crie tarefas, prazos e prioridades</span>
              </span>
              <ArrowRight className="h-4 w-4 text-cyan-glow" />
            </button>
          </div>
          <div className="mt-6 flex items-center gap-2 border-t border-cyan-glow/15 pt-5 text-xs text-hero-muted">
            <Clock3 className="h-4 w-4 text-cyan-glow" />
            Atualize os dados sempre que precisar
          </div>
        </section>
      </div>

      <section className="editorial-card rounded-3xl p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Portfólio</p>
            <h2 className="mt-1 font-display text-xl font-bold text-foreground">Projetos recentes</h2>
          </div>
          <button type="button" onClick={() => onNavigate("projetos")} className="text-xs font-semibold text-primary hover:text-foreground">
            Gerenciar projetos
          </button>
        </div>
        {projects.length === 0 ? (
          <p className="mt-5 text-sm text-muted-foreground">Cadastre seu primeiro projeto real para começar seu portfólio.</p>
        ) : (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <li key={project.id} className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-3">
                {project.imagem_path ? (
                  <img src={urlImagemProjeto(project.imagem_path)} alt="" className="h-12 w-16 rounded-xl object-cover" />
                ) : (
                  <span className="inline-flex h-12 w-16 items-center justify-center rounded-xl bg-secondary text-primary"><FolderKanban className="h-5 w-5" /></span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{project.titulo}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{project.publicado ? "Publicado" : "Rascunho"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
