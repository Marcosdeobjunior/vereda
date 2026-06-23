import { useState } from 'react'
import { CHAPTERS } from '../data'

export default function ManuscriptView() {
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[2].id)
  const chapter = CHAPTERS.find(c => c.id === activeChapterId) ?? CHAPTERS[0]
  const [text, setText] = useState(chapter.body)
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Chapter list */}
      <div style={{ width: 200, flexShrink: 0, background: '#F4EDE1', borderRight: '1px solid #E2D8C6', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A7C6B', padding: '4px 16px 10px' }}>Capítulos</div>
        {CHAPTERS.map((c, i) => {
          const sel = c.id === activeChapterId
          return (
            <div key={c.id} onClick={() => { setActiveChapterId(c.id); setText(c.body) }}
              style={{ padding: '9px 16px', cursor: 'pointer', background: sel ? '#EBE0CD' : 'transparent', borderLeft: sel ? '3px solid #B65C3F' : '3px solid transparent', transition: 'background .12s' }}>
              <div style={{ fontSize: 13, fontWeight: sel ? 600 : 400, color: sel ? '#2A241D' : '#574B3D' }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, color: '#C2924A', marginRight: 6 }}>{['I','II','III','IV','V','VI'][i]}</span>
                {c.title}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#8A7C6B', marginTop: 2 }}>{c.wordCount > 0 ? `${c.wordCount.toLocaleString()} palavras` : 'sem palavras'}</div>
            </div>
          )
        })}
      </div>

      {/* Editor area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Strip */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', height: 44, background: '#EFE7D8', borderBottom: '1px solid #E2D8C6', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>
          <span style={{ textTransform: 'uppercase' }}>Capítulo {['I','II','III','IV','V','VI'][CHAPTERS.findIndex(c => c.id === activeChapterId)]}</span>
          <span style={{ color: '#C9B79A' }}>·</span>
          <span>{wordCount.toLocaleString()} palavras</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', fontSize: 12.5, fontFamily: "'IBM Plex Mono',monospace", color: '#574B3D', cursor: 'pointer', padding: 0 }}>Foco</button>
            <button style={{ background: 'none', border: 'none', fontSize: 12.5, fontFamily: "'IBM Plex Mono',monospace", color: '#574B3D', cursor: 'pointer', padding: 0 }}>Histórico</button>
            <span style={{ color: '#6E7350' }}>● salvo</span>
          </div>
        </div>

        {/* Text area */}
        <div style={{ maxWidth: 720, width: '100%', margin: '0 auto', padding: '44px 32px 80px' }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#9E4A30', marginBottom: 18 }}>
            {chapter.pov ? `POV: ${chapter.pov}` : 'Narrador'}
          </div>
          <h1 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 40, color: '#2A241D', marginBottom: 36, lineHeight: 1.15 }}>{chapter.title}</h1>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Comece a escrever…"
            style={{
              width: '100%', minHeight: 400, border: 'none', outline: 'none', resize: 'none', background: 'transparent',
              fontFamily: "'Newsreader',serif", fontSize: 19, lineHeight: 1.78, color: '#3F362B',
              fontWeight: 400,
            }} />
        </div>
      </div>
    </div>
  )
}
