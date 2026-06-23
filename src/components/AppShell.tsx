import { useState } from 'react'
import { useStore } from '../store'
import type { AppView } from '../store'
import { NODES, NODE_COLORS } from '../data'
import type { NodeType } from '../data'
import Logo from './Logo'
import GraphView from './GraphView'
import ManuscriptView from './ManuscriptView'
import BoardView from './BoardView'

const NODE_LABELS: Record<NodeType, string> = { personagem: 'Personagens', cena: 'Cenas', local: 'Locais', ideia: 'Notas' }

function SidebarGroup({ title, count, items, onSelect }: { title: string; count: number; items: { id: string; label: string; type: NodeType }[]; onSelect: (id: string) => void }) {
  const selectedNodeId = useStore(s => s.selectedNodeId)
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A7C6B', padding: '10px 18px 5px', display: 'flex', justifyContent: 'space-between' }}>
        <span>{title}</span><span>{count}</span>
      </div>
      {items.map(item => {
        const sel = item.id === selectedNodeId
        return (
          <div key={item.id} onClick={() => onSelect(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 18px', cursor: 'pointer', borderRadius: 8, margin: '0 8px', background: sel ? '#EBE0CD' : 'transparent', color: sel ? '#2A241D' : '#574B3D', fontWeight: sel ? 600 : 400, transition: 'background .12s' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: NODE_COLORS[item.type], flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14 }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function AppShell() {
  const { appView, setAppView, goToLanding, selectNode } = useStore()
  const [search, setSearch] = useState('')

  const tabs: { label: string; view: AppView }[] = [
    { label: 'Manuscrito', view: 'manuscrito' },
    { label: 'Grafo', view: 'grafo' },
    { label: 'Quadro', view: 'quadro' },
  ]

  const byType = (type: NodeType) => NODES.filter(n => n.type === type && (!search || n.label.toLowerCase().includes(search.toLowerCase())))

  const handleSidebarSelect = (id: string) => {
    setAppView('grafo')
    setTimeout(() => selectNode(id), 50)
  }

  return (
    <div style={{ height: '100vh', minHeight: 760, display: 'flex', flexDirection: 'column', background: '#EFE7D8', overflow: 'hidden' }}>
      {/* TOPBAR */}
      <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', background: '#F4EDE1', borderBottom: '1px solid #E2D8C6' }}>
        <Logo size={22} />
        <div style={{ width: 1, height: 22, background: '#E2D8C6' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14.5, fontWeight: 600, color: '#3F362B', cursor: 'pointer', padding: '6px 10px', borderRadius: 9, whiteSpace: 'nowrap', flexShrink: 0 }}>
          A Casa de Barro <span style={{ color: '#A89A86', fontSize: 11 }}>▾</span>
        </div>
        {/* Tabs */}
        <div style={{ margin: '0 auto', display: 'flex', gap: 4, background: '#EBE0CD', padding: 4, borderRadius: 12 }}>
          {tabs.map(t => (
            <button key={t.view} onClick={() => setAppView(t.view)}
              style={{ fontSize: 13.5, fontWeight: 500, padding: '7px 17px', borderRadius: 9, border: 'none', cursor: 'pointer', transition: 'background .15s,color .15s', background: appView === t.view ? '#2A241D' : 'transparent', color: appView === t.view ? '#F4EDE1' : '#6B5F50' }}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Word count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EFE7D8', border: '1px solid #E2D8C6', padding: '5px 11px', borderRadius: 10 }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#574B3D' }}>32.480 / 90.000</span>
          <span style={{ width: 54, height: 5, borderRadius: 3, background: '#DCCFBA', display: 'inline-block', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '36%', background: '#6E7350', borderRadius: 3 }} />
          </span>
        </div>
        <span style={{ width: 33, height: 33, borderRadius: '50%', background: '#B65C3F', color: '#F4EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>JM</span>
        <button onClick={goToLanding}
          style={{ fontSize: 13.5, fontWeight: 500, color: '#574B3D', background: 'transparent', border: '1px solid #E2D8C6', padding: '7px 13px', borderRadius: 9, cursor: 'pointer', flexShrink: 0, transition: 'border-color .15s,color .15s' }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#B65C3F'; (e.target as HTMLElement).style.color = '#B65C3F' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#E2D8C6'; (e.target as HTMLElement).style.color = '#574B3D' }}>
          Ver site
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* SIDEBAR */}
        <aside style={{ width: 268, flexShrink: 0, background: '#F4EDE1', borderRight: '1px solid #E2D8C6', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '18px 18px 12px' }}>
            <div style={{ fontFamily: "'Newsreader',serif", fontSize: 20, fontWeight: 600, color: '#2A241D', lineHeight: 1.2 }}>A Casa de Barro</div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8A7C6B', marginTop: 4 }}>romance · 6 capítulos</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: '#EFE7D8', border: '1px solid #E2D8C6', borderRadius: 10, padding: '8px 11px' }}>
              <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="#A89A86" strokeWidth="1.6" /><line x1="10.6" y1="10.6" x2="14" y2="14" stroke="#A89A86" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar no livro…"
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13.5, color: '#574B3D', width: '100%', fontFamily: "'Hanken Grotesk',sans-serif' " }} />
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
          <div style={{ padding: '12px 18px', borderTop: '1px solid #E2D8C6', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#B65C3F', color: '#F4EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 600, flexShrink: 0 }}>JM</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2A241D' }}>Joana M.</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, color: '#8A7C6B' }}>Plano Autor</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ cursor: 'pointer', color: '#8A7C6B' }}><circle cx="12" cy="12" r="3" fill="none" stroke="#8A7C6B" strokeWidth="1.8" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#8A7C6B" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, background: '#EFE7D8', position: 'relative', overflow: 'hidden' }}>
          {appView === 'grafo' && <GraphView />}
          {appView === 'manuscrito' && <ManuscriptView />}
          {appView === 'quadro' && <BoardView />}
        </main>
      </div>
    </div>
  )
}
