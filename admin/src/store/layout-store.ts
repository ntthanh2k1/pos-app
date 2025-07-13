import { create } from "zustand";

interface LayoutState {
  isSidebarOpen: boolean;
  isSidebarHovered: boolean;
  toggleSidebar: () => void;
  setSidebarHovered: (hovered: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: true,
  isSidebarHovered: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarHovered: (hovered) => set({ isSidebarHovered: hovered }),
}));
