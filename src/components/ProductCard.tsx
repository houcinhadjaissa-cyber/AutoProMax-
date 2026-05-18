import { Icon } from './Icon'

// Export the Product interface
export interface Product {
  id: string
  name: string
  price: number
  image?: string
  category?: string
}

export interface ProductCardProps {
  product: Product
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="rounded-2xl p-4 cursor-pointer"
      style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={onClick}
    >
      <div
        className="w-full h-32 rounded-xl mb-3 flex items-center justify-center"
        style={{ background: '#242424' }}
      >
        <Icon name="package" size={48} style={{ color: '#555' }} />
      </div>
      <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
      <p className="text-lg font-bold mt-1" style={{ color: '#10B981' }}>
        {product.price.toLocaleString()} DZD
      </p>
    </div>
  )
}
