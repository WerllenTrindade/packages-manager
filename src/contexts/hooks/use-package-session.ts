import { PackageTypes } from "@/types/package";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionPackagesState = {
  items: PackageTypes[];
  addItem: (item: PackageTypes) => void;
  setItems: (newItems: PackageTypes[]) => void;
  clear: () => void;
  cleanInvalidPackages: () => void;
  removePackage: (id: string | number) => void;
};

export const useSessionPackagesStore = create<SessionPackagesState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state;
          return { items: [item, ...state.items] };
        }),

      setItems: (newItems) => set({ items: newItems }),

      clear: () => set({ items: [] }),

      removePackage: (id) =>
        set((state) => ({
          items: state.items.filter((pkg) => pkg.id !== id),
        })),

      cleanInvalidPackages: () =>
        set((state) => ({
          items: state?.items?.filter(
            (pkg) => pkg.id !== undefined && pkg.code !== undefined
          ),
        })),
    }),
    {
      name: "session-packages-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);
