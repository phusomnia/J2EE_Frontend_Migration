export type Template = {
  id: string;
  name: string;
  component: any;
  colors?: string[];
};

export type TemplateStore = {
  selectedTemplate: {
    id: string;
  };
  setSelectedTemplateId: (id: string) => void;
  selectTemplate: (id: string) => void;
  getSelectedTemplate: () => Template | undefined;
};
