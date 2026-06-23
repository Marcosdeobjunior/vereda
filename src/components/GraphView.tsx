import { useState, useCallback, useRef } from 'react'
import { useStore } from '../store'
import { NODES, EDGES, NODE_COLORS } from '../data'
import type { NodeType, StoryNode } from '../data'

const NODE_TYPE_LABELS: Record<NodeType, string> = {
  personagem: 'Personagem', cena: 'Cena', local: 'Local', ideia: 'Ideia',
}
const LEGEND_TYPES: NodeType[] = ['personagem', 'cena', 'local', 'ideia']

function quadraticPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const offset = Math.min(len * 0.12, 30)
  const cx = mx - dy / len * offset
  const cy = my + dx / len * offset
  return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`
}

export default function GraphView() {
  const { selectedNodeId, hiddenTypes, selectNode, toggleType } = useStore()
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const getPos = (n: StoryNode) => positions[n.id] ?? { x: n.x, y: n.y }

  const neighbors = selectedNodeId
    ? new Set(EDGES.flatMap(e => e.a === selectedNodeId ? [e.b] : e.b === selectedNodeId ? [e.a] : []))
    : null

  const onMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const node = NODES.find(n => n.id === id)!
    const pos = positions[id] ?? { x: node.x, y: node.y }
    dragging.current = { id, ox: e.clientX - pos.x, oy: e.clientY - pos.y }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [positions])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return
    setPositions(prev => ({ ...prev, [dragging.current!.id]: { x: e.clientX - dragging.current!.ox, y: e.clientY - dragging.current!.oy } }))
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = null
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }, [])

  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    selectNode(id)
  }

  const selectedNode = selectedNodeId ? NODES.find(n => n.id === selectedNodeId) : null

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#EFE7D8', backgroundImage: 'radial-gradient(rgba(138,124,107,.2) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      onClick={() => selectNode(null)}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 20 }}>
        <div style={{ fontFamily: "'Newsreader',serif", fontSize: 19, fontWeight: 600, color: '#2A241D' }}>Grafo da história</div>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B', marginTop: 2 }}>{NODES.length} nós · {EDGES.length} conexões</div>
      </div>

      {/* Stage */}
      <div ref={stageRef} style={{ position: 'absolute', inset: 0, isolation: 'isolate', zIndex: 1 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {EDGES.map(edge => {
            const a = NODES.find(n => n.id === edge.a)!
            const b = NODES.find(n => n.id === edge.b)!
            const pa = getPos(a)
            const pb = getPos(b)
            const isHighlighted = selectedNodeId && (edge.a === selectedNodeId || edge.b === selectedNodeId)
            const isFaded = selectedNodeId && !isHighlighted
            const selNode = selectedNodeId ? NODES.find(n => n.id === selectedNodeId) : null
            return (
              <path key={edge.id}
                d={quadraticPath(pa.x, pa.y, pb.x, pb.y)}
                fill="none"
                stroke={isHighlighted && selNode ? NODE_COLORS[selNode.type] : '#C9BBA3'}
                strokeWidth={isHighlighted ? 2.4 : 1.4}
                opacity={isFaded ? 0.1 : isHighlighted ? 0.9 : 1}
                style={{ transition: 'opacity .25s ease, stroke .25s ease' }}
              />
            )
          })}
        </svg>

        {NODES.map(node => {
          const pos = getPos(node)
          const hidden = hiddenTypes.has(node.type)
          const isSel = node.id === selectedNodeId
          const isNeighbor = neighbors?.has(node.id)
          const isFaded = hidden || (selectedNodeId && !isSel && !isNeighbor)
          const color = NODE_COLORS[node.type]
          return (
            <div key={node.id}
              onMouseDown={e => onMouseDown(e, node.id)}
              onClick={e => handleNodeClick(e, node.id)}
              style={{
                position: 'absolute',
                left: pos.x - node.r,
                top: pos.y - node.r,
                width: node.r * 2,
                height: node.r * 2,
                borderRadius: '50%',
                background: color,
                border: '2px solid rgba(251,247,239,.7)',
                boxShadow: isSel
                  ? `0 0 0 5px ${color}33, 0 6px 20px rgba(42,36,29,.28)`
                  : '0 3px 12px rgba(42,36,29,.16)',
                cursor: 'grab',
                opacity: isFaded ? 0.3 : 1,
                transform: isSel ? 'scale(1.08)' : 'scale(1)',
                transition: 'opacity .25s ease, transform .25s ease, box-shadow .25s ease',
                zIndex: isSel ? 10 : 2,
                userSelect: 'none',
              }}>
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: 5,
                whiteSpace: 'nowrap',
                fontSize: node.r > 18 ? 14 : 12.5,
                fontWeight: 600,
                color: '#3F362B',
                fontFamily: "'Hanken Grotesk',sans-serif",
                pointerEvents: 'none',
              }}>{node.label}</div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 20, background: 'rgba(244,237,225,.88)', backdropFilter: 'blur(8px)', border: '1px solid #E2D8C6', borderRadius: 14, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LEGEND_TYPES.map(type => {
          const hidden = hiddenTypes.has(type)
          const count = NODES.filter(n => n.type === type).length
          return (
            <div key={type} onClick={() => toggleType(type)}
              style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', opacity: hidden ? 0.42 : 1, transition: 'opacity .2s' }}>
              <span style={{
                width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                background: hidden ? 'transparent' : NODE_COLORS[type],
                border: hidden ? `2px solid ${NODE_COLORS[type]}` : 'none',
              }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#574B3D', userSelect: 'none' }}>
                {NODE_TYPE_LABELS[type]}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8A7C6B', marginLeft: 2 }}>{count}</span>
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <div onClick={e => e.stopPropagation()} style={{
          position: 'absolute', right: 20, top: 20, bottom: 20, width: 302, zIndex: 30,
          background: '#F4EDE1', border: '1px solid #E2D8C6', borderRadius: 18,
          boxShadow: '0 20px 46px -16px rgba(42,36,29,.32)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid #E2D8C6' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 999,
                background: `${NODE_COLORS[selectedNode.type]}22`,
                color: NODE_COLORS[selectedNode.type],
                fontSize: 12, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace",
              }}>{NODE_TYPE_LABELS[selectedNode.type]}</span>
              <button onClick={() => selectNode(null)} style={{ background: 'none', border: 'none', fontSize: 18, color: '#8A7C6B', cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
            <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 25, color: '#2A241D', marginBottom: 10 }}>{selectedNode.label}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#574B3D' }}>{selectedNode.description}</p>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A7C6B', marginBottom: 10 }}>
              Conexões · {neighbors?.size ?? 0}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {NODES.filter(n => neighbors?.has(n.id)).map(neighbor => (
                <div key={neighbor.id} onClick={() => selectNode(neighbor.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, cursor: 'pointer', background: '#EFE7D8', transition: 'background .12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#EBE0CD')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#EFE7D8')}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: NODE_COLORS[neighbor.type], flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#2A241D' }}>{neighbor.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8A7C6B' }}>{NODE_TYPE_LABELS[neighbor.type]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid #E2D8C6' }}>
            <button style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: '1.5px solid #E2D8C6', background: 'transparent', fontSize: 13.5, fontWeight: 600, color: '#574B3D', cursor: 'pointer', transition: 'border-color .15s,color .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#B65C3F'; (e.currentTarget as HTMLElement).style.color = '#B65C3F' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2D8C6'; (e.currentTarget as HTMLElement).style.color = '#574B3D' }}>
              Abrir no manuscrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
