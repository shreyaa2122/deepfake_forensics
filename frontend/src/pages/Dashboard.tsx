/**
 * WHAT: Dashboard page. For Milestone 1 this only proves the frontend
 * can actually talk to the backend, by calling GET /api/health and
 * showing the real (not faked) model-loaded status.
 *
 * WHY: The stats/history widgets described in the architecture doc
 * (total analyses, REAL/FAKE distribution, etc.) need the DB + analysis
 * API from later milestones - building fake placeholder numbers now
 * would violate the "no fake implementation" rule. So this page starts
 * honest and small, and grows a widget at a time as each milestone adds
 * real data to show.
 */
import { useEffect, useState } from 'react'
import { apiClient } from '../api/client'
import type { HealthResponse } from '../types'

export default function Dashboard() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiClient
      .get<HealthResponse>('/health')
      .then((res) => setHealth(res.data))
      .catch(() =>
        setError(
          'Could not reach the backend. Is uvicorn running on port 8000?'
        )
      )
  }, [])

  return (
    <div className="min-h-screen bg-forensic-bg p-8">
      <h1 className="text-2xl font-semibold text-forensic-accent mb-6">
        DeepFake Forensics — Dashboard
      </h1>

      <div className="bg-forensic-panel rounded-lg p-6 max-w-xl border border-slate-700">
        <h2 className="text-lg font-medium mb-3">Backend Status</h2>

        {error && <p className="text-forensic-danger">{error}</p>}

        {!error && !health && <p className="text-slate-400">Checking backend...</p>}

        {health && (
          <div className="space-y-2 text-sm">
            <p>
              API status: <span className="text-forensic-safe">{health.status}</span>
            </p>
            <p>Environment: {health.environment}</p>
            <p>
              Model loaded:{' '}
              <span className={health.model_loaded ? 'text-forensic-safe' : 'text-yellow-400'}>
                {String(health.model_loaded)}
              </span>
            </p>
            <p className="text-slate-400">{health.model_note}</p>
          </div>
        )}
      </div>

      <p className="text-slate-500 text-sm mt-6">
        Analysis stats, recent uploads, and REAL/FAKE distribution will
        appear here starting Milestone 4.
      </p>
    </div>
  )
}
