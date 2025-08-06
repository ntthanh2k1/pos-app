import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  isSidebarHovered: boolean;
  setSidebarOpen: () => void;
  setSidebarHovered: (hovered: boolean) => void;
  getSidebarWidth: () => string;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isSidebarOpen: true,

  isSidebarHovered: false,

  setSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarHovered: (hovered: boolean) =>
    set((state) => ({ ...state, isSidebarHovered: hovered })),

  getSidebarWidth: () => {
    const { isSidebarOpen, isSidebarHovered } = get();
    return isSidebarOpen || isSidebarHovered ? "56" : "20"; // chakra: "56" = 14rem, "20" = 5rem
  },
}));
