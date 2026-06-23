import { useState } from 'react'
import { useStore } from '../store'
import Logo from './Logo'

type Mode = 'login' | 'magic' | 'register'

export default function LoginPage() {
  const { goToApp, goToLanding } = useStore()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [hoverGoogle, setHoverGoogle] = useState(false)
  const [hoverSubmit, setHoverSubmit] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'magic') {
      setMagicSent(true)
      return
    }
    // Simula login — no app real chama Supabase
    goToApp('grafo')
  }

  const handleGoogle = () => {
    // No app real: supabase.auth.signInWithOAuth({ provider: 'google' })
    goToApp('grafo')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#EFE7D8',
      backgroundImage: 'radial-gradient(rgba(138,124,107,.18) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: "'Hanken Grotesk', sans-serif",
    }}>
      {/* Back to landing */}
      <button onClick={goToLanding} style={{
        position: 'fixed', top: 20, left: 24,
        display: 'flex', alignItems: 'center', gap: 7,
        background: 'transparent', border: 'none', cursor: 'pointer',
        fontSize: 14, color: '#8A7C6B', fontFamily: 'inherit',
        transition: 'color .15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#2A241D')}
        onMouseLeave={e => (e.currentTarget.style.color = '#8A7C6B')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Voltar
      </button>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 420,
        background: '#FBF7EF', border: '1px solid #E2D8C6',
        borderRadius: 20, boxShadow: '0 24px 60px -20px rgba(42,36,29,.22)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '32px 36px 28px', borderBottom: '1px solid #EBE0CD', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Logo size={26} />
          </div>
          <h1 style={{
            fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: 26,
            color: '#2A241D', marginBottom: 6,
          }}>
            {mode === 'register' ? 'Criar conta' : mode === 'magic' ? 'Entrar por e-mail' : 'Bem-vindo de volta'}
          </h1>
          <p style={{ fontSize: 14.5, color: '#8A7C6B', lineHeight: 1.5 }}>
            {mode === 'register'
              ? 'Comece a mapear sua história.'
              : mode === 'magic'
              ? 'Enviaremos um link mágico para o seu e-mail.'
              : 'Entre na sua conta para continuar escrevendo.'}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 36px 32px' }}>
          {/* Magic link sent state */}
          {magicSent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', background: '#EFE7D8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 18px',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1" stroke="#6E7350" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Newsreader',serif", fontSize: 20, fontWeight: 600, color: '#2A241D', marginBottom: 10 }}>
                Verifique seu e-mail
              </h3>
              <p style={{ fontSize: 14.5, color: '#574B3D', lineHeight: 1.6, marginBottom: 20 }}>
                Enviamos um link para <b>{email}</b>. Clique nele para entrar na sua conta.
              </p>
              <button onClick={() => setMagicSent(false)} style={{
                background: 'none', border: 'none', color: '#B65C3F', fontSize: 14,
                fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                Usar outro e-mail
              </button>
            </div>
          ) : (
            <>
              {/* Google button */}
              <button onClick={handleGoogle}
                onMouseEnter={() => setHoverGoogle(true)}
                onMouseLeave={() => setHoverGoogle(false)}
                style={{
                  width: '100%', padding: '11px 16px', borderRadius: 11,
                  border: `1.5px solid ${hoverGoogle ? '#B65C3F' : '#E2D8C6'}`,
                  background: hoverGoogle ? '#EFE7D8' : '#F4EDE1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontSize: 14.5, fontWeight: 600, color: '#2A241D',
                  cursor: 'pointer', transition: 'all .15s', fontFamily: 'inherit',
                  marginBottom: 20,
                }}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continuar com Google
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: '#E2D8C6' }} />
                <span style={{ fontSize: 12.5, color: '#A89A86', fontFamily: "'IBM Plex Mono',monospace" }}>ou</span>
                <div style={{ flex: 1, height: 1, background: '#E2D8C6' }} />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {mode === 'register' && (
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#574B3D', display: 'block', marginBottom: 6 }}>Nome</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                      placeholder="Seu nome"
                      style={inputStyle} required />
                  </div>
                )}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#574B3D', display: 'block', marginBottom: 6 }}>E-mail</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    style={inputStyle} required />
                </div>
                {mode !== 'magic' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#574B3D' }}>Senha</label>
                      {mode === 'login' && (
                        <button type="button" onClick={() => setMode('magic')}
                          style={{ fontSize: 12.5, color: '#B65C3F', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
                          Esqueceu?
                        </button>
                      )}
                    </div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                      placeholder={mode === 'register' ? 'Mínimo 8 caracteres' : '••••••••'}
                      style={inputStyle} required />
                  </div>
                )}

                <button type="submit"
                  onMouseEnter={() => setHoverSubmit(true)}
                  onMouseLeave={() => setHoverSubmit(false)}
                  style={{
                    width: '100%', padding: '13px 0', borderRadius: 11, border: 'none',
                    background: hoverSubmit ? '#9E4A30' : '#B65C3F',
                    color: '#F4EDE1', fontSize: 15, fontWeight: 600,
                    cursor: 'pointer', transition: 'background .15s', fontFamily: 'inherit',
                    marginTop: 4,
                    boxShadow: '0 4px 14px rgba(182,92,63,.28)',
                  }}>
                  {mode === 'magic' ? 'Enviar link' : mode === 'register' ? 'Criar conta' : 'Entrar'}
                </button>
              </form>

              {/* Magic link toggle */}
              {mode === 'login' && (
                <button type="button" onClick={() => setMode('magic')}
                  style={{
                    width: '100%', marginTop: 12, padding: '10px 0', borderRadius: 11,
                    border: '1.5px solid #E2D8C6', background: 'transparent',
                    fontSize: 14, color: '#574B3D', cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'border-color .15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9B79A')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2D8C6')}>
                  ✉ Entrar com link por e-mail
                </button>
              )}

              {mode === 'magic' && (
                <button type="button" onClick={() => setMode('login')}
                  style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', fontSize: 13.5, color: '#8A7C6B', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Usar senha
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer toggle login/register */}
        {!magicSent && (
          <div style={{ padding: '16px 36px 24px', borderTop: '1px solid #EBE0CD', textAlign: 'center', fontSize: 14, color: '#8A7C6B' }}>
            {mode === 'register'
              ? <>Já tem conta?{' '}<button onClick={() => setMode('login')} style={linkBtn}>Entrar</button></>
              : <>Ainda não tem conta?{' '}<button onClick={() => setMode('register')} style={linkBtn}>Criar grátis</button></>}
          </div>
        )}
      </div>

      {/* Fine print */}
      <p style={{ marginTop: 24, fontSize: 12.5, color: '#A89A86', textAlign: 'center', maxWidth: 360, lineHeight: 1.6 }}>
        Ao continuar, você concorda com os{' '}
        <span style={{ color: '#574B3D', textDecoration: 'underline', cursor: 'pointer' }}>Termos de uso</span>
        {' '}e a{' '}
        <span style={{ color: '#574B3D', textDecoration: 'underline', cursor: 'pointer' }}>Política de privacidade</span>.
      </p>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', borderRadius: 10,
  border: '1.5px solid #E2D8C6', background: '#F4EDE1',
  fontSize: 14.5, color: '#2A241D', outline: 'none',
  fontFamily: "'Hanken Grotesk', sans-serif",
  transition: 'border-color .15s',
}

const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: '#B65C3F',
  fontWeight: 600, cursor: 'pointer', fontSize: 14,
  fontFamily: "'Hanken Grotesk', sans-serif",
}
