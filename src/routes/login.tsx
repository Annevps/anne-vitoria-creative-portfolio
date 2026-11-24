import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, LogIn } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/MotionPrimitives";
import { anneDb } from "@/lib/anneSupabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Área Administrativa | Anne Vitória" },
      { name: "description", content: "Acesso restrito ao painel administrativo do portfólio de Anne Vitória." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Área Administrativa | Anne Vitória" },
      { property: "og:description", content: "Painel restrito para gerenciar projetos e contatos." },
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

      toast.success("Bem-vinda de volta ao painel administrativo!");
      navigate({ to: "/dashboard", replace: true });
    } catch {
      setErrorMsg("Não foi possível conectar. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-16">
      <Reveal className="w-full">
        <section className="editorial-card rounded-3xl p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="av-brand-mark inline-flex h-11 w-11 items-center justify-center rounded-2xl">
              <LockKeyhole className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Área restrita
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">Painel ADM</h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Entre com sua conta de administradora para gerenciar projetos e acompanhar mensagens dos
            clientes.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block font-mono text-xs text-muted-foreground">
                E-mail
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="admin-senha" className="block font-mono text-xs text-muted-foreground">
                Senha
              </label>
              <input
                id="admin-senha"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            {errorMsg && (
              <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-ocean mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Entrando..." : "Entrar no painel"}
            </button>
          </form>
        </section>
      </Reveal>
    </div>
  );
}