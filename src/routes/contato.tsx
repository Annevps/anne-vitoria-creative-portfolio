import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Github, Globe, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/MotionPrimitives";
import { PROFILE, whatsappHref } from "@/data/portfolio";

const SUPABASE_URL = "https://mezafzsrxzgryefprblh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TDk-7FqEPphaWB30qkjMGw_BvHMr1vu";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato & Orçamento | Anne Vitória — Desenvolvedora Full Stack" },
      {
        name: "description",
        content:
          "Fale com Anne Vitória pelo WhatsApp (33) 99841-4684, e-mail ou formulário de orçamento. Atendimento remoto para todo o Brasil.",
      },
      { property: "og:title", content: "Contato | Anne Vitória — Desenvolvedora Full Stack" },
      {
        property: "og:description",
        content:
          "Solicite seu orçamento de site profissional ou sistema sob medida. Atendimento remoto para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [zap, setZap] = useState("");
  const [descricao, setDescricao] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      toast.success("E-mail copiado!");
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      toast.error("Não foi possível copiar o e-mail.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = nome.trim();
    const cleanEmail = email.trim();
    const cleanDesc = descricao.trim();

    if (!cleanName || !cleanEmail || !cleanDesc) {
      toast.error("Preencha nome, e-mail e conte brevemente sobre o projeto.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Informe um endereço de e-mail válido.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/formleads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nome: cleanName,
          email: cleanEmail,
          zap: zap.trim() || null,
          descricao: cleanDesc,
          status: "Novo",
        }),
      });

      if (!res.ok) throw new Error("Falha ao registrar contato");
      setSent(true);
      setNome("");
      setEmail("");
      setZap("");
      setDescricao("");
      toast.success("Mensagem enviada com sucesso! Retornarei em breve.");
    } catch {
      toast.info("Abrindo seu atendimento direto pelo WhatsApp...");
      window.open(
        whatsappHref(`Olá Anne! Meu nome é ${cleanName} (${cleanEmail}). ${cleanDesc}`),
        "_blank",
        "noopener,noreferrer",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:pt-18">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-xs text-primary">~/contato</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Vamos construir algo <span className="text-primary">profissional</span> juntos?
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Escolha o canal que preferir ou envie os detalhes da sua ideia pelo formulário. Retorno
          rapidamente com uma proposta clara.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Direct Channels */}
        <Reveal className="space-y-4 lg:col-span-5">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="card-surface flex items-center justify-between gap-4 rounded-2xl p-5"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">WhatsApp direto</p>
                <p className="mt-0.5 font-display text-base font-semibold text-foreground">
                  {PROFILE.whatsappDisplay}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Chamar
            </span>
          </a>

          <div className="card-surface flex items-center justify-between gap-4 rounded-2xl p-5">
            <a href={`mailto:${PROFILE.email}`} className="flex min-w-0 items-center gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">E-mail profissional</p>
                <p className="mt-0.5 truncate font-display text-sm font-semibold text-foreground sm:text-base">
                  {PROFILE.email}
                </p>
              </div>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copiar e-mail"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {copiedEmail ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="card-surface flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs text-muted-foreground">GitHub</p>
              <p className="mt-0.5 font-display text-base font-semibold text-foreground">
                github.com/Annevps
              </p>
            </div>
          </a>

          <div className="card-surface flex items-center gap-4 rounded-2xl p-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Região de atendimento</p>
              <p className="mt-0.5 font-display text-base font-semibold text-foreground">
                {PROFILE.location}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Quote Form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="card-surface rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Solicitar orçamento
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sua mensagem cai direto no meu painel de contatos para acompanhamento.
            </p>

            {sent && (
              <div className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
                Recebi sua mensagem! Em breve entro em contato pelo e-mail ou WhatsApp informado.
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contato-nome" className="block font-mono text-xs text-muted-foreground">
                  Seu nome *
                </label>
                <input
                  id="contato-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como prefere ser chamado(a)"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                />
              </div>
              <div>
                <label htmlFor="contato-email" className="block font-mono text-xs text-muted-foreground">
                  E-mail *
                </label>
                <input
                  id="contato-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@empresa.com"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contato-zap" className="block font-mono text-xs text-muted-foreground">
                WhatsApp (opcional)
              </label>
              <input
                id="contato-zap"
                type="tel"
                value={zap}
                onChange={(e) => setZap(e.target.value)}
                placeholder="(00) 90000-0000"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="contato-desc" className="block font-mono text-xs text-muted-foreground">
                Conte sobre o seu projeto *
              </label>
              <textarea
                id="contato-desc"
                rows={4}
                required
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex.: Preciso de um site profissional para minha empresa com formulário e WhatsApp..."
                className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}