interface LogoProps { size?: number; showName?: boolean; nameColor?: string }

export default function Logo({ size = 24, showName = true, nameColor = '#2A241D' }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
        <line x1="6" y1="17" x2="12" y2="7" stroke="#6E7350" strokeWidth="1.8" />
        <line x1="12" y1="7" x2="18" y2="14" stroke="#B65C3F" strokeWidth="1.8" />
        <circle cx="6" cy="17" r="3" fill="#C2924A" />
        <circle cx="12" cy="7" r="3.4" fill="#6E7350" />
        <circle cx="18" cy="14" r="3" fill="#B65C3F" />
      </svg>
      {showName && (
        <span style={{
          fontFamily: "'Newsreader', serif",
          fontSize: size === 24 ? 23 : size === 22 ? 19 : 23,
          fontWeight: 600,
          letterSpacing: '.01em',
          color: nameColor,
        }}>Vereda</span>
      )}
    </div>
  )
}
