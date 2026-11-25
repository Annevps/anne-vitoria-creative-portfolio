import { useQuery } from "@tanstack/react-query";
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
import { PROFILE, whatsappHref } from "@/data/portfolio";
import { fetchPortfolioProjects } from "@/lib/remoteProjects";

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

  const { data: projectData } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: fetchPortfolioProjects,
    staleTime: 1000 * 60 * 5,
  });
  const liveProjects = projectData?.projects ?? [];

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
  const matchedProjects = liveProjects.filter(
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

      <div className="group fixed right-5 bottom-5 z-40 flex items-center gap-3">
        <span className="pointer-events-none hidden translate-x-2 rounded-full border border-border bg-card px-3.5 py-2 font-mono text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex">
          WhatsApp · {PROFILE.whatsappDisplay}
        </span>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          aria-label={`Falar com Anne Vitória no WhatsApp ${PROFILE.whatsappDisplay}`}
          title={`Chamar no WhatsApp: ${PROFILE.whatsappDisplay}`}
          className="whatsapp-fab relative inline-flex h-14 w-14 items-center justify-center rounded-full"
        >
          <span
            aria-hidden="true"
            className="whatsapp-fab-ring pointer-events-none absolute inset-0 rounded-full"
          />
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="relative z-10 h-7 w-7 fill-current"
          >
            <path d="M16.02 3C8.84 3 3 8.83 3 16c0 2.53.73 4.99 2.11 7.11L3.7 28.3l5.34-1.39A12.94 12.94 0 0 0 16.02 29C23.19 29 29 23.17 29 16S23.19 3 16.02 3Zm0 23.62c-2.16 0-4.26-.6-6.08-1.74l-.43-.27-3.17.82.85-3.09-.28-.45A10.6 10.6 0 0 1 5.38 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.62 4.77 10.62 10.63 0 5.85-4.76 10.62-10.62 10.62Zm5.83-7.95c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.18.22-.37.24-.69.08-.32-.16-1.34-.5-2.56-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.22.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.56 1.14 3.07 1.3 3.29.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.68.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </a>
      </div>

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