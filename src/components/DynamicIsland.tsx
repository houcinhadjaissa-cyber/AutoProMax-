import { User, ScanLine, ShoppingCart } from 'lucide-react'
import type { Page } from './Layout'

interface DynamicIslandProps {
  cartCount: number
  page: Page
  setPage: (p: Page) => void
}

export function DynamicIsland({ cartCount, page, setPage }: DynamicIslandProps) {
  return (
    <div
      className="fixed bottom-4 left-4 right-4 h-14 rounded-full flex items-center justify-between px-4"
      style={{
        background: 'rgba(18, 18, 20, 0.94)',
        backdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.72)',
      }}
    >
      <button onClick={() => setPage('profile')} className="p-2" style={{ color: '#fff' }}>
        <User size={20} />
      </button>
      <button onClick={() => setPage('vin')} className="p-2" style={{ color: '#fff' }}>
        <ScanLine size={20} />
      </button>
      <button onClick={() => setPage('cart')} className="p-2 relative" style={{ color: '#fff' }}>
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#EF4444', color: '#fff' }}
          >
            {cartCount}
          </span>
        )}
      </button>
    </div>
  )
}
