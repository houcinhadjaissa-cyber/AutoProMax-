import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AccountType = 'customer' | 'business' | 'employee' | 'admin'

export interface AuthUser {
  id: string
  email: string
  name?: string
  accountType: AccountType
  isLoggedIn: boolean
  trustScore?: number
}

interface AuthState {
  user: AuthUser | null
  login: (email: string) => void
  logout: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email: string) => {
        set({
          user: {
            id: 'user-1',
            email,
            name: email.split('@')[0],
            accountType: 'customer',
            isLoggedIn: true,
            trustScore: 100,
          },
        })
      },
      logout: () => set({ user: null }),
      isAdmin: () => get().user?.accountType === 'admin',
    }),
    { name: 'autopro-auth' }
  )
)
