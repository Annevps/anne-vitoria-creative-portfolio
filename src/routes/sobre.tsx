import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionPrimitives";
import { PROFILE, whatsappHref } from "@/data/portfolio";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Mim | Anne Vitória — Desenvolvedora Full Stack" },
      {
        name: "description",
        content:
          "Conheça a trajetória, os princípios de engenharia e o compromisso com qualidade visual e técnica de Anne Vitória.",
      },
      { property: "og:title", content: "Sobre Anne Vitória | Desenvolvedora Full Stack" },
      {
        property: "og:description",
        content:
          "Desenvolvimento com propósito: código limpo, design sofisticado e atendimento remoto para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const MILESTONES = [
  {
    period: "Base sólida",
    title: "Fundamentos Web & Lógica",
    detail:
      "Construí uma base forte em HTML5 semântico, CSS moderno, JavaScript puro e lógica de programação para nunca depender de soluções frágeis.",
  },
  {
    period: "Evolução Full Stack",
    title: "React, Node.js, Python & Bancos de Dados",
    detail:
      "Passei a desenvolver aplicações completas de ponta a ponta — da modelagem em MySQL/PostgreSQL às APIs REST e interfaces interativas.",
  },
  {
    period: "Hoje",
    title: "Produtos Digitais Sob Medida",
    detail:
      "Atendo clientes de forma remota em todo o Brasil, unindo estética de alto padrão, animações fluidas, SEO técnico e performance real.",
  },
] as const;

const VALUES = [
  {
    title: "Acabamento que gera confiança",
    text: "Um cliente julga a qualidade do seu serviço nos primeiros segundos no site. Cada detalhe visual, espaçamento e animação existe para valorizar sua marca.",
  },
  {
    title: "Código limpo e sustentável",
    text: "Não basta funcionar hoje: estruturo o projeto para ser fácil de manter, seguro e pronto para receber novos recursos no futuro.",
  },
  {
    title: "Comunicação transparente",
    text: "Sem jargões confusos. Você acompanha cada etapa em linguagem clara e aprova o avanço antes de seguir para a próxima fase.",
  },
] as const;

function SobrePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:pt-18">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-xs text-primary">~/sobre</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Desenvolvimento com propósito e atenção <span className="text-primary">a cada detalhe</span>.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sou <strong className="font-semibold text-foreground">{PROFILE.fullName}</strong>,
            desenvolvedora Full Stack apaixonada por transformar problemas reais em interfaces
            elegantes e sistemas confiáveis.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Acredito que tecnologia de verdade precisa unir duas coisas que raramente andam juntas:
            engenharia bem feita por baixo dos panos e um visual profissional que faz o cliente
            sentir segurança imediata ao navegar.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Atuo de ponta a ponta — da arquitetura do banco de dados e integrações até o layout
            responsivo, animações e otimização para o Google — com atendimento remoto para todo o
            Brasil.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              to="/habilidades"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Ver minhas habilidades
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref("Olá Anne! Li sua história no portfólio e gostaria de conversar.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="card-surface overflow-hidden rounded-3xl">
            <div className="bg-tech-grid relative aspect-[4/4] overflow-hidden">
              <img
                src={PROFILE.portrait}
                alt={PROFILE.fullName}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-border p-5 text-xs">
              <div>
                <p className="font-mono text-muted-foreground">Atuação</p>
                <p className="mt-1 font-medium text-foreground">{PROFILE.role}</p>
              </div>
              <div>
                <p className="font-mono text-muted-foreground">Atendimento</p>
                <p className="mt-1 font-medium text-foreground">Remoto · Brasil</p>
              </div>
              <div className="col-span-2 border-t border-border pt-3">
                <p className="font-mono text-muted-foreground">Stack principal</p>
                <p className="mt-1 font-medium text-primary">
                  React · TypeScript · Node.js · Python · MySQL
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Timeline */}
      <section className="mt-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Trajetória</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Evolução contínua em engenharia e design
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {MILESTONES.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="font-mono text-xs text-primary">{item.period}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Values */}
      <section className="mt-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Princípios</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            O que guia cada entrega
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((val, idx) => (
            <StaggerItem key={val.title}>
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="font-mono text-xs text-accent">0{idx + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {val.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{val.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}