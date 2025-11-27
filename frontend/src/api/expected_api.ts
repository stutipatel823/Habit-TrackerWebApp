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