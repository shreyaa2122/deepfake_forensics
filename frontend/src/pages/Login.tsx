/**
 * WHAT: Login form UI. Submit handler is a stub - real auth call, token
 * storage, and redirect logic get wired in Milestone 2.
 */
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO (Milestone 2): call POST /api/auth/login, store session, redirect
    console.log('login submit (not wired yet)', { email })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-forensic-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-forensic-panel p-8 rounded-lg border border-slate-700 w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold text-forensic-accent">Log In</h1>
        <input
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 rounded bg-forensic-accent text-forensic-bg font-medium"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
