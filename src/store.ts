import { create } from 'zustand'
import type { NodeType } from './data'

export type AppView = 'manuscrito' | 'grafo' | 'quadro'
export type RootView = 'landing' | 'login' | 'app'

interface AppState {
  rootView: RootView
  appView: AppView
  selectedNodeId: string | null
  hiddenTypes: Set<NodeType>
  darkMode: boolean

  goToApp: (view: AppView) => void
  goToLanding: () => void
  goToLogin: () => void
  setAppView: (view: AppView) => void
  selectNode: (id: string | null) => void
  toggleType: (type: NodeType) => void
  toggleDarkMode: () => void
}

export const useStore = create<AppState>((set) => ({
  rootView: 'landing',
  appView: 'grafo',
  selectedNodeId: null,
  hiddenTypes: new Set(),
  darkMode: localStorage.getItem('vereda-darkMode') === 'true',

  goToApp: (view) => set({ rootView: 'app', appView: view }),
  goToLanding: () => set({ rootView: 'landing', selectedNodeId: null }),
  goToLogin: () => set({ rootView: 'login' }),
  setAppView: (view) => set({ appView: view, selectedNodeId: null }),
  selectNode: (id) => set((s) => ({ selectedNodeId: s.selectedNodeId === id ? null : id })),
  toggleType: (type) =>
    set((s) => {
      const next = new Set(s.hiddenTypes)
      next.has(type) ? next.delete(type) : next.add(type)
      return { hiddenTypes: next }
    }),
  toggleDarkMode: () => set((s) => {
    const next = !s.darkMode
    localStorage.setItem('vereda-darkMode', String(next))
    return { darkMode: next }
  }),
}))
