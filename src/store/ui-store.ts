import { create } from "zustand";

interface UIState {
  menuOpen: boolean;
  introDone: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;
  setIntroDone: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  introDone: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  setIntroDone: (v) => set({ introDone: v }),
}));
