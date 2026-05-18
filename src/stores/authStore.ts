// src/stores/authStore.ts
// AutoProMax — Authentication store with 4 account types
// Updated: R4.A — Fixed TypeScript Promise types

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AccountType = 'customer' | 'business' | 'employee' | 'admin'

export interface AuthUser {
  id: string
  email: string
  accountType: AccountType
  isLoggedIn: boolean
  riskScore: number
  verified?: boolean
  businessId?: string
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (email: string, password?: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, accountType: AccountType) => Promise<void>
  isAdmin: () => boolean
  isBusiness: () => boolean
  detectAccountType: (email: string) => AccountType
}

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@autopro.local'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      detectAccountType: (email: string): AccountType => {
        if (email === ADMIN_EMAIL) return 'admin'
        if (email.includes('business') || email.includes('supplier')) return 'business'
        if (email.includes('employee') || email.includes('staff')) return 'employee'
        return 'customer'
      },

      login: async (email: string, password?: string): Promise<void> => {
        set({ isLoading: true, error: null })
        try {
          if (DEMO_MODE) {
            await new Promise(resolve => setTimeout(resolve, 500))
            const accountType = get().detectAccountType(email)
            const newUser: AuthUser = {
              id: `user_${Date.now()}`,
              email,
              accountType,
              isLoggedIn: true,
              riskScore: 0,
              verified: true
            }
            set({ user: newUser, isLoading: false })
            return
          }
          const accountType = get().detectAccountType(email)
          const newUser: AuthUser = {
            id: `user_${Date.now()}`,
            email,
            accountType,
            isLoggedIn: true,
            riskScore: 0,
            verified: true
          }
          set({ user: newUser, isLoading: false })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Login failed', isLoading: false })
        }
      },

      logout: (): void => { set({ user: null }) },

      register: async (email: string, password: string, accountType: AccountType): Promise<void> => {
        set({ isLoading: true, error: null })
        try {
          if (DEMO_MODE) {
            await new Promise(resolve => setTimeout(resolve, 500))
            const newUser: AuthUser = {
              id: `user_${Date.now()}`,
              email,
              accountType,
              isLoggedIn: true,
              riskScore: 0,
              verified: true
            }
            set({ user: newUser, isLoading: false })
            return
          }
          const newUser: AuthUser = {
            id: `user_${Date.now()}`,
            email,
            accountType,
            isLoggedIn: true,
            riskScore: 0,
            verified: false
          }
          set({ user: newUser, isLoading: false })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Registration failed', isLoading: false })
        }
      },

      isAdmin: () => get().user?.accountType === 'admin',
      isBusiness: () => get().user?.accountType === 'business'
    }),
    { name: 'autopro-auth', partialize: (state) => ({ user: state.user }) }
  )
)
