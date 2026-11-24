import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Menu, MessageCircle, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { MatrixBackdrop } from "@/components/MatrixBackdrop";
import { PROFILE, PROJECTS, whatsappHref } from "@/data/portfolio";

const LEFT_LINKS = [
  { to: "/habilidades" as const, label: "Habilidades" },
  { to: "/projetos" as const, label: "Projetos" },
];

const RIGHT_LINKS = [
  { to: "/sobre" as const, label: "Sobre" },
  { to: "/contato" as const, label: "Contato" },
];

const ALL_LINKS = [
  { to: "/" as const, label: "Início", hint: "Página principal" },
  { to: "/habilidades" as const, label: "Habilidades", hint: "Stack técnica e processo" },
  { to: "/projetos" as const, label: "Projetos", hint: "Portfólio interativo" },
  { to: "/sobre" as const, label: "Sobre", hint: "Trajetória e valores" },
  { to: "/contato" as const, label: "Contato", hint: "WhatsApp, e-mail e orçamento" },
];

function pathToTerminal(pathname: string): string {
  if (pathname === "/") return "~/index";
  return `~${pathname}`;
}

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
  const matchedLinks = ALL_LINKS.filter(
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
      <MatrixBackdrop />

      <header className="sticky top-0 z-40 w-full px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link
            to="/"
            className="hidden items-center font-mono text-xs text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
            aria-label="Caminho atual — voltar ao início"
          >
            <span>{pathToTerminal(pathname)}</span>
            <span className="ml-0.5 inline-block h-3.5 w-1.5 bg-primary animate-cursor" />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="glass-pill mx-auto flex items-center gap-1 rounded-full px-2.5 py-1.5 sm:gap-2 sm:px-4"
          >
            <div className="hidden items-center gap-1 md:flex">
              {LEFT_LINKS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-secondary"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/"
              aria-label={`${PROFILE.name} — página inicial`}
              className="px-2.5 py-1 font-display text-lg font-bold tracking-tight text-primary transition-transform hover:scale-105 sm:px-3 sm:text-xl"
            >
              {PROFILE.monogram}
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {RIGHT_LINKS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-secondary"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar páginas e projetos"
              className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden rounded border border-border bg-secondary/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                Ctrl K
              </kbd>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-pill mx-auto mt-3 max-w-sm rounded-2xl p-3 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {ALL_LINKS.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{item.hint}</span>
                    </Link>
                  );
                })}
              </div>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" className="font-display text-2xl font-bold text-primary">
                {PROFILE.monogram}{" "}
                <span className="ml-1 text-lg text-foreground">{PROFILE.name}</span>
              </Link>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {PROFILE.role} · {PROFILE.location}. Sites rápidos, sistemas sob medida e interfaces
                projetadas para transmitir confiança e gerar resultados reais.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-primary">Navegação</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {ALL_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-primary">Contato direto</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4 text-accent" />
                    {PROFILE.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <Github className="h-4 w-4 text-primary" />
                    github.com/Annevps
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
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
        className="fixed right-5 bottom-5 z-40 inline-flex h-13 w-13 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ boxShadow: "0 10px 30px -6px var(--color-emerald-glow)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 px-4 pt-24 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="card-surface w-full max-w-lg overflow-hidden rounded-2xl"
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