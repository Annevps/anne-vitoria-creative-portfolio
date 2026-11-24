import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PROFILE, PROJECTS, whatsappHref } from "@/data/portfolio";

const NAV_LINKS = [
  { to: "/" as const, label: "Início", hint: "Página principal" },
  { to: "/habilidades" as const, label: "Habilidades", hint: "Stack técnica e processo" },
  { to: "/projetos" as const, label: "Projetos", hint: "Portfólio interativo" },
  { to: "/sobre" as const, label: "Sobre", hint: "Trajetória e valores" },
  { to: "/contato" as const, label: "Contato", hint: "WhatsApp, e-mail e orçamento" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalized = query.trim().toLowerCase();
  const matchedLinks = NAV_LINKS.filter(
    (item) =>
      !normalized ||
      item.label.toLowerCase().includes(normalized) ||
      item.hint.toLowerCase().includes(normalized),
  );
  const matchedProjects = PROJECTS.filter(
    (project) =>
      !normalized ||
      project.title.toLowerCase().includes(normalized) ||
      project.category.toLowerCase().includes(normalized) ||
      project.stack.some((tech) => tech.toLowerCase().includes(normalized)),
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <header className="glass-nav sticky top-0 z-40 w-full">
        <div className="mx-auto flex h-19 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            aria-label={`${PROFILE.name} — página inicial`}
            className="inline-flex items-center gap-3 transition-transform hover:scale-[1.02]"
          >
            <span className="av-brand-mark inline-flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold tracking-tight">
              AV
            </span>
            <span className="font-display text-base font-bold tracking-tight text-hero-foreground">
              {PROFILE.name}
            </span>
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-hero-foreground"
                      : "text-hero-muted hover:text-hero-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-cyan-glow/30 bg-cyan-glow/15"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar páginas e projetos"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-hero-surface/60 px-3 py-1.5 text-xs text-hero-muted transition-colors hover:border-cyan-glow/45 hover:text-hero-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden rounded border border-cyan-glow/20 bg-hero/70 px-1.5 py-0.5 font-mono text-[10px] text-hero-muted lg:inline">
                Ctrl K
              </kbd>
            </button>

            <Link
              to="/login"
              title="Painel administrativo"
              aria-label="Acessar painel administrativo"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                pathname === "/login" || pathname === "/dashboard"
                  ? "border-cyan-glow/60 bg-cyan-glow/20 text-cyan-glow"
                  : "border-cyan-glow/20 bg-hero-surface/60 text-hero-muted hover:border-cyan-glow/45 hover:text-hero-foreground"
              }`}
            >
              <LockKeyhole className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-glow/20 bg-hero-surface/60 text-hero-foreground transition-colors hover:border-cyan-glow/45 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-cyan-glow/15 bg-hero px-4 pb-4 md:hidden"
            >
              <div className="flex flex-col gap-1 pt-3">
                {NAV_LINKS.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-cyan-glow/15 text-cyan-glow"
                          : "text-hero-muted hover:bg-hero-surface hover:text-hero-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[11px] opacity-75">{item.hint}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/login"
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-hero-muted hover:bg-hero-surface hover:text-hero-foreground"
                >
                  <span>Painel ADM</span>
                  <LockKeyhole className="h-4 w-4" />
                </Link>
              </div>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="btn-ocean mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="hero-petrol mt-20 border-t border-cyan-glow/15">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="av-brand-mark inline-flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold">
                  AV
                </span>
                <span className="font-display text-lg font-bold text-hero-foreground">
                  {PROFILE.name}
                </span>
              </Link>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-hero-muted">
                {PROFILE.role} · {PROFILE.location}. Desenvolvendo ideias com tecnologia,
                interfaces limpas, código sustentável e foco em resultados reais.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-cyan-glow">Navegação</p>
              <ul className="mt-4 space-y-2.5 text-sm text-hero-muted">
                {NAV_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="transition-colors hover:text-hero-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/login" className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-glow">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Painel ADM
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-cyan-glow">Contato direto</p>
              <ul className="mt-4 space-y-2.5 text-sm text-hero-muted">
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-hero-foreground"
                  >
                    <MessageCircle className="h-4 w-4 text-cyan-glow" />
                    {PROFILE.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-hero-foreground"
                  >
                    <Mail className="h-4 w-4 text-cyan-glow" />
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-hero-foreground"
                  >
                    <Github className="h-4 w-4 text-cyan-glow" />
                    github.com/Annevps
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-cyan-glow/15 pt-6 text-xs text-hero-muted sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {PROFILE.fullName}. Todos os direitos reservados.</p>
            <p className="font-mono">{PROFILE.location}</p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com Anne Vitória no WhatsApp"
        className="btn-ocean fixed right-5 bottom-5 z-40 inline-flex h-13 w-13 items-center justify-center rounded-full"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-hero/75 px-4 pt-24 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar páginas, projetos ou tecnologias..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Fechar busca"
                  className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-3">
                {matchedLinks.length > 0 && (
                  <div className="mb-3">
                    <p className="px-2 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Páginas
                    </p>
                    {matchedLinks.map((item) => (
                      <button
                        key={item.to}
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                          navigate({ to: item.to });
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                      >
                        <span className="font-medium text-foreground">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.hint}</span>
                      </button>
                    ))}
                  </div>
                )}

                {matchedProjects.length > 0 && (
                  <div>
                    <p className="px-2 pb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Projetos
                    </p>
                    {matchedProjects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                          navigate({ to: "/projetos" });
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                      >
                        <span className="font-medium text-foreground">{project.title}</span>
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          {project.category}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {matchedLinks.length === 0 && matchedProjects.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Nenhum resultado encontrado para &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}