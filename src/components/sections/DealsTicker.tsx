export function DealsTicker() {
  return (
    <div className="p-4">
      <p className="text-gray-400 text-sm mb-3">🔥 Flash Deals</p>
      <div className="flex gap-3 overflow-x-auto">
        <div className="flex-shrink-0 p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-white font-medium">Up to 40% OFF</p>
        </div>
        <div className="flex-shrink-0 p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-white font-medium">Free Shipping</p>
        </div>
      </div>
    </div>
  )
}
