import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, CheckCircle2, Circle, ListChecks, Plus, Trash2, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import type { DbLead, TaskPriority, WorkTask } from "@/lib/adminTypes";

interface WorkOrganizationProps {
  tasks: WorkTask[];
  ready: boolean;
  leads: DbLead[];
  onAdd: (input: Omit<WorkTask, "id" | "done" | "createdAt">) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

type TaskFilter = "pendentes" | "concluidas" | "todas";

export function WorkOrganization({ tasks, ready, leads, onAdd, onToggle, onDelete }: WorkOrganizationProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Média");
  const [leadId, setLeadId] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("pendentes");

  const visibleTasks = tasks.filter((task) => {
    if (filter === "pendentes") return !task.done;
    if (filter === "concluidas") return task.done;
    return true;
  });
  const pendingCount = tasks.filter((task) => !task.done).length;
  const doneCount = tasks.length - pendingCount;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      toast.error("Digite o nome da tarefa.");
      return;
    }
    onAdd({
      title: cleanTitle,
      dueDate,
      priority,
      leadId: leadId ? Number(leadId) : null,
    });
    setTitle("");
    setDueDate("");
    setPriority("Média");
    setLeadId("");
    setFilter("pendentes");
    toast.success("Tarefa adicionada à sua organização.");
  };

  const formatDate = (value: string) => {
    if (!value) return "Sem prazo";
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return value;
    return new Intl.DateTimeFormat("pt-BR").format(new Date(year, month - 1, day));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <form onSubmit={handleSubmit} noValidate className="editorial-card h-fit rounded-3xl p-6 xl:col-span-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <ListChecks className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-foreground">Nova tarefa</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Organize estudos, projetos e retornos para clientes em um só lugar.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="task-title" className="text-xs font-semibold text-foreground">Tarefa *</label>
            <input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={120}
              placeholder="Ex.: Revisar proposta do site"
              className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <div>
              <label htmlFor="task-date" className="text-xs font-semibold text-foreground">Prazo</label>
              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="task-priority" className="text-xs font-semibold text-foreground">Prioridade</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value as TaskPriority)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="task-lead" className="text-xs font-semibold text-foreground">Vincular a um contato</label>
            <select
              id="task-lead"
              value={leadId}
              onChange={(event) => setLeadId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Nenhum contato</option>
              {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.nome}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-ocean inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Adicionar tarefa
          </button>
        </div>
        <p className="mt-5 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
          Suas tarefas pessoais ficam salvas neste navegador. Projetos e mensagens continuam salvos no banco de dados.
        </p>
      </form>

      <section className="editorial-card rounded-3xl p-6 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Minha rotina</p>
            <h2 className="mt-1 font-display text-xl font-bold text-foreground">Tarefas e compromissos</h2>
            <p className="mt-1 text-xs text-muted-foreground">{pendingCount} pendente(s) · {doneCount} concluída(s)</p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-background p-1" role="group" aria-label="Filtrar tarefas">
            {(["pendentes", "concluidas", "todas"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition-colors ${filter === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item === "concluidas" ? "Concluídas" : item}
              </button>
            ))}
          </div>
        </div>

        {!ready ? (
          <p className="mt-8 text-sm text-muted-foreground">Carregando suas tarefas...</p>
        ) : visibleTasks.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/60 px-5 py-12 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 text-sm font-semibold text-foreground">
              {tasks.length === 0 ? "Sua organização começa aqui" : "Nenhuma tarefa neste filtro"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {tasks.length === 0 ? "Adicione sua primeira tarefa ao lado para montar sua rotina." : "Escolha outro filtro para visualizar as demais tarefas."}
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            <AnimatePresence initial={false}>
              {visibleTasks.map((task) => {
                const linkedLead = leads.find((lead) => lead.id === task.leadId);
                return (
                  <motion.li
                    layout
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className={`rounded-2xl border p-4 ${task.done ? "border-border bg-muted/45" : "border-border bg-background/65"}`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => onToggle(task.id)}
                        aria-label={task.done ? `Reabrir tarefa ${task.title}` : `Concluir tarefa ${task.title}`}
                        className={`mt-0.5 shrink-0 ${task.done ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {task.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-semibold ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(task.dueDate)}</span>
                          <span className={`rounded-full px-2 py-0.5 font-semibold ${task.priority === "Alta" ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"}`}>Prioridade {task.priority.toLowerCase()}</span>
                          {linkedLead && <span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{linkedLead.nome}</span>}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        aria-label={`Excluir tarefa ${task.title}`}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {task.done && <span className="mt-2 inline-flex items-center gap-1 pl-8 text-[10px] font-medium text-primary"><Check className="h-3 w-3" />Concluída</span>}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}
