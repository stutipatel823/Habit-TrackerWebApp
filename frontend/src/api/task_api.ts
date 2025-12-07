// src/api/task_api.ts
import { Task } from "@/lib/types/task"

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

export async function createTask({user_id, title, icon, color}: Task) {
    const res = await fetch(`${backendUrl}/tasks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, title, icon, color})
    })
    if (!res.ok) throw new Error('Failed to fetch tasks from backend')
    return res.json()
}