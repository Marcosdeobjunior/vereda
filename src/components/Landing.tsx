import { useState, useRef } from 'react'
import { useStore } from '../store'
import Logo from './Logo'
import MiniGraph from './MiniGraph'
import LandingGraphDemo, { GRAPH_ASPECT_RATIO } from './LandingGraphDemo'

/* ── helpers ───────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15.5, color: '#3F362B' }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#6E7350', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.2 L5 8.5 L9.5 3.5" fill="none" stroke="#F4EDE1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {children}
    </div>
  )
}

function HoverBtn({ onClick, style, hoverStyle, children }: { onClick: () => void; style: React.CSSProperties; hoverStyle: React.CSSProperties; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} style={{ ...style, ...(hov ? hoverStyle : {}) }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  )
}

function HoverLink({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false)
  return (
    <span onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', color: hov ? '#B65C3F' : 'inherit', transition: 'color .15s', ...style }}>
      {children}
    </span>
  )
}

/* ── resource card ─────────────────────────────────────── */
function ResourceCard({ icon, title, desc, detail }: { icon: React.ReactNode; title: string; desc: string; detail: string }) {
  const [hov, setHov] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: '#FBF7EF', border: `1px solid ${hov ? '#C9B79A' : '#E7DDCB'}`, borderRadius: 16, padding: 28, transition: 'transform .15s,box-shadow .15s,border-color .15s', transform: hov ? 'translateY(-3px)' : 'none', boxShadow: hov ? '0 14px 32px -16px rgba(42,36,29,.24)' : 'none' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFE7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 22, marginBottom: 9, color: '#2A241D' }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: '#574B3D', marginBottom: 14 }}>{desc}</p>
      <button onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#B65C3F', cursor: 'pointer', fontFamily: 'inherit', padding: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
        {open ? 'Ver menos ↑' : 'Saiba mais ↓'}
      </button>
      {open && (
        <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.65, color: '#8A7C6B', borderTop: '1px solid #EBE0CD', paddingTop: 12 }}>
          {detail}
        </p>
      )}
    </div>
  )
}

/* ── writing demo ──────────────────────────────────────── */
function WritingDemo() {
  const [text, setText] = useState(
    'A carta chegou numa terça, dobrada em quatro, com o carimbo borrado da cidade. Joana a guardou no bolso do avental por três dias antes de ter coragem de abri-la.\n\nLá fora, o açude continuava baixando. Cada manhã a água recuava mais um palmo, deixando à mostra um cerco de pedras que ninguém lembrava de ter visto.'
  )
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const ref = useRef<HTMLTextAreaElement>(null)
  return (
    <div style={{ background: '#FBF7EF', border: '1px solid #E2D8C6', borderRadius: 18, boxShadow: '0 24px 50px -22px rgba(42,36,29,.3)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: '1px solid #EBE0CD', background: '#F4EDE1', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#D9CDBA' }} />)}
        </span>
        <span style={{ marginLeft: 4 }}>CAPÍTULO III</span>
        <span style={{ color: '#C9B79A' }}>·</span>
        <span>{wordCount} palavras</span>
        <span style={{ marginLeft: 'auto', color: '#6E7350' }}>● salvo</span>
      </div>
      <div style={{ padding: '28px 36px 32px' }} onClick={() => ref.current?.focus()}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#9E4A30', marginBottom: 14 }}>POV: Joana</div>
        <div style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 28, color: '#2A241D', marginBottom: 20 }}>A Carta</div>
        <textarea
          ref={ref}
          value={text}
          onChange={e => setText(e.target.value)}
          style={{
            width: '100%', minHeight: 160, border: 'none', outline: 'none', resize: 'none', background: 'transparent',
            fontFamily: "'Newsreader',serif", fontSize: 18, lineHeight: 1.72, color: '#3F362B',
          }}
        />
        <div style={{ marginTop: 12, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: '#C9B79A' }}>
          ↑ Clique e escreva para experimentar
        </div>
      </div>
    </div>
  )
}

