// import WeekTask from '@/components/calendar/week/WeekTask'
import React from 'react'
import { tasks } from '@/data/tasksData'
import MonthTask from '@/components/calendar/month/MonthTask';
function page() {
  const task = tasks[0];
    return (
   <div className="h-screen flex flex-col items-center justify-start bg-black gap-4 p-4">
      <MonthTask task={task} />
      {/* <WeekTask task={task} /> */}
    </div>

  );
}

export default page