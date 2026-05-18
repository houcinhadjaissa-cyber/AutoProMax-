import { useState } from 'react'
import { Layout } from './components/Layout'
import type { Page } from './components/Layout'
import AdminPage from './pages/admin/index'
import { Icon } from './components/Icon'
import { useCartStore, useAuthStore, useSettingsStore, useToastStore, useRoleStore } from './stores'
import { RoleSelector } from './components/RoleSelector'
import { products } from './data/products'
import type { Product } from './components/ProductCard'
import GaragePage from './pages/GaragePage'
import ServicesPage from './pages/ServicesPage'
import MechanicsPage from './pages/MechanicsPage'
import VINPage from './pages/VINPage'
import TrackPage from './pages/TrackPage'
import HelpPage from './pages/HelpPage'
import CategoriesPage from './pages/CategoriesPage'
import ReturnsPage from './pages/ReturnsPage'
import NotificationsPage from './pages/NotificationsPage'
import EPCPage from './pages/EPCPage'
import ProPage from './pages/ProPage'
import SavedPage from './pages/SavedPage'
import SearchPage from './pages/SearchPage'
import ProductDetailPage from './pages/ProductDetailPage'

// Sections
import { JoinAs } from './components/sections/JoinAs'
import { TrustTicker } from './components/sections/TrustTicker'
import { VehicleFinder } from './components/sections/VehicleFinder'
import { DealsTicker } from './components/sections/DealsTicker'
import { ProductGrid } from './components/sections/ProductGrid'
import { FlashDeals } from './components/sections/FlashDeals'
import { ServicesSection } from './components/sections/ServicesSection'
import { VideoCommerce } from './components/sections/VideoCommerce'
import { SupplierShowcase } from './components/sections/SupplierShowcase'
import { CompareSection } from './components/sections/CompareSection'
import { CommunityFeed } from './components/sections/CommunityFeed'

function HomePage({ setPage, setProduct }: { setPage: (p: Page) => void; setProduct: (p: Product) => void }) {
  return (
    <div style={{ background: '#0D0D0D' }}>
      <JoinAs onSelect={(type) => {
        if (type === 'business') setPage('pro')
        else setPage('garage')
      }} />
      <TrustTicker />
      <VehicleFinder onFind={() => setPage('search')} />
      <DealsTicker />
      <ProductGrid
        onViewAll={() => setPage('epc')}
        onProductClick={(p) => { setProduct(p as unknown as Product); setPage('product') }}
      />
      <FlashDeals />
      <ServicesSection onViewMap={() => setPage('services')} />
      <VideoCommerce />
      <SupplierShowcase />
      <CompareSection />
      <CommunityFeed />
      <div style={{ height: '96px' }} />
    </div>
  )
}

function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCartStore()
  const addToast = useToastStore((s) => s.addToast)

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">Shopping Cart</h1>
        {items.length > 0 && (
          <button onClick={() => { clearCart(); addToast('Cart cleared', 'info') }} className="text-xs font-medium" style={{ color: '#EF4444' }}>
            Clear All
          </button>
        )}
      </div>
      {items.length > 0 ? (
        <>
          <div className="px-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl p-4 flex gap-3" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#242424' }}>
                  <Icon name="package" size={24} style={{ color: '#555' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.name}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: '#10B981' }}>{item.price.toLocaleString()} DZD</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Icon name="minus" size={14} style={{ color: '#A0A0A0' }} />
                    </button>
                    <span className="text-sm font-medium text-white">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#2563EB' }}>
                      <Icon name="plus" size={14} className="text-white" />
                    </button>
                    <button onClick={() => { removeItem(item.id); addToast('Item removed', 'info') }} className="ml-auto" style={{ color: '#EF4444' }}>
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 z-40" style={{ background: 'linear-gradient(to top, #0D0D0D 80%, transparent)' }}>
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: '#A0A0A0' }}>Total ({totalItems()} items)</span>
                <span className="text-lg font-bold text-white">{totalPrice().toLocaleString()} DZD</span>
              </div>
              <button onClick={() => addToast('Checkout coming soon', 'info')} className="w-full font-bold py-4 rounded-2xl text-sm" style={{ background: '#2563EB', color: '#FFFFFF' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 px-4">
          <Icon name="cart" size={52} style={{ color: '#333' }} className="mx-auto mb-4" />
          <p className="font-semibold text-white mb-1">Your cart is empty</p>
          <p className="text-sm" style={{ color: '#666' }}>Add parts from the shop to get started</p>
        </div>
      )}
    </div>
  )
}

