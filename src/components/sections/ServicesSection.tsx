export function ServicesSection({ onViewMap }: { onViewMap: () => void }) {
  return (
    <div className="p-4">
      <h2 className="text-white text-lg mb-4">Services Near You</h2>
      <button
        onClick={onViewMap}
        className="w-full py-3 rounded-xl"
        style={{ background: '#2563EB', color: '#fff' }}
      >
        View Map
      </button>
    </div>
  )
}
