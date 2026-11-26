import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  FolderPlus,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Mail,
  MessageCircle,
  Pencil,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { AdminOverview } from "@/components/AdminOverview";
import { WorkOrganization } from "@/components/WorkOrganization";
import { useWorkTasks } from "@/hooks/useWorkTasks";
import { ANNE_BUCKET_IMAGENS, anneDb, urlImagemProjeto } from "@/lib/anneSupabase";
import type { DashboardTab, DbLead, DbProject } from "@/lib/adminTypes";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Espaço de Gestão | Anne Vitória" },
      { name: "description", content: "Gestão profissional de projetos, contatos e organização do trabalho." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Espaço de Gestão | Anne Vitória" },
      { property: "og:description", content: "Área administrativa privada do portfólio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const NAV_ITEMS = [
  { id: "visao-geral" as const, label: "Visão geral", icon: LayoutDashboard },
  { id: "projetos" as const, label: "Projetos", icon: FolderKanban },
  { id: "mensagens" as const, label: "Mensagens", icon: Mail },
  { id: "organizacao" as const, label: "Organização", icon: ListChecks },
];

const TAB_HEADINGS: Record<DashboardTab, { eyebrow: string; title: string; description: string }> = {
  "visao-geral": {
    eyebrow: "Resumo profissional",
    title: "Visão geral",
    description: "Acompanhe seu portfólio e saiba o que precisa da sua atenção.",
  },
  projetos: {
    eyebrow: "Gestão de portfólio",
    title: "Meus projetos",
    description: "Cadastre, edite e publique seus projetos reais no site.",
  },
  mensagens: {
    eyebrow: "Relacionamento com clientes",
    title: "Mensagens e contatos",
    description: "Organize retornos e acompanhe cada oportunidade recebida.",
  },
  organizacao: {
    eyebrow: "Rotina de trabalho",
    title: "Minha organização",
    description: "Planeje tarefas, prioridades e próximos passos.",
  },
};

function DashboardPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>("visao-geral");
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatus, setLeadStatus] = useState("Todos");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Desenvolvimento Web");
  const [destaque, setDestaque] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const { tasks, ready: tasksReady, addTask, toggleTask, deleteTask } = useWorkTasks();

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    const { data, error } = await anneDb
      .from("projetos")
      .select("*")
      .order("criado_em", { ascending: false });
    if (error) toast.error("Não foi possível carregar os projetos.");
    else setProjects((data as DbProject[]) ?? []);
    setLoadingProjects(false);
  }, []);

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    const { data, error } = await anneDb
      .from("formleads")
      .select("*")
      .order("criado_em", { ascending: false });
    if (error) toast.error("Não foi possível carregar as mensagens.");
    else setLeads((data as DbLead[]) ?? []);
    setLoadingLeads(false);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await anneDb.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login", replace: true });
        return;
      }
      const { data: admin } = await anneDb
        .from("admins")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (!admin) {
        await anneDb.auth.signOut();
        navigate({ to: "/login", replace: true });
        return;
      }
      setChecking(false);
      await Promise.all([loadProjects(), loadLeads()]);
    })();
  }, [navigate, loadProjects, loadLeads]);

  const resetForm = () => {
    setEditingId(null);
    setTitulo("");
    setDescricao("");
    setCategoria("Desenvolvimento Web");
    setDestaque(false);
    setGithubUrl("");
    setLink("");
    setFile(null);
    setPreviewUrl("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleSaveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = titulo.trim();
    const cleanLink = link.trim();
    const cleanGithub = githubUrl.trim();

    if (!cleanTitle) {
      toast.error("Digite o título do projeto.");
      return;
    }
    if (!/^https?:\/\/.+/i.test(cleanLink)) {
      toast.error("O link publicado precisa começar com http:// ou https://");
      return;
    }
    if (cleanGithub && !/^https?:\/\/.+/i.test(cleanGithub)) {
      toast.error("O link do GitHub precisa começar com http:// ou https://");
      return;
    }
    if (!editingId && !file) {
      toast.error("Escolha uma imagem de apresentação para o projeto.");
      return;
    }
    if (file && !ALLOWED_TYPES.includes(file.type)) {
      toast.error("A imagem precisa ser JPG, PNG ou WebP.");
      return;
    }
    if (file && file.size > MAX_IMAGE_BYTES) {
      toast.error("A imagem ultrapassa o limite de 5 MB.");
      return;
    }

    setSaving(true);
    let uploadedPath: string | null = null;
    try {
      if (file) {
        const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: uploadError } = await anneDb.storage
          .from(ANNE_BUCKET_IMAGENS)
          .upload(path, file, { contentType: file.type, cacheControl: "3600" });
        if (uploadError) throw uploadError;
        uploadedPath = path;
      }

      if (editingId) {
        const old = projects.find((project) => project.id === editingId);
        const payload: Record<string, unknown> = {
          titulo: cleanTitle,
          descricao: descricao.trim(),
          link: cleanLink,
          categoria,
          github_url: cleanGithub || null,
          destaque,
        };
        if (uploadedPath) payload["imagem_path"] = uploadedPath;
        const { error } = await anneDb.from("projetos").update(payload).eq("id", editingId);
        if (error) throw error;
        if (uploadedPath && old?.imagem_path) {
          await anneDb.storage.from(ANNE_BUCKET_IMAGENS).remove([old.imagem_path]);
        }
        toast.success("Projeto atualizado com sucesso!");
      } else {
        const { error } = await anneDb.from("projetos").insert({
          titulo: cleanTitle,
          descricao: descricao.trim(),
          link: cleanLink,
          categoria,
          github_url: cleanGithub || null,
          destaque,
          imagem_path: uploadedPath,
          publicado: true,
        });
        if (error) throw error;
        toast.success("Projeto adicionado e publicado com sucesso!");
      }
      resetForm();
      await loadProjects();
    } catch {
      if (uploadedPath) await anneDb.storage.from(ANNE_BUCKET_IMAGENS).remove([uploadedPath]);
      toast.error("Não foi possível salvar o projeto.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (project: DbProject) => {
    setEditingId(project.id);
    setTitulo(project.titulo);
    setDescricao(project.descricao ?? "");
    setCategoria(project.categoria ?? "Desenvolvimento Web");
    setDestaque(Boolean(project.destaque));
    setGithubUrl(project.github_url ?? "");
    setLink(project.link);
    setFile(null);
    setPreviewUrl(urlImagemProjeto(project.imagem_path));
    setActiveTab("projetos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (project: DbProject) => {
    if (!window.confirm(`Excluir o projeto "${project.titulo}"? Essa ação não pode ser desfeita.`)) return;
    const { error } = await anneDb.from("projetos").delete().eq("id", project.id);
    if (error) {
      toast.error("Não foi possível excluir o projeto.");
      return;
    }
    if (project.imagem_path) await anneDb.storage.from(ANNE_BUCKET_IMAGENS).remove([project.imagem_path]);
    if (editingId === project.id) resetForm();
    toast.success("Projeto excluído.");
    await loadProjects();
  };

  const togglePublished = async (project: DbProject) => {
    const nextState = !project.publicado;
    const { error } = await anneDb.from("projetos").update({ publicado: nextState }).eq("id", project.id);
    if (error) {
      toast.error("Não foi possível alterar o status de publicação.");
      return;
    }
    toast.success(nextState ? "Projeto publicado no portfólio!" : "Projeto movido para rascunho.");
    await loadProjects();
  };

  const updateLeadStatus = async (leadId: number, status: string) => {
    const { error } = await anneDb.from("formleads").update({ status }).eq("id", leadId);
    if (error) {
      toast.error("Erro ao atualizar o status da mensagem.");
      return;
    }
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
    toast.success(`Atendimento atualizado para "${status}".`);
  };

  const deleteLead = async (lead: DbLead) => {
    if (!window.confirm(`Excluir a mensagem de ${lead.nome}?`)) return;
    const { error } = await anneDb.from("formleads").delete().eq("id", lead.id);
    if (error) {
      toast.error("Não foi possível excluir a mensagem.");
      return;
    }
    setLeads((current) => current.filter((item) => item.id !== lead.id));
    toast.success("Mensagem removida.");
  };

  const handleSignOut = async () => {
    await anneDb.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  if (checking) {
    return (
      <main className="hero-petrol flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <span className="av-brand-mark mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl font-display font-bold">AV</span>
          <p className="mt-4 font-mono text-xs text-cyan-glow">Preparando seu espaço de trabalho...</p>
        </div>
      </main>
    );
  }

  const newLeadsCount = leads.filter((lead) => lead.status === "Novo").length;
  const heading = TAB_HEADINGS[activeTab];
  const normalizedProjectSearch = projectSearch.trim().toLocaleLowerCase("pt-BR");
  const filteredProjects = projects.filter((project) =>
    !normalizedProjectSearch
      ? true
      : `${project.titulo} ${project.categoria ?? ""}`.toLocaleLowerCase("pt-BR").includes(normalizedProjectSearch),
  );
  const normalizedLeadSearch = leadSearch.trim().toLocaleLowerCase("pt-BR");
  const filteredLeads = leads.filter((lead) => {
    if (leadStatus !== "Todos" && lead.status !== leadStatus) return false;
    if (!normalizedLeadSearch) return true;
    return `${lead.nome} ${lead.email} ${lead.descricao}`.toLocaleLowerCase("pt-BR").includes(normalizedLeadSearch);
  });

  return (
    <div className="min-h-screen bg-surface/55 text-foreground">
      <header className="hero-petrol border-b border-cyan-glow/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="av-brand-mark inline-flex h-11 w-11 items-center justify-center rounded-2xl font-display text-sm font-bold">AV</span>
            <div>
              <p className="font-display text-base font-bold text-hero-foreground">Anne Vitória</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-glow">Espaço de gestão</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-cyan-glow/20 bg-hero-surface/45 px-3 py-1.5 text-[11px] text-hero-muted sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Banco conectado
            </span>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/20 px-3.5 py-2 text-xs font-medium text-hero-muted transition-colors hover:border-cyan-glow/50 hover:text-hero-foreground">
              Ver meu site <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/20 px-3.5 py-2 text-xs font-medium text-hero-muted transition-colors hover:border-cyan-glow/50 hover:text-hero-foreground">
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-12 lg:py-9">
        <aside className="lg:col-span-3 xl:col-span-2">
          <nav aria-label="Navegação do painel" className="editorial-card flex gap-2 overflow-x-auto rounded-2xl p-2 lg:sticky lg:top-6 lg:flex-col lg:overflow-visible">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              const count = item.id === "projetos" ? projects.length : item.id === "mensagens" ? newLeadsCount : null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-colors lg:w-full ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 whitespace-nowrap">{item.label}</span>
                  {count !== null && count > 0 && <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-primary-foreground/15 text-primary-foreground" : "bg-secondary text-primary"}`}>{count}</span>}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 hidden rounded-2xl border border-border bg-card p-4 lg:block">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs font-semibold text-foreground">Gestão centralizada</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Projetos e mensagens sincronizados com seu banco de dados.</p>
          </div>
        </aside>

        <main className="min-w-0 lg:col-span-9 xl:col-span-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{heading.eyebrow}</p>
              <h1 className="mt-1.5 font-display text-3xl font-bold text-foreground">{heading.title}</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{heading.description}</p>
            </div>
            {(activeTab === "projetos" || activeTab === "mensagens") && (
              <button
                type="button"
                onClick={() => void Promise.all([loadProjects(), loadLeads()])}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Atualizar dados
              </button>
            )}
          </div>

          {activeTab === "visao-geral" && <AdminOverview projects={projects} leads={leads} onNavigate={setActiveTab} />}

          {activeTab === "organizacao" && (
            <WorkOrganization tasks={tasks} ready={tasksReady} leads={leads} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
          )}

          {activeTab === "projetos" && (
            <div className="grid items-start gap-6 xl:grid-cols-12">
              <form onSubmit={handleSaveProject} noValidate className="editorial-card rounded-3xl p-6 xl:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><FolderPlus className="h-4 w-4" /></span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{editingId ? "Editar projeto" : "Novo projeto"}</h2>
                    <p className="text-[11px] text-muted-foreground">As alterações aparecem no seu portfólio.</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="p-titulo" className="text-xs font-semibold text-foreground">Título *</label>
                    <input id="p-titulo" type="text" maxLength={100} required value={titulo} onChange={(event) => setTitulo(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="p-imagem" className="text-xs font-semibold text-foreground">Imagem de apresentação {editingId ? "(opcional)" : "*"}</label>
                    <input id="p-imagem" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs" />
                    <p className="mt-1.5 text-[10px] text-muted-foreground">JPG, PNG ou WebP · até 5 MB</p>
                    {previewUrl && <img src={previewUrl} alt="Prévia do projeto" className="mt-3 max-h-40 w-full rounded-xl border border-border object-cover" />}
                  </div>
                  <div>
                    <label htmlFor="p-desc" className="text-xs font-semibold text-foreground">Descrição curta</label>
                    <textarea id="p-desc" rows={3} maxLength={500} value={descricao} onChange={(event) => setDescricao(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="p-cat" className="text-xs font-semibold text-foreground">Categoria</label>
                    <select id="p-cat" value={categoria} onChange={(event) => setCategoria(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary">
                      <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                      <option value="Sistemas">Sistemas</option>
                      <option value="Interfaces">Interfaces</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3 text-xs font-medium text-foreground">
                    <input type="checkbox" checked={destaque} onChange={(event) => setDestaque(event.target.checked)} />
                    Destacar na seleção principal
                  </label>
                  <div>
                    <label htmlFor="p-link" className="text-xs font-semibold text-foreground">Link publicado *</label>
                    <input id="p-link" type="url" required placeholder="https://" value={link} onChange={(event) => setLink(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="p-github" className="text-xs font-semibold text-foreground">Link do GitHub (opcional)</label>
                    <input id="p-github" type="url" placeholder="https://github.com/Annevps/..." value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button type="submit" disabled={saving} className="btn-ocean rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
                      {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar e publicar"}
                    </button>
                    {editingId && <button type="button" onClick={resetForm} className="rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground">Cancelar edição</button>}
                  </div>
                </div>
              </form>

              <section className="editorial-card rounded-3xl p-6 xl:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Projetos cadastrados</h2>
                    <p className="mt-1 text-[11px] text-muted-foreground">{projects.length} projeto(s) no banco de dados</p>
                  </div>
                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input type="search" value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Buscar projeto" aria-label="Buscar projetos cadastrados" className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-xs outline-none focus:border-primary" />
                  </div>
                </div>
                {loadingProjects ? (
                  <p className="mt-8 text-sm text-muted-foreground">Carregando projetos...</p>
                ) : filteredProjects.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-dashed border-border px-5 py-10 text-center">
                    <FolderKanban className="mx-auto h-7 w-7 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">{projects.length === 0 ? "Nenhum projeto cadastrado ainda" : "Nenhum projeto encontrado"}</p>
                  </div>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {filteredProjects.map((project) => (
                      <li key={project.id} className="rounded-2xl border border-border bg-background/70 p-4">
                        <div className="flex flex-wrap items-center gap-4">
                          {project.imagem_path ? <img src={urlImagemProjeto(project.imagem_path)} alt="" className="h-16 w-24 rounded-xl object-cover" /> : <span className="inline-flex h-16 w-24 items-center justify-center rounded-xl bg-secondary text-primary"><FolderKanban className="h-5 w-5" /></span>}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <strong className="truncate font-display text-sm text-foreground">{project.titulo}</strong>
                              {project.destaque && <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{project.categoria ?? "Sem categoria"}</p>
                            <a href={project.link} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-primary hover:text-foreground">Abrir projeto <ExternalLink className="h-3 w-3" /></a>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                          <button type="button" onClick={() => togglePublished(project)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${project.publicado ? "border-primary/30 bg-secondary text-primary" : "border-border text-muted-foreground"}`}>{project.publicado ? "Publicado" : "Publicar"}</button>
                          <button type="button" onClick={() => startEdit(project)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] font-medium hover:border-primary hover:text-primary"><Pencil className="h-3 w-3" />Editar</button>
                          <button type="button" onClick={() => deleteProject(project)} className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" />Excluir</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}

          {activeTab === "mensagens" && (
            <section className="editorial-card rounded-3xl p-6">
              <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="search" value={leadSearch} onChange={(event) => setLeadSearch(event.target.value)} placeholder="Buscar nome, e-mail ou assunto" aria-label="Buscar mensagens" className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary" />
                </div>
                <select aria-label="Filtrar mensagens por status" value={leadStatus} onChange={(event) => setLeadStatus(event.target.value)} className="rounded-full border border-border bg-background px-4 py-2.5 text-xs font-medium outline-none focus:border-primary">
                  <option value="Todos">Todos os status</option>
                  <option value="Novo">Novo</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Respondido">Respondido</option>
                </select>
              </div>

              {loadingLeads ? (
                <p className="mt-8 text-sm text-muted-foreground">Carregando mensagens...</p>
              ) : filteredLeads.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-border px-5 py-12 text-center">
                  <Mail className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-3 text-sm font-semibold text-foreground">{leads.length === 0 ? "Nenhuma mensagem recebida ainda" : "Nenhum contato encontrado"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{leads.length === 0 ? "As mensagens enviadas pelo formulário aparecerão aqui." : "Tente mudar a busca ou o filtro selecionado."}</p>
                </div>
              ) : (
                <ul className="mt-6 space-y-4">
                  {filteredLeads.map((lead) => {
                    const whatsappDigits = lead.zap?.replace(/\D/g, "") ?? "";
                    return (
                      <li key={lead.id} className={`rounded-2xl border p-5 ${lead.status === "Novo" ? "border-primary/35 bg-secondary/30" : "border-border bg-background/65"}`}>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-primary">{lead.nome.trim().charAt(0).toUpperCase() || "C"}</span>
                            <div className="min-w-0">
                              <strong className="font-display text-base text-foreground">{lead.nome}</strong>
                              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                <a href={`mailto:${lead.email}`} className="hover:text-primary">{lead.email}</a>
                                {lead.zap && <span>{lead.zap}</span>}
                              </div>
                              {lead.criado_em && <p className="mt-1 font-mono text-[10px] text-muted-foreground">{new Date(lead.criado_em).toLocaleString("pt-BR")}</p>}
                            </div>
                          </div>
                          <select aria-label={`Alterar status da mensagem de ${lead.nome}`} value={lead.status} onChange={(event) => updateLeadStatus(lead.id, event.target.value)} className="rounded-full border border-border bg-card px-3 py-2 text-[11px] font-semibold outline-none focus:border-primary">
                            <option value="Novo">Novo</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Respondido">Respondido</option>
                          </select>
                        </div>
                        <p className="mt-4 whitespace-pre-wrap rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground">{lead.descricao}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <a href={`mailto:${lead.email}?subject=${encodeURIComponent("Retorno sobre seu contato — Anne Vitória")}`} className="btn-ocean inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold"><Mail className="h-3.5 w-3.5" />Responder por e-mail</a>
                          {whatsappDigits && <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-[11px] font-semibold text-foreground hover:border-primary hover:text-primary"><MessageCircle className="h-3.5 w-3.5" />Chamar no WhatsApp</a>}
                          <button type="button" onClick={() => deleteLead(lead)} className="ml-auto inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-2 text-[11px] font-medium text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3" />Excluir</button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
