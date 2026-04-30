// src/stores/ui.store.ts
import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  activeBottomTab: string;
  theme: "light" | "dark";
  language: string;

  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setActiveBottomTab: (tab: string) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (lang: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  activeBottomTab: "home",
  theme: "light",
  language: "en",

  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  setMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),
  setActiveBottomTab: (tab: string) => set({ activeBottomTab: tab }),
  setTheme: (theme: "light" | "dark") => set({ theme }),
  setLanguage: (language: string) => set({ language }),
}));