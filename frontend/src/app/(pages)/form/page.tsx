"use client";
import TaskForm from '@/components/forms/TaskForm'
import React from 'react'

function page() {
  return (
    <TaskForm onClose={() => true} />
  )
}

export default page