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
          "Conheça a stack completa de Anne Vitória: React, TypeScript, Node.js, Python, MySQL, PostgreSQL, UI/UX responsivo e SEO técnico.",
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
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 md:pt-18">
      <Reveal className="max-w-3xl">
        <p className="font-mono text-xs text-primary">~/habilidades</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Domínio técnico de <span className="text-primary">ponta a ponta</span>.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Atuo em todas as camadas do desenvolvimento web — do banco de dados e APIs até interfaces
          rápidas, acessíveis e desenhadas para impressionar clientes.
        </p>
      </Reveal>

      {/* Interactive Skill Category Tabs */}
      <section className="mt-14">
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
                  active ? "text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
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
            <div className="card-surface flex flex-col justify-between rounded-3xl p-7 lg:col-span-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary">
                  {currentGroup.label}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {currentGroup.headline}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {currentGroup.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projetos"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Ver na prática
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {currentGroup.skills.map((skill, idx) => (
                <div key={skill.name} className="card-surface rounded-2xl p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-xs font-medium text-primary">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{skill.detail}</p>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
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
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Processo</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como cada projeto sai da ideia até o ar
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <StaggerItem key={item.step}>
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="font-mono text-sm font-semibold text-primary">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-surface/60 p-7 sm:p-9">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Precisa dessa stack trabalhando no seu projeto?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Me conte sua ideia e eu desenho a solução ideal para o seu momento.
          </p>
        </div>
        <a
          href={whatsappHref("Olá Anne! Vi suas habilidades no portfólio e quero conversar sobre um projeto.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="h-4 w-4" />
          Conversar no WhatsApp
        </a>
      </Reveal>
    </div>
  );
}