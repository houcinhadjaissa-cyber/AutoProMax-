import { type ReactNode } from 'react';
import { Header } from './Header';
import { DynamicIsland } from './DynamicIsland';

export type Page =
  | 'home' | 'search' | 'cart' | 'chat' | 'profile'
  | 'services' | 'garage' | 'categories' | 'mechanics'
  | 'vin' | 'track' | 'help' | 'epc' | 'pro' | 'returns'
  | 'notifications' | 'saved' | 'product' | 'admin'
  | 'checkout' | 'orderConfirm';

interface LayoutProps {
  children: ReactNode;
  page: Page;
  setPage: (p: Page) => void;
  cartCount?: number;
  showHeader?: boolean;
  goBack?: () => void;
  canGoBack?: boolean;
}

export function Layout({
  children, page, setPage, cartCount = 0, showHeader = true, goBack, canGoBack,
}: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#0D0D0D' }}>
      {showHeader && (
        <Header
          onSearch={() => setPage('search')}
          onCart={() => setPage('cart')}
          onProfile={() => setPage('profile')}
          onVIN={() => setPage('vin')}
          onHome={() => setPage('home')}
          onBack={goBack}
          canGoBack={canGoBack ?? false}
        />
      )}

      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      <div className="md:hidden">
        <DynamicIsland
          cartCount={cartCount}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
