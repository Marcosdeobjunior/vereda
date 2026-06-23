import { useState } from 'react'
import { useStore } from '../store'
import Logo from './Logo'
import MiniGraph from './MiniGraph'

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 15.5, color: '#3F362B' }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#6E7350', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

function ResourceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: '#FBF7EF', border: '1px solid #E7DDCB', borderRadius: 16, padding: 28, transition: 'transform .15s,box-shadow .15s', transform: hov ? 'translateY(-3px)' : 'none', boxShadow: hov ? '0 14px 32px -16px rgba(42,36,29,.24)' : 'none' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFE7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 22, marginBottom: 9, color: '#2A241D' }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: '#574B3D' }}>{desc}</p>
    </div>
  )
}

export default function Landing() {
  const goToApp = useStore((s) => s.goToApp)

  return (
    <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", color: '#2A241D', background: '#F4EDE1', minHeight: '100vh' }}>
      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(244,237,225,.82)', backdropFilter: 'saturate(1.15) blur(10px)', borderBottom: '1px solid #E2D8C6' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '15px 32px', display: 'flex', alignItems: 'center', gap: 34 }}>
          <Logo size={24} />
          <nav style={{ display: 'flex', gap: 28, fontSize: 15, color: '#574B3D' }}>
            <HoverLink onClick={() => document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })}>Recursos</HoverLink>
            <HoverLink onClick={() => goToApp('grafo')}>O grafo</HoverLink>
            <HoverLink onClick={() => goToApp('manuscrito')}>Escrita</HoverLink>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20 }}>
            <HoverLink onClick={() => goToApp('grafo')} style={{ fontSize: 15, fontWeight: 500, color: '#2A241D' }}>Entrar</HoverLink>
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
            <HoverBtn onClick={() => goToApp('grafo')}
              style={{ fontSize: 16, fontWeight: 600, color: '#2A241D', background: 'transparent', border: '1.5px solid #D8CBB6', padding: '13px 22px', borderRadius: 12, transition: 'border-color .15s,background .15s' }}
              hoverStyle={{ borderColor: '#B65C3F', background: '#EFE7D8' }}>
              Ver o grafo →
            </HoverBtn>
          </div>
          <div style={{ marginTop: 30, fontSize: 13.5, color: '#8A7C6B', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6E7350' }} />
            Manuscrito · Planejamento · Grafo — num só lugar
          </div>
        </div>
        {/* Hero window */}
        <div style={{ background: '#FBF7EF', border: '1px solid #E2D8C6', borderRadius: 18, boxShadow: '0 30px 60px -24px rgba(42,36,29,.34)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '13px 16px', borderBottom: '1px solid #EBE0CD', background: '#F4EDE1' }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#D9CDBA' }} />)}
            <span style={{ marginLeft: 10, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>A Casa de Barro — grafo</span>
          </div>
          <MiniGraph height={312} dotSize="24px" />
        </div>
      </section>

      {/* O GRAFO */}
      <section style={{ background: '#EFE7D8', borderTop: '1px solid #E5DBCA', borderBottom: '1px solid #E5DBCA', marginTop: 36 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 32px', display: 'grid', gridTemplateColumns: '.92fr 1.08fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#6E7350', textTransform: 'uppercase', marginBottom: 18 }}>O grafo</div>
            <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 42, lineHeight: 1.1, letterSpacing: '-.01em', marginBottom: 18, color: '#2A241D' }}>
              Tudo na sua história está conectado. Agora você vê como.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: '#574B3D', marginBottom: 28 }}>
              Cada personagem, cena, lugar e ideia vira um nó. As ligações que você cria desenham o mapa do enredo — e revelam o que estava escondido entre as linhas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([['#B65C3F', 'Personagens', 'quem se cruza com quem, e quando.'],
                ['#C2924A', 'Cenas', 'a ordem dos acontecimentos e seus fios.'],
                ['#6E7350', 'Locais', 'a geografia do seu mundo.'],
                ['#5F7470', 'Ideias', 'temas e imagens que costuram tudo.']] as [string, string, string][]).map(([color, label, desc]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <span style={{ width: 13, height: 13, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 15.5, color: '#3F362B' }}><b style={{ fontWeight: 600 }}>{label}</b> — {desc}</span>
                </div>
              ))}
            </div>
            <HoverBtn onClick={() => goToApp('grafo')}
              style={{ marginTop: 30, fontSize: 15, fontWeight: 600, color: '#2A241D', background: 'transparent', border: '1.5px solid #C9B79A', padding: '12px 22px', borderRadius: 12, transition: 'border-color .15s,background .15s' }}
              hoverStyle={{ borderColor: '#6E7350', background: '#E8DEC9' }}>
              Explorar o grafo →
            </HoverBtn>
          </div>
          <div style={{ background: '#FBF7EF', border: '1px solid #E2D8C6', borderRadius: 18, boxShadow: '0 24px 50px -22px rgba(42,36,29,.3)', overflow: 'hidden' }}>
            <div style={{ background: '#F4EDE1', borderBottom: '1px solid #EBE0CD', display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px' }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#D9CDBA' }} />)}
              <span style={{ marginLeft: 10, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>A Casa de Barro — grafo</span>
            </div>
            <MiniGraph height={392} dotSize="26px" />
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 32px 70px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 50px' }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#9E4A30', textTransform: 'uppercase', marginBottom: 16 }}>Recursos</div>
          <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 40, lineHeight: 1.12, letterSpacing: '-.01em', color: '#2A241D' }}>Tudo que um livro precisa, lado a lado.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          <ResourceCard title="Quadro de cenas" desc="Arraste cenas entre atos e veja o ritmo do livro num relance."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="4" width="5" height="16" rx="1.5" fill="#B65C3F" /><rect x="9.5" y="4" width="5" height="11" rx="1.5" fill="#C2924A" /><rect x="16" y="4" width="5" height="14" rx="1.5" fill="#6E7350" /></svg>} />
          <ResourceCard title="Notas de pesquisa" desc="Guarde referências, mapas e recortes ao lado do capítulo certo."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="#574B3D" strokeWidth="1.8" /><line x1="7.5" y1="8" x2="16.5" y2="8" stroke="#B65C3F" strokeWidth="1.8" /><line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#574B3D" strokeWidth="1.8" /><line x1="7.5" y1="16" x2="13" y2="16" stroke="#574B3D" strokeWidth="1.8" /></svg>} />
          <ResourceCard title="Histórico de versões" desc="Volte a qualquer rascunho. Nenhuma frase se perde pelo caminho."
            icon={<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="#574B3D" strokeWidth="1.8" /><line x1="12" y1="12" x2="12" y2="7.5" stroke="#B65C3F" strokeWidth="1.8" /><line x1="12" y1="12" x2="15.5" y2="13.5" stroke="#B65C3F" strokeWidth="1.8" /></svg>} />
        </div>
      </section>

      {/* ESCRITA */}
      <section style={{ background: '#EFE7D8', borderTop: '1px solid #E5DBCA', borderBottom: '1px solid #E5DBCA' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 32px', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 60, alignItems: 'center' }}>
          <div style={{ background: '#FBF7EF', border: '1px solid #E2D8C6', borderRadius: 18, boxShadow: '0 24px 50px -22px rgba(42,36,29,.3)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: '1px solid #EBE0CD', background: '#F4EDE1', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: '#8A7C6B' }}>
              <span>CAPÍTULO III</span><span style={{ color: '#C9B79A' }}>·</span><span>1.284 palavras</span><span style={{ marginLeft: 'auto', color: '#6E7350' }}>● salvo</span>
            </div>
            <div style={{ padding: '34px 40px 38px' }}>
              <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 600, fontSize: 30, marginBottom: 18, color: '#2A241D' }}>A Carta</h3>
              <p style={{ fontFamily: "'Newsreader',serif", fontSize: 18, lineHeight: 1.72, color: '#3F362B', marginBottom: 15 }}>
                A carta chegou numa terça, dobrada em quatro, com o carimbo borrado da cidade. Joana a guardou no bolso do avental por três dias antes de ter coragem de abri-la.
              </p>
              <p style={{ fontFamily: "'Newsreader',serif", fontSize: 18, lineHeight: 1.72, color: '#3F362B' }}>
                Lá fora, o açude continuava baixando. Cada manhã a água recuava mais um palmo, deixando à mostra um cerco de pedras que ninguém lembrava de ter visto.
                <span style={{ display: 'inline-block', width: 2, height: 20, background: '#B65C3F', marginLeft: 3, verticalAlign: -4 }} />
              </p>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12.5, letterSpacing: '.16em', color: '#9E4A30', textTransform: 'uppercase', marginBottom: 18 }}>Escrita</div>
            <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 500, fontSize: 42, lineHeight: 1.1, letterSpacing: '-.01em', marginBottom: 18, color: '#2A241D' }}>Um editor que sai da frente.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: '#574B3D', marginBottom: 24 }}>
              Tipografia de livro, modo foco e metas de palavras. O resto da ferramenta espera em silêncio, a um clique de distância, enquanto você escreve.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CheckItem>Metas de palavras por dia e por capítulo</CheckItem>
              <CheckItem>Modo foco sem distrações</CheckItem>
              <CheckItem>Cada cena ligada ao grafo automaticamente</CheckItem>
            </div>
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
            {['Recursos', 'O grafo', 'Escrita', 'Contato'].map(l => (
              <HoverLink key={l} onClick={l === 'O grafo' ? () => goToApp('grafo') : l === 'Escrita' ? () => goToApp('manuscrito') : undefined}
                style={{ color: '#B8AC9A' }}>{l}</HoverLink>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#7E7464' }}>© 2026 Vereda</div>
        </div>
      </footer>
    </div>
  )
}
