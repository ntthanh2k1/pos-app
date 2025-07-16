import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  isSidebarHovered: boolean;
  setSidebarOpen: () => void;
  setSidebarHovered: (hovered: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: true,

  isSidebarHovered: false,

  setSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarHovered: (hovered: boolean) =>
    set((state) => ({ ...state, isSidebarHovered: hovered })),
}));
