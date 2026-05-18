import { create } from 'zustand'

export interface RoleAction {
  label: string
  page: string
  icon: string
}

export interface RoleConfig {
  label: string
  homeActions: RoleAction[]
}

export interface RoleState {
  roleConfig: RoleConfig
  setActiveRole: (role: 'customer' | 'business' | 'employee') => void
  allRoles: {
    customer: RoleConfig
    business: RoleConfig
    employee: RoleConfig
  }
  role: 'customer' | 'business' | 'employee'
  setRole: (role: 'customer' | 'business' | 'employee') => void
}

export const useRoleStore = create<RoleState>((set) => ({
  role: 'customer',
  roleConfig: {
    label: 'Customer',
    homeActions: [
      { label: 'Garage', page: 'garage', icon: 'car' },
      { label: 'Search', page: 'search', icon: 'search' },
      { label: 'Orders', page: 'track', icon: 'package' },
      { label: 'Help', page: 'help', icon: 'help' },
    ],
  },
  allRoles: {
    customer: {
      label: 'Customer',
      homeActions: [
        { label: 'Garage', page: 'garage', icon: 'car' },
        { label: 'Search', page: 'search', icon: 'search' },
        { label: 'Orders', page: 'track', icon: 'package' },
        { label: 'Help', page: 'help', icon: 'help' },
      ],
    },
    business: {
      label: 'Business',
      homeActions: [
        { label: 'Dashboard', page: 'pro', icon: 'chart' },
        { label: 'Products', page: 'epc', icon: 'package' },
        { label: 'Orders', page: 'track', icon: 'truck' },
        { label: 'Analytics', page: 'pro', icon: 'chart' },
      ],
    },
    employee: {
      label: 'Employee',
      homeActions: [
        { label: 'Tasks', page: 'help', icon: 'check' },
        { label: 'Schedule', page: 'track', icon: 'clock' },
        { label: 'Messages', page: 'chat', icon: 'chat' },
        { label: 'Profile', page: 'profile', icon: 'user' },
      ],
    },
  },
  setActiveRole: (role) => {
    set({
      role,
      roleConfig: {
        customer: {
          label: 'Customer',
          homeActions: [
            { label: 'Garage', page: 'garage', icon: 'car' },
            { label: 'Search', page: 'search', icon: 'search' },
            { label: 'Orders', page: 'track', icon: 'package' },
            { label: 'Help', page: 'help', icon: 'help' },
          ],
        },
        business: {
          label: 'Business',
          homeActions: [
            { label: 'Dashboard', page: 'pro', icon: 'chart' },
            { label: 'Products', page: 'epc', icon: 'package' },
            { label: 'Orders', page: 'track', icon: 'truck' },
            { label: 'Analytics', page: 'pro', icon: 'chart' },
          ],
        },
        employee: {
          label: 'Employee',
          homeActions: [
            { label: 'Tasks', page: 'help', icon: 'check' },
            { label: 'Schedule', page: 'track', icon: 'clock' },
            { label: 'Messages', page: 'chat', icon: 'chat' },
            { label: 'Profile', page: 'profile', icon: 'user' },
          ],
        },
      }[role],
    })
  },
  setRole: (role) => set({ role }),
}))
