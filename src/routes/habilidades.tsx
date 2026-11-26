import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionPrimitives";
import { SKILL_GROUPS, whatsappHref, type SkillGroup } from "@/data/portfolio";

export const Route = createFileRoute("/habilidades")({
  head: () => ({
    meta: [
      { title: "Habilidades Técnicas | Anne Vitória — Desenvolvedora Full Stack" },
      {
        name: "description",
        content:
          "Conheça as habilidades técnicas e interpessoais de Anne Vitória: HTML, CSS, JavaScript, React, Node.js, Python, MySQL, Excel, Word, hardware, software e comunicação ativa.",
      },
      { property: "og:title", content: "Habilidades Técnicas | Anne Vitória" },
      {
        property: "og:description",
        content:
          "Domínio de ponta a ponta: do banco de dados e APIs à interface animada e otimizada para o Google.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HabilidadesPage,
});

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnóstico & Escopo",
    text: "Entendo o objetivo do negócio, o público e quais funcionalidades realmente trazem retorno.",
  },
  {
    step: "02",
    title: "UI/UX & Prototipação",
    text: "Defino hierarquia visual, identidade, responsividade mobile e fluxos claros de navegação.",
  },
  {
    step: "03",
    title: "Engenharia Full Stack",
    text: "Codifico front-end, APIs, banco de dados e animações com tipagem segura e performance.",
  },
  {
    step: "04",
    title: "SEO, Publicação & Suporte",
    text: "Subo o projeto no ar com domínio, HTTPS, SEO técnico validado e acompanhamento próximo.",
  },
] as const;

function HabilidadesPage() {
  const [selectedId, setSelectedId] = useState<SkillGroup["id"]>(SKILL_GROUPS[0]!.id);
  const currentGroup = SKILL_GROUPS.find((g) => g.id === selectedId) ?? SKILL_GROUPS[0]!;

  return (
    <div>
      <section className="hero-petrol relative overflow-hidden py-16 md:py-20">
        <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Domínio técnico
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-hero-foreground sm:text-5xl lg:text-6xl">
              Habilidades de <span className="text-cyan-glow">ponta a ponta</span>.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-hero-muted sm:text-lg">
              Uno desenvolvimento web — HTML5, CSS3, JavaScript, TypeScript, React, Node.js,
              Python e MySQL — com domínio de Excel, Word, hardware, software e comunicação ativa
              para entregar projetos organizados e claros.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Interactive Skill Category Tabs */}
      <section>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Áreas de especialidade"
        >
          {SKILL_GROUPS.map((group) => {
            const active = group.id === currentGroup.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(group.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skill-tab-bg"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative z-10">{group.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroup.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="mt-8 grid gap-8 lg:grid-cols-12"
          >
            <div className="featured-petrol-card flex flex-col justify-between rounded-3xl p-7 lg:col-span-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
                  {currentGroup.label}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-hero-foreground sm:text-3xl">
                  {currentGroup.headline}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-hero-muted">
                  {currentGroup.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projetos"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-hero/50 px-4 py-2 text-xs font-medium text-hero-foreground transition-colors hover:border-cyan-glow hover:text-cyan-glow"
                >
                  Ver na prática
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {currentGroup.skills.map((skill, idx) => (
                <div key={skill.name} className="editorial-card rounded-2xl p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{skill.detail}</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PROCESS */}
      <section className="mt-24">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Processo</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como cada projeto sai da ideia até o ar
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <StaggerItem key={item.step}>
              <div className="editorial-card h-full rounded-2xl p-6">
                <span className="font-mono text-sm font-semibold text-primary">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Reveal className="hero-petrol mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-cyan-glow/20 p-7 sm:p-9">
        <div>
          <h2 className="font-display text-2xl font-bold text-hero-foreground">
            Precisa dessa stack trabalhando no seu projeto?
          </h2>
          <p className="mt-1.5 text-sm text-hero-muted">
            Me conte sua ideia e eu desenho a solução ideal para o seu momento.
          </p>
        </div>
        <a
          href={whatsappHref("Olá Anne! Vi suas habilidades no portfólio e quero conversar sobre um projeto.")}
          target="_blank"
          rel="noreferrer"
          className="btn-ocean inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" />
          Conversar no WhatsApp
        </a>
      </Reveal>
      </div>
    </div>
  );
}