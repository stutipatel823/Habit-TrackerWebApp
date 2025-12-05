const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getAllTasks() {
    const res = await fetch(`${backendUrl}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) throw new Error('Failed to fetch tasks from backend')
    return res.json()
}