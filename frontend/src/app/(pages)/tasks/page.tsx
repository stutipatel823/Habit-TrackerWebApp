"use client";
import TaskDropdown from '@/components/ui/task-form/TaskDropdown'
import TaskList from '@/components/ui/task-form/TaskList'
import React, { useState } from 'react'
import { Task } from '@/lib/types/task'

export default function Page() {
  // Sample tasks (replace with real data if you want)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <div className='bg-brand-lightblue h-screen p-6'>
      <TaskDropdown 
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <TaskList />
    </div>
  )
}
