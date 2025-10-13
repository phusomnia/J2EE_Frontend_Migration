import { UrlHandler } from "@/utils/Handler";
import { it } from "date-fns/locale";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const FormStore = create<any>()(
    persist(
        (set, get) => ({
            formValue: {
                Id: crypto.randomUUID(),
                Title: "",
                FirstName: "",
                LastName: "",
                Address: "",
                Phone: "",
                Email: "",
                ImageProfile: "",
                Education: [],
                Skill: [],
                Project: [],
                SocialLink: [],
            },
            setFormValue: (key: any, value: any) =>
                set((state: any) => {
                    return {
                        formValue: {
                            ...state.formValue,
                            [key]: value,
                        },
                    };
                }),
            setFormArrayValue: (
                arrayName: any,
                itemId: any,
                key: any,
                value: any
            ) => {
                set((state: any) => {
                    const setValue = state.formValue[arrayName].map(
                        (item: any) =>
                            item.Id === itemId
                                ? { ...item, [key]: value }
                                : item
                    );
                    return {
                        formValue: {
                            ...state.formValue,
                            [arrayName]: setValue,
                        },
                    };
                });
            },
            addItem: (arrayName: string, newValue: any) => {
                set((state: any) => {
                    const addValue = [
                        ...state.formValue[arrayName],
                        { Id: crypto.randomUUID(), ...newValue },
                    ];
                    if (state.formValue[arrayName]) {
                        return {
                            formValue: {
                                ...state.formValue,
                                [arrayName]: addValue,
                            },
                        };
                    }
                });
            },
            handleDeleteValue: (arrayName: string, itemId: string) => {
                set((state: any) => {
                    if (state.formValue[arrayName]) {
                        const setValue = state.formValue[arrayName].filter(
                            (item: any) => item.Id !== itemId
                        );
                        return {
                            formValue: {
                                ...state.formValue,
                                [arrayName]: setValue,
                            },
                        };
                    }
                });
            },
        }),
        {
            name: "form-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
