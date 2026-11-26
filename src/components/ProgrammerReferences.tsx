import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { PROGRAMMER_REFERENCES } from "@/data/portfolio";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionPrimitives";

export function ProgrammerReferences() {
  return (
    <section className="hero-petrol relative overflow-hidden py-20" aria-labelledby="referencias-title">
      <div className="bg-cyan-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="animate-orb pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-cyan-glow/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-glow">
              Referências em 2026
            </p>
            <h2
              id="referencias-title"
              className="mt-3 font-display text-3xl font-bold text-hero-foreground sm:text-4xl"
            >
              Grandes trajetórias que inspiram a <span className="text-cyan-glow">minha jornada</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-hero-muted lg:col-span-4">
            Programadores que transformaram curiosidade, estudo e colaboração em tecnologias usadas
            no mundo inteiro.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {PROGRAMMER_REFERENCES.map((person, index) => (
            <StaggerItem key={person.name}>
              <motion.article
                whileHover={{ y: -7 }}
                transition={{ duration: 0.25 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-glow/20 bg-hero-surface/55 shadow-xl backdrop-blur-sm"
              >
                <div className="relative h-56 overflow-hidden border-b border-cyan-glow/15 bg-hero">
                  <img
                    src={person.image}
                    alt={`Foto de ${person.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center saturate-[0.82] transition duration-500 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-cyan-glow/25 bg-hero/85 px-3 py-1 font-mono text-[11px] text-cyan-glow backdrop-blur-md">
                    0{index + 1} · {person.country}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-glow">
                    {person.specialty}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-hero-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-hero-muted">
                    {person.contribution}
                  </p>

                  <div className="mt-5 rounded-2xl border border-cyan-glow/15 bg-hero/45 p-4">
                    <Quote className="h-4 w-4 text-cyan-glow" aria-hidden="true" />
                    <p className="mt-2 text-xs leading-relaxed text-hero-foreground/90">
                      {person.lesson}
                    </p>
                  </div>

                  <a
                    href={person.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-cyan-glow transition-colors hover:text-hero-foreground"
                    aria-label={`Conhecer o perfil de ${person.name} no GitHub`}
                  >
                    Conhecer trajetória
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
