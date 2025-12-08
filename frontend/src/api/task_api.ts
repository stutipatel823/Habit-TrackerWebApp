// src/api/task_api.ts
import { Task, TaskCreate } from "@/lib/types/task"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getAllTasks(): Promise<Task[]> {
    const res = await fetch(`${backendUrl}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) throw new Error('Failed to fetch tasks from backend')
    return res.json()
}

export async function createTask(task: TaskCreate) {
    const res = await fetch(`${backendUrl}/tasks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    })
    if (!res.ok) throw new Error('Failed to fetch tasks from backend')
    return res.json()
}