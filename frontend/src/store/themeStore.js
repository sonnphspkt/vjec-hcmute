import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'dark',
      setMode: (mode) => {
        applyTheme(mode);
        set({ mode });
      },
      toggle: () => {
        const next = get().mode === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        set({ mode: next });
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state?.mode) applyTheme(state.mode);
      },
    }
  )
);

export default useThemeStore;
export { applyTheme };
