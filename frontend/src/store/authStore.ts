/**
 * WHAT: zustand store for auth/session state.
 *
 * WHY it's mostly empty right now: there's no login endpoint wired up
 * until Milestone 2. This file exists so the shape is decided and
 * ProtectedRoute / Login / Signup have something concrete to import
 * once auth is implemented.
 */
import { create } from 'zustand'

interface AuthState {
  userEmail: string | null
  setUserEmail: (email: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  userEmail: null,
  setUserEmail: (email) => set({ userEmail: email }),
}))
