import { ProductCard } from '../ProductCard'
import { products } from '../../data/products'

export function ProductGrid({
  onViewAll,
  onProductClick,
}: {
  onViewAll: () => void
  onProductClick: (p: any) => void
}) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-bold">Top Picks</h2>
        <button onClick={onViewAll} className="text-blue-500 text-sm">
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
        ))}
      </div>
    </div>
  )
}
