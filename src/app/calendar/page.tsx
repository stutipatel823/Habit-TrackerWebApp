// // app/calendar/page.tsx
// "use client";

// import { tasks } from "@/data/tasksData";
// import { useState } from "react";
// import {
//   startOfMonth,
//   startOfWeek,
//   addDays,
//   format,
//   isSameMonth,
//   isSameDay,
// } from "date-fns";


// export default function CalendarPage() {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const monthStart = startOfMonth(currentDate);
//   const calendarStart = startOfWeek(monthStart);

//   const nextMonth = () => setCurrentDate(addDays(monthStart, 35)); // jump 1 month forward
//   const prevMonth = () => setCurrentDate(addDays(monthStart, -1)); // jump 1 month back

//   // Generate exactly 35 days (7 cols × 5 rows)
//   const days: Date[] = [];
//   let day = calendarStart;
//   for (let i = 0; i < 35; i++) {
//     days.push(day);
//     day = addDays(day, 1);
//   }

//   // Break into 5 rows
//   const rows: Date[][] = [];
//   for (let i = 0; i < 5; i++) {
//     rows.push(days.slice(i * 7, i * 7 + 7));
//   }

//   return (
//     <div className="p-6 w-5xl mx-auto">
//       {/* Header */}
//       {/* <div className="flex justify-between items-center mb-4">
//         <button onClick={prevMonth} className="px-3 py-1 bg-gray-200 rounded">
//           Prev
//         </button>
//         <h2 className="text-xl font-bold">{format(monthStart, "MMMM yyyy")}</h2>
//         <button onClick={nextMonth} className="px-3 py-1 bg-gray-200 rounded">
//           Next
//         </button>
//       </div> */}
//       <div>
//         <h2 className="text-2xl font-extrabold text-gray-700">{format(monthStart, "MMMM yyyy")}</h2>
//         <button></button>
//       </div>
      
//       <div className="border rounded-xl overflow-hidden m-5">
//         {/* Weekdays */}
//         <div className="grid grid-cols-7 text-center border-b">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//             <div key={d} className="py-2 border-r last:border-r-0">
//               {d.toUpperCase()}
//             </div>
//           ))}
//         </div>

//         {/* Days */}
//         {rows.map((week, i) => (
//           <div key={i} className="grid grid-cols-7">
//             {week.map((day, idx) => (
//               <div
//                 key={idx}
//                 className={`h-35 ${i < rows.length-1 ? 'border-b' : ''} ${idx < week.length-1  ? 'border-r': ''} bg-brand-white flex flex-col items-center p-1 text-center`}
//               >
//                 {/* Date number - always top center */}
//                 <div
//                   className={`w-6 h-6 flex items-center justify-center rounded-full mb-1
//                               ${
//                                 isSameDay(day, new Date())
//                                   ? "bg-blue-500 text-white"
//                                   : ""
//                               }
//                               ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}`}
//                 >
//                   {format(day, "d")}
//                 </div>

//              {/* Events go below */}
//              {tasks
//                 .filter((task) => isSameDay(new Date(task.expected_at), day))
//                 .slice(0, 3)
//                 .map((task) => {
//                   const taskDate = new Date(task.expected_at);
//                   const taskTime = taskDate.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   });
//                   return (
//                     <div
//                       key={task.id}
//                       className="w-full py-1 my-1 shadow-md bg-neutral-100 rounded-xs text-xs flex items-center"
//                     >
//                       {/* Color indicator */}
//                       <div
//                         className="mx-1.5 h-4 w-1 rounded-2xl"
//                         style={{ backgroundColor: task.color }}
//                       ></div>

//                       {/* Task info */}
//                       <p className="truncate overflow-hidden whitespace-nowrap">
//                         <span className="text-gray-500">{taskTime.toLowerCase()}</span> · {task.title}
//                       </p>
//                     </div>
//                   );
//                 })}

//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/calendar/page.tsx
"use client";
import CalendarContainer from "./CalendarContainer";

export default function CalendarPage() {
  return <CalendarContainer />;
}

