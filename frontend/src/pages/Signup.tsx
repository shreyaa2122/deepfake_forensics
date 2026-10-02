/**
 * WHAT: Signup form UI. Stub - wired to POST /api/auth/register in Milestone 2.
 */
import { useState } from 'react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO (Milestone 2): call POST /api/auth/register
    console.log('signup submit (not wired yet)', { email })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-forensic-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-forensic-panel p-8 rounded-lg border border-slate-700 w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold text-forensic-accent">Sign Up</h1>
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
          Create Account
        </button>
      </form>
    </div>
  )
}
