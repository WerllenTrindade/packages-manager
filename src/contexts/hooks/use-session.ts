
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Session {
  email: string;
  password: string
}

interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
  signOut: () => void;
}

export const useSession = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      hydrated: false,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),

      signOut: () => null
    }),
    {
      name: "@task:session",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);