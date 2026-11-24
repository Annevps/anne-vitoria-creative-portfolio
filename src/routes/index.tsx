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
    <div className="overflow-x-clip pb-8">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:pt-18 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Portrait in dark tech grid frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
          >
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, var(--color-gold-glow), transparent 70%)" }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface bg-tech-grid pt-4 shadow-2xl">
              <img
                src={PROFILE.portrait}
                alt={`${PROFILE.name}, ${PROFILE.role}`}
                className="mx-auto aspect-[4/5] w-full object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
                style={{
                  background: "linear-gradient(to top, var(--color-background) 10%, transparent)",
                }}
              />
              <div className="glass-pill absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 sm:right-auto">
                <p className="font-display text-sm font-semibold text-foreground">{PROFILE.fullName}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {PROFILE.role} · Remoto Brasil
                </p>
              </div>
            </div>
          </motion.div>

          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>
                {PROFILE.role} · {PROFILE.location}
              </span>
            </div>

            <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight text-primary sm:text-7xl lg:text-[5.25rem]">
              Anne
              <br />
              Vitória
            </h1>

            <p className="mt-6 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              Projetos reais,
              <br />
              <span className="text-muted-foreground">do código à publicação.</span>
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Sites profissionais, sistemas web e interfaces sob medida que transmitem autoridade,
              carregam rápido no celular e transformam visitantes em clientes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ boxShadow: "0 12px 28px -8px var(--color-emerald-glow)" }}
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
              <Link
                to="/projetos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Ver projetos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-7">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section aria-label="Tecnologias utilizadas" className="overflow-hidden border-y border-border bg-surface/40 py-5">
        <div className="flex w-max animate-marquee gap-4">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-4 py-1.5 font-mono text-xs text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CODE SHOWCASE */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <CodeShowcase />
        </Reveal>
      </section>

      {/* SERVICES / ESPECIALIDADES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">O que eu faço</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sistemas, sites e interfaces sob medida para o seu negócio
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Cada entrega combina design refinado, código sustentável e SEO técnico para que seu
            projeto passe credibilidade desde o primeiro clique.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <StaggerItem key={service.number}>
              <article className="card-surface flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7">
                <div>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {service.number}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">{service.audience}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8">
          <Link
            to="/habilidades"
            className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-foreground"
          >
            Explorar todas as habilidades técnicas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Portfólio</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projetos em destaque
            </h2>
          </div>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
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
                className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={project.image}
                    alt={`Prévia do projeto ${project.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="glass-pill absolute top-3 left-3 rounded-full px-3 py-1 font-mono text-[11px] text-primary">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
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
      </section>

      {/* WORK PILLARS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Como eu trabalho</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Por que contratar um desenvolvimento sob medida
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {WORK_PILLARS.map((pillar, idx) => (
            <StaggerItem key={pillar.title}>
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="font-mono text-xs text-accent">0{idx + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
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
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Dúvidas frequentes</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas sobre sites e sistemas
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="card-surface overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                >
                  <span className="font-display text-base font-medium text-foreground">
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

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Reveal>
          <div className="card-surface relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, var(--color-gold-glow), transparent 65%)",
              }}
            />
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Vamos tirar sua ideia do papel
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pronto para ter um site ou sistema no nível que o seu negócio merece?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Conte o que você precisa pelo WhatsApp ou formulário de contato. Atendimento remoto
              para todo o Brasil com retorno rápido.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                Chamar no WhatsApp
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
