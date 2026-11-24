import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  FolderPlus,
  LogOut,
  Mail,
  Pencil,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { ANNE_BUCKET_IMAGENS, anneDb, urlImagemProjeto } from "@/lib/anneSupabase";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel Administrativo | Anne Vitória" },
      { name: "description", content: "Gerenciamento de projetos e mensagens recebidas no portfólio." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel Administrativo | Anne Vitória" },
      { property: "og:description", content: "Área administrativa do portfólio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

interface DbProject {
  id: number;
  titulo: string;
  descricao: string | null;
  link: string;
  categoria: string | null;
  github_url: string | null;
  destaque: boolean | null;
  imagem_path: string | null;
  atualizado_em: string | null;
}

interface DbLead {
  id: number;
  nome: string;
  email: string;
  zap: string | null;
  descricao: string;
  status: string;
  criado_em: string | null;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function DashboardPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"projetos" | "mensagens">("projetos");

  const [projects, setProjects] = useState<DbProject[]>([]);
  const [leads, setLeads] = useState<DbLead[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Form state
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

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    const { data, error } = await anneDb
      .from("projetos")
      .select("*")
      .order("criado_em", { ascending: false });
    if (error) {
      toast.error("Não foi possível carregar os projetos.");
    } else {
      setProjects((data as DbProject[]) ?? []);
    }
    setLoadingProjects(false);
  }, []);

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    const { data, error } = await anneDb
      .from("formleads")
      .select("*")
      .order("criado_em", { ascending: false });
    if (error) {
      toast.error("Não foi possível carregar as mensagens.");
    } else {
      setLeads((data as DbLead[]) ?? []);
    }
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleSaveProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        const { error: upErr } = await anneDb.storage
          .from(ANNE_BUCKET_IMAGENS)
          .upload(path, file, { contentType: file.type, cacheControl: "3600" });
        if (upErr) throw upErr;
        uploadedPath = path;
      }

      if (editingId) {
        const old = projects.find((p) => p.id === editingId);
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
        toast.success("Projeto adicionado com sucesso!");
      }

      resetForm();
      await loadProjects();
    } catch {
      if (uploadedPath) {
        await anneDb.storage.from(ANNE_BUCKET_IMAGENS).remove([uploadedPath]);
      }
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
    if (project.imagem_path) {
      await anneDb.storage.from(ANNE_BUCKET_IMAGENS).remove([project.imagem_path]);
    }
    if (editingId === project.id) resetForm();
    toast.success("Projeto excluído.");
    await loadProjects();
  };

  const updateLeadStatus = async (leadId: number, status: string) => {
    const { error } = await anneDb.from("formleads").update({ status }).eq("id", leadId);
    if (error) {
      toast.error("Erro ao atualizar o status da mensagem.");
      return;
    }
    toast.success(`Status atualizado para "${status}".`);
    await loadLeads();
  };

  const deleteLead = async (lead: DbLead) => {
    if (!window.confirm(`Excluir a mensagem de ${lead.nome}?`)) return;
    const { error } = await anneDb.from("formleads").delete().eq("id", lead.id);
    if (error) {
      toast.error("Não foi possível excluir a mensagem.");
      return;
    }
    toast.success("Mensagem removida.");
    await loadLeads();
  };

  const handleSignOut = async () => {
    await anneDb.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="font-mono text-sm text-muted-foreground">Verificando acesso administrativo...</p>
      </div>
    );
  }

  const newLeadsCount = leads.filter((l) => l.status === "Novo").length;

  return (
    <div>
      <section className="hero-petrol py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Painel Administrativo
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-hero-foreground sm:text-4xl">
              Gerenciar Projetos e Mensagens
            </h1>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-hero-surface/60 px-4 py-2 text-xs font-medium text-hero-foreground transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* KPI Summary + Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("projetos")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "projetos"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FolderPlus className="h-4 w-4" />
              Projetos ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mensagens")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "mensagens"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-4 w-4" />
              Mensagens ({leads.length})
              {newLeadsCount > 0 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                  {newLeadsCount} nova(s)
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === "projetos" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Project Form */}
            <form
              onSubmit={handleSaveProject}
              noValidate
              className="editorial-card rounded-3xl p-6 sm:p-7 lg:col-span-5"
            >
              <h2 className="font-display text-xl font-bold text-foreground">
                {editingId ? "Editar projeto" : "Adicionar novo projeto"}
              </h2>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="p-titulo" className="block font-mono text-xs text-muted-foreground">
                    Título *
                  </label>
                  <input
                    id="p-titulo"
                    type="text"
                    maxLength={100}
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="p-imagem" className="block font-mono text-xs text-muted-foreground">
                    Imagem de apresentação {editingId ? "(opcional)" : "*"}
                  </label>
                  <input
                    id="p-imagem"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Prévia do projeto"
                      className="mt-3 max-h-40 w-full rounded-xl border border-border object-cover"
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="p-desc" className="block font-mono text-xs text-muted-foreground">
                    Descrição curta
                  </label>
                  <textarea
                    id="p-desc"
                    rows={3}
                    maxLength={500}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="p-cat" className="block font-mono text-xs text-muted-foreground">
                    Categoria
                  </label>
                  <select
                    id="p-cat"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                    <option value="Sistemas">Sistemas</option>
                    <option value="Interfaces">Interfaces</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={destaque}
                    onChange={(e) => setDestaque(e.target.checked)}
                  />
                  <span>Destacar na seleção principal</span>
                </label>

                <div>
                  <label htmlFor="p-link" className="block font-mono text-xs text-muted-foreground">
                    Link publicado *
                  </label>
                  <input
                    id="p-link"
                    type="url"
                    required
                    placeholder="https://"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="p-github" className="block font-mono text-xs text-muted-foreground">
                    Link do GitHub (opcional)
                  </label>
                  <input
                    id="p-github"
                    type="url"
                    placeholder="https://github.com/Annevps/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-ocean rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
                  >
                    {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar projeto"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Projects List */}
            <section className="editorial-card rounded-3xl p-6 sm:p-7 lg:col-span-7">
              <h2 className="font-display text-xl font-bold text-foreground">
                Projetos cadastrados no banco
              </h2>
              {loadingProjects ? (
                <p className="mt-6 text-sm text-muted-foreground">Carregando projetos...</p>
              ) : projects.length === 0 ? (
                <p className="mt-6 text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
              ) : (
                <ul className="mt-5 space-y-3">
                  {projects.map((proj) => (
                    <li
                      key={proj.id}
                      className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background/70 p-3.5"
                    >
                      {proj.imagem_path && (
                        <img
                          src={urlImagemProjeto(proj.imagem_path)}
                          alt={proj.titulo}
                          className="h-14 w-20 rounded-xl object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="truncate font-display text-sm text-foreground">
                            {proj.titulo}
                          </strong>
                          {proj.destaque && <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {proj.categoria ?? "Sem categoria"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(proj)}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProject(proj)}
                          className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        ) : (
          /* Messages Tab */
          <section className="editorial-card mt-8 rounded-3xl p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Mensagens recebidas pelo formulário de contato
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {leads.length} mensagem(ns) · {newLeadsCount} nova(s)
                </p>
              </div>
              <button
                type="button"
                onClick={loadLeads}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Atualizar
              </button>
            </div>

            {loadingLeads ? (
              <p className="mt-6 text-sm text-muted-foreground">Carregando mensagens...</p>
            ) : leads.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">Nenhuma mensagem recebida ainda.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {leads.map((lead) => (
                  <li
                    key={lead.id}
                    className={`rounded-2xl border p-5 ${
                      lead.status === "Novo"
                        ? "border-primary/40 bg-secondary/40"
                        : "border-border bg-background/70"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <strong className="font-display text-base text-foreground">{lead.nome}</strong>
                        <p className="text-xs text-muted-foreground">
                          {lead.email} {lead.zap ? `· WhatsApp: ${lead.zap}` : ""}
                        </p>
                        {lead.criado_em && (
                          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                            {new Date(lead.criado_em).toLocaleString("pt-BR")}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          aria-label={`Alterar status da mensagem de ${lead.nome}`}
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium outline-none focus:border-primary"
                        >
                          <option value="Novo">Novo</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Respondido">Respondido</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => deleteLead(lead)}
                          className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Excluir
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-card p-3.5 text-sm text-foreground">
                      {lead.descricao}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}