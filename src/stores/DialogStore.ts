import { create } from "zustand";

type DialogState = {
    isOpen: boolean;
    data: any | null;
    toggleModal: () => void;
    setData: (data: any) => void;
};

export const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    data: null,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
    setData: (data) => set(() => ({ data })),
}));
