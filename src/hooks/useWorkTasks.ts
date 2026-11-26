import { useCallback, useEffect, useMemo, useState } from "react";
import type { TaskPriority, WorkTask } from "@/lib/adminTypes";

const STORAGE_KEY = "anne-admin-work-tasks-v1";

function isWorkTask(value: unknown): value is WorkTask {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<WorkTask>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.dueDate === "string" &&
    ["Alta", "Média", "Baixa"].includes(item.priority ?? "") &&
    (typeof item.leadId === "number" || item.leadId === null) &&
    typeof item.done === "boolean" &&
    typeof item.createdAt === "string"
  );
}

export function sortWorkTasks(tasks: WorkTask[]): WorkTask[] {
  const priorityWeight: Record<TaskPriority, number> = { Alta: 0, Média: 1, Baixa: 2 };
  return [...tasks].sort((a, b) => {
    if (a.done !== b.done) return Number(a.done) - Number(b.done);
    const aDate = a.dueDate || "9999-12-31";
    const bDate = b.dueDate || "9999-12-31";
    if (aDate !== bDate) return aDate.localeCompare(bDate);
    return priorityWeight[a.priority] - priorityWeight[b.priority];
  });
}

export function useWorkTasks() {
  const [tasks, setTasks] = useState<WorkTask[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setTasks(parsed.filter(isWorkTask));
      }
    } catch {
      setTasks([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [ready, tasks]);

  const addTask = useCallback((input: Omit<WorkTask, "id" | "done" | "createdAt">) => {
    const id =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const task: WorkTask = {
      ...input,
      id,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [...current, task]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);

  const orderedTasks = useMemo(() => sortWorkTasks(tasks), [tasks]);

  return { tasks: orderedTasks, ready, addTask, toggleTask, deleteTask };
}
