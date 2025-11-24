'use client'

import { useEffect, useState } from 'react'
import { getTasksFromBackend } from '@/lib/api'

export default function TestBackend() {
  const [data, setData] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTasksFromBackend()
      .then(setData)
      .catch(err => setError(err.message))
  }, [])

  return (
    <div>
      <h2>Backend Test</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
