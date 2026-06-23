import { create } from 'zustand'
import type { NodeType } from './data'

export type AppView = 'manuscrito' | 'grafo' | 'quadro'
export type RootView = 'landing' | 'app'

interface AppState {
  rootView: RootView
  appView: AppView
  selectedNodeId: string | null
  hiddenTypes: Set<NodeType>

  goToApp: (view: AppView) => void
  goToLanding: () => void
  setAppView: (view: AppView) => void
  selectNode: (id: string | null) => void
  toggleType: (type: NodeType) => void
}

export const useStore = create<AppState>((set) => ({
  rootView: 'landing',
  appView: 'grafo',
  selectedNodeId: null,
  hiddenTypes: new Set(),

  goToApp: (view) => set({ rootView: 'app', appView: view }),
  goToLanding: () => set({ rootView: 'landing', selectedNodeId: null }),
  setAppView: (view) => set({ appView: view, selectedNodeId: null }),
  selectNode: (id) => set((s) => ({ selectedNodeId: s.selectedNodeId === id ? null : id })),
  toggleType: (type) =>
    set((s) => {
      const next = new Set(s.hiddenTypes)
      next.has(type) ? next.delete(type) : next.add(type)
      return { hiddenTypes: next }
    }),
}))
