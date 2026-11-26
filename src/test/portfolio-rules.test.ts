import { describe, expect, it } from "vitest";
import { PROGRAMMER_REFERENCES, SKILL_GROUPS } from "@/data/portfolio";
import { sortWorkTasks } from "@/hooks/useWorkTasks";
import type { WorkTask } from "@/lib/adminTypes";

describe("Portfolio content rules", () => {
  it("includes 3 real programmer references for 2026", () => {
    expect(PROGRAMMER_REFERENCES).toHaveLength(3);
    expect(PROGRAMMER_REFERENCES.map((r) => r.name)).toEqual([
      "Linus Torvalds",
      "Evan You",
      "José Valim",
    ]);
  });

  it("includes Excel and Comunicação ativa in skills", () => {
    const allSkillNames = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.name));
    expect(allSkillNames).toContain("Excel");
    expect(allSkillNames).toContain("Comunicação ativa");
  });

  it("sorts pending tasks before done tasks, then by due date and priority", () => {
    const tasks: WorkTask[] = [
      { id: "1", title: "Concluída", dueDate: "2026-11-20", priority: "Alta", leadId: null, done: true, createdAt: "2026-11-01" },
      { id: "2", title: "Baixa hoje", dueDate: "2026-11-26", priority: "Baixa", leadId: null, done: false, createdAt: "2026-11-01" },
      { id: "3", title: "Alta hoje", dueDate: "2026-11-26", priority: "Alta", leadId: null, done: false, createdAt: "2026-11-01" },
      { id: "4", title: "Sem prazo", dueDate: "", priority: "Alta", leadId: null, done: false, createdAt: "2026-11-01" },
    ];
    const sorted = sortWorkTasks(tasks);
    expect(sorted.map((t) => t.id)).toEqual(["3", "2", "4", "1"]);
  });
});