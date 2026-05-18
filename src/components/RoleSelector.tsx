export function RoleSelector({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50">
      <div
        className="w-full max-w-md p-6 rounded-2xl"
        style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Select Role</h2>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold"
          style={{ background: '#2563EB', color: '#fff' }}
        >
          Customer
        </button>
      </div>
    </div>
  )
}
