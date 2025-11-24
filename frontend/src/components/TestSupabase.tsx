'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TestSupabase() {
  const [tasks, setTasks] = useState<unknown[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase.from('task').select('*')
      if (error) setError(error.message)
      else setTasks(data)
    }
    fetchTasks()
  }, [])

  return (
    <div>
      <h2>Supabase Frontend Test</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  )
}
