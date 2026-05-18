export function VehicleFinder({ onFind }: { onFind: () => void }) {
  return (
    <div className="p-4">
      <h2 className="text-white text-lg mb-4">Find Parts for Your Vehicle</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-xs text-gray-400">MAKE</p>
          <p className="text-white font-medium">Brand</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-xs text-gray-400">MODEL</p>
          <p className="text-white font-medium">Model</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-xs text-gray-400">YEAR</p>
          <p className="text-white font-medium">Year</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: '#1A1A1A' }}>
          <p className="text-xs text-gray-400">CATEGORY</p>
          <p className="text-white font-medium">Category</p>
        </div>
      </div>
      <button
        onClick={onFind}
        className="w-full py-4 rounded-2xl font-bold text-lg"
        style={{ background: '#fff', color: '#000' }}
      >
        Find Parts
      </button>
    </div>
  )
}
