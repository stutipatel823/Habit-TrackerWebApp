// app/example/page

import CalendarContainer from '@/components/calendar/common/CalendarContainer'
import React from 'react'

export default function Page() {
  return (
    // parent takes full viewport height
    <div className="flex flex-col">
        <CalendarContainer />
    </div>
  )
}