import './index.css'
import { useStore } from './store'
import Landing from './components/Landing'
import AppShell from './components/AppShell'

export default function App() {
  const rootView = useStore((s) => s.rootView)
  return rootView === 'landing' ? <Landing /> : <AppShell />
}
