// src/api/expected_api.ts

import { CreateScheduleItem, ScheduleItem } from "@/lib/types/schedule"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getExpectedScheduleItems(start_ts: Date, end_ts: Date) {
    const res = await fetch(`${backendUrl}/expected/range`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start_ts: start_ts.toISOString(),
            end_ts: end_ts.toISOString()
        })
    })
    if (!res.ok) throw new Error('Failed to fetch tasks from backend')
    return res.json()
}

export async function createExpectedScheduleItem({
  task_id,
  user_id,
  start_time,
  end_time
}: CreateScheduleItem): Promise<ScheduleItem> {
  const res = await fetch(`${backendUrl}/expected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task_id,
      user_id,
      start_time,
      end_time
    }),
  });

  if (!res.ok) throw new Error('Failed to create expected schedule item');
  return res.json();
}
