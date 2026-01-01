// src/api/actual_api.ts

import { CreateScheduleItem, ScheduleItem } from "@/lib/types/schedule"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getActualScheduleItems(start_ts: Date, end_ts: Date) {
    const res = await fetch(`${backendUrl}/schedule/actual/range`, {
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

export async function createActualScheduleItem({
  task_id,
  user_id,
  start_time,
  end_time
}: CreateScheduleItem): Promise<ScheduleItem> {
  const res = await fetch(`${backendUrl}/schedule/actual`, {
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

  if (!res.ok) throw new Error('Failed to create actual schedule item');
  return res.json();
}

export async function deleteActualScheduleItem(id: string) {
  const res = await fetch(`${backendUrl}/schedule/actual?id=${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error("Failed to delete actual schedule item");
  return res.json();
}