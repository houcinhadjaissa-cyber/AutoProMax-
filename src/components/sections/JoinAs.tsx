export function JoinAs({ onSelect }: { onSelect: (type: 'customer' | 'business') => void }) {
  return (
    <div className="p-4">
      <h2 className="text-center text-white text-lg mb-4">Join as</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('customer')}
          className="p-6 rounded-2xl"
          style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white font-semibold">Customer</p>
          <p className="text-gray-400 text-sm">Garage & Personal</p>
        </button>
        <button
          onClick={() => onSelect('business')}
          className="p-6 rounded-2xl"
          style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white font-semibold">Business</p>
          <p className="text-gray-400 text-sm">Wholesale & Services</p>
        </button>
      </div>
    </div>
  )
}
