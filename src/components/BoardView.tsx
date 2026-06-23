import { useState } from 'react'
import { CHAPTERS, STATUS_COLORS } from '../data'
import type { Status } from '../data'

const ACTS = [
  { num: 1, label: 'Ato I — A Seca' },
  { num: 2, label: 'Ato II — O Conflito' },
  { num: 3, label: 'Ato III — A Chuva' },
]

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII']

function SceneCard({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: '#FBF7EF', border: '1px solid #E7DDCB', borderRadius: 12, padding: 14,
        boxShadow: hov ? '0 6px 18px rgba(42,36,29,.12)' : '0 2px 6px rgba(42,36,29,.06)',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'transform .15s,box-shadow .15s', cursor: 'pointer',
      }}>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#B65C3F', marginBottom: 6 }}>{ROMAN[index]}</div>
      <div style={{ fontFamily: "'Newsreader',serif", fontSize: 18, fontWeight: 600, color: '#2A241D', marginBottom: 6, lineHeight: 1.2 }}>{chapter.title}</div>
      <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#574B3D', marginBottom: 12 }}>{chapter.synopsis}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {chapter.pov && (
          <span style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(182,92,63,.12)', color: '#9E4A30', fontSize: 12, fontWeight: 500 }}>
            POV: {chapter.pov}
          </span>
        )}
        <span style={{ padding: '3px 9px', borderRadius: 999, background: `${STATUS_COLORS[chapter.status as Status]}18`, color: STATUS_COLORS[chapter.status as Status], fontSize: 12, fontWeight: 500 }}>
          {chapter.status}
        </span>
        {chapter.wordCount > 0 && (
          <span style={{ padding: '3px 9px', borderRadius: 999, background: '#EFE7D8', color: '#8A7C6B', fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
            {chapter.wordCount.toLocaleString()} p
          </span>
        )}
      </div>
    </div>
  )
}

export default function BoardView() {
  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', height: '100%', padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 26, color: '#2A241D' }}>Quadro de cenas</h2>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B', marginTop: 4 }}>
          A Casa de Barro · 3 atos · {CHAPTERS.length} cenas
        </div>
      </div>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', minWidth: 'max-content' }}>
        {ACTS.map(act => {
          const scenes = CHAPTERS.filter(c => c.act === act.num)
          return (
            <div key={act.num} style={{ width: 322, background: '#E8DEC9', border: '1px solid #DDD0BA', borderRadius: 16, padding: 13, flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 17, color: '#2A241D' }}>{act.label}</div>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#8A7C6B', background: '#D5C9B3', borderRadius: 6, padding: '2px 7px' }}>{scenes.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {scenes.map((c, i) => <SceneCard key={c.id} chapter={c} index={i} />)}
              </div>
              <button style={{
                marginTop: 10, width: '100%', padding: '10px 0', borderRadius: 10, border: '1.5px dashed #C9B79A',
                background: 'transparent', fontSize: 13.5, color: '#8A7C6B', cursor: 'pointer', transition: 'border-color .15s,color .15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#B65C3F'; (e.currentTarget as HTMLElement).style.color = '#B65C3F' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9B79A'; (e.currentTarget as HTMLElement).style.color = '#8A7C6B' }}>
                + Nova cena
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
