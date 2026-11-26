import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Lightbulb,
  MapPin,
  MessageCircle,
  Target,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionPrimitives";
import { PROFILE, whatsappHref } from "@/data/portfolio";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Sou Eu | Anne Vitória — Desenvolvedora e Estudante de TI" },
      {
        name: "description",
        content:
          "Conheça Anne Vitória, estudante de Tecnologia da Informação em Carlos Chagas–MG, sua jornada na programação, conhecimentos e objetivos no desenvolvimento de software.",
      },
      { property: "og:title", content: "Quem Sou Eu | Anne Vitória" },
      {
        property: "og:description",
        content:
          "Curiosidade, estudo e criatividade na construção de páginas web, sistemas e uma trajetória em tecnologia.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const JOURNEY = [
  {
    icon: Lightbulb,
    title: "Curiosidade que virou propósito",
    text: "Minha jornada na programação começou pela vontade de entender como a tecnologia funciona. Hoje, transformo ideias em projetos que unem funcionalidade, organização e criatividade.",
  },
  {
    icon: Code2,
    title: "Aprendizado colocado em prática",
    text: "Tenho conhecimentos em HTML, CSS e JavaScript, além de experiência com hardware, software e ferramentas como Excel e Word. Cada novo desafio é uma oportunidade para evoluir.",
  },
  {
    icon: Target,
    title: "Construindo o próximo capítulo",
    text: "Meu objetivo é aprofundar meus conhecimentos, desenvolver soluções cada vez mais completas e construir minha trajetória na área de desenvolvimento de software.",
  },
] as const;

function SobrePage() {
  return (
    <div>
      <section className="hero-petrol relative overflow-hidden py-16 md:py-20">
        <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-cyan-glow/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">Quem sou eu</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-hero-foreground sm:text-5xl lg:text-6xl">
              Tecnologia com <span className="text-cyan-glow">curiosidade, propósito</span> e vontade de evoluir.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-hero-muted sm:text-lg">
              Uma apresentação honesta sobre quem eu sou, o que estou aprendendo e o profissional que quero construir.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Minha apresentação</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Olá! Sou Anne Vitória.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Tenho <strong className="font-semibold text-foreground">16 anos</strong>, moro em <strong className="font-semibold text-foreground">Carlos Chagas – MG</strong> e sou estudante de Tecnologia da Informação no Ensino Médio em Tempo Integral.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Minha jornada na programação começou pela curiosidade de entender como a tecnologia funciona. Hoje, transformo ideias em projetos, desenvolvendo páginas web e sistemas que unem funcionalidade, organização e criatividade.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tenho conhecimentos em HTML, CSS e JavaScript, além de experiência com hardware, software e ferramentas como Excel e Word. Gosto de aprender novas tecnologias, explorar possibilidades e enfrentar desafios que me permitem evoluir como desenvolvedora.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Meu objetivo é aprofundar meus conhecimentos, desenvolver soluções cada vez mais completas e construir minha trajetória na área de desenvolvimento de software.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                to="/projetos"
                className="btn-ocean inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                Conhecer meus projetos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref("Olá Anne! Conheci sua história no portfólio e gostaria de conversar.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                Conversar comigo
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
              <div className="space-y-4 border-t border-border p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Formação em andamento</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Tecnologia da Informação · Ensino Médio em Tempo Integral</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-border pt-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Base e atendimento</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Carlos Chagas – MG · Projetos remotos para todo o Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <section className="mt-24" aria-labelledby="jornada-title">
          <Reveal className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Minha jornada</p>
            <h2 id="jornada-title" className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Aprender hoje para criar soluções melhores amanhã
            </h2>
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {JOURNEY.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <article className="editorial-card h-full rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        <Reveal className="featured-petrol-card mt-16 flex flex-wrap items-center justify-between gap-5 rounded-3xl p-7 sm:p-9">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-glow">Em constante evolução</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-hero-foreground">
              Comprometida com cada aprendizado e com cada projeto.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-hero-muted">
              Quero ouvir sua ideia, entender sua necessidade e desenvolver uma solução com cuidado, clareza e dedicação.
            </p>
          </div>
          <Link
            to="/contato"
            className="btn-ocean inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Vamos conversar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
