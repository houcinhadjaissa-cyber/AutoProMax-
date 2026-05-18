import { Search, Menu } from 'lucide-react'

interface HeaderProps {
  onSearch: () => void
  onCart: () => void
  onProfile: () => void
  onVIN: () => void
  onHome: () => void
  onBack?: () => void
  canGoBack?: boolean
}

export function Header({
  onSearch,
  onCart,
  onProfile,
  onVIN,
  onHome,
  onBack,
  canGoBack,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 px-4 py-3"
      style={{ background: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center justify-between">
        <button onClick={onHome} className="text-white font-bold text-xl">
          Auto<span style={{ color: '#2563EB' }}>Pro</span>Max
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onSearch}
            className="p-2"
            style={{ color: '#fff' }}
          >
            <Search size={20} />
          </button>
          <button
            onClick={onProfile}
            className="p-2"
            style={{ color: '#fff' }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
