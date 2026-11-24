import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CodeShowcase } from "@/components/CodeShowcase";
import {
  AnimatedCounter,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/MotionPrimitives";
import {
  FAQS,
  HERO_METRICS,
  PROFILE,
  PROJECTS,
  SERVICES,
  TECH_MARQUEE,
  WORK_PILLARS,
  whatsappHref,
} from "@/data/portfolio";
import { fetchPortfolioProjects } from "@/lib/remoteProjects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anne Vitória | Desenvolvedora Full Stack — Sites e Sistemas Sob Medida" },
      {
        name: "description",
        content:
          "Desenvolvedora Full Stack com atendimento remoto para todo o Brasil. Sites rápidos, sistemas web sob medida, e-commerces e interfaces profissionais com foco em SEO e conversão.",
      },
      { property: "og:title", content: "Anne Vitória | Desenvolvedora Full Stack" },
      {
        property: "og:description",
        content:
          "Projetos reais, do código à publicação. Sites e sistemas web sob medida com atendimento remoto para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: fetchPortfolioProjects,
    initialData: { projects: PROJECTS, syncedCount: 0 },
    staleTime: 1000 * 60 * 5,
  });

  const featuredProjects = data.projects.slice(0, 3);

  return (
    <div className="overflow-x-clip">
      {/* HERO — Identidade autoral Azul Petróleo & Ciano da Anne */}
      <section className="hero-petrol relative overflow-hidden">
        <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 md:pt-20 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Coluna esquerda: Apresentação autoral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-glow/25 bg-hero-surface/65 px-3.5 py-1.5 font-mono text-xs text-cyan-glow">
                <span className="h-2 w-2 rounded-full bg-mint" />
                <span>
                  {PROFILE.role} · {PROFILE.location}
                </span>
              </div>

              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-hero-foreground sm:text-6xl lg:text-[4.65rem]">
                Anne Vitória<span className="text-cyan-glow">.</span>
              </h1>

              <p className="mt-5 font-display text-2xl font-semibold leading-snug text-hero-foreground/90 sm:text-3xl">
                Transformando código em{" "}
                <span className="text-cyan-glow">soluções reais</span>.
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-hero-muted">
                Do banco de dados à interface, construo aplicações web modernas, escaláveis e com
                acabamento visual impecável. Sistemas que saem do papel e geram valor de verdade.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/projetos"
                  className="btn-ocean inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Ver Projetos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-hero-surface/50 px-6 py-3.5 text-sm font-medium text-hero-foreground transition-colors hover:border-cyan-glow hover:text-cyan-glow"
                >
                  <MessageCircle className="h-4 w-4 text-cyan-glow" />
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cyan-glow/15 pt-7">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-2xl font-bold text-hero-foreground sm:text-3xl">
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </p>
                    <p className="mt-1 text-xs text-hero-muted sm:text-sm">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coluna direita: Retrato editorial em moldura ciano rotacionada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
            >
              <div className="relative rounded-[28px] border border-cyan-glow/35 bg-gradient-to-br from-cyan-glow/20 via-hero-surface/40 to-transparent p-3 shadow-2xl transition-transform duration-500 hover:rotate-0 lg:rotate-2">
                <img
                  src={PROFILE.portrait}
                  alt={`${PROFILE.name}, ${PROFILE.role}`}
                  className="aspect-[4/5] w-full rounded-[20px] object-cover object-top"
                />
                <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-border bg-card px-4 py-3 text-foreground shadow-xl sm:left-5 sm:right-auto">
                  <p className="font-display text-sm font-bold text-foreground">
                    {PROFILE.fullName}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-primary">
                    Full Stack · Do banco à interface
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAIXA DE TECNOLOGIAS (Domínio Técnico) */}
      <section
        id="habilidades"
        aria-label="Tecnologias utilizadas"
        className="overflow-hidden border-y border-cyan-glow/15 bg-hero-surface py-4"
      >
        <div className="flex w-max animate-marquee gap-4">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-hero/60 px-4 py-1.5 font-mono text-xs text-hero-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ESPECIALIDADES & SERVIÇOS — Fundo Claro Editorial */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            O que eu desenvolvo
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Soluções sob medida que unem <span className="text-primary">engenharia e design</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Cada projeto nasce com foco em performance, clareza visual e SEO técnico para valorizar
            o seu negócio em qualquer tela.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, idx) => {
            const isFeatured = idx === 0;
            return (
              <StaggerItem key={service.number}>
                <article
                  className={`flex h-full flex-col justify-between rounded-3xl p-7 ${
                    isFeatured ? "featured-petrol-card" : "editorial-card"
                  }`}
                >
                  <div>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isFeatured ? "text-cyan-glow" : "text-primary"
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3
                      className={`mt-3 font-display text-xl font-bold ${
                        isFeatured ? "text-hero-foreground" : "text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isFeatured ? "text-hero-muted" : "text-muted-foreground"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 border-t pt-4 ${
                      isFeatured ? "border-cyan-glow/20" : "border-border"
                    }`}
                  >
                    <p
                      className={`text-xs ${
                        isFeatured ? "text-hero-muted" : "text-muted-foreground"
                      }`}
                    >
                      {service.audience}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
                            isFeatured
                              ? "border border-cyan-glow/25 bg-hero/40 text-cyan-glow"
                              : "bg-secondary text-primary"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="mt-8">
          <Link
            to="/habilidades"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            Explorar todas as habilidades técnicas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* PROJETOS EM DESTAQUE */}
      <section className="border-y border-border bg-surface/65 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Portfólio
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Projetos em <span className="text-primary">destaque</span>
              </h2>
            </div>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-foreground"
            >
              Ver todos os projetos
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  to="/projetos"
                  className="editorial-card group flex h-full flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-hero">
                    <img
                      src={project.image}
                      alt={`Prévia do projeto ${project.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-hero/85 px-3 py-1 font-mono text-[11px] text-cyan-glow backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ENGENHARIA & CÓDIGO */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mb-10 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Por baixo dos panos
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Cuidado técnico em cada linha
          </h2>
        </Reveal>
        <Reveal>
          <CodeShowcase />
        </Reveal>
      </section>

      {/* COMO EU TRABALHO */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Como eu trabalho
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Compromisso do planejamento ao suporte
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {WORK_PILLARS.map((pillar, idx) => (
            <StaggerItem key={pillar.title}>
              <div className="editorial-card h-full rounded-2xl p-6">
                <span className="font-mono text-xs font-semibold text-primary">0{idx + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Perguntas sobre sites e sistemas
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="editorial-card overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Reveal>
          <div className="hero-petrol relative overflow-hidden rounded-3xl border border-cyan-glow/20 px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16">
            <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
                Vamos tirar sua ideia do papel
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-hero-foreground sm:text-4xl">
                Pronto para construir um projeto digital à altura da sua marca?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-hero-muted sm:text-base">
                Conte o que você precisa pelo WhatsApp ou formulário de contato. Atendimento remoto
                para todo o Brasil.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ocean inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chamar no WhatsApp
                </a>
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-hero-surface/60 px-6 py-3.5 text-sm font-medium text-hero-foreground transition-colors hover:border-cyan-glow hover:text-cyan-glow"
                >
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
