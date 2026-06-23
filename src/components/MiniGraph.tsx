interface MiniGraphProps { height?: number; dotSize?: string }

export default function MiniGraph({ height = 312, dotSize = '24px' }: MiniGraphProps) {
  return (
    <div style={{
      position: 'relative', height,
      backgroundColor: '#EFE7D8',
      backgroundImage: `radial-gradient(rgba(138,124,107,.22) 1px, transparent 1px)`,
      backgroundSize: `${dotSize} ${dotSize}`,
      padding: 16,
    }}>
      <svg viewBox="0 0 520 360" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
        <line x1="250" y1="170" x2="250" y2="250" stroke="#C9BBA3" strokeWidth="1.6" />
        <line x1="250" y1="170" x2="150" y2="90" stroke="#C9BBA3" strokeWidth="1.6" />
        <line x1="250" y1="170" x2="380" y2="110" stroke="#C9BBA3" strokeWidth="1.6" />
        <line x1="250" y1="170" x2="110" y2="210" stroke="#C9BBA3" strokeWidth="1.6" />
        <line x1="250" y1="250" x2="340" y2="260" stroke="#C9BBA3" strokeWidth="1.6" />
        <line x1="380" y1="110" x2="340" y2="260" stroke="#C9BBA3" strokeWidth="1.4" />
        <line x1="380" y1="110" x2="430" y2="210" stroke="#C9BBA3" strokeWidth="1.4" />
        <line x1="150" y1="90" x2="110" y2="210" stroke="#C9BBA3" strokeWidth="1.4" />
        <circle cx="250" cy="170" r="22" fill="#6E7350" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="16" fill="#B65C3F" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="150" cy="90" r="13" fill="#B65C3F" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="380" cy="110" r="14" fill="#6E7350" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="340" cy="260" r="14" fill="#B65C3F" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="110" cy="210" r="12" fill="#C2924A" stroke="#FBF7EF" strokeWidth="2.5" />
        <circle cx="430" cy="210" r="11" fill="#5F7470" stroke="#FBF7EF" strokeWidth="2.5" />
        <text x="250" y="206" fill="#3F362B" fontWeight="600" fontSize="12" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">A Casa</text>
        <text x="250" y="285" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">Joana</text>
        <text x="150" y="118" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">Inês</text>
        <text x="380" y="137" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">Açude</text>
        <text x="340" y="287" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">Aurora</text>
        <text x="110" y="235" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">A Seca</text>
        <text x="430" y="234" fill="#574B3D" fontWeight="600" fontSize="11" fontFamily="'Hanken Grotesk',sans-serif" textAnchor="middle">Memória</text>
      </svg>
    </div>
  )
}
