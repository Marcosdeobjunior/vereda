import { useState } from 'react'
import { CHAPTERS } from '../data'

const ROMAN = ['I','II','III','IV','V','VI']

export default function ManuscriptView() {
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[2].id)
  const chapter = CHAPTERS.find(c => c.id === activeChapterId) ?? CHAPTERS[0]
  const activeIndex = CHAPTERS.findIndex(c => c.id === activeChapterId)
  const [text, setText] = useState(chapter.body)
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Chapter list */}
      <div style={{ width: 200, flexShrink: 0, background: 'var(--paper)', borderRight: '1px solid var(--line)', overflowY: 'auto', padding: '12px 0', transition: 'background .25s' }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', padding: '4px 16px 10px' }}>Capítulos</div>
        {CHAPTERS.map((c, i) => {
          const sel = c.id === activeChapterId
          return (
            <div key={c.id} onClick={() => { setActiveChapterId(c.id); setText(c.body) }}
              style={{ padding: '9px 16px', cursor: 'pointer', background: sel ? 'var(--paper-4)' : 'transparent', borderLeft: sel ? '3px solid var(--terracotta)' : '3px solid transparent', transition: 'background .12s' }}>
              <div style={{ fontSize: 13, fontWeight: sel ? 600 : 400, color: sel ? 'var(--ink)' : 'var(--text-soft)' }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, color: 'var(--ochre)', marginRight: 6 }}>{ROMAN[i]}</span>
                {c.title}
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                {c.wordCount > 0 ? `${c.wordCount.toLocaleString()} palavras` : 'sem palavras'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Editor area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--paper-2)', transition: 'background .25s' }}>
        {/* Strip */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', height: 44, background: 'var(--paper-2)', borderBottom: '1px solid var(--line)', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: 'var(--muted)', transition: 'background .25s' }}>
          <span style={{ textTransform: 'uppercase' }}>Capítulo {ROMAN[activeIndex]}</span>
          <span style={{ color: 'var(--line)' }}>·</span>
          <span>{wordCount.toLocaleString()} palavras</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', fontSize: 12.5, fontFamily: "'IBM Plex Mono',monospace", color: 'var(--text-soft)', cursor: 'pointer', padding: 0 }}>Foco</button>
            <button style={{ background: 'none', border: 'none', fontSize: 12.5, fontFamily: "'IBM Plex Mono',monospace", color: 'var(--text-soft)', cursor: 'pointer', padding: 0 }}>Histórico</button>
            <span style={{ color: 'var(--moss)' }}>● salvo</span>
          </div>
        </div>

        {/* Text */}
        <div style={{ maxWidth: 720, width: '100%', margin: '0 auto', padding: '44px 32px 80px' }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--terracotta-dp)', marginBottom: 18 }}>
            {chapter.pov ? `POV: ${chapter.pov}` : 'Narrador'}
          </div>
          <h1 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 40, color: 'var(--ink)', marginBottom: 36, lineHeight: 1.15 }}>{chapter.title}</h1>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Comece a escrever…"
            style={{ width: '100%', minHeight: 400, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontFamily: "'Newsreader',serif", fontSize: 19, lineHeight: 1.78, color: 'var(--ink-2)', fontWeight: 400 }} />
        </div>
      </div>
    </div>
  )
}
