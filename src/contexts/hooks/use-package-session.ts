
import { PackageTypes } from "@/types/package";
import { create } from "zustand";




type SessionPackagesState = {
  items: PackageTypes[];
  addItem: (item: PackageTypes) => void;
};

export const useSessionPackagesStore = create<SessionPackagesState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === item.id);
      if (exists) return state;

      return { items: [item, ...state.items] };
    }),
  clear: () => set({ items: [] }),
}));