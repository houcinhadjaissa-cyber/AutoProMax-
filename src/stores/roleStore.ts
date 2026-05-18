import { create } from 'zustand'

interface RoleAction {
  label: string
  page: string
  icon: string
}

interface RoleConfig {
  label: string
  homeActions: RoleAction[]
}

interface RoleState {
  roleConfig: RoleConfig
}

export const useRoleStore = create<RoleState>(() => ({
  roleConfig: {
    label: 'Customer',
    homeActions: [
      { label: 'Garage', page: 'garage', icon: 'car' },
      { label: 'Search', page: 'search', icon: 'search' },
      { label: 'Orders', page: 'track', icon: 'package' },
      { label: 'Help', page: 'help', icon: 'help' },
    ],
  },
}))
