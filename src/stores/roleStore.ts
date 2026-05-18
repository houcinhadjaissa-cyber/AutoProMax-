import { useAuthStore, useRoleStore } from '../stores'

interface RoleSelectorProps {
  onClose: () => void
}

export function RoleSelector({ onClose }: RoleSelectorProps) {
  const { setActiveRole } = useAuthStore()
  const { allRoles, role: currentRole } = useRoleStore()

  const handleRoleSelect = (roleKey: 'customer' | 'business' | 'employee') => {
    setActiveRole(roleKey)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50">
      <div
        className="w-full max-w-md p-6 rounded-2xl"
        style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Select Role</h2>
        
        {Object.entries(allRoles).map(([key, config]) => (
          <button
            key={key}
            onClick={() => handleRoleSelect(key as 'customer' | 'business' | 'employee')}
            className="w-full p-4 mb-3 rounded-xl text-left transition-colors"
            style={{
              background: currentRole === key ? '#2563EB' : '#242424',
              border: `1px solid ${currentRole === key ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            <p className="text-white font-semibold">{config.label}</p>
            <p className="text-gray-400 text-sm mt-1">
              {config.homeActions.length} quick actions
            </p>
          </button>
        ))}

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold mt-2"
          style={{ background: '#242424', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
              }
