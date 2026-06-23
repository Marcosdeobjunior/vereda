import './index.css'
import { useStore } from './store'
import Landing from './components/Landing'
import AppShell from './components/AppShell'
import LoginPage from './components/LoginPage'

export default function App() {
  const rootView = useStore((s) => s.rootView)
  if (rootView === 'landing') return <Landing />
  if (rootView === 'login') return <LoginPage />
  return <AppShell />
}
