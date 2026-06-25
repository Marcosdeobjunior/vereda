import { useState, useEffect } from 'react'
import { useStore } from '../store'
import { NODES, NODE_COLORS } from '../data'
import type { NodeType } from '../data'
import type { AppView } from '../store'
import Logo from './Logo'
import GraphView from './GraphView'
import ManuscriptView from './ManuscriptView'
import BoardView from './BoardView'

const NODE_LABELS: Record<NodeType, string> = { personagem: 'Personagens', cena: 'Cenas', local: 'Locais', ideia: 'Notas' }

function SidebarGroup({ title, count, items, onSelect }: {
  title: string; count: number
  items: { id: string; label: string; type: NodeType }[]
  onSelect: (id: string) => void
}) {
  const selectedNodeId = useStore(s => s.selectedNodeId)
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', padding: '10px 18px 5px', display: 'flex', justifyContent: 'space-between' }}>
        <span>{title}</span><span>{count}</span>
      </div>
      {items.map(item => {
        const sel = item.id === selectedNodeId
        return (
          <div key={item.id} onClick={() => onSelect(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 18px', cursor: 'pointer', borderRadius: 8, margin: '0 8px', background: sel ? 'var(--paper-4)' : 'transparent', color: sel ? 'var(--ink)' : 'var(--text-soft)', fontWeight: sel ? 600 : 400, transition: 'background .12s' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: NODE_COLORS[item.type], flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14 }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function DarkToggle() {
  const { darkMode, toggleDarkMode } = useStore()
  return (
    <button onClick={toggleDarkMode} title={darkMode ? 'Modo claro' : 'Modo noturno'}
      style={{ background: 'var(--paper-4)', border: '1px solid var(--line)', borderRadius: 9, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background .2s', flexShrink: 0 }}>
      {darkMode ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="var(--ochre)" strokeWidth="2" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--ochre)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span style={{ fontSize: 12.5, fontWeight: 500, color: darkMode ? 'var(--ochre)' : 'var(--muted)' }}>
        {darkMode ? 'Claro' : 'Noturno'}
      </span>
    </button>
  )
}

export default function AppShell() {
  const { appView, setAppView, goToLanding, selectNode, darkMode } = useStore()
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark-app', darkMode)
    return () => { document.documentElement.classList.remove('dark-app') }
  }, [darkMode])

  const tabs: { label: string; view: AppView }[] = [
    { label: 'Manuscrito', view: 'manuscrito' },
    { label: 'Grafo', view: 'grafo' },
    { label: 'Quadro', view: 'quadro' },
  ]

  const byType = (type: NodeType) =>
    NODES.filter(n => n.type === type && (!search || n.label.toLowerCase().includes(search.toLowerCase())))

  const handleSidebarSelect = (id: string) => {
    setAppView('grafo')
    setTimeout(() => selectNode(id), 50)
  }

  return (
    <div style={{ height: '100vh', minHeight: 760, display: 'flex', flexDirection: 'column', background: 'var(--paper-2)', overflow: 'hidden', transition: 'background .25s, color .25s' }}>

      {/* TOPBAR */}
      <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', background: 'var(--paper)', borderBottom: '1px solid var(--line)', transition: 'background .25s' }}>
        <Logo size={22} nameColor="var(--ink)" />
        <div style={{ width: 1, height: 22, background: 'var(--line)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14.5, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer', padding: '6px 10px', borderRadius: 9, whiteSpace: 'nowrap', flexShrink: 0 }}>
          A Casa de Barro <span style={{ color: 'var(--muted)', fontSize: 11 }}>▾</span>
        </div>

        {/* Tabs */}
        <div style={{ margin: '0 auto', display: 'flex', gap: 4, background: 'var(--paper-4)', padding: 4, borderRadius: 12 }}>
          {tabs.map(t => (
            <button key={t.view} onClick={() => setAppView(t.view)}
              style={{ fontSize: 13.5, fontWeight: 500, padding: '7px 17px', borderRadius: 9, border: 'none', cursor: 'pointer', transition: 'background .15s,color .15s', background: appView === t.view ? 'var(--ink)' : 'transparent', color: appView === t.view ? 'var(--paper)' : 'var(--muted)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Word count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--paper-2)', border: '1px solid var(--line)', padding: '5px 11px', borderRadius: 10 }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: 'var(--text-soft)' }}>32.480 / 90.000</span>
          <span style={{ width: 54, height: 5, borderRadius: 3, background: 'var(--line)', display: 'inline-block', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '36%', background: 'var(--moss)', borderRadius: 3 }} />
          </span>
        </div>

        <DarkToggle />

        <span style={{ width: 33, height: 33, borderRadius: '50%', background: 'var(--terracotta)', color: '#F4EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>JM</span>

      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* SIDEBAR */}
        <aside style={{ width: 268, flexShrink: 0, background: 'var(--paper)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'background .25s' }}>
          <div style={{ padding: '18px 18px 12px' }}>
            <div style={{ fontFamily: "'Newsreader',serif", fontSize: 20, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>A Casa de Barro</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>romance · 6 capítulos</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 11px' }}>
              <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="var(--muted)" strokeWidth="1.6" /><line x1="10.6" y1="10.6" x2="14" y2="14" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar no livro…"
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13.5, color: 'var(--text-soft)', width: '100%', fontFamily: "'Hanken Grotesk',sans-serif" }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 12 }}>
            {(['personagem', 'cena', 'local', 'ideia'] as NodeType[]).map(type => {
              const items = byType(type)
              if (items.length === 0) return null
              return <SidebarGroup key={type} title={NODE_LABELS[type]} count={items.length} items={items} onSelect={handleSidebarSelect} />
            })}
          </div>

          {/* Sidebar footer */}
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--terracotta)', color: '#F4EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 600, flexShrink: 0 }}>JM</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Joana M.</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, color: 'var(--muted)' }}>Plano Autor</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ cursor: 'pointer' }}><circle cx="12" cy="12" r="3" fill="none" stroke="var(--muted)" strokeWidth="1.8" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, background: 'var(--paper-2)', position: 'relative', overflow: 'hidden', transition: 'background .25s' }}>
          {appView === 'grafo' && <GraphView />}
          {appView === 'manuscrito' && <ManuscriptView />}
          {appView === 'quadro' && <BoardView />}
        </main>
      </div>
    </div>
  )
}
