// src/store/useSessionPackagesStore.ts
import { create } from "zustand";

export type SessionPackage = {
  id: string;
  name?: string;
  gtin?: string;
  createdAt: string;
};

type SessionPackagesState = {
  items: SessionPackage[];
  addItem: (item: SessionPackage) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useSessionPackagesStore = create<SessionPackagesState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === item.id);
      if (exists) return state;
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));