/* ── main component ────────────────────────────────────── */
export default function Landing() {
  const goToApp = useStore((s) => s.goToApp)
  const goToLogin = useStore((s) => s.goToLogin)

  return (
    <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", color: '#2A241D', background: '#F4EDE1', minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(244,237,225,.88)', backdropFilter: 'saturate(1.15) blur(10px)', borderBottom: '1px solid #E2D8C6' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '15px 32px', display: 'flex', alignItems: 'center', gap: 34 }}>
          <Logo size={24} />
          <nav style={{ display: 'flex', gap: 28, fontSize: 15, color: '#574B3D' }}>
            <HoverLink onClick={() => scrollTo('recursos')}>Recursos</HoverLink>
            <HoverLink onClick={() => scrollTo('grafo')}>O grafo</HoverLink>
            <HoverLink onClick={() => scrollTo('escrita')}>Escrita</HoverLink>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20 }}>
            <HoverLink onClick={goToLogin} style={{ fontSize: 15, fontWeight: 500, color: '#2A241D' }}>Entrar</HoverLink>
            <HoverBtn onClick={() => goToApp('manuscrito')}
              style={{ fontSize: 15, fontWeight: 600, color: '#F4EDE1', background: '#2A241D', padding: '11px 20px', borderRadius: 11, transition: 'background .18s' }}
              hoverStyle={{ background: '#B65C3F' }}>
              Começar a escrever
            </HoverBtn>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '74px 32px 44px', display: 'grid', gridTemplateColumns: '1.04fr .96fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#9E4A30', textTransform: 'uppercase', marginBottom: 22 }}>Para quem escreve livros</div>
          <h1 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 58, lineHeight: 1.04, letterSpacing: '-.015em', marginBottom: 24, color: '#2A241D' }}>
            Escreva o livro inteiro sem perder o fio da meada.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: '#574B3D', marginBottom: 32, maxWidth: 520 }}>
            Vereda reúne o manuscrito, o planejamento e um grafo vivo das suas personagens, cenas e lugares — para que a história toda caiba num só lugar.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <HoverBtn onClick={() => goToApp('manuscrito')}
              style={{ fontSize: 16, fontWeight: 600, color: '#F4EDE1', background: '#B65C3F', padding: '14px 26px', borderRadius: 12, boxShadow: '0 6px 18px rgba(182,92,63,.28)', transition: 'transform .15s,box-shadow .15s' }}
              hoverStyle={{ transform: 'translateY(-2px)', boxShadow: '0 10px 26px rgba(182,92,63,.34)' }}>
              Começar a escrever
            </HoverBtn>
            <HoverBtn onClick={() => scrollTo('grafo')}
              style={{ fontSize: 16, fontWeight: 600, color: '#2A241D', background: 'transparent', border: '1.5px solid #D8CBB6', padding: '13px 22px', borderRadius: 12, transition: 'border .15s,background .15s' }}
              hoverStyle={{ border: '1.5px solid #B65C3F', background: '#EFE7D8' }}>
              Ver o grafo →
            </HoverBtn>
          </div>
          <div style={{ marginTop: 30, fontSize: 13.5, color: '#8A7C6B', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6E7350' }} />
            Manuscrito · Planejamento · Grafo — num só lugar
          </div>
        </div>
        <div style={{ background: '#FBF7EF', border: '1px solid #E2D8C6', borderRadius: 18, boxShadow: '0 30px 60px -24px rgba(42,36,29,.34)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '13px 16px', borderBottom: '1px solid #EBE0CD', background: '#F4EDE1' }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#D9CDBA' }} />)}
            <span style={{ marginLeft: 10, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>A Casa de Barro — grafo</span>
          </div>
          <MiniGraph height={312} dotSize="24px" />
        </div>
      </section>

      {/* O GRAFO — grafo animado em loop, ocupando toda a largura da seção, com o texto flutuando por cima num painel legível */}
      <section id="grafo" style={{ position: 'relative', background: '#EFE7D8', borderTop: '1px solid #E5DBCA', borderBottom: '1px solid #E5DBCA', marginTop: 36, scrollMarginTop: 72, overflow: 'hidden' }}>
        {/* Grafo de fundo: largura total da seção, centralizado verticalmente */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', width: '100%', aspectRatio: GRAPH_ASPECT_RATIO }}>
          <LandingGraphDemo autoplay />
        </div>

        {/* Painel de texto flutuando por cima do grafo */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '84px 32px' }}>
          <div style={{
            textAlign: 'center', maxWidth: 560,
            background: 'rgba(251,247,239,.8)', backdropFilter: 'blur(14px) saturate(1.1)',
            border: '1px solid rgba(226,216,198,.8)', borderRadius: 20,
            padding: '42px 40px', boxShadow: '0 26px 60px -20px rgba(42,36,29,.3)',
          }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#6E7350', textTransform: 'uppercase', marginBottom: 18 }}>O grafo</div>
            <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 38, lineHeight: 1.12, letterSpacing: '-.01em', marginBottom: 16, color: '#2A241D' }}>
              Tudo na sua história está conectado. Agora você vê como.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#574B3D', marginBottom: 26 }}>
              Cada personagem, cena, lugar e ideia vira um nó. As ligações que você cria desenham o mapa do enredo — e revelam o que estava escondido entre as linhas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26, textAlign: 'left' }}>
              {([
                ['#B65C3F', 'Personagens', 'Quem se cruza com quem, quando e por quê.'],
                ['#C2924A', 'Cenas', 'A ordem dos acontecimentos e seus fios narrativos.'],
                ['#6E7350', 'Locais', 'A geografia do seu mundo, física e emocional.'],
                ['#5F7470', 'Ideias', 'Temas e imagens que costuram a história toda.'],
              ] as [string, string, string][]).map(([color, label, desc]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 4 }} />
                  <span style={{ fontSize: 14.5, color: '#3F362B', lineHeight: 1.5 }}><b style={{ fontWeight: 600 }}>{label}</b> — {desc}</span>
                </div>
              ))}
            </div>
            <HoverBtn onClick={() => goToApp('grafo')}
              style={{ fontSize: 15, fontWeight: 600, color: '#2A241D', background: 'transparent', border: '1.5px solid #C9B79A', padding: '12px 22px', borderRadius: 12, transition: 'border .15s,background .15s' }}
              hoverStyle={{ border: '1.5px solid #6E7350', background: '#E8DEC9' }}>
              Explorar o grafo completo →
            </HoverBtn>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 32px 70px', scrollMarginTop: 72 }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 50px' }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#9E4A30', textTransform: 'uppercase', marginBottom: 16 }}>Recursos</div>
          <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 40, lineHeight: 1.12, letterSpacing: '-.01em', color: '#2A241D', marginBottom: 14 }}>Tudo que um livro precisa, lado a lado.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#574B3D' }}>Ferramentas pensadas para escritores — sem distrações, sem curva de aprendizado.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          <ResourceCard title="Quadro de cenas" desc="Arraste cenas entre atos e veja o ritmo do livro num relance."
            detail="Organize seus capítulos em colunas por ato. Veja o arco narrativo completo, identifique desequilíbrios de ritmo e mova cenas com um clique. Status de cada cena visível no próprio card."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="4" width="5" height="16" rx="1.5" fill="#B65C3F" /><rect x="9.5" y="4" width="5" height="11" rx="1.5" fill="#C2924A" /><rect x="16" y="4" width="5" height="14" rx="1.5" fill="#6E7350" /></svg>} />
          <ResourceCard title="Notas de pesquisa" desc="Guarde referências, mapas e recortes ao lado do capítulo certo."
            detail="Anexe notas de pesquisa a qualquer capítulo, personagem ou local. Imagens, textos e links ficam organizados contextualmente — a sua pesquisa a um clique do que você está escrevendo."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#574B3D" strokeWidth="1.8" /><line x1="7.5" y1="8" x2="16.5" y2="8" stroke="#B65C3F" strokeWidth="1.8" /><line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#574B3D" strokeWidth="1.8" /><line x1="7.5" y1="16" x2="13" y2="16" stroke="#574B3D" strokeWidth="1.8" /></svg>} />
          <ResourceCard title="Histórico de versões" desc="Volte a qualquer rascunho. Nenhuma frase se perde pelo caminho."
            detail="Cada salvamento cria um ponto de restauração. Compare versões lado a lado, restaure um parágrafo específico sem desfazer o resto. Seu manuscrito nunca se perde — só evolui."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="#574B3D" strokeWidth="1.8" /><line x1="12" y1="12" x2="12" y2="7.5" stroke="#B65C3F" strokeWidth="1.8" /><line x1="12" y1="12" x2="15.5" y2="13.5" stroke="#B65C3F" strokeWidth="1.8" /></svg>} />
        </div>

        {/* Segunda linha de recursos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 22 }}>
          <ResourceCard title="Metas de escrita" desc="Defina uma meta diária e acompanhe seu progresso em tempo real."
            detail="Configure metas por dia, capítulo ou projeto. Um indicador discreto na barra superior mostra seu progresso sem interromper o fluxo. Comemore cada marco — você merece."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 20V10M8 20v-4M4 20v-2M16 20V6M20 20V4" stroke="#6E7350" strokeWidth="1.8" strokeLinecap="round" /></svg>} />
          <ResourceCard title="Modo foco" desc="Esconda tudo e fique só você e a página. Sem distrações."
            detail="Um atalho coloca o editor em tela cheia, silencia o restante da interface e ativa a tipografia de livro em modo noturno opcional. Escreva sem ser interrompido pelo próprio app."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4" stroke="#5F7470" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>} />
          <ResourceCard title="Exportar manuscrito" desc="Exporte em DOCX ou PDF formatado para enviar a editoras."
            detail="Gere um arquivo pronto para submissão com formatação padrão editorial: fonte Times 12pt, espaçamento duplo, cabeçalho com título e autor. Um clique, pronto para enviar."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14" stroke="#C2924A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>} />
        </div>
      </section>

      {/* ESCRITA — seção interativa */}
      <section id="escrita" style={{ background: '#EFE7D8', borderTop: '1px solid #E5DBCA', borderBottom: '1px solid #E5DBCA', scrollMarginTop: 72 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 32px', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 60, alignItems: 'start' }}>
          {/* Editor demo interativo */}
          <WritingDemo />
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#9E4A30', textTransform: 'uppercase', marginBottom: 18 }}>Escrita</div>
            <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 42, lineHeight: 1.1, letterSpacing: '-.01em', marginBottom: 18, color: '#2A241D' }}>Um editor que sai da frente.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: '#574B3D', marginBottom: 24 }}>
              Tipografia de livro, modo foco e metas de palavras. O restante da ferramenta espera em silêncio, a um clique de distância, enquanto você escreve.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <CheckItem>Metas de palavras por dia e por capítulo</CheckItem>
              <CheckItem>Modo foco sem distrações</CheckItem>
              <CheckItem>Cada cena ligada ao grafo automaticamente</CheckItem>
              <CheckItem>Contagem de palavras em tempo real</CheckItem>
              <CheckItem>Autosave — nunca perca um parágrafo</CheckItem>
            </div>
            <div style={{ background: '#E8DEC9', borderRadius: 12, padding: '14px 16px', fontSize: 13.5, color: '#574B3D', lineHeight: 1.6, marginBottom: 24 }}>
              <b style={{ fontWeight: 600 }}>💡 Demo ao lado:</b> o editor está ativo — clique nele e escreva para ver a contagem de palavras atualizar em tempo real.
            </div>
            <HoverBtn onClick={() => goToApp('manuscrito')}
              style={{ fontSize: 15, fontWeight: 600, color: '#F4EDE1', background: '#B65C3F', padding: '13px 22px', borderRadius: 12, boxShadow: '0 4px 14px rgba(182,92,63,.24)', transition: 'transform .15s,box-shadow .15s' }}
              hoverStyle={{ transform: 'translateY(-2px)', boxShadow: '0 8px 22px rgba(182,92,63,.32)' }}>
              Abrir o editor →
            </HoverBtn>
          </div>
        </div>
      </section>

      {/* CITAÇÃO */}
      <section style={{ maxWidth: 840, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontSize: 32, lineHeight: 1.4, color: '#2A241D' }}>
          "Escrever um livro é cavar um açude e esperar a chuva da frase certa. O Vereda é onde guardo cada gota até ela virar rio."
        </p>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#B65C3F', color: '#F4EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>CV</span>
          <span style={{ fontSize: 14.5, color: '#574B3D' }}>Clarice V., escrevendo o segundo romance</span>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: '#2A241D' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '74px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 38, lineHeight: 1.12, letterSpacing: '-.01em', color: '#F4EDE1', maxWidth: 560 }}>
            Sua história está esperando para ser mapeada.
          </h2>
          <HoverBtn onClick={() => goToApp('manuscrito')}
            style={{ fontSize: 16, fontWeight: 600, color: '#2A241D', background: '#E8C98C', padding: '15px 30px', borderRadius: 12, transition: 'transform .15s,background .15s' }}
            hoverStyle={{ transform: 'translateY(-2px)', background: '#F0D49A' }}>
            Começar a escrever — é grátis
          </HoverBtn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#211C16', color: '#B8AC9A' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '46px 32px', display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
          <Logo size={22} nameColor="#E8DEC9" />
          <div style={{ display: 'flex', gap: 30, fontSize: 14 }}>
            <HoverLink onClick={() => scrollTo('recursos')} style={{ color: '#B8AC9A' }}>Recursos</HoverLink>
            <HoverLink onClick={() => scrollTo('grafo')} style={{ color: '#B8AC9A' }}>O grafo</HoverLink>
            <HoverLink onClick={() => scrollTo('escrita')} style={{ color: '#B8AC9A' }}>Escrita</HoverLink>
            <HoverLink style={{ color: '#B8AC9A' }}>Contato</HoverLink>
          </div>
          <div style={{ fontSize: 13, color: '#7E7464' }}>© 2026 Vereda</div>
        </div>
      </footer>
    </div>
  )
}
