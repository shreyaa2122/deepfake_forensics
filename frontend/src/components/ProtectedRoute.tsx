/**
 * WHAT: Wraps a route so it requires login.
 *
 * WHY it's a pass-through right now: there is no auth state yet
 * (Milestone 2 adds the zustand auth store + real token check). Rather
 * than fake a "logged in" check, this is an honest no-op for now with
 * the real check clearly marked as a TODO, so nothing pretends to be
 * secure before it is.
 */
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  // TODO (Milestone 2): read auth state from the zustand store and
  // redirect to /login if there is no valid session.
  const isAuthed = true // placeholder until Milestone 2

  if (!isAuthed) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
