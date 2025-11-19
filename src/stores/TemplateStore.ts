import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import TemplateA from "@/components/templates/TemplateA";
import TemplateDefault from "@/components/templates/TemplateDefault";
import type { Template, TemplateStore } from "./types";

const templates: Template[] = [
  {
    id: "ddb2b358-0ec3-4c6b-bfe6-df64d1ba87cf",
    name: "Template A",
    component: TemplateA,
    colors: ["#3b82f6", "#22c55e", "#f59e42"],
  },
  {
    id: "9fd4dffd-3a63-4383-937d-bdd61ae09e82",
    name: "Template Default",
    component: TemplateDefault, // can't render in localstorage
    colors: ["#3b82f6", "#22c55e", "#f59e42"],
  },
];

const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      selectedTemplate: {
        id: "",
      },
      setSelectedTemplateId: (id: string) => set({ selectedTemplate: { id } }),

      selectTemplate: (id: string) => {
        const template = templates.find((t) => t.id === id);
        if (template) {
          set({ selectedTemplate: { id } });
        }
      },

      getSelectedTemplate: () => {
        const state: any = get();
        if (!state.selectedTemplate.id) return undefined;
        return templates.find((t) => t.id === state.selectedTemplate.id);
      },
    }),
    {
      name: "template-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useTemplateStore, templates };
