import { create } from "zustand";

interface ICategoryQuery {
  category: string;
  setCategory: (category: string) => void;
}

export const useCategoryQueryStore = create<ICategoryQuery>((set) => ({
  category: "",
  setCategory: (category) => set({ category }),
}));