function ChatPage() {
  const conversations = [
    { id: 1, name: 'AutoForce Industries', msg: 'Your order has been shipped!', time: '2m', unread: true, color: '#1D4ED8' },
    { id: 2, name: 'AutoFix Pro Mechanics', msg: 'Quote ready for review', time: '1h', unread: true, color: '#0D1B2E' },
    { id: 3, name: 'Support Team', msg: 'How can we help you today?', time: '3d', unread: false, color: '#1A1A1A' },
  ]

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-lg font-bold text-white">Messages</h1>
      </div>
      <div className="px-4 space-y-2">
        {conversations.map((c) => (
          <div key={c.id} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-base" style={{ background: c.color }}>
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <span className="text-xs" style={{ color: '#555' }}>{c.time}</span>
              </div>
              <p className="text-xs truncate mt-0.5" style={{ color: '#A0A0A0' }}>{c.msg}</p>
            </div>
            {c.unread && <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#2563EB' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfilePage({ setPage }: { setPage: (p: Page) => void }) {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme, country, currency, language } = useSettingsStore()
  const { roleConfig } = useRoleStore()
  const addToast = useToastStore((s) => s.addToast)
  const [showRoleSelector, setShowRoleSelector] = useState(false)

  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-lg font-bold text-white">Account</h1>
      </div>

      <div className="px-4">
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 text-white" style={{ background: '#2563EB' }}>
            {user?.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{user?.name || 'Not logged in'}</p>
            <p className="text-xs mt-0.5" style={{ color: '#666' }}>{user?.email || 'Guest'}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="shield" size={12} style={{ color: '#10B981' }} />
              <span className="text-xs font-medium" style={{ color: '#10B981' }}>Trust Score: {user?.trustScore || 0}</span>
            </div>
          </div>
          <button onClick={() => setShowRoleSelector(true)} className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#2563EB' }}>
            {roleConfig.label}
          </button>
        </div>
      </div>

      {showRoleSelector && <RoleSelector onClose={() => setShowRoleSelector(false)} />}

      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-white mb-3">{roleConfig.label} Dashboard</h2>
        <div className="grid grid-cols-4 gap-2">
          {roleConfig.homeActions.slice(0, 4).map((action: { label: string; page: string; icon: string }) => (
            <button key={action.label} onClick={() => setPage(action.page as Page)} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon name={action.icon as any} size={20} style={{ color: '#A0A0A0' }} />
              </div>
              <span className="text-xs font-medium text-center leading-tight" style={{ color: '#A0A0A0' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: '#555' }}>Settings</h3>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <Icon name={theme === 'light' ? 'eye' : 'eye-off'} size={18} style={{ color: '#A0A0A0' }} />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Appearance</p>
                <p className="text-xs" style={{ color: '#666' }}>{theme === 'light' ? 'Day Mode' : 'Night Mode'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{theme === 'light' ? '☀️' : '🌙'}</span>
              <div className="w-12 h-7 rounded-full relative transition-colors" style={{ background: theme === 'dark' ? '#2563EB' : '#333' }}>
                <div className="w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow" style={{ transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(4px)' }} />
              </div>
            </div>
          </button>
          <div className="flex items-center gap-3 p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Icon name="map-pin" size={18} style={{ color: '#A0A0A0' }} />
            <div>
              <p className="text-sm font-medium text-white">Region</p>
              <p className="text-xs" style={{ color: '#666' }}>{country} · {currency} · {language.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={() => addToast('Settings coming soon', 'info')} className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Icon name="settings" size={18} style={{ color: '#A0A0A0' }} />
              <span className="text-sm font-medium text-white">General Settings</span>
            </div>
            <Icon name="chevron-right" size={16} style={{ color: '#555' }} />
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        <button onClick={() => setPage('admin')}
          className="w-full font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.3)' }}>
          <Icon name="settings" size={16} />
          Admin Master Control
        </button>
      </div>

      <div className="px-4 mt-4 mb-4">
        <button onClick={() => { logout(); addToast('Logged out', 'info') }} className="w-full font-medium py-3.5 rounded-2xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])
  const cartCount = useCartStore((s) => s.totalItems())

  // Admin page - NO onExit prop
  if (page === 'admin') {
    return <AdminPage />
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} setProduct={(p) => { setSelectedProduct(p) }} />
      case 'product': return <ProductDetailPage product={selectedProduct} onBack={() => setPage('home')} />
      case 'search': return <SearchPage />
      case 'cart': return <CartPage />
      case 'chat': return <ChatPage />
      case 'profile': return <ProfilePage setPage={setPage} />
      case 'services': return <ServicesPage />
      case 'garage': return <GaragePage />
      case 'categories': return <CategoriesPage />
      case 'mechanics': return <MechanicsPage />
      case 'vin': return <VINPage />
      case 'track': return <TrackPage />
      case 'help': return <HelpPage />
      case 'epc': return <EPCPage />
      case 'pro': return <ProPage />
      case 'returns': return <ReturnsPage />
      case 'notifications': return <NotificationsPage />
      case 'saved': return <SavedPage />
      default: return <HomePage setPage={setPage} setProduct={setSelectedProduct} />
    }
  }

  return (
    <Layout
      page={page}
      setPage={setPage}
      cartCount={cartCount}
      showHeader={page !== 'product'}
    >
      {renderPage()}
    </Layout>
  )
                                                                                                                                               }
