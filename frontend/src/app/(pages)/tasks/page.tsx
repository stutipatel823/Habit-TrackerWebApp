import TaskDropdown from '@/components/ui/task-form/TaskDropdown'
import TaskList from '@/components/ui/task-form/TaskList'
import React from 'react'

export default function page() {
  return (
    <div className='bg-brand-lightblue h-screen'>
      <TaskDropdown/>
      <TaskList/>
    </div>
  )
}
