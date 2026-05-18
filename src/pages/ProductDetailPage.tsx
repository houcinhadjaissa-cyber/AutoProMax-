export default function ProductDetailPage({ product, onBack }: { product: any; onBack: () => void }) {
  return (
    <div className="p-4 text-white">
      <button onClick={onBack} className="mb-4 text-blue-500">← Back</button>
      <h1>Product Detail</h1>
    </div>
  )
}
