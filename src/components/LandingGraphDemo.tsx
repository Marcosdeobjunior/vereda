import { useEffect, useRef, useState } from 'react'

const DEMO_NODES = [
  { id: 'casa', label: 'A Casa', type: 'local', color: '#6E7350', x: 250, y: 170, r: 22, desc: 'A casa de barro centenária. Centro gravitacional de toda a narrativa.' },
  { id: 'joana', label: 'Joana', type: 'personagem', color: '#B65C3F', x: 250, y: 260, r: 17, desc: 'Protagonista. Filha do dono da fazenda, carrega o peso do silêncio familiar.' },
  { id: 'ines', label: 'Inês', type: 'personagem', color: '#B65C3F', x: 148, y: 90, r: 13, desc: 'Irmã mais nova de Joana. Sonha em partir para a cidade.' },
  { id: 'acude', label: 'Açude', type: 'local', color: '#6E7350', x: 380, y: 110, r: 15, desc: 'O açude está secando. Sua diminuição espelha o colapso familiar.' },
  { id: 'aurora', label: 'Aurora', type: 'personagem', color: '#B65C3F', x: 340, y: 268, r: 15, desc: 'Matriarca da família. Guarda segredos sobre o passado do açude.' },
  { id: 'seca', label: 'A Seca', type: 'cena', color: '#C2924A', x: 110, y: 218, r: 13, desc: 'Cena de abertura. Joana observa o açude baixar pela primeira vez.' },
  { id: 'memoria', label: 'Memória', type: 'ideia', color: '#5F7470', x: 432, y: 218, r: 12, desc: 'Tema central: o que herdamos sem escolher, o que esquecemos sem querer.' },
]

const DEMO_EDGES = [
  { a: 'casa', b: 'joana' }, { a: 'casa', b: 'ines' }, { a: 'casa', b: 'acude' },
  { a: 'joana', b: 'aurora' }, { a: 'joana', b: 'seca' }, { a: 'acude', b: 'seca' },
  { a: 'acude', b: 'aurora' }, { a: 'ines', b: 'seca' }, { a: 'aurora', b: 'memoria' },
]

const TYPE_LABELS: Record<string, string> = { personagem: 'Personagem', cena: 'Cena', local: 'Local', ideia: 'Ideia' }

/* Sequência visitada pelo cursor autoplay, em looping */
const AUTOPLAY_SEQUENCE = ['casa', 'acude', 'aurora', 'joana', 'seca', 'ines', 'memoria']

interface LandingGraphDemoProps {
  /** Quando true, roda uma animação automática em loop (cursor "fantasma" clicando nos nós), sem depender de interação do usuário. */
  autoplay?: boolean
}

