const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getTasksFromBackend() {
    const res = await fetch(`${backendUrl}/test/`)
    if (!res.ok) throw new Error('Failed to fetch from backend')
    return res.json()
}