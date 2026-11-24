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
    <div>
      <section className="hero-petrol relative overflow-hidden py-16 md:py-20">
        <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">Sobre mim</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-hero-foreground sm:text-5xl">
              Desenvolvimento com propósito e <span className="text-cyan-glow">paixão por tecnologia</span>.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-hero-muted sm:text-lg">
              Sou especialista em transformar problemas complexos em interfaces limpas, intuitivas e
              sistemas altamente funcionais.
            </p>
          </Reveal>
        </div>
      </section>

    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Minha trajetória na tecnologia
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Minha trajetória na tecnologia é guiada pela busca constante de excelência técnica e
            usabilidade refinada. Acredito que um bom código não é apenas aquele que funciona, mas
            aquele que é sustentável, escalável e proporciona uma experiência fantástica para quem
            utiliza.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Atuo em todas as camadas do desenvolvimento (Full Stack), garantindo que desde a
            arquitetura de banco de dados até os detalhes finais da interface estejam perfeitamente
            alinhados aos objetivos do projeto.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Sou <strong className="font-semibold text-foreground">{PROFILE.fullName}</strong> e
            ofereço atendimento remoto para todo o Brasil, unindo estética autoral, performance e
            SEO técnico em cada entrega.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              to="/habilidades"
              className="btn-ocean inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              Ver minhas habilidades
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref("Olá Anne! Li sua história no portfólio e gostaria de conversar.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="editorial-card overflow-hidden rounded-3xl">
            <div className="hero-petrol relative aspect-[4/4] overflow-hidden">
              <img
                src={PROFILE.portrait}
                alt={PROFILE.fullName}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-border p-5 text-xs">
              <div>
                <p className="font-mono text-muted-foreground">Atuação</p>
                <p className="mt-1 font-semibold text-foreground">{PROFILE.role}</p>
              </div>
              <div>
                <p className="font-mono text-muted-foreground">Atendimento</p>
                <p className="mt-1 font-semibold text-foreground">Remoto · Brasil</p>
              </div>
              <div className="col-span-2 border-t border-border pt-3">
                <p className="font-mono text-muted-foreground">Stack principal</p>
                <p className="mt-1 font-semibold text-primary">
                  HTML5 · CSS3 · JavaScript · TypeScript · React · Node.js · Python · MySQL
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Timeline */}
      <section className="mt-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Trajetória</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Evolução contínua em engenharia e design
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {MILESTONES.map((item) => (
            <StaggerItem key={item.title}>
              <div className="editorial-card h-full rounded-2xl p-6">
                <span className="font-mono text-xs font-semibold text-primary">{item.period}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
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
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Princípios</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            O que guia cada entrega
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((val, idx) => (
            <StaggerItem key={val.title}>
              <div className="editorial-card h-full rounded-2xl p-6">
                <span className="font-mono text-xs font-semibold text-primary">0{idx + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  {val.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{val.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
    </div>
  );
}