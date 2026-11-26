import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PROFILE } from "@/data/portfolio";
import { anneDb } from "@/lib/anneSupabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Acesso Administrativo | Anne Vitória" },
      { name: "description", content: "Acesso restrito ao espaço profissional de gestão do portfólio de Anne Vitória." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Acesso Administrativo | Anne Vitória" },
      { property: "og:description", content: "Área privada para gestão de projetos, contatos e organização do trabalho." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

async function isAdminUser(userId: string): Promise<boolean> {
  const { data, error } = await anneDb
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !error && data !== null;
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    anneDb.auth.getSession().then(async ({ data }) => {
      if (data.session && (await isAdminUser(data.session.user.id))) {
        navigate({ to: "/dashboard", replace: true });
      }
    });
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMsg("Preencha o e-mail e a senha para continuar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await anneDb.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error || !data.user) {
        setErrorMsg("E-mail ou senha incorretos. Confira e tente novamente.");
        setPassword("");
        return;
      }

      if (!(await isAdminUser(data.user.id))) {
        await anneDb.auth.signOut();
        setErrorMsg("Esta conta não tem permissão para acessar o painel.");
        return;
      }

      toast.success("Bem-vinda de volta ao seu espaço de trabalho!");
      navigate({ to: "/dashboard", replace: true });
    } catch {
      setErrorMsg("Não foi possível conectar. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-card lg:grid-cols-[0.92fr_1.08fr]">
      <motion.section
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="hero-petrol relative flex flex-col overflow-hidden px-6 py-7 sm:px-10 lg:min-h-screen lg:px-12 lg:py-9"
      >
        <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-glow/10 blur-3xl" aria-hidden="true" />

        <Link to="/" className="relative inline-flex w-fit items-center gap-3" aria-label="Voltar para a página inicial">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-glow/30 bg-hero-foreground font-display text-sm font-bold text-hero shadow-lg">
            AV
          </span>
          <span>
            <span className="block font-display text-sm font-semibold text-hero-foreground">{PROFILE.name}</span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-glow">
              Área administrativa
            </span>
          </span>
        </Link>

        <div className="relative my-auto max-w-lg py-12 lg:py-16">
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-glow sm:flex">
            <span className="h-px w-8 bg-cyan-glow/70" />
            Acesso seguro
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-tight text-hero-foreground sm:text-5xl lg:text-[3.45rem]">
            Gerencie seu portfólio com <span className="text-cyan-glow">clareza.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-hero-muted sm:text-base">
            Projetos, contatos e organização do trabalho reunidos em um único espaço profissional.
          </p>
          <div className="mt-8 hidden items-center gap-2 text-xs text-hero-muted sm:flex">
            <ShieldCheck className="h-4 w-4 text-cyan-glow" />
            Acesso exclusivo para administradores cadastrados
          </div>
        </div>

        <p className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-hero-muted/70">
          Portfólio profissional · 2026
        </p>
      </motion.section>

      <section className="relative flex items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
        <Link
          to="/"
          className="absolute left-5 top-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary sm:left-10 lg:left-16"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao site
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
            Bem-vinda de volta.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Área restrita à administração do portfólio.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-foreground">
                E-mail
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div>
              <label htmlFor="admin-senha" className="block text-xs font-semibold text-foreground">
                Senha
              </label>
              <div className="relative mt-2">
                <input
                  id="admin-senha"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-12 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive"
              >
                {errorMsg}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-ocean inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Verificando acesso..." : "Entrar no painel"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-7 text-center text-[11px] leading-relaxed text-muted-foreground">
            Seus projetos e mensagens continuam protegidos pelas permissões do seu banco de dados.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