export default function LandingGraphDemo({ autoplay = false }: LandingGraphDemoProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [cursor, setCursor] = useState<{ x: number; y: number; clicking: boolean }>({ x: 250, y: 170, clicking: false })
  const stepRef = useRef(0)

  useEffect(() => {
    if (!autoplay) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => { const t = setTimeout(() => { if (!cancelled) fn() }, ms); timers.push(t) }

    const tick = () => {
      const node = DEMO_NODES.find(n => n.id === AUTOPLAY_SEQUENCE[stepRef.current % AUTOPLAY_SEQUENCE.length])!
      setCursor({ x: node.x, y: node.y, clicking: false })
      setSelected(null)
      schedule(() => {
        setCursor(c => ({ ...c, clicking: true }))
        setSelected(node.id)
      }, 750)
      schedule(() => {
        setCursor(c => ({ ...c, clicking: false }))
      }, 950)
      schedule(() => {
        stepRef.current += 1
        tick()
      }, 3200)
    }
    tick()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [autoplay])

  const sel = DEMO_NODES.find(n => n.id === selected)
  const neighbors = selected
    ? new Set(DEMO_EDGES.flatMap(e => e.a === selected ? [e.b] : e.b === selected ? [e.a] : []))
    : null

  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100%', minHeight: autoplay ? undefined : 392,
        background: '#F4EDE1', backgroundImage: 'radial-gradient(rgba(138,124,107,.2) 1px, transparent 1px)', backgroundSize: '26px 26px',
        overflow: 'hidden', pointerEvents: autoplay ? 'none' : 'auto',
      }}
      onClick={autoplay ? undefined : () => setSelected(null)}>

      {/* Hint */}
      {!autoplay && !selected && (
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#A89A86', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          Clique num nó para explorar
        </div>
      )}

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 540 392" preserveAspectRatio="xMidYMid meet">
        {DEMO_EDGES.map((e, i) => {
          const a = DEMO_NODES.find(n => n.id === e.a)!
          const b = DEMO_NODES.find(n => n.id === e.b)!
          const isHighlighted = selected && (e.a === selected || e.b === selected)
          const isFaded = selected && !isHighlighted
          const selNode = sel
          return (
            <line key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isHighlighted && selNode ? selNode.color : '#C9BBA3'}
              strokeWidth={isHighlighted ? 2.2 : 1.5}
              opacity={isFaded ? 0.1 : isHighlighted ? 0.85 : 1}
              style={{ transition: 'opacity .25s,stroke .25s' }}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {DEMO_NODES.map(node => {
        const isSel = node.id === selected
        const isNeighbor = neighbors?.has(node.id)
        const isFaded = selected && !isSel && !isNeighbor
        return (
          <div key={node.id} onClick={autoplay ? undefined : e => { e.stopPropagation(); setSelected(isSel ? null : node.id) }}
            style={{
              position: 'absolute',
              left: `${(node.x / 540) * 100}%`,
              top: `${(node.y / 392) * 100}%`,
              transform: `translate(-50%, -50%) scale(${isSel ? 1.12 : 1})`,
              width: node.r * 2, height: node.r * 2,
              borderRadius: '50%',
              background: node.color,
              border: '2.5px solid rgba(251,247,239,.8)',
              boxShadow: isSel
                ? `0 0 0 5px ${node.color}33, 0 6px 20px rgba(42,36,29,.2)`
                : '0 3px 10px rgba(42,36,29,.14)',
              cursor: autoplay ? 'default' : 'pointer',
              opacity: isFaded ? 0.25 : 1,
              transition: 'opacity .25s, transform .25s, box-shadow .25s',
              zIndex: isSel ? 10 : 2,
            }}>
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              marginTop: 5, whiteSpace: 'nowrap', fontSize: node.r > 16 ? 12.5 : 11,
              fontWeight: 600, color: isSel ? node.color : '#3F362B',
              fontFamily: "'Hanken Grotesk',sans-serif",
              pointerEvents: 'none', transition: 'color .2s',
            }}>{node.label}</div>
          </div>
        )
      })}

      {/* Cursor fantasma do autoplay */}
      {autoplay && (
        <div style={{
          position: 'absolute',
          left: `${(cursor.x / 540) * 100}%`,
          top: `${(cursor.y / 392) * 100}%`,
          transform: `translate(-8%, -12%) scale(${cursor.clicking ? 0.88 : 1})`,
          transition: 'left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1), transform .15s ease',
          zIndex: 30, pointerEvents: 'none',
        }}>
          {cursor.clicking && (
            <span style={{
              position: 'absolute', left: 2, top: 2, width: 16, height: 16, borderRadius: '50%',
              border: '2px solid #B65C3F', opacity: 0, animation: 'vereda-cursor-ping .6s ease-out',
            }} />
          )}
          <svg width="22" height="22" viewBox="0 0 22 22" style={{ filter: 'drop-shadow(0 2px 5px rgba(42,36,29,.35))' }}>
            <path d="M3 2 L3 17 L7.2 13.2 L10 19.5 L12.6 18.3 L9.8 12 L15 12 Z" fill="#2A241D" stroke="#FBF7EF" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Info card — abre ao lado direito */}
      {sel && (
        <div onClick={autoplay ? undefined : e => e.stopPropagation()}
          style={{
            position: 'absolute', top: '50%', right: autoplay ? '4%' : 14, transform: 'translateY(-50%)',
            background: 'rgba(251,247,239,.97)', backdropFilter: 'blur(8px)',
            border: '1px solid #E2D8C6', borderRadius: 14,
            padding: '14px 16px', maxWidth: 200,
            boxShadow: '0 8px 24px rgba(42,36,29,.16)',
            zIndex: 20, animation: 'vereda-card-in .28s ease-out',
          }}>
          <div style={{
            display: 'inline-flex', padding: '3px 9px', borderRadius: 999, marginBottom: 8,
            background: `${sel.color}18`, color: sel.color,
            fontSize: 11.5, fontWeight: 600, fontFamily: "'IBM Plex Mono',monospace",
          }}>{TYPE_LABELS[sel.type]}</div>
          <div style={{ fontFamily: "'Newsreader',serif", fontSize: 17, fontWeight: 600, color: '#2A241D', marginBottom: 5 }}>{sel.label}</div>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: '#574B3D' }}>{sel.desc}</p>
          {neighbors && neighbors.size > 0 && (
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #EBE0CD' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#A89A86', marginBottom: 5, letterSpacing: '.08em' }}>CONECTADO A</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {DEMO_NODES.filter(n => neighbors.has(n.id)).map(n => (
                  <span key={n.id} onClick={autoplay ? undefined : () => setSelected(n.id)}
                    style={{ fontSize: 12, fontWeight: 500, color: n.color, cursor: autoplay ? 'default' : 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                    {n.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes vereda-cursor-ping { from { opacity: .8; transform: scale(.4); } to { opacity: 0; transform: scale(2.2); } }
        @keyframes vereda-card-in { from { opacity: 0; transform: translateY(-50%) translateX(8px); } to { opacity: 1; transform: translateY(-50%) translateX(0); } }
      `}</style>
    </div>
  )
}
