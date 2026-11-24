import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CODE_SNIPPETS } from "@/data/portfolio";

export function CodeShowcase() {
  const [activeId, setActiveId] = useState<string>(CODE_SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const current = CODE_SNIPPETS.find((s) => s.id === activeId) ?? CODE_SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      toast.success("Trecho copiado para a área de transferência");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Não foi possível copiar o trecho");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="hero-petrol overflow-hidden rounded-3xl border border-cyan-glow/20 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-glow/15 bg-hero/60 px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Linguagens de código">
            {CODE_SNIPPETS.map((snippet) => {
              const active = snippet.id === current.id;
              return (
                <button
                  key={snippet.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(snippet.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active ? "text-hero" : "text-hero-muted hover:text-hero-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="code-tab-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-cyan-glow"
                    />
                  )}
                  <span className="relative z-10">{snippet.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-hero-muted sm:inline">
              {current.filename}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/25 bg-hero-surface/70 px-3 py-1 text-xs font-medium text-hero-foreground transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-mint" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto bg-hero/75 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.pre
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="font-mono text-xs leading-relaxed text-hero-foreground/90 sm:text-sm"
            >
              <code>{current.code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
        Trecho real da engenharia aplicada neste portfólio
      </p>
    </div>
  );
}